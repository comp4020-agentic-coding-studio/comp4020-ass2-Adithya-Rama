/** Who and what belongs to each authored task. Decorative assets never add hidden evidence. */
export interface SceneContext {
  title: string;
  setting: string;
  people: string[];
  evidence: string;
  apparatus: string;
}

const contexts: Record<string, SceneContext> = {
  academy: {
    title: "Who and what you are seeing",
    setting: "The academy is a teaching environment with specialist practice rooms.",
    people: ["You control the student. Dr Mara Voss is the teaching guide. Labelled council dossiers represent roles; their names identify who is speaking."],
    evidence: "Use the objects, readings, documents and rules named by the current activity. Background furniture, the instructor and the student are not hidden clues.",
    apparatus: "A mechanism or circuit on a workbench is a training rig. A route grid or station diagram is a scale model; its published rules describe what it represents."
  },
  'lab:01': {
    title: "Who and what belongs to this scene",
    setting: "Three observation scenes: Practice, Skill check and Transfer challenge.",
    people: ["The owner mentioned in the Practice explanation is not shown. The Transfer operator is a source in a written report, not Dr Mara Voss."],
    evidence: "Inspect the clock or display, cup or flask, door or service hatch, and written account. Classify the message asserted by a note as a claim; seeing that the note exists is an observation.",
    apparatus: "The clock, door and service hatch belong to the room. The cup and ledger belong on the desk; the Skill check cup belongs on its shelf. Compare each phase using its supplied scene record."
  },
  'lab:02': {
    title: "People, memory cues and scenery",
    setting: "An ordered memory route: Atrium, Fountain, Workshop and Observatory.",
    people: ["You are the learner practising recall. No person in the room is an item to memorise unless the task explicitly names one."],
    evidence: "Recall the four published items in route order. Your own associations are memory aids, not extra facts about the scene.",
    apparatus: "The locations and item displays are labelled memory cues. The surrounding academy room is not an additional recall test."
  },
  'lab:03': {
    title: "People and the spatial model",
    setting: "A labelled connector model with world directions and three levels.",
    people: ["You operate the connector. Mara explains the model; her facing direction does not define north."],
    evidence: "Use the connector labels, fixed world axes, rotation and level. The camera view is not a change to the object.",
    apparatus: "The connector and level platform are a teaching model. Their labels define directions and height; the workbench is support furniture."
  },
  'lab:04': {
    title: "People and the mechanism rig",
    setting: "A purpose-built gear, cam, spring and interlock rig.",
    people: ["You diagnose the rig. Mara is the instructor, not the cause of its configured fault."],
    evidence: "Use the published tooth counts, input turns, required cam position and observed motion.",
    apparatus: "The exposed workbench assembly is a training mechanism. It demonstrates dependencies; it is not a full building lift or a real lock."
  },
  'lab:05': {
    title: "People and the circuit rig",
    setting: "A six-volt model circuit with a configured open component.",
    people: ["You take measurements and verify the repair. Mara provides guidance; her gestures are not electrical readings."],
    evidence: "Use probe locations, measured voltage, isolated continuity results and the lamp output.",
    apparatus: "The source, fuse, cable and lamp form a labelled bench test circuit. Other lights in the room are scenery and do not report its state."
  },
  'lab:06': {
    title: "People and source records",
    setting: "A supplied digital archive with three candidate copies and a signed reference.",
    people: ["The signer is represented by the published source record. Mara is not the signer and does not make a candidate correct by standing near it."],
    evidence: "Compare section counts, checksums, timestamps and the current signed requirement. A later timestamp does not establish authenticity.",
    apparatus: "Books, screens and archive objects represent digital records. Read their labelled data; their colour, age or position does not establish authority."
  },
  'lab:07': {
    title: "People and permission roles",
    setting: "An invented local permission matrix.",
    people: ["Observer, technician and registrar are test identities in the matrix. They are not the visible student, Mara, or permissions attached to a character model."],
    evidence: "The published role/action rules define expected access. Compare every allow and deny result with those rules.",
    apparatus: "The console represents a self-contained policy test. Nothing in the surrounding room grants access."
  },
  'lab:08': {
    title: "Who sends and who receives",
    setting: "An analyst and operator exchange a delivery instruction.",
    people: ["You or your partner take the analyst and operator roles using their cards. Council dossiers identify each role; a visible card does not confirm a message automatically."],
    evidence: "Use the current destination, quantity, code and explicit read-back. A gesture or the instructor's presence is not acknowledgement.",
    apparatus: "The dispatch table and cases visualise the message. The role cards and response fields specify who knows what and whether the handoff is confirmed."
  },
  'lab:09': {
    title: "Who is making each claim",
    setting: "A council whose claims must be checked against records.",
    people: ["Operator Neri, Custodian Pell and Engineer Sen appear in the supplied claim and role cards. They are distinct fictional roles, not Mara or the student; council dossiers identify the speakers. You act as mediator."],
    evidence: "Check Neri against the comparison log, Pell against Mandate 4, and Sen against the cart and cradle capacity records. Appearance and confidence do not establish truth.",
    apparatus: "The council table represents a discussion. Capacity bars and documents model the dispute; a miniature object is not evidence that the original has already moved."
  },
  'lab:10': {
    title: "People and the route model",
    setting: "A five-by-five grid with published sensor cells.",
    people: ["The route marker represents the traveller being modelled. Your student avatar and Mara are not extra sensor targets."],
    evidence: "Count recorded steps ending in marked sensor cells, including repeat entries. Use the phase's published sensor set.",
    apparatus: "The floor grid is a navigation model. Walking the student around the academy does not execute grid steps or add sensor contacts."
  },
  'lab:11': {
    title: "People and planning responsibilities",
    setting: "An original recovery plan followed by a published disruption.",
    people: ["Systems specialist and coordinator are responsibilities you assign in the revised plan. Mara does not perform a check merely because her character is present."],
    evidence: "Use the disruption notice and surviving records. Preserve Version 1, identify the affected dependency, and name who will verify the replacement.",
    apparatus: "The operations board is a plan model. Moving or displaying a plan is not proof that its physical actions have been completed."
  },
  'lab:12': {
    title: "People and the after-action record",
    setting: "An account of your completed Operation Last Light run.",
    people: ["Use the observer, systems specialist, investigator and coordinator roles recorded in your mission. Name actual student contributions separately from fictional role names."],
    evidence: "Cite the mission action trace, checks, objective and result. Your narrative should explain that record rather than replace it.",
    apparatus: "The operations display summarises a run. Complete the practical mission in Operation Last Light before using this after-action worksheet."
  },
  'demo:lab-01': {
    title: "Who is in the conservatory example",
    setting: "An alternate conservatory observation scene.",
    people: ["The gardener is mentioned in the note and the explanation being tested. The gardener is not shown. Mara is the instructor; the student is the example learner. Neither is evidence of who checked the trays or opened the hatch."],
    evidence: "Inspect the clock, green mug, ledger, note and hatch. The note's account may be checked; the instructor's presence and movements are not clues.",
    apparatus: "The clock and hatch belong to the room; the mug, ledger and note belong on the desk. The changed scene must be compared with the original record."
  },
  'demo:lab-02': {
    title: "Who is practising recall",
    setting: "A memory route with Gate, Pool, Press and Dome landmarks.",
    people: ["The demonstrator is the example learner. Mara guides the lesson; neither character is one of the four items to recall."],
    evidence: "Use the supplied objects and published location route. Baseline and later recall results belong to this example learner.",
    apparatus: "The landmarks are memory anchors and the objects are retrieval cues. The example's improvement is not a claim about your own memory."
  },
  'demo:lab-03': {
    title: "People and the dome connector",
    setting: "A telescope connector model with north and west ports.",
    people: ["The demonstrator is the example learner operating the model. Mara remains its teaching guide."],
    evidence: "Use world directions, marked ports, clockwise rotation and level. Character and camera orientation do not change world north.",
    apparatus: "The connector on the platform is a spatial model, not a full observatory dome."
  },
  'demo:lab-04': {
    title: "People and the model lift",
    setting: "A conservatory lift represented by an exposed mechanical training rig.",
    people: ["The example learner diagnoses and operates the lift model. Mara's gestures explain the task; they do not complete a repair."],
    evidence: "Use the eighteen-tooth driver, specified follower, interlock, cam and spring conditions.",
    apparatus: "The bench assembly is the lift's teaching model. Its gear output represents the specified lift behaviour."
  },
  'demo:lab-05': {
    "title": "People and the beacon with several possible faults",
    "setting": "One nine-volt bench beacon remains under investigation throughout; its case rule permits simultaneous faults.",
    "people": [
      "The example learner performs the recorded tests and repairs. Mara is the teaching guide; her gestures and the room lights are not measurements."
    ],
    "evidence": "Use named probe readings, isolated continuity and the same beacon’s light output. Preserve any failed verification after a repair; a repaired prerequisite does not prove the whole device works.",
    "apparatus": "The beacon is one labelled circuit rig. It is not exchanged for a second specimen between chapters. Its multiple-fault rule differs from the assigned lab’s one-fault configurations."
  },
  'demo:lab-06': {
    "title": "People, proposed instructions and verified authority",
    "setting": "Weather-ledger versions are compared with an authority register, including an unsigned proposal and a later authenticated instruction.",
    "people": [
      "The requesters are represented through supplied messages and authority records. Mara does not authenticate a request by standing near it; the example learner checks the case’s register."
    ],
    "evidence": "Check whether an instruction is authenticated, then compare the required completeness and identity. Keep an unverified message as a claim and preserve old record versions when a repaired version arrives.",
    "apparatus": "The displayed books represent record versions, not their authors. Labels and timestamps identify a version; the supplied authority and comparison records justify using it."
  },
  'demo:lab-07': {
    "title": "Who the embargo roles represent",
    "setting": "A local telescope charter separates research reading from equipment service.",
    "people": [
      "Reader, maintainer and custodian are policy identities, not the visible learner or instructor. Maintainers have a specific research-reading restriction in this example."
    ],
    "evidence": "Use the embargo charter, observed faulty table and later release hold. The maintainer’s equipment role does not imply permission to read research.",
    "apparatus": "The matrix represents nine role/action decisions. Its labels and charter define authority; character appearance or location does not."
  },
  'demo:lab-08': {
    title: "Who sends the delivery instruction",
    setting: "An analyst holds the delivery card; an operator controls dispatch.",
    people: ["Analyst and operator are roles in the example exchange. Council dossiers identify the speakers; Mara is not either person."],
    evidence: "Read the card, the operator's read-back and the analyst's confirmation. Preserve the count correction instead of assuming a nod proves understanding.",
    apparatus: "The dispatch table and cases represent a delivery instruction. The response controls record its destination, quantity, code and acknowledgement."
  },
  'demo:lab-09': {
    "title": "Who speaks in the changing-brief council",
    "setting": "Ada, Rin and Bo prepare a physical handover to Mira; a replacement request arrives before dispatch.",
    "people": [
      "Ada is caretaker, Rin compares copies and Bo checks capacity; their labelled dossiers identify the council roles. Mira is the proposed recipient named in the written record, not an additional person shown in the 3D scene. None is Mara. The example learner mediates."
    ],
    "evidence": "Matching digests corroborate a limited claim; the seven-unit original fits the nine-unit cart. The replacement brief changes the required outcome before dispatch.",
    "apparatus": "The council display represents evidence and proposed agreements. Capacity does not prove movement occurred, and role dossiers are not additional witnesses."
  },
  'demo:lab-10': {
    title: "Who the route marker represents",
    setting: "An instrumented five-by-five gallery model.",
    people: ["The route marker is the modelled traveller. The instructor and student avatar are outside the sensor calculation."],
    evidence: "Use the listed route, sensor cells and recorded contacts, then compare the revised sensor set.",
    apparatus: "The grid models the gallery; its numbered cells define movement. Walking elsewhere in the teaching room does not run the route."
  },
  'demo:lab-11': {
    "title": "Who verifies the new authority",
    "setting": "A dispatch plan receives a new authorisation prerequisite while routes and equipment stay available.",
    "people": [
      "The investigator checks recipient scope. The coordinator receives the result and records replacement authority before sealing. These are assigned responsibilities, not actions performed by Mara."
    ],
    "evidence": "Use the superseding notice, unchanged identity record, revised order and acknowledged stop condition. An open route is not release authority.",
    "apparatus": "The before/after boards represent plan versions. They do not prove permission was granted, a case was sealed or a delivery occurred."
  },
  'demo:lab-12': {
    title: "Who is responsible at Lark Weather Mast",
    setting: "A team recovers verified rainfall data while preserving the original recorder.",
    people: ["The operator's completeness report and the custodian's handling agreement appear in the example records. Neither person is Mara. The demonstrator is the example learner following the team's decisions."],
    evidence: "Check the operator's claim against the manifest; use the custodian's agreement and confirmed handoff for custody.",
    apparatus: "The room presents the recorder's observation scene, a model lift and record candidates. Each chapter states which apparatus or record it represents."
  },
  'demo:assessment-fieldwork': {
    title: "Whose portfolio is this",
    setting: "The academy record desk assembles an authored example portfolio.",
    people: ["The demonstrator is a fictional example student. Mara is the instructor; the displayed records are not your own completed work."],
    evidence: "The example includes attempts, corrections, transfers and reflections from the alternate labs. Preserve attribution when using its structure.",
    apparatus: "The record desk and boards show how evidence is organised. Downloading the example does not complete your fieldwork."
  },
  'demo:assessment-a1': {
    title: "Who is in the botanical workshop",
    setting: "An alternate botanical transfer workshop and model carriage.",
    people: ["The demonstrator is the example student. The note's writer and the person in the hurried-departure explanation are not identified by a visible character; Mara is the instructor."],
    evidence: "Observe the clock, white jar, ledger and window; treat the Tray Delta note as a claim. Then use the published memory, connector and mechanism rules.",
    apparatus: "Room fixtures belong in the observation scene. The connector and exposed carriage mechanism are separate teaching rigs used in later chapters."
  },
  'demo:assessment-a2': {
    "title": "Who Ari and Nia are",
    "setting": "Iris Relay: a twelve-volt dark-load diagnosis and mirrored-core versus calibration-trace records.",
    "people": [
      "Ari and Nia are the example student pair. They rotate operator, analyst, sender and receiver responsibilities. The controllable example student lets you try either role; Mara is the instructor, not Ari or Nia."
    ],
    "evidence": "Use the full-supply voltage trace, isolated lamp continuity, verified output, signed content scope, nine policy decisions and corrected read-backs. Two identical mirrors can both be valid under one request; a larger trace bundle needs its own scope justification.",
    "apparatus": "The circuit and console are labelled teaching models. Reader, maintainer and custodian are policy identities, distinct from the pair. Archive book models identify records; their colours and positions do not establish authority."
  },
  'demo:assessment-final': {
    title: "Who belongs to Operation Lamplight",
    setting: "Halcyon Observatory: an alternate worked final mission.",
    people: ["Lena observes and navigates; Omar diagnoses systems; Priya investigates; Jonah coordinates. They are the example team named in the narration and contribution records. The controllable student lets you try their decisions; Mara remains the instructor.", "Quill is the original's custodian and Venn is the named recipient in custody and receipt records. They are not Mara or the student. Their statements and receipts are evidence to check; the labelled council dossiers identify these roles."],
    evidence: "Use the labelled arrival evidence, apparatus readings, signed references, capacity limits, routes and custody receipts. Keep the baseline, revised rehearsal and final run separate.",
    apparatus: "The observation room depicts arrival details. Other chapters use labelled lift, circuit, route and planning models; they do not depict every physical action at full scale."
  },
  'mission:a1': {
    title: "Who is in the Sealed Workshop",
    setting: "The individual assessment trial combines independent observation, orientation and mechanism diagnosis. Recall is an optional information aid.",
    people: ["You are the student. Observer / Navigator and Systems Specialist are responsibilities you select to access their tools, not extra people. Mara is the teaching guide."],
    evidence: "Use the arrival inventory and manifest, the labelled north arrow and the cradle's gear and brake state. Background characters are not additional inventory items.",
    apparatus: "The arrival objects form an inspection station; the connector plan and recovery cradle are labelled teaching models. Their states, not the surrounding furniture, determine trial checks."
  },
  'mission:a2': {
    title: "Who takes each relay responsibility",
    setting: "The pair assessment trial combines a circuit, archive comparison, permissions and handoff.",
    people: ["You and your partner record your own contributions. Systems Specialist, Investigator and Coordinator are selectable responsibilities. Mara is the instructor; the receiving role is represented by the handoff record."],
    evidence: "Use the circuit measurements, current source reference, role/action policy and complete handoff with the receiving role’s current acknowledgement code. Sender and receiver hold distinct information. Observer, technician and registrar are permission identities, distinct from the students.",
    apparatus: "The bench circuit, archive display and dispatch controls are teaching stations. A character standing near them does not operate or approve them automatically."
  },
  'mission:recovery': {
    title: "Who belongs to Operation Last Light",
    setting: "Meridian Station, represented through six linked mission zones.",
    people: ["Your team takes Observer / Navigator, Systems Specialist, Investigator and Coordinator responsibilities. Solo practice uses the same student avatar while switching roles. Mara is a teaching guide outside the recovery team.", "The station custodian speaks through the handling conditions and agreement response. The handover recipient is the person you explicitly name. Neither is identified by Mara's model or an unlabelled character."],
    evidence: "Use inventory, measurements, archive and policy records, the custodian's conditions, confirmed handoff, route tests and preserved plan versions.",
    apparatus: "Arrival details depict the inspection site. Cutaway equipment, route diagrams and plan boards are labelled mission models; they are not miniature clues to interpret outside their stated rules."
  }
};

export function getSceneContext(id: string): SceneContext {
  return contexts[id] ?? contexts.academy!;
}

export const sceneContextIds = Object.keys(contexts);
