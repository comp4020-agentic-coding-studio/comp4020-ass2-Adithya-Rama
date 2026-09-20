---
title: "Wake a Dead System"
description: "Choose circuit measurements that distinguish faults, repair what the evidence supports and verify the powered result."
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

**Your task:** A model beacon is dark. Choose measurements that distinguish a supply break from an output fault before replacing anything.

**What you will produce:** Keep candidate faults, predicted readings, selected measurements and power states, the repair and fresh powered verification. Explain why a plausible alternative no longer fits.

**Start here:** in-person attendance is preferred. Read the briefing and **In-person lab** instructions. If you cannot attend, use the **Online lab** with the same learning record. The 3D environment also supports preparation and revision.

## Before you arrive

Trace EL-01 from source to return (10 minutes). Write predicted lamp states for an open switch and a broken return (10 minutes).

Read the [briefing](/lectures/week-05/). All starting rules and data are supplied here, so you can begin directly even if you missed an earlier lab. For the preferred in-person route, read the [campus pack](/campus/week-05.md). The online route is available when you cannot attend. Both assess the outcomes below.

## What you will learn

- Predict measurement patterns for two causes of the same dark output.
- Use paired powered readings or isolated continuity to justify a repair.
- Verify supply and output afterwards and state the model's limits.

## Supplied case file and rules

**EL-01** is the six-volt circuit and probe convention. **EL-02** is the facilitator's measurement-card set; the student chooses which reading to request.

- Model loop: 6 V source → fuse → switch/cable → lamp → common return.
- Probe labels mean the node after each named component, measured relative to common return.
- A supply break can leave healthy voltage upstream and zero downstream. An open lamp can have a healthy supply while remaining dark.
- Candidate faults include fuse, cable and lamp. Each phase starts with one unknown open component.
- Justify a replacement using adjacent powered readings that bracket the break, or an isolated continuity check showing the candidate is open.
- Record power state. Isolate before continuity testing or replacement. Zero measured while off does not locate an operating supply break.
- After replacement, restore power, obtain a fresh lamp-supply measurement and inspect the output. A lit lamp alone does not demonstrate your initial diagnosis.
- This is an idealised node model; label real measurements separately from simulated cards.

## From example to independent challenge

**Worked example:** use the alternate scenario to learn the method. Its completed decisions cannot be copied into your assigned case.

**Practice:** use prompts and hints, recording help. Make the prediction or choice before checking.

**Skill check:** begin from the objective and evidence. Decide which test or action matters before consulting the optional explanation.

**Transfer:** inspect the changed condition. Decide what it invalidates and what remains supported; a justified unchanged decision can be correct.

## The two-hour lab

These are the teaching session's time blocks, not six compulsory game objectives. Adjust timing as needed; reasoning matters more than speed.

| Time | Activity |
| --- | --- |
| 0–10 minutes | Sketch the current path and predict two reasons for a dark output. |
| 10–30 minutes | Pause the alternate two-fault example after its first repair; predict verification results. |
| 30–60 minutes | Select and record measurements, isolate and replace only the supported part. |
| 60–80 minutes | Diagnose the second fault using an evidence pair rather than a disclosed name. |
| 80–105 minutes | Investigate a changed symptom; change test type if healthy supply is insufficient. |
| 105–120 minutes | Keep prediction, diagnosis, repair and fresh verification, including any failed verification. |

## In-person lab · preferred route

[Printable circuit and grid sheet](/campus/circuit-sensor-sheet.svg). Print at 100% on A4; each sheet includes a 50 mm scale check.

**Equipment:** Preferred: battery-powered educational circuit kit with a lamp, switch and protected low-voltage source; labels and fault cards. No mains supplies. A printed circuit with voltage cards is an equally available conceptual route.

**Setup:** Prepare a healthy series loop and label both sides of each component. The facilitator introduces one open fault at a time. Verify the kit's manufacturer instructions and component ratings before class; the proposed physical setup has not been hardware-tested by this prototype.

**What you do together:** Predict competing circuit-fault patterns, request adjacent powered readings or isolated continuity, then make the supported repair. Obtain fresh supply and output verification.

The [printable facilitator pack](/campus/week-05.md) includes rules, prompts and explanation. Campus apparatus is a proposed teaching design; physical construction and handling have not been validated by browser tests. Use the paper model when equipment is unavailable.

