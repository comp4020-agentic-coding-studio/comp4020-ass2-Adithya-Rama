/** Course-owned participation facts. Dates, outcomes and assessment records
 * remain in their existing canonical sources. */
export const courseHandbook = {
  question: "How can a team complete a fictional field operation when its information is incomplete, its equipment is unreliable, and its members have different responsibilities?",
  overview: "Learn to investigate unfamiliar field situations, diagnose model systems and coordinate decisions when no one person has the whole picture. Guided experiments develop into independent challenges, then a team operation at fictional Meridian Station.",
  capabilities: [
    {title:"Observe",question:"What is present, and what have we missed?",description:"Build a reliable record, distinguish a report from an observation, and choose memory aids that suit the task."},
    {title:"Investigate",question:"Which explanation does the evidence support?",description:"Compare sources, test competing claims and state what remains unknown."},
    {title:"Diagnose",question:"What does this system need, and what has failed?",description:"Use spatial and causal models to choose informative tests before changing equipment."},
    {title:"Coordinate",question:"How can different responsibilities support one decision?",description:"Exchange information, negotiate feasible terms, revise dependencies and confirm the resulting action."},
  ],
  academicUnit: "Academy of Impossible Skills",
  convenorId: "mara-voss",
  delivery: "In person (preferred), with an online option for students unable to attend campus.",
  stages: [
    {from:1,to:4,title:"Observe and model",description:"Build reliable observations and recall, represent space and explain mechanisms. Combine these capabilities in the individual workshop."},
    {from:5,to:8,title:"Diagnose and coordinate",description:"Trace faults, compare digital evidence, test permissions and communicate across roles. Combine them in the paired relay."},
    {from:9,to:12,title:"Adapt and recover",description:"Negotiate constraints, test routes, revise a failed dependency and bring the semester's capabilities together in the final team recovery."},
  ],
  audience: "Students interested in intricate puzzles, how systems work, and collaborative problem-solving.",
  prerequisites: "Basic logical reasoning and a willingness to explain your decisions. No programming, electronics or security background is required.",
  workload: {
    briefingHours: 1,
    labHours: 2,
    independentHours: 3,
  },
  preparation: [
    "Open the week's briefing and read its learning objectives and preparation list.",
    "Inspect the supplied rules and case files. They contain the information needed for the activity.",
    "Watch the alternate worked example if you want to see the method and a finished record first.",
    "Prepare for the in-person lab using its campus pack, or choose the equivalent online route if you cannot attend. Keep a place for your prediction, result and explanation.",
  ],
  support: [
    {
      personId: "mara-voss",
      question: "A mechanism, circuit, spatial model or sensor prediction behaves differently from what I expected.",
      bring: "Bring the configuration, your prediction, the observed result and the checks already tried.",
    },
    {
      personId: "iona-vale",
      question: "I cannot tell what a record proves, which source applies, or whether a permission or agreement is justified.",
      bring: "Bring the exact claim, relevant source, competing interpretation and the uncertainty you need to resolve.",
    },
    {
      personId: "sol-renn",
      question: "I need help with recall, a handoff, contribution records, an accessible route or assessment arrangements.",
      bring: "Bring the activity or assessment name, your saved record and the specific instruction or arrangement that needs clarification.",
    },
  ],
} as const;

export const weeklyWorkloadHours =
  courseHandbook.workload.briefingHours +
  courseHandbook.workload.labHours +
  courseHandbook.workload.independentHours;
