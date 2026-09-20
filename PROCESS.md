# Process overview

I wanted a course students would remember immediately, built around becoming a mastermind. Its attraction was acquiring unusual capabilities: observation, memory, mechanisms, electronics, digital investigation and coordinating a crew. My view of a good course is that its theme gives students a reason to practise, while every week changes what they can do in the same larger problem. Good reasoning should matter more than a lucky outcome.

The design references support that position. [How to Make Almost Anything](https://fab.cba.mit.edu/classes/863.25/) illustrates capabilities accumulating across a semester; [ANU's teaching pages](https://comp.anu.edu.au/courses/comp1720/lectures/) support direct access to dated material. These became cumulative outputs and academic pages accessible independently of game progress.

My first plan emphasised decisions under uncertainty. The harness in [4c8495d](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Adithya-Rama/commit/4c8495d) and implementation in [bc31705](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Adithya-Rama/commit/bc31705) made that coherent, but I was dissatisfied. Learning distinctive skills had become describing and organising a fictional plan. I asked to reconsider the curriculum before rebuilding.

In [8aca1cd](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Adithya-Rama/commit/8aca1cd), twelve capability models accumulate into Operation Last Light. Equipment responds to configuration, diagnosis requires measurements, and changed evidence can invalidate a choice. I required practice, feedback, transfer and later reuse in [CLAUDE.md](CLAUDE.md), while leaving implementation choices within the fixed Astro platform to the agent.

I also required complete, similar but different demonstrations. [454d568](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Adithya-Rama/commit/454d568) added sixteen examples. My later question was whether they really differed from assigned work. In [1c215a0](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Adithya-Rama/commit/1c215a0), the correction changed consequential reasoning, including a two-fault diagnosis. Renaming equipment would have been easier but would still reveal the same solution. The harness and [separation tests](spec/example-separation.test.ts) now compare meaningful differences across browser, campus and changed-condition cases.

My latest correction went deeper. Even a complete course with clear controls could feel like visiting training exhibits. I wanted students to experience an agent mission: discover an obstacle, investigate it, use a skill, see a consequence and complete a recovery. I explicitly extended that requirement to labs and demonstrations. Enjoyment and the pride of returning from a successful mission were design intentions, not outcomes I could claim from passing tests.

This became a shared performed-operation model: verified equipment enables an intervention; a case or receipt must follow its handover; changing supporting evidence reopens dependent work. Watch and Take Control use those rules with separate records. Adding cinematic labels alone would have been simpler, but would not change what the learner actually does. The [implementation record](docs/FIELD-MISSIONS.md) documents the concrete changes and verification.

The agent's independent review found paused-scene actions could stall, historical saves could satisfy a new prerequisite, and a collected original remained visible on its pedestal. Those findings produced changes to movement, validation and rendering. I treat these as agent observations, not personal playtesting. [Logic tests](spec/field-operation.test.ts) and [rendered journeys](tests/browser/field-world.e2e.ts) examine different promises; neither establishes learning or enjoyment.

I remain responsible for the course's purpose and for challenging substantial work that misses it. Originality, appeal and educational value remain human judgements. The intended result is a student who arrives for the agent fantasy and leaves better able to observe, test, coordinate and revise. Local verification and publication remain separate.

*Edited with coding-agent assistance from my supplied [account and subsequent directions](docs/AUTHOR-NOTES.md).*

*Evidence: [course and rubric audit](docs/RUBRIC-AUDIT.md) · [performed mission review](docs/FIELD-MISSIONS.md).*

![The academy homepage reviewed during the redesign](docs/evidence/redesign/home-desktop.png)
