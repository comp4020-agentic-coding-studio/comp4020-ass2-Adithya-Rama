---
title: "Move Through the Model"
description: "Choose a route for an explicit objective, predict its published sensor events and compare its dependencies with an alternative."
week: 10
learningOutcomes: ["LO2","LO6"]
skillIds: ["LO2","LO6"]
activityId: "week-10"
caseFiles: ["SN-01","SN-02"]
teachers: ["mara-voss"]
date: 2027-05-10
related: ["sessions/week-10", "assessments/final-project"]
---

> **The week's question:** Plan a journey for its purpose: fast dispatch, support through a checkpoint or deliberate sampling of instrumented cells.


> The hall does exactly what its rules say. Your model might not.

## What you will learn

- Compare routes against an explicit objective and its distinct conditions.
- Predict a step-by-step contact trace using the cell-entry rule.
- Revise route or prediction after a changed map and defend the trade-off.

## The briefing

### A route needs an objective

The shortest route and fewest-contact route answer different questions. A support task may require a checkpoint that lengthens the trip. A survey may require deliberate sensor contact. Decide what must be achieved before labelling a count good or bad.

Each step ending in a marked cell produces one contact, including revisits. This is an explicit board-game model, not a description of real surveillance or evasion.

### Predict a trace as well as a total

Write moves and predicted contact positions before execution. If the total differs, compare traces to find the first mismatch. A final total can conceal opposite errors that cancel out.

Check boundaries, destination and objective-specific conditions. A correct contact prediction cannot rescue a route missing its required service stop. Extra contacts are not automatically failures when surveying is the objective.

### Compare and revise

Keep two candidate routes under the same map and objective. Record move count, expected contacts and required stops, then choose and execute. Preserve the earlier map when coverage changes.

You may retain the geometry and revise the prediction, or change the route because its suitability changed. Explain which response follows from the objective. A changed route is not intrinsically more thoughtful than a justified unchanged one.

## Worked example · a different scenario

The separate gallery example numbers cells 0–24 from top left. Its first route is 20→15→10→5→0→1→2→3; with sensors at 15, 16 and 11, it records one contact. An equally long route through 20→21→22→23→18→13→8→3 records none. When the published sensors move to 21, 22 and 23, that second route records three contacts. The earlier zero remains correct under the earlier rule. Your assigned lab uses its own row/column map and destination; copy the counting method, not these cell numbers. A later survey objective requires three instrument contacts. Under that requirement the three-contact route is useful, while a route chosen simply to avoid every contact would miss the objective.

[Watch this separate example and inspect its finished record](/demonstrations/lab-10/).

## A plausible mistake

Treating a diagram as an exact real-world sensor specification overextends the exercise. Within the simulation, another common error is assuming a successful route proves every prediction was correct. Compare the event trace as well as the ending.

## Supplied rule sheet

**Where to find the named materials:** These labels identify the supplied material on this page and in the combined campus pack; they are not separate files you need to locate. **SN-01** is the numbered grid, start, destination and cell-entry contact rule. **SN-02** supplies the published sensor layout for each phase; record which layout governs each route and trace.

- A 5×5 grid uses rows 1–5 from north to south and columns 1–5 from west to east.
- Start: row 5, column 1. Destination: row 1, column 5. Each action moves one cell north, south, east or west; boundaries prevent leaving the grid.
- Practice sensor cells: row 3, columns 1–4.
- Skill-check sensor cells: column 2, rows 2–5. Transfer: column 4, rows 2–5.
- A contact is counted on each executed step ending in a sensor cell, including revisits. Predict the total before stepping through the route.
- Contacts are explicit game events, not automatic failure. Reach the destination and reconcile the predicted and observed counts.
- These are published board-game detection rules, not specifications for real surveillance.
- Select an objective before planning: **Fast dispatch** reaches the goal within eight moves; **Support** visits centre row 3, column 3 before the goal; **Survey** visits at least two distinct sensor cells before the goal.
- All objectives need a correct predicted contact count. Zero contacts are not automatically best.

## Before the lab

Read SN-01 and classify five sample cells as observed/unobserved with reasons (20 minutes). Write which criterion your first route will prioritise.

## What happens next

A physical final recovery needs a route suited to its load and equipment. Digital and stabilisation approaches need relevant evidence rather than compulsory token navigation.

Keep **sensor-route** from [this week's lab](/sessions/week-10/). [Download the campus pack](/campus/week-10.md).
