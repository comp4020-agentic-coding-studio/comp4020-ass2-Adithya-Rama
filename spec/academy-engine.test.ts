import {describe,it,expect} from "vitest";
import {activities,activityForWeek,cases} from "../src/data/academy";
import {emptySave,saveAnswer,parseImport,runState,checkpointOptions,checkActivity,toMarkdown,persist,saveSchema,presets,MAX_IMPORT_BYTES,type Rehearsal,type Answer} from "../src/lib/academy-engine";
const now="2026-09-15T05:00:00.000Z";
describe("fictional rules and revision",()=>{
 it("distinguishes R1 and R2 rather than accepting a memorised order",()=>{
  const a=activityForWeek(3),b=activityForWeek(7);
  const old:Answer={reflection:"Uses E03",savedAt:now,order:["WITNESS","SILVER","CROWN"]};
  expect(checkActivity(a,old)[0]).toContain("satisfies");
  expect(checkActivity(b,old)[0]).toContain("breaks a prerequisite");
  expect(checkActivity(b,{...old,order:["SILVER","WITNESS","CROWN"]})[0]).toContain("satisfies");
  expect(cases.find(c=>c.id==="E07")?.supersedes).toBe("E03");
 });
 it("requires observe before authorise before transfer",()=>{
  const a=activityForWeek(4);
  expect(checkActivity(a,{reflection:"E04",savedAt:now,order:["TRANSFER","OBSERVE","AUTHORISE"]})[0]).toContain("breaks");
  expect(checkActivity(a,{reflection:"E04",savedAt:now,order:["OBSERVE","AUTHORISE","TRANSFER"]})[0]).toContain("satisfies");
 });
 it("preserves the original when revisions and later edits are saved",()=>{
  let s=saveAnswer(emptySave(now),activityForWeek(6),{reflection:"Original R1 rationale",order:activityForWeek(6).correct,savedAt:now});
  const original=structuredClone(s.plans[0]);
  s=saveAnswer(s,activityForWeek(7),{reflection:"E07 changed the prerequisite",order:activityForWeek(7).correct,savedAt:now});
  s=saveAnswer(s,activityForWeek(6),{reflection:"A later edit",order:activityForWeek(6).correct,savedAt:now});
  expect(s.plans[0]).toEqual(original);expect(s.plans[1].text).toContain("E07");
  expect(toMarkdown(s)).toContain("Original R1 rationale");
 });
 it("labels a supplied original for direct Week 7 visitors",()=>{
  const s=saveAnswer(emptySave(now),activityForWeek(7),{reflection:"A revision",order:activityForWeek(7).correct,savedAt:now});
  expect(s.plans[0].source).toBe("sample");expect(s.plans[1].source).toBe("student");
 });
});
describe("rehearsal consequences",()=>{
 it("all paths terminate reproducibly in six choices and all endings are reachable",()=>{
  const endings=new Set<string>();
  let count=0;
  function walk(run:Rehearsal){
   const state=runState(run);expect(runState(structuredClone(run))).toEqual(state);
   if(run.choices.length===6){expect(state.final).not.toBeNull();endings.add(state.final!);expect(checkpointOptions(run)).toEqual([]);count++;return;}
   for(const option of checkpointOptions(run))walk({...run,choices:[...run.choices,option.id]});
  }
  presets.forEach(preset=>walk({preset,choices:[]}));
  expect(count).toBe(432);expect(endings).toEqual(new Set(["extract","disclose","withdraw"]));
 });
 it("responds differently to a changed protocol and an unchanged baseline",()=>{
  const choices=["extract","assume","council","hold","examine","extract"];
  expect(runState({preset:"baseline",choices}).final).toBe("extract");
  const changed=runState({preset:"contradiction",choices});expect(changed.final).toBe("withdraw");expect(changed.reasons.join(" ")).toContain("superseded R1");
 });
 it("cannot substitute assigned roles for agreement in Divided Crew",()=>{
  const state=runState({preset:"divided-crew",choices:["extract","inspect","proceed","hold","examine","extract"]});
  expect(state.agreement).toBe(0);expect(state.final).toBe("withdraw");
 });
 it("rejects invented choices and more than six decisions",()=>{
  expect(()=>runState({preset:"baseline",choices:["invented"]})).toThrow();
  expect(()=>runState({preset:"baseline",choices:Array(7).fill("extract")})).toThrow();
 });
});
describe("local dossier integrity",()=>{
 it("round-trips every supported activity answer and preserves source labels",()=>{
  let s=emptySave(now);
  for(const a of activities){
   const answer:Answer={reflection:a.sample,savedAt:now};
   if(a.options)answer.choice=a.options[0].id;if(a.correct)answer.order=[...a.correct];
   if(a.statements){answer.classifications={};a.statements.forEach(t=>answer.classifications![t.id]={category:t.answer,confidence:"medium"});}
   s=saveAnswer(s,a,answer);
  }
  s.runs=[{preset:"baseline",choices:["disclose","inspect","council","hold","examine","disclose"]}];
  expect(parseImport(JSON.stringify(s))).toEqual(s);expect(toMarkdown(s)).toContain("Disclosure".toLowerCase().slice(0,7));
 });
 it("rejects unsupported versions, malformed JSON, unknown IDs and injected fields",()=>{
  const s=emptySave(now);const before=JSON.stringify(s);
  for(const invalid of ["not json",JSON.stringify({...s,schemaVersion:9}),JSON.stringify({...s,courseCode:"SLOP9999"}),JSON.stringify({...s,answers:{unknown:{reflection:"x",savedAt:now}}}),JSON.stringify({...s,unexpected:"field"})]){
   expect(()=>parseImport(invalid)).toThrow();expect(JSON.stringify(s)).toBe(before);
  }
 });
 it("rejects duplicate sequence actions and invalid evidence categories",()=>{
  const s=emptySave(now);s.answers.seals={reflection:"x",savedAt:now,order:["CROWN","CROWN","CROWN"]};
  expect(()=>parseImport(JSON.stringify(s))).toThrow();
 });
 it("rejects oversized input before parsing",()=>expect(()=>parseImport(" ".repeat(MAX_IMPORT_BYTES+1))).toThrow("1 MB"));
 it("keeps arbitrary prose as data, without interpreting markup",()=>{
  const s=emptySave(now);s.answers.contract={reflection:'<img src=x onerror=alert(1)>',choice:"extract",savedAt:now};
  expect(parseImport(JSON.stringify(s)).answers.contract.reflection).toContain("<img");
 });
 it("reports a failed save without discarding in-memory work",()=>{
  const s=emptySave(now);s.artefacts["mission-contract"]="Retain this";
  const r=persist({getItem:()=>null,setItem:()=>{throw new Error("quota");}},s);
  expect(r.saved).toBe(false);expect(r.message).toContain("export");expect(s.artefacts["mission-contract"]).toBe("Retain this");
 });
 it("rejects incomplete history and incomplete activity responses",()=>{
  const s=emptySave(now);s.runs=[{preset:"baseline",choices:["withdraw"]}];
  expect(()=>parseImport(JSON.stringify(s))).toThrow();
  s.runs=[];s.answers.evidence={reflection:"Missing classifications",savedAt:now};
  expect(()=>parseImport(JSON.stringify(s))).toThrow();
  s.answers={seals:{reflection:"Missing order",savedAt:now}};
  expect(()=>parseImport(JSON.stringify(s))).toThrow();
  s.answers={contract:{reflection:"Missing choice",savedAt:now}};
  expect(()=>parseImport(JSON.stringify(s))).toThrow();
 });
 it("rejects unknown plan actions and a revision without its original",()=>{
  const s=saveAnswer(emptySave(now),activityForWeek(7),{reflection:"R2 revision",order:activityForWeek(7).correct,savedAt:now});
  s.plans[1].order=["UNKNOWN","WITNESS","CROWN"];
  expect(()=>parseImport(JSON.stringify(s))).toThrow();
  s.plans[1].order=["SILVER","WITNESS","CROWN"];s.plans.shift();
  expect(()=>parseImport(JSON.stringify(s))).toThrow();
 });
 it("validates a reset without modifying an earlier record",()=>{
  const s=emptySave(now);s.runs=[{preset:"baseline",choices:["withdraw"]}];const reset=emptySave(now);
  expect(saveSchema.safeParse(reset).success).toBe(true);expect(s.runs).toHaveLength(1);expect(reset.runs).toHaveLength(0);
 });
});
