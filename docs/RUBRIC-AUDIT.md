# Assignment 2 rubric and course-site review

**Subsequent iteration:** the [21 September performed-mission review](FIELD-MISSIONS.md) records the author's later agent-experience direction, implementation and updated validation. This audit retains the findings and counts from its earlier review.

Reviewed 20–21 September 2026 (Canberra time). Starting local commit: 1c215a0. This is an agent review of the actual source, teaching material and rendered prototype, not a predicted mark or student playtest.

## Basis and overall judgement

The [assignment brief](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/assessments/assignment-2/) asks for a whole fictional SlopU course that holds together. The [published rubric](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#marking-rubric) weights process 45%, working artefact 20% and response 35%. Its higher band asks for demonstrable direction, resilience under varied use and a distinctive idea sustained through the submission.

The project has a credible case: the academy teaches capabilities that accumulate into one recovery, distinguishes practice from marks, and preserves revisions. The user has repeatedly rejected unclear or merely decorative implementations. However, this review found real gaps. Existing passing checks did not prove that every teaching example differed from assigned work, or that the final mission enforced the particular outcome it claimed. Those gaps warranted implementation changes rather than an unqualified assurance.

## Criterion-by-criterion evidence

| Criterion | Evidence and improvement | Limit on the conclusion |
| --- | --- | --- |
| **Process · 45%** | The account traces the rejected dossier-first concept, skill-based redesign, demonstration requirement and later example-separation challenge through five real commits. CLAUDE.md converts those decisions into boundaries, checks and review duties. This review extends the separation rule to prose, slides and printable packs. | The marker must judge the quality of direction. Agent edits of the student's supplied reasoning are disclosed. No personal playtesting or acceptance is invented. |
| **Artefact · 20%** | Course pages remain directly accessible; twelve labs, sixteen examples, assessment trials, exports, fallback material and the linked lecture deck exist. Browser checks cover both marking dimensions, fullscreen, cursor control, keyboard, saves and errors. A new course guide makes ordinary student information easier to find. | Local Chromium checks are not identical to the marker's deployed Chrome session. Public publication is a separate state. Voice audibility and physical teaching apparatus were not tested. |
| **Response · 35%** | Observation, memory, systems, source judgement and collaboration now feed a final chain from verified archive to equipment, route and outcome evidence. Alternate examples teach the method without providing the assigned complete solution. Scope statements now match what the simplified models actually teach. | Originality, appeal and learning transfer need human judgement. The setting is a stylised teaching simulation; neither visual complexity nor test counts establish a high distinction. |

## Assignment-specific completeness

The audit checked the actual source and built output, not only the homepage:

- SLOP4408, level 4, with the allocated 408 suffix.
- Twelve dated briefings and twelve dated labs, covering 22 February–28 May 2027 and the teaching pause.
- Four assessment entries: 10/20/25/45%, with criterion weights totalling 100% for each rubric.
- Published teaching material, original supplied cases, alternate demonstrations, accessible worksheets and clear submission evidence.
- A linked, complete fourteen-slide Week 7 deck with notes and readable summary.
- Existing Astro/content-collection/API contracts, runtime pinning, build workflow and secret checks preserved. The fixed files were compared with the provisioned baseline.
- Original course artwork and scene assets, with the supplied SlopU identity retained.
- PROCESS.md, CLAUDE.md, the existing reflection README and authentic incremental history.

These checks establish completeness and consistency. They do not certify originality or learning quality.

## Does it function like a university course website?

The comparison used [ANU Art and Interaction Computing](https://comp.anu.edu.au/courses/comp1720/) and its direct routes to teaching material, prerequisites, assessment, policies and help. The useful standard is whether a student can find course facts and carry out the work.

The existing site already had branded course identity, dated weeks, named staff, learning outcomes, assessment briefs, rubrics, supplied resources and policies. What was missing was a concise, conventional entry point bringing those facts together.

Implemented:

- Homepage facts: course code, teaching period, level and weekly workload.
- A **Course guide** covering audience, prerequisites, outcomes, weekly preparation, workload, browser/paper participation, teaching dates, assessments, support and local saving.
- Consistent links to the guide and help from the course shell, home orientation and policies.
- Schedule and assessment summaries built from existing content records; no second set of deadlines or weights.
- A1/A2 tables explaining exactly which evidence comes from the compact trial and which comes from the labs.
- Clearly identified preparation materials inside the combined teaching packs.
- Honest fictional support arrangements and export labels; no invented enrolment system, live staff address or submission success.

The architectural gold/green identity remains coherent with SlopU. Academic information remains readable and usable without entering a 3D scene. The site does not need to copy another institution's design to behave like a course.

## Problems found and corrected

### 1. Example separation stopped short of the entire course

The previous interactive-example correction was useful but narrower than the user's requirement. Twelve briefing examples, lab sample reflections, the Week 7 deck and printable packs still contained old assigned-task solutions.

These now use the corresponding separate cases. The Week 7 deck teaches an observatory embargo charter with a different permission matrix and approval hold. The A1 writing illustration uses the alternate demonstration's calculation. Explicit assigned rules and explanatory feedback remain published; this is open teaching material, not a secret-answer examination.

### 2. Final recovery repeated earlier trials without enough dependency

The original final trial reused A1's manifest, orientation and cradle answer. It also accepted any ending after a common checklist.

The revised final publishes a new manifest and map. An Investigator's verified archive profile now determines Systems' gearing, which supports the handoff and route. The conflicting-source preset changes that configuration. Changing relevant state reopens dependent checks.

Dispatch now requires evidence for the selected outcome: supported custody for physical recovery, a matching receipt and retained-original record for digital recovery, or a stable-state and remaining-responsibility record for handover. The outcome record is included in exports. These checks establish recorded model conditions; they do not grade prose or certify a real recovery.

The final brief, operation introduction, campus mission and template describe the same sequence. Legacy recovery saves remain readable and exportable, explicitly labelled as older rules; they are not silently awarded the new evidence.

### 3. Some outcomes and instructions overstated the models

Week 3 now describes rotation and height rather than hidden-view reconstruction. Week 8 describes structured read-back. Week 10 describes marked-cell entry rather than general visibility/range modelling. Week 2 explicitly asks for an uncued/cued recall comparison; Week 6 names a written decision timeline. Retesting the method is distinguished from a changed-condition transfer challenge in the teaching pages, live feedback and harness.

### 4. Validation and process descriptions needed current scope

PROCESS.md now foregrounds the consequential example-separation challenge and the reason a superficial rename was inadequate. The prior validation report is labelled a historical checkpoint. The existing reflections/README.md and CLAUDE.md were updated alongside it.

A browser no-JavaScript check previously hardcoded localhost; it now follows the configured course URL. This avoids reporting a remote journey while secretly testing a local page.

An independent save review found two malformed-import cases: an active outcome record with a false support confirmation could reach resolution before save rejection, and completed records could retain task ticks after their supporting live state was corrupted. Shared validators now check those contradictions both on import and at completion. They also require the outcome recipient to match the negotiated agreement and reject unfinished records in completed-run history. Explicit regressions cover these cases.

## Validation record

### Initial baseline

At 1c215a0, the fixed check pipeline passed 132 logic/content tests and built 59 pages. Evidence checks passed. The complete browser suite passed 175 cases with one deliberate phone skip for a desktop-only world movement test. This establishes the starting state only.

A keyboard-only Week 7 practical check used Tab, Space and Enter, resized during the permission task, typed a reflection and saved the record at both 1920×1080 and 390×844. It covered that practical phase, not a claim that all 36 lab phases were played manually.

### Rendered-review correction

Source checks first caught the new final map angle matching its example; the assigned map was corrected to 180 degrees, while A1 remains 90 and Lamplight 270. The gear comparison now checks the full driver/follower/output relationship after satisfying the verification prerequisite.

Visual inspection then caught the new profile label overlapping the workshop's wall title despite passing functional tests. It was moved onto a separate physical placard beside the apparatus, and rendered screenshots were reviewed again. Capture timing was also corrected so a room-change screenshot waits for that room to render.

### Revised candidate

- Required check pipeline: 145 logic/content tests pass; 60 pages built with the starter's accessibility, link and deck checks.
- Evidence check: five PROCESS commit references resolve. PROCESS has 502 narrative words; the optional reflection has a roughly 300-word core and separate short presentation outline.
- New final-mission browser journeys: 10 pass across both viewports, covering source-to-equipment dependencies, reopened checks, wrong receipts/recipients, ending exports, reload, legacy records and the actual scene.
- Static rendered review: 14 page views and all 28 slide views. No page errors, page overflow or text outside the slide bounds were reported. The agent inspected the guide and every slide, then the changed mission scenes and fullscreen outcome forms.
- Successful slow loading: at 390×844, 400 ms latency, 150 KiB/s download and a cold cache, the Lab 1 task controls were visible after 3.564 seconds. This run did not launch 3D and is not a frame-rate or asset-streaming benchmark.
- Keyboard-only Week 7 permission work and saving passed again at both sizes, including resizing during the task without losing checkbox state.
- Complete final browser regression: **185 passed, one intentional skip**, across both marking viewports (22.6 minutes). The skipped case is desktop-only academy keyboard movement/resource stability; the phone world, touch, recovery and fullscreen cases passed. See the [full browser results](evidence/rubric-audit/browser-results.txt), [required check output](evidence/rubric-audit/checks.txt), and [validation summary](evidence/rubric-audit/summary.json).

The [static review data](evidence/rubric-audit/review.json) and [keyboard record](evidence/rubric-audit/keyboard.json) preserve the scope. Representative images show the [desktop course guide](evidence/rubric-audit/course-guide-desktop.jpg), [phone guide](evidence/rubric-audit/course-guide-phone.jpg), [corrected profile placard](evidence/rubric-audit/final-profile-B-desktop.jpg), [phone fullscreen receipt controls](evidence/rubric-audit/outcome-digital-phone.jpg), and [phone permission slide](evidence/rubric-audit/slide-06-phone.jpg).

Reproduce the browser journeys after building and starting the local preview. The additional review tools use the same preview:

```sh
COURSE_BASE_URL=http://127.0.0.1:4321/comp4020-ass2-Adithya-Rama/ mise exec -- pnpm exec playwright test --workers=1
mise exec -- node tools/rubric-review.mjs
mise exec -- node tools/rubric-keyboard-review.mjs
```

Both write transient results to the ignored .browser-rubric-audit directory. Run them sequentially with the preview at port 4321. Their output requires visual interpretation; a layout bound or accepted input does not prove educational value.

## Publication and remaining judgement

The public page was reachable during review. Its successful workflow initially served 23e84a0, while the starting local source was 1c215a0. Both the existing check and deploy jobs succeeded in [workflow 35508856025](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Adithya-Rama/actions/runs/35508856025). This turn does not push or deploy, following the user's instruction. These local improvements still need publication.

A high distinction cannot be guaranteed. The strongest argument is the combination of a coherent educational position, visible rejection and revision, and a working reviewed artefact. Remaining evaluation should focus on whether students understand the tasks, enjoy returning and transfer the method. No new student cohort, audible installed voice, fabricated physical apparatus or marker assessment is claimed.
