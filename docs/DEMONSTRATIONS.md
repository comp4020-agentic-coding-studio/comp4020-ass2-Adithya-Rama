# Worked demonstrations: implementation and review

## The user's direction

After accepting the academy's direction, the user asked for more visual polish and more precise, personalised, enjoyable practice. They required a complete alternate demonstration for every lab and assessment, including the final project: students can watch a guided 3D experience or take control, and inspect a finished submission.

## What is implemented

- A demonstration library and a dedicated player for each of twelve labs and four assessments.
- Authored before/after scene snapshots, narrated reasoning, a plausible mistake, a cue and an explained outcome for every chapter.
- Hands-free playback with pause, chapter selection, adjustable pace and optional device narration.
- Learner controls for numeric predictions, choices, ordering, exact factual recall and apparatus conditions.
- Direct scene equipment actions for supported gears, cams, interlocks, springs and spatial controls.
- Coaching based on the learner's actual attempts and hints in the current visit.
- Separate observed and practised records, plus a downloadable personal practice report.
- Complete worked submissions, readable on the page and downloadable as static Markdown.
- An unrestricted transcript and completed example without JavaScript.

The assigned exercises and course passport remain separate from these examples. Watching never creates an assessed completion or academic grade. The metric “before showing a playback result or hint” refers only to those controls; it cannot establish whether a learner read the transcript or heard part of the explanation.

## How the layers fit together

| Layer | Responsibility |
| --- | --- |
| `src/data/demonstrations.ts` | Alternate scenarios, chapters, conditions and complete sample submissions. |
| `src/lib/demonstration-types.ts` | Shared authored-data and scene-frame contracts. |
| `src/lib/demonstration-engine.ts` | Bounded answer checks, attempt history, observed/practised separation and coaching. |
| `src/scripts/demonstration-client.ts` | Playback, accessible controls, optional narration, exports and chapter navigation. |
| `src/game/world.ts` and `demonstration-visuals.ts` | Faithful apparatus, alternate props, camera direction and visible consequences. |
| `src/pages/demonstrations/` | Library and complete static teaching pages. |
| `src/pages/examples/[id].md.ts` | Static worked-submission downloads. |

The player emits `mastermind:demo-frame` with a complete scene snapshot. The renderer never grades work. Demo mode ignores ordinary training/mission updates and emits its own equipment events. `mastermind:demo-control` switches camera ownership; `mastermind:demo-playback` pauses automatic motion.

## Consequential review findings

1. An early scene showed the wrong or missing objects for the narrated observation. Explicit alternate props and persistent scene snapshots were required.
2. Changing an angle in text was insufficient: spatial connector geometry and clockwise rotation had to match the specified reference frame.
3. A detached spring and an attached spring must look different. The mechanism's conditions have visible consequences.
4. Stacked room titles and equipment labels obscured a close-up. The demonstration now uses a compact readout and separate captions.
5. Fixed-duration playback did not reliably allow time to read. Playback duration now accounts for explanation length, and users can slow, pause or jump chapters.
6. Early UI checks ran against a live development server while modules changed. The final acceptance run uses the rebuilt production preview.

The [teaching record](DEMONSTRATION-TEACHING.md) describes the authored examples. The [validation record](DEMONSTRATION-VALIDATION.md) records the final checks and their limits.
