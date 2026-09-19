# Final completeness audit — accepted skills academy

Date: 19 September 2026
Reviewer: implementation agent
Method: read-only source and existing evidence inspection, with keyboard and mission-restore defects reported and corrected during integration. No browser or GPU session was started by this audit.

## Which agreement this audit checks

The active course is **SLOP4408 — MASTERMIND: The Academy of Impossible Skills**. The user accepted the playable academy direction and then required more precise practice, stronger 3D presentation, and one complete alternate demonstration for every lab and assessment. The demonstrations must support observation and learner control, and show finished work.

The earlier Glass Crown / Grand Reserve proposal is historical. The approved redesign replaces its abstract seal puzzles, three-ending heist and Week 7 master-plan disruption with practical skill models and **Operation Last Light** at Meridian Station. It retains cumulative learning, original fictional apparatus, direct access, evidence, preserved revisions, accessible alternatives and the 10 / 20 / 25 / 45 assessment split. Those changed names and weekly subjects are not unfinished Glass Crown features.

“Implemented” below means the identified source supplies the feature. It does not mean that a student enjoyed it, a physical apparatus was built, or the site has been published. The current combined check results belong in [DEMONSTRATION-VALIDATION.md](DEMONSTRATION-VALIDATION.md), so historical test totals are not presented here as final-run results.

## Curriculum and course website

| Requirement | Status and concrete implementation |
| --- | --- |
| Fixed platform and SlopU identity | Implemented. `src/course-config.ts` defines SLOP4408, level 4, Semester 1 2027 and 22 February–28 May. `src/site-config.ts` retains SlopU branding and the course collections. `package.json` retains Astro, strict checking, pinned pnpm, course API, build and evidence commands. |
| Twelve dated briefings and twelve dated labs | Implemented in `src/content/lectures/week-01.md` through `week-12.md` and the corresponding `sessions` files. Monday/Friday dates respect the April break. Each lesson has objectives, explanation, an example, a mistake, preparation and onward work. Each lab has supplied rules, the full two-hour schedule, practice/check/transfer, named output, feedback and reflection. |
| Distinct skills accumulating into the capstone | Implemented in `src/data/curriculum.ts`: observation, recall, spatial reasoning, mechanisms, electronics, digital investigation, permissions, communication, claim verification, sensors, revision and recovery. Each definition names its later mission use. The final brief references the first eleven outputs. |
| Student-facing course information | Implemented in `src/pages/index.astro`: audience, prerequisites, workload, semester, outcomes, assessment overview, staff and clear entry points. `CourseLayout.astro` preserves conventional course navigation and a demonstration/resource footer. There is no game gate. |
| Complete assessments and marking | Four records in `src/content/assessments/`, weighted 10 / 20 / 25 / 45 with individual / individual / pair / group participation. All contain deliverables, criterion-specific performance descriptors, deadlines, access and export guidance. Fieldwork displays twelve checkpoints from the actual session records. |
| Revised assessment timing is explicit | A1 is due 19 March. A2 checkpoint is 23 April and final is 30 April, after communication teaching. Final is due 28 May. These are the approved academy dates, not the earlier Glass Crown A2 dates. |
| Policies and support | `src/pages/policies/index.mdx` covers attribution and AI assistance, contribution/disagreement, unavailable teammates, accessible routes, extensions, missed labs, feedback, saving, privacy and prototype limits. Exports are not labelled as institutional submissions. |
| Staff and reference material | Three original profiles in `src/content/people/`; `src/pages/resources/index.astro` links every original training pack and explains the optional external references. No external account is required for a lab. |
| Original artwork | `public/world/academy-kit.glb`, the academy poster, `AcademyMark.astro`, `src/assets/images/academy-card.svg` and `card.png` provide the original visual assets. The two starter staff portraits are not retained as profile imagery. Source generators and asset manifest are present. |
| Lecture deck | `src/decks/week-07.deck.mdx` has fourteen slides on permission diagnosis, repair and changed mandate, with speaker notes. The Week 7 briefing links it and includes a readable summary. [CURRICULUM-REVIEW.md](CURRICULUM-REVIEW.md) records all 28 slide/viewport inspections and actual corrections. |
| Direct access and navigation | All weeks, labs, assessments, people, resources, policies, academy, final mission and worked examples have normal routes. Links use the repository base path. A first-time Week 11 visitor receives a supplied original plan; no saved earlier record is required to open or attempt the activity. |

## Playable skills and assessments

