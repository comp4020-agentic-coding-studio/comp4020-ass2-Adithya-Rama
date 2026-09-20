import type { FieldOperationSpec } from '../lib/field-operation';
import type { TrainingPhase } from '../lib/training-engine';

interface LabOperation {
  title:string; objective:string; problem:string; consequence:string;
  actionLabel:string; resolveLabel:string; effect:FieldOperationSpec['effect'];
  cargoLabel:string; checkpoints:string[]; phases:Record<TrainingPhase,string>;
}
/** Assigned missions: each capability changes a specific fictional situation. */
export const labOperations:Record<number,LabOperation> = {
  1:{
    title:'Silent Gallery', objective:'Give Control a reliable account of the gallery before its recovery team enters.',
    problem:'An urgent message says the room was abandoned. Its objects establish conditions, but not who left or why. An unsupported report sends the team after the wrong lead.',
    consequence:'Control receives an evidence-labelled report and clears the investigation entrance. Unverified explanations remain unresolved.',
    actionLabel:'Transmit the verified scene report', resolveLabel:'Confirm Control received the report',
    effect:'report',cargoLabel:'Evidence-labelled scene report',checkpoints:['Control channel'],
    phases:{practice:'Inspect the 08:20 gallery and identify which statements support an entry briefing.',check:'A second room reports 09:40. Build a fresh briefing from its actual objects.',transfer:'Separate the reported power failure from the unsupported claim that the open hatch caused it.'}
  },
  2:{
    title:'The Memory Trial',objective:'Choose a reliable way to remember or record a short manifest for its actual use.',
    problem:'A temporary spoken briefing and a later audited handover need different support. Compare unaided recall, location cues and written records, including their errors and limits.',
    consequence:'Control receives the strategy comparison, including recorded errors and the proposed use of a durable record. The receipt does not certify perfect or unaided recall.',
    actionLabel:'Share the retrieval comparison',resolveLabel:'Confirm the comparison was received',
    effect:'signal',cargoLabel:'Retrieval strategy comparison',checkpoints:['Dispatch channel'],
    phases:{practice:'Encode Compass, Lantern, Coil and Archive along the four-place route.',check:'Prepare Lens, Battery, Map and Seal. Rebuild the associations.',transfer:'The order changes to Sample, Receipt, Sensor and Capsule; replace the old associations.'}
  },
  3:{
    title:'The Broken Connection',objective:'Reconnect the gallery passage by aligning a service module with the building’s connectors and level.',
    problem:'The passage is isolated because its module faces the wrong way. Raising it cannot correct a rotation, and camera direction is not map north.',
    consequence:'The aligned module completes the connection and the passage gate opens.',
    actionLabel:'Seat the aligned service module',resolveLabel:'Confirm the passage is connected',
    effect:'door',cargoLabel:'Connection verification',checkpoints:['Passage checkpoint'],
    phases:{practice:'Reconnect east/south ports on level 0.',check:'The upper connection needs south/west ports on level 1.',transfer:'A west/north connection on level 2 changes both orientation and height.'}
  },
  4:{
    title:'The Suspended Cradle',objective:'Raise a recovery cradle to its receiving platform without forcing its blocked mechanism.',
    problem:'The cradle stalls or misses its required output. Brake, return support, cam datum and gearing are possible explanations. Choose an inspection before changing its configuration.',
    consequence:'The tested mechanism drives the cradle to its receiving platform and opens the supported handover point.',
    actionLabel:'Engage the tested cradle drive',resolveLabel:'Confirm the cradle reached its platform',
    effect:'lift',cargoLabel:'Cradle commissioning record',checkpoints:['Receiving platform'],
    phases:{practice:'Produce two output turns from four driver turns with a 180° cam.',check:'The receiver needs four output turns from four input turns. Recalculate the follower.',transfer:'Six input turns must yield two output turns; the cam now belongs at 90°.'}
  },
  5:{
    title:'Bring the Beacon Back',objective:'Restore the approach beacon so the incoming recovery crew can identify the correct landing point.',
    problem:'The beacon is dark. Random replacement can conceal the fault, and supply voltage alone cannot prove that its lamp works.',
    consequence:'The measured and repaired circuit powers the approach beacon; the receiving crew acknowledges the signal.',
    actionLabel:'Connect the verified beacon circuit',resolveLabel:'Confirm the approach signal is received',
    effect:'power',cargoLabel:'Beacon verification receipt',checkpoints:['Approach receiver'],
    phases:{practice:'The beacon is dark. Choose measurements that discriminate a supply break from a failed load.',check:'A second beacon has a different original fault. Reusing the earlier replacement without evidence is insufficient.',transfer:'The third beacon may have working supply voltage but no light. Choose evidence that tests the load separately.'}
  },
  6:{
    title:'The Authentic Archive',objective:'Release the archive copy that actually satisfies the signed recovery order.',
    problem:'Three plausible files have different contents. A newer timestamp can hide an unauthorised change; an older copy can be incomplete.',
    consequence:'The selected verified copy reaches protected dispatch while the source remains in the station archive.',
    actionLabel:'Release the manifest-matched archive',resolveLabel:'Confirm the verified archive receipt',
    effect:'archive',cargoLabel:'Manifest-matched archive copy',checkpoints:['Integrity checkpoint','Archive receiver'],
    phases:{practice:'Compare at least two copies against the 24-section M-42 source manifest.',check:'Reconfirm the signed requirement; a later timestamp still does not establish integrity.',transfer:'An authorised amendment requests M-99. The previously correct copy no longer meets this deliverable.'}
  },
  7:{
    title:'The Wrong Authority',objective:'Restore useful control-desk access without giving an observer permission to service or certify equipment.',
    problem:'The damaged policy blocks legitimate work and authorises the wrong role. Closing every permission would stop the recovery too.',
    consequence:'The corrected policy is deployed: allowed actions illuminate, forbidden actions remain denied, and the authorised gate responds.',
    actionLabel:'Deploy the verified access policy',resolveLabel:'Confirm authorised control is restored',
    effect:'door',cargoLabel:'Verified access charter',checkpoints:['Authorised control checkpoint'],
    phases:{practice:'Repair all nine combinations under the original role mandate.',check:'Rerun both allowed and forbidden actions to confirm the policy.',transfer:'A maintenance freeze suspends technician service; reading and registrar certification must remain available.'}
  },
  8:{
    title:'Across the Divide',objective:'Get the correct sealed batch to its receiver through a relay where each role sees different information.',
    problem:'The sender has the manifest; the operator has dispatch controls. “Send those there” identifies neither the destination nor the batch.',
    consequence:'The relay dispatches the confirmed batch and a receiver acknowledgement closes the handoff.',
    actionLabel:'Dispatch the read-back-confirmed batch',resolveLabel:'Confirm the receiver acknowledged delivery',
    effect:'relay',cargoLabel:'Confirmed sealed batch',checkpoints:['Relay receiver'],
    phases:{practice:'Read back two units to Relay with code AMBER.',check:'Three units now belong at Archive under COPPER.',transfer:'One unit belongs at Dispatch under IVORY; neither earlier count nor destination is valid.'}
  },
  9:{
    title:'The Custodian’s Terms',objective:'Secure an agreement the custodian can honour while protecting the original and respecting the support limit.',
    problem:'Confident accounts contradict the comparison log, mandate and cart certificate. Without a feasible agreement the custodian cannot release the requested record.',
    consequence:'The custodian accepts the supported proposal and issues the appropriate custody authority.',
    actionLabel:'Present the evidence-backed agreement',resolveLabel:'Confirm the custody terms are recorded',
    effect:'custody',cargoLabel:'Authorised custody record',checkpoints:['Custodian acknowledgement'],
    phases:{practice:'Negotiate copy, stabilisation or supported-original terms, including responsibility, verification, timing and costs.',check:'A new constraint keeps the original on site today. Find more than one defensible agreement.',transfer:'Physical provenance becomes essential. Reconsider the terms and compare monitored protection with a supported-original move.'}
  },
  10:{
    title:'The Surveyed Passage',objective:'Guide the team across a published sensor grid and accurately report what its passage records.',
    problem:'An untested route can miss sensor contacts. The team needs an observed route and its limitations, not an unsupported promise of being unseen.',
    consequence:'The surveyed route reaches dispatch with its observed contact count attached.',
    actionLabel:'Commit the surveyed passage record',resolveLabel:'Confirm dispatch received the route account',
    effect:'route',cargoLabel:'Surveyed route and contact record',checkpoints:['Route receiver'],
    phases:{practice:'Choose fast dispatch, centre support or survey; plan for that objective across horizontal coverage.',check:'The strip moves to column 2; predict contacts before stepping.',transfer:'The strip moves to column 4. Rehearse the changed route and explain its contacts.'}
  },
  11:{
    title:'The Route That Failed',objective:'Keep recovery moving after a disruption while preserving the plan that depended on the old condition.',
    problem:'Version 1 no longer works. A new paragraph alone cannot reopen a passage: select and rehearse the replacement dependency before committing it.',
    consequence:'The rehearsed alternative becomes active. Version 1 remains in the journal so the reason for the change stays visible.',
    actionLabel:'Activate the rehearsed replacement plan',resolveLabel:'Confirm the revised route is in use',
    effect:'revision',cargoLabel:'Version 2 and rehearsal result',checkpoints:['Replacement dependency','Handover checkpoint'],
    phases:{practice:'The east passage closes; the west passage requires an extra relay check.',check:'Rehearse the west dependency before authorising the changed sequence.',transfer:'The live meter fails. Use supplied reference readings and retain the limitation of recorded evidence.'}
  },
  12:{
    title:'Agent’s Return',objective:'Close a completed Operation Last Light with an accurate after-action account the receiving team can use.',
    problem:'A proud recovery still needs a traceable account. A successful-looking story cannot substitute for a completed mission and its remaining limits.',
    consequence:'The completed recovery and its account enter the handover journal. The agent returns with an evidence-backed record.',
    actionLabel:'Attach the completed recovery and account',resolveLabel:'Close the agent handover',
    effect:'recovery',cargoLabel:'Recovery and after-action record',checkpoints:['Debrief receiver'],
    phases:{practice:'Complete Operation Last Light, then connect this account to the actual run.',check:'Recheck the account against the run: objective, observed decisions and alternative.',transfer:'Use a contrasting completed scenario and explain which decision changed and which limitation remained.'}
  }
};
export function labOperation(week:number,phase:TrainingPhase='practice'):FieldOperationSpec {
  const lab=labOperations[week];if(!lab)throw new Error('Unknown lab operation');
  return {id:'lab-'+String(week).padStart(2,'0')+'-'+phase,title:lab.title,
    objective:lab.objective+' '+lab.phases[phase],problem:lab.problem,consequence:lab.consequence,
    actionLabel:lab.actionLabel,resolveLabel:lab.resolveLabel,effect:lab.effect,cargoLabel:lab.cargoLabel,
    checkpoints:[...lab.checkpoints]};
}
