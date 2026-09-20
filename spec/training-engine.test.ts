import {observationInvestigations,mechanismFault,evaluateAgreement} from '../src/lib/training-challenges';
import {describe,it,expect} from 'vitest';
import {applyTraining,createTraining,mechanismResult,circuitReading,observationFacts,memoryItems,phases,policyRoles,policyActions,permissionExpected,sensorCells,validTraining,initialPlan,type TrainingAction,type TrainingState} from '../src/lib/training-engine';
const run=(state:TrainingState,...actions:TrainingAction[])=>actions.reduce((current,action)=>applyTraining(current,action),state);
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
    for(const key of ['clock','cup','door','note'])s=applyTraining(s,{type:'inspect',key});s=applyTraining(s,{type:'cover'});
    observationFacts[phase].forEach((fact,i)=>s=applyTraining(s,set('classification'+i,fact.category)));
    s=applyTraining(s,set('recall0',phase==='practice'?'08:20':phase==='check'?'09:40':'14:10'));
    const followup=observationInvestigations[phase];s=run(s,set('followup',followup.useful),{type:'investigate'},set('conclusion',followup.supported));
    expect(applyTraining(s,{type:'test'}).complete).toBe(true);
    s=applyTraining(s,set('classification4','observation'));expect(applyTraining(s,{type:'test'}).complete).toBe(false);
  });
  it.each(phases)('compares memory methods without requiring perfect recall in %s',phase=>{
    let s=createTraining(2,phase);for(let i=0;i<4;i++)s=applyTraining(s,{type:'inspect'});s=applyTraining(s,{type:'cover'});
    s=applyTraining(s,set('memoryMethod','unaided'));s=applyTraining(s,{type:'recall-trial'});expect(s.values['score-unaided']).toBe(0);
    for(const method of ['loci','notes']){memoryItems[phase].forEach((item,i)=>s=applyTraining(s,set('recall'+i,' '+item.toLowerCase()+' ')));s=run(s,set('memoryMethod',method),{type:'recall-trial'});}
    expect(applyTraining(s,{type:'test'}).complete).toBe(false);
    s=applyTraining(s,set('memoryStrategy',phase==='check'?'notes':'combined'));expect(applyTraining(s,{type:'test'}).complete).toBe(true);
    expect(s.values['score-unaided']).toBe(0);expect(s.values['score-notes']).toBe(4);
    expect(run(s,set('memoryStrategy','loci'),{type:'test'}).complete).toBe(phase==='practice');
  });
  it('rotation and elevation are distinct dependencies',()=>{
    let s=run(createTraining(3,'check'),{type:'rotate'},{type:'rotate'},set('prediction','north becomes south'));
    expect(applyTraining(s,{type:'test'}).complete).toBe(false);
    s=applyTraining(s,{type:'level'});expect(applyTraining(s,{type:'test'}).complete).toBe(true);
    s=applyTraining(s,{type:'rotate'});expect(s.complete).toBe(false);
  });
  it.each(phases)('requires an original discriminating mechanism diagnosis in %s',phase=>{
    let s=createTraining(4,phase);const fault=mechanismFault(phase);
    expect(applyTraining(s,{type:'test'}).complete).toBe(false);
    s=run(s,{type:'probe',key:fault},set('diagnosis',fault),{type:'diagnose'});expect(s.values.diagnosed).toBe(true);
    if(phase==='practice')s=applyTraining(s,{type:'interlock'});
    if(phase==='check')s=run(s,{type:'gear'},{type:'gear'});
    if(phase==='transfer')s=applyTraining(s,{type:'spring'});
    s=run(s,set('prediction','opposite'),{type:'crank'});expect(s.complete).toBe(true);expect(mechanismResult(s).matches).toBe(true);
    expect(applyTraining(s,{type:'gear'}).complete).toBe(false);
  });
  it('does not grant mechanism diagnosis after a guessed correction',()=>{
    const s=run(createTraining(4),{type:'interlock'},{type:'probe',key:'interlock'},set('diagnosis','interlock'),{type:'diagnose'},set('prediction','opposite'),{type:'test'});
    expect(mechanismResult(s).moving).toBe(true);expect(s.values.diagnosed).toBe(false);expect(s.complete).toBe(false);
  });
  it.each(phases)('electrical diagnosis records the fault before repair in %s',phase=>{
    let s=createTraining(5,phase);const fault=String(s.values.fault);
    expect(circuitReading(s,'battery')).toBe(6);expect(circuitReading(s,'lamp')).toBe(0);
    s=run(s,{type:'power'},{type:'measure',key:fault});
    expect(s.values.meter).toBe(fault+(fault==='lamp'?': 6 V':': 0 V'));
    const unsafe=applyTraining(s,{type:'repair',key:fault});expect(unsafe.values.repaired).toBe(false);
    s=run(s,{type:'power'},{type:'continuity',key:fault},{type:'repair',key:fault},{type:'power'},{type:'measure',key:'lamp'},{type:'test'});
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
  it('accepts multiple feasible council agreements while explaining their different costs',()=>{
    const inspect:TrainingAction[]=['operator','custodian','engineer'].map(key=>({type:'inspect',key}));
    for(const phase of phases)for(const proposal of ['copy','stabilise','supported-original']){
      const responsibility=proposal==='copy'?'receiver':proposal==='stabilise'?'monitor':'escort';const timing=proposal==='copy'?'now':proposal==='stabilise'?'review':'support';
      const s=run(createTraining(9,phase),...inspect,set('proposal',proposal),set('custody','recorded'),set('verification','independent'),set('responsibility',responsibility),set('timing',timing),{type:'test'});
      expect(s.complete).toBe(!(phase==='check'&&proposal==='supported-original'||phase==='transfer'&&proposal==='copy'));
      expect(evaluateAgreement(s).cost.length).toBeGreaterThan(40);
      expect(run(s,set('responsibility','nobody'),{type:'test'}).complete).toBe(false);
    }
  });
  it('rejects proposed agreement without terms or actual evidence',()=>{
    const s=run(createTraining(9),set('proposal','copy'),{type:'test'});expect(s.complete).toBe(false);expect(s.feedback).toContain('responsible');
  });
  it('sensor route can be stepped, rewound and reproduced',()=>{
    let s=run(createTraining(10),set('routeObjective','dispatch'),set('prediction','0'));for(const key of ['east','east','east','east','north','north','north','north'])s=applyTraining(s,{type:'route',key});
    for(let i=0;i<8;i++)s=applyTraining(s,{type:'step'});
    expect(s.values.position).toBe(4);expect(s.values.detected).toBe(0);
    expect(run(s,set('prediction','0'),{type:'test'}).complete).toBe(true);
    s=applyTraining(s,{type:'rewind'});expect(s.values.position).toBe(20);expect(s.sequence).toHaveLength(8);
    for(let i=0;i<8;i++)s=applyTraining(s,{type:'step'});expect(s.values.detected).toBe(0);
    expect(sensorCells('transfer')).not.toEqual(sensorCells('practice'));
    expect(run(s,set('routeObjective','support'),set('prediction','0'),{type:'test'}).complete).toBe(false);
  });
  it('requires a route goal and prediction before walking and prevents retrospective success',()=>{
    let s=run(createTraining(10),{type:'route',key:'east'},{type:'step'});expect(s.values.steps).toBe(0);
    s=run(s,set('routeObjective','dispatch'),set('prediction','0'));
    for(const key of ['east','east','east','north','north','north','north'])s=applyTraining(s,{type:'route',key});
    for(let i=0;i<8;i++)s=applyTraining(s,{type:'step'});
    expect(applyTraining(s,{type:'test'}).complete).toBe(true);
    expect(run(s,set('prediction','1'),{type:'test'}).complete).toBe(false);
    const edited=applyTraining(s,{type:'undo'});expect(edited.values.position).toBe(20);expect(edited.values.steps).toBe(0);expect(edited.inspected.filter(id=>id.startsWith('route-'))).toHaveLength(0);
  });
  it('a single downstream zero does not distinguish an upstream circuit fault',()=>{
    let s=run(createTraining(5),{type:'power'},{type:'measure',key:'fuse'},{type:'power'},{type:'repair',key:'fuse'},{type:'power'},{type:'measure',key:'lamp'},{type:'test'});
    expect(s.values.repaired).toBe(true);expect(s.complete).toBe(false);
    s=run(createTraining(5),{type:'power'},{type:'measure',key:'battery'},{type:'measure',key:'fuse'},{type:'power'},{type:'repair',key:'fuse'},{type:'power'},{type:'test'});
    expect(s.complete).toBe(false);expect(run(s,{type:'measure',key:'lamp'},{type:'test'}).complete).toBe(true);
  });
  it('invalid memory scores are rejected and historical records remain readable',()=>{
    const memory=createTraining(2);expect(validTraining({...memory,values:{...memory.values,'score-notes':5}},2)).toBe(false);
    const historical={...createTraining(4),learningVersion:undefined};expect(validTraining(historical,4)).toBe(true);
  });
  it('a disrupted revision never rewrites the original plan',()=>{
    const original=createTraining(11);const revised=run(original,{type:'disrupt'},set('revision','Inspect the manifest, restore relay, check west relay, use west passage, hand over.'),set('reason','The east route is unavailable, so verify the additional relay before committing to the west route.'),set('replacement','west-relay'),{type:'rehearse'},{type:'test'});
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




