import {describe,it,expect} from 'vitest';
import {demonstrations} from '../src/data/demonstrations';
import {getDemoWalkthrough} from '../src/data/demonstration-walkthroughs';
import {advanceDemo,applyDemoAttempt,assertDemo,checkDemoStep,createDemoProgress,demoCoaching,demoExpectedResponses,markDemoWatched,restartDemo,setDemoMode,useDemoHint} from '../src/lib/demonstration-engine';
import type {Demonstration,DemoStep} from '../src/lib/demonstration-types';
const first:DemoStep={
 id:'ratio',title:'Set the gear ratio',narration:'Compare input and output.',why:'The ratio depends on both tooth counts.',prompt:'Choose the gear and release the brake.',
 controls:[{id:'gear',label:'Driven gear teeth',type:'number',min:12,max:48,expected:24,tolerance:0},{id:'brake',label:'Holding brake engaged',type:'toggle',expected:false}],
 success:'The half-speed ratio is ready.',pitfall:'A correct ratio cannot move a blocked mechanism.',hint:'Compare driver and driven tooth counts before releasing the brake.',
 before:{room:'mechanics',shot:'close',values:{gear:36,brake:true}},after:{room:'mechanics',shot:'close',values:{gear:24,brake:false}},duration:6,
};
const second:DemoStep={
 id:'sequence',title:'Diagnose before repair',narration:'Preserve the evidence.',why:'Diagnosis needs an observation before replacement.',prompt:'Order the three actions.',
 controls:[{id:'order',label:'Diagnostic sequence',type:'order',initial:['repair','inspect','measure'],expected:['inspect','measure','repair'],options:[{value:'inspect',label:'Inspect'},{value:'measure',label:'Measure'},{value:'repair',label:'Repair'}]}],
 success:'The actions preserve a diagnostic trace.',pitfall:'Repairing first removes evidence about the original fault.',hint:'Observe before replacing.',
 before:{room:'systems',shot:'overhead'},after:{room:'systems',shot:'close'},duration:5,
};
const third:DemoStep={
 id:'handover',title:'Name the next action',narration:'Make a precise handoff.',why:'The receiver needs an actionable destination.',prompt:'Name the handover action and receiver.',
 controls:[{id:'action',label:'Recovery action',type:'text',expected:'documented handover',aliases:['recorded handover']},{id:'receiver',label:'Receiving role',type:'select',expected:'custodian',options:[{value:'custodian',label:'Custodian'},{value:'operator',label:'Operator'}]}],
 success:'The handover is explicit.',pitfall:'A vague destination leaves responsibility unresolved.',hint:'Use the named custodian.',
 before:{room:'council',shot:'shoulder'},after:{room:'council',shot:'close'},duration:7,
};
const demo:Demonstration={
 id:'fixture-workshop',kind:'lab',week:4,title:'Alternate workshop',subtitle:'A different example',skill:'Diagnosis',setting:'Training room',difference:'Different gear.',
 transfer:'Apply the same reasoning to a fresh mechanism.',sourceHref:'/sessions/week-04/',sourceLabel:'Week 4 lab',estimatedMinutes:5,steps:[first,second,third],
 artifact:{title:'Example trace',filename:'example.md',markdown:'An authored example, separate from student work.'},
};
describe('worked-example checking',()=>{
 it('checks numeric input without evaluating strings or accepting non-finite values',()=>{
  for(const gear of [24,'24',' 24.0 ','2.4e1'])expect(checkDemoStep(first,{gear,brake:false}).correct).toBe(true);
  for(const gear of ['',Infinity,NaN,'Infinity','12+12','24 teeth','0x18',true,{},undefined])expect(checkDemoStep(first,{gear,brake:false}).correct).toBe(false);
 });
 it('enforces explicit bounds before numeric tolerance',()=>{
  const step={...first,controls:[{...first.controls[0]!,expected:24,tolerance:.1,min:20,max:24}]};
  expect(checkDemoStep(step,{gear:23.95}).correct).toBe(true);
  expect(checkDemoStep(step,{gear:24.01}).correct).toBe(false);
  expect(checkDemoStep(step,{gear:23.8}).feedback).toContain('23.8');
 });
 it('normalises ordinary text and declared aliases without broadening identifiers',()=>{
  expect(checkDemoStep(third,{action:'  DOCUMENTED   HANDOVER ',receiver:'CUSTODIAN'}).correct).toBe(true);
  expect(checkDemoStep(third,{action:'recorded handover',receiver:'custodian'}).correct).toBe(true);
  expect(checkDemoStep(third,{action:'handover',receiver:'custodian'}).correct).toBe(false);
  expect(checkDemoStep(third,{action:'recorded handover',receiver:'invented role'}).correct).toBe(false);
 });
 it('requires real booleans and the complete exact order',()=>{
  expect(checkDemoStep(first,{gear:24,brake:'false'}).correct).toBe(false);
  expect(checkDemoStep(second,{order:['inspect','measure','repair']}).correct).toBe(true);
  for(const order of [['inspect','repair','measure'],['inspect','measure'],['inspect','measure','repair','repair'],'inspect,measure,repair'])expect(checkDemoStep(second,{order}).correct).toBe(false);
  expect(checkDemoStep(second,{order:['inspect','repair','measure']}).feedback).toContain('position 2');
 });
 it('rejects missing controls and unexpected response identifiers',()=>{
  expect(checkDemoStep(first,{gear:24}).fields.brake).toBe(false);
  const extra=checkDemoStep(first,{gear:24,brake:false,execute:'window.alert(1)'});
  expect(extra.correct).toBe(false);expect(extra.feedback).toContain('Unexpected response fields: execute');
 });
 it('copies worked answers without exposing mutable authored arrays',()=>{
  const values=demoExpectedResponses(second);(values.order as string[]).reverse();
  expect(second.controls[0]!.expected).toEqual(['inspect','measure','repair']);
 });
});
describe('worked-example progression and actual-attempt coaching',()=>{
 it('watching every after-state never completes independent control work',()=>{
  let p=createDemoProgress(demo);
  for(let i=0;i<demo.steps.length;i++){p=markDemoWatched(demo,p);p=applyDemoAttempt(demo,p,demoExpectedResponses(demo.steps[p.stepIndex]!));p=advanceDemo(demo,p);}
  expect(p.completed).toBe(false);expect(p.stepIndex).toBe(demo.steps.length-1);expect(p.watched).toHaveLength(3);
  const coach=demoCoaching(demo,p);expect(coach.attempts).toBe(0);expect(coach.completedSteps).toBe(0);expect(coach.independentSteps).toBe(0);
  expect(coach.summary).toContain('No control attempt');
 });
 it('refuses to advance an unsolved control step and keeps the prior object unchanged',()=>{
  const initial=createDemoProgress(demo,'control');const failed=applyDemoAttempt(demo,initial,{gear:36,brake:true});
  expect(initial.attempts).toEqual({});expect(failed.attempts.ratio?.attempts).toBe(1);
  expect(advanceDemo(demo,failed).stepIndex).toBe(0);
  expect(failed.attempts.ratio?.lastIncorrect).toEqual(['gear','brake']);
  expect(useDemoHint(demo,failed).attempts.ratio?.lastFeedback).toBe(failed.attempts.ratio?.lastFeedback);
 });
 it('coaching names the fields actually missed and changes after correction',()=>{
  let p=createDemoProgress(demo,'control');p=applyDemoAttempt(demo,p,{gear:24,brake:true});
  const before=demoCoaching(demo,p);expect(before.nextFocus).toContain('Holding brake engaged');expect(before.nextFocus).not.toContain('Driven gear teeth');
  p=applyDemoAttempt(demo,p,{gear:24,brake:false});
  const after=demoCoaching(demo,p);expect(after.completedSteps).toBe(1);expect(after.independentSteps).toBe(1);expect(after.attempts).toBe(2);
  expect(after.nextFocus).toContain('Diagnose before repair');
 });
 it('hints and watching are distinct from an unaided control completion',()=>{
  let p=createDemoProgress(demo,'control');p=useDemoHint(demo,p);p=applyDemoAttempt(demo,p,demoExpectedResponses(first));
  expect(p.attempts.ratio?.completed).toBe(true);expect(p.attempts.ratio?.independent).toBe(false);
  expect(demoCoaching(demo,p).hintsUsed).toBe(1);
  p=advanceDemo(demo,p);p=setDemoMode(demo,p,'watch');p=markDemoWatched(demo,p);p=setDemoMode(demo,p,'control');
  p=applyDemoAttempt(demo,p,demoExpectedResponses(second));
  expect(p.attempts.sequence?.completed).toBe(true);expect(p.attempts.sequence?.independent).toBe(false);
 });
 it('control completion requires every step, remains bounded and is reproducible',()=>{
  const solve=()=>{let p=createDemoProgress(demo,'control');for(const step of demo.steps){p=applyDemoAttempt(demo,p,demoExpectedResponses(step));p=advanceDemo(demo,p);}return p;};
  const p=solve();expect(p).toEqual(solve());expect(p.completed).toBe(true);expect(p.stepIndex).toBe(2);
  expect(advanceDemo(demo,p)).toEqual(p);expect(demoCoaching(demo,p).independentSteps).toBe(3);
  expect(demoCoaching(demo,p).nextFocus).toContain(demo.transfer);
 });
 it('restart clears only the ephemeral example and is independent of the source object',()=>{
  const p=applyDemoAttempt(demo,createDemoProgress(demo,'control'),demoExpectedResponses(first));
  const reset=restartDemo(demo);expect(reset.mode).toBe('watch');expect(reset.attempts).toEqual({});expect(reset.completed).toBe(false);
  expect(p.attempts.ratio?.completed).toBe(true);
 });
 it('rejects another example or an unknown step instead of guessing a chapter',()=>{
  const p=createDemoProgress(demo,'control');
  expect(()=>advanceDemo(demo,{...p,demoId:'different'})).toThrow(/another demonstration/);
  expect(()=>advanceDemo(demo,{...p,stepIndex:99})).toThrow(/out of range/);
  expect(()=>demoCoaching(demo,{...p,attempts:{unknown:{stepId:'unknown',attempts:1,hints:0,completed:true,lastFeedback:''}}})).toThrow(/unknown step/);
  expect(()=>markDemoWatched(demo,{...p,watched:['unknown']})).toThrow(/unknown/);
 });
});
describe('authored demonstration validation',()=>{
 it('rejects duplicate identifiers and impossible numeric configurations',()=>{
  expect(()=>assertDemo({...demo,steps:[first,first]})).toThrow(/Duplicate step/);
  expect(()=>assertDemo({...demo,steps:[{...first,controls:[first.controls[0]!,first.controls[0]!]}]})).toThrow(/Duplicate control/);
  expect(()=>assertDemo({...demo,steps:[{...first,controls:[{...first.controls[0]!,min:30}]}]})).toThrow(/outside/);
  expect(()=>assertDemo({...demo,steps:[{...first,controls:[{...first.controls[0]!,min:undefined}]}]})).toThrow(/bounds/);
  expect(()=>assertDemo({...demo,steps:[{...first,controls:[{...first.controls[0]!,tolerance:-1}]}]})).toThrow(/tolerance/);
 });
 it('rejects unknown select answers and impossible ordering item sets',()=>{
  expect(()=>assertDemo({...demo,steps:[{...third,controls:[{...third.controls[1]!,expected:'absent'}]}]})).toThrow(/not an option/);
  expect(()=>assertDemo({...demo,steps:[{...second,controls:[{...second.controls[0]!,initial:['inspect','repair']}]}]})).toThrow(/expected items/);
 });
});




