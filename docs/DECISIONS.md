> Historical record: this document describes the original Glass Crown implementation. The current academy is documented in [the redesign handoff](REDESIGN-IMPLEMENTATION.md) and [validation record](REDESIGN-VALIDATION.md).

# Decision record

Agent-maintained factual log. This is supporting evidence, not Adithya's assessed first-person account.

## 2026-09-15 — Direction and platform

Adithya approved the complete MASTERMIND plan: one fictional operation, serious teaching, preserved revisions, and 10/20/25/45 assessment. Inspection found the clean SlopU starter at 09a85d2. Astro, the allocated suffix 408, four collection contracts, API, brand integration and build pipeline are fixed. The harness was committed at 4c8495d before implementation.

The implementation uses the supplied Node 24 / pnpm 11.9.0 runtime in WSL. Playwright is an additional development dependency; the fixed check command remains intact. There is no stack migration.

## Course and interaction implementation

The course now has twelve dated briefings, twelve labs, four assessments, original case files, teaching staff, crew dossiers, policies, a 14-slide Week 7 deck and an Operation Room. Teaching content uses the original collections; metadata adds outcomes, sources, activities and artefact relationships. Schedules and assessment summaries read the content records.

Four reusable activity types feed a versioned local dossier. The Week 7 interaction preserves Version 1, appends Version 2 and explains the changed dependency. The deterministic rehearsal has three presets, six checkpoints, three ending families and 432 complete choice routes. Endings never award academic marks.

## Observed failures and resulting changes

- **Source metadata:** a curriculum check found that the Week 2 case-file list omitted E03 even though the exercise uses it. The content references were aligned with activity definitions, and the check now compares the complete lists.
- **Hero clipping:** screenshot inspection showed that the theme's narrow content column clipped the course title and hid part of the diagram. A page-level overflow test had passed because the hero clipped internally. The course shell now owns its wider grid column; the regression checks the title and schematic bounds inside the hero.
- **Phone deck:** the desktop slide canvas scaled body text to an unreadable size on the phone. Course-owned responsive deck styles provide a phone reading layout; each slide has visible Previous/Next controls. Browser checks inspect all 14 slides for fit, text height and navigation at both viewports. The theme package was not edited.
- **Test discovery:** a browser test named academy.spec.ts was picked up by Vitest's spec filter. It was renamed academy.e2e.ts and Playwright has an explicit testMatch. The two runners retain separate commands.
- **Blocked storage:** the lab could retain work in memory but offered export only on another page, which would discard that memory on navigation. Every activity now offers JSON and Markdown export in the same tab. The browser test reads the downloaded backup and verifies the saved answer.
- **Witness wording:** content review found that the exercise attributed a causal claim to a source which only described timing. The original fictional witness record now explicitly states that causal claim, making the classification task internally consistent.
- **Assignment downloads:** the first generic worksheet repeated irrelevant sections across tasks. Four tailored templates now name each assessment's actual required work.

## Validation checkpoint

The required pnpm check passes: zero type diagnostics, 41 rendered pages, built accessibility and link checks, and 29 course/logic tests. The browser suite passes 28 tests across 1920×1080 and 390×844. The storage test verifies an actual JSON download. These are local production-build results.

A subsequent rendered-browser axe review found insufficient contrast in small gold headings, legends and active navigation text. This is a new, concrete finding beyond the starter's static accessibility check. The report is retained in evidence/accessibility-before-fix.json; the next change will adjust text styling while retaining brand tokens.

## Authorship and publication boundary

Adithya supplied the first-person course rationale in docs/AUTHOR-NOTES.md. The agent may organise that wording and link the actual evidence; it must not invent personal observations, student playtesting or approval.

Adithya requested unsigned commits and explicitly deferred pushing to themself. No push, public visibility change or deployment has been performed. CI and live GitHub Pages acceptance remain unverified.

## Rendered review correction

The recorded contrast issue is fixed in course-owned CSS: small headings and legends use ink; active navigation uses the existing secondary bronze. The 12 rendered page/viewport checks now report zero violations. No SlopU brand token was overridden.

The theme also marked Overview active on every nested base-path page and left its menu inert without JavaScript. A course-level enhancement corrects the active section; a static navigation fallback makes the conventional course links available without JavaScript. The menu and existing search are exercised through actual clicks and deep search results.

The keyboard test now enters classifications, reasoning and Save through keyboard events. A new network-throttled journey checks the readable worksheet and eventual activity controls. The current browser suite passes 32 tests. A test initially assumed the assessment index's title was literally Assessments; inspection showed the intended heading was Defend the decision. The test now checks the destination route and a visible heading rather than inventing page wording.

Imports now reject incomplete historical runs, incomplete activity responses, unknown plan actions and revisions without an original. The required check passes 30 tests. See VALIDATION.md for evidence and explicit verification boundaries.
## Local handoff

PROCESS.md is a 496-word edited narrative based on Adithya's supplied account. It cites the real harness, implementation and rendered-review commits. The evidence gate passes with all three citations resolved locally and all starter material replaced or removed.

The final opening-screen review moved the audience and fictional premise into the hero itself. The phone tagline is compact enough that both actions remain visible at 390×844. The final check passes 30 course/logic tests; all 32 browser journeys and 12 rendered accessibility checks pass after this change. The preview also returned HTTP 200 from Windows. These remain local results. Commits are unsigned; pushing remains deferred to Adithya.

## 2026-09-20 — Instructions belong inside the playable activity

