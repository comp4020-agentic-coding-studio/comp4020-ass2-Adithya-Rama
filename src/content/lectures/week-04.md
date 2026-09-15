---
title: "Hacking the Impossible Machine"
description: "Distinguish evidence from permission in an explicit model. Explain why invalid actions leave the current state unchanged."
week: 4
learningOutcomes: ["LO2","LO3"]
activityId: "interpreter"
caseFiles: ["E04"]
teachers: ["mara-voss"]
date: 2027-03-15
related: ["sessions/week-04", "assessments/assignment-1"]
---

> The machine accepts three symbols. Oren refuses to add a fourth. ‘If we cannot explain this one, more machinery will not help.’

## What you will learn

- Distinguish evidence from permission in an explicit model.
- Explain why invalid actions leave the current state unchanged.

## The briefing

A state machine makes changes explicit. OBSERVE creates a record. AUTHORISE uses that record to grant temporary permission. TRANSFER consumes the opportunity to finish. A record about an event and permission to change the system are different states, even when a story makes them sound similar.

The training machine accepts only the three printed symbols. An invalid action explains its missing prerequisite and leaves the state unchanged. That rule lets you diagnose a failed sequence: the next action sees the actual prior state, not the state you wished the machine had reached. No real commands, credentials or network requests are involved.

## Worked example

TRANSFER from an empty state fails because permission is missing. OBSERVE then creates a record, but TRANSFER still fails until AUTHORISE succeeds. The supported full sequence is OBSERVE → AUTHORISE → TRANSFER.

## A plausible mistake

‘It saw the record, so it should allow the transfer’ imports an unstated permission rule. A plan is only defensible against the rules actually supplied. State any extra premise instead of hiding it in natural language.

## Before the lab

Inspect E04 and revise your A1 ledger (20 minutes). Bring one uncertainty you cannot settle from the supplied files. The full [case-file library](/resources/#E04) is available without sign-in.

Trace a valid run and an invalid run, writing the state after every attempted action. Use the result to finish the A1 dependency model.

## What happens next

This completes A1’s system analysis and gives the pair project a method for diagnosing changes.

[Open this week's lab](/sessions/week-04/) · [Read the assessment brief](/assessments/assignment-1/)
