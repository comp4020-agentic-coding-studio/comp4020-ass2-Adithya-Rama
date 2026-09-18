---
title: "Wake a Dead System"
description: "Trace a low-voltage circuit, select informative measurements and locate an open fault."
week: 5
learningOutcomes: ["LO3"]
skillIds: ["LO3"]
activityId: "week-05"
caseFiles: ["EL-01","EL-02"]
teachers: ["mara-voss"]
date: 2027-03-26
checkpointDue: 2027-03-26T17:00:00+11:00
produces: ["circuit-diagnosis"]
requires: ["mechanism-diagnosis"]
sampleAvailable: true
campusPack: "/campus/week-05.md"
browserActivity: "/sessions/week-05/#activity"
assessmentIds: ["fieldwork", "assignment-2"]
related: ["lectures/week-05", "assessments/assignment-2", "assessments/fieldwork"]
spec:
  - "demonstrate the named skill and explain a transfer to a changed situation"
  - "record predictions, observations and remaining uncertainty"
  - "export the evidence; practice progress is not an academic submission"
---

## Before you arrive

Trace EL-01 from source to return (10 minutes). Write predicted lamp states for an open switch and a broken return (10 minutes).

Read the [briefing](/lectures/week-05/). Bring your earlier record if available; direct entrants can use the labelled sample without completing previous games. Choose the browser route or [campus pack](/campus/week-05.md). Both assess the outcomes below.

## What you will learn

- Trace a complete current path through a supplied simple circuit.
- Use measurements to distinguish an open fuse from an open switch.
- Verify a repair without changing unrelated components.

## Supplied case file and rules

- The idealised bench model uses a 6 V source, fuse, switch/cable, lamp and common return.
- Probe labels refer to the node after each named component, measured relative to the common return.
- With power on, a fuse or cable supply break gives 6 V before the break and 0 V at downstream nodes. An open lamp can still have 6 V at its supply node while remaining dark.
- Practice fault: fuse. Skill-check fault: cable. Transfer fault: open lamp; its powered supply readings remain 6 V.
- A zero voltage reading while power is off does not locate a supply fault. For fuse/cable faults, record the powered zero node before isolation and replacement. For the open lamp, first observe healthy 6 V supply with a dark output; isolate power and use the continuity check to confirm the open lamp before replacing it.
- This deliberately simplified node model is not a full analogue circuit solver. Campus readings depend on the actual apparatus.

## The two-hour lab

| Time | Activity |
| --- | --- |
| 0–10 minutes | Briefing: name the skill, published rules and evidence to produce. |
| 10–30 minutes | Learn: inspect the worked example and predict its outcome before checking. |
| 30–60 minutes | Practise: complete the first configuration, inspect feedback and retry deliberately. |
| 60–80 minutes | Test: attempt the changed configuration and preserve the result. |
| 80–105 minutes | Transfer: apply the same principle in the unfamiliar situation below. |
| 105–120 minutes | Debrief: compare predictions with results, reflect and export the record. |

## Browser route

Launch the activity below or travel to the Systems Garage in the academy. Inspect the controls and objective before acting. Camera movement, walking speed and pointer precision are not learning criteria. Keyboard controls and the interactive text view use the same published domain rules. Pause or leave at a checkpoint.

**Practise.** Power the model, compare battery and downstream nodes, and find the first zero supply reading. Isolate power before replacing the fuse; then verify the lamp node.

**Skill check.** Diagnose the cable fault using consecutive node readings. Record the powered zero reading before replacing anything.

**Transfer.** Diagnose a dark lamp with healthy 6 V supply readings. Isolate power, check the lamp's continuity and identify the open load. Replace it, restore power and verify light as well as voltage.

## Campus route

[Printable circuit and grid sheet](/campus/circuit-sensor-sheet.svg). Print at 100% on A4; each sheet includes a 50 mm scale check.

**Equipment:** Preferred: battery-powered educational circuit kit with a lamp, switch and protected low-voltage source; labels and fault cards. No mains supplies. A printed circuit with voltage cards is an equally available conceptual route.

**Setup:** Prepare a healthy series loop and label both sides of each component. The facilitator introduces one open fault at a time. Verify the kit's manufacturer instructions and component ratings before class; the proposed physical setup has not been hardware-tested by this prototype.

**Activity:** Students submit predicted measurements before using an instrument or revealing voltage cards. The facilitator controls power and component changes. Distinguish ideal-model answers from the actual measured tolerance of the kit.

The [printable facilitator pack](/campus/week-05.md) includes rules, prompts and explanation. Campus apparatus is a proposed teaching design; physical construction and handling have not been validated by browser tests. Use the paper model when equipment is unavailable.

## What leaves the room

**circuit-diagnosis** contains your initial prediction, activity results, changed-situation response and approximately 100 words of reflection. Include the scenario, route used, assistance and hints. Keep failed attempts that explain a useful revision.

Restore the archive carriage's support circuit with a documented fault diagnosis.

## Feedback and explanation

The first zero node localises a supply break in the fuse/cable cases. An open lamp is different: supply voltage remains present, so confirm the load fault using continuity with power isolated. Verify the repaired output, not voltage alone.

**Worked reflection:** Battery and fuse nodes read 6 V while the cable output read 0 V. I isolated power, replaced the cable and restored power. A 6 V lamp-node reading supported the repair.

## How to judge the response

A strong record demonstrates the capability, tests it under a changed condition and explains any gap between prediction and observation. Merely reaching a game ending is insufficient. An unsuccessful result can still provide useful diagnostic evidence when its limits are stated accurately. Review feedback before writing your own explanation; do not present the exemplar as your original work.

## Closing reflection

Which measurement reduced uncertainty most, and which merely repeated what you already knew?

## Afterwards

Export your record and keep a backup. It contributes to [Weekly Fieldwork](/assessments/fieldwork/), with the best ten of twelve counting. Continue to [the assessment brief](/assessments/assignment-2/) and consult [policies](/policies/) for access, collaboration and extensions. Exporting does not submit coursework.
