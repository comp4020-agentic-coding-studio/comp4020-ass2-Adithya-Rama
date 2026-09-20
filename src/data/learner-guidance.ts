import type { TrainingState } from '../lib/training-engine';
import type { MissionKind, Role, Task, Zone } from '../lib/mission-engine';

export interface LabInstruction { title: string; action: string }
export interface LabGuide { goal: string; success: string; steps: LabInstruction[] }

/** Instructions describe real controls; the teaching engines decide practical completion. */
export const labGuides: Record<number, LabGuide> = {
  1: {
    goal: 'Distinguish what you observed, what somebody asserted and what you inferred; then choose a useful test of an explanation.',
    success: 'Inspect four objects, classify five statements, run a discriminating follow-up and record a conclusion bounded by the new evidence. Recall is optional.',
    steps: [
      {title:'Inspect the scene',action:'Select Inspect clock, cup, door and note. Read the findings; the instructor is not a person from the case.'},
      {title:'Distinguish the statements',action:'Classify the five sentences as visible observation, reported claim or inferred explanation. The note’s content is a claim even though the paper is visible.'},
      {title:'Investigate a competing explanation',action:'Read the question under Test an explanation. Choose a follow-up investigation, then Run selected investigation. Select a conclusion that fits its result without inventing a cause.'},
      {title:'Check and preserve the account',action:'Select Test this configuration. Correct unsupported categories or conclusions, then explain the remaining uncertainty and save the practical record. The field extension is optional.'},
    ],
  },
  2: {
    goal:'Compare unaided retrieval, location cues and a written record, then choose what the actual task needs.',
    success:'Record a covered trial for all three methods and select a context-appropriate strategy. Perfect recall is not required.',
    steps:[
      {title:'Inspect the route and items',action:'Visit all four locations with Walk to next location. Record one association per location if using cues; disclose earlier exposure to the list.'},
      {title:'Record three comparison trials',action:'Choose Retrieval method for this trial, Cover list and retrieve, enter remembered items, and select Record retrieval trial. Repeat for unaided, location cues and written notes. Notes remain visible only in that condition.'},
      {title:'Choose a method for the use',action:'Read Use context and select Which strategy suits this use? A temporary spoken account and a later audited handover do not have the same requirements.'},
      {title:'Explain the comparison',action:'Select Test this configuration and discuss scores, repeated exposure and the limits of each method. Save the experiment; no compulsory delivery or perfect-memory score is needed.'},
    ],
  },
  3: {
    goal: 'Match a connector’s direction and floor level while distinguishing rotation from lifting.',
    success: 'Both ports and the level match the published target, and your prediction identifies where the original north port moved.',
    steps: [
      { title: 'Read the target', action: 'Read Required connectors and level below. The starting ports face north and east; use the compass, not the camera angle.' },
      { title: 'Position the module', action: 'Use Rotate clockwise 90° and Raise one level. Watch the Ports and Level readouts; raising does not rotate the ports.' },
      { title: 'Track the original north port', action: 'Choose its new direction in Where did the original north connector move? Explain the rotation to yourself before checking.' },
      { title: 'Test the match', action: 'Select Test this configuration. Correct the direction or level identified in the feedback and test again.' },
    ],
  },
  4: {
    goal: 'Make the mechanism deliver the stated output by checking both its gear ratio and the conditions that let it move.',
    success: 'The output turns the required number of times in the predicted direction, with the cam, spring and interlock correctly configured.',
    steps: [
      { title: 'Predict the movement', action: 'Read the input turns, required output and cam angle below. Calculate output = driver teeth ÷ driven teeth × input turns; select the output direction.' },
      { title: 'Diagnose before correcting', action: 'Use Inspect holding brake, return spring, cam datum or gear tooth counts. Select Diagnosis of the original fault, then Record diagnosis before changing any setting.' },
      { title: 'Operate the crank', action: 'Select Turn the crank. Compare Observed output with the target. If blocked, check the support conditions before changing the gear.' },
      { title: 'Verify and diagnose', action: 'Use Test this configuration after corrections. A matching gear ratio alone is insufficient if the mechanism cannot move.' },
    ],
  },
  5: {
    goal: 'Locate the faulty component using measurements before replacing it, then prove the lamp works.',
    success: 'Your action trace includes evidence of the original fault, a replacement with power isolated, and a working lamp after power is restored.',
    steps: [
      { title: 'Choose discriminating measurements', action: 'Select Switch on and choose measurement points. A powered upstream 6 V plus adjacent downstream 0 V narrows a supply break; an isolated open continuity test can distinguish a failed component.' },
      { title: 'Isolate and diagnose', action: 'Select Isolate power. If the lamp was dark despite a 6 V supply, use Test lamp continuity. Continuity checks whether the disconnected part has a complete path.' },
      { title: 'Repair the diagnosed part', action: 'With power isolated, choose Replace for the component supported by your readings. Restore power, measure the lamp supply and check whether the lamp lights.' },
      { title: 'Verify the evidence', action: 'Select Test this configuration. If you repaired before measuring the original fault, restart this phase and preserve that measurement first.' },
    ],
  },
  6: {
    goal: 'Choose a complete archive that matches the current signed requirement, rather than simply choosing the newest file.',
    success: 'Inspect at least two copies and select the one with the section count and checksum required by the current manifest.',
    steps: [
      { title: 'Read the current manifest', action: 'Find the required section count and checksum below. A checksum is a content identifier; matching timestamps do not prove matching contents.' },
      { title: 'Compare at least two copies', action: 'Select Inspect on two or more archives. Compare the section counts, checksums and explanations shown in their cards.' },
      { title: 'Choose the supported copy', action: 'Use Which copy satisfies this manifest? Select using the current requirement; the transfer phase publishes an amendment.' },
      { title: 'Check the justification', action: 'Select Test this configuration. Use the feedback to identify the specific rule your choice satisfies or misses.' },
    ],
  },
  7: {
    goal: 'Give each role exactly its permitted actions, preserving useful access while removing inappropriate access.',
    success: 'All nine role/action combinations match the published mandate, including actions that must be denied.',
    steps: [
      { title: 'Read each role’s mandate', action: 'Read which actions observer, technician and registrar may perform. In Transfer, also read the new maintenance freeze.' },
      { title: 'Repair the permission grid', action: 'Tick Allow read, service or certify only for combinations authorised by the mandate. Untick extra permissions; do not deny everything.' },
      { title: 'Run all nine checks', action: 'Select Test this configuration. The check tests every allowed and forbidden combination, not just the most obvious defect.' },
      { title: 'Repair any remaining mismatch', action: 'Read the named mismatches in Feedback. Change the relevant checkbox and test again until all nine checks pass.' },
    ],
  },
  8: {
    goal: 'Send a precise instruction and confirm that the receiver understood the same destination, quantity and code.',
    success: 'All three fields match the analyst’s instruction and the readback is acknowledged.',
    steps: [
      { title: 'Read the analyst’s instruction', action: 'Read the destination, quantity and verification code on the Analyst card. Tell your partner those three details; solo learners can note them first.' },
      { title: 'Read the receiver’s information', action: 'Select Switch role to view the Operator card. Ask for any missing detail; do not assume the other role sees the same card.' },
      { title: 'Complete and confirm the handoff', action: 'Choose Destination and Quantity, enter the code, and read all three back. Tick the acknowledgement only after that confirmation.' },
      { title: 'Check shared understanding', action: 'Select Test this configuration. Compare any mismatch with the analyst card and repeat the readback.' },
    ],
  },
  9: {
    goal: 'Negotiate an agreement that fits the evidence, capacity and current mandate.',
    success: 'Check the records and negotiate feasible custody, verification, responsibility and timing terms; explain the costs of an alternative.',
    steps: [
      { title: 'Read the recovery mandate', action: 'Read what must be recovered and what must be preserved. The transfer phase changes the requirement for the original.' },
      { title: 'Check all three accounts', action: 'Select Check … against the record for each person. Compare the claim with the document revealed below it; confidence is not proof.' },
      { title: 'Negotiate the actual terms', action: 'Choose a proposal, custody terms, verification, continuing responsibility and timing. The published constraints permit more than one agreement; each has a cost.' },
      { title: 'Compare feasible agreements', action: 'Select Test this configuration. Revise infeasible terms, then compare a feasible alternative. Feedback states costs; explain why the recommended concession is justified.' },
    ],
  },
  10: {
    goal: 'Choose a route serving fast dispatch, a support visit or a sensor survey; test its dependencies and predicted contacts.',
    success: 'Reach dispatch with a matching contact prediction and satisfy the chosen objective: eight moves, centre support or two surveyed sensors.',
    steps: [
      { title: 'Choose an objective and plan', action: 'Select What should this route accomplish? Read its condition and the bronze sensor cells, then use Add north/east/south/west. The centre support point is row 3, column 3.' },
      { title: 'Predict contacts before moving', action: 'Enter Predicted sensor contacts. Count every entry into a marked cell, including repeated entries; a boundary move stays in place.' },
      { title: 'Run one move at a time', action: 'Select Execute next step until the route is complete. Watch Current row, Current column and Sensor contacts. Rewind returns to the start.' },
      { title: 'Compare prediction and result', action: 'Select Test this configuration. If they differ, locate the missed contact, revise your route or explanation, then rewind and rerun.' },
    ],
  },
  11: {
    goal: 'Revise a plan in response to a specific change without erasing the original reasoning.',
    success: 'Keep Version 1, rehearse a supported replacement dependency, preserve Version 2 and enact the revised route. A teacher reviews the written explanation.',
    steps: [
      { title: 'Read the preserved plan', action: 'Read Version 1 below. Identify its route, equipment and handover dependencies before revealing the change.' },
      { title: 'Reveal what changed', action: 'Select Publish the disruption. Read the new condition and identify which part of Version 1 it invalidates.' },
      { title: 'Write a usable Version 2', action: 'Enter a revised sequence and its reason. Name the changed step, who checks it, and what evidence will show that the alternative works.' },
      { title: 'Rehearse and verify the revision', action: 'Select Replacement dependency to rehearse: west relay for a passage closure, reference readings for the unavailable meter. Select Rehearse the replacement dependency, then Verify revised plan and rehearsal. Enact the verified change through Field operation above; a teacher judges the prose.' },
    ],
  },
  12: {
    goal: 'Explain a completed recovery mission using its actual decisions and evidence.',
    success: 'Attach a completed mission record and explain its objective, consequential decisions, limitation and a credible alternative.',
    steps: [
      { title: 'Complete the practical mission first', action: 'Select Enter the final recovery mission. Follow its Mission Journal through the practical tasks, resolve the trial and export its assessment record.' },
      { title: 'Return to this after-action lab', action: 'Use the completed run to state the objective your team pursued. If the objective changed, explain when and why.' },
      { title: 'Connect evidence to your account', action: 'Describe the recorded decisions and observations supporting the result. State a limitation and a credible alternative you rejected.' },
      { title: 'Review and save the account', action: 'Select Verify completed run and account. The current Operation Last Light must be complete in this passport. Close the agent handover through Field operation above, then save your explanation. The text does not replace the practical run.' },
    ],
  },
};

