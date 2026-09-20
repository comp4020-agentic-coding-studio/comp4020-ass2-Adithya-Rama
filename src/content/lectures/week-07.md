---
title: "Challenge the System"
description: "Translate authority into testable permissions, diagnose deviations and preserve policy versions when requirements change."
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

> **The week's question:** Make a records system useful to authorised people while preventing actions outside their responsibilities.


> The system recognises you. It has mistaken that for permission.

## What you will learn

- Derive expected decisions from governing clauses.
- Test useful and prohibited operations and diagnose discrepancies.
- Separate a behaviour repair from an authorised policy revision.

## The briefing

### Authority comes before the table

Authentication identifies a subject. Authorisation determines whether that subject may perform an action on an object. A recognised technician is not authorised for everything. Derive each expected decision from the mandate before viewing the software's result.

Use role, action, governing clause, expected result and observed result. An unexpected allow and an unexpected denial are both faults. A policy refusing everything can appear restrictive while defeating its intended work.

### Test boundaries and ordinary use

For permitted operations, check nearby prohibited combinations: another role, action or object. Our local model has nine decisions. In a larger system, test coverage needs its own strategy; this exercise does not establish general security expertise.

Make a justified repair and retest all nine cases. An interface change alone does not prove the access rule changed. The expected-versus-observed record supplies the evidence.

### Distinguish repair from policy change

A repair makes behaviour match existing authority. A maintenance hold changes that authority, so a formerly correct result may need to differ. Preserve the first matrix under its original mandate. Explain the changed expectation in the second. Yesterday's successful tests can certify the wrong policy when their expected values are no longer justified.

## Worked example · a different scenario

The separate observatory charter gives readers research access, maintainers equipment service without research access, and custodians research access plus release approval. Its faulty table wrongly allows maintainer reading and blocks reader reading. The demonstrator corrects those two decisions, preserves the other seven and tests the complete table. A later release hold suspends only custodian approval. This is a different charter from your assigned recovery policy: derive each table from its own governing document.

[Watch this separate example and inspect its finished record](/demonstrations/lab-07/).

## A plausible mistake

Hiding the certify button changes the interface without establishing the policy used by an action. Conversely, disabling all buttons prevents useful work. The model must check the role/action/object relationship each time, independent of how an action was selected.

## Supplied rule sheet

**Where to find the named materials:** These labels identify the supplied material on this page and in the combined campus pack; they are not separate files you need to locate. **CY-01** is the intended role/action policy. **CY-02** is the faulty starting matrix and the nine decisions to test against that policy. The maintenance hold is the published transfer condition.

- Roles: observer, technician, registrar. Actions: read shared records, service the cart, certify the archive.
- Every role may read. Only technician may service; only registrar may certify. Other combinations are denied.
- The starting matrix is supplied by the activity. Derive expectations from the mandate and compare them with that matrix; record discrepancies yourself.
- Repair all nine role/action decisions and test both allowed and denied actions.
- Transfer: a published maintenance hold suspends technician service; read access and registrar certification remain unchanged.
- All requests operate within the local fictional simulation.

## Before the lab

Read CY-01 and predict all entries in the role matrix (20 minutes). Read the Week 6 distinction between observed results and interpretations (5 minutes).

## What happens next

A2 needs legitimate relay access. The digital final approach uses the appropriate local policy; physical handover does not gain an arbitrary software gate.

Keep **permission-audit** from [this week's lab](/sessions/week-07/). [Download the campus pack](/campus/week-07.md).

## Slide deck and readable summary

[Open the fourteen-slide teaching deck](/decks/week-07/).

The deck uses the separate observatory embargo example. A maintainer is wrongly allowed to read research while a reader is wrongly refused. It builds expected-versus-observed tests, repairs those two cells and retests all nine combinations. A signed release hold then suspends custodian approval while preserving the earlier matrix under its original charter. Speaker notes contain discussion prompts and answers.

The assigned lab has a different recovery mandate: derive its observer, technician and registrar permissions from that document, then apply its maintenance hold. Preserve both assigned matrices for A2 and explain why each expectation follows from the authority in force. The deck demonstrates the method; its completed table is not your lab submission.
