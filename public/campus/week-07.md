# SLOP4408 — Week 7: Challenge the System

Campus / printable lab pack · Semester 1, 2027

Test an invented permission system, repair an overbroad rule and check legitimate access still works.

## Learning outcomes

- Distinguish identity, object and requested action in an access decision.
- Demonstrate a fault using an explicit expected-versus-observed test.
- Repair the fictional policy and test both denied and permitted operations.

## Equipment

Role cards, action/object cards and the printable matrix; optionally the local browser simulation. No network target, credentials or external service is needed.

## Facilitator setup

Print the intended policy and a separate faulty policy. Assign one student to propose requests and another to act as the rule interpreter; rotate roles after the repair.

## Complete supplied rules

- Roles: observer, technician, registrar. Actions: read shared records, service the cart, certify the archive.
- Every role may read. Only technician may service; only registrar may certify. Other combinations are denied.
- The initial faulty matrix grants the observer all actions while failing to grant technician service and registrar certification.
- Repair all nine role/action decisions and test both allowed and denied actions.
- Transfer: a published maintenance hold suspends technician service; read access and registrar certification remain unchanged.
- All requests operate within the local fictional simulation.

## Two-hour schedule

0–10 briefing; 10–30 worked example; 30–60 practice; 60–80 changed skill check; 80–105 transfer; 105–120 debrief and export.

## Worked example

The faulty matrix allows observer certification but denies registrar certification. Fixing only the first cell removes one unauthorised operation while leaving legitimate work blocked. The repaired matrix must permit every role to read, technician to service and registrar to certify, while denying the other actions.

## Practice

Inspect the faulty matrix. Predict all nine expected decisions, change the mismatches and run the complete check.

## Skill check

Test observer certification denied, registrar certification allowed, technician service allowed and the other six matrix entries. Preserve the repaired matrix.

## Transfer challenge

Apply the published maintenance hold by denying technician service while retaining all read access and registrar certification. Explain why the hold is a changed rule, not a discovered identity.

## Facilitation

Students predict all nine matrix cells before checking. The facilitator applies the written rules exactly. Publish the maintenance hold only after preserving the initial matrix; compare the one changed expectation.

## Student record

Name / role:

Scenario and route used:

Prediction and reason:

Actions or measurements:

Observed result:

Difference from prediction:

Changed-situation response:

Assistance and hints:

Reflection: Which permitted action could a careless repair have broken?

## Explanation — reveal after an attempt

A complete repair preserves useful operations as well as denying unauthorised ones. The transfer hold affects one cell: technician/service. Denying every action fails the published policy.

## Example reflection

I denied observer certification and service, restored technician service and registrar certification, then tested all nine cells. Under the maintenance hold I changed only technician/service and preserved the original matrix.

## Evidence and limitations

Save as **permission-audit**. Repair Meridian's local recovery policy without blocking the work the team is authorised to perform. Physical activities are specified teaching designs, not verified hardware builds. Use paper/tabletop substitutions when apparatus is unavailable. Neither route certifies physical dexterity; both assess the stated concepts, diagnosis and transfer.
