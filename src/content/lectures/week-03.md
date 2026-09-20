---
title: "Think in Three Dimensions"
description: "Reconcile a fixed diagram with a differently oriented scene, predict its transformation, then verify direction and height independently."
week: 3
learningOutcomes: ["LO2"]
skillIds: ["LO2"]
activityId: "week-03"
caseFiles: ["SP-01","SP-02"]
teachers: ["mara-voss"]
date: 2027-03-08
related: ["sessions/week-03", "assessments/assignment-1"]
---

> **The week's question:** Reconnect a service module from its diagram. Identify whether a mismatch comes from the observer's view, module rotation or floor level.


> The drawing is correct. You are holding it the wrong way around.

## What you will learn

- Keep world directions fixed while the object or viewpoint changes.
- Predict both labelled ports before rotating and test the prediction.
- Diagnose direction and level errors separately using a transformation record.

## The briefing

### Distinguish reference frames

A reference frame is the directions against which you describe a position. The room's north arrow stays fixed. Moving the camera changes what looks left or right without changing world north. Rotating the module changes its labelled ports' world directions.

Mark an original port and predict where it will point after a quarter-turn. Track the other port separately; a familiar silhouette can conceal a wrong orientation. A correct spatial account should survive a changed camera view.

### Separate rotation from translation

Translation changes position without turning the object. Raising this connector changes its floor level, not its port directions. Diagnose a failed connection using two independent conditions: orientation and height. Changing both at once can obscure which original condition failed.

Use a transformation record: initial directions and level; intended change; predicted directions and level; observed result. The calculation is small, but the habit matters when a maintenance drawing and its physical space are oriented differently.

### Explain a mismatch

Commit to a prediction before manipulating the model. A failed prediction can show that you reversed clockwise, followed the camera rather than north, or coupled movement with rotation. In transfer, explain which part of the previous transformation remains reusable and which must be recalculated.

## Worked example · a different scenario

The separate dome example begins with north and west ports. One clockwise quarter-turn maps them to east and north. The demonstrator then raises the connector from level 0 to level 2 without changing those directions. When a later target calls for level 1 with the same ports, only height changes. A similar-looking mirrored substitute is rejected by checking its labels. In your assigned browser task, the controls test rotation and height; use the fixed compass and the original labelled port to justify both.

[Watch this separate example and inspect its finished record](/demonstrations/lab-03/).

## A plausible mistake

Mirroring a plan to make it match the screen can reverse left and right while leaving its outline plausible. A route then reaches the wrong side of a partition. Keep an asymmetric landmark and annotate the orientation.

## Supplied rule sheet

**Where to find the named materials:** These labels identify the supplied material on this page and in the combined campus pack; they are not separate files you need to locate. **SP-01** is the labelled north/east connector and fixed coordinate convention. **SP-02** supplies the target directions and floor levels for the three phases.

- The connector begins with ports pointing north and east on level 0.
- A rotation moves the connector clockwise by 90 degrees; its handedness remains unchanged.
- Practice target: ports east/south, level 0. Skill check: south/west, level 1. Transfer: west/north, level 2.
- Moving up a level changes position but not orientation. Levels cycle 0 → 1 → 2 → 0.
- Before testing, state where the original north port points. World directions remain fixed when the camera changes.

## Before the lab

Read SP-01 coordinate conventions (10 minutes). Sketch an everyday object from above and the side, labelling one shared feature (10 minutes).

## What happens next

A1 relates an unfamiliar workshop diagram to its connector. A physical final recovery may need this capability; a digital operation need not invent a transport problem.

Keep **spatial-model** from [this week's lab](/sessions/week-03/). [Download the campus pack](/campus/week-03.md).
