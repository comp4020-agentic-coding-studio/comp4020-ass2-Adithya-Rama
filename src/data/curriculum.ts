/** Authored skill progression; dates and assessment weights remain in content records. */
export interface WeekDefinition { week:number; title:string; skill:string; room:string; activityId:string; output:string; summary:string; missionUse:string; objectives:string[]; materials:string[]; hints:string[]; exemplar:string; }
export const learningOutcomes: {id:string;title:string;description:string}[] = [
  {
    "id": "LO1",
    "title": "Observe and remember",
    "description": "Observe accurately, distinguish inference from recalled detail, and use deliberate retrieval strategies."
  },
  {
    "id": "LO2",
    "title": "Represent space",
    "description": "Construct spatial representations, predict changed views and navigate using explicit models."
  },
  {
    "id": "LO3",
    "title": "Diagnose systems",
    "description": "Explain and diagnose purpose-built mechanisms and low-voltage model circuits."
  },
  {
    "id": "LO4",
    "title": "Investigate digital systems",
    "description": "Evaluate supplied digital evidence and test permissions in self-contained fictional systems."
  },
  {
    "id": "LO5",
    "title": "Coordinate people",
    "description": "Communicate, negotiate and coordinate across unequal information and legitimate responsibilities."
  },
  {
    "id": "LO6",
    "title": "Transfer and adapt",
    "description": "Apply capabilities in unfamiliar situations, revise dependencies and defend consequential choices."
  }
];
export const weeks: WeekDefinition[] = [
  {
    "week": 1,
    "title": "Read the Room",
    "skill": "Observation and attention",
    "room": "Perception Gallery",
    "output": "observation-record",
    "summary": "Inspect a furnished scene, reconstruct what was present and distinguish observations from interpretations.",
    "missionUse": "Use the arrival scene to notice changed equipment before committing the team to a route.",
    "objectives": [
      "Record specific observable details without silently adding a cause.",
      "Separate a missed detail from a remembered detail that was never present.",
      "Transfer a deliberate inspection method to a changed scene."
    ],
    "materials": [
      "PG-01: arrival-room inventory",
      "PG-02: altered scene record",
      "Blank observation grid"
    ],
    "hints": [
      "Divide the room into regions and inspect each once.",
      "A statement about an object's location is different from a statement about who moved it.",
      "Check whether your confidence comes from a visible detail or an expectation."
    ],
    "exemplar": "I recorded the open door and 08:20 display. I marked ‘left in a hurry’ as an inference because the objects did not establish a cause. The note preserved what someone claimed, not independent proof of their account.",
    "activityId": "week-01"
  },
  {
    "week": 2,
    "title": "Build a Memory Palace",
    "skill": "Deliberate recall",
    "room": "Perception Gallery",
    "output": "recall-strategy",
    "summary": "Build a stable route, attach distinctive associations and compare recall with a baseline.",
    "missionUse": "Carry a short equipment or instruction sequence between stations while preserving its order.",
    "objectives": [
      "Use ordered locations as retrieval cues.",
      "Compare recall using the same scoring rule across two strategies.",
      "Explain why a mnemonic improves retrieval without guaranteeing perfect memory."
    ],
    "materials": [
      "MP-01: four-place academy route",
      "MP-02: practice and transfer lists",
      "Recall comparison sheet"
    ],
    "hints": [
      "Choose the four locations in an order you can reproduce.",
      "Give each item a distinctive association at its place.",
      "Check exact items and order separately; familiarity alone is not recall."
    ],
    "exemplar": "I associated Lantern with the Fountain spraying light. On retrieval I swapped two items, so I kept the route fixed and made those two associations more distinctive.",
    "activityId": "week-02"
  },
  {
    "week": 3,
    "title": "Think in Three Dimensions",
    "skill": "Spatial reasoning and navigation",
    "room": "Spatial Lab",
    "output": "spatial-model",
    "summary": "Reconcile partial views, rotate components and build a model that predicts an unseen view.",
    "missionUse": "Reconstruct Meridian's layout and relate maintenance diagrams to the space around you.",
    "objectives": [
      "Use a consistent coordinate system across different views.",
      "Distinguish rotation from reflection.",
      "Test a spatial model by predicting a view not used to construct it."
    ],
    "materials": [
      "SP-01: labelled L-connector",
      "SP-02: changed orientation and level",
      "Coordinate and transformation sheet"
    ],
    "hints": [
      "Keep world north fixed while the camera changes.",
      "Track the original north port after each clockwise quarter-turn.",
      "Changing floor level moves the module without rotating it."
    ],
    "exemplar": "I predicted north would become south after two clockwise quarter-turns. I then moved the connector to level 1 without changing its orientation and checked both conditions.",
    "activityId": "week-03"
  },
  {
    "week": 4,
    "title": "Understand the Mechanism",
    "skill": "Mechanical diagnosis",
    "room": "Mechanics Workshop",
    "output": "mechanism-diagnosis",
    "summary": "Predict a training mechanism's motion, locate a failed dependency and verify a repair.",
    "missionUse": "Diagnose Meridian's recovery carriage without treating a jam as an unexplained obstacle.",
    "objectives": [
      "Predict relative speed and direction in a simple gear pair.",
      "Trace how an interlock and cam control an output.",
      "Diagnose a fault through observations that distinguish competing causes."
    ],
    "materials": [
      "ME-01: training carriage mechanism",
      "ME-02: changed gear and interlock configuration",
      "Causal diagram sheet"
    ],
    "hints": [
      "Identify the input, transmission and output before operating the assembly.",
      "Two externally meshing gears turn in opposite directions.",
      "Check the interlock state before treating resistance as a failed gear."
    ],
    "exemplar": "I predicted a 24-tooth driven gear for two output turns from four input turns. It still did not move because the interlock blocked the cam. After release, spring attachment and a 180-degree cam setting, the observed output matched the prediction.",
    "activityId": "week-04"
  },
  {
    "week": 5,
    "title": "Wake a Dead System",
    "skill": "Electronics and fault diagnosis",
    "room": "Systems Garage",
    "output": "circuit-diagnosis",
    "summary": "Trace a low-voltage circuit, select informative measurements and locate an open fault.",
    "missionUse": "Restore the archive carriage's support circuit with a documented fault diagnosis.",
    "objectives": [
      "Trace a complete current path through a supplied simple circuit.",
      "Use measurements to distinguish an open fuse from an open switch.",
      "Verify a repair without changing unrelated components."
    ],
    "materials": [
      "EL-01: 6 V lamp circuit",
      "EL-02: fault observation sheet",
      "Measurement record"
    ],
    "hints": [
      "Measure with power on before trying to locate an open fault.",
      "Compare consecutive nodes against the common return.",
      "Isolate power before replacing a component; then verify the downstream result."
    ],
    "exemplar": "Battery and fuse nodes read 6 V while the cable output read 0 V. I isolated power, replaced the cable and restored power. A 6 V lamp-node reading supported the repair.",
    "activityId": "week-05"
  },
  {
    "week": 6,
    "title": "Follow the Digital Trace",
    "skill": "Digital investigation",
    "room": "Digital Observatory",
    "output": "evidence-timeline",
    "summary": "Compare supplied records, separate file labels from evidence and reconstruct an event sequence.",
    "missionUse": "Identify which archive copy can support a defensible recovery decision.",
    "objectives": [
      "Distinguish an observed record from a conclusion about events.",
      "Compare version records and integrity results without treating filenames as authority.",
      "Preserve unresolved contradictions in a reproducible timeline."
    ],
    "materials": [
      "DI-01: three-file evidence pack",
      "DI-02: event log and integrity results",
      "Timeline worksheet"
    ],
    "hints": [
      "A filename describes a label, not proven authenticity.",
      "Compare the source record, integrity result and modification time.",
      "A later modification is a question to investigate, not automatic proof of malicious intent."
    ],
    "exemplar": "I selected A under M-42 and recorded why B's later timestamp was insufficient. When the signed requirement changed to M-99, I selected B and preserved the earlier decision with its original reference.",
    "activityId": "week-06"
  },
  {
    "week": 7,
    "title": "Challenge the System",
    "skill": "Sandboxed cybersecurity",
    "room": "Digital Observatory",
    "output": "permission-audit",
    "summary": "Test an invented permission system, repair an overbroad rule and check legitimate access still works.",
    "missionUse": "Repair Meridian's local recovery policy without blocking the work the team is authorised to perform.",
    "objectives": [
      "Distinguish identity, object and requested action in an access decision.",
      "Demonstrate a fault using an explicit expected-versus-observed test.",
      "Repair the fictional policy and test both denied and permitted operations."
    ],
    "materials": [
      "CY-01: fictional role policy",
      "CY-02: test matrix and faulty rule",
      "Before/after permission audit"
    ],
    "hints": [
      "Write the intended role/action policy before testing.",
      "Check required actions as well as forbidden ones.",
      "The maintenance hold changes technician service, not every permission."
    ],
    "exemplar": "I denied observer certification and service, restored technician service and registrar certification, then tested all nine cells. Under the maintenance hold I changed only technician/service and preserved the original matrix.",
    "activityId": "week-07"
  },
  {
    "week": 8,
    "title": "Get the Message Through",
    "skill": "Communication and negotiation",
    "room": "Council Studio",
    "output": "handoff-agreement",
    "summary": "Coordinate a recovery task when different people hold different constraints.",
    "missionUse": "Create an explicit agreement between Meridian's operator, investigator and station custodian.",
    "objectives": [
      "Convert a vague instruction into a message with action, object, condition and confirmation.",
      "Negotiate a sequence that respects constraints held by another role.",
      "Use read-back to detect a consequential misunderstanding."
    ],
    "materials": [
      "CO-01: analyst role pack",
      "CO-02: operator role pack",
      "Handoff and agreement record"
    ],
    "hints": [
      "State which object and which action; ‘do it’ is not an instruction.",
      "Ask what prevents the other role from acting before assuming reluctance.",
      "Have the receiver repeat the condition in their own words."
    ],
    "exemplar": "My message named Relay, two units and AMBER. The operator read back a different quantity, so we corrected it before acknowledging. The record shows the misunderstanding and its repair.",
    "activityId": "week-08"
  },
  {
    "week": 9,
    "title": "Play the Part",
    "skill": "Role-play and claim verification",
    "room": "Council Studio",
    "output": "claim-verification",
    "summary": "Represent a professional role, test contradictory claims and negotiate a justified agreement.",
    "missionUse": "Work with Meridian's custodian and researcher without mistaking confidence or status for evidence.",
    "objectives": [
      "Act within an assigned role's responsibilities while recognising other legitimate interests.",
      "Evaluate a claim using records rather than appearance or manner.",
      "Negotiate an agreement that identifies unresolved evidence."
    ],
    "materials": [
      "RP-01: Neri, Pell and Sen role briefs",
      "RP-02: comparison, mandate and capacity records",
      "Agreement worksheet"
    ],
    "hints": [
      "Ask which record could support or contradict the claim.",
      "A pause, confident voice or disguise is not reliable evidence of truth.",
      "State your role's responsibility without pretending it overrides every other role."
    ],
    "exemplar": "I checked all three claims rather than judging confidence. Verified-copy recovery met the original mandate. When authenticity required the original, I revised the agreement to stabilisation with supported handover.",
    "activityId": "week-09"
  },
  {
    "week": 10,
    "title": "Move Through the Model",
    "skill": "Simulated surveillance awareness",
    "room": "Movement Hall",
    "output": "sensor-route",
    "summary": "Predict fictional sensor observations and compare a route model with the actual event trace.",
    "missionUse": "Navigate Meridian's instrumented maintenance corridor under a published simulation contract.",
    "objectives": [
      "Apply explicit range and visibility rules in a spatial model.",
      "Compare predicted sensor events with a recorded trace.",
      "Revise a route after a rule or environmental condition changes."
    ],
    "materials": [
      "SN-01: grid and sensor contract",
      "SN-02: changed sensor condition",
      "Route prediction sheet"
    ],
    "hints": [
      "Mark the complete set of sensor cells before planning.",
      "Predict contacts from steps ending in those cells, including revisits.",
      "Rewind before replaying a revised route so the observed count starts at zero."
    ],
    "exemplar": "I predicted one contact when moving north through row 3, column 1. The event trace confirmed it. Moving east along row 5 first avoided that sensor row, but both routes could be explained with the same rule.",
    "activityId": "week-10"
  },
  {
    "week": 11,
    "title": "When the Plan Breaks",
    "skill": "Improvisation and team coordination",
    "room": "Operations Studio",
    "output": "revised-plan",
    "summary": "Preserve a working plan, diagnose a disruption and coordinate a justified revision.",
    "missionUse": "Respond to Meridian's changed equipment or evidence while keeping responsibility and verification clear.",
    "objectives": [
      "Identify which dependencies a disruption invalidates.",
      "Preserve the original plan and explain each consequential revision.",
      "Reassign work through an explicit, verified handoff."
    ],
    "materials": [
      "IM-01: baseline recovery rehearsal",
      "IM-02: equipment and evidence disruption cards",
      "Version comparison sheet"
    ],
    "hints": [
      "Name the failed dependency before replacing the whole plan.",
      "Keep decisions whose supporting evidence still holds.",
      "Give the revised responsibility to a named role and confirm the handoff."
    ],
    "exemplar": "The east trolley's loss invalidated transport, not the archive identity check. We preserved that finding, assigned the systems specialist to verify a support fixture and postponed movement until the coordinator confirmed it.",
    "activityId": "week-11"
  },
  {
    "week": 12,
    "title": "Recover the Impossible",
    "skill": "Integrated recovery performance",
    "room": "Meridian Station",
    "output": "recovery-record",
    "summary": "Combine the semester's capabilities in a documented recovery mission with several defensible resolutions.",
    "missionUse": "Complete Operation Last Light and defend the relationship between your objective, actions and result.",
    "objectives": [
      "Combine observation, systems diagnosis, investigation and coordination in a new setting.",
      "Verify that a recovery resolution satisfies its stated requirements.",
      "Defend decision quality using both successful and unsuccessful evidence."
    ],
    "materials": [
      "MR-01: Meridian mission charter",
      "MR-02: resolution requirements",
      "Mission debrief and contribution record"
    ],
    "hints": [
      "Make the objective explicit before choosing the route.",
      "Check that each earlier verification applies to the current scenario version.",
      "Explain the result with evidence from the run rather than a success label."
    ],
    "exemplar": "We selected verified digital recovery after the equipment failure. We preserved the physical archive in place and confirmed the copy against the current signed reference. Our result met the revised objective while leaving the scope of that reference explicit.",
    "activityId": "week-12"
  }
];
export function weekByNumber(week:number): WeekDefinition {
 const result=weeks.find(item=>item.week===week);
 if(!result) throw new RangeError("Choose a teaching week from 1 to 12.");
 return result;
}
export const weekFor = weekByNumber;
