---
title: "Challenge the System"
description: "Test an invented permission system, repair an overbroad rule and check legitimate access still works."
week: 7
learningOutcomes: ["LO4"]
skillIds: ["LO4"]
activityId: "week-07"
caseFiles: ["CY-01","CY-02"]
teachers: ["iona-vale"]
date: 2027-04-19
related: ["sessions/week-07", "assessments/assignment-2"]
slides: "/decks/week-07/"
---

> The system recognises you. It has mistaken that for permission.

## What you will learn

- Distinguish identity, object and requested action in an access decision.
- Demonstrate a fault using an explicit expected-versus-observed test.
- Repair the fictional policy and test both denied and permitted operations.

## The briefing

An access decision relates a subject, an action and an object. Authentication identifies the subject; authorisation determines whether a requested action is allowed. The supplied local records application deliberately assigns the wrong permissions: an observer can perform privileged actions while the specialist roles cannot perform their intended work.

Define the intended policy before testing. Otherwise an unexpected result cannot be judged against a clear contract. For each case, record role, action, expected result and observed result. A repair must remove unauthorised actions while preserving legitimate ones. Denying every operation fails the system's purpose. Regression checks revisit the whole matrix after a change so a narrow fix does not quietly break another role. When the published mandate changes, preserve the earlier matrix and document which expectation changes.

## Worked example

The faulty matrix allows observer certification but denies registrar certification. Fixing only the first cell removes one unauthorised operation while leaving legitimate work blocked. The repaired matrix must permit every role to read, technician to service and registrar to certify, while denying the other actions.

## A plausible mistake

Hiding the certify button changes the interface without establishing the policy used by an action. Conversely, disabling all buttons prevents useful work. The model must check the role/action/object relationship each time, independent of how an action was selected.

## Supplied rule sheet

- Roles: observer, technician, registrar. Actions: read shared records, service the cart, certify the archive.
- Every role may read. Only technician may service; only registrar may certify. Other combinations are denied.
- The initial faulty matrix grants the observer all actions while failing to grant technician service and registrar certification.
- Repair all nine role/action decisions and test both allowed and denied actions.
- Transfer: a published maintenance hold suspends technician service; read access and registrar certification remain unchanged.
- All requests operate within the local fictional simulation.

## Before the lab

Read CY-01 and predict all entries in the role matrix (20 minutes). Read the Week 6 distinction between observed results and interpretations (5 minutes).

## What happens next

Repair Meridian's local recovery policy without blocking the work the team is authorised to perform. The lab produces **permission-audit**, which becomes evidence for [the connected assessment](/assessments/assignment-2/).

[Open this week's lab](/sessions/week-07/) · [Download the campus pack](/campus/week-07.md) · [Explore the academy](/academy/)

## Slide deck and readable summary

[Open the fourteen-slide teaching deck](/decks/week-07/).

The deck moves from unexpected observer certification to an explicit role/action/object model. It distinguishes identity from permission, builds expected-versus-observed tests, repairs the faulty matrix and checks both legitimate and denied actions. A maintenance hold then changes the technician's authority; the earlier matrix remains evidence of the earlier policy. Speaker notes contain discussion prompts and answers.

The complete example is small enough to inspect: every role reads the shared briefing; only a technician services the cart; only a registrar certifies the archive. The transfer hold suspends service while retaining read and certification rights. Preserve both matrices for the A2 checkpoint and explain why a changed mandate requires a changed test expectation.
