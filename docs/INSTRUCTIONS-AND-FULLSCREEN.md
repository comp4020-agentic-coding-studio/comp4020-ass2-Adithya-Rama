# Clear instructions and immersive missions

## What changed

The course now states what to learn, which exact controls to use, how to recognise completion, and what evidence to keep. The home and index pages distinguish demonstrations, labs, assessment trials and written deliverables. Every lab includes a plain-language task and numbered actions; every assessment includes a start-to-finish play sequence and submission checklist.

Lab 1 defines observation, claim, inference and inspect at the point of use. The six timetable stages are explicitly distinguished from gameplay objectives. Lab instructions progress from practice to a changed skill check and a transfer challenge. A1 and A2 explain which richer lab records supplement their compressed trials.

## Playing inside the scene

1. Open the 3D environment.
2. Select **Fullscreen mission**.
3. Read the current objective in the persistent top bar. **Mission & controls** returns to the guide; **Task controls** jumps directly to the apparatus; in a mission it selects the role and room required by the displayed objective.
4. Fullscreen starts with the cursor free. Click and drag the scene to turn, or scroll and choose options in the task panel. Scroll over the scene to zoom; the zoom buttons and keyboard plus/minus are alternatives.
5. Press **X** or **Lock cursor (X)** to turn by moving the mouse. Press **X** again or **Tab** to free the cursor and return to click-and-drag turning. The toolbar states the current mode. X does not interrupt text fields, selects or editable content. Touchscreens use drag and zoom buttons.
6. Complete the practical task, then write the reflection and save/export its record inside the same view.
7. **Escape** or **Exit fullscreen** returns to the page without duplicating or resetting the activity.

The final mission's **Go to this objective** selects the appropriate role and room. It first prompts a preserved initial plan, then follows the required capabilities and final revision. All role packs, task controls, feedback, histories, downloads and confirmation dialogs remain available in fullscreen.

Week 12 is the after-action account of Last Light. The final debrief links to that page explicitly; following the link changes pages and leaves fullscreen. The final mission itself, including resolution and export, can be completed in one fullscreen run.

## Implementation guarantees and fallbacks

- Existing DOM controls move into the scene and back; there is one authoritative activity state and one set of event listeners.
- Native fullscreen starts from the learner's fullscreen button. Pointer lock requires a separate deliberate X keypress or labelled toggle click; entering fullscreen and clicking the canvas never request it.
- If native fullscreen is unavailable or rejected, a full-window top-layer view keeps the mission above the site's header. If pointer lock is unavailable, enabling X mouse-look turns the view only while the mouse is over the scene; the toolbar discloses that the cursor remains available. X returns to drag controls. Late lock responses cannot recapture a cursor the learner already released.
- Wheel handling is scoped to the canvas; scrolling the instructions does not zoom the scene.
- Native browser confirmation prompts were replaced with accessible in-scene dialogs to prevent accidental fullscreen exits.
- Keyboard focus returns to the entry button after exit. Text inputs do not trigger walking. Dialog cancellation preserves the current attempt.
- New A2 trials use the relay's digital objective. Existing saved histories remain intact, including optional planning notes.
- Reflections follow the practical task. Predictions, recall and plan revisions remain inside the activity when they are the skill being practised.

## Earlier local verification — 20 September 2026, commit 1f4a73a

Validation was performed on the production build in local Chromium. The 3D browser runs use SwiftShader; longer completion journeys select the existing Lightweight graphics option. Native mouse capture was checked separately from explicitly denied-API fallback tests.

- `pnpm check`: passed, 112 curriculum/domain/save tests, zero type errors; 59 generated pages passed static accessibility and link checks.
- `pnpm check:evidence`: passed; the four existing PROCESS.md commit citations resolve.
- Core browser suite: 68 passed across 1920×1080 and 390×844. Covers all twelve labs, phase/reset dialog cancellation, original mission endings, export/import/reset, no-JavaScript worksheets and storage failures.
- Immersive browser suite: all 16 distinct scenarios passed across the integrated and targeted reruns. The last native/responsive rerun passed all four cases without skips. Covers native fullscreen/pointer lock, mouse-driven camera changes, Escape/Tab, denied APIs, complete three-phase Lab 4, A1, A2 and final-mission exports, preserved plans, demonstration controls and state restoration.
- The final mission was rerun at both marking viewports after making Task controls select its current objective’s role/room: both complete recovery/export journeys passed.
- Resizing/touch checks: 390×844, 320×700, 844×390 and 768×1024.
- Worked-example and 3D scene regression suite: 55 passed, one existing phone skip for the desktop room/resource-stability sweep (the phone workbench and failure journeys still run). Together with the core suite, 123 regression cases passed.
- Final worked-example fullscreen check: both viewport cases passed, including reading/downloading the finished example and cancelling a restart without losing the response.
- Rendered fullscreen accessibility: six combinations (Lab 1, final mission, final demonstration × both marking viewports) passed with zero WCAG A/AA violations. [Recorded results](evidence/immersive-accessibility.json).
- The preview returned HTTP 200 through both WSL and Windows localhost.

