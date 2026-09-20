import {describe,it,expect} from 'vitest';
import {demonstrations} from '../src/data/demonstrations';
import {getDemoOperation,createDemoFieldRun,recordDemoFieldProof,applyDemoFieldAction,demoFieldActions} from '../src/data/demo-operations';
import {checkDemoStep,demoExpectedResponses} from '../src/lib/demonstration-engine';
import {getDemoWalkthrough} from '../src/data/demonstration-walkthroughs';

describe('worked examples perform the same causal operation in Watch and Take Control',()=>{
 for(const demo of demonstrations)it(demo.id+' requires complete evidence and an ordered performed handover',()=>{
  const spec=getDemoOperation(demo);
  let run=createDemoFieldRun(demo);
  expect(applyDemoFieldAction(demo,run,{type:'execute'}).success).toBe(false);
  run=applyDemoFieldAction(demo,run,{type:'inspect'}).run;
  expect(applyDemoFieldAction(demo,run,{type:'proof',verified:true}).success).toBe(false);
  expect(applyDemoFieldAction(demo,run,{type:'collect'}).success).toBe(false);
  for(const step of demo.steps.slice(0,-1)){
   run=recordDemoFieldProof(demo,run,step.id,checkDemoStep(step,demoExpectedResponses(step)).correct);
   expect(run.field.verified).toBe(false);
  }
  expect(applyDemoFieldAction(demo,run,{type:'execute'}).success).toBe(false);
  const last=demo.steps.at(-1)!;
  run=recordDemoFieldProof(demo,run,last.id,checkDemoStep(last,demoExpectedResponses(last)).correct);
  expect(run.field.verified).toBe(true);
  expect(run.field.delivered).toBe(false);
  run=applyDemoFieldAction(demo,run,{type:'execute'}).run;
  expect(run.field.executed).toBe(true);
  expect(applyDemoFieldAction(demo,run,{type:'deliver'}).success).toBe(false);
  run=applyDemoFieldAction(demo,run,{type:'collect'}).run;
  expect(applyDemoFieldAction(demo,run,{type:'checkpoint',id:spec.checkpoints[1]!}).success).toBe(false);
  for(const action of demoFieldActions(demo).slice(2)){
   const next=applyDemoFieldAction(demo,run,action);expect(next.success,JSON.stringify(action)).toBe(true);run=next.run;
  }
  expect(run.field.delivered).toBe(true);
  expect(run.field.carrying).toBe(false);
  expect(run.field.visited).toEqual(spec.checkpoints);
  expect(run.field.log.join(' ')).toContain(spec.consequence);
  const revised=recordDemoFieldProof(demo,run,demo.steps[0]!.id,false);
  expect(revised.field.delivered).toBe(false);
  expect(revised.field.executed).toBe(false);
  expect(run.field.delivered).toBe(true);
 });
 it('chapter-only previews and watching cannot mutate a separate learner operation',()=>{
  const demo=demonstrations[0]!,control=createDemoFieldRun(demo);
  let watch=createDemoFieldRun(demo);
  watch=recordDemoFieldProof(demo,watch,demo.steps.at(-1)!.id,true);
  expect(watch.field.verified).toBe(false);
  expect(applyDemoFieldAction(demo,watch,{type:'deliver'}).success).toBe(false);
  watch=applyDemoFieldAction(demo,watch,{type:'inspect'}).run;
  for(const step of demo.steps)watch=recordDemoFieldProof(demo,watch,step.id,true);
  for(const action of demoFieldActions(demo))watch=applyDemoFieldAction(demo,watch,action).run;
  expect(watch.field.delivered).toBe(true);
  expect(control).toEqual(createDemoFieldRun(demo));
 });
 it('narrated mission actions use exactly the learner actions and refuse unknown evidence',()=>{
  for(const demo of demonstrations){
   expect(getDemoWalkthrough(demo).fieldActions.map(item=>item.action)).toEqual(demoFieldActions(demo));
   expect(getDemoWalkthrough(demo).introduction).toContain(getDemoOperation(demo).objective);
   expect(()=>recordDemoFieldProof(demo,createDemoFieldRun(demo),'unseen',true)).toThrow(/Unknown/);
  }
 });
});
