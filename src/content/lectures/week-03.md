---
title: "The Lock That Has No Key"
description: "Represent the R1 prerequisites in a diagram or ordered text. Explain a failed sequence at its first unsupported action."
week: 3
learningOutcomes: ["LO3"]
activityId: "seals"
caseFiles: ["E03"]
teachers: ["mara-voss"]
date: 2027-03-08
related: ["sessions/week-03", "assessments/assignment-1"]
---

> There is no keyhole on the drawing. There are three words, and every arrow between them is a promise.

## What you will learn

- Represent the R1 prerequisites in a diagram or ordered text.
- Explain a failed sequence at its first unsupported action.

## The briefing

A dependency names what must already be true for an action to be valid. Model the state before and after each action rather than guessing an order from the names. Under R1, WITNESS can run from the empty state; SILVER cannot. Once SILVER has run, CROWN requires both recorded tokens.

A correct sequence is only one part of a useful explanation. A counterexample exposes why a dependency matters. Trace the first failing action, record its missing prerequisite, and leave the later actions unevaluated. This is a symbolic teaching model, not a diagram of any physical lock.

## Worked example

WITNESS → SILVER → CROWN works under E03. SILVER → WITNESS → CROWN fails at SILVER because no witness token exists. The failure occurs before the final step, so changing only CROWN cannot fix the missing prerequisite.

## A plausible mistake

Memorising the three words gives you a brittle answer. If a later protocol changes a prerequisite, the familiar sequence may become invalid. Attach the protocol version to the diagram you export.

## Before the lab

Read E03 twice: once for actions, once for prerequisites (15 minutes). The full [case-file library](/resources/#E03) is available without sign-in.

Draw state boxes after each action. Ask your partner to propose an invalid order and locate its earliest failure.

## What happens next

The seal model enters A1, supports Version 1 and becomes the dependency revised in Week 7.

[Open this week's lab](/sessions/week-03/) · [Read the assessment brief](/assessments/assignment-1/)
