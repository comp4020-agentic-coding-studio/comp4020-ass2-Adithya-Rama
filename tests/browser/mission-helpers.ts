import {expect,type Page,type Locator} from "@playwright/test";
import type {Ending,Scenario} from "../../src/lib/mission-engine";

/** Complete the current integrated final using the actual published controls. */
export async function completeRecovery(page:Page,scenario:Scenario="baseline"){
 await page.goto("operation/");await expect(page.locator("[data-start-mission]")).toBeEnabled();
 if(scenario!=="baseline"){await page.locator("[data-scenario]").selectOption(scenario);await page.locator("[data-start-mission]").click();await page.locator("[data-restart-confirm]").click();}
 await page.locator("[data-field-inspect]").click();
 const role=async(id:string)=>page.locator('[data-role="'+id+'"]').click();
 const zone=async(id:string)=>page.locator('[data-zone="'+id+'"]').click();
 await role("coordinator");await zone("dispatch");await page.locator("[data-plan] textarea").fill("Original plan: verify the source, configure its matching cradle, restore power and test the upper route.");await page.locator("[data-plan] button").click();
 await role("observer");await zone("arrival");
 for(const item of ["lens","spool","tile","map","manifest"])await page.locator('[data-inspect="'+item+'"]').click();
 await page.locator("[data-recall] input").fill("tile, lens, spool");await page.locator("[data-recall] button").click();
 await page.locator("[data-orient] select").selectOption("180");await page.locator("[data-orient] button").click();
 await role("investigator");await zone("control");await page.locator("[data-replica] select").selectOption(scenario==="conflicting-archive"?"B":"A");await page.locator("[data-replica] button").click();await page.locator("[data-policy] button").click();
 await role("systems");await zone("workshop");await page.locator("[data-follower]").selectOption(scenario==="conflicting-archive"?"48":"36");await page.locator("[data-brake]").check();await page.locator("[data-turn]").click();
 await zone("power");await page.locator("[data-measure]").click();await page.locator("[data-fuse]").selectOption("intact");await page.locator("[data-switch]").check();
 await role("coordinator");await zone("archive");await page.locator("[data-agreement] input[type=checkbox]").check();await page.locator("[data-agreement] input[name=recipient]").fill("Meridian custodian");await page.locator("[data-agreement] button").click();
 await page.locator('[data-handoff] [name=item]').selectOption("verified archive");await page.locator('[data-handoff] [name=destination]').selectOption("dispatch");await page.locator('[data-handoff] [name=condition]').selectOption("after integrity check");await page.locator("[data-handoff] button").click();
 await role("observer");await page.locator("[data-route] select").selectOption(scenario==="equipment-failure"?"service":"upper");await page.locator("[data-route] button").click();
 await role("coordinator");await zone("dispatch");await page.locator("[data-plan] textarea").fill("Revised plan: retain the verified profile and its tested cradle, use the available route and preserve the original with recorded custody.");await page.locator("[data-plan] button").click();
 await expect(page.locator("[data-mission-progress]")).toContainText(scenario==="equipment-failure"?"8 / 8":"9 / 9");
 await performField(page);
}

/** Perform the real public intervention, collection and ordered handover controls. */
export async function performField(scope:Page|Locator){
 await scope.locator('[data-zone="dispatch"]').click();
 const field=scope.locator("[data-field-operation]");
 if(await field.getAttribute("data-field-state")==="complete")return;
 // A public control requests actual avatar travel when graphics are active.
 // Each leg has a bounded world timeout; allow 30 seconds for arrival and the
 // resulting DOM update, rather than treating a five-second walk as a failure.
 const arrival={timeout:30000};
 await field.locator("[data-field-inspect]").click();
 await expect(field.locator("[data-field-execute]")).toBeEnabled(arrival);
 await field.locator("[data-field-execute]").click();
 await expect(field.locator("[data-field-collect]")).toBeEnabled(arrival);
 await field.locator("[data-field-collect]").click();
 await expect(field).toHaveAttribute("data-field-state","handover",arrival);
 const checkpoints=field.locator("[data-field-checkpoint]");
 for(let i=0;i<await checkpoints.count();i++){
  await expect(checkpoints.nth(i)).toBeEnabled(arrival);
  await checkpoints.nth(i).click();
  await expect(checkpoints.nth(i)).toHaveText(/^✓ /,arrival);
  await expect(checkpoints.nth(i)).toBeDisabled();
 }
 await expect(field.locator("[data-field-deliver]")).toBeEnabled(arrival);
 await field.locator("[data-field-deliver]").click();
 await expect(field).toHaveAttribute("data-field-state","complete",arrival);
}
export async function recordOutcome(scope:Page|Locator,ending:Ending,profile:"A"|"B"="A",recipient="Meridian custodian"){
 const form=scope.locator("[data-resolution-evidence]");
 await form.locator("[data-outcome-choice]").selectOption(ending);
 await scope.locator('[data-role="coordinator"]').click();await scope.locator('[data-zone="dispatch"]').click();
 if(!(await scope.locator("[data-plans] h4").last().textContent())?.includes("/ "+ending+" /")){
  await scope.locator("[data-plan] textarea").fill("Changed objective to "+ending+": preserve the original intention, choose the relevant evidence and explain why unrelated checks can be omitted.");
  await scope.locator("[data-plan] button").click();
 }
 await performField(scope);
 await form.locator('[name="recipient"]').fill(recipient);
 if(ending==="physical"){await form.locator('[name="support"]').check();await form.locator('[name="preserve-physical"]').check();}
 if(ending==="digital"){
  await form.locator('[name="receipt"]').fill(profile==="A"?"RECEIPT-A36":"RECEIPT-B48");
  await form.locator('[name="digital-location"]').fill("Meridian Archive chamber");
  await form.locator('[name="preserve-digital"]').check();
 }
 if(ending==="stabilise"){
  await form.locator('[name="stable"]').check();await form.locator('[name="stable-location"]').fill("Meridian supported cradle");
  await form.locator('[name="limitation"]').fill("The receiving custodian must arrange onward transport and continue the stability checks.");
 }
 await form.locator('[name="limitation"]').fill("The team chose this objective because its evidence supports the required consequence. We omitted unrelated checks, rejected an unsupported alternative and retain the custodian’s monitoring obligation.");
 await form.locator("button").click();
 await expect(scope.locator("[data-outcome-status]")).toContainText("Recorded outcome: "+ending);
}
