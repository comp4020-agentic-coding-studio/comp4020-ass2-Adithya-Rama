import {test,expect,type Page} from "@playwright/test";
import {newMission,applyMission,type MissionKind,type MissionState,type MissionAction} from "../../src/lib/mission-engine";

const key="mastermind:SLOP4408:v2";
const oldPlan="Prior plan: restore the cradle and use the upper corridor.";
function backup(missions:Partial<Record<MissionKind,MissionState>>={}){
 return {schemaVersion:2,courseCode:"SLOP4408",curriculumVersion:"last-light-1",updatedAt:new Date().toISOString(),revision:1,selectedWeek:1,records:[],drafts:{},missions,runs:[],preferences:{motion:"system",quality:"auto",audio:false}};
}
function priorMission(kind:MissionKind){
 let state=newMission(kind,"equipment-failure");
 const act=(action:MissionAction)=>{state=applyMission(state,action).state;};
 act({type:"role",role:"coordinator"});act({type:"plan",text:oldPlan});
 if(kind==="a2"){
  act({type:"role",role:"systems"});act({type:"measure"});act({type:"fuse",value:"intact"});act({type:"switch",closed:true});
 }else{
  act({type:"role",role:"observer"});
  for(const item of ["lens","spool","tile","map","manifest"])act({type:"inspect",item});
 }
 act({type:"zone",zone:"dispatch"});return state;
}
async function seed(page:Page,kind:MissionKind){
 const saved=backup({[kind]:priorMission(kind)});
 await page.addInitScript(({key,raw})=>localStorage.setItem(key,raw),{key,raw:JSON.stringify(saved)});
 await page.goto(kind==="a1"?"assessments/assignment-1/":kind==="a2"?"assessments/assignment-2/":"operation/");
 await expect(page.locator("[data-start-mission]")).toBeEnabled();
 await expect(page.locator("[data-plans]")).toContainText(oldPlan);
 await page.locator("[data-plan] textarea").fill("An unsaved previous plan should also be cleared.");
}
async function restore(page:Page,payload:ReturnType<typeof backup>){
 await page.locator("[data-passport-import]").setInputFiles({name:"replacement.json",mimeType:"application/json",buffer:Buffer.from(JSON.stringify(payload))});
 await page.locator("[data-dialog-confirm]").click();
}
async function storedMission(page:Page,kind:MissionKind){
 return page.evaluate(({key,kind})=>JSON.parse(localStorage.getItem(key)!).missions[kind],{key,kind});
}

for(const kind of ["a1","a2","recovery"] as const)test("backup omitting "+kind+" clears its active trial before the next action",async({page})=>{
 await seed(page,kind);
 await restore(page,backup());
 await expect(page.locator("[data-scenario]")).toHaveValue("baseline");
 await expect(page.locator("[data-mission-status]")).toContainText("no saved");
 await expect(page.locator("[data-plans]")).toBeEmpty();
 await expect(page.locator("[data-plan] textarea")).toHaveValue("");
 await expect(page.locator("[data-mission-progress]")).toContainText("0 /");
 await expect(page.locator('[data-zone="'+(kind==="a2"?"power":"arrival")+'"]')).toHaveAttribute("aria-current","location");
 expect(await storedMission(page,kind)).toBeUndefined();
 // A normal subsequent action must save the fresh trial, not revive the old record.
 await page.locator('[data-role="coordinator"]').click();
 const next=await storedMission(page,kind);
 expect(next.plans).toEqual([]);expect(next.tasks).toEqual([]);expect(next.log).toEqual([]);
 expect(next.scenario).toBe("baseline");
});

test("backup replacement synchronises the displayed preset and reset clears restored mission state",async({page})=>{
 await seed(page,"recovery");
 let replacement=newMission("recovery","conflicting-archive");
 replacement=applyMission(replacement,{type:"role",role:"investigator"}).state;
 replacement=applyMission(replacement,{type:"zone",zone:"control"}).state;
 replacement=applyMission(replacement,{type:"replica",replica:"B"}).state;
 await restore(page,backup({recovery:replacement}));
 await expect(page.locator("[data-scenario]")).toHaveValue("conflicting-archive");
 await expect(page.locator("[data-archive-records]")).toContainText("revision 2: M27-B");
 await expect(page.locator("[data-mission-progress]")).toContainText("1 /");
 await expect(page.locator("[data-plans]")).toBeEmpty();
 await expect(page.locator('[data-role="investigator"]')).toHaveAttribute("aria-pressed","true");
 expect((await storedMission(page,"recovery")).replica).toBe("B");
 await page.locator("[data-passport-reset]").click();await page.locator("[data-dialog-confirm]").click();
 await expect(page.locator("[data-scenario]")).toHaveValue("baseline");
 await expect(page.locator("[data-mission-progress]")).toContainText("0 /");
 await expect(page.locator("[data-plans]")).toBeEmpty();
 await expect(page.locator("[data-plan] textarea")).toHaveValue("");
 await expect(page.locator("[data-measurement]")).toBeEmpty();
 await expect(page.locator("[data-inspection]")).toBeEmpty();
 expect(await storedMission(page,"recovery")).toBeUndefined();
 await page.locator('[data-role="coordinator"]').click();
 const reset=await storedMission(page,"recovery");
 expect(reset.scenario).toBe("baseline");expect(reset.replica).toBeNull();
 expect(reset.plans).toEqual([]);expect(reset.tasks).toEqual([]);
});
