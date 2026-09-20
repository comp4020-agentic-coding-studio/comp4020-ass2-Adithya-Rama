import {describe,it,expect} from 'vitest';
import {demonstrationById,demonstrations} from '../src/data/demonstrations';
import {createDemoFieldRun,recordDemoFieldProof,demoLearningComplete,demoNeedsHandover} from '../src/data/demo-operations';
import {checkDemoStep,demoExpectedResponses} from '../src/lib/demonstration-engine';

describe('worked methods and relevant completion',()=>{
 it('an investigation requires all chapter evidence but no artificial package delivery',()=>{
  const demo=demonstrationById('lab-01');let run=createDemoFieldRun(demo);
  expect(demoNeedsHandover(demo)).toBe(false);
  for(const step of demo.steps.slice(0,-1))run=recordDemoFieldProof(demo,run,step.id,true);
  expect(demoLearningComplete(demo,run)).toBe(false);
  run=recordDemoFieldProof(demo,run,demo.steps.at(-1)!.id,true);
  expect(run.field.delivered).toBe(false);expect(demoLearningComplete(demo,run)).toBe(true);
  expect(demoLearningComplete(demo,recordDemoFieldProof(demo,run,demo.steps[0]!.id,false))).toBe(false);
 });
 it('a commissioned mechanism and final recovery still need their performed handover',()=>{
  for(const id of ['lab-04','lab-05','lab-08','assessment-final']){
   const demo=demonstrationById(id);let run=createDemoFieldRun(demo);
   for(const step of demo.steps)run=recordDemoFieldProof(demo,run,step.id,true);
   expect(demoNeedsHandover(demo)).toBe(true);expect(demoLearningComplete(demo,run)).toBe(false);
  }
 });
 it('method choices distinguish a useful strategy from a ritual',()=>{
  for(const [id,stepId,field,wrong] of [
   ['lab-02','limits','method','Rely on the successful memory trial alone'],
   ['lab-04','release','test','Install a larger gear immediately'],
   ['lab-09','agree','tradeoff','Moving the original is always academically superior'],
   ['lab-10','defend','criterion','Always choose the route with zero contacts'],
   ['assessment-final','debrief','omission','A digital ending requires no verification'],
  ]){
   const step=demonstrationById(id!).steps.find(s=>s.id===stepId)!;
   const answers=demoExpectedResponses(step);expect(checkDemoStep(step,answers).correct).toBe(true);
   expect(checkDemoStep(step,{...answers,[field!]:wrong}).correct).toBe(false);
  }
 });
 it('every example identifies a method and a consequential difference from assigned work',()=>{
  for(const demo of demonstrations){expect(demo.method?.length).toBeGreaterThan(35);expect(demo.transfer.length).toBeGreaterThan(80);}
 });
});