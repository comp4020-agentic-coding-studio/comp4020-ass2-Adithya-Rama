import type {Demonstration, DemoControl} from "../lib/demonstration-types";

/** Authored voice of the example learner. Exact settings come from the same
 * controls as the scene and transcript, so spoken answers cannot drift. */
export interface DemoWalkthrough {
 introduction:string;
 completion:string;
 steps:Record<string,{briefing:string;action:string;outcome:string}>;
}
interface Script { task:string; conclusion:string; intentions:Record<string,string> }
const scripts:Record<string,Script> = {
 "lab-01":{
 task:"I am investigating the conservatory. My job is to make a record another person could check, separate what I see from what someone says, and choose evidence that could test an explanation. I will inspect, classify, recall, compare, and finish an observation record. Mara is our instructor in the teaching bay. She is not the gardener; the gardener is mentioned only in the written account.",
 conclusion:"My initial observations were 11:35 on the wall clock, a green mug beside the ledger, and a closed hatch. The note's statement about checking every tray is a claim. My idea that the gardener left in a hurry is an inference. I corrected my mistaken recall of the hatch, then recorded the later 11:50 reading and open hatch as two changes. I still cannot say who caused them. I finish by requesting tray-check records and preserving that uncertainty in my observation record.",
 intentions:{
 inspect:"I start with the wall clock. I read its hands and write the time, without inventing a reason why the room looks this way.",
 note:"I inspect the note beside the ledger. I can observe that the note exists, but I have not independently checked its statement that every tray was inspected.",
 cause:"I consider the empty mug. A hurried departure is one possible explanation, not something I can see directly.",
 recall:"With the scene covered, I reconstruct the hatch state. I initially remembered it as open. I check my original record and preserve the correction to closed.",
 compare:"I compare the second inspection with my first record, feature by feature. I look for changes and things that stayed the same.",
 verify:"I choose the next record that could test the gardener's claim. Someone's handwriting or confident manner cannot establish whether the trays were checked."
 }},
 "lab-02":{
 task:"I need to remember a four-item storm kit using a stable route through four locations. I will keep an honest baseline, build distinctive associations, retrieve with the list covered, and record a mistake and repair. The finished work is a recall-strategy record, not a claim of photographic memory.",
 conclusion:"My baseline contained two correct items. Gate, Pool, Press and Dome gave me a fixed route, with Lens, Tether, Pocket atlas and Beacon as its cues. I recovered all four during the guided attempt, but later substituted book for atlas. I recorded that error and strengthened the map-specific image. My completed record compares these attempts and explains their limits; one guided success does not establish permanent improvement.",
 intentions:{
 baseline:"Before I learn a strategy, I keep the attempt in which I recalled only Lens and Beacon. I count exact items rather than filling in missing answers afterwards.",
 route:"I fix the order of locations before assigning objects, so I can follow the same retrieval route every time.",
 associate:"At the Pool, I imagine a Tether splashing in the water. I need one distinctive connection between this location and this item.",
 retrieve:"I cover the list and follow my location route. This is retrieval, so I make the attempt before revealing the objects.",
 repair:"I notice that book is too broad to identify Pocket atlas. I repair the Press association with a map unfolding from the atlas.",
 limits:"I compare the recorded baseline with this guided retrieval. I state the improvement I actually observed and keep the later substitution in the record."
 }},
 "lab-03":{
 task:"I need to fit an offset connector to a labelled target. I will track world directions, predict a rotation, change height separately, and verify both conditions. My finished spatial model must explain what moved and why a similar-looking shape can still be wrong.",
 conclusion:"I held world north fixed, predicted north to east and west to north, then turned the connector ninety degrees clockwise. Raising it to level two satisfied the separate position condition. I rejected a mirrored substitute because its labels did not match. When the target moved to level one, I changed only the height. My record preserves each transformation and both verification checks.",
 intentions:{
 axes:"I find world north and up before moving anything. Turning the camera must not change the reference directions in my explanation.",
 predict:"I predict where both labelled ports will point after a clockwise quarter-turn, before I rotate the connector.",
 rotate:"I rotate the connector ninety degrees while keeping its level unchanged. I will check position as a separate condition.",
 translate:"I raise the correctly oriented connector to the target level without turning it again.",
 check:"I compare labelled directions as well as the outline. A mirrored shape can look similar while connecting the wrong ports.",
 transfer:"The new target is lower, but its port directions have not changed. I revise the level and retain the justified rotation."
 }},
 "lab-04":{
 task:"I need to prepare a model conservatory lift and explain its behaviour. I will calculate a gear ratio, check the interlock, cam and spring, run the model, and revise it for a changed output. My diagnosis must distinguish a wrong ratio from a blocked mechanism.",
 conclusion:"With an eighteen-tooth driver, a thirty-tooth follower and five input turns, I predicted three opposite output turns. I released the interlock, set the cam to two hundred and seventy degrees, and attached the spring before running. The output matched the prediction. For two output turns from four input turns, I changed the follower to thirty-six teeth and retained the valid readiness conditions. Those calculations, checks and results complete my mechanism diagnosis.",
 intentions:{
 ratio:"I use the required output to calculate the follower size before choosing a part: eighteen divided by follower teeth, multiplied by five, must equal three.",
 release:"The ratio is correct, but the engaged interlock blocks the cam. I address that dependency instead of changing the gears again.",
 cam:"With the interlock released, I align the cam with the mark required by this model's rule sheet.",
 spring:"I attach the missing return spring so the follower can complete its intended cycle.",
 run:"I apply five input turns and compare the output amount and direction with my prediction. Movement alone is not enough.",
 transfer:"The output requirement has changed. I recompute the gear ratio while retaining the cam and spring checks that remain valid."
 }},
 "lab-05":{
 task:"I need to diagnose two different faults in a fictional nine-volt beacon. I will compare readings at named points, isolate the model before replacement, restore power, and verify the output. My finished circuit diagnosis must explain why each test was useful.",
 conclusion:"The first powered trace was nine, nine, zero, zero volts across source, fuse, cable and beacon supply. That supported an open cable. After isolated replacement, I verified both nine volts at the beacon and visible light. The second dark beacon had nine volts throughout, so I used an isolated continuity check to identify an open lamp. My record distinguishes these two fault types and limits the conclusion to the supplied model.",
 intentions:{
 measure:"I record the source and downstream readings while the model is powered, keeping each reading attached to its probe location.",
 locate:"I find the first missing supply after a healthy point. I compare the cable input and output rather than guessing the familiar fuse fault.",
 isolate:"I switch the model source off before replacing the cable. I retain the earlier powered measurements as the diagnostic evidence.",
 verify:"After replacement, I restore power and check both the beacon supply and visible light.",
 load:"The second beacon has supply voltage but no light. I isolate power and test the lamp's continuity instead of looking for a supply zero that is absent.",
 conclude:"I compare the repaired cable fault with the repaired lamp fault. The different evidence required a different check."
 }},
 "lab-06":{
 task:"I must identify which weather ledger satisfies a signed request. I will compare section count and digest, keep the timeline separate from identity, and revise my recommendation after an authorised amendment. My finished evidence timeline must preserve both decisions and their authority.",
 conclusion:"North matched the original eighteen-section, Q-7 request. East was newer but carried Q-9, so recency did not make it the original answer. The later signed amendment requested Q-9, making East the current selection. I retained North's earlier justification and stated that matching a supplied reference does not prove the weather observations scientifically correct.",
 intentions:{
 contract:"I read the signed requirement before choosing a ledger. I need the required section count and the reference digest.",
 timeline:"I order the timestamps, then keep that ordering separate from the identity check. Newest does not automatically mean required.",
 compare:"I compare each candidate against both requirements. A correct count alone cannot establish the requested content identity.",
 limit:"I state exactly what the digest comparison establishes. Reference agreement does not verify every scientific observation inside the ledger.",
 amend:"I read the signed amendment and change the current selection under its new requirement. I preserve my earlier choice under the original request.",
 record:"I write a recommendation that names the current authority, the matching ledger and the question still unresolved."
 }},
 "lab-07":{
 task:"I need to test and repair the observatory's fictional access charter. I will compare intended rights with observed decisions, fix the role condition, test permitted and forbidden actions, and document a later policy change. My completed audit must show why each expected result is justified.",
 conclusion:"The charter gave release approval to the custodian, but the initial system allowed a reader to approve. I preserved that failed test, repaired the role condition, and checked that legitimate reading, maintenance and approval still worked. A later calibration hold suspended approval without removing other rights. My audit retains both policy versions and distinguishes a bug fix from an authorised change.",
 intentions:{
 mandate:"I turn the written charter into an expected decision before testing the system.",
 negative:"I request approval as a reader and record the actual result, even though it contradicts the charter. A failed test is useful evidence.",
 repair:"I change the approval condition itself. Hiding a button would not repair the underlying decision.",
 positive:"I check that maintenance and legitimate approval still work, as well as testing the prohibited request.",
 hold:"I apply the published calibration hold only to the affected approval right and retain the repaired original matrix.",
 audit:"I label each test with the rule that governed it, so a reader can tell why a later expected result changed."
 }},
 "lab-08":{
 task:"I need to pass an instruction between an analyst and an operator without losing its meaning. I will state destination, quantity and code, expose a mistaken read-back, correct it, and repeat the protocol for a new message. My completed handoff record must include confirmation.",
 conclusion:"The first confirmed message was Dome, five cases, VIOLET. The operator first repeated four; I kept that mismatch and the correction. The next message changed to Pool, two, SILVER and received a fresh read-back. My record includes both complete messages and confirmations, showing how the protocol survives changed information.",
 intentions:{
 discover:"I compare what each role can see. The operator needs an exact destination and count, not a vague direction such as upstairs.",
 destination:"I use the destination's shared name so both roles can compare the same field.",
 quantity:"I correct the first read-back from four cases to five and keep the mismatch visible.",
 code:"I carry the current verification code rather than reusing a familiar code from earlier work.",
 confirm:"I wait for a complete read-back of destination, count and code, then confirm all three.",
 transfer:"I replace all three fields with the new card's values and perform another read-back. Earlier confirmation cannot approve a changed message."
 }},
 "lab-09":{
 task:"I am mediating a conservatory council. Ada, Rin and Bo are represented by their labelled accounts and role dossiers; Mara remains our instructor. I must test claims, check carrying capacity, negotiate within the mandate, and revise the agreement if the objective changes. My finished council record should justify an agreement without pretending to read minds.",
 conclusion:"Rin's identical-copy claim conflicted with the R-4 and R-8 record, but that did not establish intent. The five-unit cart could not support the seven-unit original. Under the first objective, I agreed on a verified copy with custody recorded. The later provenance requirement needed the original stabilised pending supported handover. My record preserves both agreements, their constraints and the unresolved question about intent.",
 intentions:{
 role:"I establish what my mediator role may decide. I can negotiate a documented agreement, not simply order the original removed.",
 claim:"I test the identical-copy claim against the digest record. I do not use confidence or appearance as evidence of truth.",
 capacity:"I compare the seven-unit load with the cart's five-unit capacity. The uninstalled cradle is a possible remedy, not support already available.",
 agree:"I look for an agreement that meets research access while preserving the caretaker's custody conditions.",
 change:"The new signed objective requires physical provenance. I revise the agreement because a copy alone no longer completes that objective.",
 record:"I keep the contradicted claim, capacity evidence and two agreements, while leaving the speaker's intent unresolved."
 }},
 "lab-10":{
 task:"I need to predict and test contacts on an invented instrumented floor grid. I will read the coordinate rule, trace two routes, compare predicted and recorded contacts, then recompute after coverage changes. My output is a route and trace explanation, not a success badge.",
 conclusion:"The first route reached cell three and contacted sensor fifteen once. The alternative east route made zero contacts under the original sensor set, with the same number of moves. When sensors moved to twenty-one, twenty-two and twenty-three, that east route made three contacts. I preserved both traces under their respective rules and chose by the stated training objective.",
 intentions:{
 map:"I read how cells are numbered and what counts as a contact before drawing a route.",
 predict:"I compare every visited cell with the published sensor set and count entries onto sensor cells.",
 execute:"I follow the recorded cells in order, keeping the path so another person can check my contact count.",
 alternative:"I trace a second route under the same rules and compare both contact count and length.",
 change:"The sensor set has changed. I recompute the prediction without overwriting the earlier trace under the old rule.",
 defend:"I state whether my objective is testing a detector or minimising contact before I recommend a route."
 }},
 "lab-11":{
 task:"I must revise a plan after the east bridge closes. I will preserve Version One, identify the affected dependency, retain valid evidence, assign the new check, and communicate Version Two. My revision record must make the change traceable.",
 conclusion:"Version One used the east bridge. The closure invalidated that route but did not change the signed ledger comparison or completed trolley check. Version Two adds a platform-capacity check owned by the systems specialist before crossing west. I kept the original plan and confirmed every role received the revised route and stop condition.",
 intentions:{
 baseline:"I freeze the original sequence before considering the disruption, so the later comparison has a real baseline.",
 disruption:"I identify the dependency the closure invalidates and the condition attached to the alternative route.",
 retain:"I carry forward the unchanged signed comparison and completed trolley inspection without claiming they verify the new platform.",
 assign:"I give the platform-capacity check a named owner and identify who must receive its result.",
 revise:"I add the capacity check before west-platform movement and keep Version One intact.",
 communicate:"I confirm every role received the changed route and knows movement must wait for the new check."
 }},
 "lab-12":{
 task:"I need to recover verified rainfall data while preserving the original recorder. I will define success, separate an operator's claim from evidence, verify support equipment and data identity, then agree a documented handoff. My after-action account must compare the result with the actual objective.",
 conclusion:"I recorded the 16:25 display and amber lamp, kept completeness as a claim, and verified the support lift's two opposite output turns. Ash matched the twelve-record W-6 request. The agreed recovery transferred that verified copy while leaving the recorder stable at its mast. I completed the account with the original's location, confirmed handoff and unresolved calibration question.",
 intentions:{
 objective:"I distinguish recovering verified data from automatically moving the whole recorder.",
 observe:"I record the visible signal and keep the operator's completeness report as a claim until I check the manifest.",
 restore:"I test the already-prepared support mechanism against its predicted output rather than assuming readiness guarantees the result.",
 verify:"I compare both record count and digest against the signed requirement.",
 handoff:"I confirm which copy is transferred, what stays in place, and who accepts custody.",
 debrief:"I compare the achieved recovery with the objective and identify the calibration question the identity check did not answer."
 }},
 "assessment-fieldwork":{
 task:"I am assembling an example fieldwork portfolio. I need twelve named activity records with evidence, changed-condition practice and reflection. I will use the mechanism record to show the required detail, then show the full twelve-record package. Teachers count the best ten; watching this example does not generate my own coursework.",
 conclusion:"My portfolio contains a register and all twelve alternate activity records. The mechanism entry preserves its prediction, readiness fault, three-turn result and two-turn transfer, plus the specific error I learned from. Each entry identifies its evidence and assistance. I label and download this as authored demonstration material. To complete my own fieldwork, I must supply my own attempts, transfer records and reflections; the teacher applies the best-ten rule.",
 intentions:{
 identify:"I name the output and record its scenario, evidence route and assistance so it can be understood outside the player.",
 trace:"I retain the settings, readiness checks and observed output that support the mechanism explanation.",
 transfer:"I include the changed requirement and show why I changed the ratio while retaining valid readiness conditions.",
 reflect:"I describe the specific error of changing gears when the cam was blocked, and the interlock check that corrected my reasoning.",
 count:"I check that all twelve entries are present and explain the best-ten rule without inventing automated marks.",
 attribute:"I label the package as authored teaching material before exporting it. It illustrates the expected record, not personal assessed work."
 }},
 "assessment-a1":{
 task:"I am completing the Botanical Transfer Workshop, an alternate individual assignment. I must combine an observation record, recall strategy, connector transformation and mechanism diagnosis, then explain a changed output requirement. I will show the practical decisions and the finished written explanation, so you can see both parts of a complete submission.",
 conclusion:"I recorded 13:15, the white jar and open window, while keeping the sealing note as a claim. I repaired a vague memory cue and retrieved Lens, Foam, Map and Beacon. I rotated the connector one hundred and eighty degrees and raised it to level two. A forty-tooth follower produced three opposite turns from six input turns after the interlock, cam and spring checks. For four output turns, I revised it to thirty teeth. My complete example joins the attempt record, causal model, transfer explanation and reflection.",
 intentions:{
 inspect:"I inspect the workshop and record visible features before deciding what happened.",
 classify:"I keep the note's sealing statement as a claim and avoid treating an open window as proof of a hurried departure.",
 encode:"I attach Foam to the Basin with a specific image, correcting my earlier vague packing cue.",
 recall:"I cover the list and retrieve the kit in its fixed route order before checking the result.",
 rotate:"I predict how two clockwise quarter-turns map both original connector ports to the target.",
 raise:"I check the target level separately and move the correctly oriented connector without rotating again.",
 ratio:"I calculate the follower required for three output turns from six input turns with a twenty-tooth driver.",
 ready:"I resolve the blocked dependencies before running: release the interlock, set the required cam angle and attach the spring.",
 verify:"I run the model and compare both output magnitude and direction with my prediction.",
 transfer:"I recompute the follower for four output turns, retain the valid readiness conditions and preserve the first result."
 }},
 "assessment-a2":{
 task:"We are Ari and Nia, the fictional pair completing the Iris Relay example. We must diagnose the circuit, verify an archive, repair permissions and complete confirmed handoffs while rotating responsibilities. I will narrate our shared record as we work, then show both contributions and the joint explanation. The names on the role cards are our example roles, not the instructor.",
 conclusion:"We diagnosed the open fuse from the powered twelve, zero, zero, zero trace, repaired it while isolated and verified the lamp. Delta met I-4; the later signed I-8 amendment changed our selection to Echo without erasing the first decision. We checked all nine permission cells and preserved useful work. We corrected the first South Dome handoff to four, TEAL, then confirmed Hill Station, two, GOLD after another role exchange. The complete package includes both role records, the policy comparison, revision and joint explanation.",
 intentions:{
 roles:"We agree who operates and who holds the requirement cards, and when we will exchange those responsibilities.",
 measure:"Ari records the powered trace while Nia compares competing fault predictions. We locate the missing supply before replacing anything.",
 isolate:"Ari isolates the source for fuse replacement while preserving the powered diagnostic readings.",
 verify:"We restore power and verify the supply and light before Nia becomes operator and Ari takes the requirement pack.",
 archive:"Nia compares the candidates against the section count and digest that Ari reads from the original request.",
 matrix:"We repair every role and action decision against the charter, preserving intended access as well as removing excess rights.",
 regression:"We test a permitted service operation and a prohibited reader approval, alongside the full matrix.",
 handoff:"We correct the first count mismatch, repeat destination, quantity and code, then obtain confirmation.",
 amend:"We apply the signed amendment to the archive selection and keep the earlier choice under its original authority.",
 "final-handoff":"We rotate responsibilities again and confirm every field of the revised handoff. The earlier confirmation cannot carry over."
 }},
 "assessment-final":{
 task:"We are Lena, Omar, Priya and Jonah, the example team for Operation Lamplight at Halcyon Observatory. We must recover verified research while preserving original records and custody. I will narrate our shared decisions, showing who owns each check and who receives it. We will preserve a baseline rehearsal, respond to a disruption, test a revised plan, execute the final run, and assemble the dossier, presentation script and delivery plan and individual defences. This is a complete alternate example for learning the method; your assigned operation has different conditions.",
 conclusion:"Our baseline recovered the verified H-3 atlas with cradle support and a recorded receipt. We kept that rehearsal as Version One. In the second rehearsal, the east route closed, the cradle was withdrawn and the signed research requirement changed to H-8. We stopped unsupported movement and built Version Two around verified Cinder data, the west route and explicit digital custody. Both the revised rehearsal and final run recorded one predicted contact at cell five. Venn acknowledged the copy; Quill confirmed the original stayed supported at its original location. Our dossier includes the contract, evidence, crew responsibilities, two rehearsals, preserved plans, final receipt, presentation script and delivery plan and individual defences. It explains that data identity and custody are verified while scientific accuracy and future physical provenance work remain separate questions. The ending supports our explanation; it does not determine an academic grade.",
 intentions:{
 contract:"We define success as verified research access with preservation and custody. Physical removal is a preferred method, not an unconditional requirement.",
 crew:"We assign each check to a role and identify the colleague who must receive its result before a dependent action.",
 arrival:"Lena records the display, damaged outer case and open hatch, but keeps the claim that all plates are intact separate from visible evidence.",
 memory:"Lena links the kit to stable locations, records the swapped middle items, strengthens the cue and retrieves with the list covered.",
 connector:"Omar predicts the port mapping, rotates the connector two hundred and seventy degrees, then changes the level separately.",
 lift:"Omar calculates the follower size and resolves the interlock, cam and spring dependencies before applying six input turns.",
 circuit:"Omar compares the powered readings, localises the first missing supply to the cable and isolates the model for replacement.",
 "verify-power":"Omar restores power and checks voltage and light. Jonah receives the verified result before treating support power as ready.",
 reference:"Priya compares each atlas with the original thirty-section H-3 request and states what that comparison can establish.",
 policy:"Priya repairs the two reversed approval settings, then tests both the rejected reader request and permitted custodian request.",
 handoff:"Jonah issues the complete environmental-pack instruction and waits for every field to be read back and confirmed.",
 council:"We compare the original's mass with carrying capacity. We verify cradle support and obtain the custodian's agreement before movement.",
 baseline:"We execute the predicted route, confirm the verified atlas and supported handling, record Venn's receipt, and preserve this separate baseline rehearsal as Version One.",
 disruption:"The second rehearsal starts with the original back in Quill's custody. The new closure and withdrawn cradle invalidate the old movement plan, so Jonah stops it.",
 amend:"Priya reads the signed H-8 amendment, selects its matching copy and retains the earlier H-3 decision in our history.",
 "rehearse-revision":"We build Version Two, preserve the original, verify Cinder, agree digital custody and test the west route. We record the predicted sensor contact and Venn's rehearsal receipt.",
 "final-run":"We independently verify the current copy and repeat the current route. Venn confirms the final digital receipt, and Quill confirms the original remains supported and unmoved.",
 debrief:"We compare the final result with our contract and explain both rehearsals, each person's contribution and the limits of the chosen recovery."
 }}
};