| Requirement | Status and concrete implementation |
| --- | --- |
| Third-person academy and original equipment | Implemented by `src/game/world.ts`, `demonstration-visuals.ts`, `boot.ts` and `AcademyScene.astro`: academy atrium, eight specialist room types, avatar movement/collision, equipment inspection, camera controls, direct room travel, selectable graphics and lazy loading. |
| Twelve meaningful lab activities | `src/lib/training-engine.ts` is the rule authority; `training-client.ts` and `TrainingLab.astro` provide semantic controls and scene integration. Practice, skill-check and transfer configurations are available. Weeks 11–12 check record readiness and defer explanation quality to human assessment. |
| Feedback grounded in actual work | Lab feedback responds to model conditions. Additional coaching uses actual checks, hint use and relevant settings, including ratios, measurement traces, permission mismatches and sensor records. It does not claim to infer unseen ability or grade prose. |
| Playable A1 and A2 | `src/pages/assessments/[slug].astro` embeds `Mission.astro` for A1 and A2. `missionRequirements` in `src/lib/mission-engine.ts` requires their respective capabilities before closure. Their assessment briefs and templates remain readable independently. |
| Fieldwork's interactive experience | Fieldwork is the portfolio of the twelve playable labs, with its own six-chapter worked portfolio demonstration. It is not represented as an invented thirteenth assessed lab. |
| Integrated final project | `src/pages/operation/index.astro`, `Mission.astro`, `mission-client.ts` and `mission-engine.ts` supply six areas and four roles, original objective, apparatus checks, records, policy repair, handoff, agreement, route, plan versions and debrief. |
| Team and solo use | Four responsibility/tool sets, explicit role switching and action ownership are present. The published route is shared-screen/rotating control; solo practice can switch roles. This is not networked multiplayer or authenticated team membership. |
| Rehearsals and endings | Baseline, Equipment Failure and Conflicting Archive presets are present. Physical recovery, verified digital recovery, and stabilisation/handover are reachable resolutions. Resolution checks require current task conditions; debriefs compare the initial objective with the chosen ending. An ending is explicitly not a grade. |
| Preserved revisions | The Week 11 activity keeps the supplied original separately. Mission plans append numbered versions and do not overwrite Version 1. Completed runs support comparison. Open prose is retained for human review, rather than automatically judged as a sound revision. |
| Meaningful boundaries | Models use invented apparatus, published local rules and static authored evidence. There is no real vehicle bypass, lock bypass, external hacking target, runtime AI tutor or arbitrary code execution. |

## Complete alternate demonstration coverage

All sixteen entries exist in `src/data/demonstrations.ts`, with 116 chapters in total. Each has distinct fixtures, learning explanations, controls, causal feedback, hints, before/after scenes and a finished Markdown artifact.

| Assigned activity | Alternate demonstration |
| --- | --- |
| Lab 1 — observation | Empty conservatory: 11:35 clock, green mug, closed hatch and disputed note |
| Lab 2 — recall | Gate / Pool / Press / Dome with four different objects |
| Lab 3 — spatial reasoning | North/west connector, clockwise rotation and independent height change |
| Lab 4 — mechanisms | 18/30 tooth pair, cam at 270°, then changed follower/input requirements |
| Lab 5 — electronics | Nine-volt beacon, cable fault and distinct open-load evidence |
| Lab 6 — digital investigation | North / East / South weather ledgers and Q7/Q9 references |
| Lab 7 — permissions | Reader / maintainer / custodian matrix and calibration hold |
| Lab 8 — communication | Dome / five / VIOLET, then Pool / two / SILVER |
| Lab 9 — negotiation | Ada / Rin / Bo, capacity and provenance constraints |
| Lab 10 — sensors | Start 20, goal 3, two declared paths and changed sensor cells |
| Lab 11 — revision | East bridge closure, west route and a named capacity-check owner |
| Lab 12 — recovery | Lark Weather Mast rainfall recorder and Ash/Birch evidence |
| Fieldwork | Complete twelve-record alternate portfolio |
| A1 | Botanical Transfer Workshop |
| A2 | Restore Iris Relay |
| Final project | Operation Lamplight at Halcyon Observatory |

Detailed fixtures, artifact section lengths and the final presentation allocation are in [DEMONSTRATION-TEACHING.md](DEMONSTRATION-TEACHING.md). The final example includes the 984-word team account, four distinct 300-word defences, plan versions, two rehearsals, final run, route/contact traces, custody/receipts, contribution evidence and a ten-minute presentation package. It models the required submission structure without supplying the assigned Meridian answers.