/** Milestones track recorded actions. They do not award marks or infer understanding. */
export function labMilestones(state: TrainingState): boolean[] {
  const v=state.values, did=(prefix:string)=>state.actions.some(a=>a.startsWith(prefix));
  const filled=(key:string)=>String(v[key]??'').trim().length>0;
  const checked=state.complete;
  switch(state.week){
    case 1:return [state.inspected.filter(id=>['clock','cup','door','note'].includes(id)).length===4,Array.from({length:5},(_,i)=>filled('classification'+i)).every(Boolean),state.inspected.some(id=>id.startsWith('investigation:'))&&filled('conclusion'),checked];
    case 2:return [state.inspected.length>=4,['unaided','loci','notes'].every(method=>typeof v['score-'+method]==='number'),filled('memoryStrategy'),checked];
    case 3:return [did('Rotated module')||did('Moved module'),did('Rotated module'),filled('prediction'),checked];
    case 4:return [filled('prediction'),Boolean(v.diagnosed),Number(v.turns)>0,checked];
    case 5:return [state.actions.filter(a=>a.startsWith('Measured ')).length>=2||did('Continuity '),did('Power isolated'),Boolean(v.repaired)&&Boolean(v.power),checked];
    case 6:return [state.inspected.length>0,state.inspected.length>=2,filled('archive'),checked];
    case 7:return [did('Set '),did('Set '),did('Policy mismatches:')||checked,checked];
    case 8:return [did('Switched to operator')||filled('destination'),did('Switched to operator'),filled('destination')&&filled('quantity')&&filled('code')&&Boolean(v.acknowledged),checked];
    case 9:return [state.inspected.length>0,state.inspected.length>=3,['proposal','custody','verification','responsibility','timing'].every(filled),checked];
    case 10:return [state.sequence.length>0&&filled('routeObjective'),filled('prediction'),Number(v.position)===4,checked];
    case 11:return [Boolean(v.disrupted),Boolean(v.disrupted),String(v.revision??'').trim().length>=30&&String(v.reason??'').trim().length>=30,checked];
    case 12:return [false,filled('objective'),String(v.evidence??'').trim().length>=30&&String(v.alternative??'').trim().length>=30,checked];
    default:return [false,false,false,false];
  }
}

