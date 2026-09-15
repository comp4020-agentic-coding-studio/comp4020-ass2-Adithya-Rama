import {traceSequence} from "./symbol-machine";
import { z } from "astro/zod";
import { activities, COURSE, SCENARIO_VERSION, type Activity } from "../data/academy";
export const STORAGE_KEY = "mastermind:SLOP4408:v1";
export const MAX_IMPORT_BYTES = 1_048_576;

const bounded = z.string().max(8000);
const answerSchema = z.object({
  choice:z.string().max(100).optional(),
  order:z.array(z.string().max(100)).max(12).optional(),
  classifications:z.record(z.string().max(100), z.object({category:z.enum(["observation","claim","assumption"]), confidence:z.enum(["low","medium","high"])}).strict()).optional(),
  reflection:bounded,
  savedAt:z.iso.datetime(),
}).strict();
export type Answer = z.infer<typeof answerSchema>;
export const presets = ["baseline","contradiction","divided-crew"] as const;
export type Preset = typeof presets[number];
export const presetNames:Record<Preset,string> = {baseline:"Baseline",contradiction:"Contradiction","divided-crew":"Divided Crew"};
export type Goal = "extract"|"disclose"|"withdraw";
export interface Rehearsal { preset:Preset; choices:string[] }
export interface RunState {budget:number; assumptions:number; agreement:number; goal:Goal; final:Goal|null; reasons:string[]}
const choicesByStep = [
  ["extract","disclose","withdraw"],["inspect","assume"],["council","proceed"],
  ["revise","hold"],["examine","ignore"],["extract","disclose","withdraw"],
] as const;
export const checkpoints = [
  "Confirm the objective","Resolve an evidence conflict","Confirm crew agreement",
  "Respond to a changed rule","Respond to the consequence","Defend the final decision",
];
export function runState(run:Rehearsal):RunState {
  if(!presets.includes(run.preset) || run.choices.length>6) throw new Error("Unknown rehearsal");
  const state:RunState={budget:12,assumptions:0,agreement:run.preset==="divided-crew"?1:2,goal:"extract",final:null,reasons:[]};
  run.choices.forEach((choice,i)=>{
    if(!(choicesByStep[i] as readonly string[]).includes(choice)) throw new Error("Invalid checkpoint choice");
    if(i===0){state.goal=choice as Goal;state.budget--;state.reasons.push("Declared objective: "+choice+". E01 allows a justified change.");}
    if(i===1){state.budget-=choice==="inspect"?2:1; if(choice==="assume")state.assumptions+=2;state.reasons.push(choice==="inspect"?"E02: witness accounts were separated from the receipt.":"E02: silver alone was treated as sufficient without support; two assumptions remain.");}
    if(i===2){state.budget-=choice==="council"?2:1;state.agreement+=choice==="council"?1:-1;state.reasons.push(choice==="council"?"E05/E09: the council recorded agreement and acknowledged refusal.":"E05/E09: role assignment was used in place of renewed agreement.");}
    if(i===3){state.budget-=choice==="revise"?2:1;const changed=run.preset==="contradiction";if(changed&&choice==="hold")state.assumptions+=2;state.reasons.push(changed?(choice==="revise"?"E07: R2 was adopted, changing the order to SILVER → WITNESS → CROWN.":"E07: the plan retained superseded R1; the seal dependency remains unsupported."):(choice==="revise"?"E03: the team rechecked R1. No new protocol is stipulated in this preset.":"E03: R1 remains the stipulated protocol for this preset."));}
    if(i===4){if(choice==="examine")state.budget--;else state.assumptions++;state.reasons.push(choice==="examine"?"E10: the registry consequence was considered before deciding.":"E10: the registry consequence was left unresolved.");}
    if(i===5){
      state.budget--;
      const requested=choice as Goal;
      state.final=requested==="withdraw"||state.assumptions>2||state.agreement<1||state.budget<0?"withdraw":requested;
      state.reasons.push(state.final!==requested?"The requested ending was not supported by the remaining assumptions or crew agreement. The simulation ends in withdrawal.":"The final decision is "+state.final+". Its costs remain part of the defence.");
      if(state.final!==state.goal)state.reasons.push("The ending differs from the initial objective. Explain the revision rather than claiming the initial contract was fulfilled.");
    }
  });
  return state;
}
export function checkpointOptions(run:Rehearsal):{id:string;label:string}[] {
  const step=run.choices.length;
  if(step>=6)return [];
  const labels:Record<string,string>={extract:"Extract the Crown",disclose:"Disclose the record",withdraw:"Withdraw",inspect:"Inspect the source conflict (2 units)",assume:"Proceed with the assumption (1 unit)",council:"Renew agreement in council (2 units)",proceed:"Proceed with assigned roles (1 unit)",revise:run.preset==="contradiction"?"Adopt R2 and retest (2 units)":"Recheck the current R1 model (2 units)",hold:"Retain the earlier plan (1 unit)",examine:"Examine the registry consequence (1 unit)",ignore:"Leave the consequence unresolved"};
  return (choicesByStep[step] as readonly string[]).map(id=>({id,label:labels[id]}));
}
export function checkpointBrief(run:Rehearsal):string {
  return [
    "E01 gives you twelve decision units. Declare the objective you intend to defend; you may explain a revision later.",
    "E02: a witness credits silver alone, but a receipt records a prior witness token. Which account will support your model?",
    run.preset==="divided-crew"?"E09: Nadi refuses extraction until the consequence is explained. Existing role assignments do not settle consent.":"E05: responsibilities are assigned, but an objective change still needs agreement.",
    run.preset==="contradiction"?"E07 has superseded E03. The witness must now certify an existing silver token.":"This preset stipulates E03/R1. E07 is available in the archive but has not been issued in this scenario.",
    "E10 reveals that transfer interrupts unresolved ownership claims. Disclosure leaves control in place; withdrawal leaves the problem unresolved.",
    "Choose the ending you can defend. More than two unresolved assumptions or no crew agreement prevents extraction/disclosure. This is a simulation result, not an academic mark.",
  ][run.choices.length]??"Review the record and compare another preset.";
}
const runSchema = z.object({preset:z.enum(presets),choices:z.array(z.string().max(30)).max(6)}).strict().superRefine((run,ctx)=>{try{runState(run);}catch{ctx.addIssue({code:"custom",message:"Unknown rehearsal choice"});}});
const snapshotSchema=z.object({label:z.enum(["Version 1","Version 2"]),text:bounded,order:z.array(z.string().max(100)).max(12),source:z.enum(["student","sample"]),at:z.iso.datetime()}).strict();
export const saveSchema=z.object({
  schemaVersion:z.literal(1),courseCode:z.literal(COURSE),scenarioVersion:z.literal(SCENARIO_VERSION),
  updatedAt:z.iso.datetime(),selectedWeek:z.number().int().min(1).max(12),
  answers:z.record(z.string(),answerSchema),artefacts:z.record(z.string(),bounded),
  crew:z.array(z.enum(["mira","oren","tess","nadi","eli","sen"])).max(6),
  plans:z.array(snapshotSchema).max(20),runs:z.array(runSchema.refine(run=>run.choices.length===6,"Historical runs must contain all six decisions")).max(30),activeRun:runSchema.nullable(),
}).strict().superRefine((save,ctx)=>{
  for(const [id,answer] of Object.entries(save.answers)){
    const a=activities.find(a=>a.id===id);
    if(!a){ctx.addIssue({code:"custom",message:"Unknown activity: "+id});continue;}
    if((a.kind==="choose"&&!answer.choice) || (answer.choice!==undefined && !a.options?.some(o=>o.id===answer.choice)))ctx.addIssue({code:"custom",message:"Unknown choice"});
    if((a.kind==="order"&&!answer.order) || (answer.order && (!a.items || answer.order.length!==a.items.length || new Set(answer.order).size!==answer.order.length || answer.order.some(item=>!a.items?.includes(item)))))ctx.addIssue({code:"custom",message:"Invalid sequence"});
    if((a.kind==="classify" && a.statements?.some(s=>!answer.classifications?.[s.id])) || (answer.classifications && Object.keys(answer.classifications).some(key=>!a.statements?.some(s=>s.id===key))))ctx.addIssue({code:"custom",message:"Unknown evidence statement"});
  }
  if(Object.keys(save.artefacts).some(key=>!activities.some(a=>a.output===key)))ctx.addIssue({code:"custom",message:"Unknown dossier artefact"});
  if(new Set(save.crew).size!==save.crew.length)ctx.addIssue({code:"custom",message:"Duplicate crew member"});
  for(const plan of save.plans){
    const full=activities.find(a=>a.week===6)!.items!;
    const seals=["SILVER","WITNESS","CROWN"];
    const allowed=plan.label==="Version 1" && plan.order.length===full.length?full:seals;
    if(plan.order.length!==allowed.length||new Set(plan.order).size!==allowed.length||plan.order.some(item=>!allowed.includes(item)))ctx.addIssue({code:"custom",message:"Unknown or incomplete plan sequence"});
  }
  if(save.plans.some(p=>p.label==="Version 2")&&save.plans[0]?.label!=="Version 1")ctx.addIssue({code:"custom",message:"Revision missing its preserved original"});
  if(save.plans.filter(p=>p.label==="Version 1").length>1)ctx.addIssue({code:"custom",message:"More than one original plan"});
});
export type Save = z.infer<typeof saveSchema>;
export function emptySave(now=new Date().toISOString()):Save {return {schemaVersion:1,courseCode:COURSE,scenarioVersion:SCENARIO_VERSION,updatedAt:now,selectedWeek:1,answers:{},artefacts:{},crew:[],plans:[],runs:[],activeRun:null};}
export function parseImport(raw:string):Save {
  if(new TextEncoder().encode(raw).length>MAX_IMPORT_BYTES)throw new Error("This file exceeds the 1 MB limit.");
  let parsed:unknown;try{parsed=JSON.parse(raw);}catch{throw new Error("This is not valid JSON. Your current dossier has not changed.");}
  const result=saveSchema.safeParse(parsed);
  if(!result.success)throw new Error("This dossier has an unsupported version, invalid field or unknown activity. Your current dossier has not changed.");
  return result.data;
}
export function saveAnswer(save:Save,a:Activity,answer:Answer):Save {
  const next:Save=structuredClone(save);
  next.answers[a.id]=answer;next.artefacts[a.output]=answer.reflection;next.selectedWeek=a.week;next.updatedAt=answer.savedAt;
  if(a.week===6 && !next.plans.some(p=>p.label==="Version 1")){
    next.plans.push({label:"Version 1",text:answer.reflection,order:answer.order??[],source:"student",at:answer.savedAt});
  }
  if(a.week===7){
    if(!next.plans.some(p=>p.label==="Version 1")){
      next.plans.push({label:"Version 1",text:activities[5].sample,order:["WITNESS","SILVER","CROWN"],source:"sample",at:answer.savedAt});
    }
    if(next.plans.length>=20)throw new Error("Twenty plan snapshots are saved. Export this dossier before starting a new operation.");
    next.plans.push({label:"Version 2",text:answer.reflection,order:answer.order??[],source:"student",at:answer.savedAt});
  }
  return saveSchema.parse(next);
}
export function checkActivity(a:Activity,answer:Answer):string[] {
  if(a.kind==="order"){
    const order=answer.order??[];
    if([3,4,7].includes(a.week)){
      const protocol=a.week===3?"R1":a.week===7?"R2":"interpreter";
      const trace=traceSequence(protocol,order);
      const valid=trace.length===3&&trace.every(step=>step.accepted)&&trace.at(-1)?.after.complete;
      return [(valid?"The sequence satisfies the supplied protocol. ":"This sequence breaks a prerequisite. ")+a.exemplar,...trace.map(step=>step.action+": "+step.reason)];
    }
    const equal=a.correct?.every((v,i)=>v===order[i])&&a.correct.length===order.length;
    return equal?["The sequence satisfies the supplied protocol. "+a.exemplar]:["This sequence breaks a prerequisite. Compare the first unsupported action with "+a.caseIds[0]+". "+a.exemplar];
  }
  if(a.kind==="classify")return (a.statements??[]).map(s=>{
    const value=answer.classifications?.[s.id]?.category;
    return (value===s.answer?"Supported classification. ":"Revisit this classification: "+s.answer+". ")+s.explanation;
  });
  if(a.kind==="choose")return [a.options?.find(o=>o.id===answer.choice)?.feedback??"Select an interpretation to receive feedback."];
  return ["Compare your reasoning with the exemplar. Open-ended work requires human judgement."];
}
export interface StorageLike {getItem(key:string):string|null;setItem(key:string,value:string):void}
export function persist(storage:StorageLike,save:Save):{saved:boolean;message:string} {
  try{storage.setItem(STORAGE_KEY,JSON.stringify(save));return {saved:true,message:"Saved in this browser."};}
  catch{return {saved:false,message:"Browser saving is unavailable. Your work remains in this tab; export a backup before leaving."};}
}
export function toMarkdown(save:Save):string {
  let text="# Operation Glass Crown\n\nSLOP4408 · Practice dossier\n\nUpdated: "+save.updatedAt+"\n\n";
  for(const a of activities){const answer=save.answers[a.id];if(!answer)continue;text+="## Week "+a.week+" — "+a.title+"\n\n";if(answer.choice)text+="Decision: "+(a.options?.find(o=>o.id===answer.choice)?.label??answer.choice)+"\n\n";if(answer.order)text+="Sequence: "+answer.order.join(" → ")+"\n\n";for(const [key,v]of Object.entries(answer.classifications??{}))text+="- "+key+": "+v.category+"; confidence "+v.confidence+"\n";text+="\n"+answer.reflection+"\n\n";}
  text+="## Selected crew\n\n"+(save.crew.join(", ")||"No roster recorded")+"\n\n";
  for(const p of save.plans)text+="## "+p.label+" ("+p.source+" · "+p.at+")\n\n"+p.order.join(" → ")+"\n\n"+p.text+"\n\n";
  for(const [i,r]of save.runs.entries()){const s=runState(r);text+="## Rehearsal "+(i+1)+" — "+presetNames[r.preset]+"\n\nEnding: "+s.final+"\n\n"+s.reasons.map(x=>"- "+x).join("\n")+"\n\n";}
  if(save.activeRun)text+="## Rehearsal in progress\n\n"+presetNames[save.activeRun.preset]+" · "+save.activeRun.choices.length+"/6 checkpoints\n\n"+runState(save.activeRun).reasons.join("\n")+"\n";
  return text+"\nPractice records are not submitted assignments or academic grades.\n";
}
