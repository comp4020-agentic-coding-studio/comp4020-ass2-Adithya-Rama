import {test,expect,type Page} from "@playwright/test";
import {readFile} from "node:fs/promises";
const base="/comp4020-ass2-Adithya-Rama/";
async function mission(page:Page,scenario="baseline"){
 await page.goto(base+"operation/");
 await expect(page.locator("[data-start-mission]")).toBeEnabled();
 if(scenario!=="baseline"){await page.locator("[data-scenario]").selectOption(scenario);await page.locator("[data-start-mission]").click();await page.locator("[data-restart-confirm]").click();}
 const role=async(r:string)=>page.locator('[data-role="'+r+'"]').click();
 const zone=async(z:string)=>page.locator('[data-zone="'+z+'"]').click();
 await role("coordinator");await zone("dispatch");await page.locator("[data-plan] textarea").fill("Original plan: restore the equipment, inspect the original source and use the upper route.");await page.locator("[data-plan] button").click();
 await role("observer");await zone("arrival");
 for(const item of ["lens","spool","tile","map","manifest"])await page.locator('[data-inspect="'+item+'"]').click();
 await page.locator("[data-recall] input").fill("lens, spool, tile");await page.locator("[data-recall] button").click();
 await page.locator("[data-orient] select").selectOption("90");await page.locator("[data-orient] button").click();
 await role("systems");await zone("workshop");await page.locator("[data-follower]").selectOption("24");await page.locator("[data-brake]").check();await page.locator("[data-turn]").click();
 await zone("power");await page.locator("[data-measure]").click();await page.locator("[data-fuse]").selectOption("intact");await page.locator("[data-switch]").check();
 await role("investigator");await zone("control");await page.locator("[data-replica] select").selectOption(scenario==="conflicting-archive"?"B":"A");await page.locator("[data-replica] button").click();await page.locator("[data-policy] button").click();
 await role("coordinator");await zone("archive");await page.locator("[data-agreement] input[type=checkbox]").check();await page.locator("[data-agreement] input[name=recipient]").fill("Meridian custodian");await page.locator("[data-agreement] button").click();
 await page.locator('[data-handoff] [name=item]').selectOption("verified archive");await page.locator('[data-handoff] [name=destination]').selectOption("dispatch");await page.locator('[data-handoff] [name=condition]').selectOption("after integrity check");await page.locator("[data-handoff] button").click();
 await role("observer");await page.locator("[data-route] select").selectOption(scenario==="equipment-failure"?"service":"upper");await page.locator("[data-route] button").click();
 await role("coordinator");await zone("dispatch");await page.locator("[data-plan] textarea").fill("Revised plan: use the tested route and current signed source. Preserve the original and record the receiving custodian.");await page.locator("[data-plan] button").click();
}
test("course identity, direct navigation and mobile reading remain available",async({page})=>{
 await page.goto(base);await expect(page.locator(".academy-page h1")).toContainText("MASTER");
 await page.getByRole("navigation",{name:"Course navigation",exact:true}).getByRole("link",{name:"Assessments",exact:true}).click();
 await expect(page.locator(".academy-page h1")).toContainText("Put the skill");
 for(const week of ["02","07","11"]){await page.goto(base+"lectures/week-"+week+"/");await expect(page.locator(".academy-page h1")).toBeVisible();await page.reload();await expect(page.locator("main")).not.toContainText("Grand Reserve");}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test("complete a recovery, preserve revisions, and download its actual debrief",async({page})=>{
 await mission(page);await expect(page.locator("[data-plans]")).toContainText("Original plan");await expect(page.locator("[data-plans]")).toContainText("Revised plan");
 await page.locator('[data-ending="physical"]').click();await expect(page.locator("[data-debrief]")).toBeVisible();await expect(page.locator("[data-ending-text]")).toContainText("Physical archive recovered");
 const downloaded=page.waitForEvent("download");await page.locator("[data-export-mission]").click();const result=await downloaded;const text=await readFile((await result.path())!,"utf8");expect(text).toContain("## Debrief");expect(text).toContain("Version 1");expect(text).toContain("Physical archive recovered");
 await page.reload();await expect(page.locator("[data-debrief]")).toBeVisible();
});
test("changed equipment supports the alternative recovery ending",async({page})=>{
 await mission(page,"equipment-failure");await page.locator('[data-ending="stabilise"]').click();await expect(page.locator("[data-ending-text]")).toContainText("Archive stabilised");await expect(page.locator("[data-ending-text]")).toContainText("service route");
});
test("a changed signed source supports verified digital recovery",async({page})=>{
 await mission(page,"conflicting-archive");await page.locator('[data-ending="digital"]').click();await expect(page.locator("[data-ending-text]")).toContainText("Verified digital copy recovered");await expect(page.locator("[data-ending-text]")).toContainText("later source");
});
test("export reset restore and malformed import preserve the selected work",async({page})=>{
 await page.goto(base+"assessments/assignment-1/");await expect(page.locator('[data-inspect="lens"]')).toBeEnabled();await page.locator('[data-inspect="lens"]').click();
 const saved=page.waitForEvent("download");await page.locator('[data-passport-export="json"]').click();const path=(await (await saved).path())!;const raw=await readFile(path);
 await page.locator("[data-passport-import]").setInputFiles({name:"bad.json",mimeType:"application/json",buffer:Buffer.from("{broken")});await expect(page.locator("[data-passport-status]")).toContainText("not valid JSON");await expect(page.locator("[data-inspection]")).toContainText("Bronze lens");
 await page.locator("[data-passport-reset]").click();await page.locator("[data-dialog-confirm]").click();await expect(page.locator("[data-passport-count]")).toContainText("0 practice");
 await page.locator("[data-passport-import]").setInputFiles({name:"backup.json",mimeType:"application/json",buffer:raw});await page.reload();await expect(page.locator("[data-action-log]")).toContainText("Bronze lens");
});
test("early ending explains missing practical evidence",async({page})=>{
 await page.goto(base+"operation/");await page.locator('[data-zone="dispatch"]').click();await page.locator('[data-ending="physical"]').click();await expect(page.locator("[data-mission-status]")).toContainText("Before closing this trial");await expect(page.locator("[data-debrief]")).toBeHidden();
});
test("blocked browser storage still downloads this tab's mission",async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(window,"localStorage",{get(){throw new DOMException("blocked","SecurityError");}});});
 await page.goto(base+"assessments/assignment-1/");await page.locator('[data-inspect="lens"]').click();await expect(page.locator("[data-passport-status]")).toContainText("unavailable");
 const downloaded=page.waitForEvent("download");await page.locator('[data-passport-export="json"]').click();const raw=await readFile((await (await downloaded).path())!,"utf8");expect(raw).toContain("Bronze lens");
});
test("teaching and full worksheets remain available without JavaScript",async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const page=await context.newPage();await page.goto("http://127.0.0.1:4321"+base+"sessions/week-04/");await page.locator(".training-worksheet summary").click();await expect(page.locator(".training-worksheet")).toContainText("Output turns");await expect(page.getByRole("navigation",{name:"Course navigation",exact:true})).toBeVisible();await context.close();
});
test("reduced motion and slow scene loading leave course controls usable",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.route("**/world/*.glb",async route=>{await new Promise(r=>setTimeout(r,200));await route.abort();});
 await page.goto(base+"sessions/week-04/");await page.locator("[data-world-launch]").click();await expect(page.locator("[data-training-phase=transfer]")).toBeEnabled();await page.locator("[data-training-phase=transfer]").click();await expect(page.locator("[data-training-controls]")).toContainText("6");await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
