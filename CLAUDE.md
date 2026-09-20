# MASTERMIND — project harness

## Purpose and accepted direction

Build and maintain **SLOP4408 — MASTERMIND: The Academy of Impossible Skills**: a playable, third-person Slop University academy. Twelve distinct capabilities accumulate into **Operation Last Light** at fictional Meridian Station. The earlier Glass Crown dossier course is historical; preserve its evidence, but do not restore it as the active curriculum.

A good course gives students a reason to practise and makes each week change what they can do. The learning cycle is **briefing → guided practice → skill check → transfer under changed conditions → evidence for the final mission**. The theme must support that cycle. A successful game ending is not an academic grade.

## Fixed platform

- Read `README.md` before changing platform integration. Keep Astro, strict TypeScript, the four existing content collections and required keys, the generated course API, SlopU marks and palette, the build/deployment workflow and secret checks.
- Keep the allocated suffix **408** and course level **4**. Use the course/content records as the authority for dates, weights and titles; derive summaries from them.
- Run project commands in WSL with the pinned Node 24 and pnpm 11.9.0 through mise. Put `$HOME/.local/bin` on PATH if needed. Keep durable work in the repository.
- Respect the repository base path for every internal link and asset. Never hand-edit generated API JSON or bypass build validation.
- Three.js and Rapier enhance server-rendered course content. No accounts, backend, runtime AI tutor, external runtime services or networked multiplayer.
- Keep commits unsigned. The user controls pushing and publication unless they explicitly change that instruction.

## Teaching contract

- Every week must teach a distinct capability: observation, recall, spatial reasoning, mechanisms, electronics, digital investigation, fictional permissions, communication, negotiation, simulated sensors, revision or recovery.
- Each briefing needs an explanation, worked example, plausible mistake, objectives and preparation. Each lab needs supplied rules, its two-hour schedule, meaningful controls, specific feedback, a named output, reflection and a later use for that output.
- Practice, check and transfer must change consequential conditions. Renaming the same exercise does not establish transfer. Campus and browser routes must include enough material to complete the activity independently.
- Use original fictional systems. Do not add real intrusion, vehicle-bypass or evasion procedures. Describe memory as trained recall; do not promise photographic memory or infer deception from demeanour.
- Assessments remain **10% Fieldwork / 20% individual workshop / 25% paired relay / 45% four-role recovery**. Fieldwork counts the best ten of twelve records. Preserve published participation modes, rubric totals and deliverables.
- Make roles matter through different information, responsibilities and tools. Support shared-screen or rotating control and solo role switching. Preserve earlier plans, revisions and contrasting runs.
- Reward evidence, diagnosis, transfer and explanation. Open prose and reflection require human judgement; completion checks must not masquerade as academic grading.

## Voice and presentation

Use serious cinematic openings, precise teaching prose, original characters and occasional restrained institutional absurdity. Avoid copied television characters, masks, dialogue, logos or music. Keep conventional course navigation visible and all academic pages directly accessible.

Build detailed, legible apparatus and original stylised spaces. Show the actual gear teeth, connector directions, fault conditions, evidence and route described by the lesson. Decoration must not obscure teaching information. Do not describe the browser academy as having commercial AAA production scale.

## Complete worked demonstrations

Every lab and assessment has an alternate scenario: **sixteen examples**, including the complete Operation Lamplight capstone demonstration. Each needs:

- Authored before/after scenes, reasoning, a decision, causal feedback, a plausible mistake and a hint.
- Hands-free Watch playback with pause, replay, chapter access, adjustable pace and captions; optional device narration is never required.
- Take Control on the same apparatus, with semantic controls and feedback based on actual attempts and hints.
- A complete finished submission, a static Markdown download, an unrestricted transcript and an explicit transfer back to the assigned activity.

Keep observation and successful practice distinct. Demonstration progress is disclosed as visit-only; it must not complete assessed work or mutate the saved skills passport. Do not claim an attempt was unaided merely because a learner did not press the hint button: the transcript and playback remain accessible.

## Reliability and accessibility

- Keep domain rules separate from graphics. Semantic keyboard/touch controls and static worksheets must remain usable if graphics or JavaScript are unavailable.
- Use visible focus, explicit controls, reduced-motion support and optional timing. No hover-only explanations, compulsory cinematic entry or autoplay audio.
- Preserve focus when reordering reaches either boundary. Print complete examples and records, including closed disclosures, then restore the reading state.
- Version saves; validate size, structure, versions, identifiers and bounded values before replacing work. Treat imported text as plain text. Confirm replacement of non-empty work and reset.
- A backup may omit the currently open mission. Replacement must clear that old in-memory trial and its forms/readouts, synchronise the scenario, and prevent the next action from reviving stale work.
- Invalid imports must leave current work intact. Blocked/full storage must retain usable in-memory work and export. Detect other-tab conflicts; preserve legacy data for explicit export.
- Use accurate actions such as Export or Download; there is no institutional submission endpoint.

## Verification and acceptance

Use the existing checks to protect the course's promises:

| Promise | Main evidence |
| --- | --- |
| Dated, cumulative curriculum and aligned assessments | `spec/curriculum.test.ts`, `spec/data-integrity.test.ts` |
| Causal activity rules and changed conditions | `spec/training-engine.test.ts` |
| Preserved plans, valid missions and safe saves | `spec/mission-passport.test.ts` |
| Complete alternate examples and honest practice records | `spec/demonstration.test.ts` |
| Real controls, reload/restore, printing and graphics recovery | `tests/browser/` |

Run `pnpm check` and `pnpm check:evidence`. Run the relevant browser journeys when interaction, persistence, navigation or layout changes; retain the complete browser command `pnpm test:browser`. Never weaken a check to conceal a defect.

Inspect the rendered result at **1920×1080** and **390×844**, plus relevant intermediate widths. Check resizing during an activity, keyboard navigation, reduced motion, slow loading and graphics failure. Measure text inside its container: hidden overflow can conceal clipping despite a passing document-width check. Inspect actual apparatus and the longest caption; a successful screenshot capture alone is not a visual review.

Record the environment, actual result and limitation. Automated checks do not establish originality, coherent prose, student enjoyment, physical dexterity, physical-phone performance or an HD. Those judgements remain outside automated acceptance.

## Working method and process evidence

Inspect current files and history before continuing. Make reviewable changes: establish a complete teaching slice, verify its content and interaction, then expand. Resolve routine choices within this agreement without repeated permission requests. Report what changed, what was checked, what remains uncertain and the next bounded step.

`PROCESS.md` is the student's **400–600-word narrative**, edited from their supplied account and directions in `docs/AUTHOR-NOTES.md`. Cite real commits beside the claims they support. Explain how the course-design position changed the harness and what was deliberately left to human judgement. Do not fabricate personal testing, acceptance, failures, dates or a retroactive decision history.

`reflections/README.md` is optional preparation for the Assignment 2 retro; it does not replace `PROCESS.md` and is not a separately required submission. Keep it consistent with the same account.

Use `docs/FINAL-COMPLETENESS-AUDIT.md` for feature traceability, `docs/DEMONSTRATION-TEACHING.md` for alternate scenarios, and `docs/DEMONSTRATION-VALIDATION.md` for recorded checks. Preserve earlier evidence with its date and scope; do not present historical results as a fresh run. Local verification does not establish deployment or live acceptance.
