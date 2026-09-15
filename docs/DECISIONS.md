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
