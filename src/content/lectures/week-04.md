---
title: "Understand the Mechanism"
description: "Predict a training mechanism's motion, locate a failed dependency and verify a repair."
week: 4
learningOutcomes: ["LO2","LO3"]
skillIds: ["LO2","LO3"]
activityId: "week-04"
caseFiles: ["ME-01","ME-02"]
teachers: ["mara-voss"]
date: 2027-03-15
related: ["sessions/week-04", "assessments/assignment-1"]
---

> Forcing the handle would make something happen. Understanding the mechanism lets you choose what happens.

## What you will learn

- Predict relative speed and direction in a simple gear pair.
- Trace how an interlock and cam control an output.
- Diagnose a fault through observations that distinguish competing causes.

## The briefing

A mechanism transmits motion through connected parts. A gear pair relates the angular movement of two shafts; a cam converts rotation into a repeated follower motion. An interlock prevents a later action until a required state is present. These are different causal roles, so diagnosis begins by identifying where motion stops.

In the supplied model, a 12-tooth driving gear meshes externally with a 24-tooth driven gear. One full input turn produces half an output turn in the opposite direction. The cam on the output shaft moves the carriage only when the interlock is released. A stalled carriage can therefore have several causes: absent input, an unmeshed gear, or an engaged interlock. Choose an observation that discriminates between causes instead of changing every part at once.

## Worked example

Four input turns through a 24-tooth driven gear produce two output turns in the opposite direction. Yet a correct ratio does not guarantee motion: the interlock must be released, the spring attached and the cam set to 180 degrees. Diagnose readiness and ratio separately.

## A plausible mistake

Swapping parts until movement appears may reach a working state without explaining the fault. It also destroys the evidence of what mattered. Change one variable, state a prediction and preserve the before/after observations.

## Supplied rule sheet

- A 12-tooth driving gear externally meshes with a selectable 12-, 24- or 36-tooth driven gear. Output turns = 12 ÷ driven teeth × input turns, in the opposite direction.
- The model only moves with interlock released, return spring attached and cam at the published angle.
- An engaged interlock blocks cam adjustment. Release it before changing the cam.
- Practice: four input turns must produce two output turns, cam 180 degrees.
- Skill check: four input turns must produce four output turns, cam 180 degrees.
- Transfer: six input turns must produce two output turns, cam 90 degrees.
- This is an educational carriage mechanism, not a commercial lock or bypass procedure.

## Before the lab

Read the labelled ME-01 parts and trace its input-to-output chain (15 minutes). Predict the output after two input turns (5 minutes).

## What happens next

Diagnose Meridian's recovery carriage without treating a jam as an unexplained obstacle. The lab produces **mechanism-diagnosis**, which becomes evidence for [the connected assessment](/assessments/assignment-1/).

[Open this week's lab](/sessions/week-04/) · [Download the campus pack](/campus/week-04.md) · [Explore the academy](/academy/)
