# Worked examples versus assigned work

## Why this audit happened

Adithya asked whether any worked example simply gave students the task they were supposed to complete independently. The review compared all sixteen examples, narrated explanations and finished artifacts with the assigned browser rules, all relevant Practice/Skill check/Transfer phases, assessment briefs and campus packs.

The earlier catalog tests checked that each example existed, had controls and included a difference statement. Those checks did **not** establish a meaningful difference. Review found overly similar answer patterns in the circuit, archive, council and revision examples; the permission charter and parts of A2 also needed stronger separation. The observation example repeated the assigned hurried-departure inference.

## Standard applied

An example should share the capability, reasoning method and expected submission quality. Its actual evidence, constraints or decisions must make the learner reason afresh in the assigned case. Identical general principles—such as using a complete read-back, checking both allowed and denied permissions, or calculating a gear ratio—are intentional. Renamed people and numbers are not sufficient if the entire diagnostic or decision path is copied.

This is an open teaching site: assignment rules, hints and explanatory feedback remain available. The separation protects the learning experience; it is not an assertion that assigned answers are secret or that examples certify independent student work.

## Complete comparison

| Example | Assigned work | Example and consequential distinction |
| --- | --- | --- |
| Lab 1: observation | Three separately dated scenes; classify five statements and recall the scene's time. | Conservatory scene, hatch recall, later two-feature comparison and choice of corroborating records. Replaced the repeated hurried-departure story with an unsupported duration inferred from a clock reading without a start time. |
| Lab 2: recall | Three different four-item lists associated with Atrium/Fountain/Workshop/Observatory. | Gate/Pool/Press/Dome and Lens/Tether/Pocket atlas/Beacon, with swapped associations and an overly general replacement. The shared mnemonic method is intended; the complete recalled sequence does not solve any assigned phase. |
| Lab 3: spatial reasoning | North/east ports and different rotation/level pairs. | Starts north/west; the initial level and later height-only change require a different combined transformation. A single angle can coincide without the complete labelled configuration matching. |
| Lab 4: mechanisms | Twelve-tooth driver; phase-specific output, cam and input conditions. | Eighteen-tooth driver, five-input/three-output calculation and changed two-output requirement. Complete follower/input/cam settings differ even where an individual part size overlaps. |
| Lab 5: circuit diagnosis | Exactly one open fault at a time in browser and campus cases. | **One beacon with two simultaneous faults.** Cable replacement restores supply but leaves the same lamp dark. Continuity then establishes a second fault; completion requires the second repair and actual light. |
| Lab 6: archive evidence | A valid signed amendment changes the matching copy immediately. | **An unsigned proposal does not supersede the valid request.** Retain North, then separately verify authenticated R2 and repaired South S2. Preserve the earlier incomplete South record. Timestamp ordering also differs. |
| Lab 7: permissions | All three roles may read; technician service and registrar certification are restricted. | **Maintenance without research-reading authority**, plus an excess permission and missing legitimate permission. The new local charter requires a different repaired matrix and a separately recorded approval hold. |
| Lab 8: communication | Relay/2/AMBER, Archive/3/COPPER or Dispatch/1/IVORY. | Dome/5/VIOLET, then Pool/2/SILVER, preserving a corrected read-back. The communication protocol should transfer; its exact message and acknowledgement must be produced from the assigned card. |
| Lab 9: council | Conflicting copy digests, insufficient unsupported capacity, copy recovery then stabilisation under changed provenance requirements. | **Corroborated copies and sufficient capacity allow documented physical handover.** A replacement brief then changes the permitted deliverable to copy-only access before dispatch. The assigned agreement sequence cannot be reused. |
| Lab 10: sensor prediction | Cell 20 to cell 4 with three supplied sensor sets. | Cell 20 to cell 3 with different routes and sensor sets. Contact counts must be recalculated from actual visited cells. |
| Lab 11: revision | East-passage loss or unavailable measurement equipment changes the plan. | **Routes remain open; the recipient's authorised scope changes.** Verify the new scope and obtain the required release before sealing. Replacing east with west would not address this disruption. |
| Lab 12: recovery account | Account grounded in an actual Meridian mission, including its objective, evidence and alternative. | A small rainfall-data recovery at Lark Weather Mast with its own identity, apparatus, custody and unresolved calibration. It demonstrates how to assemble an account; it cannot supply a Meridian run record. |
| Fieldwork | Twelve personal lab records; best ten marked, with actual attempts, transfer and reflection. | Portfolio assembled from the twelve alternate cases above. Updated records retain the revised example evidence. It demonstrates format and quality without creating a student's passport entries. |
| A1: workshop | Browser manifest, 90° orientation and 12/24 cradle; campus 09:40 scene, another list, level-1 connector and 12-tooth mechanism/transfer. | Botanical scene at 13:15, different ordered list, level-2 connector and 20-tooth driver with 40/30-tooth follower requirements. Copying its full settings fails the assigned browser or campus configuration. |
| A2: relay | Browser fuse fault or campus cable fault; one matching archive under each signed reference. | **All supply points have 12 V but an open lamp**, requiring isolated continuity. **Two mirrors initially both match**; a later core-plus-calibration scope selects a larger bundle. This is a different diagnosis and content-selection problem. |
| Final project | Operation Last Light at Meridian, its own manifest, support equipment, source records and scenario presets. | Operation Lamplight at Halcyon: different kit, orientation, lift, source and capacity conditions. Loss of the verified cradle makes original movement infeasible; revised digital recovery must establish new identity and custody. The complete submission is an exemplar, not the assigned operation's solution. |

