---
title: "Wake a Dead System"
description: "Trace a low-voltage circuit, select informative measurements and locate an open fault."
week: 5
learningOutcomes: ["LO3"]
skillIds: ["LO3"]
activityId: "week-05"
caseFiles: ["EL-01","EL-02"]
teachers: ["mara-voss"]
date: 2027-03-22
related: ["sessions/week-05", "assessments/assignment-2"]
---

> The cart is silent. A useful diagnosis begins before the first part is replaced.

## What you will learn

- Trace a complete current path through a supplied simple circuit.
- Use measurements to distinguish an open fuse from an open switch.
- Verify a repair without changing unrelated components.

## The briefing

A circuit needs a source, a load and a complete conducting path. An interruption can leave a device inactive while upstream components still appear healthy. The first task is to identify what each measurement represents: voltage is a difference between two named points, not an amount simply ‘inside’ a component.

The browser uses a deliberately simplified supply-node model. With power on, probe points read 6 V until a fuse/cable supply break; downstream nodes then read 0 V. An open lamp still has supply voltage, so a dark output with 6 V requires a different check: isolate the power and test continuity through the lamp. It is not a full analogue circuit solver and should not be used to predict arbitrary physical circuits. Diagnose using powered measurements, isolate before changing a part, then restore power and verify the original symptom. Preserve the failed readings: replacing the right part by luck is different from explaining why it was the right part.

## Worked example · a different scenario

The separate nine-volt beacon permits two simultaneous faults. Its powered trace is 9/9/0/0 V at source, fuse, cable and lamp supply. An isolated cable replacement restores 9 V throughout, but the same lamp stays dark. The first repair was supported and incomplete. An isolated continuity check then identifies an open lamp; replacing it and restoring power produces both 9 V and light. Your assigned cases publish a one-fault model, so derive the diagnosis from their own rules and measurements instead of assuming this example's two defects.

[Watch this separate example and inspect its finished record](/demonstrations/lab-05/).

## A plausible mistake

‘There is 6 V in the circuit’ is too vague to be diagnostic. Measuring the source confirms its voltage but not that the lamp has a complete path. Replacing every component hides which fault caused the symptom.

## Supplied rule sheet

**Where to find the named materials:** These labels identify the supplied material on this page and in the combined campus pack; they are not separate files you need to locate. **EL-01** is the six-volt circuit and its labelled probe-node rule. **EL-02** supplies the phase faults and diagnostic recording requirements; the campus pack's student record is your measurement sheet.

- The idealised bench model uses a 6 V source, fuse, switch/cable, lamp and common return.
- Probe labels refer to the node after each named component, measured relative to the common return.
- With power on, a fuse or cable supply break gives 6 V before the break and 0 V at downstream nodes. An open lamp can still have 6 V at its supply node while remaining dark.
- Practice fault: fuse. Skill-check fault: cable. Transfer fault: open lamp; its powered supply readings remain 6 V.
- A zero voltage reading while power is off does not locate a supply fault. For fuse/cable faults, record the powered zero node before isolation and replacement. For the open lamp, first observe healthy 6 V supply with a dark output; isolate power and use the continuity check to confirm the open lamp before replacing it.
- This deliberately simplified node model is not a full analogue circuit solver. Campus readings depend on the actual apparatus.

## Before the lab

Trace EL-01 from source to return (10 minutes). Write predicted lamp states for an open switch and a broken return (10 minutes).

## What happens next

Restore the archive carriage's support circuit with a documented fault diagnosis. The lab produces **circuit-diagnosis**, which becomes evidence for [the connected assessment](/assessments/assignment-2/).

[Open this week's lab](/sessions/week-05/) · [Download the campus pack](/campus/week-05.md) · [Explore the academy](/academy/)
