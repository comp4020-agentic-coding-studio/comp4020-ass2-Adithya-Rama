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
