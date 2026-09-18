> Historical record: this document describes the original Glass Crown implementation. The current academy is documented in [the redesign handoff](REDESIGN-IMPLEMENTATION.md) and [validation record](REDESIGN-VALIDATION.md).

# MASTERMIND implementation handoff

The website is implemented locally. Read CLAUDE.md before making changes; README.md remains the fixed-platform reference. Publication belongs to Adithya, who explicitly deferred pushing.

## Run and verify

Use WSL from the repository:

```sh
export PATH="$HOME/.local/bin:$PATH"
mise exec -- pnpm install --frozen-lockfile
mise exec -- pnpm check
mise exec -- pnpm check:evidence
mise exec -- pnpm test:browser
mise exec -- pnpm preview --host 0.0.0.0
```

Preview: http://localhost:4321/comp4020-ass2-Adithya-Rama/

The project prefix is required. For development, use pnpm dev through the same runtime. Node 24 and pnpm 11.9.0 remain pinned.

Browser tests use Playwright Chromium. If a new machine lacks that browser, install it with pnpm exec playwright install chromium. The browser suite starts a preview server if one is not already available.

Optional review helpers, with the preview running:

```sh
mise exec -- node scripts/review-accessibility.mjs
mise exec -- node scripts/capture-review.mjs
```

These record local evidence. They do not publish or prove CI success.

## Where decisions live

| Concern | Source |
| --- | --- |
| Identity and term | src/course-config.ts |
| SlopU branding and navigation | src/site-config.ts |
| Dated teaching and assessment facts | src/content/ |
| Learning outcomes, case files, crew and activities | src/data/academy.ts |
| Pure dossier, import and rehearsal logic | src/lib/academy-engine.ts |
| Invented symbolic state transitions | src/lib/symbol-machine.ts |
| Browser interaction and recovery | src/scripts/academy-client.ts |
| Shared course shell | src/layouts/CourseLayout.astro |
| Visual treatment | src/styles/academy.css |
| Lecture deck and responsive slide styling | src/decks/ |
| Assignment-specific downloads | public/templates/ |
| Curriculum/logic checks | spec/ |
| Browser journeys | tests/browser/ |
| Actual decisions and evidence | docs/DECISIONS.md and docs/VALIDATION.md |

The original four collection schemas, Astro integration pipeline, generated API envelope, deployment workflow and pre-commit secret check remain intact. Do not hand-edit dist or add another search implementation.

## Persistence contract

One local key, mastermind:SLOP4408:v1, stores schemaVersion, courseCode, scenarioVersion, updatedAt, selectedWeek, answers, artefacts, crew, plans, completed runs and activeRun.

Imports accept JSON up to 1 MB, validate known identifiers and bounded data, and ask before replacing non-empty work. Historical runs must contain six valid decisions. Plan revisions need a preserved original. Imported prose is rendered as text.

Invalid stored data stays protected until explicit replacement. Each lab can export current in-memory work if storage is blocked or full. Save a form response before exporting it. JSON provides backup/re-import; Markdown and print provide readable records. There is no submission endpoint.

## Course continuity

All twelve labs update named parts of the same dossier. Week 6 preserves the first operation plan. Week 7 supplies E07, preserves the original and appends revisions. Later activities reconsider evidence, agreement and the objective.

The rehearsal deliberately uses named scenario conditions. Baseline and Divided Crew stipulate R1; Contradiction introduces R2. It does not secretly infer a preset from a student's earlier progress. Every week remains directly accessible with a supplied example.

## Review and delivery

The current evidence and boundaries are in VALIDATION.md. PROCESS.md uses the rationale Adithya supplied, with technical evidence identified as agent-run. Adithya should review its voice and make their own course walkthrough before submission.

When Adithya chooses to publish, use the course's established shipping workflow. The starter gates CI on a public repository. A push alone may not enable Pages or run the jobs while it remains private. Verify both check and deploy jobs and then exercise the actual GitHub Pages URL in Chrome at both marking sizes. No publication action has been performed here.

Continue making real, reviewable commits. Use git -c commit.gpgsign=false commit when committing; do not alter global signing settings.
