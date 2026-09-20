# SLOP4408 — Week 5: Wake a Dead System

Campus / printable lab pack · Semester 1, 2027

Trace a low-voltage circuit, select informative measurements and locate an open fault.

## Learning outcomes

- Trace a complete current path through a supplied simple circuit.
- Use measurements to distinguish an open fuse from an open switch.
- Verify a repair without changing unrelated components.

## Equipment

Preferred: battery-powered educational circuit kit with a lamp, switch and protected low-voltage source; labels and fault cards. No mains supplies. A printed circuit with voltage cards is an equally available conceptual route.

## Facilitator setup

Prepare a healthy series loop and label both sides of each component. The facilitator introduces one open fault at a time. Verify the kit's manufacturer instructions and component ratings before class; the proposed physical setup has not been hardware-tested by this prototype.

## Complete supplied rules

**Material labels:** The following identifiers refer to the records and rules supplied in this combined pack, rather than separate documents to find. **EL-01** is the six-volt circuit and its labelled probe-node rule. **EL-02** supplies the phase faults and diagnostic recording requirements; the campus pack's student record is your measurement sheet.

- The idealised bench model uses a 6 V source, fuse, switch/cable, lamp and common return.
- Probe labels refer to the node after each named component, measured relative to the common return.
- With power on, a fuse or cable supply break gives 6 V before the break and 0 V at downstream nodes. An open lamp can still have 6 V at its supply node while remaining dark.
- Practice fault: fuse. Skill-check fault: cable. Transfer fault: open lamp; its powered supply readings remain 6 V.
- A zero voltage reading while power is off does not locate a supply fault. For fuse/cable faults, record the powered zero node before isolation and replacement. For the open lamp, first observe healthy 6 V supply with a dark output; isolate power and use the continuity check to confirm the open lamp before replacing it.
- This deliberately simplified node model is not a full analogue circuit solver. Campus readings depend on the actual apparatus.

## Two-hour schedule

0–10 briefing; 10–30 separate worked example; 30–60 practice; 60–80 skill check under its published conditions; 80–105 transfer with a changed published condition; 105–120 debrief and export.

## Worked example · a different scenario

The separate nine-volt beacon permits two simultaneous faults. Its powered trace is 9/9/0/0 V at source, fuse, cable and lamp supply. An isolated cable replacement restores 9 V throughout, but the same lamp stays dark. The first repair was supported and incomplete. An isolated continuity check then identifies an open lamp; replacing it and restoring power produces both 9 V and light. Your assigned cases publish a one-fault model, so derive the diagnosis from their own rules and measurements instead of assuming this example's two defects.

This is supplied demonstration material. Use the assigned rules in this pack for your own practice and record.

## Practice

Power the model, compare battery and downstream nodes, and find the first zero supply reading. Isolate power before replacing the fuse; then verify the lamp node.

## Skill check

Diagnose the cable fault using consecutive node readings. Record the powered zero reading before replacing anything.

## Transfer challenge

Diagnose a dark lamp with healthy 6 V supply readings. Isolate power, check the lamp's continuity and identify the open load. Replace it, restore power and verify light as well as voltage.

## Facilitation

Students submit predicted measurements before using an instrument or revealing voltage cards. The facilitator controls power and component changes. Distinguish ideal-model answers from the actual measured tolerance of the kit.

## Student record

Name / role:

Scenario and route used:

Prediction and reason:

Actions or measurements:

Observed result:

Difference from prediction:

Changed-situation response:

Assistance and hints:

Reflection: Which measurement reduced uncertainty most, and which merely repeated what you already knew?

## Explanation — reveal after an attempt

The first zero node localises a supply break in the fuse/cable cases. An open lamp is different: supply voltage remains present, so confirm the load fault using continuity with power isolated. Verify the repaired output, not voltage alone.

## Example reflection · separate demonstration

The nine-volt beacon's first trace supported a cable repair. Afterwards every supply point read 9 V, but the lamp remained dark. I preserved that failed verification, isolated power, confirmed an open lamp and replaced it. I verified both light and supply before calling the whole repair complete.

Write your own reflection from your assigned scenario; do not copy this account.

## Evidence and limitations

Save as **circuit-diagnosis**. Restore the archive carriage's support circuit with a documented fault diagnosis. Physical activities are specified teaching designs, not verified hardware builds. Use paper/tabletop substitutions when apparatus is unavailable. Neither route certifies physical dexterity; both assess the stated concepts, diagnosis and transfer.

## Printable model sheet

[Printable circuit and grid sheet](./circuit-sensor-sheet.svg). Print at 100% on A4 and check the labelled 50 mm line. These are conceptual paper aids, not physically validated apparatus.
