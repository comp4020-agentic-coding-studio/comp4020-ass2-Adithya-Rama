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
    "summary": "Distinguish visible facts, reported claims and explanations, then choose an inspection that tests a proposed explanation.",
    "missionUse": "A1 uses this method to choose which workshop condition needs investigation. The final project uses it to keep an arrival impression from becoming an unsupported operating assumption.",
    "objectives": [
      "Distinguish a directly inspected feature, a reported claim and an inferred explanation.",
      "Choose an inspection whose possible results distinguish competing explanations.",
      "Revise a bounded conclusion while preserving what remains unknown."
    ],
    "materials": [
      "PG-01: arrival-room inventory",
      "PG-02: altered scene record",
      "Blank observation grid"
    ],
    "hints": [
      "Divide the room into regions and inspect each once.",
      "A statement about an object's location is different from a statement about who moved it.",
      "Choose the next record by which competing explanations it can distinguish, not by which is easiest to inspect."
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
    "summary": "Compare unaided recall, location cues and written notes, then choose a retrieval strategy appropriate to the task.",
    "missionUse": "Memory is optional support in A1 and handoffs. The final project does not require recall when an accurate external record serves the objective better.",
    "objectives": [
      "Record separate unaided, location-cued and written-note trials without concealing errors or assistance.",
      "Compare exact-item and order accuracy while identifying rehearsal limits.",
      "Choose a strategy based on note access, exactness and shared verification."
    ],
    "materials": [
      "MP-01: four-place academy route",
      "MP-02: practice and transfer lists",
      "Recall comparison sheet"
    ],
    "hints": [
      "Choose the four locations in an order you can reproduce.",
      "Give each item a distinctive association at its place.",
      "Compare unaided, cued and written-note trials; state whether the chosen context needs a durable shared record."
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
    "summary": "Reconcile a fixed diagram with a differently oriented scene, predict its transformation, then verify direction and height independently.",
    "missionUse": "A1 relates an unfamiliar workshop diagram to its connector. A physical final recovery may need this capability; a digital operation need not invent a transport problem.",
    "objectives": [
      "Keep world directions fixed while the object or viewpoint changes.",
      "Predict both labelled ports before rotating and test the prediction.",
      "Diagnose direction and level errors separately using a transformation record."
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
    "summary": "Distinguish mechanism faults using selected inspections, predict motion and verify a targeted repair.",
    "missionUse": "A1 combines mechanism diagnosis with observation and spatial modelling. Physical recovery and stabilisation can need a support mechanism; digital recovery need not repeat an unrelated cradle exercise.",
    "objectives": [
      "Predict gear direction and movement from the published relation.",
      "Use inspections to distinguish causes before changing apparatus.",
      "Verify a targeted repair against the whole required motion and changed target."
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
    "summary": "Choose circuit measurements that distinguish faults, repair what the evidence supports and verify the powered result.",
    "missionUse": "A2 requires a diagnosis another role can use. Final power checks support transmission or continuous support, and transport only when the selected route depends on power.",
    "objectives": [
      "Predict measurement patterns for two causes of the same dark output.",
      "Use paired powered readings or isolated continuity to justify a repair.",
      "Verify supply and output afterwards and state the model's limits."
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
    "summary": "Resolve conflicting records by separating authority, integrity and completeness while preserving a decision timeline.",
    "missionUse": "A2 uses this record to justify instructions to another role. Every final approach needs source evidence, but matching a digest does not itself choose the recovery objective.",
    "objectives": [
      "Separate authority, content comparison and completeness evidence.",
      "Compare candidate records against explicit criteria rather than labels alone.",
      "Preserve the decision timeline when an authenticated instruction changes."
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
    "summary": "Translate authority into testable permissions, diagnose deviations and preserve policy versions when requirements change.",
    "missionUse": "A2 needs legitimate relay access. The digital final approach uses the appropriate local policy; physical handover does not gain an arbitrary software gate.",
    "objectives": [
      "Derive expected decisions from governing clauses.",
      "Test useful and prohibited operations and diagnose discrepancies.",
      "Separate a behaviour repair from an authorised policy revision."
    ],
    "materials": [
      "CY-01: fictional role policy",
      "CY-02: test matrix and faulty rule",
      "Before/after permission audit"
    ],
    "hints": [
      "Write the intended role/action policy before testing.",
      "Check required actions as well as forbidden ones.",
      "Read the scope of the maintenance hold before changing expectations; preserve the matrix under its earlier mandate."
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
    "summary": "Coordinate across unequal information using questions, read-back and renewed confirmation when an instruction changes.",
    "missionUse": "A2 assesses a real handoff between partners. The final team uses this method when source findings, equipment conditions or responsibilities change another person's work.",
    "objectives": [
      "Identify missing action-critical information from the receiver's position.",
      "Use questions and full read-back to resolve misunderstanding before action.",
      "Reconfirm changed instructions and distinguish solo practice from pair evidence."
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
    "skill": "Negotiation and role responsibilities",
    "room": "Council Studio",
    "output": "claim-verification",
    "summary": "Negotiate legitimate responsibilities using verified records, multiple feasible proposals and explicit costs and obligations.",
    "missionUse": "The final team must defend a recovery objective and agree custody and monitoring obligations. This lab practises the judgement behind that agreement.",
    "objectives": [
      "Check specific claims without inferring honesty from appearance.",
      "Compare feasible proposals with distinct costs and responsibilities.",
      "Negotiate and revise explicit custody, verification, responsibility and timing terms."
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
    "skill": "Objective-led route planning",
    "room": "Movement Hall",
    "output": "sensor-route",
    "summary": "Choose a route for an explicit objective, predict its published sensor events and compare its dependencies with an alternative.",
    "missionUse": "A physical final recovery needs a route suited to its load and equipment. Digital and stabilisation approaches need relevant evidence rather than compulsory token navigation.",
    "objectives": [
      "Compare routes against an explicit objective and its distinct conditions.",
      "Predict a step-by-step contact trace using the cell-entry rule.",
      "Revise route or prediction after a changed map and defend the trade-off."
    ],
    "materials": [
      "SN-01: grid and sensor contract",
      "SN-02: changed sensor condition",
      "Route prediction sheet"
    ],
    "hints": [
      "Mark the complete set of sensor cells before planning.",
      "Predict contacts from steps ending in those cells, including revisits.",
      "Compare your route with its objective: rapid arrival, centre support or deliberate sensor coverage. Rewind before replay."
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
    "summary": "Identify dependencies invalidated by disruption, retain supported decisions and rehearse a revision without overwriting the original.",
    "missionUse": "The final project needs a reasoned change between contrasting rehearsals. Explain why its chosen objective remains feasible or why the team deliberately revises it.",
    "objectives": [
      "Classify earlier decisions as retained, requiring retest or invalidated.",
      "Compare a minimal revision with an alternative and explain objective changes.",
      "Rehearse a replacement, assign responsibility and preserve Version 1."
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
    "summary": "Select relevant capabilities for a recovery objective, coordinate their dependencies and defend the result and remaining obligations.",
    "missionUse": "This lab assembles the final-project evidence. The after-action account does not replace the performed mission or the assessment's individual and team deliverables.",
    "objectives": [
      "Select and justify capabilities relevant to the declared objective.",
      "Coordinate dependencies and preserve evidence when the approach changes.",
      "Defend the performed result, a credible alternative and a remaining obligation."
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
