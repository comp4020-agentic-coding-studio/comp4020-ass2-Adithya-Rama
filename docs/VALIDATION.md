# Local validation record

Date: 15 September 2026. Reviewer: coding agent. Publication was deferred by Adithya; these are local results.

## Automated checks

| Check | Result | What it establishes |
| --- | --- | --- |
| pnpm check | Pass; 30 tests, zero type diagnostics | Content integrity, symbolic rules, imports, preservation and rehearsal behaviour |
| pnpm check:evidence | Pass; three real commit citations | Authored process account, harness and removal of all starter text/imagery |
| Production build | 41 pages; 32 API nodes and 64 edges | Static output, base-path links, deck compilation, required collection/API contract |
| Built-page accessibility | No reported violations | The starter's static accessibility checks |
| Playwright browser suite | 32 passed | Sixteen journeys at each of 1920×1080 and 390×844 |
| Rendered-browser axe review | 12 page/viewport combinations, zero violations | Measured contrast and WCAG A/AA checks on selected rendered pages |
| Rehearsal traversal | All 432 complete routes terminate | Same inputs produce the same six-checkpoint result; all three ending families are reachable |

The browser is Playwright's Chromium in WSL, using the production preview and the real repository base path. It is not a deployed Google Chrome acceptance run.

The browser suite covers direct reloads, non-adjacent weeks, all twelve lab saves, keyboard-only evidence entry, ordering and resizing, save/resume, JSON download/reset/restore, invalid imports, corrupt storage, blocked-storage export, text-only rendering of imported markup, preserved plan comparison, contrasting rehearsals, no-JavaScript worksheets and navigation, reduced motion, all fourteen slides, menu/search and a throttled connection (150 ms latency, 150 KB/s download).

Axe retains incomplete contrast cases for the original decorative hero SVG; these were visually reviewed. Zero automatic violations does not certify every aspect of accessibility or educational quality.

## Agent review observations

- **Home:** the first layout clipped the title and schematic within the hero. The before image is retained. The revised desktop frame displays both; phone layout presents the title and actions in one column. The opening also states the fictional premise, fourth-year audience and Grand Reserve target. Both main actions fit in the phone viewport; the decorative drawing appears further down.
- **Week 2:** the distinction between an observed record, a witness claim and an assumption is explicit. Review found and corrected the witness quotation mismatch. The response asks which decision the uncertainty affects.
- **Week 7:** E03 says it is provisional before E07 supersedes it. The old record remains in the archive. Both plans and the changed dependency are visible; direct-entry samples identify their provenance. The twist is inspectable course material.
- **Week 11:** the different presets state their protocol versions. The comparison prompt asks about a specific decision, avoiding the claim that an ending alone establishes reasoning quality.
- **A1:** the complete brief names the word guidance, ledger, model, three assumptions, two questions and investigation recommendation. Its download matches these requirements.
- **Deck:** all fourteen slides were inspected in desktop and phone contact sheets. The original scaled canvas made phone text too small; the responsive reading layout and visible navigation correct that. Each slide includes speaker notes. The linked Week 7 briefing supplies a readable HTML summary.
- **Rehearsal:** a complete Contradiction run reached disclosure with three decision units, no unresolved assumptions and agreement of three. Its debrief names E07 and the changed order. The sample export is recorded below and is explicitly sample work.
- **Contrast:** a real-browser audit found gold text below the required contrast at small sizes. Course-owned styling now uses ink for small headings/legends and the existing darker bronze for active links. Brand tokens remain unchanged.

## Evidence

- [Homepage before the layout correction](evidence/home-before-layout-fix.png)
- [Final desktop homepage](evidence/home-desktop.png) and [phone homepage](evidence/home-phone.png)
- [Week 2](evidence/lectures-week-02-phone.png), [Week 7](evidence/lectures-week-07-desktop.png), [Week 11](evidence/lectures-week-11-phone.png)
- [A1 on phone](evidence/assessments-assignment-1-phone.png)
- [Plan comparison](evidence/revision-desktop.png) and [phone comparison](evidence/revision-phone.png)
- [Completed rehearsal](evidence/rehearsal-desktop.png) and [sample exported record](evidence/sample-rehearsal.md)
- [All slides, desktop](evidence/deck-contact-desktop.png) and [phone](evidence/deck-contact-phone.png)
- [Slide measurements](evidence/deck-fit.json)
- [Contrast findings before correction](evidence/accessibility-before-fix.json) and [current results](evidence/accessibility.json)

Plan and rehearsal images are component captures. Their capture temporarily hides the sticky navigation to avoid a floating header across the captured component; the ordinary page screenshots retain navigation. No screenshot is described as student playtesting.

## Outstanding external acceptance

Adithya's own walkthrough and final voice review of PROCESS.md remain personal judgement. No student playtest is claimed. Push, repository visibility, Pages configuration, CI status, GitHub-rendered evidence links and live Chrome journeys remain unverified because publication was deferred.

Local commit citations resolve in Git. They become reachable on GitHub only after the corresponding commits are pushed and the repository is accessible.
