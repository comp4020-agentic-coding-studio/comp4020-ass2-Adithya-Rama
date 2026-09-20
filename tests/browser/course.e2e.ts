import {test,expect,type Page} from "@playwright/test";
import {readFile} from "node:fs/promises";
import {completeRecovery as mission,recordOutcome} from "./mission-helpers";
const base="/comp4020-ass2-Adithya-Rama/";
test("course identity, direct navigation and mobile reading remain available",async({page})=>{
 await page.goto(base);await expect(page.locator(".academy-page h1")).toContainText("MASTER");
 await page.getByRole("navigation",{name:"Course navigation",exact:true}).getByRole("link",{name:"Assessments",exact:true}).click();
 await expect(page.locator(".academy-page h1")).toContainText("Put the skill");
 for(const week of ["02","07","11"]){await page.goto(base+"lectures/week-"+week+"/");await expect(page.locator(".academy-page h1")).toBeVisible();await page.reload();await expect(page.locator("main")).not.toContainText("Grand Reserve");}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test("complete a recovery, preserve revisions, and download its actual debrief",async({page})=>{
 await mission(page);await recordOutcome(page,"physical");await expect(page.locator("[data-plans]")).toContainText("Original plan");await expect(page.locator("[data-plans]")).toContainText("Revised plan");
 await page.locator('[data-ending="physical"]').click();await expect(page.locator("[data-debrief]")).toBeVisible();await expect(page.locator("[data-ending-text]")).toContainText("Physical archive recovered");
 const downloaded=page.waitForEvent("download");await page.locator("[data-export-mission]").click();const result=await downloaded;const text=await readFile((await result.path())!,"utf8");expect(text).toContain("## Debrief");expect(text).toContain("Version 1");expect(text).toContain("Physical archive recovered");
 await page.reload();await expect(page.locator("[data-debrief]")).toBeVisible();
});
test("changed equipment supports the alternative recovery ending",async({page})=>{
 await mission(page,"equipment-failure");await recordOutcome(page,"stabilise");await page.locator('[data-ending="stabilise"]').click();await expect(page.locator("[data-ending-text]")).toContainText("Archive stabilised");await expect(page.locator("[data-ending-text]")).toContainText("service route");
});
test("a changed signed source supports verified digital recovery",async({page})=>{
 await mission(page,"conflicting-archive");await recordOutcome(page,"digital","B");await page.locator('[data-ending="digital"]').click();await expect(page.locator("[data-ending-text]")).toContainText("Verified digital copy recovered");await expect(page.locator("[data-ending-text]")).toContainText("later source");
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
test("teaching and full worksheets remain available without JavaScript",async({browser,baseURL})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const page=await context.newPage();await page.goto(new URL("sessions/week-04/",baseURL!).href);await page.locator(".training-worksheet summary").click();await expect(page.locator(".training-worksheet")).toContainText("Output turns");await expect(page.getByRole("navigation",{name:"Course navigation",exact:true})).toBeVisible();await context.close();
});
test("reduced motion and slow scene loading leave course controls usable",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.route("**/world/*.glb",async route=>{await new Promise(r=>setTimeout(r,200));await route.abort();});
 await page.goto(base+"sessions/week-04/");await page.locator("[data-world-launch]").click();await expect(page.locator("[data-training-phase=transfer]")).toBeEnabled();await page.locator("[data-training-phase=transfer]").click();await expect(page.locator("[data-training-controls]")).toContainText("6");await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
