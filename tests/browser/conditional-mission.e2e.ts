import {test,expect,type Page} from "@playwright/test";
import {readFile} from "node:fs/promises";
import {performField,recordOutcome} from "./mission-helpers";
import type {Ending} from "../../src/lib/mission-engine";

async function role(page:Page,id:string){await page.locator('[data-role="'+id+'"]').click();}
async function zone(page:Page,id:string){await page.locator('[data-zone="'+id+'"]').click();}
async function originalPlan(page:Page){
 await role(page,"coordinator");await zone(page,"dispatch");
 await page.locator("[data-plan] textarea").fill("Initial plan: determine the objective's necessary evidence, assign checks and explain why irrelevant apparatus can be omitted.");
 await page.locator("[data-plan] button").click();
}
async function diagnosePower(page:Page){
 await role(page,"systems");await zone(page,"power");
 await page.locator("[data-measure]").click();await page.locator("[data-fuse]").selectOption("intact");await page.locator("[data-switch]").check();
}

for(const ending of ["physical","digital","stabilise"] as const)test("independent "+ending+" completes using only its causal requirements",async({page})=>{
 await page.goto("operation/");await expect(page.locator("[data-start-mission]")).toBeEnabled();
 await page.locator("[data-objective]").selectOption(ending);await page.locator("[data-field-inspect]").click();
 await originalPlan(page);
 await role(page,"observer");await zone(page,"arrival");
 for(const item of ["lens","spool","tile","manifest"])await page.locator('[data-inspect="'+item+'"]').click();
 if(ending==="physical"){await page.locator('[data-inspect="map"]').click();await page.locator("[data-orient] select").selectOption("180");await page.locator("[data-orient] button").click();}
 await role(page,"investigator");await zone(page,"control");await page.locator("[data-replica] button").click();
 if(ending==="digital")await page.locator("[data-policy] button").click();
 if(ending!=="digital"){
  await role(page,"systems");await zone(page,"workshop");await page.locator("[data-follower]").selectOption("36");await page.locator("[data-brake]").check();await page.locator("[data-turn]").click();
 }
 if(ending!=="physical")await diagnosePower(page);
 await role(page,"coordinator");await zone(page,"archive");
 await page.locator('[data-agreement] [name="preserve"]').check();await page.locator('[data-agreement] [name="recipient"]').fill("Meridian custodian");await page.locator("[data-agreement] button").click();
 await page.locator('[data-handoff] [name="item"]').selectOption("verified archive");await page.locator('[data-handoff] [name="destination"]').selectOption("dispatch");await page.locator('[data-handoff] [name="condition"]').selectOption("after integrity check");await page.locator("[data-handoff] button").click();
 if(ending==="physical"){await role(page,"observer");await page.locator("[data-route] select").selectOption("service");await page.locator("[data-route] button").click();}
 await role(page,"coordinator");await zone(page,"dispatch");
 await page.locator("[data-plan] textarea").fill("Revised plan: the observed source and tested dependencies support this approach. We retain a responsible custodian and record the rejected alternative.");
 await page.locator("[data-plan] button").click();
 await expect(page.locator("[data-mission-progress]")).toContainText(ending==="physical"?"8 / 8":"7 / 7");
 const required=await page.locator("[data-objectives]").innerText();
 expect(required).not.toContain("Recall the manifest");
 if(ending!=="physical"){expect(required).not.toContain("Test an available route");expect(required).not.toContain("Reconstruct orientation");}
 if(ending==="digital")expect(required).not.toContain("Restore the recovery cradle");
 await performField(page);await recordOutcome(page,ending);await page.locator('[data-ending="'+ending+'"]').click();
 await expect(page.locator("[data-debrief]")).toBeVisible();
 const downloaded=page.waitForEvent("download");await page.locator("[data-export-mission]").click();
 const record=await readFile((await (await downloaded).path())!,"utf8");
 expect(record).toContain("Conditional recovery v3");expect(record).toContain("## Required capability scope");
 await page.reload();await expect(page.locator("[data-ending-text]")).toContainText("practice evidence");
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test("relay recipient owns the current card and stale read-back blocks transmission",async({page})=>{
 await page.goto("assessments/assignment-2/");await expect(page.locator("[data-start-mission]")).toBeEnabled();
 await page.locator("[data-scenario]").selectOption("conflicting-archive");await page.locator("[data-start-mission]").click();await page.locator("[data-restart-confirm]").click();
 await page.locator("[data-field-inspect]").click();await diagnosePower(page);
 await role(page,"investigator");await zone(page,"control");
 await page.locator("[data-replica] select").selectOption("B");await page.locator("[data-replica] button").click();await page.locator("[data-policy] button").click();
 await role(page,"coordinator");await zone(page,"archive");
 await expect(page.locator("[data-relay-receiving-card]")).toContainText("RELAY-B-SECOND");
 await page.locator('[data-handoff] [name="item"]').selectOption("verified archive");await page.locator('[data-handoff] [name="destination"]').selectOption("dispatch");await page.locator('[data-handoff] [name="condition"]').selectOption("after integrity check");
 await page.locator('[data-handoff] [name="acknowledgement"]').fill("RELAY-A-FIRST");await page.locator("[data-handoff] button").click();
 await expect(page.locator("[data-mission-status]")).toHaveAttribute("data-success","false");await expect(page.locator("[data-field-execute]")).toBeDisabled();
 await page.locator('[data-handoff] [name="acknowledgement"]').fill("RELAY-B-SECOND");await page.locator("[data-handoff] button").click();
 await expect(page.locator("[data-mission-progress]")).toContainText("4 / 4");
 await performField(page);await page.locator('[data-ending="digital"]').click();await expect(page.locator("[data-debrief]")).toBeVisible();
});
