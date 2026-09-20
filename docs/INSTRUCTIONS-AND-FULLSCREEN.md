# Clear instructions and immersive missions

## What changed

The course now states what to learn, which exact controls to use, how to recognise completion, and what evidence to keep. The home and index pages distinguish demonstrations, labs, assessment trials and written deliverables. Every lab includes a plain-language task and numbered actions; every assessment includes a start-to-finish play sequence and submission checklist.

Lab 1 defines observation, claim, inference and inspect at the point of use. The six timetable stages are explicitly distinguished from gameplay objectives. Lab instructions progress from practice to a changed skill check and a transfer challenge. A1 and A2 explain which richer lab records supplement their compressed trials.

## Playing inside the scene

1. Open the 3D environment.
2. Select **Fullscreen mission**.
3. Read the current objective in the persistent top bar. **Mission & controls** returns to the guide; **Task controls** jumps directly to the apparatus; in a mission it selects the role and room required by the displayed objective.
4. Move the mouse to look around. Scroll over the scene to zoom; the zoom buttons and keyboard plus/minus are alternatives.
5. Press **Tab** to release the cursor for inputs and buttons; **Mouse look** resumes camera control. Touchscreens use drag and zoom buttons.
6. Complete the practical task, then write the reflection and save/export its record inside the same view.
7. **Escape** or **Exit fullscreen** returns to the page without duplicating or resetting the activity.

The final mission's **Go to this objective** selects the appropriate role and room. It first prompts a preserved initial plan, then follows the required capabilities and final revision. All role packs, task controls, feedback, histories, downloads and confirmation dialogs remain available in fullscreen.

Week 12 is the after-action account of Last Light. The final debrief links to that page explicitly; following the link changes pages and leaves fullscreen. The final mission itself, including resolution and export, can be completed in one fullscreen run.

## Implementation guarantees and fallbacks

- Existing DOM controls move into the scene and back; there is one authoritative activity state and one set of event listeners.
- Native fullscreen and pointer lock start only from the learner's click. Pointer lock is requested first because fullscreen consumes transient activation; see the [Pointer Lock specification](https://www.w3.org/TR/pointerlock-2/).
- If native fullscreen is unavailable or rejected, a full-window top-layer view keeps the mission above the site's header. If pointer lock is unavailable, mouse movement over the scene still turns the view.
- Wheel handling is scoped to the canvas; scrolling the instructions does not zoom the scene.
- Native browser confirmation prompts were replaced with accessible in-scene dialogs to prevent accidental fullscreen exits.
- Keyboard focus returns to the entry button after exit. Text inputs do not trigger walking. Dialog cancellation preserves the current attempt.
- New A2 trials use the relay's digital objective. Existing saved histories remain intact, including optional planning notes.
- Reflections follow the practical task. Predictions, recall and plan revisions remain inside the activity when they are the skill being practised.

## Local verification — 20 September 2026

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
