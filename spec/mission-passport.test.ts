import {describe,it,expect} from "vitest";
import {createTraining} from "../src/lib/training-engine";
import {newMission,applyMission,missionMarkdown,missionRequirements,scenarioIds,type MissionAction,type MissionKind,type Scenario} from "../src/lib/mission-engine";
import {newPassport,parsePassport,PassportStore,withEvidence,withMission,SAVE_KEY,LEGACY_KEY,passportMarkdown,type StorageLike} from "../src/lib/passport";
function complete(kind:MissionKind="recovery",scenario:Scenario="baseline"){
 let s=newMission(kind,scenario);
 const act=(a:MissionAction)=>{const next=applyMission(s,a);expect(next.success,next.message).toBe(true);s=next.state;};
 if(kind!=="a2"){
  for(const item of ["lens","spool","tile","map","manifest"])act({type:"inspect",item});
  act({type:"recall",items:"lens, spool, tile"});act({type:"orient",degrees:90});
  act({type:"role",role:"systems"});act({type:"gear",follower:24});act({type:"brake",released:true});act({type:"turn"});
 }
 if(kind!=="a1"){
  act({type:"role",role:"systems"});act({type:"measure"});act({type:"fuse",value:"intact"});act({type:"switch",closed:true});
  act({type:"role",role:"investigator"});act({type:"replica",replica:scenario==="conflicting-archive"?"B":"A"});act({type:"policy",subject:"observer",action:"certify",allowed:false});
  act({type:"role",role:"coordinator"});act({type:"handoff",item:"verified archive",destination:"dispatch",condition:"after integrity check"});
 }
 if(kind==="recovery"){
  act({type:"agreement",preserve:true,recipient:"Station custodian"});act({type:"plan",text:"Original: use upper route, restore equipment and verify the archive before dispatch."});
  act({type:"role",role:"observer"});act({type:"route",route:scenario==="equipment-failure"?"service":"upper"});
  act({type:"role",role:"coordinator"});act({type:"plan",text:"Revision: choose the tested available route, preserve the original and use the current signed source."});
 }
 return s;
}
describe("integrated recovery rules",()=>{
 it("role tools reject an out-of-role action without changing the state",()=>{const s=newMission();const r=applyMission(s,{type:"turn"});expect(r.success).toBe(false);expect(r.state).toEqual(s);});
 it("a jam requires diagnosis, not repeated force",()=>{let s=newMission();s=applyMission(s,{type:"role",role:"systems"}).state;const r=applyMission(s,{type:"turn"});expect(r.success).toBe(false);expect(r.state.turns).toBe(0);expect(r.state.tasks).not.toContain("mechanism");});
 it("measurement is required before a lit lamp establishes diagnosis",()=>{let s=newMission();for(const a of [{type:"role",role:"systems"},{type:"fuse",value:"intact"},{type:"switch",closed:true}] as MissionAction[])s=applyMission(s,a).state;expect(s.tasks).not.toContain("circuit");s=applyMission(s,{type:"measure"}).state;s=applyMission(s,{type:"switch",closed:true}).state;expect(s.tasks).not.toContain("circuit");s=applyMission(s,{type:"switch",closed:false}).state;s=applyMission(s,{type:"fuse",value:"open"}).state;s=applyMission(s,{type:"measure"}).state;s=applyMission(s,{type:"fuse",value:"intact"}).state;s=applyMission(s,{type:"switch",closed:true}).state;expect(s.tasks).toContain("circuit");});
 it("the later authoritative source changes the eligible copy",()=>{let s=newMission("recovery","conflicting-archive");s=applyMission(s,{type:"role",role:"investigator"}).state;expect(applyMission(s,{type:"replica",replica:"A"}).success).toBe(false);expect(applyMission(s,{type:"replica",replica:"B"}).success).toBe(true);});
 it("failed lift dependency affects both dependent routes",()=>{const s=newMission("recovery","equipment-failure");for(const route of ["upper","lift"])expect(applyMission(s,{type:"route",route}).success).toBe(false);expect(applyMission(s,{type:"route",route:"service"}).success).toBe(true);});
 it("historical plan remains identical after revision",()=>{let s=newMission();s=applyMission(s,{type:"role",role:"coordinator"}).state;s=applyMission(s,{type:"plan",text:"First plan: inspect, restore equipment, verify and recover."}).state;const first=structuredClone(s.plans[0]);s=applyMission(s,{type:"plan",text:"Revised plan: replace the unavailable route after checking the source."}).state;expect(s.plans[0]).toEqual(first);expect(s.plans[1]!.version).toBe(2);});
 for(const kind of ["a1","a2","recovery"] as const)for(const scenario of scenarioIds)it(kind+" / "+scenario+" has reachable resolutions with reproducible evidence",()=>{
  const s=complete(kind,scenario);expect(complete(kind,scenario)).toEqual(s);
  for(const ending of ["physical","digital","stabilise"] as const){const r=applyMission(s,{type:"resolve",ending});expect(r.success,r.message).toBe(true);expect(r.state.status).toBe("complete");expect(r.state.ending).toBe(ending);expect(missionMarkdown(r.state)).toContain("## Debrief");expect(r.state.tasks).toEqual(expect.arrayContaining(missionRequirements[kind]));}
 });
 it("an early ending exposes missing capabilities instead of pretending success",()=>{const r=applyMission(newMission(),{type:"resolve",ending:"physical"});expect(r.success).toBe(false);expect(r.state.status).toBe("active");expect(r.message).toContain("Inspect");});
});
class MemoryStorage implements StorageLike {data=new Map<string,string>();getItem(k:string){return this.data.get(k)??null;}setItem(k:string,v:string){this.data.set(k,v);}removeItem(k:string){this.data.delete(k);}}
describe("versioned skills passport",()=>{
 it("round-trips a saved lab and a complete mission",()=>{let p=withEvidence(newPassport(),{week:4,phase:"transfer",actions:["Changed gear","Released interlock"],result:"Target reached",reflection:"The ratio explained the required movement.",completed:true,state:{...createTraining(4,"transfer")}});const mission=applyMission(complete(),{type:"resolve",ending:"physical"}).state;p=withMission(p,mission);expect(parsePassport(JSON.stringify(p))).toEqual(p);expect(passportMarkdown(p)).toContain("Target reached");expect(passportMarkdown(p)).toContain("Operation Last Light");});
 it("malformed and unsupported imports leave the current work intact",()=>{const store=new PassportStore(new MemoryStorage());store.commit(withEvidence(store.state,{week:1,phase:"practice",actions:[],result:"Observed",reflection:"Notes",completed:false}));const before=structuredClone(store.state);for(const raw of ["{broken",JSON.stringify({...before,schemaVersion:99}),JSON.stringify({...before,courseCode:"SLOP9999"})])expect(()=>store.import(raw)).toThrow();expect(store.state).toEqual(before);});
 it("rejects oversized input, unexpected identifiers and nested prototype keys",()=>{expect(()=>parsePassport(" ".repeat(1024*1024+1))).toThrow(/1 MB/);const p={...newPassport(),missions:{recovery:{...newMission(),role:"intruder"}}};expect(()=>parsePassport(JSON.stringify(p))).toThrow();const q=newPassport();q.drafts["1"]={week:1,state:JSON.parse('{"__proto__":{"polluted":true}}'),reflection:""};expect(()=>parsePassport(JSON.stringify(q))).toThrow();});
 it("keeps legacy data when resetting the new passport",()=>{const disk=new MemoryStorage();disk.setItem(LEGACY_KEY,'{"schemaVersion":1}');const store=new PassportStore(disk);store.reset();expect(store.legacy()).toBe('{"schemaVersion":1}');expect(()=>store.import(store.legacy()!)).toThrow(/legacy/);});
 it("retains exportable in-memory work when storage is blocked",()=>{const storage:StorageLike={getItem(){throw new Error("blocked");},setItem(){throw new Error("full");},removeItem(){}};const store=new PassportStore(storage);const next=withEvidence(store.state,{week:2,phase:"practice",actions:["Recall"],result:"2 items",reflection:"Used a route",completed:false});expect(store.commit(next)).toBe(false);expect(store.state.records).toHaveLength(1);expect(passportMarkdown(store.state)).toContain("Used a route");});
 it("does not overwrite corrupted saves or a newer tab",()=>{const disk=new MemoryStorage();disk.setItem(SAVE_KEY,"{corrupt");const corrupt=new PassportStore(disk);corrupt.commit(newPassport());expect(disk.getItem(SAVE_KEY)).toBe("{corrupt");disk.setItem(SAVE_KEY,JSON.stringify(newPassport()));const a=new PassportStore(disk),b=new PassportStore(disk);a.commit({...a.state,revision:1});expect(b.commit({...b.state,revision:2})).toBe(false);expect(b.protected).toBe(true);expect(JSON.parse(disk.getItem(SAVE_KEY)!).revision).toBe(1);});
 it("restarting a mission preserves lab records and completed run history",()=>{let p=withEvidence(newPassport(),{week:4,phase:"check",actions:[],result:"Checked",reflection:"Explained",completed:true});p=withMission(p,applyMission(complete("a1"),{type:"resolve",ending:"physical"}).state);p=withMission(p,newMission("a1"));expect(p.records).toHaveLength(1);expect(p.runs).toHaveLength(1);expect(p.missions.a1?.status).toBe("active");});
});

