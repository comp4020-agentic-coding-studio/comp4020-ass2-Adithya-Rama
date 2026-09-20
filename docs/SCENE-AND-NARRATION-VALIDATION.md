# Scene staging and narrated walkthroughs

## Requested changes

Adithya identified an ambiguous instructor, objects arranged on an implausible generic desk, and demonstrations that did not make the student's complete method clear. The requested correction applies across the course rather than only to Lab 1.

## Implementation

- Scenario guides identify the learner, instructor, people represented by accounts or role dossiers, relevant evidence and the purpose of each model.
- Mara occupies a marked teaching bay. Council participants use named records instead of clones of the instructor model.
- Wall fixtures, working papers, shelves, memory stations, technical rigs, console trays, floor grids and planning furniture have distinct staging. Assigned phase variants and alternate demonstration fixtures retain their own facts.
- Covered recall hides objects and their answer labels. The guide explains roles without supplying the hidden observation readings.
- The guide and current mission-role identity remain available inside fullscreen, using the same controls and state as the page.
- Each of sixteen alternate examples has an authored task introduction, chapter intentions and completion summary. Spoken control settings derive from the actual typed expected responses.
- Watch and Play start device narration. A visible mute control, matching captions, chapter access and replay remain available. There is no sound on page load.
- Playback proceeds through introduction, briefing, action, outcome and completion. Working speech finishes before the next phase. Unsupported, failed or stalled speech falls back to captions with an explanation.
- Taking control, pausing, changing chapter, hiding or leaving the page cancels narration. Watching expected answers records assistance rather than an independent control attempt.
- The example learner remains distinct from Mara and from named scenario accounts. Their pointing gesture indicates the apparatus being demonstrated; the authored apparatus state represents the result.

## Verification record

All checks below ran against the local production preview. Chromium used software WebGL where a rendered scene was required. The two marking viewports were 1920×1080 and 390×844.

| Check | Actual result and scope |
| --- | --- |
| `pnpm check` after the final source changes | Passed: 105 files typechecked, zero errors/warnings, two existing hints; 59 pages built; static accessibility, links, course graph and deck checks passed; 115 course/logic tests passed. |
| `pnpm check:evidence` | Passed; the four cited PROCESS commits resolve. The student's existing narrative was preserved. |
| Integrated browser run: demonstrations, immersive, narrated-scene, scene-context and world suites | 89 passed, one intentionally skipped. The skipped academy keyboard-movement case is desktop-only; separate phone apparatus, mission, fullscreen and failure-recovery cases passed. Every alternate example was completed through learner controls at both viewports. |
| Final narration lifecycle suite | 18 passed: nine cases at both viewports. Includes gesture-only start, before/action/after sequencing, pause, chapter changes, stale callbacks, supported takeover, mute, voice failure, missing voice API, final review and restart-dialog behaviour. Uses controlled speech mocks. |
| Final rendered narrated-scene suite | Four passed after the final label and dialog fixes. Actual 3D scenes plus controlled speech verify the clock walkthrough, takeover, distinct final-project crew and the completed-work review inside fullscreen. |
| `tools/immersive-review.mjs` after the final rebuild | Eight fullscreen views inspected: assigned Lab 1, final project, alternate Lab 1 under control and alternate final project. No axe WCAG A/AA violations or horizontal panel overflow detected. These automated checks do not prove complete accessibility. |
| All-scene staging survey | 31 routes and 74 arrangements rendered in the first staging build, with no placement-diagnostic or page errors. Ten contact sheets were visually reviewed. The survey preceded final corrections; its exact scope and observations are retained in [the survey record](evidence/scene-staging-survey.json). |
| Final rendered review | Desktop and phone screenshots inspected after fixes, including all eight fullscreen views and the narrated clock, crew and conclusion. Scene-specific role explanations, controls and captions remained readable. |

The integrated browser run completed before the last three small changes: clipping protection for the floating student label, pausing when the restart dialog opens, and more precise final-presentation wording. The final build, narration suite, four rendered narration cases and eight fullscreen views were run after those changes.

### Observations that changed the implementation

- Initial council scenes could retain generic names when the first authored frame reused an already-loaded room. The first scenario identity now forces the correct authored cast.
- A memory example initially selected its exit instead of its teaching apparatus. Initial focus now selects the relevant equipment.
- Final-project crew allocation initially displayed the later custody stakeholders. Crew and handoff frames now render their own named records, including direct chapter jumps.
- Review found the instructor bay sign at the default camera edge. The bay was moved inward. The separate HTML identity and scene guide remain available when a camera close-up excludes the instructor.
- A student nameplate was clipped by the camera edge during the final conclusion. Floating labels now have a maximum screen width and hide if their full bounds cannot fit; the HTML identity remains available.
- The restart confirmation originally allowed narration to continue behind it. Opening the dialog now pauses playback; cancelling preserves progress, and Play explicitly resumes.

These are observations made during implementation and rendered review, not claims of independent student playtesting. The walkthrough scripts were also compared with all sixteen control definitions and completed artifacts; no material teaching mismatch was found.

### Retained examples and measurements

- [Clock demonstration, desktop](evidence/narrated-clock-desktop.jpg)
- [Clock demonstration, phone](evidence/narrated-clock-phone.jpg)
- [Final observations and submission, desktop](evidence/narrated-final-desktop.jpg)
- [Final observations and submission, phone](evidence/narrated-final-phone.jpg)
- [Final fullscreen layout and accessibility measurements](evidence/scene-narration-fullscreen.json)

To repeat the browser checks against a running preview, set `COURSE_BASE_URL` to its course base path and run the listed Playwright suites with one worker. The speech suite intentionally disables 3D loading; the rendered narration suite exercises real WebGL with controlled voice events.

## Limits

Device speech uses the browser and operating system's available voices. Speech callback tests establish ordering and cancellation, not a listening review of every voice or device. A failed voice leaves complete captions and a readable transcript available.

These are local software and rendered-browser checks. They do not establish physical equipment behaviour, physical-phone testing, student enjoyment, an academic grade, or public deployment. Adithya retains control of publication.
