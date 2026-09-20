# SLOP4408 — Week 5: Wake a Dead System

Campus / printable lab pack · Semester 1, 2027

## The task

A model beacon is dark. Choose measurements that distinguish a supply break from an output fault before replacing anything.

In-person teaching is preferred. The paper route is a complete conceptual activity when apparatus is unavailable; online students use the equivalent controls and keep the same learning record.

After the supported repair and fresh supply/output verification, **connect the verified beacon circuit**. On paper, reveal the restored 6 V supply and lit-output cards; with an approved low-voltage kit, record the actual measured supply and lamp state. Have the receiving partner record **Approach signal received** only after seeing that output. Label a solo acknowledgement as a self-check and paper readings as simulated.

## Learning outcomes

- Predict measurement patterns for two causes of the same dark output.
- Use paired powered readings or isolated continuity to justify a repair.
- Verify supply and output afterwards and state the model's limits.

## Equipment

Preferred: battery-powered educational circuit kit with a lamp, switch and protected low-voltage source; labels and fault cards. No mains supplies. A printed circuit with voltage cards is an equally available conceptual route.

## Facilitator setup

Use the voltage and continuity cards below, or a facilitator-prepared protected low-voltage teaching kit. Introduce one open component per round without naming it. Follow the kit's ratings and instructions; this proposed setup has not been physically validated.

## Complete supplied rules

**EL-01** is the six-volt circuit and probe convention. **EL-02** is the facilitator's measurement-card set; the student chooses which reading to request.

- Model loop: 6 V source → fuse → switch/cable → lamp → common return.
- Probe labels mean the node after each named component, measured relative to common return.
- A supply break can leave healthy voltage upstream and zero downstream. An open lamp can have a healthy supply while remaining dark.
- Candidate faults include fuse, cable and lamp. Each phase starts with one unknown open component.
- Justify a replacement using adjacent powered readings that bracket the break, or an isolated continuity check showing the candidate is open.
- Record power state. Isolate before continuity testing or replacement. Zero measured while off does not locate an operating supply break.
- After replacement, restore power, obtain a fresh lamp-supply measurement and inspect the output. A lit lamp alone does not demonstrate your initial diagnosis.
- This is an idealised node model; label real measurements separately from simulated cards.

## Two-hour schedule

These are the teaching session's time blocks, not six compulsory game objectives. Adjust timing as needed; reasoning matters more than speed.

| Time | Activity |
| --- | --- |
| 0–10 minutes | Sketch the current path and predict two reasons for a dark output. |
| 10–30 minutes | Pause the alternate two-fault example after its first repair; predict verification results. |
| 30–60 minutes | Select and record measurements, isolate and replace only the supported part. |
| 60–80 minutes | Diagnose the second fault using an evidence pair rather than a disclosed name. |
| 80–105 minutes | Investigate a changed symptom; change test type if healthy supply is insufficient. |
| 105–120 minutes | Keep prediction, diagnosis, repair and fresh verification, including any failed verification. |

## Worked example · a different scenario

The separate nine-volt beacon permits two simultaneous faults. Its powered trace is 9/9/0/0 V at source, fuse, cable and lamp supply. An isolated cable replacement restores 9 V throughout, but the same lamp stays dark. The first repair was supported and incomplete. An isolated continuity check then identifies an open lamp; replacing it and restoring power produces both 9 V and light. Your assigned cases publish a one-fault model, so derive the diagnosis from their own rules and measurements instead of assuming this example's two defects.

[Watch this separate example and inspect its finished record](/demonstrations/lab-05/).

The example explains a method. Its completed decisions are not the assigned task. Use the materials above for your own choices.

## Practice

Predict readings for two faults. Request a discriminating pair or isolated continuity result and propose the supported repair.

## Skill check

Use a fresh unknown configuration and explain why one upstream alternative is ruled out.

## Transfer challenge

Investigate the new symptom without assuming an earlier repair applies. Verify the whole output after intervention.

## Student record

**Named output: circuit-diagnosis.**

Keep candidate faults, predicted readings, selected measurements and power states, the repair and fresh powered verification. Explain why a plausible alternative no longer fits.

Record your name/role, phase and scenario, prediction before action, evidence requested, result, decision, alternative and remaining uncertainty. Include assistance, format used and any physical-model limitation. Keep a failed attempt that explains a revision.

After the supported repair and fresh supply/output verification, **connect the verified beacon circuit**. On paper, reveal the restored 6 V supply and lit-output cards; with an approved low-voltage kit, record the actual measured supply and lamp state. Have the receiving partner record **Approach signal received** only after seeing that output. Label a solo acknowledgement as a self-check and paper readings as simulated.

## Explanation — reveal after an attempt

A single zero is ambiguous. Pair upstream and downstream powered measurements or obtain isolated open continuity before replacement. After repair, a fresh lamp-supply reading and lit output verify more than the replacement action alone.

A facilitator judges the reasoning. The record's existence and the model's successful result do not by themselves establish learning.

## Facilitator evidence cards · reveal on request

Keep these labelled reading cards with the facilitator. A solo learner predicts the requested result before revealing its table cell.

| Phase | Battery | After fuse | After cable | Lamp supply | Lamp output |
| --- | --- | --- | --- | --- | --- |
| Practice, powered | 6 V | 0 V | 0 V | 0 V | Dark |
| Skill check, powered | 6 V | 6 V | 0 V | 0 V | Dark |
| Transfer, powered | 6 V | 6 V | 6 V | 6 V | Dark |

Isolated continuity: practice fuse is open; check cable is open; transfer lamp is open. Other isolated components are continuous. With the simulated supply isolated, downstream voltage reads zero; the battery terminal card still represents its 6 V source. This does not locate a supply fault.

Accept paired powered readings bracketing a fault, or an isolated open-continuity result, before the targeted replacement. After correct replacement: battery, fuse, cable and lamp supply each read 6 V with power on, and lamp is lit. Require fresh verification. A real kit's readings must be measured and labelled; do not present these authored cards as instrument results.

The full pack remains available for accessible and solo study. Label assistance if you inspected all cards before choosing a test. No hidden rules or secret grading are involved.

## Reflection and later use

Which measurement reduced uncertainty most, and which merely repeated what you already knew?

A2 requires a diagnosis another role can use. Final power checks support transmission or continuous support, and transport only when the selected route depends on power.

## Evidence and limitations

Save **circuit-diagnosis** with your explanation. Physical activities are proposed teaching designs, not hardware-tested equipment. Distinguish model-card results from actual measurements. Neither browser success nor paper completion establishes physical dexterity or classroom enjoyment. A dated station record is sufficient; a duplicate browser run is not required.

## Printable model sheet

[Printable circuit and grid sheet](./circuit-sensor-sheet.svg). Print at 100% on A4 and check the labelled 50 mm line. These are conceptual paper aids, not physically validated apparatus.