**Observed problem:** Adithya could not tell what the labs asked them to do, including the meaning of observation, claim, inference, inspect, and the six timetable stages. They requested explicit instructions across the course, scroll zoom, fullscreen mouse-look and mission instructions available throughout play.

**Decision:** Publish a concrete start/action/finish/evidence path for every lab and assessment. Display the next objective from recorded activity state. Keep the full explanation expandable and distinguish the alternate demonstration from the assigned work. Preserve the cumulative curriculum and assessment requirements.

**Implementation rule:** Fullscreen moves the existing controls, forms, feedback, exports and dialogs into the scene; it does not create a second activity state. A persistent objective title and Task controls shortcut keep the task accessible while the panel scrolls. Reflection follows the practical attempt, while predictions, recall and revision remain part of the skill itself.

**Observed corrections:** Browser testing exposed native confirmation dialogs leaving fullscreen, a sticky site header covering the fallback exit controls, and previously saved planning notes becoming inaccessible in A1/A2. Phase/example confirmations now use in-scene dialogs; fallback uses the browser top layer; optional planning notes remain accessible. Review also corrected contrast and fallback keyboard focus. These were actual implementation findings, not student-playtesting claims.

**Verification:** See INSTRUCTIONS-AND-FULLSCREEN.md for commands, final results and scope. This decision is carried in the implementation commit containing this entry. The student's existing PROCESS.md account is preserved.

## 2026-09-20 — Cursor control must be deliberate

**Observed problem:** Adithya supplied a fullscreen demonstration screenshot with oversized controls, overlapping scene overlays and a playback label wrapping within a word. They also could not scroll or select responses with the captured mouse. Their requested correction was an X-key toggle, with ordinary drag-to-turn and a usable cursor when unlocked.

**Decision:** Fullscreen opens with the cursor free. X or the labelled toolbar toggle enables mouse-look; X again or Tab releases it. Clicking the scene never captures the mouse. Editable inputs and selectors keep their normal X-key behaviour. The mode is explained in the persistent toolbar and throughout the lab and assessment instructions.

**Implementation rule:** Keep the shared scene input layer authoritative across all labs, demonstrations and assessment missions. Guard delayed pointer-lock responses so they cannot recapture a cursor after release. Give the fullscreen interface its own compact typography and controls; reserve space for scene status and actions instead of overlapping overlays.

**Verification:** The follow-up section in INSTRUCTIONS-AND-FULLSCREEN.md records the actual test and visual review results. This decision responds to the user's screenshot and reported use; it does not claim independent student playtesting. Publication remains with Adithya.

## 2026-09-20 — Explain who is present and stage each room by function

**Observed problem:** Adithya mistook the person behind the demonstration desk for the gardener mentioned in the record. They also asked why the clock, mug, ledger, note and hatch were all on the desk. Inspection found the generic demonstration placement arranged items in an indexed row, retained assigned props under alternate examples and reused instructor/student models for council participants.

**Decision:** Model an intelligible teaching space: wall fixtures stay on walls, working documents share a desk, memory objects occupy separate stations, technical apparatus has appropriate support, and the instructor stays in a marked side teaching bay. Named people represented by accounts or dossiers must remain distinct from the rendered instructor.

**Implementation rule:** Use shared semantic placement and per-scenario people/evidence guides across twelve labs, sixteen demonstrations and the three mission types. Include those guides in the existing fullscreen control portal. Keep current practice/check/transfer facts authoritative and hide covered recall props and their answer labels together.

**Verification:** The accompanying [scene and narration validation record](SCENE-AND-NARRATION-VALIDATION.md) distinguishes rendered inspection, automated checks and remaining limits. No student playtest is inferred from this implementation work.

## 2026-09-20 — A worked example must teach through a complete walkthrough

**User direction:** Adithya requested narration on when choosing Watch, an explanation of what the demonstrator must achieve before beginning, clear statements of each action, and a final account of observations and completed work. This supersedes the earlier default-muted demonstration behaviour.

**Decision:** Author a task introduction and conclusion for each of the sixteen examples, plus a first-person intention for every chapter. Derive spoken control settings from the same typed answers that drive the example. Preserve the distinction between narrated observation and the student's own practice.

**Implementation rule:** Synchronise briefing, action and outcome with the before/after scene, wait for speech completion, and show equivalent captions. Keep mute, pause, replay, takeover and the complete transcript available; use an explicit captions fallback when device speech fails. Sound begins only after the learner starts playback.

**Rendered review corrections:** The all-scene survey found no placement diagnostic errors, but contact-sheet review still exposed incorrect initial council names, a memory example retaining its exit selection and the final crew chapter displaying stakeholder dossiers. The first authored scene now establishes its actual scenario identity; memory selection chooses apparatus; crew allocation and handoff use different named records. The instructor bay was moved inward after its sign clipped at the default camera edge. These are agent observations of the local rendering, not invented student feedback.

**Teaching review:** The sixteen walkthrough scripts were compared with their controls and completed artifacts. The final conclusion names the actual prepared presentation script and delivery plan alongside the dossier and individual defences. Speech lifecycle checks use a controlled voice fixture; they do not claim a listening review of installed device voices.

**Final validation:** The final build and 115 logic checks pass. The integrated desktop/phone browser run passed 89 cases with one deliberate desktop-only case skipped on phone. After the last small fixes, all 18 narration lifecycle cases, four rendered narration cases and eight fullscreen accessibility/layout views passed. See [the validation record](SCENE-AND-NARRATION-VALIDATION.md) for precise scope, retained screenshots and device-voice limits. This decision is recorded in the unsigned local implementation commit containing this entry; no publication was performed.
