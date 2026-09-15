import {readFile} from "node:fs/promises";
import {test,expect} from "@playwright/test";
import {emptySave} from "../../src/lib/academy-engine";
test("course navigation and non-adjacent weeks survive direct reload",async({page})=>{
 const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
 for(const route of ["","lectures/week-02/","lectures/week-07/","lectures/week-11/","assessments/assignment-2/","policies/"]){
  const response=await page.goto(route);expect(response?.status()).toBe(200);await expect(page.locator("h1")).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }
 await page.reload();await expect(page.getByRole("heading",{name:"Policies and support",exact:true})).toBeVisible();expect(errors).toEqual([]);
});
test("evidence can be completed by keyboard and restored",async({page})=>{
 await page.goto("sessions/week-02/");
 await page.locator("#evidence-receipt-category").selectOption("observation");
 await page.locator("#evidence-witness-category").selectOption("claim");
 await page.locator("#evidence-future-category").selectOption("assumption");
 await page.locator("#evidence-reflection").fill("E03 is provisional. A signed revision would change my confidence.");
 await page.getByRole("button",{name:"Save to dossier & review"}).focus();await page.keyboard.press("Enter");
 await expect(page.locator("[data-activity-status]")).toContainText("Saved");
 await page.reload();await expect(page.locator("#evidence-reflection")).toHaveValue(/signed revision/);
 await page.goto("operation/");await expect(page.locator("[data-dossier]")).toContainText("signed revision");
});
test("Week 7 preserves the original and prints an explained revision",async({page})=>{
 await page.goto("sessions/week-06/");await page.getByRole("button",{name:"Use example response"}).click();await page.locator("#plan-reflection").fill("My original plan depends on E03 / R1.");await page.getByRole("button",{name:"Save to dossier & review"}).click();
 await page.goto("sessions/week-07/");await page.getByRole("button",{name:"Use example response"}).click();await page.locator("#revision-reflection").fill("E07 supersedes E03. Silver must now precede Witness.");await page.getByRole("button",{name:"Save to dossier & review"}).click();
 await expect(page.locator("[data-plan-comparison]")).toContainText("My original plan depends on E03 / R1.");await expect(page.locator("[data-plan-comparison]")).toContainText("Silver must now precede Witness.");
 await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test("order controls support keyboard and resize mid-exercise",async({page})=>{
 await page.goto("sessions/week-03/");
 const button=page.getByRole("button",{name:"Move WITNESS up",exact:true});
 await button.focus();await page.keyboard.press("Enter");await page.keyboard.press("Enter");
 await expect(page.locator("[data-item]").first()).toHaveAttribute("data-item","WITNESS");
 await page.setViewportSize({width:800,height:900});await page.locator("#seals-reflection").fill("WITNESS must exist before SILVER under E03.");
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test("imports validate before replacement and backups restore work",async({page})=>{
 await page.goto("operation/");await page.getByRole("button",{name:"Load labelled sample dossier"}).click();
 await expect(page.locator("[data-dossier]")).toContainText("SUPPLIED SAMPLE");
 const downloadPromise=page.waitForEvent("download");await page.getByRole("button",{name:"Export backup JSON"}).click();const download=await downloadPromise;const file=await download.path();expect(file).toBeTruthy();
 await page.locator("[data-import]").setInputFiles({name:"bad.json",mimeType:"application/json",buffer:Buffer.from("{wrong")});
 await expect(page.locator("[data-global-status]")).toContainText("not valid JSON");await expect(page.locator("[data-dossier]")).toContainText("SUPPLIED SAMPLE");
 page.on("dialog",dialog=>dialog.accept());
 await page.getByRole("button",{name:"New operation / reset"}).click();await expect(page.locator("[data-dossier]")).toContainText("0 of 12");
 await page.locator("[data-import]").setInputFiles(file!);await expect(page.locator("[data-dossier]")).toContainText("SUPPLIED SAMPLE");
});
test("rehearsals finish, compare and keep the rest of the dossier",async({page})=>{
 await page.goto("operation/");await page.getByRole("button",{name:"Load labelled sample dossier"}).click();
 for(const preset of ["Baseline","Contradiction"]){
  await page.getByRole("button",{name:"Start "+preset,exact:true}).click();
  const run=page.locator("[data-rehearsal]");
  for(const name of ["Disclose the record","Inspect the source conflict (2 units)","Renew agreement in council (2 units)",preset==="Contradiction"?"Adopt R2 and retest (2 units)":"Recheck the current R1 model (2 units)","Examine the registry consequence (1 unit)","Disclose the record"])await run.getByRole("button",{name,exact:true}).click();
  await expect(run.getByRole("heading",{name:"Ending: disclose"})).toBeVisible();
 }
 await expect(page.locator("[data-run-history] summary")).toHaveCount(2);
 await expect(page.locator("[data-dossier]")).toContainText("SUPPLIED SAMPLE");
});
test("all twelve activity forms save their distinct outputs",async({page})=>{
 for(let week=1;week<=12;week++){
  await page.goto("sessions/week-"+String(week).padStart(2,"0")+"/");await page.getByRole("button",{name:"Use example response"}).click();await page.getByRole("button",{name:"Save to dossier & review"}).click();
  await expect(page.locator("[data-activity-status]")).toContainText("Saved");
 }
 await page.goto("operation/");await expect(page.locator("[data-dossier]")).toContainText("12 of 12");
});
test("a corrupt stored dossier is protected until explicit replacement",async({page})=>{
 await page.addInitScript(()=>localStorage.setItem("mastermind:SLOP4408:v1","corrupted-fixture"));
 await page.goto("operation/");await expect(page.locator("[data-global-status]")).toContainText("not been overwritten");
 await expect(page.getByRole("button",{name:"Recover original browser record"})).toBeVisible();
});
test("blocked storage still permits local work and export",async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(window,"localStorage",{get(){throw new DOMException("Blocked","SecurityError");}}));
 await page.goto("sessions/week-02/");await page.getByRole("button",{name:"Use example response"}).click();await page.getByRole("button",{name:"Save to dossier & review"}).click();
 await expect(page.locator("[data-activity-status]")).toContainText("Saving is unavailable");
 const downloadPromise=page.waitForEvent("download");await page.getByRole("button",{name:"Export backup JSON"}).click();const download=await downloadPromise;
 const backup=JSON.parse(await readFile((await download.path())!,"utf8"));expect(backup.answers.evidence.reflection).toContain("receipt");expect(backup.answers.evidence.classifications.receipt.category).toBe("observation");
});
test("imported markup stays text and does not execute",async({page})=>{
 const save=emptySave();save.answers.contract={choice:"extract",reflection:'<img src=x onerror="window.pwned=true">',savedAt:new Date().toISOString()};
 await page.goto("operation/");await page.locator("[data-import]").setInputFiles({name:"text.json",mimeType:"application/json",buffer:Buffer.from(JSON.stringify(save))});
 await expect(page.locator("[data-dossier]")).toContainText("<img");await expect(page.locator("[data-dossier] img")).toHaveCount(0);
});
test("course and paper alternatives remain available without JavaScript",async({browser,baseURL})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();
 await page.goto(baseURL+"sessions/week-07/");await page.getByText("Worksheet, feedback and exemplar",{exact:true}).click();await expect(page.getByText("Worked response:",{exact:false})).toBeVisible();await expect(page.locator("h1")).toBeVisible();
 await context.close();
});
test("reduced motion, delayed scripts and lecture deck remain usable",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.route(/\.js(?:\?|$)/,async route=>{await new Promise(resolve=>setTimeout(resolve,100));await route.continue();});
 await page.goto("decks/week-07/");await expect(page.locator(".reveal")).toBeVisible();
 await expect(page.locator(".slides > section")).toHaveCount(14);
});

test("hero title and schematic remain inside the visible board",async({page})=>{
 await page.goto("");
 const fit=await page.locator(".hero-board").evaluate(board=>{
  const heading=board.querySelector("h1")!;const diagram=board.querySelector("svg")!;const b=board.getBoundingClientRect();const d=diagram.getBoundingClientRect();
  return heading.scrollWidth<=heading.clientWidth+1&&d.left>=b.left&&d.right<=b.right+1;
 });expect(fit).toBe(true);
});
test("every slide fits and has readable text and working visible navigation",async({page})=>{
 await page.goto("decks/week-07/");await page.waitForSelector(".reveal.ready");
 for(let i=0;i<14;i++){
  const slide=page.locator(".slides > section.present");
  const fit=await slide.evaluate(n=>{const p=n.querySelector("p")!;const r=p.getBoundingClientRect();return {textHeight:r.height,overflow:n.scrollHeight>n.clientHeight+2,width:n.getBoundingClientRect().width};});
  expect(fit.textHeight).toBeGreaterThan(15);expect(fit.overflow).toBe(false);
  if(i<13)await slide.getByRole("button",{name:"Next →",exact:true}).click();
 }
});