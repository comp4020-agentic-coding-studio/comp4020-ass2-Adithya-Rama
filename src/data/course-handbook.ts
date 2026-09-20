/** Course-owned participation facts. Dates, outcomes and assessment records
 * remain in their existing canonical sources. */
export const courseHandbook = {
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
    "Choose the browser or campus route, then keep a place for your prediction, result and explanation.",
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
