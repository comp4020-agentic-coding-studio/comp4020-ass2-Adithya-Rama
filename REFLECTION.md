# Assignment 2 reflection — retro notes

These optional notes draw from [PROCESS.md](PROCESS.md), which is the assessed account. The [Assignment 2 brief](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/assessments/assignment-2/) requires no separate reflection, and the [Week 7 retro](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/crits/06-a2-retro/) presents the breakthrough from that same file.

## What moved the work forward?

My breakthrough was changing what I asked the agent to deliver: a complete learning experience for a specific skill. The first mastermind website had a cumulative story and organised evidence, but I was dissatisfied because it did not capture the attraction of acquiring unusual capabilities. Asking for more visual polish alone would have left that problem in place.

I redirected the course toward practice, feedback and transfer. Once I accepted the academy direction, I added another requirement: every lab and assessment needed a complete alternate demonstration, with both observation and learner control. A student should be able to see what competent work looks like, understand why it works, then attempt a different task. This became sixteen examples and their finished submissions in [454d568](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Adithya-Rama/commit/454d568).

## What does this mean for the developer I want to be?

I want to take responsibility for the experience I ask an agent to create. A large implementation is not enough if it loses the reason someone would use it. My questions became whether a student understands the skill, sees its purpose, genuinely practises it and wants to return.

Some of that can become instructions and checks: distinct configurations, visible consequences, preserved revisions and separate practice records. Enjoyment and educational value still require human judgement. The agent's visual corrections and browser tests provide evidence of particular behaviours; they do not replace a student playtest. I want my judgement to direct the automation and remain accountable for what its checks leave unresolved.

*Edited with coding-agent assistance from the supplied author account and feedback; no new personal testing experience is claimed.*

## Short retro demonstration outline

This is a presentation plan, not a record of a presentation already delivered.

1. **Before:** show the earlier dossier design in [bc31705](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Adithya-Rama/commit/bc31705). Explain why its coherence still did not satisfy the intended skill-learning experience.
2. **The instruction that changed the work:** show the teaching and demonstration requirements in [CLAUDE.md](CLAUDE.md). Explain the practice → check → transfer progression and the requirement for alternate worked examples.
3. **After:** open `/demonstrations/lab-04/`, watch the gear-ratio chapter, take control and test a different setting. Open the complete example, then follow the link to the assigned lab to show that its conditions differ.
4. **Evidence and limit:** show the corresponding [logic tests](spec/demonstration.test.ts) and one actual [visual correction](docs/evidence/demo-final-visual-notes.md). Explain what each verifies and why neither proves that every student will enjoy the course.

Use the public course URL once publication is verified. A local preview is not evidence that the submission is live.