## Changes carried through the teaching experience

Seven examples changed: Labs 1, 5, 6, 7, 9 and 11, plus A2. Revisions include actual controls, scene states, hints, feedback, narration, transcripts, completed downloads and the corresponding Fieldwork records. The assigned tasks were preserved.

Circuit status labels now state what has been established instead of exposing the internal fault name before diagnosis. Rendered review also found an assigned six-volt bench label in the nine-volt and twelve-volt examples; apparatus labels now derive from the example scenario, with a rendered regression check. New tests compare specific examples with authoritative task configurations and protect the consequential contrasts above. The original catalog test was renamed so its title no longer implies that checking labels proves originality.

## Verification

- Final `pnpm check` passed: build, type checks and **132 logic/content tests**, including **17 new example-separation tests**. The build produced 59 pages and passed its static accessibility, internal-link and deck checks.
- The complete demonstration browser suite passed **44 checks** at 1920×1080 and 390×844. It exercised all sixteen examples through learner controls, completed downloads, links, keyboard ordering, no-JavaScript content, print and preservation of the independent mission passport.
- After that full browser run, small feedback edits, shorter answer labels and corrected circuit source-rating labels were made. The final build above includes those changes. A final targeted rendered run then checked **22 views** (eleven changed states at each marking viewport): all expected responses were accepted, with no recorded page errors or horizontal control-panel overflow. This final run checks the actual 9 V / 12 V apparatus labels.
- The rendered review covered the partial and completed beacon repair, unchanged and revised archive authority, permission repair, both council agreements, revised release plan, and A2 diagnosis and archive decisions. Desktop and phone captures were inspected. Phone inspection exposed overly long selected-answer labels; they were shortened while preserving full teaching explanations. Circuit inspection exposed a stale six-volt apparatus label and then an attempted source label derived from the learner's measurement entry. Source ratings are now fixed authored scenario data, separate from editable answers, with a regression test.
- `pnpm check:evidence` passed; the existing four PROCESS commit references resolve. `git diff --check` passed.

The final rendered results are retained in [review.json](evidence/example-separation/review.json). Representative final captures show the [incomplete beacon repair on desktop](evidence/example-separation/lab-05-verify-desktop.jpg), [A2's powered-but-dark lamp](evidence/example-separation/assessment-a2-measure-desktop.jpg), and [two valid archive mirrors on phone](evidence/example-separation/assessment-a2-archive-phone.jpg). The reproducible review driver is `tools/example-separation-review.mjs`; its full transient captures are ignored.

These are local checks. The full 44-case browser suite was not repeated after the final presentation corrections; the final 22-view check covers the changed states. No new student playtest or publication was performed.

## Limits

A test can protect an explicit difference, reject copied apparatus settings and detect stale artifact text. It cannot prove that a course is original or that students will transfer learning successfully. That still needs human judgement and actual student use. No new student playtest, audible device-voice review or deployment is claimed.
