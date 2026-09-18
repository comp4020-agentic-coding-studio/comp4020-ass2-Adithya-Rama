---
title: "Move Through the Model"
description: "Predict fictional sensor observations and compare a route model with the actual event trace."
week: 10
learningOutcomes: ["LO2","LO6"]
skillIds: ["LO2","LO6"]
activityId: "week-10"
caseFiles: ["SN-01","SN-02"]
teachers: ["mara-voss"]
date: 2027-05-10
related: ["sessions/week-10", "assessments/final-project"]
---

> The hall does exactly what its rules say. Your model might not.

## What you will learn

- Apply explicit range and visibility rules in a spatial model.
- Compare predicted sensor events with a recorded trace.
- Revise a route after a rule or environmental condition changes.

## The briefing

A sensor model describes which observations a fictional system produces. This lab uses a transparent board-game rule: entering a highlighted sensor cell records a contact. It deliberately avoids hidden real-world surveillance assumptions. Every student can inspect the complete detection set before moving.

A route and its prediction are separate artefacts. Two routes can reach the same destination while producing different observation traces. A shorter path, fewer contacts and easier verification are different objectives; state which you are pursuing. Preserve the predicted count, execute one step at a time and locate the first disagreement. When the sensor layout changes, recompute affected steps instead of assuming a previously successful route still has the same result. Contact is a modelled event to explain, not an academic penalty.

## Worked example

The practice route north, north, north, north, east, east, east, east reaches the destination and contacts the sensor at row 3, column 1 once. Travelling east along row 5 before moving north along column 5 reaches the same destination with zero contacts. Both are valid routes; the learning question is whether the prediction matches the rule.

## A plausible mistake

Treating a diagram as an exact real-world sensor specification overextends the exercise. Within the simulation, another common error is assuming a successful route proves every prediction was correct. Compare the event trace as well as the ending.

## Supplied rule sheet

- A 5×5 grid uses rows 1–5 from north to south and columns 1–5 from west to east.
- Start: row 5, column 1. Destination: row 1, column 5. Each action moves one cell north, south, east or west; boundaries prevent leaving the grid.
- Practice sensor cells: row 3, columns 1–4.
- Skill-check sensor cells: column 2, rows 2–5. Transfer: column 4, rows 2–5.
- A contact is counted on each executed step ending in a sensor cell, including revisits. Predict the total before stepping through the route.
- Contacts are explicit game events, not automatic failure. Reach the destination and reconcile the predicted and observed counts.
- These are published board-game detection rules, not specifications for real surveillance.

## Before the lab

Read SN-01 and classify five sample cells as observed/unobserved with reasons (20 minutes). Write which criterion your first route will prioritise.

## What happens next

Navigate Meridian's instrumented maintenance corridor under a published simulation contract. The lab produces **sensor-route**, which becomes evidence for [the connected assessment](/assessments/final-project/).

[Open this week's lab](/sessions/week-10/) · [Download the campus pack](/campus/week-10.md) · [Explore the academy](/academy/)
