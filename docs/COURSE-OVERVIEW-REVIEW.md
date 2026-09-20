# Course overview and study-mode review

Reviewed 21 September 2026 (Canberra time), starting from local commit `c062cfb`. This records an agent review and implementation prompted by the author's course-first and in-person-first instructions. It is not a student playtest or evidence that a physical class was delivered.

## What needed to change

The course already contained learning outcomes, dated teaching materials, assessment briefs and a course guide. The problem was their priority: a visitor met the practical academy before enough information about the course they would be taking. The author also clarified that in-person teaching is preferred; the 3D environment supports students who cannot attend, plus preparation and revision.

## References inspected

- [ANU COMP6320 catalogue](https://programsandcourses.anu.edu.au/course/COMP6320): course identity, overview, learning outcomes, study requirements, workload and class information provide a useful academic hierarchy.
- [ANU Art and Interaction Computing](https://comp.anu.edu.au/courses/comp1720/): an introduction to the subject leads into teaching resources, assessment, policies and help.
- [Round Trip course](https://comp4020-agentic-coding-studio.github.io/comp4020-ass2-QuackyDuck826/) and its [People page](https://comp4020-agentic-coding-studio.github.io/comp4020-ass2-QuackyDuck826/people/): the author's supplied example makes the course purpose, intended audience and teaching responsibilities explicit. Both public pages returned HTTP 200 and their actual content was inspected.

These references inform information order, not copied layouts or wording. No ANU accreditation, fees, credits, real enrolment service or institutional staff contact has been invented.

## Implemented coverage

| Student question | Where the site now answers it |
| --- | --- |
| What is this course? | Homepage masthead and overview: SLOP4408, fourth-year undergraduate, Academy of Impossible Skills, semester and academic purpose. |
| Is it for me? | Homepage and course guide: audience and prerequisites. |
| What will I learn? | Six canonical outcomes on the homepage; capability and later use before every lab's online environment. |
| How does the semester fit together? | Three stages derived from the existing twelve-week curriculum, linked to briefings. |
| Where and how do I study? | Preferred in-person mode in the shared header, facts, homepage, guide and activity pages; equivalent online participation is explicit. |
| What happens in person? | Twelve distinct lab descriptions and existing campus packs: observation, recall, maps, mechanisms, circuits, evidence, permissions, communication, negotiation, sensors, rehearsal and recovery. The in-person block precedes online instructions in every written lab. |
| How do assessments work in person? | Fieldwork, individual workshop, paired relay and final group recovery explain classroom activity, evidence and online equivalents before demonstrations. |
| Why is there a 3D environment? | It provides online practice when students cannot attend and supports preparation and revision between classes. Campus participants do not need a duplicate browser attempt to establish equivalent evidence. |
| What are the study requirements? | Workload, readings, preparation, equipment, dated schedule, assessment participation modes and published weights in the course guide and linked briefs. |
| Who teaches and supports me? | People is a primary link; the homepage introduces all three staff and identifies the convenor. Help routes and policies remain directly linked. |

Primary navigation is now Overview, Course guide, Weeks, Labs, Assessments and People. The academy and final mission remain accessible from study guidance and secondary navigation. The homepage introduces the academic course before game entry. Existing mission logic and assessment criteria are unchanged.

Campus packs describe proposed teaching setups. The prototype does not establish physical apparatus reliability. Students are told to distinguish apparatus measurements, paper-rule results and simulated results in their evidence.

## Validation and actual observations

- `pnpm check` passed: no type errors, 60 built pages, required accessibility/internal-link/base-path checks, and 214 passing tests across nine files.
- `pnpm check:evidence` passed; the five cited process commits resolve. PROCESS.md remains within the required 400-600 narrative words.
- Ten selected Chromium browser checks passed at the marking desktop and phone dimensions. These cover academic navigation, all twelve lab/four assessment/final-mission study routes, no-script reading, and the existing fullscreen resize fallback. After the final shared-header CSS adjustment, the six academic browser checks were repeated successfully.
- The reproducible `tools/academic-overview-review.mjs` captured sixteen page/viewport combinations across 1920x1080, 390x844, 320x844 and 768x1024. All returned HTTP 200 with no recorded page errors, horizontal overflow or detected clipping in the inspected text containers.
- Visual inspection covered homepage desktop/phone, the phone overview section, guide, Lab 5, A1 and the final-project introduction. It caught an awkward phone course strip: the delivery label wrapped into a narrow column while the semester fell onto a separate row. The final layout stacks these short facts with full available width. Representative captures and machine measurements are retained below.
- The first curriculum run caught an old assertion requiring literal "Browser route" and "Campus route" headings. The assertion now expects the explicit study-mode headings and additionally verifies that the in-person section precedes the online section. The full required check then passed.

These checks establish the recorded local behaviour, not teaching effectiveness or a grade. The full mission browser suite was not rerun for this presentation-only change; previous game-validation evidence remains in its original review. Native hardware, a real phone, physical classroom delivery, live deployment and student acceptance were not newly tested. The in-app browser tool failed to start; local Playwright screenshots and checks supplied the browser evidence instead.

## Retained evidence

- [Desktop homepage](evidence/course-overview/home-desktop.jpg)
- [Phone homepage](evidence/course-overview/home-phone.jpg)
- [Phone course overview](evidence/course-overview/overview-phone.jpg)
- [In-person lab guidance](evidence/course-overview/lab-desktop.jpg)
- [Responsive page measurements](evidence/course-overview/review.json)

CLAUDE.md, PROCESS.md, reflections/README.md and AUTHOR-NOTES.md record the author's actual direction. All changes remain local; the author controls publication.