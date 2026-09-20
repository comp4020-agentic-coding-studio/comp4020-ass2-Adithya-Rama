import {test,expect,type Page,type Locator} from "@playwright/test";
import {mkdir,readFile} from "node:fs/promises";
import {newPassport} from "../../src/lib/passport";
import {newMission} from "../../src/lib/mission-engine";
import {completeRecovery,recordOutcome} from "./mission-helpers";
test.use({launchOptions:{args:["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"]}});

async function waitForRenderedZone(page:Page,scene:Locator,zone:string,before=0){
 await scene.scrollIntoViewIfNeeded();
 await expect(scene).toHaveAttribute("data-world-rendered-zone",zone,{timeout:15000});
 await expect.poll(async()=>Number(await scene.getAttribute("data-world-render-count")),{timeout:15000}).toBeGreaterThanOrEqual(before+4);
 // Wait for committed animation frames, then drain queued GPU commands before capturing.
 await page.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));
 await scene.locator("canvas").evaluate(canvas=>{
  const gl=(canvas as HTMLCanvasElement).getContext("webgl2")||(canvas as HTMLCanvasElement).getContext("webgl");
  gl?.finish();
 });
}
test("final requires its own map and the verified profile before the cradle can work",async({page})=>{
 await page.goto("operation/");await page.locator('[data-inspect="manifest"]').click();await expect(page.locator("[data-inspection]")).toContainText("tile, lens, spool");
 await page.locator('[data-inspect="map"]').click();await expect(page.locator("[data-inspection]")).toContainText("180");
 await page.locator("[data-orient] select").selectOption("90");await page.locator("[data-orient] button").click();await expect(page.locator("[data-mission-status]")).toHaveAttribute("data-success","false");
 await page.locator('[data-role="systems"]').click();await page.locator('[data-zone="workshop"]').click();await page.locator("[data-brake]").check();await page.locator("[data-turn]").click();await expect(page.locator("[data-mission-status]")).toContainText("Investigator");
 await page.locator('[data-role="investigator"]').click();await page.locator('[data-zone="control"]').click();await page.locator("[data-replica] button").click();
 await page.locator('[data-role="systems"]').click();await page.locator('[data-zone="workshop"]').click();await expect(page.locator("[data-profile-status]")).toContainText("36");
 await page.locator("[data-follower]").selectOption("24");await page.locator("[data-turn]").click();await expect(page.locator("[data-mission-status]")).toHaveAttribute("data-success","false");
 await page.locator("[data-follower]").selectOption("36");await page.locator("[data-turn]").click();await expect(page.locator("[data-mission-status]")).toHaveAttribute("data-success","true");
});

test("ending evidence belongs to its recorded outcome and later source changes reopen dependent work",async({page})=>{
 await completeRecovery(page);await page.locator('[data-ending="physical"]').click();await expect(page.locator("[data-debrief]")).toBeHidden();await expect(page.locator("[data-mission-status]")).toContainText("outcome evidence");
 await recordOutcome(page,"physical");
 await page.locator('[data-ending="digital"]').click();await expect(page.locator("[data-debrief]")).toBeHidden();
 await page.locator('[data-role="investigator"]').click();await page.locator('[data-zone="control"]').click();await page.locator("[data-replica] select").selectOption("B");await page.locator("[data-replica] button").click();
 await expect(page.locator("[data-mission-progress]")).toContainText("7 / 11");
 await page.locator('[data-zone="dispatch"]').click();await expect(page.locator("[data-outcome-status]")).toContainText("No current outcome evidence");
});

