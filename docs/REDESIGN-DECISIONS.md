# Actual redesign decisions

## 1. Replace the initial learning experience

The user rejected the previous emphasis on evidence classification and short symbolic sequences. They explained the appeal of learning unusual, practical capabilities and requested a curriculum redesign before implementation. The replacement therefore changes the weekly activities as well as presentation. The fixed academic platform and fictional training boundary remain requirements.

**Implementation:** [8aca1cd](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Adithya-Rama/commit/8aca1cd).

## 2. Keep exploration and direct access together

The approved direction combines a third-person academy with a self-contained GitHub Pages course. Conventional navigation stays present, while labs and assessments can launch the shared 3D renderer. Distinct role tools and screen sharing support teamwork; a solo student can switch roles.

## 3. Distinguish interrupted practice from recorded evidence

Implementation review found that saving only explicit records would lose unfinished work. Separate checkpoints now retain model state and reflection. Recording evidence remains an explicit action. Imports validate the same model domains used by activities before restoring a checkpoint.

## 4. Make rendered geometry agree with the lesson

Scene screenshots exposed equal-sized gears in a 12:24 lesson and a dark strip beside the canvas. The scene now uses the actual authored tooth counts and correct centre spacing. Phone controls moved below the apparatus view. Arrival props were also checked against the observations they are supposed to support.

These are agent observations, not the student's personal playtest.

## 5. Distinguish available voltage from a functioning lamp

Model review found that an open lamp should still receive supply voltage at its input. The transfer circuit now distinguishes interrupted supply from a failed load and adds an isolated continuity check. Teaching text, feedback and regression tests follow that corrected model.

## 6. Recheck current feasibility

Mission review found that changing a previously working machine could leave its task marked complete. The model now checks the current configuration before resolving the mission, and requires diagnosis where promised. Declared objectives are compared with final resolutions. Open-ended explanations remain subject to human judgement.

## 7. Repair phone readability

Rendered inspection found that a slide matrix overflowed at 390 px and assessment descriptors required horizontal reading. The slide sizing was corrected and descriptors became vertical sections. All fourteen slides were inspected at both marking sizes.

The rendered accessibility audit also found that small gold headings in memory and policy panels had a 3.04:1 contrast ratio. Scoped dark ink replaces that use of gold, preserving the SlopU brand tokens.

## Evidence and limits

See the [curriculum review](CURRICULUM-REVIEW.md), [validation record](REDESIGN-VALIDATION.md) and screenshots under [evidence/redesign](evidence/redesign/).

The in-app browser runtime failed before connecting because its desktop sandbox helper could not initialise. The existing local Playwright/Chromium tooling supplied the browser checks. These establish local behaviour; they do not establish live deployment, physical-phone performance, classroom equipment validation or student acceptance.