export interface MissionInstruction { role:Role; zone:Zone; action:string; success:string }
export const missionGuides: Record<Task,MissionInstruction> = {
  observe:{role:'observer',zone:'arrival',action:'Inspect the inventory and source records needed for your proposed conclusion. Read findings beneath the controls. The map is needed for transport; an observation reports what a record actually shows.',success:'The required inventory and identity records have been inspected; the map is additionally needed for transport.'},
  recall:{role:'observer',zone:'arrival',action:'Read the manifest, select Hide inspection notes, then enter its three item names in order, separated by commas. Select Check recall.',success:'The three items and their order match the manifest.'},
  orient:{role:'observer',zone:'arrival',action:'Inspect the map. Use its north arrow to choose the clockwise rotation, then select Test orientation. The camera’s view does not change the map’s north.',success:'Your chosen rotation matches the supplied map.'},
  mechanism:{role:'systems',zone:'workshop',action:'Read the required output. Predict a result using output = 12 ÷ follower teeth, then choose a test of the ratio or holding condition. Use Turn input once to compare the model with observed movement.',success:'The released mechanism produces half-speed output.'},
  circuit:{role:'systems',zone:'power',action:'Select Measure supply and fuse before replacing anything. Keep the load switch open while changing the fuse, then close it and check the lamp readout.',success:'The original fault was measured and the repaired circuit powers the lamp.'},
  investigate:{role:'investigator',zone:'control',action:'Read the current signed source and both copy records. Choose the complete copy with the matching checksum, then select Verify selected archive. A later timestamp alone is insufficient.',success:'The selected archive matches the current signed source.'},
  permission:{role:'investigator',zone:'control',action:'Read the allowed role/action pairs and locate the extra permission. Select its Subject, Action and new decision, then Apply policy and run checks.',success:'The inappropriate permission is removed and legitimate access still works.'},
  handoff:{role:'coordinator',zone:'archive',action:'Tell the receiver which item, destination and condition apply. Ask the receiving role for its acceptance requirements. Set the item, destination and condition, then Send structured handoff; the relay also requires the receiver’s exact read-back code.',success:'The handoff specifies all three details without ambiguity.'},
  agreement:{role:'coordinator',zone:'archive',action:'Read the custodian’s requirement. Commit to preserving the original, name the person or role receiving the archive, and select Negotiate handling agreement.',success:'Both preservation and a named recipient are recorded.'},
  route:{role:'observer',zone:'archive',action:'Read the scenario bulletin and route dependencies. Choose a route supported by the available equipment, then Test route dependencies. A failed dependency needs another route or a repair.',success:'The chosen route is supported by the current scenario and power state.'},
  revision:{role:'coordinator',zone:'dispatch',action:'Preserve Version 1 before testing your assumptions. After investigation, enter a different Version 2 explaining the changed step, evidence and responsibility. Select Preserve this plan version again.',success:'Two distinct plans remain visible; their quality is assessed through your explanation.'},
};
export function missionGuide(task:Task,kind:MissionKind):MissionInstruction {
 const base=missionGuides[task];if(kind!=="recovery")return base;
 const overrides:Partial<Record<Task,Pick<MissionInstruction,"action"|"success">>>={
  mechanism:{action:"First ask Investigator to verify the signed archive profile. Read the required output and calculate a candidate ratio. Choose a test that distinguishes gearing from a holding condition. Physical recovery and stabilisation require this support; digital transmission does not.",success:"The tested cradle matches the currently verified archive profile."},
  investigate:{action:"Compare both copies with the current signed source. Select Verify selected archive. Give the resulting profile to Systems: it determines the cradle gearing and the evidence needed at Dispatch.",success:"The current signed copy and its recovery profile are verified."},
  handoff:{action:"Establish the verified profile and whichever equipment checks your objective requires. Ask the receiver which item, destination and condition they need, then compose the handoff. A digital approach has no cradle dependency.",success:"All three fields are precise and the handoff records the current tested archive profile."},
  route:{action:"Check the verified profile, tested cradle and matching handoff first. Read the disruption bulletin, then test an available route. Upper and lift also require restored power; equipment failure makes both unavailable.",success:"The route is tested against current equipment and the same verified profile as the handoff."},
 };
 return {...base,...overrides[task]};
}
export const missionSummaries:Record<MissionKind,{goal:string;after:string}>= {
  a1:{goal:'Investigate the scene, reconstruct its transport orientation and test a model that releases the cradle. Recall is optional; reliable notes are allowed. Then finish the trial at Dispatch.',after:'Export the trial record. Prepare your causal model, 350–500-word explanation, one failed prediction or limitation, and attribution using the assessment brief.'},
  a2:{goal:'Complete four relay tasks: diagnose the circuit, verify the archive, repair permissions and communicate a precise handoff. Then finish at Dispatch.',after:'Export the trial record. Add your evidence, before/after policy, handoff and contribution records, plus the 500–700-word joint explanation required by the brief.'},
  recovery:{goal:'Coordinate the four roles to recover Meridian’s archive. Preserve a first plan, complete the objective’s relevant practical objectives, revise your plan, then record evidence for your chosen resolution at Dispatch. The chosen objective determines which equipment is relevant. Justify omitted checks and a credible alternative; each ending needs its own receipt, custody or monitoring record.',after:'Export this run and complete a contrasting rehearsal. Assemble the two rehearsal records, final run, plan history, role agreement, 800–1,200-word team account, presentation and individual defences listed in the final brief.'},
};
