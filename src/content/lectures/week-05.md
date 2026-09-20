---
title: "Wake a Dead System"
description: "Choose circuit measurements that distinguish faults, repair what the evidence supports and verify the powered result."
week: 5
learningOutcomes: ["LO3"]
skillIds: ["LO3"]
activityId: "week-05"
caseFiles: ["EL-01","EL-02"]
teachers: ["mara-voss"]
date: 2027-03-22
related: ["sessions/week-05", "assessments/assignment-2"]
---

> **The week's question:** A model beacon is dark. Choose measurements that distinguish a supply break from an output fault before replacing anything.


> The cart is silent. A useful diagnosis begins before the first part is replaced.

## What you will learn

- Predict measurement patterns for two causes of the same dark output.
- Use paired powered readings or isolated continuity to justify a repair.
- Verify supply and output afterwards and state the model's limits.

## The briefing

### A symptom does not locate a fault

The ideal loop contains a six-volt source, fuse, switch/cable, lamp and return. Node readings are measured relative to common return after the named component. A dark lamp can result from a supply break or an open lamp with its supply still present.

Predict patterns for at least two candidate faults. An upstream healthy reading paired with a downstream zero brackets a supply break. One zero measured with power off does not locate a fault in the operating supply.

### Make measurements answer a question

Choose adjacent powered readings across a candidate break, or isolate power and test the component's continuity. Continuity asks whether the isolated component supplies its expected conducting path. Include power state in every observation.

When a lamp has healthy supply but stays dark, more upstream readings may add little. Isolated continuity asks a different question. The useful next test depends on what is already known; measuring every node is a beginner strategy, not the final goal.

### Repair and verify separately

Isolate before changing a component. Support the replacement with the earlier trace. Restore power, obtain a fresh supply reading and verify the output. Replacing a part is an action, not proof of repair. If verification fails, keep that failure and reconsider the remaining hypotheses.

The browser is simplified. Physical kits have tolerances and additional failure modes. Label paper-card results as simulated and instrument readings as measured; neither automatically validates the other.

## Worked example · a different scenario

The separate nine-volt beacon permits two simultaneous faults. Its powered trace is 9/9/0/0 V at source, fuse, cable and lamp supply. An isolated cable replacement restores 9 V throughout, but the same lamp stays dark. The first repair was supported and incomplete. An isolated continuity check then identifies an open lamp; replacing it and restoring power produces both 9 V and light. Your assigned cases publish a one-fault model, so derive the diagnosis from their own rules and measurements instead of assuming this example's two defects.

[Watch this separate example and inspect its finished record](/demonstrations/lab-05/).

## A plausible mistake

‘There is 6 V in the circuit’ is too vague to be diagnostic. Measuring the source confirms its voltage but not that the lamp has a complete path. Replacing every component hides which fault caused the symptom.

## Supplied rule sheet

**EL-01** is the six-volt circuit and probe convention. **EL-02** is the facilitator's measurement-card set; the student chooses which reading to request.

- Model loop: 6 V source → fuse → switch/cable → lamp → common return.
- Probe labels mean the node after each named component, measured relative to common return.
- A supply break can leave healthy voltage upstream and zero downstream. An open lamp can have a healthy supply while remaining dark.
- Candidate faults include fuse, cable and lamp. Each phase starts with one unknown open component.
- Justify a replacement using adjacent powered readings that bracket the break, or an isolated continuity check showing the candidate is open.
- Record power state. Isolate before continuity testing or replacement. Zero measured while off does not locate an operating supply break.
- After replacement, restore power, obtain a fresh lamp-supply measurement and inspect the output. A lit lamp alone does not demonstrate your initial diagnosis.
- This is an idealised node model; label real measurements separately from simulated cards.

## Before the lab

Trace EL-01 from source to return (10 minutes). Write predicted lamp states for an open switch and a broken return (10 minutes).

## What happens next

A2 requires a diagnosis another role can use. Final power checks support transmission or continuous support, and transport only when the selected route depends on power.

Keep **circuit-diagnosis** from [this week's lab](/sessions/week-05/). [Download the campus pack](/campus/week-05.md).
