import {describe,it,expect} from 'vitest';
import {applyTraining,createTraining,mechanismResult,circuitReading,observationFacts,memoryItems,phases,policyRoles,policyActions,permissionExpected,sensorCells,validTraining,initialPlan,type TrainingAction,type TrainingState} from '../src/lib/training-engine';
const run=(state:TrainingState,...actions:TrainingAction[])=>actions.reduce(applyTraining,state);
const set=(key:string,value:string|number|boolean):TrainingAction=>({type:'set',key,value});
describe('skills training domain models',()=>{
  it('keeps the caller state immutable and rejects unknown configuration writes',()=>{
    const original=createTraining(4);const changed=applyTraining(original,{type:'interlock'});
    expect(original.values.interlock).toBe(true);expect(changed.values.interlock).toBe(false);
    expect(applyTraining(original,set('__proto__','bad'))).toBe(original);
    expect(()=>createTraining(13)).toThrow();expect(()=>createTraining(0)).toThrow();
  });
  it.each(phases)('observation separates claims, inference and recall in %s',phase=>{
    let s=createTraining(1,phase);expect(applyTraining(s,{type:'test'}).complete).toBe(false);
    observationFacts[phase].forEach((fact,i)=>s=applyTraining(s,set('classification'+i,fact.category)));
    s=applyTraining(s,set('recall0',phase==='practice'?'08:20':phase==='check'?'09:40':'14:10'));
    expect(applyTraining(s,{type:'test'}).complete).toBe(true);
    s=applyTraining(s,set('classification4','observation'));expect(applyTraining(s,{type:'test'}).complete).toBe(false);
  });
  it.each(phases)('memory retrieval changes the item set and accepts case-normalised recall in %s',phase=>{
    let s=createTraining(2,phase);memoryItems[phase].forEach((item,i)=>s=applyTraining(s,set('recall'+i,' '+item.toLowerCase()+' ')));
    expect(applyTraining(s,{type:'test'}).complete).toBe(true);
    s=applyTraining(s,set('recall2','invented'));expect(applyTraining(s,{type:'test'}).complete).toBe(false);
  });
  it('rotation and elevation are distinct dependencies',()=>{
    let s=run(createTraining(3,'check'),{type:'rotate'},{type:'rotate'},set('prediction','north becomes south'));
    expect(applyTraining(s,{type:'test'}).complete).toBe(false);
    s=applyTraining(s,{type:'level'});expect(applyTraining(s,{type:'test'}).complete).toBe(true);
    s=applyTraining(s,{type:'rotate'});expect(s.complete).toBe(false);
  });
  it('a correct gear ratio cannot move a blocked mechanism',()=>{
    let s=createTraining(4);expect(mechanismResult(s).output).toBe(2);
    s=applyTraining(s,{type:'cam'});expect(s.values.cam).toBe(0);expect(s.feedback).toContain('interlock');
    s=run(s,set('prediction','opposite'),{type:'crank'});expect(s.complete).toBe(false);expect(s.values.turns).toBe(0);
    s=run(s,{type:'interlock'},{type:'cam'},{type:'cam'},{type:'spring'},{type:'crank'});
    expect(s.complete).toBe(true);expect(s.values.turns).toBe(2);
    expect(applyTraining(s,{type:'gear'}).complete).toBe(false);
  });
  it('the changed mechanism requires a different gear and cam position',()=>{
    let s=run(createTraining(4,'transfer'),{type:'interlock'},{type:'cam'},{type:'spring'},set('prediction','opposite'),{type:'crank'});
    expect(s.complete).toBe(false);expect(s.values.turns).toBe(3);
    s=run(s,{type:'gear'},{type:'crank'});expect(s.complete).toBe(true);expect(s.values.gear).toBe(36);
  });
  it.each(phases)('electrical diagnosis records the fault before repair in %s',phase=>{
    let s=createTraining(5,phase);const fault=String(s.values.fault);
    expect(circuitReading(s,'battery')).toBe(6);expect(circuitReading(s,'lamp')).toBe(0);
    s=run(s,{type:'power'},{type:'measure',key:fault});
    expect(s.values.meter).toBe(fault+(fault==='lamp'?': 6 V':': 0 V'));
    const unsafe=applyTraining(s,{type:'repair',key:fault});expect(unsafe.values.repaired).toBe(false);
    s=run(s,{type:'power'},{type:'continuity',key:fault},{type:'repair',key:fault},{type:'power'},{type:'test'});
    expect(s.complete).toBe(true);expect(circuitReading(s,'lamp')).toBe(6);
  });
  it('repair by guessing cannot masquerade as diagnosis',()=>{
    const s=run(createTraining(5),{type:'repair',key:'fuse'},{type:'power'},{type:'test'});
    expect(circuitReading(s,'lamp')).toBe(6);expect(s.complete).toBe(false);expect(s.feedback).toContain('lacks');
  });
  it('archive selection changes only when the authoritative deliverable changes',()=>{
    const baseline=run(createTraining(6),{type:'inspect',key:'A'},{type:'inspect',key:'B'},set('archive','B'),{type:'test'});
    expect(baseline.complete).toBe(false);
    expect(run(baseline,set('archive','A'),{type:'test'}).complete).toBe(true);
    expect(run(createTraining(6,'transfer'),{type:'inspect',key:'A'},{type:'inspect',key:'B'},set('archive','B'),{type:'test'}).complete).toBe(true);
  });
  it.each(phases)('permission regressions include both denied and allowed actions in %s',phase=>{
    let s=createTraining(7,phase);expect(applyTraining(s,{type:'test'}).complete).toBe(false);
    for(const r of policyRoles)for(const a of policyActions)s=applyTraining(s,set(r+':'+a,permissionExpected(r,a)&&!(phase==='transfer'&&r==='technician'&&a==='service')));
    expect(applyTraining(s,{type:'test'}).complete).toBe(true);
    s=applyTraining(s,set('observer:read',false));expect(applyTraining(s,{type:'test'}).complete).toBe(false);
  });
  it('handoff requires exact content and acknowledged readback',()=>{
    let s=run(createTraining(8),set('destination','Relay'),set('quantity','2'),set('code','amber'),{type:'test'});
    expect(s.complete).toBe(false);s=run(s,set('acknowledged',true),{type:'test'});expect(s.complete).toBe(true);
    expect(run(s,set('destination','Archive'),{type:'test'}).complete).toBe(false);
  });
  it('council evaluates published constraints rather than delivery or appearance',()=>{
    const inspect:TrainingAction[]=['operator','custodian','engineer'].map(key=>({type:'inspect',key}));
    expect(run(createTraining(9),...inspect,set('proposal','copy'),{type:'test'}).complete).toBe(true);
    expect(run(createTraining(9,'transfer'),...inspect,set('proposal','copy'),{type:'test'}).complete).toBe(false);
    expect(run(createTraining(9,'transfer'),...inspect,set('proposal','stabilise'),{type:'test'}).complete).toBe(true);
  });
  it('sensor route can be stepped, rewound and reproduced',()=>{
    let s=createTraining(10);for(const key of ['east','east','east','east','north','north','north','north'])s=applyTraining(s,{type:'route',key});
    for(let i=0;i<8;i++)s=applyTraining(s,{type:'step'});
    expect(s.values.position).toBe(4);expect(s.values.detected).toBe(0);
    expect(run(s,set('prediction','0'),{type:'test'}).complete).toBe(true);
    s=applyTraining(s,{type:'rewind'});expect(s.values.position).toBe(20);expect(s.sequence).toHaveLength(8);
    for(let i=0;i<8;i++)s=applyTraining(s,{type:'step'});expect(s.values.detected).toBe(0);
    expect(sensorCells('transfer')).not.toEqual(sensorCells('practice'));
  });
  it('a disrupted revision never rewrites the original plan',()=>{
    const original=createTraining(11);const revised=run(original,{type:'disrupt'},set('revision','Inspect the manifest, restore relay, check west relay, use west passage, hand over.'),set('reason','The east route is unavailable, so verify the additional relay before committing to the west route.'),{type:'test'});
    expect(revised.complete).toBe(true);expect(revised.values.original).toBe(initialPlan.join(' → '));expect(original.values.revision).toBe('');
    expect(applyTraining(revised,set('original','rewritten')).values.original).toBe(initialPlan.join(' → '));
  });
  it('validates a saved state without executing imported data',()=>{
    const state=createTraining(4);expect(validTraining(JSON.parse(JSON.stringify(state)),4)).toBe(true);
    expect(validTraining(state,5)).toBe(false);expect(validTraining({...state,actions:['x'.repeat(9000)]},4)).toBe(false);
    expect(validTraining({...state,values:{...state.values,script:()=>1}},4)).toBe(false);
    expect(validTraining({...state,values:{}},4)).toBe(false);
    expect(validTraining({...state,values:{...state.values,gear:0}},4)).toBe(false);
    expect(validTraining({...state,values:{...state.values,cam:NaN}},4)).toBe(false);
  });
});




