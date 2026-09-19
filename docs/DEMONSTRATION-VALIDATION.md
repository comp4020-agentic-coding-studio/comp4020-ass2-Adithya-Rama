# Demonstration studio validation

Date: 19 September 2026
Reviewer: implementation agents
Environment: local production preview at the repository base path; Chromium with SwiftShader for graphics.

## Scope

The extension adds sixteen alternate demonstrations: twelve labs, Fieldwork, A1, A2 and the final project. Their 116 chapters include authored apparatus states, learner controls, explanations and complete worked submissions. Operation Lamplight is the final example; Operation Last Light remains the assigned capstone.

The [teaching record](DEMONSTRATION-TEACHING.md) identifies the alternate fixtures and checks the submitted prose sections against the published assessment ranges. The [implementation record](DEMONSTRATIONS.md) explains the player and renderer. The [completeness audit](FINAL-COMPLETENESS-AUDIT.md) maps the accepted course requirements to their implementation and distinguishes the superseded first proposal.

## Automated checks

- `pnpm check` passes: strict type checking, 59-page production build and 112 logic/content tests.
- The production build reports no broken internal links, base-path violations, built accessibility violations or deck structure violations.
- The generated course API retains 32 nodes and 64 edges. Sixteen static Markdown example downloads supplement the HTML pages.
- `pnpm check:evidence` passes: all three cited process commits resolve locally. The account remains within 400–600 words and is edited from the user's supplied reasoning and subsequent directions.

The demonstration tests check every authored expected answer and a deliberately wrong value for each control. They also check deterministic completion, invalid values, ordering, hint/attempt records, and separation between observing an example and practising its controls. They do not grade prose or establish learning quality.

## Browser journeys

The final frozen-source run passed **121 tests with one intentional skip across 122 cases**, in five minutes. All sixteen alternate examples completed through learner controls on both marking viewports. The added ordering, printing and mission-backup replacement regressions passed on both. The actual [browser output](evidence/final-browser-run.txt) is retained, along with the [type/build/logic output](evidence/final-check-run.txt). The browser suite ran against the production build produced by the final successful `pnpm check`.

The single skipped phone case repeats the eight-room resource traversal performed on desktop. Phone scene interaction, playback, takeover, model-load failure, graphics-context recovery, saved-state preservation and resizing have their own passing coverage.

The first integrated run scheduled 110 cases across 1920×1080 and 390×844. It returned 104 passes, five failures and one intentional skip. The failures were retained and investigated:

1. The takeover selector also matched the scene's mode attribute. Button selectors now identify the actual button.
2. The movement test released its key after a fixed interval even if the software renderer had not produced a movement frame. It now waits for the actual position change before releasing.
3. The paused-scene capture could run before the selected chapter rendered. After synchronising to the rendered chapter, one repeat still differed: decoding both images found 1,463 changed pixels out of 965,978, all in the bottom 105 pixels of the capture and each differing by exactly one colour level. The equipment, instructor and camera were unchanged. The check now compares exact, non-empty raw WebGL pixels before CSS compositing; three consecutive desktop repetitions passed, including takeover and preservation of existing storage.

The repeated eight-room resource traversal remains desktop-only; phone graphics, mechanisms, mission and recovery checks have their own coverage.

## Complete hands-free final example

The real Watch control played all eighteen chapters of Operation Lamplight at the selectable Brisk pace, without injected frames, skipped chapters or accelerated test timers. It finished naturally in 389 seconds (6 minutes 29 seconds), displayed the final debrief and stopped. Eight room types rendered; no page errors occurred. An existing Week 4 coursework record was unchanged, and the phone ending had no horizontal overflow. See the [playback record](evidence/demo-final-world-review.json).

That continuous run verifies the player and chapter sequence. The subsequent named-custody and route details retain the same controls, rooms and camera views. The final plan-panel, compass and manifest readability corrections are checked separately against the rebuilt site.

## Review corrections