### Commands

```sh
pnpm check
pnpm check:evidence
pnpm exec playwright test tests/browser/course.e2e.ts tests/browser/training.e2e.ts tests/browser/mission-restore.e2e.ts
pnpm exec playwright test tests/browser/demonstrations.e2e.ts tests/browser/world.e2e.ts
pnpm exec playwright test tests/browser/immersive.e2e.ts
node tools/immersive-review.mjs
```

Use an independent preview server when running separate browser commands concurrently. The first run's shared Playwright-owned server shut down while another command still needed it; those connection failures were rerun against an independent server. Parallel software rendering also exposed bounded native-API timing waits; actual native API assertions remain required.

### Visual review

The retained [desktop view](evidence/immersive-mission-desktop.png) and [phone view](evidence/immersive-mission-phone.png) were inspected. The review led to a top-layer fallback to keep Exit visible, a more compact phone toolbar, a persistent objective title and a direct task-control shortcut. Rendered accessibility review additionally identified and corrected the toolbar's hover contrast.

These checks establish the recorded local browser behaviour. They do not establish physical-phone performance, student enjoyment, learning effectiveness, publication or an assessment grade. The user retains control of pushing and deployment.

## Cursor and compact-layout follow-up — 20 September 2026

Adithya's screenshot exposed oversized controls, overlapping scene overlays and a playback label broken across lines. Their use also established that automatic cursor capture prevented comfortable access to the task panel.

- Fullscreen now opens with a free cursor. X toggles mouse-look; X again or Tab releases it. Ordinary canvas clicks keep drag-to-turn. The status bar and toggle button show the mode.
- Form fields, selects, held X keys and modified shortcuts keep their ordinary behaviour.
- A local interface scale overrides the course page's larger prose/control styles. Scene labels and equipment actions have their own rows. Playback pace has an intact label beside its selector.
- Selected roles, rooms and example chapters stay visibly selected. Touch controls retain usable targets.
- Narrow-screen testing exposed a second issue: long status messages could consume the scene's height. Scene updates now scroll in a bounded, keyboard-focusable strip. Portrait and landscape layouts reserve useful scene space alongside the task controls.
- The embedded Take Control demonstration also removes the redundant mode badge that previously collided with equipment buttons.

### Follow-up verification

- `pnpm check`: 112 tests passed; zero type errors/warnings (two existing hints). The final production build generated 59 pages with no broken links, base-path failures or static accessibility violations.
- `pnpm check:evidence`: all four process citations resolve.
- The complete updated immersive suite passed **16/16** cases in one serial run, at 1920×1080 and 390×844. This includes actual native fullscreen/capture, X lock/release, Tab/Escape, typed X and select safety, drag versus hover, denied-API fallback, independent panel scrolling, complete lab/A1/A2/final exports, demonstrations, and resizing/touch at 320×700, 844×390 and 768×1024.
- Rendered accessibility review passed **eight** views with zero WCAG A/AA violations and no horizontal panel overflow: Lab 1, final mission, Lab 1 demonstration and final demonstration at both marking viewports. [Results and measured layout](evidence/compact-fullscreen-accessibility.json).
- The [compact desktop demonstration](evidence/compact-fullscreen-desktop.png) and [completed final mission on phone](evidence/compact-fullscreen-phone.png) were visually inspected. The playback label stays intact, selected mode remains clear, scene labels/actions no longer overlap, and long final feedback no longer collapses the phone scene.

### Native mouse-input evidence

The first headless test acquired pointer lock but produced equal-and-opposite trusted movement pairs from each absolute automation gesture. Their net movement was zero. Increasing the number of absolute moves confirmed that test-environment behaviour rather than an application failure.

The portable regression retains actual native fullscreen/capture/release assertions and explicitly uses scripted relative deltas for the camera-handler integration check. A separate headed Chromium check under Xvfb used **real XTest relative mouse input**: a trusted locked `(12, 4)` event changed the rendered camera from `0.000,3.514,8.550` to `-0.360,3.604,8.550`. [Native input record](evidence/native-pointer-input.json).

The optional reproduction is `xvfb-run -a pnpm exec node tools/native-pointer-review.mjs`; it uses existing Linux Xvfb, Python, X11 and XTest libraries, and adds no mandatory dependency to the portable tests or build. Camera logic was not altered to compensate for headless cursor warping.

All results are local. Phone viewports and emulated touch do not establish physical-device performance. Publication remains with Adithya. Earlier results above remain attached to their original implementation.