| Demonstration requirement | Status and concrete implementation |
| --- | --- |
| Hands-free 3D playback | `demonstration-client.ts` advances authored before/after chapters, with Watch, Play/Pause, pace, replay and direct chapter navigation. `world.ts` directs camera/equipment/instructor states from the same chapter. The complete final example has a retained natural-playback record. |
| Take control | The same chapter exposes semantic controls, exact checks and feedback. Supported direct scene actions update the same controls. Learners can take over, retry and return to playback. |
| Personalised, honest coaching | `demonstration-engine.ts` tracks actual attempts, incorrect fields, hints and observed results. It distinguishes observation from successful control attempts. It does not infer learning from elapsed time or pretend to evaluate prose. |
| Finished examples and export | `ExampleDocument.astro` renders complete submissions; `src/pages/examples/[id].md.ts` creates sixteen static downloads. The player also exports its separate practice record. |
| Static and accessible route | The full transcript, exact authored decisions and completed work are server-rendered in `src/pages/demonstrations/[id].astro`. Keyboard controls, captions and table scrolling are provided. Optional device speech carries no unique required information. |
| Coursework isolation | The demonstration engine/client does not dispatch assessed evidence or checkpoint events. Demo worlds ignore assessed scene updates. Its practice state is explicitly ephemeral for this visit; restarting the example does not reset the passport. Existing coursework preservation is included in browser coverage. |
| Every assigned page links to its example | `DemonstrationLink.astro` is integrated with all lab and assessment routes; the final mission also links its full alternate recovery. The studio is discoverable from home, academy and the course footer. |

## Saving, exports and resilience

- `src/lib/passport.ts` defines version-two JSON with course/curriculum versions, timestamp, revision, selected week, drafts, records, missions and completed runs.
- `parsePassport` checks maximum 1 MB, schema versions, allowed identifiers, bounded values, model state and matching week/phase before replacement.
- `passport-client.ts` confirms replacement/reset, retains current work on invalid import, exports JSON and readable Markdown, and prints the passport. Mission and lab records have their own readable export routes.
- Storage failure keeps the current in-memory work available for export. Competing-tab edits protect the existing saved version. Legacy Glass Crown data is retained for explicit raw export and is never relabelled as new skill evidence.
- Graphics load on request. Static worksheets and model controls remain available during slow loading, failed graphics or missing JavaScript. Every lab and major assessment has supplied campus material in `public/campus/`; there are four submission templates in `public/templates/`.
- The earlier “load a sample dossier” concept is implemented as supplied activity starting states, published presets and separate alternate demonstrations. There is no button that inserts a fabricated completed sample into the assessed passport.
- Demonstration practice is intentionally session-only; assessed coursework persists. This difference is disclosed in the player.

## Findings and integration handoff

A concrete accessibility defect was found during this audit: moving an ordered item to the first or last position tried to focus a newly disabled button. The integration owner corrected focus to the moved row's enabled button and added a regression journey covering both boundaries and a subsequent move back. This is a real review correction, not an invented failure.

A separate persistence defect was found in the existing mission client: importing a valid passport without the open mission left the previous trial in memory, and a subsequent action could save that old trial into the replacement passport. An imported different preset could also leave the setup selector stale. `src/scripts/mission-client.ts` now handles replacement explicitly, adopts the imported trial or creates a fresh one, synchronises the scenario, and clears transient form/inspection values. Reset uses the same lifecycle. `tests/browser/mission-restore.e2e.ts` covers omitted A1, A2 and recovery trials, a changed preset, and reset. Final browser execution remains the integration owner's check.

The integration owner also identified closed worked-example content remaining hidden in browser printing. Its print lifecycle now opens the relevant disclosures and restores them afterwards, with a regression journey. Final browser results for both corrections belong in the current validation record.

No additional missing page, missing alternate example, absent finished assessment artifact, or demonstration-to-coursework persistence leak was found in the source reviewed here. This is a bounded audit, not a claim that every possible defect has been excluded.

## Remaining evidence and responsibility boundaries

- Final combined browser, accessibility and responsive results are recorded in [DEMONSTRATION-VALIDATION.md](DEMONSTRATION-VALIDATION.md); earlier passing counts are retained as historical checkpoints.
- The user accepted the direction but has not supplied a completed student playtest of all sixteen examples. Enjoyment, perceived precision and final artistic judgement remain human judgements.
- The experience is an original stylised browser academy with authored 3D teaching sequences. GTA-scale world simulation, commercial cinematic production, live multiplayer, recorded acting and unrestricted physics interactions are not implemented or claimed.
- Physical phone performance, construction/use of the campus apparatus and real classroom delivery have not been tested.
- GitHub Pages publication, CI and live-site acceptance are not complete. The user explicitly reserved pushing/publishing; local commits are unsigned.
- `PROCESS.md` is based on the user's supplied reasoning and real implementation history. Automated checks cannot establish originality, personal authorship beyond that evidence, or an HD.
