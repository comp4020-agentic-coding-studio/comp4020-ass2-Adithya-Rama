# Author's supplied account

The following account was supplied directly by Adithya during implementation on 15 September 2026. It is the source for the personal intent in PROCESS.md, not a record of browser testing.

I chose the heist idea because I wanted the course to have a strong identity that a student would remember immediately, rather than designing another broad course that could already exist at a university. I liked the fantasy of becoming a mastermind and planning an “impossible heist”, but I did not want the course to depend only on the theme. The heist gave me a way to put students inside situations where they have incomplete information, conflicting evidence, people with different motivations, and plans that can fail even when they initially look perfect.

What I really wanted students to learn was how to make and defend decisions under uncertainty. I wanted them to distinguish evidence from assumptions, understand how different parts of a system depend on each other, think about the incentives of the people involved, and recognise when new information should force them to change their plan. That is why the course builds towards a complete plan by the middle of the semester and then deliberately breaks one of its assumptions. For me, the important skill is not producing a “perfect” plan on the first attempt, but being able to explain why a decision made sense, recognise when it no longer does, and revise it without pretending the original mistake never happened.

I also wanted the course to separate a good decision from a lucky outcome. A student should be able to fail the fictional heist and still demonstrate excellent reasoning, while another student could reach a successful ending for weak reasons. That became one of the principles behind the assessments: students are rewarded for evidence, reasoning, revision and their ability to defend trade-offs, rather than simply for “winning” the simulation.

The heist theme therefore became more than a visual style. I wanted every week to change the same operation so that the semester feels cumulative: students gather evidence, model the fictional system, form a crew, build a plan, discover its weaknesses, respond to disagreement and eventually defend the choices they made. My aim was for someone to arrive because the idea of a mastermind academy sounds fun, but leave having practised a much broader skill—thinking carefully when the information, people and conditions around a decision refuse to stay fixed.

## Redesign direction supplied after the first implementation

The user explicitly rejected the first result: “i m not satisfied at all with what has come out”. They explained that the original attraction was learning unusual skills people are curious about, including mechanisms, memory, electronics and digital systems. They asked to plan the curriculum again before rebuilding.

They then asked for a “highly interactive” experience with “3d sort of expeirence everywhere be it labs assignemnets or final project” and a game-like learning experience.

During planning the user selected a mastermind skills academy, a recovery mission, both physical and complete browser labs, a third-person character with close-up equipment views, and stylised cinematic visuals. They approved the full learning loop and the complete multi-domain curriculum, with safe fictional and simulated systems.

For collaboration, they explicitly selected a shared mission with distinct role information and tools, one browser/session, screen sharing or rotating control, and solo completion. They required the site to remain self-contained on GitHub Pages, without runtime multiplayer services.

The user then instructed: “implement the plan end-end”.

These are conversation-derived directions, not claims that the user has played or accepted the redesigned implementation. Agent reviews and automated checks are recorded separately.


## 19 September — Demonstrations and student experience

The user said the direction works and should continue, while asking for more visual polish and skill practice that feels precise, personalised and enjoyable. Their review questions were whether a student understands the skill, sees why it matters, genuinely practises it and wants to return.

They added a specific requirement: every lab, assignment and final project must have a complete, similar but different demonstration scenario, analogous to a finished example website supplied alongside a website assignment. Students should be able to watch a hands-free 3D demonstration or take control themselves. They explicitly asked to make use of 3D skills.

This supports the demonstration-studio extension: sixteen alternate scenarios, causal before/after scenes, selectable coaching, learner controls, complete sample artefacts and a worked recovery project. It does not establish that the user played or accepted every individual activity.

## 20 September — Questions that changed the acceptance criteria

The user said the lab, assessment and project instructions were unclear, including what “observation”, “claim”, “inference”, “inspect” and the six lesson stages meant. They asked for clear instructions throughout the course and a fullscreen mission checklist that would let students finish the practical activity before writing their observations.

They supplied a screenshot showing oversized and overlapping controls and reported that mouse capture prevented selecting answers or scrolling the task panel. They specified an X-key toggle: a free cursor for controls, optional locked-cursor mouse-look, and click-and-drag turning when unlocked.

The user asked who the person behind the desk represented and why all the evidence was on one desk. They then required the instructor to be clearly identified and outside the investigated area, with objects placed by function: a wall clock, a working desk for the mug and ledger, the note beside it, and a wall-mounted hatch. They explicitly asked for that level of detail across all labs, assignments and the project.

They requested narrated worked examples that explain the expected task before starting, state what the demonstrator is doing at each step, and finish by explaining the observations and completed work.

Finally, the user challenged whether every worked example was different from its assigned task: “the worked example isnt same as the task they r assigned to do by themselves?.. that would be an horrible error on our part”. This repeats the separation requirement they had already supplied; it does not claim that they personally audited every example.

The consequential-overlap findings, code changes and browser results that followed are the implementation agent's evidence in [the separation audit](EXAMPLE-SEPARATION-AUDIT.md) and commit [1c215a0](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Adithya-Rama/commit/1c215a0). The author directions above support refreshing PROCESS.md; they do not establish personal playtesting, learning outcomes, final acceptance of each activity or publication.

## Final review directions

The user requested a thorough check against the rubric, then asked whether the site looked and worked like a real university course website and asked for missing elements to be implemented. They also explicitly asked to keep PROCESS.md, CLAUDE.md and the existing reflections/README.md current.

The resulting course-guide, teaching-consistency and final-mission changes are agent implementation work recorded in [the rubric audit](RUBRIC-AUDIT.md). This request does not establish a grade, a new student playtest or the user's personal acceptance of every change.


## 21 September — The mission must be experienced

The user supplied an external critique contrasting a sequence of training exhibits with an explorable recovery operation. Their explicit request extended the agent-mission experience to every lab, assignment, final project and demonstration, rather than reserving it for the final.

After the agent explained the desired loop as objective, exploration, obstacle, investigation, skill, consequence and recovery, the user confirmed: “exactly you have now precisely understood what i m after”. They said students should feel like they are playing a game, learn along the way and finish “a proud agent” after a successful recovery.

This is approval of the design direction and an aspiration for student enjoyment. It is not evidence that the user played or accepted the resulting implementation. The agent's implementation, independent review and validation are recorded in [FIELD-MISSIONS.md](FIELD-MISSIONS.md).

## 21 September 2026 — academic course first; preferred in-person delivery

The author accepted the lab, assignment and project work but said the site still needed to look and function as a university course website. They supplied the Round Trip course and requested an ANU-style overview of the course code, purpose, audience, learning and study expectations before entering activities.

They then clarified: “the course shld be advertised as in-person/online with in-person being the major preference” and explained that the 3D activities exist for students who cannot attend. This supports a preferred facilitated campus route, an equivalent online route and a homepage that introduces the academic course. It does not establish physical classroom delivery, live online teaching or student acceptance of the new pages.

## 21 September: independence, rather than repeated recovery puzzles

The author asked whether the course had become escape-room training and requested a hard critique. After receiving that critique, the author supplied a further review arguing that a narrow subject does not require repetitive recovery scenarios. The author approved the revised plan with **perfect do it**. Accepted changes: one field-operation question; varied weekly outcomes; deeper diagnosis and negotiation; clear controls without solution recipes; conditional final requirements; alternate demonstrations that teach method selection; preserved in-person preference and online access. This is supplied direction, not evidence of a classroom trial or acceptance of the finished revision.
