import {observationInvestigations,memoryMethods,mechanismFault} from '../src/lib/training-challenges';
import {completedRecoverySupportsLab} from '../src/lib/lab-recovery';
import {newMission} from '../src/lib/mission-engine';
import { describe,it,expect } from 'vitest';
import { labOperation,labOperations } from '../src/data/lab-operations';
import { applyTraining,applyTrainingField,createTraining,trainingMissionComplete,labRequiresEnactment,validTraining,phases,observationFacts,memoryItems,mechanismConfig,spatialTarget,rotatedPorts,policyRoles,policyActions,permissionExpected,handoffTarget,type TrainingState,type TrainingPhase,type TrainingAction } from '../src/lib/training-engine';

function solve(week:number,phase:TrainingPhase):TrainingState {
  let s=createTraining(week,phase);
  const act=(action:TrainingAction)=>s=applyTraining(s,action,{recoveryComplete:true});
  const set=(key:string,value:string|number|boolean)=>act({type:'set',key,value});
  if(week===1){for(const key of ['clock','cup','door','note'])act({type:'inspect',key});act({type:'cover'});observationFacts[phase].forEach((f,i)=>set('classification'+i,f.category));set('followup',observationInvestigations[phase].useful);act({type:'investigate'});set('conclusion',observationInvestigations[phase].supported);}
  if(week===2){for(let i=0;i<4;i++)act({type:'inspect'});act({type:'cover'});memoryItems[phase].forEach((item,i)=>set('recall'+i,item));for(const method of memoryMethods){set('memoryMethod',method);act({type:'recall-trial'});}set('memoryStrategy',phase==='check'?'notes':'combined');}
  if(week===3){const t=spatialTarget(phase);for(let i=0;i<t.rotation;i+=90)act({type:'rotate'});for(let i=0;i<t.level;i++)act({type:'level'});set('prediction','north becomes '+rotatedPorts(t.rotation)[0]);}
  if(week===4){const c=mechanismConfig(phase),fault=mechanismFault(phase);act({type:'probe',key:fault});set('diagnosis',fault);act({type:'diagnose'});while(c.driver/Number(s.values.gear)*c.inputTurns!==c.targetTurns)act({type:'gear'});if(s.values.interlock)act({type:'interlock'});if(!s.values.spring)act({type:'spring'});set('prediction','opposite');}
  if(week===5){const key=String(s.values.fault);act({type:'power'});act({type:'measure',key});act({type:'power'});act({type:'continuity',key});act({type:'repair',key});act({type:'power'});act({type:'measure',key:'lamp'});}
  if(week===6){act({type:'inspect',key:'A'});act({type:'inspect',key:'B'});set('archive',phase==='transfer'?'B':'A');}
  if(week===7)for(const role of policyRoles)for(const a of policyActions)set(role+':'+a,permissionExpected(role,a)&&!(phase==='transfer'&&role==='technician'&&a==='service'));
  if(week===8){const t=handoffTarget(phase);set('destination',t.destination);set('quantity',t.quantity);set('code',t.code);set('acknowledged',true);}
  if(week===9){for(const key of ['operator','custodian','engineer'])act({type:'inspect',key});set('proposal',phase==='transfer'?'stabilise':'copy');set('custody','recorded');set('verification','independent');set('responsibility',phase==='transfer'?'monitor':'receiver');set('timing',phase==='transfer'?'review':'now');}
  if(week===10){set('routeObjective','dispatch');set('prediction',phase==='practice'?'0':'1');for(const key of ['east','east','east','east','north','north','north','north'])act({type:'route',key});for(let i=0;i<8;i++)act({type:'step'});set('prediction',String(s.values.detected));}
  if(week===11){act({type:'disrupt'});set('revision','Verify the available replacement dependency before authorising handover.');set('reason','The original relied on a condition that is unavailable; the replacement retains its specific evidence limitation.');set('replacement',phase==='transfer'?'reference-readings':'west-relay');act({type:'rehearse'});}
  if(week===12){set('objective','Recover the required archive.');set('evidence','The completed run records its checked source and the actual delivery.');set('alternative','Preserving the original in place was an available alternative with different consequences.');}
  act({type:'test'});expect(s.complete).toBe(true);return s;
}
function enact(s:TrainingState):TrainingState {
  const act=(a:Parameters<typeof applyTrainingField>[1])=>s=applyTrainingField(s,a);
  act({type:'inspect'});act({type:'execute'});act({type:'collect'});
  for(const id of labOperation(s.week,s.phase).checkpoints)act({type:'checkpoint',id});
  act({type:'deliver'});return s;
}
describe('performed lab missions',()=>{
  for(let week=1;week<=12;week++)for(const phase of phases)it('week '+week+' / '+phase+' verifies its output and preserves the optional or required field consequence',()=>{
    const empty=createTraining(week,phase);
    expect(applyTrainingField(empty,{type:'execute'}).field?.executed).toBe(false);
    expect(applyTrainingField(empty,{type:'proof',verified:true})).toBe(empty);
    const verified=solve(week,phase);
    expect(trainingMissionComplete(verified)).toBe(!labRequiresEnactment(week));
    expect(applyTrainingField(verified,{type:'deliver'}).field?.delivered).toBe(false);
    const finished=enact(verified);
    expect(trainingMissionComplete(finished)).toBe(true);
    expect(validTraining(JSON.parse(JSON.stringify(finished)),week)).toBe(true);
    expect(finished.field?.visited).toEqual(labOperation(week,phase).checkpoints);
    expect(verified.field?.delivered).toBe(false);
  });
  it('a completed record still needs actual investigation and comparative retrieval evidence',()=>{
    const observed=solve(1,'practice');
    expect(applyTraining({...observed,inspected:[]},{type:'test'}).complete).toBe(false);
    expect(applyTraining({...observed,inspected:observed.inspected.filter(id=>!id.startsWith('investigation:'))},{type:'test'}).complete).toBe(false);
    const recalled=solve(2,'practice');
    expect(applyTraining({...recalled,inspected:[]},{type:'test'}).complete).toBe(false);
    expect(applyTraining({...recalled,values:{...recalled.values,'score-notes':undefined} as unknown as TrainingState['values']},{type:'test'}).complete).toBe(false);
  });
  it('a changed gear retracts downstream machinery, cargo, checkpoints and completion',()=>{
    const finished=enact(solve(4,'practice'));
    const changed=applyTraining(finished,{type:'gear'});
    expect(changed.complete).toBe(false);
    expect(changed.field).toMatchObject({verified:false,executed:false,carrying:false,visited:[],delivered:false});
    expect(finished.field?.delivered).toBe(true);
  });
  it('rejects forged scene progress and mismatched scenarios on import',()=>{
    const s=createTraining(4);
    expect(validTraining({...s,field:{...s.field,executed:true}},4)).toBe(false);
    const solved=solve(4,'practice');
    expect(validTraining({...solved,values:{...solved.values,gear:36}},4)).toBe(false);
    expect(validTraining({...solved,field:{...solved.field,operationId:'lab-04-transfer'}},4)).toBe(false);
  });
  it('a paragraph alone cannot rehearse a changed route',()=>{
    let s=createTraining(11);for(const a of [{type:'disrupt'},{type:'set',key:'revision',value:'Use a very long replacement plan without testing any actual dependency.'},{type:'set',key:'reason',value:'This sounds plausible but provides no recorded practical rehearsal.'}] satisfies TrainingAction[])s=applyTraining(s,a);
    expect(applyTraining(s,{type:'test'}).complete).toBe(false);
    s=applyTraining(s,{type:'set',key:'replacement',value:'west-unchecked'});
    s=applyTraining(s,{type:'rehearse'});
    expect(s.values.dependencyChecked).toBe(false);
  });
  it('a historical or merely status-labelled recovery cannot qualify for the new field lab',()=>{
    expect(completedRecoverySupportsLab(undefined)).toBe(false);
    const fresh=newMission('recovery');
    expect(completedRecoverySupportsLab(fresh)).toBe(false);
    expect(completedRecoverySupportsLab({...fresh,status:'complete',ending:'physical'})).toBe(false);
    const legacy={...fresh,status:'complete' as const,ending:'physical' as const,field:undefined,recovery:undefined};
    expect(completedRecoverySupportsLab(legacy)).toBe(false);
  });
  it('an after-action paragraph cannot create a completed recovery mission',()=>{
    const account=solve(12,'practice');
    const missing=applyTraining(account,{type:'test'},{recoveryComplete:false});
    expect(missing.complete).toBe(false);expect(missing.field?.verified).toBe(false);
  });
  it('keeps the twelve objectives authored and uses different consequences',()=>{
    expect(Object.keys(labOperations)).toHaveLength(12);
    expect(new Set(Object.values(labOperations).map(x=>x.title)).size).toBe(12);
    expect(new Set(Object.values(labOperations).map(x=>x.effect)).size).toBeGreaterThanOrEqual(10);
    for(let week=1;week<=12;week++)expect(labOperation(week,'practice').objective).not.toBe(labOperation(week,'transfer').objective);
  });
});
