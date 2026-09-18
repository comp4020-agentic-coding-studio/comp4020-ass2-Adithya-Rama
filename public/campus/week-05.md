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

- The idealised bench model uses a 6 V source, fuse, switch/cable, lamp and common return.
- Probe labels refer to the node after each named component, measured relative to the common return.
- With power on, a fuse or cable supply break gives 6 V before the break and 0 V at downstream nodes. An open lamp can still have 6 V at its supply node while remaining dark.
- Practice fault: fuse. Skill-check fault: cable. Transfer fault: open lamp; its powered supply readings remain 6 V.
- A zero voltage reading while power is off does not locate a supply fault. For fuse/cable faults, record the powered zero node before isolation and replacement. For the open lamp, first observe healthy 6 V supply with a dark output; isolate power and use the continuity check to confirm the open lamp before replacing it.
- This deliberately simplified node model is not a full analogue circuit solver. Campus readings depend on the actual apparatus.

## Two-hour schedule

0–10 briefing; 10–30 worked example; 30–60 practice; 60–80 changed skill check; 80–105 transfer; 105–120 debrief and export.

## Worked example

In the practice configuration, battery reads 6 V and the fuse output reads 0 V while powered. The first missing supply localises the model's open fuse. Isolate power before replacement, then restore power and verify the downstream lamp node reads 6 V. That before/after trace distinguishes diagnosis from guessing a component.

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

## Example reflection

Battery and fuse nodes read 6 V while the cable output read 0 V. I isolated power, replaced the cable and restored power. A 6 V lamp-node reading supported the repair.

## Evidence and limitations

Save as **circuit-diagnosis**. Restore the archive carriage's support circuit with a documented fault diagnosis. Physical activities are specified teaching designs, not verified hardware builds. Use paper/tabletop substitutions when apparatus is unavailable. Neither route certifies physical dexterity; both assess the stated concepts, diagnosis and transfer.

## Printable model sheet

[Printable circuit and grid sheet](./circuit-sensor-sheet.svg). Print at 100% on A4 and check the labelled 50 mm line. These are conceptual paper aids, not physically validated apparatus.
