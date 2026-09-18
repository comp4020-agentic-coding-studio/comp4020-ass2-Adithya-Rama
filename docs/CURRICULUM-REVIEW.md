# Curriculum and deck review — skills academy redesign

Date: 19 September 2026  
Reviewer: implementation agent  
Environment: local headless Chromium via the repository's Playwright dependency, 1920×1080 and 390×844, reduced motion enabled for repeatable slide capture.

This is agent inspection of source text, rendered pages and screenshots. It is not student playtesting, physical-apparatus validation, public-site acceptance or a prediction of an assessment grade.

## Pages and teaching reviewed

- **Home:** the revised page states the skills promise, audience, workload, twelve-week progression and recovery objective. Academy and course exploration are direct entry points. Canonical assessment weights and due dates are visible. Course information can be read without first navigating the game.
- **Week 2:** four fixed locations support three different four-item lists. The briefing distinguishes retrieval from recognition and asks for a baseline, a transfer attempt and honest limits. A stale opening originally promised six items; this was corrected to four in source.
- **Week 7:** the policy matrix contains both unauthorised capabilities and legitimate operations that are wrongly denied. The lesson now requires all nine checks and a maintenance-hold revision. This is a different intellectual operation from memory practice, with a concrete before/after result.
- **Week 11:** the original plan remains separate from its revision. Closing the east passage changes a route dependency and adds a relay check; it does not erase manifest evidence. The missing-meter variant explicitly distinguishes supplied readings from measurements the student personally took.
- **A1:** the brief names the four demonstrated capabilities, practical evidence, causal model and 350–500-word explanation. The rubric assesses skill, diagnosis, transfer and clarity. Review found that a five-column descriptor table was dense on a 390px phone, so all four assessments now use criterion headings and four short standard descriptions. The canonical weight table remains.
- **Lab alternatives:** all twelve campus packs include equipment, setup, rules, a 120-minute schedule, practice/check/transfer, student record and explanation. The packs explicitly state that physical construction has not been validated by browser checks.

## Consequential corrections

1. **Phone slide overflow:** the permissions matrix initially measured 587px across inside a 390px slide. Responsive table sizing and 14px phone table text corrected the overflow. Desktop reading layout was also centred.
2. **Capture validity:** the deck uses one-based hashes. An initial screenshot traversal duplicated the opening and omitted the final slide. The corrected capture checks the displayed navigation count for every slide and records all fourteen distinct headings.
3. **Mobile assessment reading:** a criterion-descriptor table had 554px content in a 355px wrapper. The descriptors were converted to vertically readable sections, avoiding horizontal reading across four performance bands.
4. **Circuit accuracy:** the training-agent review identified that an open lamp can retain a healthy supply voltage. Week 5 teaching now distinguishes supply breaks from a failed load: an isolated continuity test diagnoses the latter. It no longer teaches that every fault produces a first-zero supply reading.
5. **Content/browser alignment:** memory lists, connector orientations, mechanism ratios, digital manifests, role handoffs, council records and sensor cells were compared directly with the authored training model. Old fixture examples were replaced.
6. **Preview freshness:** source edits to the content collections were not immediately reflected by the running development server. A file/HTTP comparison exposed the discrepancy. The development server was replaced with the rebuilt production preview. The final capture explicitly asserted the four-item wording and heading-based rubric before recording screenshots, so the stored final page evidence is source-fresh.

## Deck inspection

The fourteen-slide Week 7 deck contains the policy contract, subject/action/object distinction, expected-versus-observed example, complete matrix, repair, positive and negative regression checks, changed mandate, student exercise, assessment connection and lab handoff. All slides contain speaker notes; the lecture includes a readable summary.

The final source-fresh production-preview capture records **28 slide/viewport combinations** with no measured horizontal or vertical content overflow, and **16 page/viewport combinations** without page-level horizontal overflow. Contact sheets and individual images are under `docs/evidence/redesign/`; `deck-fit.json` includes displayed headings and dimensions. Source notes were reviewed separately from student-facing slide content.

## Remaining experiential boundaries

The source and rendered structure support a coherent progression from separate capabilities to integrated recovery. That observation does not establish that the complete academy feels sufficiently polished or that students enjoy the activities. Student feedback, the owner's judgement of the game experience, actual phone hardware performance and physical workshop construction remain distinct evidence.

The dedicated curriculum contract suite passed **9 tests** against the generated course API. The printable perception, spatial/mechanism and circuit/sensor SVG sheets were rendered and visually inspected; their labels and layouts were readable, but no print or apparatus test was performed. Links to these sheets were added after the capture and require the final build.

The current screenshot pass uses local Chromium against the production preview, not the published GitHub Pages site. Browser journeys, simulation tests and full repository checks are recorded by their respective validation runs; they should not be inferred from this review.
