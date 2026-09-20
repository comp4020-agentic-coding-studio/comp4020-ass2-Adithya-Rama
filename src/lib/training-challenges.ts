import type { TrainingPhase, TrainingState } from './training-engine';

/** Supplied investigation options. The choice changes the evidence available, not an academic mark. */
export const observationInvestigations = {
  practice: {
    question:'Did the open door result from a hurried departure, or was it held for a scheduled delivery?',
    tests:[{id:'schedule',label:'Compare the door sensor record with the delivery booking',result:'The door opened at 08:12; a booked delivery started at 08:10. No departure is recorded. The booking is consistent with the open door, but does not prove who opened it.'},{id:'colour',label:'Measure the cup colour again',result:'The cup is blue. This confirms an existing observation and cannot distinguish the two explanations.'}],
    useful:'schedule',conclusions:[{id:'delivery-possible',label:'A scheduled delivery is a credible alternative; the person and motive remain unknown.'},{id:'hurried-proved',label:'The records prove someone departed in a hurry.'}],supported:'delivery-possible',
  },
  check: {
    question:'Does a closed door mean the sample was deliberately concealed, or is a routine inspection another explanation?',
    tests:[{id:'cup',label:'Inspect the amber cup again',result:'The cup is still on the shelf. Its position does not distinguish concealment from inspection.'},{id:'access-log',label:'Compare the signed inspection entry with the door log',result:'A routine inspection was logged before the door closed. No sample condition measurement is supplied. Routine inspection remains plausible; intactness and intent are unresolved.'}],
    useful:'access-log',conclusions:[{id:'intact-proved',label:'The sample is proved intact because the note says so.'},{id:'inspection-possible',label:'Routine inspection is plausible; sample condition and intent need further evidence.'}],supported:'inspection-possible',
  },
  transfer: {
    question:'Did opening the service hatch cause the reported outage, or did the outage precede maintenance?',
    tests:[{id:'order',label:'Compare the outage timestamp with the hatch opening record',result:'The supply monitor records loss at 14:02. The hatch sensor records opening at 14:07. Opening the hatch cannot explain the earlier loss in this model; the actual fault is still unknown.'},{id:'map',label:'Reread the map title',result:'The map names this service bay. It supplies no timing or causal evidence about the outage.'}],
    useful:'order',conclusions:[{id:'hatch-cause',label:'The open hatch must have caused the earlier outage.'},{id:'earlier-outage',label:'The outage preceded the opening; investigate another cause without assuming which one.'}],supported:'earlier-outage',
  },
} satisfies Record<TrainingPhase,{question:string;tests:{id:string;label:string;result:string}[];useful:string;conclusions:{id:string;label:string}[];supported:string}>;

export const memoryMethods=['unaided','loci','notes'] as const;
export const memoryContexts:Record<TrainingPhase,string>={practice:'You must give a short spoken briefing while your hands are occupied. The printed record remains with the receiver for checking.',check:'A handover will be audited tomorrow. Exact item order must be available to someone who was absent today.',transfer:'The receiver cannot open the written record during a brief equipment outage, but must reconcile the account with it afterwards.'};
export function memoryStrategyFits(phase:TrainingPhase,strategy:unknown){return phase==='check'?strategy==='notes':phase==='practice'?strategy==='loci'||strategy==='combined':strategy==='combined';}
export function mechanismFault(phase:TrainingPhase){return phase==='practice'?'interlock':phase==='check'?'ratio':'spring';}
export function circuitEvidenceSupports(state:TrainingState,part:string):boolean {
  const beforeRepair=state.actions.slice(0,state.actions.findIndex(a=>a.startsWith('Replaced failed '))<0?undefined:state.actions.findIndex(a=>a.startsWith('Replaced failed ')));
  if(beforeRepair.includes('Continuity '+part+': open (isolated)'))return true;
  const upstream=part==='fuse'?'battery':part==='cable'?'fuse':null;
  return Boolean(upstream&&beforeRepair.includes('Measured '+upstream+': 6 V (power on)')&&beforeRepair.includes('Measured '+part+': 0 V (power on)'));
}
export interface AgreementResult { feasible:boolean; reasons:string[]; cost:string }
export function evaluateAgreement(state:TrainingState):AgreementResult {
  const v=state.values,reasons:string[]=[];
  const proposal=String(v.proposal??'');
  if(!['copy','stabilise','supported-original'].includes(proposal))reasons.push('Choose a copy, monitored stabilisation, or supported-original agreement; an unsupported cart cannot carry 11 units.');
  if(v.custody!=='recorded')reasons.push('The custodian needs a named, recorded custody arrangement.');
  if(v.verification!=='independent')reasons.push('Both parties require a comparison with the authoritative record; a confident statement alone is insufficient.');
  if(proposal==='copy'&&v.responsibility!=='receiver')reasons.push('A copy handover needs a receiver responsible for receipt verification.');
  if(proposal==='stabilise'&&v.responsibility!=='monitor')reasons.push('Deferral needs someone assigned to monitor the original and arrange the next review.');
  if(proposal==='supported-original'&&v.responsibility!=='escort')reasons.push('Moving the original needs its custodian escort and the certified support crew.');
  if(proposal==='copy'&&v.timing!=='now')reasons.push('The copy can meet the immediate service request; specify receipt in this shift.');
  if(proposal==='stabilise'&&v.timing!=='review')reasons.push('Stabilisation needs a scheduled review rather than an indefinite promise.');
  if(proposal==='supported-original'&&v.timing!=='support')reasons.push('The support crew arrives next shift; moving the original now exceeds the cart limit.');
  if(state.phase==='check'&&proposal==='supported-original')reasons.push('The check mandate requires the original to remain on site today; negotiate a copy or monitored deferral.');
  if(state.phase==='transfer'&&proposal==='copy')reasons.push('The transfer mandate requires original provenance; a digital copy alone does not meet it.');
  const costs:Record<string,string>={copy:'Service resumes this shift, but physical provenance is not transferred. The custodian retains the original.',stabilise:'The original remains protected, but service is delayed until review. Monitoring uses one crew role.', 'supported-original':'Original provenance travels with its custodian, but the operation waits for certified support and occupies the support crew.'};
  return {feasible:reasons.length===0,reasons,cost:costs[proposal]??'No feasible arrangement recorded.'};
}
export const routeObjectives=[{id:'dispatch',label:'Fast dispatch: arrive within eight moves; contacts may be reported.'},{id:'support',label:'Support route: visit the centre service point (row 3, column 3), then dispatch.'},{id:'survey',label:'Survey: visit at least two distinct sensor cells, then dispatch.'}];
export function routeObjectiveSatisfied(state:TrainingState){
  if(state.values.routeObjective==='dispatch')return Number(state.values.steps)<=8;
  if(state.values.routeObjective==='support')return state.inspected.includes('route-cell-12');
  if(state.values.routeObjective==='survey')return state.inspected.filter(s=>s.startsWith('route-sensor-')).length>=2;
  return false;
}