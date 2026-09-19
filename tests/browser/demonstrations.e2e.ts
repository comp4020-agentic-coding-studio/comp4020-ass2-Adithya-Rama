import {test,expect,type Page} from "@playwright/test";
import {readFile} from "node:fs/promises";
import type {Demonstration} from "../../src/lib/demonstration-types";

test.use({launchOptions:{args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']}});
async function definition(page:Page){return await page.locator("[data-demo-definition]").evaluate(node=>JSON.parse(node.textContent!)) as Demonstration;}
async function solve(page:Page,demo:Demonstration,index:number){
 const chapter=demo.steps[index]!;
 for(const control of chapter.controls){
  const field=page.locator('[data-demo-field="'+control.id+'"]');
  if(control.type==="order"){
   const expected=control.expected as string[];
   for(let target=0;target<expected.length;target++){
    const label=control.options?.find(o=>o.value===expected[target])?.label??expected[target]!;
    let current=(await field.locator("li>span").allTextContents()).indexOf(label);
    while(current>target){await field.getByRole("button",{name:"Move "+label+" earlier",exact:true}).click();current--;}
   }
  }else if(control.type==="toggle")await field.locator("input").setChecked(control.expected===true);
  else if(control.type==="select")await field.locator("select").selectOption(String(control.expected));
  else await field.locator("input").fill(String(control.expected));
 }
 await page.locator("[data-demo-form]").getByRole("button",{name:"Test my decision",exact:true}).click();
 await expect(page.locator("[data-demo-feedback]")).toHaveAttribute("data-correct","true");
 await expect(page.locator("[data-demo-outcome]")).toHaveText(chapter.success);
}
const ids=[...Array.from({length:12},(_,i)=>"lab-"+String(i+1).padStart(2,"0")),"assessment-fieldwork","assessment-a1","assessment-a2","assessment-final"];
for(const id of ids)test("complete alternate worked example through learner controls: "+id,async({page})=>{
 test.setTimeout(90000);
 await page.goto("demonstrations/"+id+"/?mode=control");
 const demo=await definition(page);
 const before=await page.evaluate(()=>localStorage.getItem("mastermind:SLOP4408:v2"));
 for(let i=0;i<demo.steps.length;i++){
  await expect(page.locator("[data-demo-step-title]")).toHaveText(demo.steps[i]!.title);
  await solve(page,demo,i);
  if(i<demo.steps.length-1)await page.locator("[data-demo-next]").click();
 }
 await expect(page.locator("[data-demo-coaching-result]")).toContainText(demo.steps.length+" of "+demo.steps.length);
 expect(await page.evaluate(()=>localStorage.getItem("mastermind:SLOP4408:v2"))).toBe(before);
 const downloaded=page.waitForEvent("download");await page.locator("[data-demo-download]").click();
 const sample=await readFile((await (await downloaded).path())!,"utf8");
 expect(sample).toBe(demo.artifact.markdown);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test("feedback names the actual mistake and a hint changes the coaching record",async({page})=>{
 await page.goto("demonstrations/lab-04/?mode=control");const demo=await definition(page);
 const index=demo.steps.findIndex(s=>s.controls.some(c=>c.type==="number"));
 await page.locator('[data-demo-jump="'+index+'"]').click();
 const control=demo.steps[index]!.controls.find(c=>c.type==="number")!;
 const wrong=control.expected===control.min?control.max!:control.min!;
 await page.locator('[data-demo-input="'+control.id+'"]').fill(String(wrong));
 await page.locator("[data-demo-form]").getByRole("button",{name:"Test my decision",exact:true}).click();
 await expect(page.locator("[data-demo-feedback]")).toHaveAttribute("data-correct","false");
 await expect(page.locator("[data-demo-feedback]")).toContainText(control.label);
 await page.locator("[data-demo-hint]").click();await expect(page.locator("[data-demo-hint-text]")).toBeVisible();
 await solve(page,demo,index);
 await expect(page.locator("[data-demo-coaching-result]")).toContainText("0 solved before");
 await page.locator('[data-demo-input="'+control.id+'"]').fill(String(wrong));
 await expect(page.locator("[data-demo-caption]")).toHaveText(demo.steps[index]!.narration);
 await expect(page.locator("[data-demo-observed]")).toBeHidden();
});
test("static transcript and complete worked submission are readable without scripting",async({browser,baseURL},testInfo)=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:testInfo.project.use.viewport});
 const page=await context.newPage();await page.goto(baseURL+"demonstrations/assessment-final/");
 await page.locator(".demo-transcript>summary").click();await expect(page.locator(".demo-transcript>section")).toHaveCount(18);
 await page.locator(".demo-finished details>summary").click();await expect(page.locator(".demo-example-document")).toContainText("Version 1");
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await context.close();
});
test("every assessment and lab links to its own example",async({page})=>{
 for(const [path,id] of [["sessions/week-01/","lab-01"],["sessions/week-12/","lab-12"],["assessments/fieldwork/","assessment-fieldwork"],["assessments/assignment-1/","assessment-a1"],["assessments/assignment-2/","assessment-a2"],["assessments/final-project/","assessment-final"]]){
  await page.goto(path);await expect(page.locator(".demo-invitation a").first()).toHaveAttribute("href",new RegExp("/demonstrations/"+id+"/$"));
 }
});
test("guided 3D playback pauses, shows its result and hands control to the learner",async({page})=>{
 test.setTimeout(90000);
 await page.goto("demonstrations/lab-04/");
 await page.locator("[data-demo-watch]").click();
 await expect(page.locator("[data-world-canvas] canvas")).toBeVisible({timeout:45000});
 await expect(page.locator("[data-demo-observed]")).toBeVisible({timeout:35000});
 await page.locator("[data-demo-play]").click();await expect(page.locator("[data-demo-play]")).toHaveText("Play");
 const chapter=await page.locator("[data-demo-step-title]").textContent();await page.waitForTimeout(400);expect(await page.locator("[data-demo-step-title]").textContent()).toBe(chapter);
 await page.locator("button[data-demo-control]").click();await expect(page.locator("[data-demo-form]")).toBeVisible();
 await expect(page.locator("[data-demo-coaching-result]")).toContainText("No control attempt");
});

test("keyboard ordering keeps focus on the moved item at both boundaries",async({page})=>{
 await page.goto("demonstrations/lab-02/?mode=control");const demo=await definition(page);
 const index=demo.steps.findIndex(s=>s.controls.some(c=>c.type==="order"));
 await page.locator('[data-demo-jump="'+index+'"]').click();
 const control=demo.steps[index]!.controls.find(c=>c.type==="order")!;
 const field=page.locator('[data-demo-field="'+control.id+'"]'),rows=field.locator("li");
 const name=await rows.nth(1).locator("span").textContent();
 const earlier=field.getByRole("button",{name:"Move "+name+" earlier",exact:true});
 const later=field.getByRole("button",{name:"Move "+name+" later",exact:true});
 await earlier.focus();await page.keyboard.press("Enter");
 await expect(rows.first().locator("span")).toHaveText(name!);
 await expect(later).toBeFocused();
 const count=await rows.count();
 for(let i=1;i<count;i++)await page.keyboard.press("Enter");
 await expect(rows.last().locator("span")).toHaveText(name!);
 await expect(earlier).toBeFocused();
 await page.keyboard.press("Enter");
 await expect(rows.nth(count-2).locator("span")).toHaveText(name!);
 await expect(earlier).toBeFocused();
});
test("printing includes the complete example and restores the reading state",async({page})=>{
 await page.goto("demonstrations/assessment-final/");
 const finished=page.locator(".demo-finished details"),transcript=page.locator(".demo-transcript"),reason=page.locator("[data-demo-why]");
 await expect(finished).not.toHaveAttribute("open","");
 await expect(reason).toHaveAttribute("open","");
 await page.evaluate(()=>window.dispatchEvent(new Event("beforeprint")));
 await expect(finished).toHaveAttribute("open","");await expect(transcript).toHaveAttribute("open","");
 await page.emulateMedia({media:"print"});
 await expect(page.locator(".demo-example-document")).toBeVisible();
 await expect(page.locator(".demo-theatre")).toBeHidden();
 await page.evaluate(()=>window.dispatchEvent(new Event("afterprint")));
 await page.emulateMedia({media:"screen"});
 await expect(finished).not.toHaveAttribute("open","");await expect(transcript).not.toHaveAttribute("open","");
 await expect(reason).toHaveAttribute("open","");
});