test("digital proof rejects another receipt and recipient, then exports its actual accepted evidence",async({page})=>{
 await completeRecovery(page,"conflicting-archive");
 const form=page.locator("[data-resolution-evidence]");await form.locator("[data-outcome-choice]").selectOption("digital");
 await form.locator('[name="recipient"]').fill("Meridian custodian");await form.locator('[name="receipt"]').fill("RECEIPT-A36");await form.locator('[name="digital-location"]').fill("Archive chamber");await form.locator('[name="preserve-digital"]').check();await form.locator("button").click();
 await expect(page.locator("[data-mission-status]")).toContainText("RECEIPT-B48");
 await form.locator('[name="receipt"]').fill("RECEIPT-B48");await form.locator('[name="recipient"]').fill("Unagreed recipient");await form.locator("button").click();await expect(page.locator("[data-mission-status]")).toContainText("renegotiate");
 await recordOutcome(page,"digital","B");await page.locator('[data-ending="digital"]').click();await expect(page.locator("[data-debrief]")).toBeVisible();
 const downloaded=page.waitForEvent("download");await page.locator("[data-export-mission]").click();const record=await readFile((await (await downloaded).path())!,"utf8");
 for(const fact of ["RECEIPT-B48","follower 48 teeth","Meridian Archive chamber","Meridian custodian","180 degrees"])expect(record).toContain(fact);
 await page.reload();await expect(page.locator("[data-ending-text]")).toContainText("RECEIPT-B48");
});

test("legacy completed recovery remains labelled and exportable when a new current trial begins",async({page})=>{
 const legacy=newMission();delete legacy.recovery;legacy.status="complete";legacy.ending="physical";
 const passport={...newPassport(),missions:{recovery:legacy},runs:[legacy]};
 await page.addInitScript(raw=>localStorage.setItem("mastermind:SLOP4408:v2",raw),JSON.stringify(passport));
 await page.goto("operation/");await expect(page.locator("[data-legacy-mission]")).toContainText("Legacy recovery record");await expect(page.locator("[data-ending-text]")).toContainText("no verified linked-profile");
 const downloaded=page.waitForEvent("download");await page.locator("[data-export-mission]").click();expect(await readFile((await (await downloaded).path())!,"utf8")).toContain("Legacy recovery v1");
 await page.locator("[data-start-mission]").click();await page.locator("[data-restart-confirm]").click();
 await expect(page.locator("[data-legacy-mission]")).toBeHidden();await expect(page.locator("[data-mission-progress]")).toContainText("0 / 11");
 await expect(page.locator("[data-run-comparison]")).toContainText("Legacy recovery record");
});

test("final profile B geometry and all three outcome forms remain readable at the marking viewports",async({page},info)=>{
 test.setTimeout(120000);await completeRecovery(page,"conflicting-archive");
 await mkdir(".browser-rubric-audit",{recursive:true});
 const scene=page.locator("[data-academy-world]").first();await scene.locator("[data-world-launch]").click();
 await expect(scene.locator("[data-world-canvas] canvas")).toBeVisible({timeout:45000});
 await expect(scene.locator("[data-world-loading]")).toBeHidden({timeout:45000});
 await scene.locator("[data-world-fullscreen]").click();await expect(scene).toHaveAttribute("data-immersive","true");
 for(const ending of ["physical","digital","stabilise"] as const){
  await recordOutcome(page,ending,"B");
  const form=page.locator(".resolution-evidence");
  expect(await form.evaluate(node=>node.scrollWidth<=node.clientWidth+1)).toBe(true);
  await form.locator("[data-outcome-choice]").scrollIntoViewIfNeeded();
  await page.screenshot({path:".browser-rubric-audit/outcome-"+ending+"-"+info.project.name+".png"});
  await form.locator("form > button").scrollIntoViewIfNeeded();
  await page.screenshot({path:".browser-rubric-audit/outcome-"+ending+"-detail-"+info.project.name+".png"});
 }
 await scene.locator("[data-immersive-exit]").click();await expect(scene).toHaveAttribute("data-immersive","false");
 let before=Number(await scene.getAttribute("data-world-render-count"));
 await page.locator('[data-role="systems"]').click();await page.locator('[data-zone="workshop"]').click();
 await waitForRenderedZone(page,scene,"workshop",before);
 const facts=JSON.parse((await scene.getAttribute("data-world-mission-facts"))!);expect(facts).toMatchObject({kind:"recovery",orientation:180,profile:"B",follower:48,requiredFollower:48});
 await scene.screenshot({path:".browser-rubric-audit/final-profile-B-"+info.project.name+".png"});
 before=Number(await scene.getAttribute("data-world-render-count"));
 await page.locator('[data-zone="arrival"]').click();
 await waitForRenderedZone(page,scene,"arrival",before);
 await expect(scene).toHaveAttribute("data-world-rendered-room","perception");
 await scene.screenshot({path:".browser-rubric-audit/final-arrival-"+info.project.name+".png"});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
