# Performed field missions — implementation and verification

Date: 21 September 2026. Status: local implementation and verification complete. Publication remains with the author.

## The author’s direction

The author clarified that all labs, assignments, the final project and their alternate demonstrations should feel like agent missions. A student needs an objective, a reason to investigate, a skill that changes the situation, and the satisfaction of completing a recovery. This extends the earlier request for clear instructions and complete worked examples. It does not establish that the author has played or accepted every implemented mission.

## What changed

- Twelve assigned lab operations, each with distinct objectives, obstacles, intervention conditions and receiving consequences. Practice, Skill check and Transfer retain their published differences.
- A shared performed-operation reducer governs inspection, verified intervention, collection, ordered checkpoints and handover. Domain checks provide the proof; graphics and caller-supplied flags do not award it.
- Each operation has matching 3D stations and accessible controls. With active graphics, a requested station action moves the avatar and records the action after arrival. Reduced motion or paused graphics uses the equivalent direct control path.
- Signals, powered beacons, lifted platforms, opened gates, released packets and carried cases respond to operation state. Routes have authored checkpoint layouts; physical recovery removes the packed original from its earlier pedestal while digital/stabilisation preserves it.
- A1 now includes actual release and three-checkpoint delivery. A2 performs transmission and acknowledgement. Final recovery distinguishes physical transport, verified digital receipt and supported original handover.
- All sixteen demonstrations have alternate mission briefs. Watch and Take Control use the same field reducer with separate records. Playback narrates intention, waits for the action, then explains the result. Skipped chapters remain disclosed previews.
- A verified skill is distinguished from completed handover. Altering a supporting solution invalidates dependent field work. Saved field state is validated; historical records remain exportable.
- Lab 1 requires its four observations and covered recall; Lab 2 requires visiting its four stations and covering the list. Lab 11 includes a replacement-dependency rehearsal. Lab 12 requires current, performed recovery evidence.
- Briefings, sessions, assessment briefs, campus packs and templates describe the new practical sequence.

## Independent review and actual corrections

The implementation agent reviewed the new shared operation engine and scene integrations independently from their author. Findings included:

1. Paused graphics intercepted a walking request that could never finish. Paused scenes now retain a usable equivalent action path.
2. A completed historical recovery could satisfy Lab 12 despite lacking the new performed evidence. The prerequisite now checks current recovery rules and the actual field result.
3. The original archive remained on its old pedestal after physical collection. The scene now follows the chosen outcome and restores the object if proof is invalidated.
4. Initial rooms instructed students to inspect a console that only appeared in Dispatch. A physical briefing terminal now appears before the intervention stage.
5. A blocked path could leave movement pending indefinitely. Requests now have bounded failure feedback and an accessible alternative.

A rendered journey then exposed slow automatic movement under concurrent software rendering. Movement elapsed time is now bounded separately from decorative animation time; the learner's action still waits for actual arrival. The desktop and phone movement journeys passed after this correction.

Screenshot inspection also found a decorative planter overlapping the mission station, unneeded checkpoint markers and a literal newline escape in fullscreen markup. A duplicate objective overlay covered too much of the phone scene. These were corrected and the desktop/phone completion views reviewed again.

The instruction review found that the numbered lab steps suggested changing phases before completing handover. Weeks 1–11 now require the current operation and saved record before switching; Lab 12 distinguishes final recovery from its separate after-action handover. Saving unfinished work explicitly directs the student back to the missing intervention.

Longer concurrent replays exposed another slow-rendering arrival stall. No obstructing authored collider was found on the approach. Automatic movement now stops at the remaining distance, preventing a large frame step from passing its destination. A deliberately delayed animation-frame journey checks return from the receiver to the next phase's station. The old trace establishes failed arrival under load, but does not conclusively establish oscillation as its precise cause.

## Validation record

- `pnpm check`: passed; 214 logic/content tests, 60 built pages, zero type errors and the required build checks.
- `pnpm check:evidence`: passed; the five cited commits resolve.
- `git diff --check`: passed.
- Local Chromium at 1920×1080 and 390×844: all observed failures received passing follow-up checks. The record below distinguishes the full run from targeted reruns.

| Run | Actual result | Response |
| --- | --- | --- |
| First broad attempt | Interrupted after the original movement defect | Not counted as a pass; corrected elapsed-time handling. |
| Complete suite | 195 passed, 4 failed, 1 intentionally skipped | Three assertions allowed only five seconds for walking. One narration fixture relied on wall-clock timing. Replaced these with bounded arrival checks and explicit speech completion. |
| Focused follow-up | 16 passed, 2 failed | Longer journeys exposed the arrival stall described above; bounded displacement and added the deliberately slow return journey. |
| Affected journeys after correction | 17 passed, 1 failed | All recovery variants and slow-frame journeys passed. A separate three-phase test still used the old five-second delivery assertion. |
| Final three-phase confirmation | 2 passed | Desktop and phone completed Practice, Skill check and Transfer, preserving saved state and fullscreen operation. |

The intentional phone skip belongs to the desktop academy room/resource stress test; separate phone field-operation, fullscreen, context-loss and equipment journeys ran. This evidence is a full suite followed by targeted corrections, not a claimed single clean 200-case run.

The final checks cover actual station arrival and delivery, all twelve labs, sixteen alternate demonstrations, paused/deferred playback, three recovery outcomes, save/restore, invalidation, fullscreen controls and accessible alternatives. The [machine-readable record](evidence/field-missions/validation.json) and [verification transcript](evidence/field-missions/verification.txt) preserve the sequence.

Reviewed completion captures: [Lab 3 desktop](evidence/field-missions/lab-03-desktop.jpg), [Lab 3 phone](evidence/field-missions/lab-03-phone.jpg), [recovery desktop](evidence/field-missions/recovery-desktop.jpg), [recovery phone](evidence/field-missions/recovery-phone.jpg). The phone console scrolls independently; a screenshot shows only part of its full debrief.

Narration timing tests use controlled speech fixtures. They establish callback, caption and progression behaviour; they do not validate an installed device's audible voice.

## Scope and judgement

This is an original stylised academy and recovery game in a browser, with authored training rooms, operational stations and constrained routes. It is not a commercial open-world production. The semantic route remains available for accessibility and low-powered devices; it applies the same rules without requiring 3D movement.

Completion records demonstrate conditions and actions, not automated academic grades. Code and browser checks do not establish enjoyment, learning, originality or a marking outcome. No new student playtest, physical apparatus validation or publication is claimed. The author controls pushing and deployment.

## Reproduction

- Required: `pnpm check` and `pnpm check:evidence`.
- Browser: `pnpm exec playwright test`.
- Focused performed movement: `pnpm exec playwright test tests/browser/field-world.e2e.ts`.
- Inspect Lab 3's passage, Lab 5's beacon, A1's transported case, an outcome in Operation Last Light and a complete alternate demonstration. Keep their action records with the visual review.