Keep the same prediction, changed-condition attempt and explanation as the online route. A dated observation, test, agreement or route sheet serves as the action record. Add acknowledgement where a handoff is part of the task; an additional browser run is not required.

## Online lab · equivalent participation and revision

### Do these actions in order

1. Select **Practice** and predict readings for two candidate faults. Choose the next useful measurement rather than replacing parts to see what happens.
2. With **Switch on**, use the named **Measure…** controls. A supply-break diagnosis needs a healthy upstream reading and the next zero reading; one zero alone is insufficient.
3. Use **Isolate power** before **Test … continuity** or a replacement. An isolated open result can support the component diagnosis; healthy supply to a dark lamp calls for a different test.
4. Use the **Replace…** control justified by your observations. Restore power and take a new lamp-supply reading; inspect whether the lamp now lights.
5. Select **Test this configuration**. If the original evidence is missing, restart and investigate before replacing. Complete the beacon consequence below and save the trace.
6. Repeat with the unknown faults in **Skill check** and **Transfer challenge**. Explain which measurement ruled out an alternative, and keep any failed verification.

### Put your solution into effect

A correct equipment check is the preparation for your mission action. In **Field operation**, first **Inspect mission station**. Once your skill check is verified, select **Connect the verified beacon circuit**. The scene and mission record now show the consequence: The measured and repaired circuit powers the approach beacon; the receiving crew acknowledges the signal.

Collect the named result or record, follow the checkpoint controls in order (or visit the marked stations in the scene), and select **Confirm the approach signal is received** at the receiver. The status changes to **Mission accomplished** only after that acknowledgement. Keyboard and touch controls perform the same actions. If you change the underlying model, the dependent intervention must be verified again.

Your mission outcome is practice evidence, not an academic grade. Explain its reasoning in the debrief after playing.

### Finish and keep your work

After each practical phase, open **After playing · explain and save this attempt**, write a brief reflection and select **Record attempt in skills passport** before switching phases. Keep the attempts and changed-condition evidence you discuss; an unfinished attempt can still be useful if you explain its limit. Export a backup using the passport tools.

For an uninterrupted view, choose **Fullscreen mission**. The **Mission & controls** panel contains the task and lesson controls. Scroll over the scene to zoom, click and drag to turn with the cursor free. Press **X** to lock the cursor for mouse-look; press **X** again (or **Tab**) to free it for scrolling and choosing options. **Esc** or **Exit fullscreen** returns to the page. Touch and keyboard controls remain available.

## What leaves the room

**circuit-diagnosis**

Keep candidate faults, predicted readings, selected measurements and power states, the repair and fresh powered verification. Explain why a plausible alternative no longer fits.

Include scenario and assistance. Preserve a failed attempt if it explains a useful revision. Add approximately 100 words connecting result to decision.

A2 requires a diagnosis another role can use. Final power checks support transmission or continuous support, and transport only when the selected route depends on power.

## Feedback and explanation

<details>
<summary>Optional explanation and separate exemplar · open after an attempt</summary>

A single zero is ambiguous. Pair upstream and downstream powered measurements or obtain isolated open continuity before replacement. After repair, a fresh lamp-supply reading and lit output verify more than the replacement action alone.

**Worked reflection from the separate demonstration:** The nine-volt beacon's first trace supported a cable repair. Afterwards every supply point read 9 V, but the lamp remained dark. I preserved that failed verification, isolated power, confirmed an open lamp and replaced it. I verified both light and supply before calling the whole repair complete.

[Inspect this example's complete record](/demonstrations/lab-05/). Use your own assigned scenario and observations for your reflection.

</details>

## How to judge the response

A strong response makes a decision the instructions did not supply, supports it with evidence and explains an alternative or limit. A model check establishes its published conditions only; a facilitator judges reasoning. Text length and game endings are not academic grades.

Keep candidate faults, predicted readings, selected measurements and power states, the repair and fresh powered verification. Explain why a plausible alternative no longer fits.

## Closing reflection

Which measurement reduced uncertainty most, and which merely repeated what you already knew?

## Afterwards

Export your record and keep a backup. It contributes to [Weekly Fieldwork](/assessments/fieldwork/), with the best ten of twelve counting. Continue to [the assessment brief](/assessments/assignment-2/) and consult [policies](/policies/) for access, collaboration and extensions. Exporting does not submit coursework.
