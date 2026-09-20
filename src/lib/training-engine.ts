import { labOperation } from '../data/lab-operations';
import { createFieldOperation, applyFieldOperation, validFieldOperation, type FieldOperationState, type FieldOperationAction } from './field-operation';
/** Authored teaching models shared by spatial and HTML presentations. */
export type TrainingPhase = 'practice' | 'check' | 'transfer';
export type Value = string | number | boolean;
export interface TrainingState {
  week: number; phase: TrainingPhase; values: Record<string, Value>; sequence: string[];
  inspected: string[]; actions: string[]; feedback: string; complete: boolean;
  /** Domain completion and enacted mission completion are intentionally separate. */
  field?: FieldOperationState;
}
export interface TrainingAction { type: string; key?: string; value?: Value }
export const phases: TrainingPhase[] = ['practice', 'check', 'transfer'];
export const loci = ['Atrium', 'Fountain', 'Workshop', 'Observatory'];
export const memoryItems: Record<TrainingPhase, string[]> = {
  practice: ['Compass', 'Lantern', 'Coil', 'Archive'], check: ['Lens', 'Battery', 'Map', 'Seal'],
  transfer: ['Sample', 'Receipt', 'Sensor', 'Capsule'],
};
export const observationFacts: Record<TrainingPhase, {id:string; label:string; category:'observation'|'claim'|'inference'}[]> = {
  practice: [
    {id:'clock',label:'The clock reads 08:20.',category:'observation'}, {id:'cup',label:'A blue cup lies beside the ledger.',category:'observation'},
    {id:'door',label:'The door is open.',category:'observation'}, {id:'note',label:'A note says “I left first”.',category:'claim'},
    {id:'rush',label:'The owner left in a hurry.',category:'inference'},
  ],
  check: [
    {id:'clock',label:'The clock reads 09:40.',category:'observation'}, {id:'cup',label:'An amber cup stands on the shelf.',category:'observation'},
    {id:'door',label:'The door is closed.',category:'observation'}, {id:'note',label:'A note says “The sample is intact”.',category:'claim'},
    {id:'rush',label:'Someone deliberately concealed the sample.',category:'inference'},
  ],
  transfer: [
    {id:'clock',label:'The display reads 14:10.',category:'observation'}, {id:'cup',label:'A silver flask stands beside a map.',category:'observation'},
    {id:'door',label:'The service hatch is open.',category:'observation'}, {id:'note',label:'The operator reports a power failure.',category:'claim'},
    {id:'rush',label:'The open hatch caused the power failure.',category:'inference'},
  ],
};
export const archiveFiles = [
  {id:'A',name:'Archive A',time:'10:10',parts:24,hash:'M-42',body:'24 sections; checksum M-42 matches the signed source manifest. Read-only source copy.'},
  {id:'B',name:'Archive B',time:'10:35',parts:24,hash:'M-99',body:'24 sections; checksum M-99 differs from source. A later annotation changed the contents.'},
  {id:'C',name:'Archive C',time:'10:05',parts:23,hash:'M-17',body:'23 sections; copy ended before the final section. An earlier timestamp is not proof of completeness.'},
];
export const policyRoles = ['observer','technician','registrar'] as const;
export const policyActions = ['read','service','certify'] as const;
export function permissionExpected(role:string, action:string):boolean {
  return action==='read'||(role==='technician'&&action==='service')||(role==='registrar'&&action==='certify');
}
export const councilClaims = [
  {id:'operator',speaker:'Operator Neri',claim:'Every archive copy is identical.',record:'The comparison log records A = M-42 and B = M-99. Identical section counts do not settle identical content.'},
  {id:'custodian',speaker:'Custodian Pell',claim:'A verified copy may leave if its custody is recorded.',record:'Mandate 4 permits verified recovery with a signed handover. It does not require the custodian to surrender the original.'},
  {id:'engineer',speaker:'Engineer Sen',claim:'The cart can carry the original without support.',record:'Cart certificate: 8 units. Original archive: 11 units; a stabilising cradle raises supported capacity to 12.'},
];
export const initialPlan = ['Inspect manifest','Restore relay','Use east passage','Record handover'];
export function createTraining(week:number, phase:TrainingPhase='practice'):TrainingState {
  if(!Number.isInteger(week)||week<1||week>12||!phases.includes(phase))throw new Error('Unknown training scenario');
  const values:Record<string,Value>={};
  if(week===1)values.covered=false;
  if(week===2){values.covered=false;loci.forEach((_,i)=>values['locus'+i]='');}
  if(week===3){values.rotation=0;values.level=0;values.prediction='';}
  if(week===4){values.gear=24;values.cam=0;values.spring=false;values.interlock=true;values.turns=0;values.prediction='';}
  if(week===5){values.power=false;values.fault=phase==='practice'?'fuse':phase==='check'?'cable':'lamp';values.repaired=false;values.meter='No measurement yet';}
  if(week===6)values.archive='';
  if(week===7)for(const role of policyRoles)for(const action of policyActions)values[role+':'+action]=action==='read'||role==='observer';
  if(week===8){values.role='analyst';values.destination='';values.quantity='';values.code='';values.acknowledged=false;}
  if(week===9){values.role='mediator';values.proposal='';}
  if(week===10){values.position=20;values.detected=0;values.steps=0;values.prediction='';}
  if(week===11){values.disrupted=false;values.original=initialPlan.join(' → ');values.revision='';values.reason='';values.replacement='';values.dependencyChecked=false;}
  if(week===12){values.objective='';values.evidence='';values.alternative='';}
  return {week,phase,values,sequence:[],inspected:[],actions:[],feedback:'Inspect the supplied rules, then try the controls. Practice can be repeated without a time limit.',complete:false,field:createFieldOperation(labOperation(week,phase))};
}
export function mechanismConfig(phase:TrainingPhase) {
  return {driver:12,inputTurns:phase==='transfer'?6:4,targetTurns:phase==='check'?4:2,cam:phase==='transfer'?90:180};
}
export function mechanismResult(state:TrainingState) {
  const c=mechanismConfig(state.phase);const output=c.driver/Number(state.values.gear)*c.inputTurns;
  const moving=!state.values.interlock&&state.values.spring&&Number(state.values.cam)===c.cam;
  return {output, moving:Boolean(moving),direction:'opposite',matches:Math.abs(output-c.targetTurns)<0.001};
}
export function circuitReading(state:TrainingState,node:string):number {
  if(node==='battery')return 6;
  if(!state.values.power)return 0;
  const order=['fuse','cable','lamp'];const fault=state.values.repaired?'':String(state.values.fault);
  const index=order.indexOf(node);return index<0?0:order.slice(0,index+1).filter(part=>part!=='lamp').includes(fault)?0:6;
}
export function rotatedPorts(rotation:number):string[] {
  const directions=['north','east','south','west'];const offset=((rotation/90)%4+4)%4;
  return [directions[offset]!,directions[(offset+1)%4]!];
}
export function spatialTarget(phase:TrainingPhase){return phase==='practice'?{rotation:90,level:0}:phase==='check'?{rotation:180,level:1}:{rotation:270,level:2};}
export function handoffTarget(phase:TrainingPhase){return phase==='practice'?{destination:'Relay',quantity:'2',code:'AMBER'}:phase==='check'?{destination:'Archive',quantity:'3',code:'COPPER'}:{destination:'Dispatch',quantity:'1',code:'IVORY'};}
export function sensorCells(phase:TrainingPhase):number[]{return phase==='practice'?[10,11,12,13]:phase==='check'?[6,11,16,21]:[8,13,18,23];}
export function applyTraining(previous:TrainingState,action:TrainingAction,context:{recoveryComplete?:boolean}={}):TrainingState {
  const s:TrainingState={...previous,values:{...previous.values},sequence:[...previous.sequence],inspected:[...previous.inspected],actions:[...previous.actions]};
  const {week,phase}=s;const v=s.values;
  const fieldSpec=labOperation(week,phase);
  const invalidate=()=>{s.complete=false;if(s.field)s.field=applyFieldOperation(fieldSpec,s.field,{type:'proof',verified:false}).state;};
  if(!['inspect','cover','role','test','crank'].includes(action.type))invalidate();
  const log=(line:string)=>{const bounded=line.slice(0,600); const match=bounded.match(/^Set ([^=]+) = /); if(match&&s.actions.at(-1)?.startsWith('Set '+match[1]+' = '))s.actions[s.actions.length-1]=bounded;else s.actions.push(bounded);if(s.actions.length>160)s.actions.shift();};
  const see=(id:string)=>{if(!s.inspected.includes(id))s.inspected.push(id);};
  const finish=(ok:boolean,yes:string,no:string)=>{
    s.complete=ok;s.field=applyFieldOperation(fieldSpec,s.field??createFieldOperation(fieldSpec),{type:'proof',verified:ok}).state;
    s.feedback=(ok?yes:no)+(ok?' Skill verified. Return to the mission actions: apply the result and confirm its consequence.':'');log(s.feedback);
  };
  if(action.type==='set'&&action.key&&typeof action.value!=='undefined'){
    const allowed=/^(classification\d|recall\d|locus\d|association\d|prediction|archive|destination|quantity|code|acknowledged|role|proposal|revision|reason|objective|evidence|alternative|replacement|observer:(read|service|certify)|technician:(read|service|certify)|registrar:(read|service|certify))$/;
    if(!allowed.test(action.key))return previous;
    if(week===11&&action.key==='replacement')v.dependencyChecked=false;
    v[action.key]=typeof action.value==='string'?action.value.slice(0,4000):action.value;s.complete=false;log('Set '+action.key+' = '+String(v[action.key]));return s;
  }
  if(week===1){
    if(action.type==='inspect'){const facts=observationFacts[phase];const id=action.key??facts[s.actions.filter(a=>a.startsWith('Inspected ')).length%facts.length]!.id;const fact=facts.find(f=>f.id===id);if(fact){see(id);s.feedback=fact.label;log('Inspected '+fact.label);}}
    if(action.type==='cover'){v.covered=!v.covered;log(v.covered?'Covered scene for recall':'Reopened scene');}
    if(action.type==='test'){const correct=observationFacts[phase].filter((f,i)=>v['classification'+i]===f.category).length;finish(['clock','cup','door','note'].every(id=>s.inspected.includes(id))&&s.actions.some(a=>a.startsWith('Covered scene'))&&correct===5&&v.recall0===(phase==='practice'?'08:20':phase==='check'?'09:40':'14:10'),'All five statements distinguished and the display recalled. A note is evidence that a claim was made; its contents still need checking.',correct+'/5 statement categories agree with the supplied scene. Inspect all four objects and cover the scene for a recall attempt. Recheck whether a sentence reports a visible fact, someone’s account, or your explanation. Check the recalled display separately.');}
  }
  if(week===2){
    if(action.type==='inspect'){const i=s.actions.filter(a=>a.startsWith('Visited ')).length%4;see(loci[i]!);s.feedback=loci[i]+': associate '+memoryItems[phase][i]+' with a vivid image here. Your image can be unusual, but keep the route fixed.';log('Visited '+loci[i]);}
    if(action.type==='cover'){v.covered=!v.covered;log(v.covered?'Entered recall without item list':'Reopened encoding list');}
    if(action.type==='test'){const correct=memoryItems[phase].filter((item,i)=>String(v['recall'+i]??'').trim().toLowerCase()===item.toLowerCase()).length;finish(loci.every(place=>s.inspected.includes(place))&&s.actions.some(a=>a.startsWith('Entered recall'))&&correct===4,'All four items retrieved in order. Compare with your earlier attempt; this demonstrates this retrieval task, not photographic memory.',correct+'/4 items retrieved in the correct locations. Visit all four route locations and cover the list before recalling. Revisit the association at each missing location, then cover the list and try again.');}
  }
  if(week===3){
    if(action.type==='rotate'){v.rotation=(Number(v.rotation)+90)%360;log('Rotated module to '+v.rotation+'°');}
    if(action.type==='level'){v.level=(Number(v.level)+1)%3;log('Moved module to level '+v.level);}
    if(action.type==='test'){const t=spatialTarget(phase);finish(v.rotation===t.rotation&&v.level===t.level&&v.prediction==='north becomes '+rotatedPorts(t.rotation)[0],'Both connector directions and floor level match. Rotation changed orientation; translation changed location without changing the module.','Current ports: '+rotatedPorts(Number(v.rotation)).join(' and ')+'; level '+v.level+'. Match the target pair and level, then state where the original north port moved.');}
  }
  if(week===4){
    if(action.type==='gear'){v.gear=Number(v.gear)===12?24:Number(v.gear)===24?36:12;v.turns=0;log('Installed '+v.gear+'-tooth driven gear');}
    if(action.type==='interlock'){v.interlock=!v.interlock;log('Interlock '+(v.interlock?'engaged':'disengaged'));}
    if(action.type==='spring'){v.spring=!v.spring;log('Return spring '+(v.spring?'attached':'detached'));}
    if(action.type==='cam'){if(v.interlock){s.feedback='The engaged interlock physically blocks the cam. Release the interlock before positioning it.';log(s.feedback);}else{v.cam=(Number(v.cam)+90)%360;log('Cam set to '+v.cam+'°');}}
    if(action.type==='crank'||action.type==='test'){const r=mechanismResult(s);if(r.moving)v.turns=r.output;finish(r.moving&&r.matches&&v.prediction==='opposite','The output turns '+r.output+' times opposite the driver. Gear teeth determine the ratio; the spring, cam and released interlock determine whether the mechanism can move.',!r.moving?'The mechanism is blocked. Inspect the interlock, return spring and cam position; changing the gear cannot remove a physical obstruction.':'It moves '+r.output.toFixed(2)+' output turns. Compare the target with driver teeth ÷ driven teeth × input turns, and predict the direction.');}
  }
  if(week===5){
    if(action.type==='power'){v.power=!v.power;log('Power '+(v.power?'on':'isolated'));}
    if(action.type==='measure'){const node=action.key??['battery','fuse','cable','lamp'][s.actions.filter(a=>a.startsWith('Measured ')).length%4]!;see(node);const reading=circuitReading(s,node);v.meter=node+': '+reading+' V';s.feedback=String(v.meter)+'. Measure relative to the common return. A zero reading with power off does not identify a fault.';log('Measured '+v.meter+(v.power?' (power on)':' (isolated)'));}
    if(action.type==='continuity'){const part=action.key??'lamp';if(v.power){s.feedback='Isolate power before a continuity test. No resistance test was made.';log(s.feedback);}else{const open=!v.repaired&&part===v.fault;v.meter=part+': '+(open?'open circuit':'continuous');s.feedback=String(v.meter)+'. Continuity tests a disconnected component, separately from its supply voltage.';log('Continuity '+part+': '+(open?'open':'continuous')+' (isolated)');}}
    if(action.type==='repair'){const part=action.key;if(v.power){s.feedback='Isolate power before changing a component. No repair was made.';log(s.feedback);}else if(part===v.fault){v.repaired=true;log('Replaced failed '+part);s.feedback='Replacement installed. Restore power and measure the lamp supply to verify the whole circuit.';}else{log('Inspected/replaced working '+part);s.feedback='That component was not the open circuit. Use consecutive measurements to isolate where voltage first disappears.';}}
    if(action.type==='test'){const verified=circuitReading(s,'lamp')===6&&v.repaired===true;const diagnosed=s.actions.some(a=>(a.startsWith('Measured '+v.fault+': 0 V')&&a.includes('(power on)'))||a==='Continuity '+v.fault+': open (isolated)');finish(verified&&diagnosed,'The open circuit was located by measurement, replaced with power isolated, and verified with both 6 V at the lamp supply and a lit lamp. Supply voltage alone does not prove that the load works.',verified?'The lamp receives 6 V, but your trace lacks a powered measurement locating the original fault. Retry the scenario and diagnose before replacing.':'The lamp is not verified as working. Compare supply readings; if the dark lamp has 6 V, isolate power and test the lamp’s continuity.');}
  }
  if(week===6){
    if(action.type==='inspect'){const file=archiveFiles.find(f=>f.id===(action.key??archiveFiles[s.actions.filter(a=>a.startsWith('Inspected Archive')).length%3]!.id));if(file){see(file.id);s.feedback=file.name+': '+file.body;log('Inspected '+file.name+' '+file.time+' '+file.hash);}}
    if(action.type==='test'){const correct=phase==='transfer'?'B':'A';finish(v.archive===correct&&s.inspected.length>=2,phase==='transfer'?'You selected B because the amended signed manifest identifies M-99. A previously correct answer should change when the authoritative requirement changes.':'You selected A using completeness and the signed manifest. B is newer but modified; C is incomplete. Timestamp alone cannot establish integrity.',phase==='transfer'?'Inspect the amended manifest: the authorised deliverable is now the annotated copy M-99. Compare at least two versions.':'Compare at least two copies against the signed manifest: 24 sections, M-42. The latest timestamp is not a verification rule.');}
  }
  if(week===7){
    if(action.type==='test'){const wrong:string[]=[];for(const role of policyRoles)for(const a of policyActions){const expected=permissionExpected(role,a)&&(phase!=='transfer'||!(role==='technician'&&a==='service'));if(Boolean(v[role+':'+a])!==expected)wrong.push(role+' / '+a);}finish(wrong.length===0,'All nine policy checks pass, including allowed and forbidden actions. Retest both after changing a permission; denying every action would also fail the published requirements.','Policy mismatches: '+wrong.join(', ')+'. Match each role to its mandate, then rerun all nine checks.');}
  }
  if(week===8){
    if(action.type==='role'){v.role=v.role==='analyst'?'operator':'analyst';s.feedback='Now viewing '+v.role+' information. Read back an explicit destination, count and verification code; do not assume the other role can see your card.';log('Switched to '+v.role);}
    if(action.type==='test'){const target=handoffTarget(phase);finish(v.destination===target.destination&&v.quantity===target.quantity&&String(v.code).trim().toUpperCase()===target.code&&v.acknowledged===true,'The operator read back the destination, quantity and verification code. Both parties now share the same actionable instruction.','The handoff is incomplete or ambiguous. Confirm the named destination, exact quantity, verification code and acknowledgement against the analyst card.');}
  }
  if(week===9){
    if(action.type==='inspect'){const claim=councilClaims.find(c=>c.id===(action.key??councilClaims[s.actions.filter(a=>a.startsWith('Verified claim')).length%3]!.id));if(claim){see(claim.id);s.feedback=claim.speaker+': '+claim.record;log('Verified claim from '+claim.speaker);}}
    if(action.type==='test'){const correct=phase==='transfer'?'stabilise':'copy';finish(v.proposal===correct&&s.inspected.length>=3,phase==='transfer'?'The new authenticity mandate requires retaining the original; stabilising it for supported handover satisfies that constraint. The earlier copy agreement cannot simply be reused.':'Verified-copy recovery satisfies the mandate and preserves the custodian’s original. You checked claims against records, without pretending body language proved honesty.','Inspect all three records and choose a proposal that fits the current mandate and capacity. A confident claim does not override the written constraint.');}
  }
  if(week===10){
    if(action.type==='route'&&action.key){if(s.sequence.length<24)s.sequence.push(action.key);log('Planned '+action.key);}
    if(action.type==='undo'){s.sequence.pop();log('Removed final route step');}
    if(action.type==='step'){const index=Number(v.steps),move=s.sequence[index];if(!move){s.feedback='Add a route before stepping. The start is row 5, column 1; the destination is row 1, column 5.';return s;}const pos=Number(v.position),r=Math.floor(pos/5),c=pos%5;let next=pos;if(move==='north'&&r>0)next-=5;if(move==='south'&&r<4)next+=5;if(move==='east'&&c<4)next++;if(move==='west'&&c>0)next--;v.position=next;v.steps=index+1;if(next!==pos&&sensorCells(phase).includes(next))v.detected=Number(v.detected)+1;log('Step '+move+' to cell '+(next+1));s.feedback='Position row '+(Math.floor(next/5)+1)+', column '+(next%5+1)+'. Recorded sensor contacts: '+v.detected+'.';}
    if(action.type==='rewind'){v.position=20;v.steps=0;v.detected=0;log('Rewound route to start');}
    if(action.type==='test'){finish(v.position===4&&String(v.detected)===String(v.prediction),'You reached dispatch and your predicted sensor contacts match the observed run. A contact is a game event to explain, not an automatic academic penalty.','Reach row 1, column 5 and compare the number of contacts with your prediction. Visible bronze cells detect entry; walls stop movement. You may rewind and revise.');}
  }
  if(week===11){
    if(action.type==='disrupt'){v.disrupted=true;s.feedback=phase==='transfer'?'The meter is unavailable. Use the supplied reference readings and isolate uncertainty before choosing equipment.':'The east passage is unavailable. The west passage remains open, but requires an additional relay check.';log('Published disruption; original plan preserved');}
    if(action.type==='rehearse'){
      const target=phase==='transfer'?'reference-readings':'west-relay';
      v.dependencyChecked=Boolean(v.disrupted)&&v.replacement===target;
      s.feedback=v.dependencyChecked?(phase==='transfer'?'The reference trace identifies an open cable. The alternative can proceed with recorded evidence; live meter confirmation remains unavailable.':'The west relay responds. The replacement passage is supported; the east passage stays closed.'):'That replacement still depends on unavailable equipment or ignores the added relay check. Compare it with the published disruption.';
      log('Rehearsed replacement: '+s.feedback);
    }
    if(action.type==='test'){finish(Boolean(v.disrupted)&&Boolean(v.dependencyChecked)&&v.replacement===(phase==='transfer'?'reference-readings':'west-relay')&&String(v.revision).trim().length>=30&&String(v.reason).trim().length>=30,
      'The replacement dependency was rehearsed and both plan records exist. Their written reasoning still needs human review; this check does not grade prose.',
      'Reveal the disruption, select a supported replacement, rehearse its dependency and record Version 2 with its reason. Version 1 stays unchanged.');}
  }
  if(week===12&&action.type==='test')finish(context.recoveryComplete===true&&String(v.objective).trim().length>=12&&String(v.evidence).trim().length>=30&&String(v.alternative).trim().length>=30,'Your after-action account is ready to export alongside the mission run. Compare this account with the recorded actions; the narrative alone does not establish mission completion.','Complete the current Operation Last Light recovery first, then record its objective, evidence and a credible alternative. Text alone cannot satisfy this practical requirement.');
  return s;
}
export function validTraining(value:unknown,week:number):value is TrainingState {
  if(!value||typeof value!=='object')return false;const s=value as TrainingState;
  if(s.week!==week||!phases.includes(s.phase)||typeof s.complete!=='boolean'||typeof s.feedback!=='string'||s.feedback.length>=8000
    ||!s.values||typeof s.values!=='object'||Array.isArray(s.values)||Object.keys(s.values).length>=100
    ||![s.sequence,s.inspected,s.actions].every(list=>Array.isArray(list)&&list.length<=160&&list.every(v=>typeof v==='string'&&v.length<8000)))return false;
  const base=createTraining(week,s.phase).values;
  if(Object.entries(base).some(([key,v])=>!(s.field===undefined&&week===11&&['replacement','dependencyChecked'].includes(key))&&typeof s.values[key]!==typeof v))return false;
  if(Object.values(s.values).some(v=>!['string','number','boolean'].includes(typeof v)||(typeof v==='string'&&v.length>4000)||(typeof v==='number'&&!Number.isFinite(v))))return false;
  if(week===3&&(![0,90,180,270].includes(Number(s.values.rotation))||![0,1,2].includes(Number(s.values.level))))return false;
  if(week===4&&(![12,24,36].includes(Number(s.values.gear))||![0,90,180,270].includes(Number(s.values.cam))||Number(s.values.turns)<0||Number(s.values.turns)>6))return false;
  if(week===5&&s.values.fault!==base.fault)return false;
  if(week===10&&(!Number.isInteger(s.values.position)||Number(s.values.position)<0||Number(s.values.position)>24||!Number.isInteger(s.values.steps)||Number(s.values.steps)<0||Number(s.values.steps)>24||!Number.isInteger(s.values.detected)||Number(s.values.detected)<0||Number(s.values.detected)>24||s.sequence.some(d=>!['north','east','south','west'].includes(d))))return false;
  if(s.field!==undefined&&(!validFieldOperation(s.field,labOperation(week,s.phase))||s.field.verified!==s.complete))return false;
  if(week===11&&s.values.original!==initialPlan.join(' → '))return false;
  if(s.field?.verified&&week<12&&!applyTraining({...s,field:undefined},{type:'test'}).complete)return false;
  return true;
}





/** Only the domain engine may grant proof. Scene or HTML actions cannot bypass it. */
export function applyTrainingField(previous:TrainingState,action:FieldOperationAction):TrainingState {
  if(action.type==='proof')return previous;
  const spec=labOperation(previous.week,previous.phase);
  let field=previous.field??createFieldOperation(spec);
  if(field.verified!==previous.complete)field=applyFieldOperation(spec,field,{type:'proof',verified:previous.complete}).state;
  const result=applyFieldOperation(spec,field,action);
  return {...previous,field:result.state,feedback:result.message,actions:[...previous.actions,'Mission: '+result.message].slice(-160)};
}
export function trainingMissionComplete(state:TrainingState):boolean {
  return state.complete&&state.field?.delivered===true;
}
