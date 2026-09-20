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

## Your mission, in plain language

Find the failed part of a supplied model circuit using measurements, then replace it and verify the result.

**What you will produce:** Measurements locating the original fault, a replacement and verification trace, and a comparison with a different fault.

**Start here:** read the steps under **Browser route** on this page, then open the browser lab. If you want to see an example first, use the separate demonstration; it shows different data and does not complete this activity.

## Before you arrive

Trace EL-01 from source to return (10 minutes). Write predicted lamp states for an open switch and a broken return (10 minutes).

Read the [briefing](/lectures/week-05/). All starting rules and data are supplied here, so you can begin directly even if you missed an earlier lab. Choose the browser route or [campus pack](/campus/week-05.md). Both assess the outcomes below.

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

These six rows are the session timetable, not six hidden game objectives. **Briefing** means read the task; **Learn** means inspect an example; **Practise**, **Test** and **Transfer** correspond to the three playable phases; **Debrief** means explain and save your work afterwards. You can pause and take longer.

| Time | Activity |
| --- | --- |
| 0–10 minutes | Briefing: name the skill, published rules and evidence to produce. |
| 10–30 minutes | Learn: inspect the worked example and predict its outcome before checking. |
| 30–60 minutes | Practise: complete the first configuration, inspect feedback and retry deliberately. |
| 60–80 minutes | Test: attempt the changed configuration and preserve the result. |
| 80–105 minutes | Transfer: apply the same principle in the unfamiliar situation below. |
| 105–120 minutes | Debrief: compare predictions with results, reflect and export the record. |

## Browser route

### Do these actions in order

1. Select **Practice**, then **Switch on**. Use **Measure battery**, **Measure fuse**, **Measure cable** and **Measure lamp** to collect powered readings.
2. Compare the readings in order. Find where the supply first disappears. A dark lamp with a correct supply may instead have an internal fault.
3. Select **Isolate power** before changing a part or using a **Test … continuity** control. Continuity means whether the isolated component provides the expected connected path.
4. Use the appropriate **Replace…** control for the fault your measurements support. Select **Switch on**, measure again and check whether the lamp lights.
5. Select **Test this configuration**. If you replaced parts without first measuring the fault, use **Restart this phase** and collect a diagnostic trace.
6. Try **Skill check** and **Transfer challenge**. Their faults differ; the transfer lamp needs an isolated continuity check. Afterwards explain which measurement distinguished the fault from an alternative.

### Finish and keep your work

After each practical phase, open **After playing · explain and save this attempt**, write a brief reflection and select **Record attempt in skills passport** before switching phases. Keep the attempts and changed-condition evidence you discuss; an unfinished attempt can still be useful if you explain its limit. Export a backup using the passport tools.

For an uninterrupted view, choose **Fullscreen mission**. The **Mission & controls** panel contains the task and lesson controls. Scroll over the scene to zoom, use **Mouse look** to look around, and press **Tab** to release the pointer for controls. **Esc** or **Exit fullscreen** returns to the page. Touch and keyboard controls remain available.

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