describe('published demonstration catalog',()=>{
 it('provides a complete labelled worked example for all twelve labs and four assessments',()=>{
  expect(demonstrations).toHaveLength(16);
  expect(new Set(demonstrations.map(item=>item.id)).size).toBe(16);
  expect(demonstrations.filter(item=>item.kind==='lab').map(item=>item.week).sort((a,b)=>a!-b!)).toEqual(Array.from({length:12},(_,i)=>i+1));
  expect(demonstrations.filter(item=>item.kind==='assessment')).toHaveLength(4);
  expect(new Set(demonstrations.map(item=>item.artifact.filename)).size).toBe(16);
  for(const item of demonstrations){
   expect(()=>assertDemo(item)).not.toThrow();
   expect(item.steps.length,item.id).toBeGreaterThanOrEqual(3);
   expect(item.difference.trim().length,item.id).toBeGreaterThan(20);
   expect(item.transfer.trim().length,item.id).toBeGreaterThan(20);
   expect(item.sourceHref,item.id).toMatch(/^\/(?:sessions\/week-\d{2}|assessments\/[^/]+)\/$/);
   expect(item.artifact.filename,item.id).toMatch(/^[a-z0-9-]+\.md$/);
   expect(item.artifact.markdown,item.id).toMatch(/^# /);
   expect(item.artifact.markdown.match(/^## /gm)?.length??0,item.id).toBeGreaterThanOrEqual(3);
   expect(item.artifact.markdown.length,item.id).toBeGreaterThan(400);
   expect(item.artifact.markdown,item.id).toMatch(/example|demonstration|alternate/i);
   expect(item.artifact.markdown,item.id).not.toMatch(/\b(?:TODO|TBD|lorem ipsum)\b/i);
  }
 });
 for(const item of demonstrations){
  it(item.id+' has reproducible control answers and watching cannot complete it',()=>{
   const solve=()=>{let p=createDemoProgress(item,'control');for(const step of item.steps){const answers=demoExpectedResponses(step);expect(checkDemoStep(step,answers).correct,step.id).toBe(true);p=applyDemoAttempt(item,p,answers);p=advanceDemo(item,p);}return p;};
   const p=solve();expect(p).toEqual(solve());expect(p.completed).toBe(true);expect(demoCoaching(item,p).completedSteps).toBe(item.steps.length);
   let watching=createDemoProgress(item);for(const step of item.steps){watching=markDemoWatched(item,watching);watching=applyDemoAttempt(item,watching,demoExpectedResponses(step));watching=advanceDemo(item,watching);}
   expect(watching.completed).toBe(false);expect(demoCoaching(item,watching).attempts).toBe(0);
  });
  it(item.id+' identifies an incorrect value in every authored control',()=>{
   for(const step of item.steps)for(const control of step.controls){
    const responses=demoExpectedResponses(step);
    responses[control.id]=control.type==='toggle'?!control.expected:control.type==='number'?'not a number':control.type==='order'?['unknown-item']:'unrelated response';
    const result=checkDemoStep(step,responses);
    expect(result.correct,step.id+'/'+control.id).toBe(false);
    expect(result.fields[control.id],step.id+'/'+control.id).toBe(false);
    expect(result.feedback,step.id+'/'+control.id).toContain(control.label);
   }
  });
 }
});

describe('spoken walkthroughs stay aligned with the actual exercise',()=>{
 it('covers every example and its chapters with a task, actions and completion handoff',()=>{
  for(const item of demonstrations){
   const script=getDemoWalkthrough(item);
   expect(Object.keys(script.steps)).toEqual(item.steps.map(step=>step.id));
   expect(script.introduction,item.id).toMatch(/I |We /);
   expect(script.completion,item.id).toContain(item.transfer);
   for(const step of item.steps){
    const chapter=script.steps[step.id]!;
    expect(chapter.briefing).toContain(step.title);
    expect(chapter.outcome).toContain(step.success);
    for(const control of step.controls)expect(chapter.action).toContain(control.label);
   }
  }
 });
 it('speaks readable selected values, denied permissions and ordered dependencies',()=>{
  const lab=demonstrations.find(item=>item.id==='lab-07')!;
  expect(getDemoWalkthrough(lab).steps.hold!.action).toContain('to no');
  const memory=demonstrations.find(item=>item.id==='lab-02')!;
  expect(getDemoWalkthrough(memory).steps.route!.action).toContain('Gate, then Pool, then Press, then Dome');
  const observation=demonstrations.find(item=>item.id==='lab-01')!;
  const altered=structuredClone(observation);
  altered.steps[0]!.controls[0]!.expected='12:10';
  expect(getDemoWalkthrough(altered).steps.inspect!.action).toContain('12:10');
  expect(getDemoWalkthrough(observation).steps.inspect!.action).toContain('11:35');
 });
 it('rejects unrecognised examples and new chapters without an authored intention',()=>{
  expect(()=>getDemoWalkthrough(demo)).toThrow(/Missing worked-example/);
  const item=structuredClone(demonstrations[0]!);
  item.steps[0]!.id='unwritten-chapter';
  expect(()=>getDemoWalkthrough(item)).toThrow(/Missing narrated intention/);
 });
});
