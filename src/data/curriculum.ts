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
    "exemplar": "Separate demonstration: I recorded 11:35, the green mug and the closed hatch. I kept ‘I checked every tray’ as the note author's claim. My thirty-five-minute duration estimate lacked a start time. The later 11:50 reading and open hatch showed changes, not who caused them.",
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
      "Compare an unaided attempt with a location-cued attempt, recording item and order scores and the limits of the comparison.",
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
      "Record an unaided baseline and cued attempt separately, including item and order scores; extra rehearsal limits the comparison."
    ],
    "exemplar": "Separate demonstration: My storm-kit baseline contained Lens and Beacon only. The location cues helped me retrieve all four items in the guided attempt, but I later substituted ‘book’ for Pocket atlas. I preserved the error and strengthened the atlas cue instead of claiming perfect memory.",
    "activityId": "week-02"
  },
  {
    "week": 3,
    "title": "Think in Three Dimensions",
    "skill": "Spatial reasoning and navigation",
    "room": "Spatial Lab",
    "output": "spatial-model",
    "summary": "Track labelled directions through a rotation, change height independently and verify both conditions.",
    "missionUse": "Reconstruct Meridian's layout and relate maintenance diagrams to the space around you.",
    "objectives": [
      "Keep world directions fixed while the object or camera moves.",
      "Predict where labelled ports move after a clockwise rotation.",
      "Change floor level independently and verify direction and height together."
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
    "exemplar": "Separate demonstration: In the dome example, I predicted north→east and west→north before the quarter-turn. I then raised the connector to level 2. When the target moved to level 1, I changed height alone because the labelled port directions still matched.",
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
      "ME-02: changed output and cam requirements",
      "Causal diagram sheet"
    ],
    "hints": [
      "Identify the input, transmission and output before operating the assembly.",
      "Two externally meshing gears turn in opposite directions.",
      "Check the interlock state before treating resistance as a failed gear."
    ],
    "exemplar": "Separate demonstration: I calculated 18 ÷ 30 × 5 = 3 opposite output turns. The interlock, 270-degree cam and spring checks made that prediction testable. For two turns from four inputs, I changed the follower to 36 teeth and retained the valid readiness conditions.",
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
    "exemplar": "Separate demonstration: The nine-volt beacon's first trace supported a cable repair. Afterwards every supply point read 9 V, but the lamp remained dark. I preserved that failed verification, isolated power, confirmed an open lamp and replaced it. I verified both light and supply before calling the whole repair complete.",
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
      "Keep a decision timeline linking each archive choice to its governing requirement and remaining limits."
    ],
    "materials": [
      "DI-01: three archive-copy records",
      "DI-02: signed reference and amendment",
      "Timeline worksheet"
    ],
    "hints": [
      "A filename describes a label, not proven authenticity.",
      "Compare the source record, integrity result and modification time.",
      "Keep a written timeline linking each decision to its governing requirement; preserve observations separately from explanations."
    ],
    "exemplar": "Separate demonstration: North met authenticated R1. I retained it when an unsigned East request arrived. Only authenticated R2 and the separately verified South S2 repair justified my new choice. My timeline keeps the old South, the unchanged decision and the later revision with their sources.",
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
    "exemplar": "Separate demonstration: I removed maintainer research access and restored reader access under the observatory embargo charter. After all nine checks passed, a release hold changed only custodian approval. I kept the bug repair and the later policy change as separately justified versions.",
    "activityId": "week-07"
  },
  {
    "week": 8,
    "title": "Get the Message Through",
    "skill": "Structured communication and read-back",
    "room": "Council Studio",
    "output": "handoff-agreement",
    "summary": "Pass an exact instruction between role views and use read-back to catch a misunderstanding.",
    "missionUse": "Create an explicit agreement between Meridian's operator, investigator and station custodian.",
    "objectives": [
      "Replace a vague dispatch instruction with a destination, quantity, code and confirmation.",
      "Identify the information a receiver needs without assuming they can see the sender's card.",
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
    "exemplar": "Separate demonstration: The Dome message requested five cases and VIOLET. The operator first repeated four, so we corrected and confirmed all three fields. For Pool, two and SILVER, we made a fresh read-back. The first confirmation could not approve a changed instruction.",
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
    "exemplar": "Separate demonstration: Rin's claim was supported by the two matching twelve-section records, and the seven-unit original fit the nine-unit cart. A later remote-access request changed our agreement from planned physical handover to a Cedar copy. We kept the original with Ada and preserved the unexecuted plan.",
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
      "Apply the published cell-entry rule to predict sensor contacts along a route.",
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
    "exemplar": "Separate demonstration: My first gallery route made one contact; the alternative made zero under the same sensor set. The changed coverage made the alternative record three. I preserved each route and count with its governing map before choosing by the stated objective.",
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
    "exemplar": "Separate demonstration: The dispatch notice withdrew authority without closing a route. I retained the signed identity result, inserted scope and authorisation checks before sealing, and assigned their owners. Version 1 remained visible. Confirming the plan did not prove dispatch had happened.",
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
    "exemplar": "Separate demonstration: I recovered Ash under the twelve-record W-6 request, recorded the confirmed handoff and kept the rainfall recorder at its mast. The support test and identity comparison justified those decisions. My after-action account left calibration unresolved rather than treating a matching digest as scientific validation.",
    "activityId": "week-12"
  }
];
export function weekByNumber(week:number): WeekDefinition {
 const result=weeks.find(item=>item.week===week);
 if(!result) throw new RangeError("Choose a teaching week from 1 to 12.");
 return result;
}
export const weekFor = weekByNumber;