- Observation props now include the actual clock, mug and hatch named in the scenario.
- Clockwise spatial rotation, connector directions and height agree with the authored coordinate system.
- The cam has a visible index, and a detached spring lies separately on the bench.
- A mechanism close-up no longer has stacked labels obscuring the apparatus.
- All nine permission decisions are explicit. The initial faulty state stays faulty until the learner repairs it; live toggles update the displayed matrix.
- Out-of-range or non-finite numeric input cannot corrupt scene geometry.
- Changing a previously correct answer clears its success caption and restores the current explanation.
- Practice reporting describes whether a playback result or hint was shown. It does not claim to know whether a learner used the unrestricted transcript.
- Wide worked-example tables are keyboard-focusable on narrow screens.
- Moving an ordered item to the first or last position keeps keyboard focus on that item's enabled movement button. The original handler tried to focus a disabled button and lost focus.
- Printing opens the complete example and transcript, pauses playback, and restores the earlier disclosure state afterwards.
- Playback allows time for both explanation and outcome, with selectable pace, pause and chapter access.
- The final worked package now supplies the exact revised route, sensor contacts, named custody locations and separate receipt records for the two rehearsals and final run. Its presentation schedule accounts for speech, demonstrations and transitions.
- Compass, cam and permission-matrix lettering was enlarged; compass and cell words use dark ink for contrast. Plan panels display every authored step and clear the tabletop objects.
- The rotation chapter now has explicit overhead before/after shots so both ports can be inspected. Height chapters keep their side views.
- Watch mode uses a compact scene-and-caption layout at the marking viewports; takeover retains its full controls. Starting playback brings the viewer into view.
- Importing a backup that omits the active mission now clears the old trial before another action can save it again. Replacement/reset also synchronises the displayed scenario and clears stale form/readout values; regressions cover all three mission kinds and an imported changed preset.
- The 320-pixel homepage title and supporting text no longer clip inside an overflow-hidden hero. The copy column can shrink, and the title uses its intended two-line arrangement at that width. Responsive checks now measure text ranges as well as page overflow.

## Final rendered and responsive acceptance

- Accessibility checks passed on sixteen demonstration route/viewport combinations and sixteen core-course combinations, with zero reported WCAG A/AA violations. Demonstration checks also reported no page errors or horizontal overflow. These are automated checks, not a complete accessibility certification.
- The supplemental review passed eighty page/viewport combinations at 320×667, 768×1024, 1024×768, 1440×900 and 844×390. Seventeen homepage widths check the actual text bounds, including both sides of the layout breakpoints. Five keyboard navigation journeys and five live resize cases passed; mechanical settings and a typed reflection survived resizing.
- Complete final-example material remained available without JavaScript at narrow portrait and phone landscape sizes. Tables received keyboard focus and scrolled when needed. See the [responsive report](evidence/responsive/report.json) and [visual notes](evidence/responsive/review-notes.md).
- The final spatial before/after views show both connector tips, the complete assembly and all compass marks. The final route view shows all twenty-five cells unobstructed and north-up. Decorative stools were moved outside the board.
- After real Watch clicks without manual scrolling, the complete longest 49-word narration ends at y=831.7 in the 390×844 phone viewport and y=1055.9 at 1920×1080. Phone takeover retains a 410-pixel scene with its full controls. These final views were actually inspected; see the [3D review](evidence/demo-final-visual-notes.md) and [last route check](evidence/demo-route-clear-review.json).

The earlier failed screenshots remain as correction evidence. The visual notes identify which final captures supersede them. The continuous eighteen-chapter playback record was collected before the later content-detail and framing corrections; the final checks above verify those corrections separately.

## Evidence boundaries

These are agent observations and local automated checks. They are not a student playtest, a physical-phone performance measurement, a campus apparatus test, or proof of enjoyment or an HD. Optional device narration uses the browser's available speech voice; no recorded voice acting or listening-quality study is claimed.

The 3D scenes are original stylised browser environments. They provide apparatus manipulation and authored teaching sequences, not the production scale or open-world systems of a commercial AAA game.

No push, deployment or GitHub Pages CI verification was performed. Publication remains the user's responsibility. The process-link check resolves real commits locally; it does not verify their availability on GitHub.
