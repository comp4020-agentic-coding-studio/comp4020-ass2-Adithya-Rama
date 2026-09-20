import type {Demonstration, DemoControl} from "../lib/demonstration-types";
import type {FieldOperationAction} from "../lib/field-operation";
import {getDemoOperation,demoFieldActions} from "./demo-operations";

/** Authored voice of the example learner. Exact settings come from the same
 * controls as the scene and transcript, so spoken answers cannot drift. */
export interface DemoWalkthrough {
 introduction:string;
 completion:string;
 fieldActions:{action:FieldOperationAction;intention:string}[];
 steps:Record<string,{briefing:string;action:string;outcome:string}>;
}
interface Script { task:string; conclusion:string; intentions:Record<string,string> }
const scripts:Record<string,Script> = {
 "lab-01":{
 task:"I am investigating the conservatory. My job is to make a record another person could check, separate what I see from what someone says, and choose evidence that could test an explanation. I will inspect, classify, recall, compare, and finish an observation record. Mara is our instructor in the teaching bay. She is not the gardener; the gardener is mentioned only in the written account.",
 conclusion:"My initial observations were 11:35 on the wall clock, a green mug beside the ledger, and a closed hatch. The note's statement about checking every tray is a claim. My estimate of a thirty-five-minute inspection is an inference: the clock reading supplies no start time. I corrected my mistaken recall of the hatch, then recorded the later 11:50 reading and open hatch as two changes. I still cannot say who caused them. I finish by requesting tray-check records and preserving that uncertainty in my observation record.",
 intentions:{
 inspect:"I start with the wall clock. I read its hands and write the time, without inventing a reason why the room looks this way.",
 note:"I inspect the note beside the ledger. I can observe that the note exists, but I have not independently checked its statement that every tray was inspected.",
 cause:"I compare the clock reading with my duration estimate. Thirty-five minutes would require a justified start time; the scene supplies none.",
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
 "lab-05": {
  "task": "I must restore one fictional nine-volt beacon. This case allows more than one fault at the same time, unlike the assigned lab's single-fault cases. I will locate a supported supply fault, make a controlled repair, test the original symptom, and continue if the beacon still fails. My diagnosis must preserve the incomplete first repair as well as the final working result.",
  "conclusion": "My initial trace was nine, nine, zero, zero volts across source, fuse, cable and lamp supply. I diagnosed and replaced the cable while isolated. That restored nine volts throughout, but the same beacon stayed dark. The first diagnosis was useful, not complete. An isolated continuity test then identified an open lamp. After replacing it and restoring power, I verified nine volts and visible light. My record keeps both faults, the failed intermediate verification and the final result. I will use the assigned case's own one-fault rule and measurements rather than assume every circuit shares this example's two defects.",
  "intentions": {
    "measure": "I read the rule that several faults may coexist. I power the model for voltage readings and record each point. A missing supply means I cannot yet conclude that the lamp itself is healthy.",
    "locate": "I compare the healthy fuse output with the zero cable output. This supports a cable fault, while the load remains untested. I state that limit before changing a component.",
    "isolate": "I isolate power and replace only the cable justified by the trace. I keep the lamp unchanged so the next check can tell me what the cable repair actually achieved.",
    "verify": "I restore power to the same beacon. All supply points now read nine volts, but the lamp is still dark. I record a successful supply repair and an unsuccessful whole-system check together.",
    "load": "Healthy supply with a dark output gives me a new question about the lamp. I isolate power and check its continuity. The open result identifies a second defect in the same beacon.",
    "conclude": "With power isolated, I replace the confirmed open lamp. I restore power and verify both supply and light. I preserve the first failed verification because it explains why the second test was necessary."
  }
},
 "lab-06": {
  "task": "I must choose a weather ledger using both content evidence and instruction authority. The case's register states which requests are authenticated. I will establish a valid first selection, receive an unsigned proposal, decide whether it can change the current requirement, then inspect a genuinely authenticated instruction and a repaired candidate. My completed timeline must explain a decision that stayed valid as well as a later justified change.",
  "conclusion": "North met authenticated R1: eighteen sections and Q-7. It happened to be newest, but the count and digest justified it. An unsigned eight o'clock message requested East and Q-9. Because the register marked that message unverified, I retained North and asked for authority. Later, authenticated R2 required eighteen sections and Q-12, and South version S2 supplied exactly that after a recorded repair. I checked those two new facts separately before selecting South S2. I preserved the original incomplete South, the North decision and the unsigned message. The final recommendation verifies authority, completeness and identity, not the scientific truth of every weather observation.",
  "intentions": {
    "contract": "I read the rule for a request to supersede the current authority. I record R1's section count and digest before comparing the candidates.",
    "timeline": "I order East, South and North by their timestamps. North is newest here; that does not make it either right or wrong. The reference comparison decides the selection.",
    "compare": "I compare every record against R1. North has both eighteen sections and Q-7; the alternatives fail at least one required condition.",
    "limit": "The later message proposes East, but the authority register marks the request unverified. I preserve it as a claim, retain North under the still-current R1, and request authentication.",
    "amend": "The register now authenticates R2, requiring Q-12. A separate repair receipt supplies South S2 with eighteen sections and Q-12. I verify both the authority and the new version before changing the selection.",
    "record": "I keep three distinct decisions: North under R1, no authorised change from the unsigned message, and South S2 under authenticated R2. I preserve the incomplete original South and explain the remaining scientific limit."
  }
},
 "lab-07": {
  "task": "I must repair the observatory’s embargo charter. Maintainers may service equipment but may not read research. I will preserve an excessive permission and a missing required permission, repair the two cells, retest the complete matrix and then apply a narrow release hold. My audit must distinguish a bug from a later authorised change.",
  "conclusion": "The faulty table allowed maintainer research reading and blocked reader reading. I denied the former and restored the latter without removing service or custodian duties. All nine decisions then matched the embargo charter. A later release hold changed only custodian approval. My completed audit retains the failed tests and both justified versions; the assigned lab has a different reading rule and must be derived afresh.",
  "intentions": {
    "mandate": "I derive each right from the explicit embargo rather than assuming service responsibility grants research visibility.",
    "negative": "I record both actual failures before editing: forbidden maintainer reading and blocked reader reading.",
    "repair": "I correct only the two mismatched cells and preserve the seven already valid decisions.",
    "positive": "I retest positive and negative cases, including the different reading results for reader and maintainer.",
    "hold": "I apply the new release hold only to custodian approval and keep the research embargo unchanged.",
    "audit": "I attach the governing charter or notice to each result so the two versions remain explainable."
  }
},
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
 "lab-09": {
  "task": "I am mediating a conservatory handover with Ada, Rin and Bo represented in the records. The original brief requests a physical provenance examination. I will test the copy claim, compare load with certified capacity, prepare an authorised agreement, then reconsider it if the brief changes before dispatch.",
  "conclusion": "The two twelve-section copies both matched R-4, supporting Rin’s specific claim. The seven-unit original fit the nine-unit cart, so a documented physical handover to Mira was feasible under the first brief. Before dispatch, a replacement request required remote access while the original stayed with Ada. I revised the agreement to a verified Cedar copy, preserved the unexecuted physical plan and made no claim about Rin’s general honesty.",
  "intentions": {
    "role": "I read the original request and custody conditions before assuming a copy is sufficient.",
    "claim": "I compare both digests and counts. This time the record supports the limited claim rather than contradicting it.",
    "capacity": "I check seven against nine instead of assuming the cart has the same deficit as another scenario.",
    "agree": "I prepare the physical agreement with a named recipient and custody record while clearly stating dispatch has not happened.",
    "change": "I reread the replacement brief. It changes the desired outcome, so the usable cart no longer justifies moving the original.",
    "record": "I keep the corroborated claim and both agreements while stating their scope and actual completion status."
  }
},
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
 "lab-11": {
  "task": "I must revise a dispatch plan after its old authority is withdrawn. The routes stay open and equipment remains valid. I will preserve Version One, identify the new permission prerequisite, assign its checks and reorder the plan so authority is recorded before sealing.",
  "conclusion": "The new notice invalidated the old authority, not the route or signed identity result. Version Two checks recipient scope and records replacement authorisation before sealing, then uses the same dispatch route and receipt step. The investigator checks scope; the coordinator receives the result and records authority. Both versions and the stop condition remain visible, without claiming that dispatch or authorisation has already occurred.",
  "intentions": {
    "baseline": "I preserve the original sequence under its original authority before reading the change.",
    "disruption": "I locate the newly invalid permission dependency; there is no closed passage to work around.",
    "retain": "I retain identity and equipment findings only for the questions they answer.",
    "assign": "I name the investigator as scope checker and the coordinator as the recipient who records authority before sealing.",
    "revise": "I insert the two prerequisites before sealing rather than appending them after dispatch.",
    "communicate": "I read back the changed order and stop condition and distinguish an acknowledged plan from a completed operation."
  }
},
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
 "assessment-a2": {
  "task": "We are Ari and Nia, the fictional pair restoring Iris Relay. A dark lamp has supply at every test point, so we must choose a test that separates available voltage from a working load. We will also compare identical archive mirrors, respond to a changed evidence scope, repair the policy, and complete two confirmed handoffs while rotating roles. Our finished work includes both contribution records, preserved versions and a joint explanation. Mara is the instructor, not either partner.",
  "conclusion": "We measured twelve volts throughout the dark circuit, then isolated it and found the lamp open while fuse and cable were continuous. After lamp replacement the voltages stayed the same, but the light worked. Both Delta and Echo satisfied the first twenty-two-section I-4 request. The amendment added six calibration-trace sections, so Foxtrot became the required twenty-eight-section I-9 bundle without making the original mirrors corrupt. We verified all nine policy decisions, corrected the South Dome count to four with TEAL, and completed a fresh Hill Station, two, GOLD handoff after rotating again. Our complete record explains the changed test, the non-unique first match and the scope-based revision.",
  "intentions": {
    "roles": "We state who operates, who supplies the requirements, and when we will exchange those responsibilities.",
    "measure": "Ari records twelve volts at all four supply points while the lamp remains dark. Nia chooses isolated continuity because this trace contains no supply break to locate.",
    "isolate": "We isolate power, record the lamp as OPEN and the fuse and cable as continuous, then replace only the lamp while retaining that diagnostic evidence.",
    "verify": "We restore power. The voltage trace stays at twelve volts throughout, but the lamp now lights. We verify that output before Nia operates and Ari takes the requirement pack.",
    "archive": "We compare all candidates against the exact core-only scope. Both identical mirrors match; neither timestamp justifies excluding the other.",
    "matrix": "We repair the complete policy against its charter, retaining each specialist responsibility and removing reader excess rights.",
    "regression": "We check an allowed maintainer service and a denied reader approval, alongside the other seven expected decisions.",
    "handoff": "We keep the first core-package instruction separate from the copy-equivalence finding. We correct three to four, repeat all fields, and obtain confirmation.",
    "amend": "We read the additional trace requirement. The original mirrors still match the old scope; the larger Foxtrot bundle alone contains the newly requested evidence.",
    "final-handoff": "We rotate responsibilities again and attach a fresh confirmed message to the amended trace package. We do not reuse the old package confirmation."
  }
},
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
  introduction:script.task+" Our field objective is: "+getDemoOperation(demo).objective+" "+getDemoOperation(demo).problem+" I inspect the mission station, investigate each dependency, then perform the intervention and handover. You can pause, mute, replay, or take control at any point. The captions show the same explanation.",
  fieldActions:demoFieldActions(demo).map(action=>({action,intention:describeFieldAction(demo,action)})),
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

/** Spoken intentions name the same actions used by the learner and mission stations. */
function describeFieldAction(demo:Demonstration,action:FieldOperationAction):string {
 const op=getDemoOperation(demo);
 if(action.type==='execute')return 'All chapter evidence checks are complete. I return to the mission station and '+op.actionLabel.toLowerCase()+'. I am putting the verified solution into effect, then checking what changes.';
 if(action.type==='collect')return 'I collect '+op.cargoLabel+'. The verified intervention released this package. I now carry it through the marked handover route.';
 if(action.type==='checkpoint')return 'I carry '+op.cargoLabel+' to '+action.id+'. I confirm this checkpoint before continuing so the handover trace records the route actually followed.';
 if(action.type==='deliver')return 'At the receiving station, I '+op.resolveLabel.toLowerCase()+'. I check the receipt before calling the field operation complete.';
 return 'I inspect the mission station and establish its obstacle before changing anything.';
}