describe("mission state invariants after a successful check",()=>{
 it("requires a new mechanism test after a gear change",()=>{
  let s=complete("a1");s=applyMission(s,{type:"role",role:"systems"}).state;
  s=applyMission(s,{type:"gear",follower:36}).state;
  expect(s.tasks).not.toContain("mechanism");
  expect(applyMission(s,{type:"resolve",ending:"physical"}).success).toBe(false);
  s=applyMission(s,{type:"gear",follower:24}).state;
  expect(applyMission(s,{type:"resolve",ending:"physical"}).success).toBe(false);
  s=applyMission(s,{type:"turn"}).state;
  expect(applyMission(s,{type:"resolve",ending:"physical"}).success).toBe(true);
 });
 it("a switched-off circuit invalidates completion and dependent route evidence",()=>{
  let s=complete();s=applyMission(s,{type:"role",role:"systems"}).state;
  s=applyMission(s,{type:"switch",closed:false}).state;
  expect(s.tasks).not.toContain("circuit");expect(s.tasks).not.toContain("route");
  expect(applyMission(s,{type:"resolve",ending:"digital"}).success).toBe(false);
 });
 it("rejects a live fuse replacement without changing the valid circuit",()=>{
  let s=complete("a2");s=applyMission(s,{type:"role",role:"systems"}).state;
  const r=applyMission(s,{type:"fuse",value:"open"});
  expect(r.success).toBe(false);expect(r.state.fuse).toBe("intact");
 });
 it("a later wrong handoff cannot retain earlier completion",()=>{
  let s=complete("a2");s=applyMission(s,{type:"role",role:"coordinator"}).state;
  s=applyMission(s,{type:"handoff",item:"archive",destination:"workshop",condition:"immediately"}).state;
  expect(s.tasks).not.toContain("handoff");
  expect(applyMission(s,{type:"resolve",ending:"digital"}).success).toBe(false);
 });
 it("bounds plan history without losing an earlier version",()=>{
  let s=newMission();s=applyMission(s,{type:"role",role:"coordinator"}).state;
  for(let i=1;i<=50;i++)s=applyMission(s,{type:"plan",text:"Plan "+i+": inspect the records, restore equipment and verify the route."}).state;
  const before=structuredClone(s.plans);
  const r=applyMission(s,{type:"plan",text:"Plan 51: this version must not replace any preserved earlier plan."});
  expect(r.success).toBe(false);expect(r.state.plans).toEqual(before);
 });
 it("preserves the initial objective and explains a changed ending",()=>{
  let start=newMission();
  start=applyMission(start,{type:"objective",objective:"digital"}).state;
  start=applyMission(start,{type:"inspect",item:"lens"}).state;
  const late=applyMission(start,{type:"objective",objective:"physical"});
  expect(late.success).toBe(false);expect(late.state.declaredObjective).toBe("digital");
  const ready={...complete(),declaredObjective:"digital" as const};
  const closed=applyMission(ready,{type:"resolve",ending:"stabilise"});
  expect(closed.message).toContain("initial objective was digital");
  expect(closed.message).toContain("ending is stabilise");
 });
 it("the preparatory trial debrief does not claim a full recovery",()=>{
  const a1=applyMission(complete("a1"),{type:"resolve",ending:"physical"});
  expect(a1.message).toContain("does not establish a completed archive recovery");
  const a2=applyMission(complete("a2"),{type:"resolve",ending:"digital"});
  expect(a2.message).toContain("separate integrated task");
 });
 it("rejects unknown model configurations before changing state",()=>{
  let s=newMission();s=applyMission(s,{type:"role",role:"systems"}).state;
  const gear=applyMission(s,{type:"gear",follower:0});expect(gear.success).toBe(false);expect(gear.state.follower).toBe(36);
  s=applyMission(s,{type:"role",role:"observer"}).state;
  const route=applyMission(s,{type:"route",route:"unknown"});expect(route.success).toBe(false);expect(route.state.route).toBe("upper");
 });
});

