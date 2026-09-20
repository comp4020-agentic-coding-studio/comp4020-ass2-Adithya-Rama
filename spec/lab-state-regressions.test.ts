import {describe,it,expect} from 'vitest';
import {applyTraining,applyTrainingField,createTraining,type TrainingAction,type TrainingState} from '../src/lib/training-engine';
import {newPassport,parsePassport,passportMarkdown,passportHasWork,withCheckpoint,withEvidence,PassportStore,type EvidenceInput,type LabCheckpoint,type StorageLike} from '../src/lib/passport';
const set=(key:string,value:string):TrainingAction=>({type:'set',key,value});
const run=(state:TrainingState,...actions:TrainingAction[])=>actions.reduce((s,a)=>applyTraining(s,a),state);
function historicalDraft():LabCheckpoint {
 const state=createTraining(4);delete state.learningVersion;
 state.actions=['An original observation that must survive migration.'];
 return {week:4,state:{...state},reflection:'Earlier draft explanation, before the revised curriculum.'};
}
function currentRecord():EvidenceInput {
 return {week:4,phase:'practice',actions:[],result:'Current investigation in progress.',reflection:'New explanation.',completed:false,state:{...createTraining(4)}};
}
function finishedBeacon():TrainingState {
 let state=run(createTraining(5),{type:'power'},{type:'measure',key:'battery'},{type:'measure',key:'fuse'},{type:'power'},{type:'repair',key:'fuse'},{type:'power'},{type:'measure',key:'lamp'},{type:'test'});
 for(const action of [{type:'inspect'},{type:'execute'},{type:'collect'},{type:'checkpoint',id:'Approach receiver'},{type:'deliver'}] as const)state=applyTrainingField(state,action);
 expect(state.field?.delivered).toBe(true);return state;
}
describe('dependent lab checks',()=>{
 it('cannot reuse a supported diagnosis after replacing it with an incorrect conclusion',()=>{
  let state=run(createTraining(4),{type:'probe',key:'interlock'},set('diagnosis','interlock'),{type:'diagnose'});
  expect(state.values.diagnosed).toBe(true);
  state=run(state,set('diagnosis','spring'),{type:'interlock'},set('prediction','opposite'),{type:'test'});
  expect(state.values.diagnosed).toBe(false);expect(state.complete).toBe(false);
 });
 it('a wrong inspection does not support the right diagnosis',()=>{
  const state=run(createTraining(4),{type:'probe',key:'spring'},set('diagnosis','interlock'),{type:'diagnose'},{type:'interlock'},set('prediction','opposite'),{type:'test'});
  expect(state.values.diagnosed).toBe(false);expect(state.complete).toBe(false);
 });
 it('measuring a completed circuit preserves the unchanged verified handover',()=>{
  const before=finishedBeacon(),after=applyTraining(before,{type:'measure',key:'lamp'});
  expect(after.complete).toBe(true);expect(after.field).toEqual(before.field);expect(after.values.meter).toBe('lamp: 6 V');
 });
 it('a refused live continuity test preserves completed work; isolating power invalidates it',()=>{
  const before=finishedBeacon(),refused=applyTraining(before,{type:'continuity',key:'lamp'});
  expect(refused.feedback).toContain('Isolate power');expect(refused.complete).toBe(true);expect(refused.field).toEqual(before.field);
  const isolated=applyTraining(refused,{type:'power'});expect(isolated.complete).toBe(false);expect(isolated.field?.delivered).toBe(false);
 });
});
describe('historical lab preservation',()=>{
 it('archives a draft before the first current checkpoint replaces it and round-trips both',()=>{
  const passport=newPassport(),old=historicalDraft();passport.drafts['4']=structuredClone(old);
  const incoming={week:4,state:{...createTraining(4)},reflection:'Current checkpoint.'};
  const next=withCheckpoint(passport,incoming);
  expect(passport.drafts['4']).toEqual(old);expect(passport.labHistory).toEqual([]);
  expect(next.drafts['4']).toEqual(incoming);expect(next.labHistory).toHaveLength(1);
  expect(next.labHistory[0]).toMatchObject({source:'draft',draft:old});
  expect(parsePassport(JSON.stringify(next))).toEqual(next);expect(passportMarkdown(next)).toContain(old.reflection);
  expect(passportMarkdown(next)).toContain('Original model state:');
  expect(withCheckpoint(next,{...incoming,reflection:'Another current action.'}).labHistory).toHaveLength(1);
 });
 it('preserves the original record metadata and evidence before saving the same revised phase',()=>{
  const draft=historicalDraft();let passport=withEvidence(newPassport(),{...currentRecord(),state:draft.state,reflection:draft.reflection,result:'Historical completed investigation.'});
  const old=structuredClone(passport.records[0]);passport=withEvidence(passport,currentRecord());
  expect(passport.records[0]?.state?.learningVersion).toBe(2);
  expect(passport.labHistory).toHaveLength(1);expect(passport.labHistory[0]).toMatchObject({source:'record',record:old});
  expect(passportMarkdown(passport)).toContain('Historical completed investigation.');
  expect(parsePassport(JSON.stringify(passport))).toEqual(passport);
  expect(withEvidence(passport,currentRecord()).labHistory).toHaveLength(1);
 });
 it('retains an older stateless record rather than discarding its authored explanation',()=>{
  const old={...currentRecord()};delete old.state;
  const passport=withEvidence(withEvidence(newPassport(),old),currentRecord());
  expect(passport.labHistory[0]).toMatchObject({source:'record',record:{reflection:'New explanation.'}});
  expect(parsePassport(JSON.stringify(passport)).labHistory).toHaveLength(1);
 });
 it('treats historical-only work as nonempty and rejects malformed archived state',()=>{
  const before=newPassport();before.drafts['4']=historicalDraft();const next=withCheckpoint(before,{week:4,state:{...createTraining(4)},reflection:''});delete next.drafts['4'];
  expect(passportHasWork(next)).toBe(true);
  const invalid=structuredClone(next);const entry=invalid.labHistory[0];if(entry?.source==='draft')entry.draft.state.week=99;
  expect(()=>parsePassport(JSON.stringify(invalid))).toThrow(/historical lab draft/);
 });
 it('refuses an overflowing archive without mutating the earlier draft',()=>{
  const original=newPassport(),old=historicalDraft();original.drafts['4']=old;
  original.labHistory=Array.from({length:100},()=>({source:'draft' as const,archivedAt:new Date().toISOString(),draft:structuredClone(old)}));
  const before=structuredClone(original);
  expect(()=>withCheckpoint(original,{week:4,state:{...createTraining(4)},reflection:''})).toThrow(/archive is full/);
  expect(original).toEqual(before);
 });
 it('keeps historical and new evidence exportable when device storage is unavailable',()=>{
  const blocked:StorageLike={getItem(){return null;},setItem(){throw new Error('full');},removeItem(){}};
  const store=new PassportStore(blocked);const original=newPassport();original.drafts['4']=historicalDraft();store.commit(original);
  expect(store.commit(withCheckpoint(store.state,{week:4,state:{...createTraining(4)},reflection:'Current in-memory progress.'}))).toBe(false);
  const exported=parsePassport(JSON.stringify(store.state));expect(exported.labHistory).toHaveLength(1);expect(exported.drafts['4']?.reflection).toBe('Current in-memory progress.');
 });
});