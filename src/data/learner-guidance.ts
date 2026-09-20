import type { TrainingState } from '../lib/training-engine';
import type { MissionKind, Role, Task, Zone } from '../lib/mission-engine';

export interface LabInstruction { title: string; action: string }
export interface LabGuide { goal: string; success: string; steps: LabInstruction[] }

/** Instructions describe real controls; the teaching engines decide practical completion. */
export const labGuides: Record<number, LabGuide> = {
  1: {
    goal: 'Report what the room shows, remember its display, and separate a visible fact from a reported claim or an explanation.',
    success: 'Recall the display and classify all five statements correctly, then record what confused you or changed your answer.',
    steps: [
      { title: 'Look at all four objects', action: 'Select each Inspect button. Read its finding in Feedback below; remember the display reading and object positions. Inspect means examine, not repair.' },
      { title: 'Hide the scene and remember', action: 'Select Cover scene and recall. Enter the display reading as HH:MM. Reopen the scene if needed; mention that support in your record.' },
      { title: 'Classify all five statements', action: 'Choose Observed fact for a directly visible detail, Someone’s claim for the content of a report, and An inferred explanation for a proposed cause.' },
      { title: 'Check your account', action: 'Select Test this configuration. Read the explanation; revise a category or the recalled time if needed, then test again.' },
    ],
  },
  2: {
    goal: 'Use four familiar locations as cues to retrieve four items in a fixed order.',
    success: 'Retrieve the four item names at the correct locations; explain which association helped or failed.',
    steps: [
      { title: 'Make four memory cues', action: 'Read the route. In each Your association field, imagine the named item doing something distinctive at that location.' },
      { title: 'Walk the route in order', action: 'Select Walk to next location four times. Picture your association at each place instead of repeatedly reading the item list.' },
      { title: 'Hide the list and retrieve', action: 'Select Cover list and retrieve. Enter the item remembered at each of the four locations.' },
      { title: 'Compare recall with the list', action: 'Select Test this configuration. If an item is missing, review its association, cover the list again and retry.' },
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
      { title: 'Set up the mechanism', action: 'Choose a driven gear. Release interlock before rotating the cam to the required angle, then attach the return spring.' },
      { title: 'Operate the crank', action: 'Select Turn the crank. Compare Observed output with the target. If blocked, check the support conditions before changing the gear.' },
      { title: 'Verify and diagnose', action: 'Use Test this configuration after corrections. A matching gear ratio alone is insufficient if the mechanism cannot move.' },
    ],
  },
  5: {
    goal: 'Locate the faulty component using measurements before replacing it, then prove the lamp works.',
    success: 'Your action trace includes evidence of the original fault, a replacement with power isolated, and a working lamp after power is restored.',
    steps: [
      { title: 'Measure before replacing', action: 'Select Switch on, then Measure battery, fuse, cable and lamp. Read the meter after each measurement and find where voltage first disappears.' },
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
    success: 'Check all three people’s statements against their records and choose an agreement that satisfies the current requirement.',
    steps: [
      { title: 'Read the recovery mandate', action: 'Read what must be recovered and what must be preserved. The transfer phase changes the requirement for the original.' },
      { title: 'Check all three accounts', action: 'Select Check … against the record for each person. Compare the claim with the document revealed below it; confidence is not proof.' },
      { title: 'Propose an agreement', action: 'Choose a proposal that meets the mandate and carrying-capacity constraint. Consider which alternative fails and why.' },
      { title: 'Test the agreement', action: 'Select Test this configuration. Use the explanation to check the exact constraint your proposal satisfies or violates.' },
    ],
  },
  10: {
    goal: 'Predict what a published sensor model will record along a route, then compare the prediction with an actual run.',
    success: 'Reach row 1, column 5 and correctly predict the recorded number of entries into sensor cells.',
    steps: [
      { title: 'Plan a route', action: 'Read the bronze sensor cells. Use Add north/east/south/west to build a route from row 5, column 1 to row 1, column 5; Undo final step corrects the plan.' },
      { title: 'Predict contacts before moving', action: 'Enter Predicted sensor contacts. Count every entry into a marked cell, including repeated entries; a boundary move stays in place.' },
      { title: 'Run one move at a time', action: 'Select Execute next step until the route is complete. Watch Current row, Current column and Sensor contacts. Rewind returns to the start.' },
      { title: 'Compare prediction and result', action: 'Select Test this configuration. If they differ, locate the missed contact, revise your route or explanation, then rewind and rerun.' },
    ],
  },
  11: {
    goal: 'Revise a plan in response to a specific change without erasing the original reasoning.',
    success: 'Keep Version 1, reveal the disruption and write a separate revised sequence and explanation for human review.',
    steps: [
      { title: 'Read the preserved plan', action: 'Read Version 1 below. Identify its route, equipment and handover dependencies before revealing the change.' },
      { title: 'Reveal what changed', action: 'Select Publish the disruption. Read the new condition and identify which part of Version 1 it invalidates.' },
      { title: 'Write a usable Version 2', action: 'Enter a revised sequence and its reason. Name the changed step, who checks it, and what evidence will show that the alternative works.' },
      { title: 'Check record readiness', action: 'Select Review record readiness. This checks that an explained revision exists; a teacher evaluates whether your reasoning is convincing.' },
    ],
  },
  12: {
    goal: 'Explain a completed recovery mission using its actual decisions and evidence.',
    success: 'Attach a completed mission record and explain its objective, consequential decisions, limitation and a credible alternative.',
    steps: [
      { title: 'Complete the practical mission first', action: 'Select Enter the final recovery mission. Follow its Mission Journal through the practical tasks, resolve the trial and export its assessment record.' },
      { title: 'Return to this after-action lab', action: 'Use the completed run to state the objective your team pursued. If the objective changed, explain when and why.' },
      { title: 'Connect evidence to your account', action: 'Describe the recorded decisions and observations supporting the result. State a limitation and a credible alternative you rejected.' },
      { title: 'Review and save the account', action: 'Select Review record readiness, then record this explanation in the passport. The text does not replace the mission’s practical record.' },
    ],
  },
};

/** Milestones track recorded actions. They do not award marks or infer understanding. */
export function labMilestones(state: TrainingState): boolean[] {
  const v=state.values, did=(prefix:string)=>state.actions.some(a=>a.startsWith(prefix));
  const filled=(key:string)=>String(v[key]??'').trim().length>0;
  const checked=state.complete;
  switch(state.week){
    case 1:return [state.inspected.filter(id=>['clock','cup','door','note'].includes(id)).length===4,did('Covered scene')&&filled('recall0'),Array.from({length:5},(_,i)=>filled('classification'+i)).every(Boolean),checked];
    case 2:return [Array.from({length:4},(_,i)=>filled('association'+i)).every(Boolean),state.inspected.length>=4,Array.from({length:4},(_,i)=>filled('recall'+i)).every(Boolean),checked];
    case 3:return [did('Rotated module')||did('Moved module'),did('Rotated module'),filled('prediction'),checked];
    case 4:return [filled('prediction'),!v.interlock&&Boolean(v.spring)&&Number(v.cam)>0,Number(v.turns)>0,checked];
    case 5:return [did('Measured battery')&&state.inspected.length>=4,did('Power isolated'),Boolean(v.repaired)&&Boolean(v.power),checked];
    case 6:return [state.inspected.length>0,state.inspected.length>=2,filled('archive'),checked];
    case 7:return [did('Set '),did('Set '),did('Policy mismatches:')||checked,checked];
    case 8:return [did('Switched to operator')||filled('destination'),did('Switched to operator'),filled('destination')&&filled('quantity')&&filled('code')&&Boolean(v.acknowledged),checked];
    case 9:return [state.inspected.length>0,state.inspected.length>=3,filled('proposal'),checked];
    case 10:return [state.sequence.length>0,filled('prediction'),Number(v.position)===4,checked];
    case 11:return [Boolean(v.disrupted),Boolean(v.disrupted),String(v.revision??'').trim().length>=30&&String(v.reason??'').trim().length>=30,checked];
    case 12:return [false,filled('objective'),String(v.evidence??'').trim().length>=30&&String(v.alternative??'').trim().length>=30,checked];
    default:return [false,false,false,false];
  }
}

export interface MissionInstruction { role:Role; zone:Zone; action:string; success:string }
export const missionGuides: Record<Task,MissionInstruction> = {
  observe:{role:'observer',zone:'arrival',action:'Select all five Inspect buttons: lens, spool, tile, map and manifest. Read each finding directly beneath the buttons. Inspect means reveal and read the object’s information.',success:'All five items have been inspected.'},
  recall:{role:'observer',zone:'arrival',action:'Read the manifest, select Hide inspection notes, then enter its three item names in order, separated by commas. Select Check recall.',success:'The three items and their order match the manifest.'},
  orient:{role:'observer',zone:'arrival',action:'Inspect the map. Use its north arrow to choose the clockwise rotation, then select Test orientation. The camera’s view does not change the map’s north.',success:'Your chosen rotation matches the supplied map.'},
  mechanism:{role:'systems',zone:'workshop',action:'Read the required half-speed output. Choose a follower using output = 12 ÷ follower teeth, release the holding brake, then select Turn input once.',success:'The released mechanism produces half-speed output.'},
  circuit:{role:'systems',zone:'power',action:'Select Measure supply and fuse before replacing anything. Keep the load switch open while changing the fuse, then close it and check the lamp readout.',success:'The original fault was measured and the repaired circuit powers the lamp.'},
  investigate:{role:'investigator',zone:'control',action:'Read the current signed source and both copy records. Choose the complete copy with the matching checksum, then select Verify selected archive. A later timestamp alone is insufficient.',success:'The selected archive matches the current signed source.'},
  permission:{role:'investigator',zone:'control',action:'Read the allowed role/action pairs and locate the extra permission. Select its Subject, Action and new decision, then Apply policy and run checks.',success:'The inappropriate permission is removed and legitimate access still works.'},
  handoff:{role:'coordinator',zone:'archive',action:'Tell the receiver which item, destination and condition apply. The receiver needs a verified archive at Dispatch after its integrity check. Set all three fields, then Send structured handoff.',success:'The handoff specifies all three details without ambiguity.'},
  agreement:{role:'coordinator',zone:'archive',action:'Read the custodian’s requirement. Commit to preserving the original, name the person or role receiving the archive, and select Negotiate handling agreement.',success:'Both preservation and a named recipient are recorded.'},
  route:{role:'observer',zone:'archive',action:'Read the scenario bulletin and route dependencies. Choose a route supported by the available equipment, then Test route dependencies. A failed dependency needs another route or a repair.',success:'The chosen route is supported by the current scenario and power state.'},
  revision:{role:'coordinator',zone:'dispatch',action:'Preserve Version 1 before testing your assumptions. After investigation, enter a different Version 2 explaining the changed step, evidence and responsibility. Select Preserve this plan version again.',success:'Two distinct plans remain visible; their quality is assessed through your explanation.'},
};
export function missionGuide(task:Task,kind:MissionKind):MissionInstruction {
 const base=missionGuides[task];if(kind!=="recovery")return base;
 const overrides:Partial<Record<Task,Pick<MissionInstruction,"action"|"success">>>={
  mechanism:{action:"First ask Investigator to verify the signed archive profile. Read its required output: A uses a 36-tooth follower (one-third speed); B uses 48 teeth (one-quarter speed). Release the brake and select Turn input once.",success:"The tested cradle matches the currently verified archive profile."},
  investigate:{action:"Compare both copies with the current signed source. Select Verify selected archive. Give the resulting profile to Systems: it determines the cradle gearing and the evidence needed at Dispatch.",success:"The current signed copy and its recovery profile are verified."},
  handoff:{action:"Wait for the Investigator’s archive verification and Systems’ matching cradle test. Send verified archive to dispatch after integrity check. The record binds this handoff to the verified profile.",success:"All three fields are precise and the handoff records the current tested archive profile."},
  route:{action:"Check the verified profile, tested cradle and matching handoff first. Read the disruption bulletin, then test an available route. Upper and lift also require restored power; equipment failure makes both unavailable.",success:"The route is tested against current equipment and the same verified profile as the handoff."},
 };
 return {...base,...overrides[task]};
}
export const missionSummaries:Record<MissionKind,{goal:string;after:string}>= {
  a1:{goal:'Complete four workshop tasks: inspect the scene, recall the manifest, orient the map and restore the cradle. Then finish the trial at Dispatch.',after:'Export the trial record. Prepare your causal model, 350–500-word explanation, one failed prediction or limitation, and attribution using the assessment brief.'},
  a2:{goal:'Complete four relay tasks: diagnose the circuit, verify the archive, repair permissions and communicate a precise handoff. Then finish at Dispatch.',after:'Export the trial record. Add your evidence, before/after policy, handoff and contribution records, plus the 500–700-word joint explanation required by the brief.'},
  recovery:{goal:'Coordinate the four roles to recover Meridian’s archive. Preserve a first plan, complete all eleven practical objectives, revise your plan, then record evidence for your chosen resolution at Dispatch. The verified archive determines the cradle setup, and each ending needs its own receipt or custody record.',after:'Export this run and complete a contrasting rehearsal. Assemble the two rehearsal records, final run, plan history, role agreement, 800–1,200-word team account, presentation and individual defences listed in the final brief.'},
};