function describeAction(control:DemoControl):string {
 const label=(value:string)=>control.options?.find(option=>option.value===value)?.label??value;
 const value=control.expected;
 if(Array.isArray(value))return 'I arrange "'+control.label+'" in this order: '+value.map(label).join(", then ")+".";
 if(typeof value==="boolean")return 'I set "'+control.label+'" to '+(value?"yes":"no")+".";
 if(control.type==="select")return 'For "'+control.label+'", I choose "'+label(String(value))+'".';
 return 'For "'+control.label+'", I enter '+String(value)+(control.unit?" "+control.unit:"")+".";
}

/** Fail on missing teaching copy rather than silently inventing a generic tour. */
export function getDemoWalkthrough(demo:Demonstration):DemoWalkthrough {
 const script=scripts[demo.id];
 if(!script)throw new Error("Missing worked-example narration: "+demo.id);
 return {
  introduction:script.task+" You can pause, mute, replay, or take control at any point. The captions show the same explanation.",
  completion:script.conclusion+' Open "Read the finished work" or download the complete example to inspect the evidence and explanation together. '+demo.transfer,
  steps:Object.fromEntries(demo.steps.map((step,index)=>{
   const intention=script.intentions[step.id];
   if(!intention)throw new Error("Missing narrated intention: "+demo.id+"/"+step.id);
   return [step.id,{
    briefing:"Step "+(index+1)+". "+step.title+". "+intention,
    action:step.controls.map(describeAction).join(" ")+" I check the demonstrated result.",
    outcome:step.success+" "+step.why
   }];
  }))
 };
}
