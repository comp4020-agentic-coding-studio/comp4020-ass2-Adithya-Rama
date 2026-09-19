# Redesign validation record

Date: 19 September 2026  
Reviewer: implementation agent  
Build: local production preview at the repository's GitHub Pages base path.

This record covers the replacement **Academy of Impossible Skills** implementation. Earlier Glass Crown results are historical.

This is the committed academy baseline checkpoint. The later [demonstration validation](DEMONSTRATION-VALIDATION.md) covers the studio extension and current combined checks.

## Final checks

| Check | Result | Evidence and scope |
| --- | --- | --- |
| `pnpm check` | Pass; 64 tests | Strict Astro/TypeScript checking, then production build and four test files: 23 training, 31 mission/passport, 9 curriculum and 1 baseline integrity test. |
| Production build | Pass; 42 pages | 32 course API nodes and 64 edges; all internal links respect the base path; no broken links; one deck passes structural checks. |
| `pnpm check:evidence` | Pass | The revised process account cites three real commits, all resolving locally. |
| `pnpm test:browser` | 67 passed, 1 intentionally skipped | 68 scheduled cases across 1920×1080 and 390×844, using the final production build. The repeated eight-room resource traversal runs on desktop only; phone mechanism, mission, failure and context-recovery cases pass. |
| Rendered accessibility audit | No violations in 16 page/viewport combinations | WCAG A/AA axe checks on home, academy, labs 2/4/7/11, A1 and recovery. See [machine-readable results](evidence/redesign/accessibility.json). |
| Final page captures | Eight combinations; no overflow or page errors | Home, mechanism lab, A1 and recovery at both viewports. See [results](evidence/redesign/page-inspection.json). |
| Curriculum/deck review | 28 slide views and 16 page views | All fourteen slides at both viewports, plus selected course pages. See [review and corrections](CURRICULUM-REVIEW.md). |
| 3D room review | Completed | Eight rooms, repeat travel, actual WebGL context loss/restoration, missing-asset recovery and shared equipment actions. See [graphics observations](evidence/world-review.json). |

## What the browser journeys exercise

- Course identity, direct navigation, non-adjacent weeks and refresh at the repository base path.
- Distinct controls and recorded evidence for all twelve labs.
- Changed practice/check/transfer requirements in mechanisms, electronics, permissions and sensor exercises.
- Keyboard focus, unfinished checkpoint resume, scene-to-model actions and static worksheets without JavaScript.
- JSON export, reset, restore and malformed-import preservation; usable export when browser storage is blocked.
- All three recovery resolutions across baseline, equipment-failure and conflicting-archive scenarios.
- Preserved original/revised plans, actual debrief downloads and resumed completed missions.
- Rejection of premature mission completion.
- Reduced motion, delayed/failed scene assets and resizing during practice.
- Third-person movement, room travel, mobile workbench layout, real graphics-context recovery and stable geometry counts after repeated room travel.

## Observed issues corrected

The current implementation fixes the equal-sized gears, canvas strip, phone overlay obstruction, stale scene state, small-heading contrast, phone rubric and slide overflow, misleading open-lamp voltage teaching, and stale mission completion after equipment changes. These observations and their causes are in the [decision record](REDESIGN-DECISIONS.md).

The final graphics review also aligned the arrival evidence props with the descriptions used by the recovery model. The final browser suite ran after these corrections.

## Assets and performance boundary

The original GLB kit is 609,888 bytes. The uncompressed initial graphics payload was approximately 4.16 MB at review time. Rooms reuse the same asset kit. Source generators and asset attribution are retained.

Graphics checks used local Chromium with SwiftShader where needed. Geometry stability is evidence of resource handling during the tested journeys; it is not a frame-rate result on physical phone hardware.

## Evidence boundaries

- No push or deployment was performed. The user owns publishing.
- GitHub Pages CI and live-site behaviour have not been verified for this redesign.
- Browser checks use local Chromium, not a signed-in Google Chrome or physical-device run.
- Delayed asset and failed graphics tests establish fallback behaviour; a comprehensive network-performance benchmark was not performed.
- Physical campus activities have printable materials but have not been built or classroom-tested.
- Screenshots and agent review are not student acceptance or evidence that a marker will award an HD.

## Review entry points

- [Academy screenshot](evidence/new-world-desktop.png)
- [Mechanism close-up](evidence/new-world-mechanism.png)
- [Phone scene](evidence/new-world-mobile.png)
- [Homepage](evidence/redesign/home-desktop.png)
- [Desktop slide contact sheet](evidence/redesign/deck-contact-desktop.png)
- [Phone slide contact sheet](evidence/redesign/deck-contact-phone.png)

Implementation foundation: [8aca1cd](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Adithya-Rama/commit/8aca1cd). Follow-up review fixes and this record are committed separately without signing.
