import {describe,it,expect} from 'vitest';
import {demonstrationById,demonstrations} from '../src/data/demonstrations';
import {getDemoWalkthrough} from '../src/data/demonstration-walkthroughs';
import {phases,memoryItems,observationFacts,spatialTarget,rotatedPorts,mechanismConfig,createTraining,handoffTarget,sensorCells,applyTraining} from '../src/lib/training-engine';
import {applyMission,newMission,requiredProfile} from '../src/lib/mission-engine';

const chapter=(id:string,step:string)=>demonstrationById(id).steps.find(s=>s.id===step)!;
const answer=(id:string,step:string,control:string)=>chapter(id,step).controls.find(c=>c.id===control)!.expected;

// These guards protect specific authored differences. They do not automate a
// judgement that a lesson is original or pedagogically sufficient.
describe('worked examples require fresh assigned-task decisions',()=>{
 it('keeps a reviewed example for each of twelve labs and four assessments',()=>{
  expect(demonstrations.map(d=>d.id)).toEqual([...Array.from({length:12},(_,i)=>'lab-'+String(i+1).padStart(2,'0')),'assessment-fieldwork','assessment-a1','assessment-a2','assessment-final']);
 });
 it('observation uses a different reading and a different unsupported inference',()=>{
  const reading=String(answer('lab-01','inspect','clock'));
  for(const phase of phases)expect(observationFacts[phase][0]!.label).not.toContain(reading);
  expect(chapter('lab-01','cause').prompt).toContain('thirty-five minutes');
  expect(demonstrationById('lab-01').artifact.markdown).not.toContain('gardener left in a hurry');
 });
 it('memory requires a new complete ordered sequence',()=>{
  const sequence=answer('lab-02','retrieve','items');
  for(const phase of phases)expect(sequence).not.toEqual(memoryItems[phase]);
 });
 it('connector ports and level cannot be copied as a complete assigned configuration',()=>{
  const initial=chapter('lab-03','rotate').before.values!.ports as string[];
  const rotation=Number(answer('lab-03','rotate','orientation'));
  const directions=['north','east','south','west'];
  const result=initial.map(port=>directions[(directions.indexOf(port)+rotation/90)%4]);
  for(const phase of phases){
   const target=spatialTarget(phase);
   expect([result,answer('lab-03','translate','level')]).not.toEqual([rotatedPorts(target.rotation),target.level]);
  }
 });
 it('mechanism demonstration uses its own complete calculation and readiness configuration',()=>{
  const values=chapter('lab-04','run').after.values!;
  for(const phase of phases){
   const c=mechanismConfig(phase);
   expect([values.gearDriver,values.gearFollower,values.turns,values.cam]).not.toEqual([c.driver,c.driver*c.inputTurns/c.targetTurns,c.inputTurns,c.cam]);
  }
 });
 it('circuit source ratings remain distinct from learner-entered measurement answers',()=>{
  for(const demo of demonstrations)for(const step of demo.steps)for(const frame of [step.before,step.after]){
   if(frame.room!=='systems')continue;
   expect(Number(frame.values!.sourceVoltage)).toBeGreaterThan(0);
   expect(frame.values!.sourceVoltage).toBe(frame.values!.voltage);
   expect(step.controls.some(c=>c.id==='sourceVoltage')).toBe(false);
  }
 });
 it('two-fault diagnosis stays incomplete after the first correct repair',()=>{
  expect(chapter('lab-05','measure').before.values!.fault).toBe('cable-and-lamp');
  expect(chapter('lab-05','verify').after.values).toMatchObject({fault:'lamp',powered:true,verified:false});
  expect(answer('lab-05','verify','complete')).toBe(false);
  expect(chapter('lab-05','conclude').after.values).toMatchObject({fault:'none',cableRepaired:true,lampRepaired:true,verified:true});
  for(const phase of phases)expect(['fuse','cable','lamp']).toContain(createTraining(5,phase).values.fault);
 });
 it('an unsigned ledger request does not replace the valid selection',()=>{
  expect(answer('lab-06','compare','selected')).toBe('North');
  expect(answer('lab-06','limit','selected')).toBe('North');
  expect(chapter('lab-06','limit').after.values).toMatchObject({authority:'signed-R1',messageStatus:'claim'});
  expect(chapter('lab-06','amend').after.values).toMatchObject({authority:'signed-R2',selected:'South',oldSouth:'17 / Q-2 / 07:35'});
  expect(answer('lab-06','amend','version')).toContain('S2');
 });
 it('the embargo policy cannot be reused as the assigned universal-read matrix',()=>{
  const policy=chapter('lab-07','repair').after.values!.policy as string[];
  expect(policy).toContain('maintainer:read:deny');
  expect(policy).toContain('maintainer:service:allow');
  const roleMap:Record<string,string>={reader:'observer',maintainer:'technician',custodian:'registrar'};
  let assigned=createTraining(7);
  for(const cell of policy){const [role,action,value]=cell.split(':');assigned=applyTraining(assigned,{type:'set',key:roleMap[role!]+':'+(action==='approve'?'certify':action),value:value==='allow'});}
  expect(applyTraining(assigned,{type:'test'}).complete).toBe(false);
  expect(chapter('lab-07','hold').after.values!.policy).toContain('maintainer:service:allow');
 });
 it('the council corroborates evidence and supports a different agreement sequence',()=>{
  const capacity=chapter('lab-09','capacity').after.values!;
  expect(Number(capacity.capacity)).toBeGreaterThanOrEqual(Number(capacity.load));
  expect(answer('lab-09','capacity','supported')).toBe(true);
  expect(answer('lab-09','claim','evidence')).toContain('copies match');
  expect(chapter('lab-09','agree').after.values!.proposal).toBe('documented physical handover');
  expect(chapter('lab-09','change').after.values!.proposal).toContain('copy');
 });
 it('revision repairs an authority dependency before sealing without changing routes',()=>{
  const before=chapter('lab-11','baseline').after.values!;
  const after=chapter('lab-11','revise').after.values!;
  expect(after.originalPlan).toEqual(before.plan);
  const plan=after.plan as string[];
  expect(plan.indexOf('Check recipient scope')).toBeLessThan(plan.indexOf('Seal case'));
  expect(plan.indexOf('Record new authorisation')).toBeLessThan(plan.indexOf('Seal case'));
  expect(chapter('lab-11','disruption').narration).toContain('Routes remain open');
  expect(plan.join(' ')).not.toMatch(/east|west|relay/i);
 });
 it('A2 demonstrates a load fault and two valid mirrors before the changed scope',()=>{
  expect(chapter('assessment-a2','measure').before.values).toMatchObject({fault:'lamp',voltage:12,powered:true});
  expect(answer('assessment-a2','isolate','continuity')).toBe('OPEN');
  expect(answer('assessment-a2','archive','matches')).toBe('Delta and Echo');
  expect(answer('assessment-a2','amend','selected')).toBe('Foxtrot');
  expect(answer('assessment-a2','amend','criterion')).toBe('Required core plus calibration trace');
  expect(getDemoWalkthrough(demonstrationById('assessment-a2')).completion).toContain('Foxtrot');
 });
 it('Fieldwork preserves the revised example records rather than stale solutions',()=>{
  const portfolio=demonstrationById('assessment-fieldwork').artifact.markdown;
  for(const id of ['lab-05','lab-06','lab-07','lab-09','lab-11']){
   const artifact=demonstrationById(id).artifact.markdown.trim().replace(/^# /,'## ');
   expect(portfolio,id).toContain(artifact);
  }
 });
 it('handoff retains the protocol but supplies different complete messages',()=>{
  const demo=demonstrationById('lab-08');
  for(const step of demo.steps){
   const values=Object.fromEntries(step.controls.map(c=>[c.id,c.expected]));
   if(!values.destination||!values.count||!values.code)continue;
   for(const phase of phases){const t=handoffTarget(phase);expect([values.destination,String(values.count),values.code]).not.toEqual([t.destination,t.quantity,t.code]);}
  }
 });
 it('route geometry has a different destination and must be recomputed',()=>{
  for(const id of ['lab-10','assessment-final']){
   const movement=demonstrationById(id).steps.find(s=>s.before.room==='movement')!.before.values!;
   expect(movement.goal).toBe(3); // assigned destination is cell 4
   for(const phase of phases)expect((movement.sensors as string[]).map(Number)).not.toEqual(sensorCells(phase));
  }
 });
 it('A1 demonstration settings fail the assigned trial checks',()=>{
  let state=newMission('a1');state.role='systems';
  expect(applyMission(state,{type:'gear',follower:Number(answer('assessment-a1','ratio','gearFollower'))}).success).toBe(false);
  state.role='observer';
  expect(applyMission(state,{type:'orient',degrees:Number(answer('assessment-a1','rotate','orientation'))}).success).toBe(false);
  expect(applyMission(state,{type:'recall',items:(answer('assessment-a1','recall','items') as string[]).join(',')}).success).toBe(false);
 });
 it('the capstone example requires a different complete recovery calculation and configuration',()=>{
  const demoLift=chapter('assessment-final','lift');
  const demoFollower=Number(answer('assessment-final','lift','gearFollower'));
  for(const scenario of ['baseline','conflicting-archive'] as const){
   let state=newMission('recovery',scenario);state.role='investigator';
   state=applyMission(state,{type:'replica',replica:requiredProfile(state).id}).state;
   state.role='systems';
   state=applyMission(state,{type:'gear',follower:demoFollower}).state;
   state=applyMission(state,{type:'brake',released:true}).state;
   // A follower tooth count can coincide; its driver and required ratio still differ.
   expect(Number(demoLift.before.values!.gearDriver)/demoFollower).not.toBe(state.driver/requiredProfile(state).follower);
   expect(applyMission(state,{type:'turn'}).success).toBe(scenario==='baseline');
   state.role='observer';
   expect(applyMission(state,{type:'orient',degrees:Number(answer('assessment-final','connector','orientation'))}).success).toBe(false);
  }
  expect(demonstrationById('assessment-final').artifact.markdown).toContain('Halcyon');
  expect(demonstrationById('lab-12').artifact.markdown).toContain('Lark');
 });
});
