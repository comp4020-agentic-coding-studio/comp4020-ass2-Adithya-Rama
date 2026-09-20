import {z} from "astro/zod";
import {validTraining} from "./training-engine";
import {roleIds,scenarioIds,zoneIds,taskIds,missionMarkdown,recoveryModelProblem,resolutionEvidenceProblem,type MissionState,type MissionKind} from "./mission-engine";
export const SAVE_KEY="mastermind:SLOP4408:v2";
export const LEGACY_KEY="mastermind:SLOP4408:v1";
export const MAX_BYTES=1024*1024;
const text=z.string().max(8000);
function boundedValue(value:unknown,depth=0):boolean {
 if(depth>12)return false;
 if(value===null||typeof value==="boolean")return true;
 if(typeof value==="string")return value.length<=8000;
 if(typeof value==="number")return Number.isFinite(value)&&Math.abs(value)<=1e9;
 if(Array.isArray(value))return value.length<=500&&value.every(v=>boundedValue(v,depth+1));
 if(typeof value==="object"){const entries=Object.entries(value as object);return entries.length<=100&&entries.every(([k,v])=>!["__proto__","prototype","constructor"].includes(k)&&k.length<=100&&boundedValue(v,depth+1));}
 return false;
}
const stateValue=z.custom<Record<string,unknown>>(v=>typeof v==="object"&&v!==null&&!Array.isArray(v)&&boundedValue(v),"Activity state is malformed or too large.");
const profileId=z.enum(["A","B"]);
const resolutionSchema=z.strictObject({
 ending:z.enum(["physical","digital","stabilise"]),recipient:z.string().min(2).max(100),
 originalLocation:z.string().max(100),receipt:z.string().max(100),supportConfirmed:z.boolean(),
 preservationConfirmed:z.boolean(),stableConfirmed:z.boolean(),limitation:z.string().max(2000),
 profile:profileId,route:z.enum(["upper","service","lift"])
});
const recoverySchema=z.strictObject({
 version:z.literal(2),verifiedProfile:profileId.nullable(),cradleProfile:profileId.nullable(),
 handoffProfile:profileId.nullable(),routeProfile:profileId.nullable(),resolution:resolutionSchema.nullable()
});
const missionSchema=z.strictObject({
 kind:z.enum(["recovery","a1","a2"]),scenario:z.enum(scenarioIds),role:z.enum(roleIds),zone:z.enum(zoneIds),status:z.enum(["active","complete"]),
 tasks:z.array(z.enum(taskIds)).max(11),inspected:z.array(z.enum(["lens","spool","tile","map","manifest"])).max(5),
 driver:z.literal(12),follower:z.number().int().min(12).max(72),brake:z.boolean(),turns:z.number().int().min(0).max(10000),
 fuse:z.enum(["open","intact"]),switchClosed:z.boolean(),measured:z.boolean(),replica:z.enum(["A","B"]).nullable(),policyPatched:z.boolean(),
 route:z.enum(["upper","service","lift"]),handoff:text,agreement:text,
 plans:z.array(z.strictObject({version:z.number().int().positive(),text,route:z.enum(["upper","service","lift"])})).max(50),
 disruptionSeen:z.boolean(),log:z.array(z.strictObject({role:z.enum(roleIds),action:z.string().max(50),message:text,success:z.boolean()})).max(200),
 recovery:recoverySchema.optional(),ending:z.enum(["physical","digital","stabilise"]).nullable(),declaredObjective:z.enum(["physical","digital","stabilise"]).default("physical")
}).refine(s=>new Set(s.tasks).size===s.tasks.length&&new Set(s.inspected).size===s.inspected.length,"Repeated task identifiers.").refine(s=>s.plans.every((p,i)=>p.version===i+1),"Plan versions must remain in sequence.").refine(s=>(s.status==="complete")===(s.ending!==null),"Mission status and ending disagree.").refine(s=>!s.recovery||s.kind==="recovery","Linked recovery facts belong to final missions.").refine(s=>{
 if(!s.recovery)return true;
 const state=s as MissionState;
 if(s.recovery.resolution&&resolutionEvidenceProblem(state,s.recovery.resolution)!==null)return false;
 return s.status!=="complete"||(s.recovery.resolution?.ending===s.ending&&recoveryModelProblem(state)===null);
},"Recovery facts or outcome evidence contradict the current model.");
export const evidenceSchema=z.strictObject({
 week:z.number().int().min(1).max(12),phase:z.enum(["practice","check","transfer"]),
 actions:z.array(z.string().max(1000)).max(500),result:text,reflection:text,completed:z.boolean(),state:stateValue.optional()
});
export type EvidenceInput=z.infer<typeof evidenceSchema>;
const recordSchema=evidenceSchema.extend({id:z.string().max(100),at:z.iso.datetime()});
export type EvidenceRecord=z.infer<typeof recordSchema>;
const passportSchema=z.strictObject({
 schemaVersion:z.literal(2),courseCode:z.literal("SLOP4408"),curriculumVersion:z.literal("last-light-1"),
 updatedAt:z.iso.datetime(),revision:z.number().int().nonnegative(),selectedWeek:z.number().int().min(1).max(12),
 records:z.array(recordSchema).max(50),
 drafts:z.record(z.string().regex(/^(?:[1-9]|1[0-2])$/),z.strictObject({week:z.number().int().min(1).max(12),state:stateValue,reflection:text})).default({}),
 missions:z.strictObject({recovery:missionSchema.optional(),a1:missionSchema.optional(),a2:missionSchema.optional()}),
 runs:z.array(missionSchema.refine(mission=>mission.status==="complete","Run history accepts completed records only.")).max(15),
 preferences:z.strictObject({motion:z.enum(["system","reduced"]),quality:z.enum(["auto","low","high"]),audio:z.boolean()})
});
export type Passport=z.infer<typeof passportSchema>;
export function newPassport():Passport{return {schemaVersion:2,courseCode:"SLOP4408",curriculumVersion:"last-light-1",updatedAt:new Date().toISOString(),revision:0,selectedWeek:1,records:[],drafts:{},missions:{},runs:[],preferences:{motion:"system",quality:"auto",audio:false}};}
export function parsePassport(raw:string):Passport {
 if(new TextEncoder().encode(raw).length>MAX_BYTES)throw new Error("This backup is larger than 1 MB. Import a course JSON backup.");
 let input:unknown;try{input=JSON.parse(raw);}catch{throw new Error("This file is not valid JSON. Your current work has not changed.");}
 if(typeof input==="object"&&input&&"schemaVersion" in input&&(input as {schemaVersion:unknown}).schemaVersion===1)throw new Error("This is a legacy Glass Crown dossier. It is preserved separately; it cannot become skill evidence for the new curriculum.");
 const result=passportSchema.safeParse(input);
 if(!result.success)throw new Error("This backup has an unsupported version, identifier or invalid record. Your current work has not changed.");
 for(const [kind,mission] of Object.entries(result.data.missions))if(mission&&mission.kind!==kind)throw new Error("The mission identifier does not match its saved record.");
 for(const [key,draft] of Object.entries(result.data.drafts))if(key!==String(draft.week)||!validTraining(draft.state,draft.week))throw new Error("A saved lab checkpoint contains invalid model values. Your current work has not changed.");
 for(const record of result.data.records)if(record.state&&(!validTraining(record.state,record.week)||record.state.phase!==record.phase))throw new Error("A saved activity record does not match its week or phase. Your current work has not changed.");
 return result.data;
}
export function withEvidence(current:Passport,input:EvidenceInput):Passport{
 const record=evidenceSchema.parse(input),next=structuredClone(current);
 // Keep the latest checkpoint for each week and phase; students export histories separately.
 const index=next.records.findIndex(r=>r.week===record.week&&r.phase===record.phase);
 const saved={...record,id:"w"+record.week+"-"+record.phase,at:new Date().toISOString()};
 if(index>=0)next.records[index]=saved;else next.records.push(saved);
 next.selectedWeek=record.week;
 return touch(next);
}
export function withMission(current:Passport,mission:MissionState):Passport {
 const checked=missionSchema.parse(mission),next=structuredClone(current);
 const previous=next.missions[mission.kind];
 next.missions[mission.kind]=checked;
 if(checked.status==="complete"&&previous?.status!=="complete"){
  if(next.runs.length>=15)throw new Error("Your passport holds 15 completed mission records. Export a backup and archive the run history before completing another.");
  next.runs.push(structuredClone(checked));
 }
 return touch(next);
}
function touch(p:Passport):Passport {p.revision++;p.updatedAt=new Date().toISOString();return p;}
export function passportHasWork(p:Passport):boolean{return p.records.length>0||Object.keys(p.drafts).length>0||Object.values(p.missions).length>0||p.runs.length>0;}
export function passportMarkdown(p:Passport):string {
 return ["# MASTERMIND — Skills passport","","SLOP4408 · "+p.updatedAt,"Practice evidence. This export is not an institutional submission or academic grade.","","## In-progress checkpoints",...Object.values(p.drafts).flatMap(d=>["","### Week "+d.week+" / unfinished checkpoint",d.reflection,"Model state: "+JSON.stringify(d.state)]),"","## Training records",...p.records.flatMap(r=>["","### Week "+r.week+" / "+r.phase,r.result,...r.actions.map(a=>"- "+a),"","Reflection: "+r.reflection]),...p.runs.flatMap(r=>["","---","",missionMarkdown(r)])].join("\n");
}
export interface StorageLike {getItem(key:string):string|null;setItem(key:string,value:string):void;removeItem(key:string):void}
export class PassportStore {
 state:Passport; message="Progress saves on this device. Export a backup before changing devices."; protected=false; private known:string|null=null;
 constructor(private storage?:StorageLike){
  this.state=newPassport();
  if(!storage){this.message="Browser storage is unavailable. Continue here and export before leaving.";return;}
  try{this.known=storage.getItem(SAVE_KEY);if(this.known)this.state=parsePassport(this.known);}
  catch{this.protected=true;this.message="Saved data could not be opened. It has been preserved. Continue in this tab and export your new work.";}
 }
 commit(next:Passport,replace=false):boolean {
  this.state=next;
  if(this.protected&&!replace)return false;
  if(!this.storage)return false;
  try {
   const actual=this.storage.getItem(SAVE_KEY);
   if(!replace&&actual!==this.known){this.protected=true;this.message="Another tab changed this passport. Your work is safe in this tab. Export it or explicitly restore a backup before replacing the saved version.";return false;}
   const raw=JSON.stringify(next);if(new TextEncoder().encode(raw).length>MAX_BYTES)throw new Error("Backup limit exceeded.");
   this.storage.setItem(SAVE_KEY,raw);this.known=raw;this.protected=false;this.message="Progress saved on this device. Export a backup for safekeeping.";return true;
  }catch{this.message="Device storage could not save this change. Your work is still here; export before leaving.";return false;}
 }
 import(raw:string):Passport {const next=parsePassport(raw);this.commit(next,true);return next;}
 reset():void {this.commit(newPassport(),true);}
 legacy():string|null {try{return this.storage?.getItem(LEGACY_KEY)??null;}catch{return null;}}
 getMission(kind:MissionKind):MissionState|undefined{return this.state.missions[kind];}
}
