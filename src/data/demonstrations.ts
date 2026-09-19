import type {Demonstration} from "../lib/demonstration-types";

/** Complete alternate worked examples with full, authored before/after scene snapshots.
 * Outcomes describe these fictional models; examples never become assigned submissions.
 */
export const demonstrations:Demonstration[] = [
  {
    "id": "lab-01",
    "kind": "lab",
    "week": 1,
    "title": "The empty conservatory",
    "subtitle": "Observe, test an account and correct an invented explanation.",
    "skill": "Observation and source judgement",
    "setting": "A glass conservatory after an interrupted instrument check.",
    "difference": "This scene uses an 11:35 clock, green mug, closed hatch and a gardener's note; none is an assigned scene answer.",
    "transfer": "Use the same observation/claim/inference distinction on your own scene, then inspect what changed.",
    "sourceHref": "/sessions/week-01/",
    "sourceLabel": "Week 1 lab",
    "estimatedMinutes": 8,
    "steps": [
      {
        "id": "inspect",
        "title": "Inspect before interpreting",
        "narration": "The camera reveals a clock reading 11:35, a green mug beside a planting ledger and a closed service hatch. The demonstrator initially calls the room abandoned, then stops: abandonment is not visible.",
        "why": "Specific features are reproducible evidence. A story about them introduces an additional claim.",
        "prompt": "Record the visible display reading.",
        "controls": [
          {
            "id": "clock",
            "label": "Display reading",
            "type": "text",
            "initial": "",
            "expected": "11:35",
            "aliases": []
          }
        ],
        "before": {
          "room": "perception",
          "shot": "establishing",
          "values": {
            "covered": false,
            "clock": "11:35",
            "hatch": "closed",
            "mugColor": "#5b956c"
          },
          "labels": [
            "Clock 11:35",
            "Green mug",
            "Closed hatch"
          ],
          "focus": "clock",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "11:35"
            },
            {
              "id": "mug",
              "label": "Green mug",
              "shape": "mug",
              "color": "#5b956c",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "I checked every tray"
            },
            {
              "id": "hatch",
              "label": "Service hatch",
              "shape": "hatch",
              "color": "#758a87",
              "open": false
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "clock": "11:35",
            "hatch": "closed",
            "mugColor": "#5b956c",
            "selected": "clock",
            "verified": true
          },
          "labels": [
            "Recorded: 11:35"
          ],
          "focus": "clock",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "11:35"
            },
            {
              "id": "mug",
              "label": "Green mug",
              "shape": "mug",
              "color": "#5b956c",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "I checked every tray"
            },
            {
              "id": "hatch",
              "label": "Service hatch",
              "shape": "hatch",
              "color": "#758a87",
              "open": false
            }
          ]
        },
        "success": "The record preserves the exact display reading without inventing a cause.",
        "pitfall": "Calling the room abandoned adds a history the scene does not supply.",
        "hint": "Record characters on the display, not your interpretation of the scene.",
        "duration": 18
      },
      {
        "id": "note",
        "title": "Separate the account from the object",
        "narration": "A note reads, 'I checked every tray.' The note is visibly present; the assertion that every tray was checked remains the writer's account. The demonstrator places that assertion in the claim column.",
        "why": "Evidence that a statement was made does not independently establish its truth.",
        "prompt": "Classify the assertion about checking every tray.",
        "controls": [
          {
            "id": "classification",
            "label": "Statement status",
            "type": "select",
            "options": [
              {
                "value": "observation",
                "label": "observation"
              },
              {
                "value": "claim",
                "label": "claim"
              },
              {
                "value": "inference",
                "label": "inference"
              }
            ],
            "expected": "claim"
          }
        ],
        "before": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "clock": "11:35",
            "hatch": "closed",
            "mugColor": "#5b956c",
            "selected": "note"
          },
          "labels": [
            "Note: I checked every tray"
          ],
          "focus": "ledger",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "11:35"
            },
            {
              "id": "mug",
              "label": "Green mug",
              "shape": "mug",
              "color": "#5b956c",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "I checked every tray"
            },
            {
              "id": "hatch",
              "label": "Service hatch",
              "shape": "hatch",
              "color": "#758a87",
              "open": false
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "clock": "11:35",
            "hatch": "closed",
            "mugColor": "#5b956c",
            "selected": "claim"
          },
          "labels": [
            "Claim: every tray checked"
          ],
          "focus": "ledger",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "11:35"
            },
            {
              "id": "mug",
              "label": "Green mug",
              "shape": "mug",
              "color": "#5b956c",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "I checked every tray"
            },
            {
              "id": "hatch",
              "label": "Service hatch",
              "shape": "hatch",
              "color": "#758a87",
              "open": false
            }
          ]
        },
        "success": "The account remains available for comparison with independent records.",
        "pitfall": "Classifying the whole assertion as an observation treats seeing words as proving their content.",
        "hint": "Ask what you directly saw: the check, or the note describing it?",
        "duration": 18
      },
      {
        "id": "cause",
        "title": "Challenge a plausible story",
        "narration": "The green mug is empty. The demonstrator proposes that the gardener left in a hurry, but neither an empty mug nor a closed hatch identifies the reason for leaving.",
        "why": "Several causes fit the same visible features. Naming one does not make it an observation.",
        "prompt": "Classify 'The gardener left in a hurry'.",
        "controls": [
          {
            "id": "classification",
            "label": "Explanation status",
            "type": "select",
            "options": [
              {
                "value": "observation",
                "label": "observation"
              },
              {
                "value": "claim",
                "label": "claim"
              },
              {
                "value": "inference",
                "label": "inference"
              }
            ],
            "expected": "inference"
          }
        ],
        "before": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "clock": "11:35",
            "hatch": "closed",
            "mugColor": "#5b956c",
            "selected": "mug"
          },
          "labels": [
            "Empty green mug"
          ],
          "focus": "mug",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "11:35"
            },
            {
              "id": "mug",
              "label": "Green mug",
              "shape": "mug",
              "color": "#5b956c",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "I checked every tray"
            },
            {
              "id": "hatch",
              "label": "Service hatch",
              "shape": "hatch",
              "color": "#758a87",
              "open": false
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "clock": "11:35",
            "hatch": "closed",
            "mugColor": "#5b956c",
            "selected": "uncertain"
          },
          "labels": [
            "Cause remains unresolved"
          ],
          "focus": "mug",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "11:35"
            },
            {
              "id": "mug",
              "label": "Green mug",
              "shape": "mug",
              "color": "#5b956c",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "I checked every tray"
            },
            {
              "id": "hatch",
              "label": "Service hatch",
              "shape": "hatch",
              "color": "#758a87",
              "open": false
            }
          ]
        },
        "success": "The causal explanation is recorded as an inference, with its uncertainty intact.",
        "pitfall": "A familiar scene can make an unsupported cause feel certain.",
        "hint": "Imagine another ordinary reason an empty mug might be present.",
        "duration": 18
      },
      {
        "id": "recall",
        "title": "Reconstruct without looking",
        "narration": "The scene is covered. The demonstrator recalls the hatch as open, checks the original record and corrects that invented detail. The correct record said the hatch was closed.",
        "why": "An added false detail differs from an omission; the remedy is to check expectations as well as attention.",
        "prompt": "Recover the actual hatch state.",
        "controls": [
          {
            "id": "hatch",
            "label": "Hatch state",
            "type": "select",
            "options": [
              {
                "value": "open",
                "label": "open"
              },
              {
                "value": "closed",
                "label": "closed"
              },
              {
                "value": "not recorded",
                "label": "not recorded"
              }
            ],
            "expected": "closed"
          }
        ],
        "before": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": true,
            "clock": "11:35",
            "hatch": "closed",
            "mugColor": "#5b956c"
          },
          "labels": [
            "Recall: was the hatch open?"
          ],
          "focus": "hatch",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "11:35"
            },
            {
              "id": "mug",
              "label": "Green mug",
              "shape": "mug",
              "color": "#5b956c",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "I checked every tray"
            },
            {
              "id": "hatch",
              "label": "Service hatch",
              "shape": "hatch",
              "color": "#758a87",
              "open": false
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "clock": "11:35",
            "hatch": "closed",
            "mugColor": "#5b956c",
            "verified": true
          },
          "labels": [
            "Correction: hatch closed"
          ],
          "focus": "hatch",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "11:35"
            },
            {
              "id": "mug",
              "label": "Green mug",
              "shape": "mug",
              "color": "#5b956c",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "I checked every tray"
            },
            {
              "id": "hatch",
              "label": "Service hatch",
              "shape": "hatch",
              "color": "#758a87",
              "open": false
            }
          ]
        },
        "success": "The corrected reconstruction matches the inspected record.",
        "pitfall": "Do not silently replace the wrong recollection; keep the error and its correction.",
        "hint": "The original inspection explicitly described a closed hatch.",
        "duration": 18
      },
      {
        "id": "compare",
        "title": "Compare a changed scene",
        "narration": "A second inspection shows the same mug, clock now reading 11:50, and an open hatch. The demonstrator records two changes and preserves the unchanged mug rather than rebuilding a new story.",
        "why": "A comparison needs both changed and stable features. Stable features anchor the comparison.",
        "prompt": "How many of the three recorded features changed?",
        "controls": [
          {
            "id": "count",
            "label": "Changed features",
            "type": "number",
            "initial": 0,
            "expected": 2,
            "min": 0,
            "max": 3,
            "tolerance": 0
          }
        ],
        "before": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "clock": "11:50",
            "hatch": "open",
            "mugColor": "#5b956c"
          },
          "labels": [
            "Clock 11:50",
            "Green mug",
            "Open hatch"
          ],
          "focus": "clock",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "11:50"
            },
            {
              "id": "mug",
              "label": "Green mug",
              "shape": "mug",
              "color": "#5b956c",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "I checked every tray"
            },
            {
              "id": "hatch",
              "label": "Service hatch",
              "shape": "hatch",
              "color": "#758a87",
              "open": true
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "clock": "11:50",
            "hatch": "open",
            "mugColor": "#5b956c",
            "count": 2,
            "verified": true
          },
          "labels": [
            "Changed: clock and hatch",
            "Unchanged: mug"
          ],
          "focus": "hatch",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "11:50"
            },
            {
              "id": "mug",
              "label": "Green mug",
              "shape": "mug",
              "color": "#5b956c",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "I checked every tray"
            },
            {
              "id": "hatch",
              "label": "Service hatch",
              "shape": "hatch",
              "color": "#758a87",
              "open": true
            }
          ]
        },
        "success": "Two changes are supported; who caused them is still unknown.",
        "pitfall": "A different clock reading is not evidence that the gardener opened the hatch.",
        "hint": "Compare object, location and state one field at a time.",
        "duration": 18
      },
      {
        "id": "verify",
        "title": "Choose the next evidence",
        "narration": "Tray inspection records can test the gardener's claim. The demonstrator requests those records rather than inferring honesty from handwriting or confidence.",
        "why": "A useful next action can disconfirm a claim, not merely repeat it.",
        "prompt": "Choose an independent check.",
        "controls": [
          {
            "id": "next",
            "label": "Next evidence",
            "type": "select",
            "options": [
              {
                "value": "Inspect tray check records",
                "label": "Inspect tray check records"
              },
              {
                "value": "Judge the handwriting",
                "label": "Judge the handwriting"
              },
              {
                "value": "Assume the note is correct",
                "label": "Assume the note is correct"
              }
            ],
            "expected": "Inspect tray check records"
          }
        ],
        "before": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "clock": "11:50",
            "hatch": "open",
            "mugColor": "#5b956c",
            "count": 2,
            "selected": "note"
          },
          "labels": [
            "Unverified: every tray checked"
          ],
          "focus": "ledger",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "11:50"
            },
            {
              "id": "mug",
              "label": "Green mug",
              "shape": "mug",
              "color": "#5b956c",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "I checked every tray"
            },
            {
              "id": "hatch",
              "label": "Service hatch",
              "shape": "hatch",
              "color": "#758a87",
              "open": true
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "clock": "11:50",
            "hatch": "open",
            "mugColor": "#5b956c",
            "count": 2,
            "verified": true
          },
          "labels": [
            "Next check: tray records"
          ],
          "focus": "ledger",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "11:50"
            },
            {
              "id": "mug",
              "label": "Green mug",
              "shape": "mug",
              "color": "#5b956c",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "I checked every tray"
            },
            {
              "id": "hatch",
              "label": "Service hatch",
              "shape": "hatch",
              "color": "#758a87",
              "open": true
            }
          ]
        },
        "success": "The completed record separates observations, an account, a causal inference and a testable next question.",
        "pitfall": "Looking for reassuring style does not verify the claimed inspection.",
        "hint": "Choose a record of the work itself.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "Completed observation record — conservatory",
      "filename": "worked-lab-01.md",
      "markdown": "# Completed demonstration example — conservatory observation record\n\nThis alternate example shows a method. It is not an answer to the assigned lab.\n\n## Initial inspection\nAt the first inspection the clock displayed 11:35, a green mug stood beside the planting ledger and the service hatch was closed. These are supplied scene observations. A visible note asserted, “I checked every tray.” The note's presence is observable; its contents remain a claim.\n\n## Reconstruction and correction\nI initially recalled the hatch as open. Rechecking the scene showed that I had inserted a familiar detail. I preserved the incorrect recollection and correction rather than rewriting the attempt. I classified “the gardener left in a hurry” as an inference because several explanations fit an empty mug.\n\n## Changed situation\nAt the second inspection the clock read 11:50 and the hatch was open. The green mug remained unchanged. Two recorded features changed. No record established who opened the hatch or why.\n\n## Next investigation\nInspect the tray check records against the claimed complete inspection. Matching records would support the account within their scope; missing entries would require clarification.\n\n## Reflection\nMy main error was adding a plausible detail, not failing to look at an object. A regional inspection helped coverage, but preserving a separate interpretation column helped more with this mistake. In my own scene I would make the same distinction before building a story. I would not claim that two changed features prove a particular person's intent.\n\nRoute: authored 3D/interactive demonstration. Assistance: narrated example and one recorded correction."
    }
  },
  {
    "id": "lab-02",
    "kind": "lab",
    "week": 2,
    "title": "Four anchors for a storm kit",
    "subtitle": "Build a mnemonic, retrieve it and repair a weak cue.",
    "skill": "Memory and recall",
    "setting": "A conservatory route with Gate, Pool, Press and Dome landmarks.",
    "difference": "The alternate items are Lens, Tether, Pocket atlas and Beacon, linked to new locations.",
    "transfer": "Keep a stable route, make your own associations and test fresh items without copying these images.",
    "sourceHref": "/sessions/week-02/",
    "sourceLabel": "Week 2 lab",
    "estimatedMinutes": 8,
    "steps": [
      {
        "id": "baseline",
        "title": "Keep an honest baseline",
        "narration": "Before learning the route, the demonstrator recalls Lens and Beacon but omits Tether and Pocket atlas. Two of four items are correct. That limited baseline is retained.",
        "why": "A baseline makes improvement inspectable. It is not a judgement of intelligence.",
        "prompt": "Record the baseline item count.",
        "controls": [
          {
            "id": "count",
            "label": "Correct baseline items",
            "type": "number",
            "initial": 0,
            "expected": 2,
            "min": 0,
            "max": 4,
            "tolerance": 0
          }
        ],
        "before": {
          "room": "perception",
          "shot": "establishing",
          "values": {
            "covered": false,
            "count": 2
          },
          "labels": [
            "Baseline: Lens, Beacon"
          ],
          "focus": "items",
          "items": [
            {
              "id": "lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#91c9e8"
            },
            {
              "id": "spool",
              "label": "Tether",
              "shape": "spool",
              "color": "#e0a766"
            },
            {
              "id": "atlas",
              "label": "Pocket atlas",
              "shape": "book",
              "color": "#78a68c"
            },
            {
              "id": "beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#f6d174"
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": true,
            "count": 2
          },
          "labels": [
            "Baseline retained: 2 / 4"
          ],
          "items": [
            {
              "id": "lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#91c9e8"
            },
            {
              "id": "spool",
              "label": "Tether",
              "shape": "spool",
              "color": "#e0a766"
            },
            {
              "id": "atlas",
              "label": "Pocket atlas",
              "shape": "book",
              "color": "#78a68c"
            },
            {
              "id": "beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#f6d174"
            }
          ]
        },
        "success": "The initial two-item result remains visible for comparison.",
        "pitfall": "Do not replace the first attempt after seeing the missing items.",
        "hint": "Count only the two items actually recalled.",
        "duration": 18
      },
      {
        "id": "route",
        "title": "Fix the location order",
        "narration": "The route is Gate, Pool, Press, Dome. The demonstrator walks it once before attaching items, because changing the route later would change the retrieval cues.",
        "why": "A stable sequence of places organises order independently of the item list.",
        "prompt": "Arrange the route.",
        "controls": [
          {
            "id": "route",
            "label": "Route order",
            "type": "order",
            "options": [
              {
                "value": "Dome",
                "label": "Dome"
              },
              {
                "value": "Press",
                "label": "Press"
              },
              {
                "value": "Gate",
                "label": "Gate"
              },
              {
                "value": "Pool",
                "label": "Pool"
              }
            ],
            "initial": [
              "Dome",
              "Press",
              "Gate",
              "Pool"
            ],
            "expected": [
              "Gate",
              "Pool",
              "Press",
              "Dome"
            ]
          }
        ],
        "before": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "count": 2
          },
          "labels": [
            "Gate → Pool → Press → Dome"
          ],
          "focus": "route",
          "items": [
            {
              "id": "lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#91c9e8"
            },
            {
              "id": "spool",
              "label": "Tether",
              "shape": "spool",
              "color": "#e0a766"
            },
            {
              "id": "atlas",
              "label": "Pocket atlas",
              "shape": "book",
              "color": "#78a68c"
            },
            {
              "id": "beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#f6d174"
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "count": 2,
            "route": [
              "Gate",
              "Pool",
              "Press",
              "Dome"
            ]
          },
          "labels": [
            "Four stable anchors"
          ],
          "focus": "route",
          "items": [
            {
              "id": "lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#91c9e8"
            },
            {
              "id": "spool",
              "label": "Tether",
              "shape": "spool",
              "color": "#e0a766"
            },
            {
              "id": "atlas",
              "label": "Pocket atlas",
              "shape": "book",
              "color": "#78a68c"
            },
            {
              "id": "beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#f6d174"
            }
          ]
        },
        "success": "The route now has a reproducible beginning and end.",
        "pitfall": "A collection of vivid places without order can retrieve items in the wrong sequence.",
        "hint": "Begin at the Gate and finish under the Dome.",
        "duration": 18
      },
      {
        "id": "associate",
        "title": "Attach distinctive images",
        "narration": "A giant Lens frames the Gate. A Tether splashes around the Pool. A Pocket atlas unfolds under the Press. A Beacon lights the Dome. Each image joins one place and one item.",
        "why": "Distinctive associations create retrieval cues; rereading alone does not exercise recall.",
        "prompt": "Which item belongs at the Pool?",
        "controls": [
          {
            "id": "selected",
            "label": "Pool association",
            "type": "select",
            "options": [
              {
                "value": "Lens",
                "label": "Lens"
              },
              {
                "value": "Tether",
                "label": "Tether"
              },
              {
                "value": "Pocket atlas",
                "label": "Pocket atlas"
              },
              {
                "value": "Beacon",
                "label": "Beacon"
              }
            ],
            "expected": "Tether"
          }
        ],
        "before": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "count": 2,
            "route": [
              "Gate",
              "Pool",
              "Press",
              "Dome"
            ],
            "selected": "spool"
          },
          "labels": [
            "Pool + Tether"
          ],
          "focus": "spool",
          "items": [
            {
              "id": "lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#91c9e8"
            },
            {
              "id": "spool",
              "label": "Tether",
              "shape": "spool",
              "color": "#e0a766"
            },
            {
              "id": "atlas",
              "label": "Pocket atlas",
              "shape": "book",
              "color": "#78a68c"
            },
            {
              "id": "beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#f6d174"
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "count": 2,
            "route": [
              "Gate",
              "Pool",
              "Press",
              "Dome"
            ],
            "selected": "spool",
            "verified": true
          },
          "labels": [
            "A tether splashes around the Pool"
          ],
          "focus": "spool",
          "items": [
            {
              "id": "lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#91c9e8"
            },
            {
              "id": "spool",
              "label": "Tether",
              "shape": "spool",
              "color": "#e0a766"
            },
            {
              "id": "atlas",
              "label": "Pocket atlas",
              "shape": "book",
              "color": "#78a68c"
            },
            {
              "id": "beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#f6d174"
            }
          ]
        },
        "success": "The cue connects the item to the correct location.",
        "pitfall": "A vivid image of an item with no place can lose its position.",
        "hint": "Use the Pool association, not the item's position on the equipment shelf.",
        "duration": 18
      },
      {
        "id": "retrieve",
        "title": "Cover and retrieve",
        "narration": "The item shelf is covered. Following the route recovers Lens, Tether, Pocket atlas and Beacon. The demonstrator retrieves before revealing the list.",
        "why": "Retrieval tests access to the memory; recognising a visible list tests something else.",
        "prompt": "Reconstruct the item sequence.",
        "controls": [
          {
            "id": "items",
            "label": "Recalled items",
            "type": "order",
            "options": [
              {
                "value": "Beacon",
                "label": "Beacon"
              },
              {
                "value": "Lens",
                "label": "Lens"
              },
              {
                "value": "Pocket atlas",
                "label": "Pocket atlas"
              },
              {
                "value": "Tether",
                "label": "Tether"
              }
            ],
            "initial": [
              "Beacon",
              "Lens",
              "Pocket atlas",
              "Tether"
            ],
            "expected": [
              "Lens",
              "Tether",
              "Pocket atlas",
              "Beacon"
            ]
          }
        ],
        "before": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": true,
            "count": 2,
            "route": [
              "Gate",
              "Pool",
              "Press",
              "Dome"
            ]
          },
          "labels": [
            "Gate → Pool → Press → Dome"
          ],
          "focus": "items",
          "items": [
            {
              "id": "lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#91c9e8"
            },
            {
              "id": "spool",
              "label": "Tether",
              "shape": "spool",
              "color": "#e0a766"
            },
            {
              "id": "atlas",
              "label": "Pocket atlas",
              "shape": "book",
              "color": "#78a68c"
            },
            {
              "id": "beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#f6d174"
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "count": 2,
            "route": [
              "Gate",
              "Pool",
              "Press",
              "Dome"
            ],
            "verified": true
          },
          "labels": [
            "Recall: 4 / 4"
          ],
          "focus": "items",
          "items": [
            {
              "id": "lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#91c9e8"
            },
            {
              "id": "spool",
              "label": "Tether",
              "shape": "spool",
              "color": "#e0a766"
            },
            {
              "id": "atlas",
              "label": "Pocket atlas",
              "shape": "book",
              "color": "#78a68c"
            },
            {
              "id": "beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#f6d174"
            }
          ]
        },
        "success": "All four items are recovered in order in this demonstration.",
        "pitfall": "Do not treat a correct reconstruction with the list visible as unaided recall.",
        "hint": "Travel the route one location at a time.",
        "duration": 18
      },
      {
        "id": "repair",
        "title": "Diagnose a weak association",
        "narration": "On a delayed attempt the demonstrator says 'book' at the Press, losing the distinction between an atlas and another book. The cue is revised to a map unfolding across the press rollers.",
        "why": "A substitution reveals what the cue failed to preserve. Repair that feature rather than claiming perfect memory.",
        "prompt": "Which cue best preserves the required item?",
        "controls": [
          {
            "id": "cue",
            "label": "Revised Press cue",
            "type": "select",
            "options": [
              {
                "value": "An unspecified book",
                "label": "An unspecified book"
              },
              {
                "value": "A map unfolding from a pocket atlas",
                "label": "A map unfolding from a pocket atlas"
              },
              {
                "value": "A brighter room",
                "label": "A brighter room"
              }
            ],
            "expected": "A map unfolding from a pocket atlas"
          }
        ],
        "before": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "count": 2,
            "route": [
              "Gate",
              "Pool",
              "Press",
              "Dome"
            ],
            "selected": "atlas"
          },
          "labels": [
            "Substitution: book"
          ],
          "focus": "atlas",
          "items": [
            {
              "id": "lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#91c9e8"
            },
            {
              "id": "spool",
              "label": "Tether",
              "shape": "spool",
              "color": "#e0a766"
            },
            {
              "id": "atlas",
              "label": "Pocket atlas",
              "shape": "book",
              "color": "#78a68c"
            },
            {
              "id": "beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#f6d174"
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "count": 2,
            "route": [
              "Gate",
              "Pool",
              "Press",
              "Dome"
            ],
            "selected": "atlas",
            "verified": true
          },
          "labels": [
            "Specific cue: maps unfolding"
          ],
          "focus": "atlas",
          "items": [
            {
              "id": "lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#91c9e8"
            },
            {
              "id": "spool",
              "label": "Tether",
              "shape": "spool",
              "color": "#e0a766"
            },
            {
              "id": "atlas",
              "label": "Pocket atlas",
              "shape": "book",
              "color": "#78a68c"
            },
            {
              "id": "beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#f6d174"
            }
          ]
        },
        "success": "The revised cue distinguishes the atlas from the broader category of books.",
        "pitfall": "Making the whole scene brighter does not necessarily preserve the missing distinction.",
        "hint": "Encode the feature that differentiates the intended item.",
        "duration": 18
      },
      {
        "id": "limits",
        "title": "State the measured result",
        "narration": "The supported result is a change from two correctly recalled items to four in one guided trial, with a later substitution. The demonstrator reports that result without promising permanent photographic memory.",
        "why": "Practice, cue quality and material familiarity can all affect a small comparison.",
        "prompt": "Choose the defensible conclusion.",
        "controls": [
          {
            "id": "claim",
            "label": "Conclusion",
            "type": "select",
            "options": [
              {
                "value": "Permanent photographic memory achieved",
                "label": "Permanent photographic memory achieved"
              },
              {
                "value": "This guided retrieval improved on this recorded baseline",
                "label": "This guided retrieval improved on this recorded baseline"
              },
              {
                "value": "All future lists will be perfect",
                "label": "All future lists will be perfect"
              }
            ],
            "expected": "This guided retrieval improved on this recorded baseline"
          }
        ],
        "before": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "count": 4,
            "route": [
              "Gate",
              "Pool",
              "Press",
              "Dome"
            ]
          },
          "labels": [
            "Baseline 2 / 4",
            "Guided retrieval 4 / 4",
            "Delayed substitution recorded"
          ],
          "items": [
            {
              "id": "lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#91c9e8"
            },
            {
              "id": "spool",
              "label": "Tether",
              "shape": "spool",
              "color": "#e0a766"
            },
            {
              "id": "atlas",
              "label": "Pocket atlas",
              "shape": "book",
              "color": "#78a68c"
            },
            {
              "id": "beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#f6d174"
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "covered": false,
            "count": 4,
            "route": [
              "Gate",
              "Pool",
              "Press",
              "Dome"
            ],
            "verified": true
          },
          "labels": [
            "A measured trial, not a universal promise"
          ],
          "items": [
            {
              "id": "lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#91c9e8"
            },
            {
              "id": "spool",
              "label": "Tether",
              "shape": "spool",
              "color": "#e0a766"
            },
            {
              "id": "atlas",
              "label": "Pocket atlas",
              "shape": "book",
              "color": "#78a68c"
            },
            {
              "id": "beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#f6d174"
            }
          ]
        },
        "success": "The completed record explains a strategy, its measured use and its limits.",
        "pitfall": "A single improved trial does not establish an unlimited memory ability.",
        "hint": "Keep the conclusion as narrow as the evidence.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "Completed recall strategy — storm kit",
      "filename": "worked-lab-02.md",
      "markdown": "# Completed demonstration example — storm-kit recall strategy\n\nThis alternate worked example uses Gate, Pool, Press and Dome. It does not supply the assigned lab's item answers.\n\n## Baseline\nI recalled Lens and Beacon: two correct items out of four. I kept that result before inspecting the full list.\n\n## Encoding route\n1. Gate: a giant Lens frames the entrance.\n2. Pool: a Tether splashes in the water.\n3. Press: a Pocket atlas unfolds into maps under the rollers.\n4. Dome: a Beacon lights the roof.\n\n## Retrieval and error\nWith the list covered, I retrieved Lens, Tether, Pocket atlas and Beacon in order. A later attempt produced “book” at the Press. I recorded the substitution and strengthened the map-specific cue rather than silently counting it as exact recall.\n\n## Comparison\nThe guided attempt improved from two correct items to four. That is a result of this small demonstration, not proof of permanent improvement or photographic memory. Rehearsal and item familiarity may also have helped.\n\n## Reflection\nThe fixed locations helped order, while the distinctive images helped item identity. The delayed substitution showed that a generic association preserved a category but not the required object. In another task I would preserve the route, change the items, and inspect whether the same weakness returned. For a critical instruction set that can be carried openly, a checklist may remain the better tool.\n\nRoute: guided example with list covering. Hints: association prompts. Named output: recall-strategy."
    }
  },
  {
    "id": "lab-03",
    "kind": "lab",
    "week": 3,
    "title": "The offset dome connector",
    "subtitle": "Separate rotation, height and handedness.",
    "skill": "Spatial transformations",
    "setting": "A telescope connector begins with north and west ports on level 0.",
    "difference": "The starting port arrangement and required level differ from the assessed connector.",
    "transfer": "Track a labelled original port and distinguish orientation from translation.",
    "sourceHref": "/sessions/week-03/",
    "sourceLabel": "Week 3 lab",
    "estimatedMinutes": 8,
    "steps": [
      {
        "id": "axes",
        "title": "Fix the world axes",
        "narration": "The dome model is labelled north, east and up. The connector begins with ports north and west. The camera can move without changing those world directions.",
        "why": "Camera orientation and object orientation are different reference frames.",
        "prompt": "Which direction remains fixed when the camera orbits?",
        "controls": [
          {
            "id": "reference",
            "label": "Fixed reference",
            "type": "select",
            "options": [
              {
                "value": "World north",
                "label": "World north"
              },
              {
                "value": "Screen left",
                "label": "Screen left"
              },
              {
                "value": "Camera forward",
                "label": "Camera forward"
              }
            ],
            "expected": "World north"
          }
        ],
        "before": {
          "room": "spatial",
          "shot": "establishing",
          "values": {
            "orientation": 0,
            "level": 0,
            "ports": [
              "north",
              "west"
            ]
          },
          "labels": [
            "Initial ports: north / west",
            "Target: east / north, level 2"
          ],
          "focus": "connector"
        },
        "after": {
          "room": "spatial",
          "shot": "close",
          "values": {
            "orientation": 0,
            "level": 0,
            "ports": [
              "north",
              "west"
            ],
            "verified": true
          },
          "labels": [
            "World north remains fixed"
          ],
          "focus": "connector"
        },
        "success": "The reference frame is explicit before any movement.",
        "pitfall": "Treating screen left as west fails as soon as the camera turns.",
        "hint": "Use the labelled compass axis.",
        "duration": 18
      },
      {
        "id": "predict",
        "title": "Predict the quarter-turn",
        "narration": "A clockwise 90-degree rotation maps north to east and west to north. The demonstrator states both predictions before touching the module.",
        "why": "Tracking two labelled features guards against a reflected shape that only looks similar.",
        "prompt": "Where will the original north port point?",
        "controls": [
          {
            "id": "northPort",
            "label": "Predicted north port",
            "type": "select",
            "options": [
              {
                "value": "north",
                "label": "north"
              },
              {
                "value": "east",
                "label": "east"
              },
              {
                "value": "south",
                "label": "south"
              },
              {
                "value": "west",
                "label": "west"
              }
            ],
            "expected": "east"
          }
        ],
        "before": {
          "room": "spatial",
          "shot": "close",
          "values": {
            "orientation": 0,
            "level": 0,
            "ports": [
              "north",
              "west"
            ]
          },
          "labels": [
            "Clockwise quarter-turn proposed"
          ],
          "focus": "connector"
        },
        "after": {
          "room": "spatial",
          "shot": "close",
          "values": {
            "orientation": 0,
            "level": 0,
            "ports": [
              "north",
              "west"
            ]
          },
          "labels": [
            "Prediction: N → E; W → N"
          ],
          "focus": "connector"
        },
        "success": "The predicted mapping fits the target pair.",
        "pitfall": "Guessing from an unlabelled outline can conceal a reflection.",
        "hint": "Follow a clockwise compass turn from north.",
        "duration": 18
      },
      {
        "id": "rotate",
        "title": "Rotate without changing height",
        "narration": "The module turns 90 degrees clockwise while staying on level 0. Its ports now match east and north, but the target is still two levels above.",
        "why": "Satisfying orientation does not also satisfy position.",
        "prompt": "Set the clockwise rotation.",
        "controls": [
          {
            "id": "orientation",
            "label": "Rotation",
            "type": "number",
            "initial": 0,
            "expected": 90,
            "min": 0,
            "max": 270,
            "tolerance": 0,
            "unit": "degrees"
          }
        ],
        "before": {
          "room": "spatial",
          "shot": "overhead",
          "values": {
            "orientation": 0,
            "level": 0,
            "ports": [
              "north",
              "west"
            ]
          },
          "labels": [
            "Target orientation: east / north"
          ],
          "focus": "connector"
        },
        "after": {
          "room": "spatial",
          "shot": "overhead",
          "values": {
            "orientation": 90,
            "level": 0,
            "ports": [
              "north",
              "west"
            ]
          },
          "labels": [
            "Orientation correct; level still 0"
          ],
          "focus": "connector"
        },
        "success": "The rotation is correct while the height remains unresolved.",
        "pitfall": "Declaring success now ignores the independent level requirement.",
        "hint": "One quarter-turn is 90 degrees.",
        "duration": 18
      },
      {
        "id": "translate",
        "title": "Raise the same orientation",
        "narration": "The connector moves to level 2 without turning. The north-labelled original tip continues pointing east.",
        "why": "Translation changes position while preserving orientation.",
        "prompt": "Choose the required level.",
        "controls": [
          {
            "id": "level",
            "label": "Floor level",
            "type": "number",
            "initial": 0,
            "expected": 2,
            "min": 0,
            "max": 2,
            "tolerance": 0
          }
        ],
        "before": {
          "room": "spatial",
          "shot": "close",
          "values": {
            "orientation": 90,
            "level": 0,
            "ports": [
              "north",
              "west"
            ]
          },
          "labels": [
            "Target level: 2"
          ],
          "focus": "connector"
        },
        "after": {
          "room": "spatial",
          "shot": "close",
          "values": {
            "orientation": 90,
            "level": 2,
            "ports": [
              "north",
              "west"
            ]
          },
          "labels": [
            "East / north ports, level 2"
          ],
          "focus": "connector"
        },
        "success": "Both orientation and position now satisfy the target.",
        "pitfall": "An extra rotation while lifting would solve height but break orientation.",
        "hint": "Change the level field, not the rotation field.",
        "duration": 18
      },
      {
        "id": "check",
        "title": "Reject a mirrored shortcut",
        "narration": "A second connector has the same broad outline but its marked ports are reversed by reflection. The demonstrator rejects it because its label mapping differs.",
        "why": "Equivalent silhouettes do not establish equivalent handedness.",
        "prompt": "What must the check preserve?",
        "controls": [
          {
            "id": "test",
            "label": "Verification",
            "type": "select",
            "options": [
              {
                "value": "Only the outline",
                "label": "Only the outline"
              },
              {
                "value": "Both labelled port directions and the level",
                "label": "Both labelled port directions and the level"
              },
              {
                "value": "Only the level",
                "label": "Only the level"
              }
            ],
            "expected": "Both labelled port directions and the level"
          }
        ],
        "before": {
          "room": "spatial",
          "shot": "close",
          "values": {
            "orientation": 90,
            "level": 2,
            "ports": [
              "north",
              "west"
            ]
          },
          "labels": [
            "Compare: rotated original / reflected substitute"
          ],
          "focus": "connector"
        },
        "after": {
          "room": "spatial",
          "shot": "close",
          "values": {
            "orientation": 90,
            "level": 2,
            "ports": [
              "north",
              "west"
            ],
            "verified": true
          },
          "labels": [
            "Original label mapping preserved"
          ],
          "focus": "connector"
        },
        "success": "The accepted model meets all constraints, not just its silhouette.",
        "pitfall": "A reflected part cannot always be substituted by turning it.",
        "hint": "Verify the labels you predicted in step two.",
        "duration": 18
      },
      {
        "id": "transfer",
        "title": "Apply a changed destination",
        "narration": "The same oriented connector is now needed at level 1. The demonstrator lowers it one level and keeps the 90-degree rotation.",
        "why": "A changed position requirement does not justify changing a still-correct orientation.",
        "prompt": "Set the new level while retaining the rotation.",
        "controls": [
          {
            "id": "level",
            "label": "New level",
            "type": "number",
            "initial": 2,
            "expected": 1,
            "min": 0,
            "max": 2,
            "tolerance": 0
          },
          {
            "id": "orientation",
            "label": "Retained rotation",
            "type": "number",
            "initial": 90,
            "expected": 90,
            "min": 0,
            "max": 270,
            "tolerance": 0,
            "unit": "degrees"
          }
        ],
        "before": {
          "room": "spatial",
          "shot": "close",
          "values": {
            "orientation": 90,
            "level": 2,
            "ports": [
              "north",
              "west"
            ]
          },
          "labels": [
            "New target: same ports, level 1"
          ],
          "focus": "connector"
        },
        "after": {
          "room": "spatial",
          "shot": "close",
          "values": {
            "orientation": 90,
            "level": 1,
            "ports": [
              "north",
              "west"
            ],
            "verified": true
          },
          "labels": [
            "Transferred without unnecessary rotation"
          ],
          "focus": "connector"
        },
        "success": "The revision changes only the affected spatial condition.",
        "pitfall": "Repeating the whole movement sequence may rotate an already correct part.",
        "hint": "Retain what still meets the target.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "Completed spatial model — dome connector",
      "filename": "worked-lab-03.md",
      "markdown": "# Completed demonstration example — dome connector\n\nThe assigned connector uses different starting and target conditions.\n\n## Reference frame and prediction\nWorld north and up remain fixed when the camera moves. The alternate connector initially has north/west ports at level 0. A clockwise 90-degree turn maps the original north port to east and the original west port to north.\n\n## Transformation record\n- Initial: 0 degrees, level 0, north/west.\n- After rotation: 90 degrees, level 0, east/north.\n- After translation: 90 degrees, level 2, east/north.\n- Verification: both labelled ports and the required level match.\n\nA mirrored substitute was rejected because outline similarity did not preserve the original label mapping.\n\n## Changed destination\nThe target moved to level 1 without changing port requirements. I lowered the connector and retained its 90-degree orientation.\n\n## Reflection\nI initially treated reaching the right orientation as completion, but the target included a separate height condition. Writing two checks prevented that omission. Tracking the original north tip also made the rotation explainable when the camera changed. In a new configuration I would predict the label mapping before movement and then test position independently.\n\nNamed output: spatial-model. Evidence route: alternate worked simulation."
    }
  },
  {
    "id": "lab-04",
    "kind": "lab",
    "week": 4,
    "title": "The conservatory lift",
    "subtitle": "Diagnose readiness separately from transmission ratio.",
    "skill": "Mechanisms and causal diagnosis",
    "setting": "A model lift has an 18-tooth driver and must deliver three output turns from five input turns.",
    "difference": "New tooth counts, input turns and cam angle prevent copying the assigned mechanism sequence.",
    "transfer": "Apply the ratio and readiness rules to the actual apparatus parameters.",
    "sourceHref": "/sessions/week-04/",
    "sourceLabel": "Week 4 lab",
    "estimatedMinutes": 8,
    "steps": [
      {
        "id": "ratio",
        "title": "Compute before choosing parts",
        "narration": "The published requirement is three output turns from five input turns. The driver has 18 teeth. Solving 18 ÷ follower × 5 = 3 gives a 30-tooth follower.",
        "why": "A gear choice should follow the required motion, not the visual size of the part.",
        "prompt": "Select the follower tooth count.",
        "controls": [
          {
            "id": "gearFollower",
            "label": "Driven gear teeth",
            "type": "number",
            "initial": 18,
            "expected": 30,
            "min": 6,
            "max": 48,
            "tolerance": 0,
            "unit": "teeth"
          }
        ],
        "before": {
          "room": "mechanics",
          "shot": "establishing",
          "values": {
            "gearDriver": 18,
            "gearFollower": 18,
            "turns": 0,
            "interlock": true,
            "cam": 0
          },
          "labels": [
            "Input 5 turns",
            "Required output 3 turns"
          ],
          "focus": "driver"
        },
        "after": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 18,
            "gearFollower": 30,
            "turns": 0,
            "interlock": true,
            "cam": 0
          },
          "labels": [
            "Ratio selected: 18 / 30"
          ],
          "focus": "follower"
        },
        "success": "The selected pair predicts three output turns for five input turns.",
        "pitfall": "Installing a bigger-looking gear without a calculation can produce an unexplained result.",
        "hint": "Rearrange follower = driver × input turns ÷ output turns.",
        "duration": 18
      },
      {
        "id": "release",
        "title": "Find the blocked dependency",
        "narration": "The ratio is correct, but the cam cannot move while the interlock is engaged. The demonstrator stops trying to rotate it and releases the interlock.",
        "why": "A readiness fault and a ratio fault require different corrections.",
        "prompt": "Disengage the interlock.",
        "controls": [
          {
            "id": "interlock",
            "label": "Interlock engaged",
            "type": "toggle",
            "initial": true,
            "expected": false
          }
        ],
        "before": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 18,
            "gearFollower": 30,
            "turns": 0,
            "interlock": true,
            "cam": 0
          },
          "labels": [
            "Cam blocked by interlock"
          ],
          "focus": "interlock"
        },
        "after": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 18,
            "gearFollower": 30,
            "turns": 0,
            "interlock": false,
            "cam": 0
          },
          "labels": [
            "Cam can now be positioned"
          ],
          "focus": "interlock"
        },
        "success": "The dependency blocking cam adjustment is removed.",
        "pitfall": "Changing the gear cannot release an interlock.",
        "hint": "The blocking part is explicitly identified.",
        "duration": 18
      },
      {
        "id": "cam",
        "title": "Set the required phase",
        "narration": "The lift's rule sheet requires a 270-degree cam position for this demonstration. With the interlock released, the demonstrator aligns the cam to that mark.",
        "why": "The same gear ratio can transmit motion at an unsuitable cam phase.",
        "prompt": "Set the cam angle.",
        "controls": [
          {
            "id": "cam",
            "label": "Cam angle",
            "type": "number",
            "initial": 0,
            "expected": 270,
            "min": 0,
            "max": 270,
            "tolerance": 0,
            "unit": "degrees"
          }
        ],
        "before": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 18,
            "gearFollower": 30,
            "turns": 0,
            "interlock": false,
            "cam": 0
          },
          "labels": [
            "Required cam: 270 degrees"
          ],
          "focus": "cam"
        },
        "after": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 18,
            "gearFollower": 30,
            "turns": 0,
            "interlock": false,
            "cam": 270
          },
          "labels": [
            "Cam aligned"
          ],
          "focus": "cam"
        },
        "success": "The cam phase now matches the published lift requirement.",
        "pitfall": "Using the academy lab's familiar 180-degree setting would ignore the changed specification.",
        "hint": "Read the alternate apparatus's 270-degree mark.",
        "duration": 18
      },
      {
        "id": "spring",
        "title": "Restore the return path",
        "narration": "The follower's return spring is detached. The demonstrator attaches it before cranking, so the follower can return through the intended cycle.",
        "why": "Readiness includes both a released obstruction and the required supporting components.",
        "prompt": "Attach the spring.",
        "controls": [
          {
            "id": "spring",
            "label": "Return spring attached",
            "type": "toggle",
            "initial": false,
            "expected": true
          }
        ],
        "before": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 18,
            "gearFollower": 30,
            "turns": 0,
            "interlock": false,
            "cam": 270,
            "spring": false
          },
          "labels": [
            "Return spring absent"
          ],
          "focus": "spring"
        },
        "after": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 18,
            "gearFollower": 30,
            "turns": 0,
            "interlock": false,
            "cam": 270,
            "spring": true
          },
          "labels": [
            "All readiness conditions met"
          ],
          "focus": "spring"
        },
        "success": "The complete mechanism can now execute its modelled cycle.",
        "pitfall": "A partly assembled mechanism can appear ready because the gears themselves turn.",
        "hint": "Check every prerequisite, not only the most recent fault.",
        "duration": 18
      },
      {
        "id": "run",
        "title": "Run and compare",
        "narration": "Five input turns rotate the driven shaft three turns in the opposite direction. The demonstrator compares that motion with the prediction instead of treating movement alone as success.",
        "why": "A moving mechanism can still deliver the wrong amount or direction of motion.",
        "prompt": "Apply five input turns and predict the driven direction.",
        "controls": [
          {
            "id": "turns",
            "label": "Input turns",
            "type": "number",
            "initial": 0,
            "expected": 5,
            "min": 0,
            "max": 10,
            "tolerance": 0,
            "unit": "turns"
          },
          {
            "id": "direction",
            "label": "Driven direction",
            "type": "select",
            "options": [
              {
                "value": "same",
                "label": "same"
              },
              {
                "value": "opposite",
                "label": "opposite"
              }
            ],
            "expected": "opposite"
          }
        ],
        "before": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 18,
            "gearFollower": 30,
            "turns": 0,
            "interlock": false,
            "cam": 270,
            "spring": true
          },
          "labels": [
            "Prediction: 3 opposite output turns"
          ],
          "focus": "driver"
        },
        "after": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 18,
            "gearFollower": 30,
            "turns": 5,
            "interlock": false,
            "cam": 270,
            "spring": true,
            "verified": true
          },
          "labels": [
            "Observed: 3 opposite output turns"
          ],
          "focus": "follower"
        },
        "success": "Observed motion matches both magnitude and direction.",
        "pitfall": "'It moves' is not enough to verify a specified output.",
        "hint": "Externally meshed gears reverse direction.",
        "duration": 18
      },
      {
        "id": "transfer",
        "title": "Revise for a smaller output",
        "narration": "The new task asks for two output turns from four input turns using the same 18-tooth driver. The follower must now have 36 teeth; the still-valid readiness conditions remain.",
        "why": "Transfer requires changing the parameter implicated by the new requirement, not blindly replaying the earlier setup.",
        "prompt": "Choose the new follower and input turns.",
        "controls": [
          {
            "id": "gearFollower",
            "label": "Revised follower",
            "type": "number",
            "initial": 30,
            "expected": 36,
            "min": 6,
            "max": 48,
            "tolerance": 0,
            "unit": "teeth"
          },
          {
            "id": "turns",
            "label": "Revised input",
            "type": "number",
            "initial": 0,
            "expected": 4,
            "min": 0,
            "max": 10,
            "tolerance": 0,
            "unit": "turns"
          }
        ],
        "before": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 18,
            "gearFollower": 30,
            "turns": 0,
            "interlock": false,
            "cam": 270,
            "spring": true
          },
          "labels": [
            "New requirement: 2 output from 4 input"
          ],
          "focus": "follower"
        },
        "after": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 18,
            "gearFollower": 36,
            "turns": 4,
            "interlock": false,
            "cam": 270,
            "spring": true,
            "verified": true
          },
          "labels": [
            "Revised output: 2 turns"
          ],
          "focus": "follower"
        },
        "success": "The revised ratio produces the required output without changing unrelated components.",
        "pitfall": "Retaining the 30-tooth follower would produce 2.4 turns.",
        "hint": "Use follower = 18 × 4 ÷ 2.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "Completed mechanism diagnosis — conservatory lift",
      "filename": "worked-lab-04.md",
      "markdown": "# Completed demonstration example — conservatory lift\n\nThis alternate mechanism uses an 18-tooth driver, different turn requirements and a 270-degree cam.\n\n## Causal model\nInput rotation → external gear pair → cam → spring-return follower → lift output. The interlock blocks cam adjustment until released. Motion also requires the spring and specified cam phase.\n\n## Prediction and diagnosis\nFor three output turns from five input turns: follower = 18 × 5 ÷ 3 = 30 teeth. The driven gear turns opposite the driver. A correct ratio did not initially produce a ready mechanism because the interlock was engaged and the return spring absent.\n\nI released the interlock, set the cam to 270 degrees and attached the spring. I retained the ratio calculation because it was not contradicted by the readiness fault.\n\n## Verification\nFive input turns produced three opposite output turns. Both the amount and direction matched the prediction.\n\n## Transfer\nThe changed task required two output turns from four input turns. I selected 36 follower teeth: 18 ÷ 36 × 4 = 2. The cam and spring conditions remained valid.\n\n## Reflection\nThe useful distinction was between an incorrect transmission ratio and a blocked dependency. Changing gears would not have released the cam. In a new apparatus I would record the output requirement, list readiness conditions and test both separately.\n\nNamed output: mechanism-diagnosis. This is a model, not a real lock or physical qualification."
    }
  },
  {
    "id": "lab-05",
    "kind": "lab",
    "week": 5,
    "title": "The nine-volt beacon",
    "subtitle": "Separate a missing supply from a failed load.",
    "skill": "Electronic fault diagnosis",
    "setting": "A fictional bench beacon uses a nine-volt supply and a replaceable cable segment.",
    "difference": "The supply voltage and equipment differ from the assigned circuit; a second fault requires a different diagnostic test.",
    "transfer": "Identify probe locations, isolate before changes and verify both supply and output.",
    "sourceHref": "/sessions/week-05/",
    "sourceLabel": "Week 5 lab",
    "estimatedMinutes": 8,
    "steps": [
      {
        "id": "measure",
        "title": "Read the actual supply",
        "narration": "The published source is 9 V. With power on, the source and fuse outputs read 9 V, but the cable output and beacon supply read 0 V. The demonstrator records the probe locations.",
        "why": "A voltage belongs to a difference between points. Naming the node and common return makes the result repeatable.",
        "prompt": "Record the source voltage.",
        "controls": [
          {
            "id": "voltage",
            "label": "Source voltage",
            "type": "number",
            "initial": 0,
            "expected": 9,
            "min": 0,
            "max": 12,
            "tolerance": 0,
            "unit": "V"
          },
          {
            "id": "powered",
            "label": "Power on for voltage measurement",
            "type": "toggle",
            "initial": false,
            "expected": true
          }
        ],
        "before": {
          "room": "systems",
          "shot": "establishing",
          "values": {
            "voltage": 9,
            "powered": false,
            "fault": "cable"
          },
          "labels": [
            "Measure relative to common return"
          ],
          "focus": "source"
        },
        "after": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": true,
            "fault": "cable"
          },
          "labels": [
            "Source 9 / Fuse 9 / Cable 0 / Beacon 0 V"
          ],
          "focus": "cable"
        },
        "success": "The powered trace identifies where the supply first disappears.",
        "pitfall": "A zero reading while isolated would not locate this supply fault.",
        "hint": "Use the 9 V source named in this example.",
        "duration": 18
      },
      {
        "id": "locate",
        "title": "Localise the interrupted path",
        "narration": "The first missing supply is after the cable segment. The fuse output remains healthy, so the demonstrator does not replace the fuse merely because it is often the cause of a dark lamp.",
        "why": "Consecutive readings distinguish candidate faults with the same symptom.",
        "prompt": "Select the fault supported by the readings.",
        "controls": [
          {
            "id": "fault",
            "label": "Located open component",
            "type": "select",
            "options": [
              {
                "value": "fuse",
                "label": "fuse"
              },
              {
                "value": "cable",
                "label": "cable"
              },
              {
                "value": "lamp",
                "label": "lamp"
              }
            ],
            "expected": "cable"
          }
        ],
        "before": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": true,
            "fault": "cable"
          },
          "labels": [
            "Before cable: 9 V",
            "After cable: 0 V"
          ],
          "focus": "cable"
        },
        "after": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": true,
            "fault": "cable",
            "selected": "cable"
          },
          "labels": [
            "Diagnosis: cable supply break"
          ],
          "focus": "cable"
        },
        "success": "The diagnosis follows a discriminating pair of measurements.",
        "pitfall": "Replacing the most familiar component is a guess unless the readings support it.",
        "hint": "Find the first transition from healthy supply to zero.",
        "duration": 18
      },
      {
        "id": "isolate",
        "title": "Isolate before replacement",
        "narration": "The demonstrator switches the model source off before touching the cable. The earlier powered readings remain in the record.",
        "why": "The diagnostic condition and the safe replacement condition are different states.",
        "prompt": "Isolate the source.",
        "controls": [
          {
            "id": "powered",
            "label": "Source powered",
            "type": "toggle",
            "initial": true,
            "expected": false
          }
        ],
        "before": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": true,
            "fault": "cable"
          },
          "labels": [
            "Replacement pending"
          ],
          "focus": "source"
        },
        "after": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": false,
            "fault": "cable"
          },
          "labels": [
            "Source isolated; evidence preserved"
          ],
          "focus": "source"
        },
        "success": "The component can be replaced in the intended isolated state.",
        "pitfall": "Taking all readings with the source off would avoid the required diagnosis.",
        "hint": "Turn power off now, after preserving the measurements.",
        "duration": 18
      },
      {
        "id": "verify",
        "title": "Restore and verify the whole path",
        "narration": "The cable is replaced, power restored and the beacon lights. The beacon supply reads 9 V. The demonstrator checks output as well as voltage.",
        "why": "A successful local replacement should restore the intended system behaviour.",
        "prompt": "Choose the complete verification.",
        "controls": [
          {
            "id": "verification",
            "label": "Repair check",
            "type": "select",
            "options": [
              {
                "value": "Only inspect the replacement label",
                "label": "Only inspect the replacement label"
              },
              {
                "value": "Confirm 9 V at beacon and light output",
                "label": "Confirm 9 V at beacon and light output"
              },
              {
                "value": "Assume replacement means success",
                "label": "Assume replacement means success"
              }
            ],
            "expected": "Confirm 9 V at beacon and light output"
          },
          {
            "id": "powered",
            "label": "Restore power",
            "type": "toggle",
            "initial": false,
            "expected": true
          }
        ],
        "before": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": false,
            "fault": "none"
          },
          "labels": [
            "Replacement installed"
          ],
          "focus": "beacon"
        },
        "after": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": true,
            "fault": "none",
            "verified": true
          },
          "labels": [
            "Beacon supply 9 V; beacon lit"
          ],
          "focus": "beacon"
        },
        "success": "The restored supply and observed light support the repair.",
        "pitfall": "A component label does not establish that the complete path works.",
        "hint": "Verify the symptom that originally motivated the diagnosis.",
        "duration": 18
      },
      {
        "id": "load",
        "title": "Recognise a different fault",
        "narration": "A second beacon stays dark while every supply node reads 9 V. The demonstrator rejects the first-zero method because no supply zero exists, then isolates power for a continuity check.",
        "why": "An open load can have healthy voltage at its input. The same symptom can require a different test.",
        "prompt": "Select the next justified test and isolate power.",
        "controls": [
          {
            "id": "test",
            "label": "Next test",
            "type": "select",
            "options": [
              {
                "value": "Replace the fuse without testing",
                "label": "Replace the fuse without testing"
              },
              {
                "value": "Check lamp continuity with power isolated",
                "label": "Check lamp continuity with power isolated"
              },
              {
                "value": "Repeat the unchanged source reading",
                "label": "Repeat the unchanged source reading"
              }
            ],
            "expected": "Check lamp continuity with power isolated"
          },
          {
            "id": "powered",
            "label": "Power during continuity check",
            "type": "toggle",
            "initial": true,
            "expected": false
          }
        ],
        "before": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": true,
            "fault": "lamp"
          },
          "labels": [
            "All supply nodes 9 V; beacon dark"
          ],
          "focus": "beacon"
        },
        "after": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": false,
            "fault": "lamp"
          },
          "labels": [
            "Isolated continuity: open"
          ],
          "focus": "beacon"
        },
        "success": "The isolated continuity result identifies the open lamp rather than a missing supply.",
        "pitfall": "Healthy voltage does not prove that current passes through a working load.",
        "hint": "Distinguish the lamp's input voltage from its continuity.",
        "duration": 18
      },
      {
        "id": "conclude",
        "title": "Repair and state the limit",
        "narration": "The lamp is replaced while isolated. Restored power produces light with 9 V supply. The record distinguishes the cable fault from the open-load fault.",
        "why": "Explaining why the test changed demonstrates transfer beyond a memorised replacement sequence.",
        "prompt": "Select the supported conclusion.",
        "controls": [
          {
            "id": "conclusion",
            "label": "Diagnostic lesson",
            "type": "select",
            "options": [
              {
                "value": "Every dark lamp means zero supply",
                "label": "Every dark lamp means zero supply"
              },
              {
                "value": "Supply and load faults may need different checks",
                "label": "Supply and load faults may need different checks"
              },
              {
                "value": "A lit lamp proves every circuit is safe",
                "label": "A lit lamp proves every circuit is safe"
              }
            ],
            "expected": "Supply and load faults may need different checks"
          }
        ],
        "before": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": false,
            "fault": "none"
          },
          "labels": [
            "Lamp replaced while isolated"
          ],
          "focus": "beacon"
        },
        "after": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": true,
            "fault": "none",
            "verified": true
          },
          "labels": [
            "Second fault resolved; diagnosis recorded"
          ],
          "focus": "beacon"
        },
        "success": "The record supports this apparatus and these checks, not arbitrary physical circuits.",
        "pitfall": "Do not generalise a simplified teaching model into an unrestricted hardware rule.",
        "hint": "State exactly what the two different tests established.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "Completed circuit diagnosis — nine-volt beacon",
      "filename": "worked-lab-05.md",
      "markdown": "# Completed demonstration example — nine-volt beacon\n\nThis alternate apparatus uses 9 V. It is a fictional bench model, not an instruction to work on mains equipment.\n\n## First fault\nPowered readings relative to common return: source 9 V; fuse output 9 V; cable output 0 V; beacon supply 0 V. The first missing supply followed the cable segment, supporting an open cable rather than an open fuse.\n\nI isolated power, replaced the cable, restored power and verified 9 V at the beacon together with visible light.\n\n## Changed fault\nThe second beacon remained dark with 9 V at every supply node. Those readings did not support a missing supply. I isolated power and checked continuity through the lamp; the model reported an open load. I replaced the lamp while isolated, restored power and verified light plus 9 V supply.\n\n## Reflection\nMy original first-zero strategy worked for a supply break but could not diagnose the second fault. Repeating a healthy source measurement added no information. The important change was to distinguish supply from load continuity. The record preserves the powered observations and the later isolated action so another reader can see why each test was appropriate.\n\n## Limits\nThese are authored model readings. They are not measurements from constructed hardware, and their idealisation does not establish the behaviour of an arbitrary physical circuit.\n\nNamed output: circuit-diagnosis. Assistance: complete narrated worked example."
    }
  },
  {
    "id": "lab-06",
    "kind": "lab",
    "week": 6,
    "title": "Which weather ledger is required?",
    "subtitle": "Compare versions against a changing signed requirement.",
    "skill": "Digital investigation",
    "setting": "Three conservatory weather ledgers differ in completeness, timestamp and digest.",
    "difference": "The alternate records contain 18 sections and Q-7/Q-9 digests instead of assigned archive values.",
    "transfer": "Use the current authority and preserve the scope of earlier conclusions.",
    "sourceHref": "/sessions/week-06/",
    "sourceLabel": "Week 6 lab",
    "estimatedMinutes": 8,
    "steps": [
      {
        "id": "contract",
        "title": "Read the reference first",
        "narration": "The signed request specifies 18 sections with digest Q-7. Ledger North has 18/Q-7 at 07:20; East has 18/Q-9 at 07:45; South has 17/Q-2 at 07:15.",
        "why": "The target defines what a comparison is meant to establish.",
        "prompt": "Record the required section count.",
        "controls": [
          {
            "id": "count",
            "label": "Required sections",
            "type": "number",
            "initial": 0,
            "expected": 18,
            "min": 0,
            "max": 30,
            "tolerance": 0
          }
        ],
        "before": {
          "room": "digital",
          "shot": "establishing",
          "values": {
            "verified": false
          },
          "labels": [
            "Mandate: 18 sections, Q-7",
            "North 07:20 / Q-7",
            "East 07:45 / Q-9",
            "South 07:15 / Q-2"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:20"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:45"
            },
            {
              "id": "South",
              "label": "South record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:15"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18
          },
          "labels": [
            "Reference scope recorded"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:20"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:45"
            },
            {
              "id": "South",
              "label": "South record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:15"
            }
          ]
        },
        "success": "The comparison has an explicit completeness and identity requirement.",
        "pitfall": "A latest-file habit can override the actual request.",
        "hint": "Read the signed requirement before choosing a candidate.",
        "duration": 18
      },
      {
        "id": "timeline",
        "title": "Put recency in its place",
        "narration": "The demonstrator orders the timestamps South, North, East. East is newest, but its digest differs from Q-7.",
        "why": "Time order and content identity answer different questions.",
        "prompt": "Arrange the versions from earliest to latest.",
        "controls": [
          {
            "id": "items",
            "label": "Timeline",
            "type": "order",
            "options": [
              {
                "value": "East 07:45",
                "label": "East 07:45"
              },
              {
                "value": "South 07:15",
                "label": "South 07:15"
              },
              {
                "value": "North 07:20",
                "label": "North 07:20"
              }
            ],
            "initial": [
              "East 07:45",
              "South 07:15",
              "North 07:20"
            ],
            "expected": [
              "South 07:15",
              "North 07:20",
              "East 07:45"
            ]
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "selected": "East"
          },
          "labels": [
            "Newest does not mean required"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:20"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:45"
            },
            {
              "id": "South",
              "label": "South record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:15"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "items": [
              "South 07:15",
              "North 07:20",
              "East 07:45"
            ]
          },
          "labels": [
            "Chronology recorded separately"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:20"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:45"
            },
            {
              "id": "South",
              "label": "South record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:15"
            }
          ]
        },
        "success": "The timeline is accurate without being mistaken for an integrity test.",
        "pitfall": "Selecting East solely because of 07:45 ignores the digest requirement.",
        "hint": "Sort time first; evaluate the signed reference separately.",
        "duration": 18
      },
      {
        "id": "compare",
        "title": "Use both required checks",
        "narration": "North meets both 18 sections and Q-7. South lacks a section; East differs in content. The demonstrator chooses North under the original request.",
        "why": "A candidate must meet all relevant conditions, not just one favourable feature.",
        "prompt": "Choose the matching ledger.",
        "controls": [
          {
            "id": "selected",
            "label": "Original selection",
            "type": "select",
            "options": [
              {
                "value": "North",
                "label": "North"
              },
              {
                "value": "East",
                "label": "East"
              },
              {
                "value": "South",
                "label": "South"
              }
            ],
            "expected": "North"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "items": [
              "South 07:15",
              "North 07:20",
              "East 07:45"
            ],
            "verified": false
          },
          "labels": [
            "North 18/Q-7",
            "East 18/Q-9",
            "South 17/Q-2"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:20"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:45"
            },
            {
              "id": "South",
              "label": "South record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:15"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "items": [
              "South 07:15",
              "North 07:20",
              "East 07:45"
            ],
            "selected": "North",
            "verified": true
          },
          "labels": [
            "North matches original request"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:20"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:45"
            },
            {
              "id": "South",
              "label": "South record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:15"
            }
          ]
        },
        "success": "North is supported as the unchanged requested ledger.",
        "pitfall": "The correct section count alone cannot establish matching content.",
        "hint": "Check count and digest together.",
        "duration": 18
      },
      {
        "id": "limit",
        "title": "Bound the integrity claim",
        "narration": "Matching Q-7 establishes agreement with the supplied reference. It does not establish that every weather observation is scientifically correct.",
        "why": "A precise verification claim leaves semantic accuracy as a separate question.",
        "prompt": "Choose what the match establishes.",
        "controls": [
          {
            "id": "scope",
            "label": "Supported scope",
            "type": "select",
            "options": [
              {
                "value": "Every observation is scientifically true",
                "label": "Every observation is scientifically true"
              },
              {
                "value": "The ledger matches the supplied Q-7 reference",
                "label": "The ledger matches the supplied Q-7 reference"
              },
              {
                "value": "No future amendment is possible",
                "label": "No future amendment is possible"
              }
            ],
            "expected": "The ledger matches the supplied Q-7 reference"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "items": [
              "South 07:15",
              "North 07:20",
              "East 07:45"
            ],
            "selected": "North",
            "verified": true
          },
          "labels": [
            "Match confirmed"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:20"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:45"
            },
            {
              "id": "South",
              "label": "South record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:15"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "items": [
              "South 07:15",
              "North 07:20",
              "East 07:45"
            ],
            "selected": "North",
            "verified": true
          },
          "labels": [
            "Limit: content truth not established"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:20"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:45"
            },
            {
              "id": "South",
              "label": "South record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:15"
            }
          ]
        },
        "success": "The conclusion stays within the evidence's scope.",
        "pitfall": "Confusing identity with truth overstates what a checksum comparison proves.",
        "hint": "Matching content can still contain an error in the reference.",
        "duration": 18
      },
      {
        "id": "amend",
        "title": "Respond to a signed amendment",
        "narration": "A later signed request explicitly requires the annotated Q-9 ledger with 18 sections. The demonstrator preserves the original selection and changes the current recommendation to East.",
        "why": "An authoritative requirement can change without making the historical comparison false.",
        "prompt": "Choose the candidate under the amendment.",
        "controls": [
          {
            "id": "selected",
            "label": "Amended selection",
            "type": "select",
            "options": [
              {
                "value": "North",
                "label": "North"
              },
              {
                "value": "East",
                "label": "East"
              },
              {
                "value": "South",
                "label": "South"
              }
            ],
            "expected": "East"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "items": [
              "South 07:15",
              "North 07:20",
              "East 07:45"
            ],
            "selected": "North"
          },
          "labels": [
            "Amended mandate: 18 / Q-9",
            "Original North choice preserved"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:20"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:45"
            },
            {
              "id": "South",
              "label": "South record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:15"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "items": [
              "South 07:15",
              "North 07:20",
              "East 07:45"
            ],
            "selected": "East",
            "revision": "Q-7 → Q-9",
            "verified": true
          },
          "labels": [
            "East matches current mandate"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:20"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:45"
            },
            {
              "id": "South",
              "label": "South record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:15"
            }
          ]
        },
        "success": "The changed selection is explained by changed authority.",
        "pitfall": "Silently overwriting North hides why the original decision made sense.",
        "hint": "Use the current signed digest, not the earlier preference.",
        "duration": 18
      },
      {
        "id": "record",
        "title": "Write a traceable recommendation",
        "narration": "The completed recommendation cites each mandate, the selected ledger and unresolved semantic accuracy. It does not call East malicious merely because it was annotated.",
        "why": "A useful investigation record separates observations, authority and motive.",
        "prompt": "Which statement belongs in the final record?",
        "controls": [
          {
            "id": "statement",
            "label": "Recommendation",
            "type": "select",
            "options": [
              {
                "value": "East was certainly forged",
                "label": "East was certainly forged"
              },
              {
                "value": "East matches the amended request; purpose of annotation remains a separate question",
                "label": "East matches the amended request; purpose of annotation remains a separate question"
              },
              {
                "value": "North was never a valid choice",
                "label": "North was never a valid choice"
              }
            ],
            "expected": "East matches the amended request; purpose of annotation remains a separate question"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "items": [
              "South 07:15",
              "North 07:20",
              "East 07:45"
            ],
            "selected": "East",
            "revision": "Original and amended decisions"
          },
          "labels": [
            "Historical and current selections visible"
          ],
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:20"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:45"
            },
            {
              "id": "South",
              "label": "South record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:15"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "items": [
              "South 07:15",
              "North 07:20",
              "East 07:45"
            ],
            "verified": true
          },
          "labels": [
            "Recommendation includes scope and provenance"
          ],
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:20"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:45"
            },
            {
              "id": "South",
              "label": "South record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:15"
            }
          ]
        },
        "success": "The completed timeline can be reconstructed by another investigator.",
        "pitfall": "A mismatch alone does not establish intent.",
        "hint": "Describe what changed without inventing a motive.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "Completed evidence timeline — weather ledgers",
      "filename": "worked-lab-06.md",
      "markdown": "# Completed demonstration example — weather-ledger investigation\n\nAlternate fixtures: 18 sections, Q-7/Q-9 references and North/East/South ledgers.\n\n| Time | Record | Direct result | Interpretation |\n| --- | --- | --- | --- |\n| 07:15 | South | 17 sections, Q-2 | Incomplete against the original request |\n| 07:20 | North | 18 sections, Q-7 | Matches original signed request |\n| 07:45 | East | 18 sections, Q-9 | Annotated variant; newest is not automatically required |\n| Amendment | Signed request | 18 sections, Q-9 required | Current target changes to East |\n\n## Preserved recommendations\nOriginal: select North because it meets both the count and Q-7 requirement.\nAmended: select East because the later signed authority explicitly requires Q-9.\n\n## Limits and next check\nDigest agreement establishes identity against the supplied reference, not the truth of every weather observation. The annotation's purpose requires its own supporting record. I would inspect that record before making claims about motive.\n\n## Reflection\nSeparating the timeline from the comparison stopped recency from deciding the answer. The amendment changed the appropriate recommendation without invalidating the recorded fact that North matched the earlier request. My revised record preserves both authorities so the reader can explain the change without guessing.\n\nNamed output: evidence-timeline. Demonstration material, not an assigned response."
    }
  },
  {
    "id": "lab-07",
    "kind": "lab",
    "week": 7,
    "title": "The observatory access charter",
    "subtitle": "A complete alternate worked example, followed by meaningful takeover practice.",
    "skill": "Permission diagnosis",
    "setting": "A local telescope-record system has reader, maintainer and custodian roles.",
    "difference": "Different role names and an approve operation require applying the policy concept rather than copying the assigned matrix.",
    "transfer": "Write expectations before testing, repair both excess and missing rights, then retest a changed mandate.",
    "sourceHref": "/sessions/week-07/",
    "sourceLabel": "Week 7 lab",
    "estimatedMinutes": 8,
    "steps": [
      {
        "id": "mandate",
        "title": "Write the intended authority",
        "narration": "The charter allows everyone to read, only the maintainer to service and only the custodian to approve release. An initial shortcut gives every signed-in role approval.",
        "why": "Recognition of an identity is not a grant of every capability.",
        "prompt": "Who may approve release?",
        "controls": [
          {
            "id": "role",
            "label": "Authorised approval role",
            "type": "select",
            "options": [
              {
                "value": "reader",
                "label": "reader"
              },
              {
                "value": "maintainer",
                "label": "maintainer"
              },
              {
                "value": "custodian",
                "label": "custodian"
              }
            ],
            "expected": "custodian"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "establishing",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:allow",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:allow",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ]
          },
          "labels": [
            "Read: all",
            "Service: maintainer",
            "Approve: custodian"
          ],
          "focus": "policy"
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:allow",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:allow",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ],
            "role": "custodian"
          },
          "labels": [
            "Expected approval authority recorded"
          ],
          "focus": "policy"
        },
        "success": "The expected decision follows a published charter.",
        "pitfall": "Using the currently enabled button as the authority merely repeats the bug.",
        "hint": "Read the operation's role requirement.",
        "duration": 18
      },
      {
        "id": "negative",
        "title": "Reproduce an unauthorised success",
        "narration": "The demonstrator requests approval as reader. The current system allows it; the charter requires denial. Both expected and observed results are recorded.",
        "why": "A reproducible failure needs a specific subject and action.",
        "prompt": "Record what the faulty system actually does for reader approval.",
        "controls": [
          {
            "id": "observedApproval",
            "label": "Observed reader approval result",
            "type": "select",
            "options": [
              {
                "value": "allow",
                "label": "Allow — unauthorised success"
              },
              {
                "value": "deny",
                "label": "Deny — matches the charter"
              }
            ],
            "expected": "allow"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:allow",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:allow",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ],
            "role": "reader"
          },
          "labels": [
            "Faulty matrix — reader approval is allowed"
          ],
          "focus": "policy"
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:allow",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:allow",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ],
            "role": "reader"
          },
          "labels": [
            "Negative test records an unauthorised success"
          ],
          "focus": "policy"
        },
        "success": "The actual allow result contradicts the charter's expected denial. Keep this failed test as evidence before repairing the condition.",
        "pitfall": "Saying 'the system is insecure' gives no reproducible test.",
        "hint": "The reader role only needs read access.",
        "duration": 18
      },
      {
        "id": "repair",
        "title": "Repair the condition",
        "narration": "Approval is restricted to custodian. The demonstrator does not merely hide a button; the role/action decision itself changes.",
        "why": "The policy must hold regardless of which interface issued the request.",
        "prompt": "Choose the approval rule.",
        "controls": [
          {
            "id": "rule",
            "label": "Approval condition",
            "type": "select",
            "options": [
              {
                "value": "Any signed-in role",
                "label": "Any signed-in role"
              },
              {
                "value": "Role is custodian",
                "label": "Role is custodian"
              },
              {
                "value": "No role ever",
                "label": "No role ever"
              }
            ],
            "expected": "Role is custodian"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:allow",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:allow",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ]
          },
          "labels": [
            "Overbroad condition"
          ],
          "focus": "policy"
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:deny",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ]
          },
          "labels": [
            "Approval restricted to custodian"
          ],
          "focus": "policy"
        },
        "success": "The repair removes excess authority while preserving intended approval.",
        "pitfall": "Denying all approvals would break the system's legitimate purpose.",
        "hint": "The charter specifies one authorised role.",
        "duration": 18
      },
      {
        "id": "positive",
        "title": "Check useful work survives",
        "narration": "The maintainer services an instrument and the custodian approves a release. Both operations still succeed. The reader continues to read.",
        "why": "Negative tests alone cannot detect a repair that disables all useful operations.",
        "prompt": "Which positive check must still pass?",
        "controls": [
          {
            "id": "check",
            "label": "Required positive case",
            "type": "select",
            "options": [
              {
                "value": "Reader approves",
                "label": "Reader approves"
              },
              {
                "value": "Maintainer services",
                "label": "Maintainer services"
              },
              {
                "value": "Reader services",
                "label": "Reader services"
              }
            ],
            "expected": "Maintainer services"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:deny",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ]
          },
          "labels": [
            "Regression checks pending"
          ],
          "focus": "policy"
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:deny",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ],
            "verified": true
          },
          "labels": [
            "Read / service / approval preserved"
          ],
          "focus": "policy"
        },
        "success": "The matrix now supports both permitted and forbidden cases.",
        "pitfall": "A repair can pass one denial test while breaking required work.",
        "hint": "Choose an action the charter explicitly permits.",
        "duration": 18
      },
      {
        "id": "hold",
        "title": "Apply a narrow policy update",
        "narration": "A calibration hold temporarily suspends custodian approval but preserves reading and maintenance. The original repaired matrix is retained as version 1.",
        "why": "A new authoritative rule changes expectations rather than making the old test dishonest.",
        "prompt": "Disable only the affected approval.",
        "controls": [
          {
            "id": "custodianApprove",
            "label": "Custodian approval during hold",
            "type": "toggle",
            "initial": true,
            "expected": false
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:deny",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ],
            "revision": "Policy V1 retained"
          },
          "labels": [
            "Calibration hold suspends approval"
          ],
          "focus": "policy"
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:deny",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:deny"
            ],
            "revision": "Policy V2: approval hold"
          },
          "labels": [
            "Read and service remain available"
          ],
          "focus": "policy"
        },
        "success": "The update changes the affected authority and retains unrelated rights.",
        "pitfall": "Disabling service as well would overreach the stated hold.",
        "hint": "The hold names approval, not maintenance.",
        "duration": 18
      },
      {
        "id": "audit",
        "title": "Document the before and after",
        "narration": "The record contains the initial unauthorised result, repaired charter matrix, positive checks and the later approval hold. The demonstrator labels each with its authority.",
        "why": "Traceability lets another person distinguish a discovered bug from a changed requirement.",
        "prompt": "Choose the correct description of the hold.",
        "controls": [
          {
            "id": "status",
            "label": "Reason for changed test",
            "type": "select",
            "options": [
              {
                "value": "The original charter never existed",
                "label": "The original charter never existed"
              },
              {
                "value": "A published new rule changed the expected result",
                "label": "A published new rule changed the expected result"
              },
              {
                "value": "The reader became the custodian",
                "label": "The reader became the custodian"
              }
            ],
            "expected": "A published new rule changed the expected result"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:deny",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:deny"
            ],
            "revision": "V1 → V2"
          },
          "labels": [
            "Original repair and later hold are separate"
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:deny",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:deny"
            ],
            "verified": true,
            "revision": "Audit complete"
          },
          "labels": [
            "Expected / observed / authority preserved"
          ]
        },
        "success": "The completed audit explains why a result changed.",
        "pitfall": "Silently overwriting the original matrix removes the learning evidence.",
        "hint": "Keep bug repair and policy revision as separate events.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "The observatory access charter — completed record",
      "filename": "worked-lab-07.md",
      "markdown": "# Completed demonstration example — observatory permission audit\n\nThis alternate local system uses reader, maintainer and custodian roles.\n\n## Published charter\nAll roles read. Only maintainer services. Only custodian approves release.\n\n## Initial failure\nRequest: reader / approve. Expected: deny. Observed: allow. The original condition treated any signed-in identity as approval authority.\n\n## Repaired matrix\n| Role | Read | Service | Approve |\n| --- | --- | --- | --- |\n| Reader | Allow | Deny | Deny |\n| Maintainer | Allow | Allow | Deny |\n| Custodian | Allow | Deny | Allow |\n\nNegative checks rejected reader and maintainer approval. Positive checks retained reader access, maintainer service and custodian approval.\n\n## Preserved revision\nVersion 1 is the repaired charter matrix above. Version 2 applies a later calibration hold: custodian approval becomes deny; all other cells remain unchanged. The historical V1 result was correct under the original authority.\n\n## Reflection\nThe useful distinction was between an excessive permission and a later policy change. Denying all operations would conceal the first problem by making the system useless. I checked positive cases as deliberately as negative ones and kept the authority beside each expected result.\n\nNamed output: permission-audit. These are fictional local operations, not an external security test."
    }
  },
  {
    "id": "lab-08",
    "kind": "lab",
    "week": 8,
    "title": "Five cases to the dome",
    "subtitle": "A complete alternate worked example, followed by meaningful takeover practice.",
    "skill": "Asymmetric communication",
    "setting": "An analyst knows the delivery instruction; an operator controls the dispatch table.",
    "difference": "The alternate handoff is Dome / 5 / VIOLET, then Pool / 2 / SILVER.",
    "transfer": "Keep action, destination, quantity, condition and acknowledgement explicit when the values change.",
    "sourceHref": "/sessions/week-08/",
    "sourceLabel": "Week 8 lab",
    "estimatedMinutes": 8,
    "steps": [
      {
        "id": "discover",
        "title": "Identify the missing information",
        "narration": "The analyst's card says five sealed cases to Dome, verification VIOLET. The operator sees destination controls but not the card. 'Send those upstairs' leaves critical fields unstated.",
        "why": "Competent participants can still hold different information.",
        "prompt": "Which field is missing from 'send those upstairs'?",
        "controls": [
          {
            "id": "missing",
            "label": "Missing actionable information",
            "type": "select",
            "options": [
              {
                "value": "Exact destination and count",
                "label": "Exact destination and count"
              },
              {
                "value": "The speaker's confidence",
                "label": "The speaker's confidence"
              },
              {
                "value": "A louder voice",
                "label": "A louder voice"
              }
            ],
            "expected": "Exact destination and count"
          }
        ],
        "before": {
          "room": "council",
          "shot": "establishing",
          "values": {
            "role": "analyst"
          },
          "labels": [
            "Dome / 5 / VIOLET"
          ],
          "focus": "speaker"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "role": "operator"
          },
          "labels": [
            "Operator requests exact instruction"
          ],
          "focus": "speaker"
        },
        "success": "The communication gap is identified before dispatch.",
        "pitfall": "Repeating vague wording does not make the missing fields appear.",
        "hint": "Ask whether another person could act without guessing.",
        "duration": 18
      },
      {
        "id": "destination",
        "title": "Name the destination",
        "narration": "The analyst says 'Deliver five sealed cases to Dome.' The operator records the exact named destination rather than translating it into a personal direction such as upstairs.",
        "why": "Shared names reduce ambiguity when viewpoints differ.",
        "prompt": "Enter the destination.",
        "controls": [
          {
            "id": "destination",
            "label": "Named destination",
            "type": "text",
            "initial": "",
            "expected": "Dome"
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "role": "analyst"
          },
          "labels": [
            "Authoritative destination: Dome"
          ],
          "focus": "speaker"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "role": "operator",
            "selected": "Dome"
          },
          "labels": [
            "Destination recorded: Dome"
          ],
          "focus": "speaker"
        },
        "success": "The destination can now be checked against the same label.",
        "pitfall": "Upstairs depends on the starting point and can describe several rooms.",
        "hint": "Use the destination printed on the analyst card.",
        "duration": 18
      },
      {
        "id": "quantity",
        "title": "Preserve the exact quantity",
        "narration": "The operator initially hears four, reads it back and is corrected to five. The demonstrator preserves this mismatch rather than showing only a flawless exchange.",
        "why": "Read-back exposes a consequential difference before action.",
        "prompt": "Correct the operator's quantity.",
        "controls": [
          {
            "id": "count",
            "label": "Number of cases",
            "type": "number",
            "initial": 1,
            "expected": 5,
            "min": 1,
            "max": 8,
            "tolerance": 0
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "count": 4,
            "role": "operator"
          },
          "labels": [
            "Read-back: four",
            "Analyst card: five"
          ],
          "focus": "cases"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "count": 5,
            "role": "operator"
          },
          "labels": [
            "Corrected before dispatch"
          ],
          "focus": "cases"
        },
        "success": "The count now agrees and the repair remains visible.",
        "pitfall": "An acknowledgement of 'understood' would not reveal the wrong count.",
        "hint": "Read the number aloud or type it explicitly.",
        "duration": 18
      },
      {
        "id": "code",
        "title": "Carry the verification condition",
        "narration": "The dispatch code is VIOLET. A familiar code from an earlier exercise would be wrong even if the destination and count were correct.",
        "why": "A complete instruction contains the current condition, not a remembered default.",
        "prompt": "Enter the verification code.",
        "controls": [
          {
            "id": "code",
            "label": "Current code",
            "type": "text",
            "initial": "",
            "expected": "VIOLET"
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "count": 5,
            "role": "analyst"
          },
          "labels": [
            "Code on current card: VIOLET"
          ],
          "focus": "console"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "count": 5,
            "role": "operator",
            "verified": true
          },
          "labels": [
            "Dome / 5 / VIOLET"
          ],
          "focus": "console"
        },
        "success": "All three fields now match the current instruction.",
        "pitfall": "Correct destination alone does not establish a complete handoff.",
        "hint": "Copy the authoritative condition, not a previous trial's code.",
        "duration": 18
      },
      {
        "id": "confirm",
        "title": "Close the communication loop",
        "narration": "The operator reads back Dome, five, VIOLET. The analyst compares all three fields and confirms. Only then is the handoff complete.",
        "why": "The receiver's exact understanding becomes inspectable before action.",
        "prompt": "Record acknowledgement after the complete read-back.",
        "controls": [
          {
            "id": "acknowledged",
            "label": "Read-back confirmed",
            "type": "toggle",
            "initial": false,
            "expected": true
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "count": 5,
            "role": "operator"
          },
          "labels": [
            "Dome / 5 / VIOLET awaiting confirmation"
          ],
          "focus": "speaker"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "count": 5,
            "role": "analyst",
            "verified": true
          },
          "labels": [
            "Analyst confirms matching read-back"
          ],
          "focus": "speaker"
        },
        "success": "Both roles share the same actionable instruction.",
        "pitfall": "Silence is not evidence that all fields were heard correctly.",
        "hint": "Confirm the entire message, not just its arrival.",
        "duration": 18
      },
      {
        "id": "transfer",
        "title": "Reuse the protocol, change the message",
        "narration": "The next card says two cases to Pool, verification SILVER. The demonstrator changes all three fields and performs another read-back; the earlier values are preserved in the record.",
        "why": "Transfer keeps a sound communication method while replacing its current content.",
        "prompt": "Record the fresh handoff.",
        "controls": [
          {
            "id": "destination",
            "label": "New destination",
            "type": "text",
            "initial": "",
            "expected": "Pool"
          },
          {
            "id": "count",
            "label": "New quantity",
            "type": "number",
            "initial": 1,
            "expected": 2,
            "min": 1,
            "max": 8,
            "tolerance": 0
          },
          {
            "id": "code",
            "label": "New code",
            "type": "text",
            "initial": "",
            "expected": "SILVER"
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "count": 5,
            "role": "analyst"
          },
          "labels": [
            "New card: Pool / 2 / SILVER"
          ],
          "focus": "speaker"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "count": 2,
            "role": "operator",
            "verified": true
          },
          "labels": [
            "Pool / 2 / SILVER confirmed"
          ],
          "focus": "speaker"
        },
        "success": "The protocol survives a different task without carrying stale values.",
        "pitfall": "Reusing VIOLET would be a memory error disguised as routine.",
        "hint": "Treat each field as a current requirement.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "Five cases to the dome — completed record",
      "filename": "worked-lab-08.md",
      "markdown": "# Completed demonstration example — dome handoff\n\n## Role information\nAnalyst card: five sealed cases to Dome, verification VIOLET.\nOperator: controls dispatch and must request exact destination, count and code.\n\n## Recorded exchange\nAnalyst: “Deliver five sealed cases to Dome; verification code VIOLET. Read back before dispatch.”\nOperator first read-back: “Dome, four, VIOLET.”\nAnalyst: “Correct the count to five.”\nOperator corrected read-back: “Dome, five, VIOLET.”\nAnalyst: “Confirmed.”\n\nThe count mismatch was found before movement. A bare acknowledgement would not have exposed it.\n\n## Changed situation\nNew card: Pool / 2 / SILVER. The team repeated the same protocol with new values. The operator's matching read-back was confirmed separately from the earlier handoff.\n\n## Agreement\nThe analyst owns instruction accuracy; the operator records and repeats the three fields; either role may stop if a field conflicts. A completed acknowledgement applies to one identified instruction, not every later delivery.\n\n## Reflection\nThe protocol was useful because it made the receiver's interpretation visible. My error was a wrong count, not unwillingness to cooperate. In another task I would preserve exact labels and ask which condition permits action, especially when the roles see different screens.\n\nNamed output: handoff-agreement. This is an alternate demonstration, not the assigned Relay/Archive/Dispatch answer."
    }
  },
  {
    "id": "lab-09",
    "kind": "lab",
    "week": 9,
    "title": "The conservatory council",
    "subtitle": "A complete alternate worked example, followed by meaningful takeover practice.",
    "skill": "Evidence-based negotiation",
    "setting": "Caretaker Ada, archivist Rin and engineer Bo disagree about moving a fragile field ledger.",
    "difference": "New people, a seven-unit ledger and five/nine-unit support limits require reading the evidence afresh.",
    "transfer": "Represent a role's legitimate responsibility and verify claims through records, not manner.",
    "sourceHref": "/sessions/week-09/",
    "sourceLabel": "Week 9 lab",
    "estimatedMinutes": 8,
    "steps": [
      {
        "id": "role",
        "title": "Define the mediator's responsibility",
        "narration": "The mediator is authorised to negotiate access while preserving the caretaker's custody responsibility. The role cannot simply order the original removed.",
        "why": "A role grants responsibilities with limits, not universal authority.",
        "prompt": "Choose an action within the role.",
        "controls": [
          {
            "id": "proposal",
            "label": "Permitted starting action",
            "type": "select",
            "options": [
              {
                "value": "Negotiate a documented agreement",
                "label": "Negotiate a documented agreement"
              },
              {
                "value": "Ignore the custodian",
                "label": "Ignore the custodian"
              },
              {
                "value": "Invent new authority",
                "label": "Invent new authority"
              }
            ],
            "expected": "Negotiate a documented agreement"
          }
        ],
        "before": {
          "room": "council",
          "shot": "establishing",
          "values": {
            "role": "mediator"
          },
          "labels": [
            "Mandate: negotiate access; preserve custody"
          ],
          "focus": "speaker"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "role": "mediator",
            "verified": true
          },
          "labels": [
            "Responsibilities stated before proposals"
          ],
          "focus": "speaker"
        },
        "success": "The negotiation starts from a legitimate mandate.",
        "pitfall": "Urgency does not erase another role's published responsibility.",
        "hint": "State what your role can authorise and what it cannot.",
        "duration": 18
      },
      {
        "id": "claim",
        "title": "Test a confident content claim",
        "narration": "Rin says the two field-ledger copies are identical. The comparison record lists digests R-4 and R-8. The demonstrator questions the claim without judging Rin's confidence or intent.",
        "why": "Conflicting content identifiers challenge identity, but do not prove deliberate deception.",
        "prompt": "Which record tests the identical-copy claim?",
        "controls": [
          {
            "id": "evidence",
            "label": "Relevant evidence",
            "type": "select",
            "options": [
              {
                "value": "Digest comparison R-4 / R-8",
                "label": "Digest comparison R-4 / R-8"
              },
              {
                "value": "Rin's eye contact",
                "label": "Rin's eye contact"
              },
              {
                "value": "Ada's confidence",
                "label": "Ada's confidence"
              }
            ],
            "expected": "Digest comparison R-4 / R-8"
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "role": "archivist"
          },
          "labels": [
            "Claim: identical copies",
            "Record: R-4 and R-8"
          ],
          "focus": "manifest"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "selected": "comparison",
            "verified": true
          },
          "labels": [
            "Identity claim contradicted; motive unresolved"
          ],
          "focus": "manifest"
        },
        "success": "The challenge is grounded in a record, not a personality judgement.",
        "pitfall": "Treating confidence as proof can endorse a false claim or unfairly reject a true one.",
        "hint": "Choose evidence about the contents themselves.",
        "duration": 18
      },
      {
        "id": "capacity",
        "title": "Check the physical constraint",
        "narration": "Bo proposes placing the seven-unit original on a cart rated for five. A stabilising cradle supports nine units, but has not yet been installed.",
        "why": "A numerical capacity limit is a constraint that negotiation cannot wish away.",
        "prompt": "Does the unsupported cart meet the load requirement?",
        "controls": [
          {
            "id": "supported",
            "label": "Unsupported cart sufficient",
            "type": "toggle",
            "initial": true,
            "expected": false
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "load": 7,
            "capacity": 5
          },
          "labels": [
            "Original 7 units; unsupported capacity 5"
          ],
          "focus": "cart"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "load": 7,
            "capacity": 9
          },
          "labels": [
            "Cradle option: capacity 9, verification needed"
          ],
          "focus": "cart"
        },
        "success": "Unsupported transport is rejected; the cradle remains a testable alternative.",
        "pitfall": "Calling the load 'only slightly heavier' does not satisfy the rated limit.",
        "hint": "Compare the load with the current, not proposed, capacity.",
        "duration": 18
      },
      {
        "id": "agree",
        "title": "Find an agreement the mandate supports",
        "narration": "Ada permits a verified research copy to leave if custody is recorded and the original stays. Under the current research-access objective, a verified copy can meet the need without unsupported transport.",
        "why": "Negotiation can satisfy different legitimate priorities through a bounded alternative.",
        "prompt": "Choose the agreement supported by the current mandate.",
        "controls": [
          {
            "id": "proposal",
            "label": "Agreement",
            "type": "select",
            "options": [
              {
                "value": "Take the original on the unsupported cart",
                "label": "Take the original on the unsupported cart"
              },
              {
                "value": "Recover a verified copy and record custody",
                "label": "Recover a verified copy and record custody"
              },
              {
                "value": "Assume both files are identical",
                "label": "Assume both files are identical"
              }
            ],
            "expected": "Recover a verified copy and record custody"
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "load": 7,
            "capacity": 5,
            "role": "caretaker"
          },
          "labels": [
            "Original stays; verified copy may leave"
          ],
          "focus": "speaker"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "load": 7,
            "capacity": 5,
            "proposal": "verified copy",
            "verified": true
          },
          "labels": [
            "Research access and custody both preserved"
          ],
          "focus": "speaker"
        },
        "success": "The agreement meets the stated objective while respecting custody.",
        "pitfall": "A compromise still needs evidence that the chosen copy is the required one.",
        "hint": "Separate access to research from ownership of the physical original.",
        "duration": 18
      },
      {
        "id": "change",
        "title": "Respond to a provenance requirement",
        "narration": "A new signed brief says physical provenance is essential and the original must remain until a supported handover. A copy alone no longer completes the revised objective.",
        "why": "A changed objective can make a previously sound agreement insufficient.",
        "prompt": "Choose the revised approach.",
        "controls": [
          {
            "id": "proposal",
            "label": "Revised agreement",
            "type": "select",
            "options": [
              {
                "value": "Repeat the copy agreement unchanged",
                "label": "Repeat the copy agreement unchanged"
              },
              {
                "value": "Stabilise the original and arrange supported handover",
                "label": "Stabilise the original and arrange supported handover"
              },
              {
                "value": "Move it immediately on the five-unit cart",
                "label": "Move it immediately on the five-unit cart"
              }
            ],
            "expected": "Stabilise the original and arrange supported handover"
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "load": 7,
            "capacity": 5,
            "revision": "New provenance mandate"
          },
          "labels": [
            "Original required; supported handover"
          ],
          "focus": "speaker"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "load": 7,
            "capacity": 9,
            "revision": "Stabilise and hand over"
          },
          "labels": [
            "Cradle verification assigned"
          ],
          "focus": "cart"
        },
        "success": "The revision follows the new requirement rather than a change in personal trust.",
        "pitfall": "Repeating an old agreement does not satisfy a different objective.",
        "hint": "Name the new condition and design the handover around it.",
        "duration": 18
      },
      {
        "id": "record",
        "title": "Preserve uncertainty honestly",
        "narration": "The record keeps Rin's contradicted claim, the capacity numbers, Ada's authority and both agreements. It does not diagnose whether anyone lied.",
        "why": "Evidence checking can be decisive about a claim while remaining uncertain about motive.",
        "prompt": "Select the defensible closing statement.",
        "controls": [
          {
            "id": "conclusion",
            "label": "Conclusion",
            "type": "select",
            "options": [
              {
                "value": "Rin's manner proves deceit",
                "label": "Rin's manner proves deceit"
              },
              {
                "value": "The identity claim conflicts with the record; intent is unresolved",
                "label": "The identity claim conflicts with the record; intent is unresolved"
              },
              {
                "value": "Every disagreement means bad faith",
                "label": "Every disagreement means bad faith"
              }
            ],
            "expected": "The identity claim conflicts with the record; intent is unresolved"
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "load": 7,
            "capacity": 9,
            "revision": "Original / revised agreement"
          },
          "labels": [
            "Claim evidence kept separate from motives"
          ]
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "load": 7,
            "capacity": 9,
            "verified": true
          },
          "labels": [
            "Agreement and unresolved intent documented"
          ]
        },
        "success": "The completed account supports action without pretending to read minds.",
        "pitfall": "Confusing an inaccurate claim with proven deliberate deception overstates the evidence.",
        "hint": "Evaluate the claim's support; leave unsupported motives open.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "The conservatory council — completed record",
      "filename": "worked-lab-09.md",
      "markdown": "# Completed demonstration example — conservatory council agreement\n\n## Responsibilities\nMediator: negotiate research access without erasing custody.\nCaretaker Ada: retain the original unless a documented, supported handover is authorised.\nArchivist Rin: identify the required research content.\nEngineer Bo: verify equipment capacity before movement.\n\n## Claim checks\nRin's “identical copies” claim conflicts with digests R-4 and R-8. That contradiction concerns content identity; it does not establish intent.\nBo's unsupported transport proposal conflicts with original mass 7 and cart capacity 5. A cradle offers capacity 9, subject to verification.\n\n## Original agreement\nRecover a verified research copy, record custody and leave the physical original with Ada. This meets the original research-access mandate.\n\n## Revised agreement\nA new provenance mandate requires retaining the original pending supported handover. Stabilise it, verify the cradle, identify the custodian and document unresolved checks. The earlier copy agreement remains in the history but no longer completes the revised objective.\n\n## Reflection\nRepresenting the mediator meant finding a supported agreement, not winning every disagreement. Numerical constraints and written authority were more useful than interpreting confidence. The revised objective changed the right agreement without requiring a new story about anyone's character.\n\nNamed output: claim-verification."
    }
  },
  {
    "id": "lab-10",
    "kind": "lab",
    "week": 10,
    "title": "Predict the instrumented gallery",
    "subtitle": "A complete alternate worked example, followed by meaningful takeover practice.",
    "skill": "Route modelling",
    "setting": "A five-by-five gallery leads from cell 20 to cell 3; highlighted cells record entries.",
    "difference": "The destination and sensor pattern differ from the assigned grid.",
    "transfer": "Predict the complete event trace, including revisits, and explain a route objective.",
    "sourceHref": "/sessions/week-10/",
    "sourceLabel": "Week 10 lab",
    "estimatedMinutes": 8,
    "steps": [
      {
        "id": "map",
        "title": "Read the coordinate contract",
        "narration": "Cells are numbered 0–24 in rows from top left. Start is 20 and destination 3. Sensors occupy 15, 16 and 11; every step ending on a sensor records one contact.",
        "why": "A visible game rule can be applied exactly without borrowing assumptions about real surveillance.",
        "prompt": "Record the destination cell.",
        "controls": [
          {
            "id": "goal",
            "label": "Destination cell",
            "type": "number",
            "initial": 0,
            "expected": 3,
            "min": 0,
            "max": 24,
            "tolerance": 0
          }
        ],
        "before": {
          "room": "movement",
          "shot": "establishing",
          "values": {
            "start": 20,
            "goal": 3,
            "sensors": [
              "15",
              "16",
              "11"
            ],
            "route": [
              "20"
            ]
          },
          "labels": [
            "Start 20; goal 3",
            "Contact on each sensor entry"
          ],
          "focus": "route"
        },
        "after": {
          "room": "movement",
          "shot": "close",
          "values": {
            "start": 20,
            "goal": 3,
            "sensors": [
              "15",
              "16",
              "11"
            ],
            "route": [
              "20"
            ],
            "verified": true
          },
          "labels": [
            "Coordinates fixed"
          ],
          "focus": "route"
        },
        "success": "The route has a clear start, target and detection rule.",
        "pitfall": "Changing the camera does not renumber the world cells.",
        "hint": "Read the target identifier rather than assuming the familiar top-right cell.",
        "duration": 18
      },
      {
        "id": "predict",
        "title": "Predict the first route",
        "narration": "The route 20→15→10→5→0→1→2→3 enters sensor 15 once. Its other cells are outside the detection set.",
        "why": "An explicit prediction lets the later trace test your model.",
        "prompt": "Predict the contact count.",
        "controls": [
          {
            "id": "count",
            "label": "Predicted contacts",
            "type": "number",
            "initial": 0,
            "expected": 1,
            "min": 0,
            "max": 8,
            "tolerance": 0
          }
        ],
        "before": {
          "room": "movement",
          "shot": "close",
          "values": {
            "start": 20,
            "goal": 3,
            "sensors": [
              "15",
              "16",
              "11"
            ],
            "route": [
              "20",
              "15",
              "10",
              "5",
              "0",
              "1",
              "2",
              "3"
            ],
            "currentStep": 0
          },
          "labels": [
            "Prediction before movement"
          ],
          "focus": "route"
        },
        "after": {
          "room": "movement",
          "shot": "close",
          "values": {
            "start": 20,
            "goal": 3,
            "sensors": [
              "15",
              "16",
              "11"
            ],
            "route": [
              "20",
              "15",
              "10",
              "5",
              "0",
              "1",
              "2",
              "3"
            ],
            "count": 1,
            "currentStep": 1
          },
          "labels": [
            "First contact at cell 15"
          ],
          "focus": "route"
        },
        "success": "One contact follows directly from the listed cells.",
        "pitfall": "Reaching the target does not prove that a guessed count was correct.",
        "hint": "Compare every visited cell with the sensor set.",
        "duration": 18
      },
      {
        "id": "execute",
        "title": "Follow the ordered path",
        "narration": "The demonstrator executes the recorded route one step at a time and reaches cell 3 with one contact. The path is retained rather than replaced by a success badge.",
        "why": "The event trace explains the result and supports replay.",
        "prompt": "Arrange the route cells in execution order.",
        "controls": [
          {
            "id": "route",
            "label": "Route order",
            "type": "order",
            "options": [
              {
                "value": "20",
                "label": "20"
              },
              {
                "value": "10",
                "label": "10"
              },
              {
                "value": "15",
                "label": "15"
              },
              {
                "value": "5",
                "label": "5"
              },
              {
                "value": "3",
                "label": "3"
              },
              {
                "value": "0",
                "label": "0"
              },
              {
                "value": "2",
                "label": "2"
              },
              {
                "value": "1",
                "label": "1"
              }
            ],
            "initial": [
              "20",
              "10",
              "15",
              "5",
              "3",
              "0",
              "2",
              "1"
            ],
            "expected": [
              "20",
              "15",
              "10",
              "5",
              "0",
              "1",
              "2",
              "3"
            ]
          }
        ],
        "before": {
          "room": "movement",
          "shot": "close",
          "values": {
            "start": 20,
            "goal": 3,
            "sensors": [
              "15",
              "16",
              "11"
            ],
            "route": [
              "20"
            ],
            "count": 1,
            "currentStep": 0
          },
          "labels": [
            "Recorded path awaiting execution"
          ],
          "focus": "route"
        },
        "after": {
          "room": "movement",
          "shot": "close",
          "values": {
            "start": 20,
            "goal": 3,
            "sensors": [
              "15",
              "16",
              "11"
            ],
            "route": [
              "20",
              "15",
              "10",
              "5",
              "0",
              "1",
              "2",
              "3"
            ],
            "count": 1,
            "currentStep": 7,
            "verified": true
          },
          "labels": [
            "Goal reached; predicted count matches"
          ],
          "focus": "route"
        },
        "success": "The complete path supports the stated count.",
        "pitfall": "A reordered jump between nonadjacent cells is not a legal step.",
        "hint": "Use orthogonal neighbours and the published route.",
        "duration": 18
      },
      {
        "id": "alternative",
        "title": "Compare a different route",
        "narration": "A second route goes 20→21→22→23→18→13→8→3. Under the original sensor set it records no contacts and has the same seven moves.",
        "why": "An alternative makes the objective and trade-off explicit.",
        "prompt": "Predict this alternative's contact count.",
        "controls": [
          {
            "id": "count",
            "label": "Alternative contacts",
            "type": "number",
            "initial": 0,
            "expected": 0,
            "min": 0,
            "max": 8,
            "tolerance": 0
          }
        ],
        "before": {
          "room": "movement",
          "shot": "close",
          "values": {
            "start": 20,
            "goal": 3,
            "sensors": [
              "15",
              "16",
              "11"
            ],
            "route": [
              "20",
              "21",
              "22",
              "23",
              "18",
              "13",
              "8",
              "3"
            ],
            "count": 1,
            "currentStep": 0
          },
          "labels": [
            "Alternative route, same distance"
          ],
          "focus": "route"
        },
        "after": {
          "room": "movement",
          "shot": "close",
          "values": {
            "start": 20,
            "goal": 3,
            "sensors": [
              "15",
              "16",
              "11"
            ],
            "route": [
              "20",
              "21",
              "22",
              "23",
              "18",
              "13",
              "8",
              "3"
            ],
            "count": 0,
            "currentStep": 7
          },
          "labels": [
            "No contact under original pattern"
          ],
          "focus": "route"
        },
        "success": "The comparison supports choosing either route for an explicitly stated purpose.",
        "pitfall": "Zero contacts is not an automatic academic grade.",
        "hint": "None of these route cells belongs to the original sensor set.",
        "duration": 18
      },
      {
        "id": "change",
        "title": "Recompute when coverage changes",
        "narration": "The published new sensor set is 21, 22 and 23. The second route now records three contacts. The demonstrator preserves its earlier zero count under the old rule.",
        "why": "A previously successful route is not a substitute for an updated model.",
        "prompt": "Predict the revised contact count for the second route.",
        "controls": [
          {
            "id": "count",
            "label": "Contacts under changed sensors",
            "type": "number",
            "initial": 0,
            "expected": 3,
            "min": 0,
            "max": 8,
            "tolerance": 0
          }
        ],
        "before": {
          "room": "movement",
          "shot": "close",
          "values": {
            "start": 20,
            "goal": 3,
            "sensors": [
              "21",
              "22",
              "23"
            ],
            "route": [
              "20",
              "21",
              "22",
              "23",
              "18",
              "13",
              "8",
              "3"
            ],
            "count": 0,
            "currentStep": 0,
            "revision": "Sensor set changed"
          },
          "labels": [
            "New sensor cells: 21,22,23"
          ],
          "focus": "route"
        },
        "after": {
          "room": "movement",
          "shot": "close",
          "values": {
            "start": 20,
            "goal": 3,
            "sensors": [
              "21",
              "22",
              "23"
            ],
            "route": [
              "20",
              "21",
              "22",
              "23",
              "18",
              "13",
              "8",
              "3"
            ],
            "count": 3,
            "currentStep": 7
          },
          "labels": [
            "Three contacts; old trace preserved"
          ],
          "focus": "route"
        },
        "success": "The changed prediction follows the changed cells.",
        "pitfall": "Reusing zero because it was correct before ignores the new contract.",
        "hint": "Count entries into 21, 22 and 23.",
        "duration": 18
      },
      {
        "id": "defend",
        "title": "Explain rather than glorify an ending",
        "narration": "For a training objective of checking the detector, the three-contact route may be useful. For minimising recorded contact, the first route now has zero. The demonstrator states the objective before choosing.",
        "why": "Route quality is relative to a stated task, not a universal stealth score.",
        "prompt": "Which approach makes the decision defensible?",
        "controls": [
          {
            "id": "objective",
            "label": "Decision basis",
            "type": "select",
            "options": [
              {
                "value": "Always call the lowest count best",
                "label": "Always call the lowest count best"
              },
              {
                "value": "State the objective and compare both traces",
                "label": "State the objective and compare both traces"
              },
              {
                "value": "Ignore recorded observations",
                "label": "Ignore recorded observations"
              }
            ],
            "expected": "State the objective and compare both traces"
          }
        ],
        "before": {
          "room": "movement",
          "shot": "close",
          "values": {
            "start": 20,
            "goal": 3,
            "sensors": [
              "21",
              "22",
              "23"
            ],
            "route": [
              "20",
              "15",
              "10",
              "5",
              "0",
              "1",
              "2",
              "3"
            ],
            "count": 0
          },
          "labels": [
            "Different objectives can favour different routes"
          ]
        },
        "after": {
          "room": "movement",
          "shot": "close",
          "values": {
            "start": 20,
            "goal": 3,
            "sensors": [
              "21",
              "22",
              "23"
            ],
            "route": [
              "20",
              "15",
              "10",
              "5",
              "0",
              "1",
              "2",
              "3"
            ],
            "count": 0,
            "verified": true,
            "revision": "Trace comparison retained"
          },
          "labels": [
            "Objective, prediction and observation connected"
          ]
        },
        "success": "The output demonstrates a model and its transfer to changed conditions.",
        "pitfall": "A dramatic 'undetected' label would hide the actual learning evidence.",
        "hint": "Choose using the published objective and both records.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "Predict the instrumented gallery — completed record",
      "filename": "worked-lab-10.md",
      "markdown": "# Completed demonstration example — instrumented gallery routes\n\nThis alternate five-by-five model uses zero-based cells, start 20 and destination 3.\n\n## Original sensor set\n15, 16, 11.\n\nRoute A: 20 → 15 → 10 → 5 → 0 → 1 → 2 → 3. Prediction: one contact. Trace: one contact at 15.\nRoute B: 20 → 21 → 22 → 23 → 18 → 13 → 8 → 3. Prediction: zero. Trace: zero. Both routes use seven moves.\n\n## Changed sensor set\n21, 22, 23.\nRoute B now records three contacts; Route A records zero. The earlier records remain labelled with the original pattern.\n\n## Decision\nIf the objective is minimal recorded contact, Route B fits the original pattern and Route A fits the changed one. If the task is to verify detector observations, a route through the sensor cells may be more useful. Contact is a game event, not automatic failure.\n\n## Reflection\nThe most useful artefact was the ordered route plus the sensor set, because it made each count reproducible. I avoided treating a once-correct zero as a permanent property of the path. In my own task I would predict before execution and inspect the first disagreement rather than changing the route until an attractive ending appears.\n\nNamed output: sensor-route."
    }
  },
  {
    "id": "lab-11",
    "kind": "lab",
    "week": 11,
    "title": "When the bridge closes",
    "subtitle": "A complete alternate worked example, followed by meaningful takeover practice.",
    "skill": "Preserved revision",
    "setting": "A conservatory delivery plan depends on an east bridge and a verified trolley.",
    "difference": "The alternate disruption closes a bridge and adds a west-platform load check.",
    "transfer": "Locate the failed dependency, retain valid evidence and communicate the revised responsibility.",
    "sourceHref": "/sessions/week-11/",
    "sourceLabel": "Week 11 lab",
    "estimatedMinutes": 8,
    "steps": [
      {
        "id": "baseline",
        "title": "Freeze the original plan",
        "narration": "Version 1 reads: inspect ledger, verify trolley, cross east bridge, record custody. The demonstrator freezes it before reading the disruption.",
        "why": "A revision can only be explained if its earlier state remains available.",
        "prompt": "Arrange and preserve Version 1.",
        "controls": [
          {
            "id": "items",
            "label": "Original plan",
            "type": "order",
            "options": [
              {
                "value": "Record custody",
                "label": "Record custody"
              },
              {
                "value": "Inspect ledger",
                "label": "Inspect ledger"
              },
              {
                "value": "Cross east bridge",
                "label": "Cross east bridge"
              },
              {
                "value": "Verify trolley",
                "label": "Verify trolley"
              }
            ],
            "initial": [
              "Record custody",
              "Inspect ledger",
              "Cross east bridge",
              "Verify trolley"
            ],
            "expected": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ]
          }
        ],
        "before": {
          "room": "operations",
          "shot": "establishing",
          "values": {
            "revision": "No baseline yet",
            "originalPlan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "plan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ]
          },
          "labels": [
            "Four-step plan awaiting preservation"
          ],
          "focus": "original-plan"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "plan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "revision": "V1: inspect → verify → east bridge → custody"
          },
          "labels": [
            "Original preserved"
          ],
          "focus": "original-plan"
        },
        "success": "The first plan can now be compared with later decisions.",
        "pitfall": "Writing the baseline after seeing the disruption can invent foresight.",
        "hint": "Keep the original plan exactly as it was stated.",
        "duration": 18
      },
      {
        "id": "disruption",
        "title": "Identify the affected dependency",
        "narration": "A published notice closes the east bridge. The west platform remains available but requires a load-capacity check. Ledger identity evidence has not changed.",
        "why": "A specific disruption does not automatically invalidate every earlier result.",
        "prompt": "Which original dependency fails?",
        "controls": [
          {
            "id": "dependency",
            "label": "Failed dependency",
            "type": "select",
            "options": [
              {
                "value": "Ledger identity",
                "label": "Ledger identity"
              },
              {
                "value": "East bridge availability",
                "label": "East bridge availability"
              },
              {
                "value": "Need to record custody",
                "label": "Need to record custody"
              }
            ],
            "expected": "East bridge availability"
          }
        ],
        "before": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "plan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "revision": "V1 retained"
          },
          "labels": [
            "Notice: east bridge closed",
            "West requires load check"
          ],
          "focus": "notice"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "plan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "revision": "Affected: transport route"
          },
          "labels": [
            "Ledger and custody evidence retained"
          ],
          "focus": "notice"
        },
        "success": "The diagnosis scopes the change to the route and its new condition.",
        "pitfall": "Discarding every earlier result wastes evidence that remains valid.",
        "hint": "Name the step that relied on the closed bridge.",
        "duration": 18
      },
      {
        "id": "retain",
        "title": "Keep justified work",
        "narration": "The trolley's completed inspection and ledger reference remain applicable. The demonstrator carries those findings forward while labelling the additional platform check.",
        "why": "Preserving valid work is as important as changing invalid work.",
        "prompt": "Select the evidence that remains usable.",
        "controls": [
          {
            "id": "retained",
            "label": "Retained finding",
            "type": "select",
            "options": [
              {
                "value": "The east bridge is open",
                "label": "The east bridge is open"
              },
              {
                "value": "The unchanged signed ledger comparison",
                "label": "The unchanged signed ledger comparison"
              },
              {
                "value": "No new check is required",
                "label": "No new check is required"
              }
            ],
            "expected": "The unchanged signed ledger comparison"
          }
        ],
        "before": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "plan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "revision": "Reconsider dependencies"
          },
          "labels": [
            "Signed ledger reference unchanged"
          ],
          "focus": "manifest"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "plan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "verified": true,
            "revision": "Ledger verification retained"
          },
          "labels": [
            "New route still needs verification"
          ],
          "focus": "manifest"
        },
        "success": "The revision preserves a justified finding without overextending it.",
        "pitfall": "Retaining the ledger result does not prove the new platform is ready.",
        "hint": "The disruption changed a route, not the content reference.",
        "duration": 18
      },
      {
        "id": "assign",
        "title": "Assign the new verification",
        "narration": "The systems role owns the platform load check. The coordinator must receive its result before authorising the changed handoff.",
        "why": "A technically correct revision can fail when responsibility is implicit.",
        "prompt": "Choose the verification owner.",
        "controls": [
          {
            "id": "role",
            "label": "Load-check owner",
            "type": "select",
            "options": [
              {
                "value": "Systems specialist",
                "label": "Systems specialist"
              },
              {
                "value": "Nobody; assume it is fine",
                "label": "Nobody; assume it is fine"
              },
              {
                "value": "The most confident speaker",
                "label": "The most confident speaker"
              }
            ],
            "expected": "Systems specialist"
          }
        ],
        "before": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "plan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "role": "unassigned",
            "revision": "West-platform check pending"
          },
          "labels": [
            "New condition lacks an owner"
          ],
          "focus": "crew"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "plan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "role": "systems",
            "revision": "Owner assigned; coordinator awaits result"
          },
          "labels": [
            "Explicit cross-role dependency"
          ],
          "focus": "crew"
        },
        "success": "The new task has an owner and a recipient.",
        "pitfall": "Putting a check in a plan does not ensure anyone performs it.",
        "hint": "Assign the role with the relevant apparatus responsibility.",
        "duration": 18
      },
      {
        "id": "revise",
        "title": "Build Version 2",
        "narration": "The team retains inspection and trolley verification, adds the platform check, crosses west and records custody. Version 1 remains unchanged.",
        "why": "The changed order exposes the new prerequisite rather than hiding it in prose.",
        "prompt": "Arrange the revised sequence.",
        "controls": [
          {
            "id": "items",
            "label": "Version 2",
            "type": "order",
            "options": [
              {
                "value": "Cross west platform",
                "label": "Cross west platform"
              },
              {
                "value": "Record custody",
                "label": "Record custody"
              },
              {
                "value": "Inspect ledger",
                "label": "Inspect ledger"
              },
              {
                "value": "Check platform capacity",
                "label": "Check platform capacity"
              },
              {
                "value": "Verify trolley",
                "label": "Verify trolley"
              }
            ],
            "initial": [
              "Cross west platform",
              "Record custody",
              "Inspect ledger",
              "Check platform capacity",
              "Verify trolley"
            ],
            "expected": [
              "Inspect ledger",
              "Verify trolley",
              "Check platform capacity",
              "Cross west platform",
              "Record custody"
            ]
          }
        ],
        "before": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "plan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "revision": "V1 preserved / V2 draft"
          },
          "labels": [
            "West crossing depends on capacity check"
          ],
          "focus": "revised-plan"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "plan": [
              "Inspect ledger",
              "Verify trolley",
              "Check platform capacity",
              "Cross west platform",
              "Record custody"
            ],
            "revision": "V2: inspect → trolley → capacity → west → custody",
            "verified": true
          },
          "labels": [
            "New prerequisite precedes movement"
          ],
          "focus": "revised-plan"
        },
        "success": "The revised plan respects the new dependency and retains the original.",
        "pitfall": "Moving first and checking capacity afterwards cannot justify that move.",
        "hint": "Place the new verification before the action it permits.",
        "duration": 18
      },
      {
        "id": "communicate",
        "title": "Confirm the shared revision",
        "narration": "The coordinator reads the revised route and stop condition to the other roles. The team acknowledges that the east bridge remains closed and west movement awaits the check.",
        "why": "A revised document is not necessarily a revised shared understanding.",
        "prompt": "Confirm the changed-plan read-back.",
        "controls": [
          {
            "id": "acknowledged",
            "label": "All roles received the revision",
            "type": "toggle",
            "initial": false,
            "expected": true
          }
        ],
        "before": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "plan": [
              "Inspect ledger",
              "Verify trolley",
              "Check platform capacity",
              "Cross west platform",
              "Record custody"
            ],
            "revision": "V2 ready; handoff pending"
          },
          "labels": [
            "Stop if platform check fails"
          ],
          "focus": "crew"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect ledger",
              "Verify trolley",
              "Cross east bridge",
              "Record custody"
            ],
            "plan": [
              "Inspect ledger",
              "Verify trolley",
              "Check platform capacity",
              "Cross west platform",
              "Record custody"
            ],
            "revision": "V1 and V2 retained",
            "verified": true
          },
          "labels": [
            "Shared plan updated; uncertainty recorded"
          ],
          "focus": "crew"
        },
        "success": "The completed record contains the change, its reason, responsibility and communication.",
        "pitfall": "Assuming everyone noticed the edit leaves old actions in circulation.",
        "hint": "Read back the new condition explicitly.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "When the bridge closes — completed record",
      "filename": "worked-lab-11.md",
      "markdown": "# Completed demonstration example — bridge revision memo\n\n## Preserved Version 1\nInspect ledger → verify trolley → cross east bridge → record custody.\n\n## Published disruption\nThe east bridge is closed. The west platform is available only after a load-capacity check.\n\n## Diagnosis\nThe failed dependency is route availability. The signed ledger comparison and completed trolley inspection remain applicable. The need to record custody also remains.\n\n## Version 2\nInspect ledger → verify trolley → check west-platform capacity → cross west platform → record custody.\n\nSystems specialist owns the added capacity check. The coordinator receives its result and stops movement if it fails. The revised route and stop condition are read back to all roles before execution.\n\n## Rationale and limits\nThe revision changes only the affected route and adds its prerequisite. It does not claim that an available platform is already verified. Version 1 remains visible because it documents the earlier decision under earlier information.\n\n## Reflection\nI initially wanted to replace the entire plan, but the disruption did not invalidate the evidence already gathered. Keeping valid work made the new dependency clearer. My main improvement was assigning both an owner for the check and a recipient for the result.\n\nNamed output: revised-plan. This is a separate demonstration, not the assigned relay revision."
    }
  },
  {
    "id": "lab-12",
    "kind": "lab",
    "week": 12,
    "title": "Recover the rainfall recorder",
    "subtitle": "A complete alternate worked example, followed by meaningful takeover practice.",
    "skill": "Small integrated recovery",
    "setting": "At Lark Weather Mast, a team must preserve a rainfall recorder before a maintenance closure.",
    "difference": "This compact weather-mast operation differs from both Meridian and the longer Halcyon final demonstration.",
    "transfer": "Combine observation, diagnosis, reference checking and an explicit recovery agreement.",
    "sourceHref": "/sessions/week-12/",
    "sourceLabel": "Week 12 lab",
    "estimatedMinutes": 8,
    "steps": [
      {
        "id": "objective",
        "title": "Choose a testable objective",
        "narration": "The charter asks for verified rainfall data while keeping the original recorder stable. The demonstrator separates that objective from automatically moving the whole instrument.",
        "why": "The chosen prize is not always the actual goal.",
        "prompt": "Select the objective that matches the charter.",
        "controls": [
          {
            "id": "objective",
            "label": "Mission objective",
            "type": "select",
            "options": [
              {
                "value": "Move anything that looks important",
                "label": "Move anything that looks important"
              },
              {
                "value": "Recover verified data and preserve the original",
                "label": "Recover verified data and preserve the original"
              },
              {
                "value": "Finish without recording evidence",
                "label": "Finish without recording evidence"
              }
            ],
            "expected": "Recover verified data and preserve the original"
          }
        ],
        "before": {
          "room": "operations",
          "shot": "establishing",
          "values": {
            "revision": "Lark charter"
          },
          "labels": [
            "Research access required",
            "Original must remain stable"
          ],
          "focus": "contract"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "verified": true
          },
          "labels": [
            "Objective and constraint recorded"
          ],
          "focus": "contract"
        },
        "success": "The objective can be checked against a final result.",
        "pitfall": "Physical removal could violate a constraint while appearing dramatic.",
        "hint": "Read both the desired result and the preservation condition.",
        "duration": 18
      },
      {
        "id": "observe",
        "title": "Inspect the signal",
        "narration": "The model displays 16:25 and an amber service lamp. The operator reports that the recorder is complete, but the manifest still needs checking.",
        "why": "A useful reconnaissance record separates display observations from someone's account.",
        "prompt": "Classify the completeness assertion.",
        "controls": [
          {
            "id": "classification",
            "label": "Completeness statement",
            "type": "select",
            "options": [
              {
                "value": "observation",
                "label": "observation"
              },
              {
                "value": "claim",
                "label": "claim"
              },
              {
                "value": "inference",
                "label": "inference"
              }
            ],
            "expected": "claim"
          }
        ],
        "before": {
          "room": "perception",
          "shot": "close",
          "values": {
            "clock": "16:25",
            "hatch": "open"
          },
          "labels": [
            "Amber lamp",
            "Operator: record is complete"
          ],
          "focus": "clock",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "16:25"
            },
            {
              "id": "mug",
              "label": "Green mug",
              "shape": "mug",
              "color": "#b7aa85",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "The recorder is complete"
            },
            {
              "id": "hatch",
              "label": "Service hatch",
              "shape": "hatch",
              "color": "#758a87",
              "open": true
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "clock": "16:25",
            "hatch": "open",
            "verified": true
          },
          "labels": [
            "Observation and claim separated"
          ],
          "focus": "clock",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "16:25"
            },
            {
              "id": "mug",
              "label": "Green mug",
              "shape": "mug",
              "color": "#b7aa85",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "The recorder is complete"
            },
            {
              "id": "hatch",
              "label": "Service hatch",
              "shape": "hatch",
              "color": "#758a87",
              "open": true
            }
          ]
        },
        "success": "The account is preserved for verification instead of becoming an assumed fact.",
        "pitfall": "A confident operator cannot replace the manifest comparison.",
        "hint": "The claim concerns contents you have not yet inspected.",
        "duration": 18
      },
      {
        "id": "restore",
        "title": "Verify support equipment",
        "narration": "The support lift uses a 16-tooth driver and 32-tooth follower. Four input turns should produce two opposite output turns. The readiness checks are already satisfied and recorded.",
        "why": "A familiar relation can be applied to unfamiliar numbers.",
        "prompt": "Apply the required input turns.",
        "controls": [
          {
            "id": "turns",
            "label": "Input turns",
            "type": "number",
            "initial": 0,
            "expected": 4,
            "min": 0,
            "max": 8,
            "tolerance": 0,
            "unit": "turns"
          }
        ],
        "before": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 16,
            "gearFollower": 32,
            "turns": 0,
            "interlock": false,
            "cam": 90,
            "spring": true
          },
          "labels": [
            "Target: 2 output turns"
          ],
          "focus": "driver"
        },
        "after": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 16,
            "gearFollower": 32,
            "turns": 4,
            "interlock": false,
            "cam": 90,
            "spring": true,
            "verified": true
          },
          "labels": [
            "Two output turns verified"
          ],
          "focus": "follower"
        },
        "success": "The support mechanism's result matches its prediction.",
        "pitfall": "Seeing movement without comparing the required amount would be incomplete.",
        "hint": "The ratio is one output turn for every two input turns.",
        "duration": 18
      },
      {
        "id": "verify",
        "title": "Select the requested data",
        "narration": "The signed manifest requests 12 records with digest W-6. Copy Ash has 12/W-6; Birch has 11/W-3. The team selects Ash and states that matching the reference does not prove every measurement scientifically correct.",
        "why": "Digital identity and semantic truth remain distinct even in an urgent mission.",
        "prompt": "Choose the matching copy.",
        "controls": [
          {
            "id": "selected",
            "label": "Data copy",
            "type": "select",
            "options": [
              {
                "value": "Ash",
                "label": "Ash"
              },
              {
                "value": "Birch",
                "label": "Birch"
              }
            ],
            "expected": "Ash"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {},
          "labels": [
            "Manifest 12 / W-6",
            "Ash 12 / W-6",
            "Birch 11 / W-3"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "Ash",
              "label": "Ash record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "12 records / W-6"
            },
            {
              "id": "Birch",
              "label": "Birch record",
              "shape": "book",
              "color": "#c89179",
              "text": "11 records / W-3"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "selected": "Ash",
            "verified": true
          },
          "labels": [
            "Required copy verified"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "Ash",
              "label": "Ash record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "12 records / W-6"
            },
            {
              "id": "Birch",
              "label": "Birch record",
              "shape": "book",
              "color": "#c89179",
              "text": "11 records / W-3"
            }
          ]
        },
        "success": "The selection meets both published conditions.",
        "pitfall": "A file's existence is not evidence of completeness.",
        "hint": "Compare the count and digest together.",
        "duration": 18
      },
      {
        "id": "handoff",
        "title": "Agree the limited recovery",
        "narration": "The custodian accepts verified data transfer while keeping the recorder stable at the mast. The operator reads back 'Ash copy, twelve records, W-6' and receives confirmation.",
        "why": "The agreement connects the technical result to custody and responsibility.",
        "prompt": "Confirm the matching read-back.",
        "controls": [
          {
            "id": "acknowledged",
            "label": "Copy and custody agreement confirmed",
            "type": "toggle",
            "initial": false,
            "expected": true
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "role": "custodian"
          },
          "labels": [
            "Original remains at Lark",
            "Transfer verified Ash copy"
          ],
          "focus": "speaker"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "verified": true
          },
          "labels": [
            "Receipt and original location recorded"
          ],
          "focus": "speaker"
        },
        "success": "The recovery satisfies the data objective without pretending the instrument moved.",
        "pitfall": "Calling the ending physical recovery would misstate what was achieved.",
        "hint": "Name the actual result and who retains the original.",
        "duration": 18
      },
      {
        "id": "debrief",
        "title": "Compare outcome with intent",
        "narration": "The final record includes the verified copy, original location, apparatus test and an unresolved calibration question. The team chooses a targeted calibration review as its next action.",
        "why": "An ending should explain both met requirements and remaining uncertainty.",
        "prompt": "Choose the honest debrief.",
        "controls": [
          {
            "id": "debrief",
            "label": "After-action conclusion",
            "type": "select",
            "options": [
              {
                "value": "All rainfall science is now proven",
                "label": "All rainfall science is now proven"
              },
              {
                "value": "Data identity verified; calibration remains a separate question",
                "label": "Data identity verified; calibration remains a separate question"
              },
              {
                "value": "The original was physically recovered",
                "label": "The original was physically recovered"
              }
            ],
            "expected": "Data identity verified; calibration remains a separate question"
          }
        ],
        "before": {
          "room": "operations",
          "shot": "close",
          "values": {
            "verified": true
          },
          "labels": [
            "Recovery result ready for interpretation"
          ]
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "revision": "After-action record complete"
          },
          "labels": [
            "Objective met within stated scope"
          ]
        },
        "success": "The debrief explains the achieved recovery without overstating it.",
        "pitfall": "An outcome badge cannot certify the scientific accuracy of every record.",
        "hint": "Keep the conclusion tied to the checks actually performed.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "Recover the rainfall recorder — completed record",
      "filename": "worked-lab-12.md",
      "markdown": "# Completed demonstration example — Lark Weather Mast recovery\n\n## Mission contract\nRecover verified rainfall data while keeping the original recorder stable. Abort movement if the support apparatus cannot meet its required output. The original remains with the mast custodian.\n\n## Evidence and actions\nThe display read 16:25 and the service lamp was amber. The operator's completeness statement remained a claim until the manifest check.\n\nA 16-tooth driver and 32-tooth follower produced two opposite output turns from four input turns after recorded readiness checks. Copy Ash contained 12 records and matched W-6; Birch contained 11/W-3 and did not meet the request.\n\nThe operator read back “Ash copy, twelve records, W-6.” The custodian confirmed transfer and retained the original at Lark.\n\n## Resolution\nVerified digital data recovered; original stabilised in place; receipt and custody recorded.\n\n## Alternative and limit\nPhysical removal was unnecessary for the research-access objective and would introduce handling work. Matching W-6 establishes identity against the reference, not calibration accuracy. A calibration review remains the next question.\n\n## Reflection\nThe operation worked because several modest checks connected: observation informed investigation, mechanical verification supported handling, and a clear agreement defined what recovery meant. I would not describe this as physical recovery or as proof that every rainfall measurement is correct.\n\nNamed output: recovery-record. Separate from the Meridian assessment and the Halcyon final demonstration."
    }
  },
  {
    "id": "assessment-fieldwork",
    "kind": "assessment",
    "title": "Build a fieldwork portfolio",
    "subtitle": "Turn practice into traceable evidence across all twelve capabilities.",
    "skill": "Evidence selection and reflection",
    "setting": "The academy's record desk, using the alternate worked labs.",
    "difference": "The completed portfolio contains twelve alternate scenarios and clearly labels all observations as authored demonstration records.",
    "transfer": "Use the same structure for your own attempts; select evidence because it demonstrates the skill, not because the ending looks successful.",
    "sourceHref": "/assessments/fieldwork/",
    "sourceLabel": "Weekly Fieldwork brief",
    "estimatedMinutes": 10,
    "steps": [
      {
        "id": "identify",
        "title": "Name the output",
        "narration": "The record desk receives the conservatory mechanism attempt. The demonstrator labels it mechanism-diagnosis, with scenario, route and assistance, before adding an explanation.",
        "why": "A result needs enough context for another reader to interpret it.",
        "prompt": "Select the correct named output.",
        "controls": [
          {
            "id": "output",
            "label": "Output label",
            "type": "select",
            "options": [
              {
                "value": "mechanism-diagnosis",
                "label": "mechanism-diagnosis"
              },
              {
                "value": "unexplained success",
                "label": "unexplained success"
              },
              {
                "value": "anonymous screenshot",
                "label": "anonymous screenshot"
              }
            ],
            "expected": "mechanism-diagnosis"
          }
        ],
        "before": {
          "room": "operations",
          "shot": "establishing",
          "values": {},
          "labels": [
            "Conservatory lift record"
          ],
          "focus": "record"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "selected": "mechanism-diagnosis"
          },
          "labels": [
            "Scenario and provenance attached"
          ],
          "focus": "record"
        },
        "success": "The evidence has a useful identity.",
        "pitfall": "A screenshot without conditions cannot establish which rule was tested.",
        "hint": "Name what the record demonstrates.",
        "duration": 18
      },
      {
        "id": "trace",
        "title": "Keep the cause and result",
        "narration": "The example records an 18-tooth driver, 30-tooth follower, five input turns and three opposite output turns. The interlock and spring correction are included.",
        "why": "The trace explains how the result followed from the model.",
        "prompt": "Record the demonstrated output turns.",
        "controls": [
          {
            "id": "count",
            "label": "Output turns in the example",
            "type": "number",
            "initial": 0,
            "expected": 3,
            "min": 0,
            "max": 10,
            "tolerance": 0
          }
        ],
        "before": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 18,
            "gearFollower": 30,
            "turns": 5,
            "interlock": false,
            "cam": 270,
            "spring": true
          },
          "labels": [
            "Result needs its conditions"
          ],
          "focus": "follower"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "verified": true
          },
          "labels": [
            "Prediction and observed model result linked"
          ],
          "focus": "record"
        },
        "success": "The record supports the causal account rather than a bare completion label.",
        "pitfall": "Movement alone would not establish the specified output.",
        "hint": "Use 18 ÷ 30 × 5.",
        "duration": 18
      },
      {
        "id": "transfer",
        "title": "Include the changed situation",
        "narration": "The transfer uses 36 follower teeth and four input turns for two output turns. The demonstrator explains why the ratio changed while readiness conditions were retained.",
        "why": "A portfolio should show application beyond the first familiar configuration.",
        "prompt": "Choose the transfer evidence.",
        "controls": [
          {
            "id": "evidence",
            "label": "Changed-situation record",
            "type": "select",
            "options": [
              {
                "value": "The same screenshot twice",
                "label": "The same screenshot twice"
              },
              {
                "value": "36 teeth / four input / two output",
                "label": "36 teeth / four input / two output"
              },
              {
                "value": "An unrelated attractive image",
                "label": "An unrelated attractive image"
              }
            ],
            "expected": "36 teeth / four input / two output"
          }
        ],
        "before": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 18,
            "gearFollower": 36,
            "turns": 4,
            "interlock": false,
            "cam": 270,
            "spring": true
          },
          "labels": [
            "Transfer requirement changed"
          ],
          "focus": "follower"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "revision": "Transfer retained"
          },
          "labels": [
            "New context plus explanation"
          ],
          "focus": "record"
        },
        "success": "The changed attempt demonstrates the principle being reapplied.",
        "pitfall": "Repeating the practice answer does not establish transfer.",
        "hint": "Look for a changed condition and its justified response.",
        "duration": 18
      },
      {
        "id": "reflect",
        "title": "Explain a specific error",
        "narration": "The reflection identifies confusing ratio with readiness and explains the observation that corrected it. It does not claim a generic lesson such as 'teamwork is important'.",
        "why": "Specific reflection can guide the next attempt and be checked against evidence.",
        "prompt": "Choose the useful reflection.",
        "controls": [
          {
            "id": "reflection",
            "label": "Reflection",
            "type": "select",
            "options": [
              {
                "value": "Everything was easy",
                "label": "Everything was easy"
              },
              {
                "value": "I changed gears, but the blocked cam required an interlock check",
                "label": "I changed gears, but the blocked cam required an interlock check"
              },
              {
                "value": "I deserve full marks",
                "label": "I deserve full marks"
              }
            ],
            "expected": "I changed gears, but the blocked cam required an interlock check"
          }
        ],
        "before": {
          "room": "operations",
          "shot": "close",
          "values": {
            "revision": "Reflection draft"
          },
          "labels": [
            "Which mistake changed the next action?"
          ],
          "focus": "record"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "verified": true
          },
          "labels": [
            "Error, evidence and improvement connected"
          ],
          "focus": "record"
        },
        "success": "The reflection supplies a concrete next practice target.",
        "pitfall": "A positive slogan can avoid analysing the actual attempt.",
        "hint": "Name the mistaken model and the observation that corrected it.",
        "duration": 18
      },
      {
        "id": "count",
        "title": "Apply the portfolio rule",
        "narration": "The example portfolio includes all twelve alternate records. The course counts the best ten using teacher-applied criteria; the software does not infer marks from completion.",
        "why": "Submission quantity and counted contribution are different facts.",
        "prompt": "How many records count toward the mark?",
        "controls": [
          {
            "id": "count",
            "label": "Counted records",
            "type": "number",
            "initial": 0,
            "expected": 10,
            "min": 0,
            "max": 12,
            "tolerance": 0
          }
        ],
        "before": {
          "room": "operations",
          "shot": "close",
          "values": {
            "count": 12
          },
          "labels": [
            "Twelve records supplied"
          ],
          "focus": "portfolio"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "count": 10
          },
          "labels": [
            "Best ten count; teacher evaluates"
          ],
          "focus": "portfolio"
        },
        "success": "The portfolio structure matches the published assessment rule.",
        "pitfall": "Counting all twelve at one point each would overstate the assessment weight.",
        "hint": "Two records may be excluded under the best-ten rule.",
        "duration": 18
      },
      {
        "id": "attribute",
        "title": "Export with honest provenance",
        "narration": "The finished example includes a register, all twelve records, transfer responses and reflections. It is labelled authored teaching material and exported as an example, not as personal work.",
        "why": "The usefulness of a complete example depends on clear authorship and scope.",
        "prompt": "Confirm the example label.",
        "controls": [
          {
            "id": "labelled",
            "label": "Label this as an authored demonstration",
            "type": "toggle",
            "initial": false,
            "expected": true
          }
        ],
        "before": {
          "room": "operations",
          "shot": "close",
          "values": {
            "count": 10,
            "verified": false
          },
          "labels": [
            "Complete alternate portfolio ready"
          ],
          "focus": "portfolio"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "count": 10,
            "verified": true
          },
          "labels": [
            "Example provenance and export recorded"
          ],
          "focus": "portfolio"
        },
        "success": "The downloadable portfolio can be studied without being mistaken for assessed personal evidence.",
        "pitfall": "Removing the example label would misrepresent who did the work.",
        "hint": "Keep assistance and demonstration provenance visible.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "Complete twelve-record demonstration portfolio",
      "filename": "worked-fieldwork-portfolio.md",
      "markdown": "# Completed demonstration portfolio — Weekly Fieldwork\n\n**Authored teaching example.** These are twelve alternate worked records, not a real student's submission and not answers to the assigned configurations. The traces describe the authored demonstration path. No physical test or academic grade is claimed.\n\n## Portfolio register\n- Week 1: Completed observation record — conservatory; record and transfer included below.\n- Week 2: Completed recall strategy — storm kit; record and transfer included below.\n- Week 3: Completed spatial model — dome connector; record and transfer included below.\n- Week 4: Completed mechanism diagnosis — conservatory lift; record and transfer included below.\n- Week 5: Completed circuit diagnosis — nine-volt beacon; record and transfer included below.\n- Week 6: Completed evidence timeline — weather ledgers; record and transfer included below.\n- Week 7: The observatory access charter — completed record; record and transfer included below.\n- Week 8: Five cases to the dome — completed record; record and transfer included below.\n- Week 9: The conservatory council — completed record; record and transfer included below.\n- Week 10: Predict the instrumented gallery — completed record; record and transfer included below.\n- Week 11: When the bridge closes — completed record; record and transfer included below.\n- Week 12: Recover the rainfall recorder — completed record; record and transfer included below.\n\nTwelve records are supplied. Under the published rule, the best ten are counted by a teacher using skill 40%, transfer 40%, reflection 20%. The player does not invent grades or choose the best records by game completion.\n\n## Completed demonstration example — conservatory observation record\n\nThis alternate example shows a method. It is not an answer to the assigned lab.\n\n## Initial inspection\nAt the first inspection the clock displayed 11:35, a green mug stood beside the planting ledger and the service hatch was closed. These are supplied scene observations. A visible note asserted, “I checked every tray.” The note's presence is observable; its contents remain a claim.\n\n## Reconstruction and correction\nI initially recalled the hatch as open. Rechecking the scene showed that I had inserted a familiar detail. I preserved the incorrect recollection and correction rather than rewriting the attempt. I classified “the gardener left in a hurry” as an inference because several explanations fit an empty mug.\n\n## Changed situation\nAt the second inspection the clock read 11:50 and the hatch was open. The green mug remained unchanged. Two recorded features changed. No record established who opened the hatch or why.\n\n## Next investigation\nInspect the tray check records against the claimed complete inspection. Matching records would support the account within their scope; missing entries would require clarification.\n\n## Reflection\nMy main error was adding a plausible detail, not failing to look at an object. A regional inspection helped coverage, but preserving a separate interpretation column helped more with this mistake. In my own scene I would make the same distinction before building a story. I would not claim that two changed features prove a particular person's intent.\n\nRoute: authored 3D/interactive demonstration. Assistance: narrated example and one recorded correction.\n\n### Further reflection\n\nThe independent tray record is important because it could actually contradict the note. Asking the writer to repeat the same account would not add comparable independence. I would therefore preserve both the account and the proposed test instead of reducing the record to a confidence label.\n\n---\n\n## Completed demonstration example — storm-kit recall strategy\n\nThis alternate worked example uses Gate, Pool, Press and Dome. It does not supply the assigned lab's item answers.\n\n## Baseline\nI recalled Lens and Beacon: two correct items out of four. I kept that result before inspecting the full list.\n\n## Encoding route\n1. Gate: a giant Lens frames the entrance.\n2. Pool: a Tether splashes in the water.\n3. Press: a Pocket atlas unfolds into maps under the rollers.\n4. Dome: a Beacon lights the roof.\n\n## Retrieval and error\nWith the list covered, I retrieved Lens, Tether, Pocket atlas and Beacon in order. A later attempt produced “book” at the Press. I recorded the substitution and strengthened the map-specific cue rather than silently counting it as exact recall.\n\n## Comparison\nThe guided attempt improved from two correct items to four. That is a result of this small demonstration, not proof of permanent improvement or photographic memory. Rehearsal and item familiarity may also have helped.\n\n## Reflection\nThe fixed locations helped order, while the distinctive images helped item identity. The delayed substitution showed that a generic association preserved a category but not the required object. In another task I would preserve the route, change the items, and inspect whether the same weakness returned. For a critical instruction set that can be carried openly, a checklist may remain the better tool.\n\nRoute: guided example with list covering. Hints: association prompts. Named output: recall-strategy.\n\n### Further reflection\n\nA second unfamiliar list would be a better transfer check than endlessly repeating these four items. I would also record the delay before recall, because immediate retrieval and remembering after an interruption are different demands. The example should not hide the effect of repeated practice.\n\n---\n\n## Completed demonstration example — dome connector\n\nThe assigned connector uses different starting and target conditions.\n\n## Reference frame and prediction\nWorld north and up remain fixed when the camera moves. The alternate connector initially has north/west ports at level 0. A clockwise 90-degree turn maps the original north port to east and the original west port to north.\n\n## Transformation record\n- Initial: 0 degrees, level 0, north/west.\n- After rotation: 90 degrees, level 0, east/north.\n- After translation: 90 degrees, level 2, east/north.\n- Verification: both labelled ports and the required level match.\n\nA mirrored substitute was rejected because outline similarity did not preserve the original label mapping.\n\n## Changed destination\nThe target moved to level 1 without changing port requirements. I lowered the connector and retained its 90-degree orientation.\n\n## Reflection\nI initially treated reaching the right orientation as completion, but the target included a separate height condition. Writing two checks prevented that omission. Tracking the original north tip also made the rotation explainable when the camera changed. In a new configuration I would predict the label mapping before movement and then test position independently.\n\nNamed output: spatial-model. Evidence route: alternate worked simulation.\n\n### Further reflection\n\nI would ask for another labelled view if the mapping remained ambiguous rather than rotating until the outline looked familiar. An ordered text account of the transformation makes the same reasoning available without relying on visual mental rotation or precise manipulation.\n\n---\n\n## Completed demonstration example — conservatory lift\n\nThis alternate mechanism uses an 18-tooth driver, different turn requirements and a 270-degree cam.\n\n## Causal model\nInput rotation → external gear pair → cam → spring-return follower → lift output. The interlock blocks cam adjustment until released. Motion also requires the spring and specified cam phase.\n\n## Prediction and diagnosis\nFor three output turns from five input turns: follower = 18 × 5 ÷ 3 = 30 teeth. The driven gear turns opposite the driver. A correct ratio did not initially produce a ready mechanism because the interlock was engaged and the return spring absent.\n\nI released the interlock, set the cam to 270 degrees and attached the spring. I retained the ratio calculation because it was not contradicted by the readiness fault.\n\n## Verification\nFive input turns produced three opposite output turns. Both the amount and direction matched the prediction.\n\n## Transfer\nThe changed task required two output turns from four input turns. I selected 36 follower teeth: 18 ÷ 36 × 4 = 2. The cam and spring conditions remained valid.\n\n## Reflection\nThe useful distinction was between an incorrect transmission ratio and a blocked dependency. Changing gears would not have released the cam. In a new apparatus I would record the output requirement, list readiness conditions and test both separately.\n\nNamed output: mechanism-diagnosis. This is a model, not a real lock or physical qualification.\n\n### Further reflection\n\nThe readiness conditions belong in the model rather than a footnote. I would test a blocked configuration as a counterexample so that another student could see why the correct gear ratio alone is insufficient. That negative example explains the distinction better than a successful run by itself.\n\n---\n\n## Completed demonstration example — nine-volt beacon\n\nThis alternate apparatus uses 9 V. It is a fictional bench model, not an instruction to work on mains equipment.\n\n## First fault\nPowered readings relative to common return: source 9 V; fuse output 9 V; cable output 0 V; beacon supply 0 V. The first missing supply followed the cable segment, supporting an open cable rather than an open fuse.\n\nI isolated power, replaced the cable, restored power and verified 9 V at the beacon together with visible light.\n\n## Changed fault\nThe second beacon remained dark with 9 V at every supply node. Those readings did not support a missing supply. I isolated power and checked continuity through the lamp; the model reported an open load. I replaced the lamp while isolated, restored power and verified light plus 9 V supply.\n\n## Reflection\nMy original first-zero strategy worked for a supply break but could not diagnose the second fault. Repeating a healthy source measurement added no information. The important change was to distinguish supply from load continuity. The record preserves the powered observations and the later isolated action so another reader can see why each test was appropriate.\n\n## Limits\nThese are authored model readings. They are not measurements from constructed hardware, and their idealisation does not establish the behaviour of an arbitrary physical circuit.\n\nNamed output: circuit-diagnosis. Assistance: complete narrated worked example.\n\n### Further reflection\n\nI would record both probe locations in a physical measurement and distinguish measured tolerances from these idealised values. The lamp example reminds me that an apparently healthy input does not establish a working output. The repair check should return to the original symptom.\n\n---\n\n## Completed demonstration example — weather-ledger investigation\n\nAlternate fixtures: 18 sections, Q-7/Q-9 references and North/East/South ledgers.\n\n| Time | Record | Direct result | Interpretation |\n| --- | --- | --- | --- |\n| 07:15 | South | 17 sections, Q-2 | Incomplete against the original request |\n| 07:20 | North | 18 sections, Q-7 | Matches original signed request |\n| 07:45 | East | 18 sections, Q-9 | Annotated variant; newest is not automatically required |\n| Amendment | Signed request | 18 sections, Q-9 required | Current target changes to East |\n\n## Preserved recommendations\nOriginal: select North because it meets both the count and Q-7 requirement.\nAmended: select East because the later signed authority explicitly requires Q-9.\n\n## Limits and next check\nDigest agreement establishes identity against the supplied reference, not the truth of every weather observation. The annotation's purpose requires its own supporting record. I would inspect that record before making claims about motive.\n\n## Reflection\nSeparating the timeline from the comparison stopped recency from deciding the answer. The amendment changed the appropriate recommendation without invalidating the recorded fact that North matched the earlier request. My revised record preserves both authorities so the reader can explain the change without guessing.\n\nNamed output: evidence-timeline. Demonstration material, not an assigned response.\n\n### Further reflection\n\nA changed requirement needs its own date and authority. Otherwise a reader may think the investigation simply contradicted itself. Keeping the historical selection next to the amendment makes revision inspectable and avoids presenting hindsight as knowledge available in the first decision.\n\n---\n\n## Completed demonstration example — observatory permission audit\n\nThis alternate local system uses reader, maintainer and custodian roles.\n\n## Published charter\nAll roles read. Only maintainer services. Only custodian approves release.\n\n## Initial failure\nRequest: reader / approve. Expected: deny. Observed: allow. The original condition treated any signed-in identity as approval authority.\n\n## Repaired matrix\n| Role | Read | Service | Approve |\n| --- | --- | --- | --- |\n| Reader | Allow | Deny | Deny |\n| Maintainer | Allow | Allow | Deny |\n| Custodian | Allow | Deny | Allow |\n\nNegative checks rejected reader and maintainer approval. Positive checks retained reader access, maintainer service and custodian approval.\n\n## Preserved revision\nVersion 1 is the repaired charter matrix above. Version 2 applies a later calibration hold: custodian approval becomes deny; all other cells remain unchanged. The historical V1 result was correct under the original authority.\n\n## Reflection\nThe useful distinction was between an excessive permission and a later policy change. Denying all operations would conceal the first problem by making the system useless. I checked positive cases as deliberately as negative ones and kept the authority beside each expected result.\n\nNamed output: permission-audit. These are fictional local operations, not an external security test.\n\n### Further reflection\n\nThe strongest audit includes an operation that should succeed after each change. Otherwise a blanket denial could look like a perfect security fix. In another role model I would construct the expected matrix from its mandate rather than copy these role names.\n\n---\n\n## Completed demonstration example — dome handoff\n\n## Role information\nAnalyst card: five sealed cases to Dome, verification VIOLET.\nOperator: controls dispatch and must request exact destination, count and code.\n\n## Recorded exchange\nAnalyst: “Deliver five sealed cases to Dome; verification code VIOLET. Read back before dispatch.”\nOperator first read-back: “Dome, four, VIOLET.”\nAnalyst: “Correct the count to five.”\nOperator corrected read-back: “Dome, five, VIOLET.”\nAnalyst: “Confirmed.”\n\nThe count mismatch was found before movement. A bare acknowledgement would not have exposed it.\n\n## Changed situation\nNew card: Pool / 2 / SILVER. The team repeated the same protocol with new values. The operator's matching read-back was confirmed separately from the earlier handoff.\n\n## Agreement\nThe analyst owns instruction accuracy; the operator records and repeats the three fields; either role may stop if a field conflicts. A completed acknowledgement applies to one identified instruction, not every later delivery.\n\n## Reflection\nThe protocol was useful because it made the receiver's interpretation visible. My error was a wrong count, not unwillingness to cooperate. In another task I would preserve exact labels and ask which condition permits action, especially when the roles see different screens.\n\nNamed output: handoff-agreement. This is an alternate demonstration, not the assigned Relay/Archive/Dispatch answer.\n\n### Further reflection\n\nThe code is meaningful only because both roles know which current instruction it belongs to. I would record the instruction version as well as the acknowledgement when several deliveries are in progress. That prevents a correct read-back from being attached to the wrong task.\n\n---\n\n## Completed demonstration example — conservatory council agreement\n\n## Responsibilities\nMediator: negotiate research access without erasing custody.\nCaretaker Ada: retain the original unless a documented, supported handover is authorised.\nArchivist Rin: identify the required research content.\nEngineer Bo: verify equipment capacity before movement.\n\n## Claim checks\nRin's “identical copies” claim conflicts with digests R-4 and R-8. That contradiction concerns content identity; it does not establish intent.\nBo's unsupported transport proposal conflicts with original mass 7 and cart capacity 5. A cradle offers capacity 9, subject to verification.\n\n## Original agreement\nRecover a verified research copy, record custody and leave the physical original with Ada. This meets the original research-access mandate.\n\n## Revised agreement\nA new provenance mandate requires retaining the original pending supported handover. Stabilise it, verify the cradle, identify the custodian and document unresolved checks. The earlier copy agreement remains in the history but no longer completes the revised objective.\n\n## Reflection\nRepresenting the mediator meant finding a supported agreement, not winning every disagreement. Numerical constraints and written authority were more useful than interpreting confidence. The revised objective changed the right agreement without requiring a new story about anyone's character.\n\nNamed output: claim-verification.\n\n### Further reflection\n\nThe new provenance requirement was a substantive change, not evidence that the earlier negotiators were foolish. My record should therefore show which goal each agreement served. It should also identify who will verify the cradle before any supported movement is authorised.\n\n---\n\n## Completed demonstration example — instrumented gallery routes\n\nThis alternate five-by-five model uses zero-based cells, start 20 and destination 3.\n\n## Original sensor set\n15, 16, 11.\n\nRoute A: 20 → 15 → 10 → 5 → 0 → 1 → 2 → 3. Prediction: one contact. Trace: one contact at 15.\nRoute B: 20 → 21 → 22 → 23 → 18 → 13 → 8 → 3. Prediction: zero. Trace: zero. Both routes use seven moves.\n\n## Changed sensor set\n21, 22, 23.\nRoute B now records three contacts; Route A records zero. The earlier records remain labelled with the original pattern.\n\n## Decision\nIf the objective is minimal recorded contact, Route B fits the original pattern and Route A fits the changed one. If the task is to verify detector observations, a route through the sensor cells may be more useful. Contact is a game event, not automatic failure.\n\n## Reflection\nThe most useful artefact was the ordered route plus the sensor set, because it made each count reproducible. I avoided treating a once-correct zero as a permanent property of the path. In my own task I would predict before execution and inspect the first disagreement rather than changing the route until an attractive ending appears.\n\nNamed output: sensor-route.\n\n### Further reflection\n\nExplicit cell identifiers helped separate the model from camera position and intuition. I would keep the event trace when a prediction fails, because its first mismatch tells me more than the final contact count alone. Different objectives can justify different routes under the same rules.\n\n---\n\n## Completed demonstration example — bridge revision memo\n\n## Preserved Version 1\nInspect ledger → verify trolley → cross east bridge → record custody.\n\n## Published disruption\nThe east bridge is closed. The west platform is available only after a load-capacity check.\n\n## Diagnosis\nThe failed dependency is route availability. The signed ledger comparison and completed trolley inspection remain applicable. The need to record custody also remains.\n\n## Version 2\nInspect ledger → verify trolley → check west-platform capacity → cross west platform → record custody.\n\nSystems specialist owns the added capacity check. The coordinator receives its result and stops movement if it fails. The revised route and stop condition are read back to all roles before execution.\n\n## Rationale and limits\nThe revision changes only the affected route and adds its prerequisite. It does not claim that an available platform is already verified. Version 1 remains visible because it documents the earlier decision under earlier information.\n\n## Reflection\nI initially wanted to replace the entire plan, but the disruption did not invalidate the evidence already gathered. Keeping valid work made the new dependency clearer. My main improvement was assigning both an owner for the check and a recipient for the result.\n\nNamed output: revised-plan. This is a separate demonstration, not the assigned relay revision.\n\n### Further reflection\n\nThe load check must produce a result that someone receives. Naming its owner alone is not enough if the coordinator never learns whether it passed. I would add a read-back to the revised plan so a valid document becomes a shared agreement.\n\n---\n\n## Completed demonstration example — Lark Weather Mast recovery\n\n## Mission contract\nRecover verified rainfall data while keeping the original recorder stable. Abort movement if the support apparatus cannot meet its required output. The original remains with the mast custodian.\n\n## Evidence and actions\nThe display read 16:25 and the service lamp was amber. The operator's completeness statement remained a claim until the manifest check.\n\nA 16-tooth driver and 32-tooth follower produced two opposite output turns from four input turns after recorded readiness checks. Copy Ash contained 12 records and matched W-6; Birch contained 11/W-3 and did not meet the request.\n\nThe operator read back “Ash copy, twelve records, W-6.” The custodian confirmed transfer and retained the original at Lark.\n\n## Resolution\nVerified digital data recovered; original stabilised in place; receipt and custody recorded.\n\n## Alternative and limit\nPhysical removal was unnecessary for the research-access objective and would introduce handling work. Matching W-6 establishes identity against the reference, not calibration accuracy. A calibration review remains the next question.\n\n## Reflection\nThe operation worked because several modest checks connected: observation informed investigation, mechanical verification supported handling, and a clear agreement defined what recovery meant. I would not describe this as physical recovery or as proof that every rainfall measurement is correct.\n\nNamed output: recovery-record. Separate from the Meridian assessment and the Halcyon final demonstration.\n\n### Further reflection\n\nAn honest debrief should include a next question that the completed mission did not answer. The calibration limit is consequential because matching a data reference does not verify the instrument that produced it. Preserving that distinction is part of a useful recovery record.\n\n## Attribution and completeness\nAll twelve records are labelled alternate demonstration material. Each retains its setting, supplied result, changed-situation response and reflection. A submitted personal portfolio would replace these with the student's own attempts and declared assistance. Exporting this example does not submit it."
    }
  },
  {
    "id": "assessment-a1",
    "kind": "assessment",
    "title": "A1 example: Botanical Transfer Workshop",
    "subtitle": "A complete individual demonstration, including a finished evidence record and explanation.",
    "skill": "Observation, memory, spatial reasoning and mechanism diagnosis",
    "setting": "An alternate botanical workshop preparing a model carriage.",
    "difference": "13:15 scene, new mnemonic list, level-2 connector and 20-tooth carriage driver differ from the assigned trial.",
    "transfer": "Recognise the four kinds of capability, predict under the actual values and write your own causal account.",
    "sourceHref": "/assessments/assignment-1/",
    "sourceLabel": "A1 — The Sealed Workshop",
    "estimatedMinutes": 14,
    "steps": [
      {
        "id": "inspect",
        "title": "Inspect the actual workshop",
        "narration": "The scene shows 13:15, a white jar by the handling ledger and an open window. The demonstrator records those details before deciding what happened.",
        "why": "The integrated trial still begins with checkable observations.",
        "prompt": "Record the visible display.",
        "controls": [
          {
            "id": "clock",
            "label": "Display reading",
            "type": "text",
            "initial": "",
            "expected": "13:15"
          }
        ],
        "before": {
          "room": "perception",
          "shot": "establishing",
          "values": {
            "clock": "13:15",
            "hatch": "open"
          },
          "labels": [
            "White jar",
            "Open window"
          ],
          "focus": "clock",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "13:15"
            },
            {
              "id": "mug",
              "label": "White jar",
              "shape": "mug",
              "color": "#f4f0e8",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "Tray Delta is sealed"
            },
            {
              "id": "hatch",
              "label": "Inspection window",
              "shape": "hatch",
              "color": "#758a87",
              "open": true
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "clock": "13:15",
            "hatch": "open",
            "verified": true
          },
          "labels": [
            "Inspection record preserved"
          ],
          "focus": "clock",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "13:15"
            },
            {
              "id": "mug",
              "label": "White jar",
              "shape": "mug",
              "color": "#f4f0e8",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "Tray Delta is sealed"
            },
            {
              "id": "hatch",
              "label": "Inspection window",
              "shape": "hatch",
              "color": "#758a87",
              "open": true
            }
          ]
        },
        "success": "The exact scene state is recorded.",
        "pitfall": "An urgent-looking environment does not establish its cause.",
        "hint": "Use the displayed digits.",
        "duration": 18
      },
      {
        "id": "classify",
        "title": "Do not promote the note to proof",
        "narration": "The note says Tray Delta is sealed. The demonstrator keeps that as a claim to verify and rejects an unsupported hurried-departure explanation.",
        "why": "The subsequent plan must not depend on invented certainty.",
        "prompt": "Classify the sealing assertion.",
        "controls": [
          {
            "id": "classification",
            "label": "Statement status",
            "type": "select",
            "options": [
              {
                "value": "observation",
                "label": "observation"
              },
              {
                "value": "claim",
                "label": "claim"
              },
              {
                "value": "inference",
                "label": "inference"
              }
            ],
            "expected": "claim"
          }
        ],
        "before": {
          "room": "perception",
          "shot": "close",
          "values": {
            "clock": "13:15",
            "hatch": "open"
          },
          "labels": [
            "Note: Tray Delta is sealed"
          ],
          "focus": "ledger",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "13:15"
            },
            {
              "id": "mug",
              "label": "White jar",
              "shape": "mug",
              "color": "#f4f0e8",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "Tray Delta is sealed"
            },
            {
              "id": "hatch",
              "label": "Inspection window",
              "shape": "hatch",
              "color": "#758a87",
              "open": true
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "clock": "13:15",
            "hatch": "open",
            "selected": "claim"
          },
          "labels": [
            "Sealing remains to be checked"
          ],
          "focus": "ledger",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "13:15"
            },
            {
              "id": "mug",
              "label": "White jar",
              "shape": "mug",
              "color": "#f4f0e8",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "Tray Delta is sealed"
            },
            {
              "id": "hatch",
              "label": "Inspection window",
              "shape": "hatch",
              "color": "#758a87",
              "open": true
            }
          ]
        },
        "success": "The note supplies an account, not independent verification.",
        "pitfall": "Seeing the words does not establish the claimed seal state.",
        "hint": "Distinguish the note's existence from its assertion.",
        "duration": 18
      },
      {
        "id": "encode",
        "title": "Build the alternate retrieval route",
        "narration": "Lens belongs at Arch, Foam at Basin, Map at Bench and Beacon at Dome. The demonstrator uses a foam block rather than a generic packing image at the Basin.",
        "why": "A useful association preserves the item's identity as well as its place.",
        "prompt": "Which item belongs at the Basin?",
        "controls": [
          {
            "id": "selected",
            "label": "Basin cue",
            "type": "select",
            "options": [
              {
                "value": "Lens",
                "label": "Lens"
              },
              {
                "value": "Foam",
                "label": "Foam"
              },
              {
                "value": "Map",
                "label": "Map"
              },
              {
                "value": "Beacon",
                "label": "Beacon"
              }
            ],
            "expected": "Foam"
          }
        ],
        "before": {
          "room": "perception",
          "shot": "close",
          "values": {
            "clock": "13:15",
            "hatch": "open",
            "items": [
              "Lens",
              "Foam",
              "Map",
              "Beacon"
            ]
          },
          "labels": [
            "Arch → Basin → Bench → Dome"
          ],
          "focus": "items",
          "items": [
            {
              "id": "Lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#a5c6df"
            },
            {
              "id": "Foam",
              "label": "Foam",
              "shape": "tile",
              "color": "#e2ba77"
            },
            {
              "id": "Map",
              "label": "Map",
              "shape": "book",
              "color": "#72a594"
            },
            {
              "id": "Beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#e8cf73"
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "clock": "13:15",
            "hatch": "open",
            "items": [
              "Lens",
              "Foam",
              "Map",
              "Beacon"
            ],
            "selected": "Foam"
          },
          "labels": [
            "Specific cue: foam floating in Basin"
          ],
          "focus": "items",
          "items": [
            {
              "id": "Lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#a5c6df"
            },
            {
              "id": "Foam",
              "label": "Foam",
              "shape": "tile",
              "color": "#e2ba77"
            },
            {
              "id": "Map",
              "label": "Map",
              "shape": "book",
              "color": "#72a594"
            },
            {
              "id": "Beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#e8cf73"
            }
          ]
        },
        "success": "The cue repairs the earlier vague 'packing' substitution.",
        "pitfall": "A broad category may be remembered while the required item is lost.",
        "hint": "Encode the feature that makes Foam distinct.",
        "duration": 18
      },
      {
        "id": "recall",
        "title": "Retrieve with the list covered",
        "narration": "The demonstrator covers the item list and follows the location route. The four items return in the order Lens, Foam, Map, Beacon.",
        "why": "The record should distinguish retrieval from reading a visible answer.",
        "prompt": "Reconstruct the alternate kit.",
        "controls": [
          {
            "id": "items",
            "label": "Kit order",
            "type": "order",
            "options": [
              {
                "value": "Map",
                "label": "Map"
              },
              {
                "value": "Beacon",
                "label": "Beacon"
              },
              {
                "value": "Lens",
                "label": "Lens"
              },
              {
                "value": "Foam",
                "label": "Foam"
              }
            ],
            "initial": [
              "Map",
              "Beacon",
              "Lens",
              "Foam"
            ],
            "expected": [
              "Lens",
              "Foam",
              "Map",
              "Beacon"
            ]
          }
        ],
        "before": {
          "room": "perception",
          "shot": "close",
          "values": {
            "clock": "13:15",
            "hatch": "open",
            "items": [
              "Lens",
              "Foam",
              "Map",
              "Beacon"
            ],
            "covered": true
          },
          "labels": [
            "Arch / Basin / Bench / Dome"
          ],
          "focus": "items",
          "items": [
            {
              "id": "Lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#a5c6df"
            },
            {
              "id": "Foam",
              "label": "Foam",
              "shape": "tile",
              "color": "#e2ba77"
            },
            {
              "id": "Map",
              "label": "Map",
              "shape": "book",
              "color": "#72a594"
            },
            {
              "id": "Beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#e8cf73"
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "clock": "13:15",
            "hatch": "open",
            "items": [
              "Lens",
              "Foam",
              "Map",
              "Beacon"
            ],
            "covered": false,
            "verified": true
          },
          "labels": [
            "Four items retrieved in order"
          ],
          "focus": "items",
          "items": [
            {
              "id": "Lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#a5c6df"
            },
            {
              "id": "Foam",
              "label": "Foam",
              "shape": "tile",
              "color": "#e2ba77"
            },
            {
              "id": "Map",
              "label": "Map",
              "shape": "book",
              "color": "#72a594"
            },
            {
              "id": "Beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#e8cf73"
            }
          ]
        },
        "success": "The recorded retrieval uses the stable route.",
        "pitfall": "Do not erase the earlier substitution from the account.",
        "hint": "Walk the locations in their established order.",
        "duration": 18
      },
      {
        "id": "rotate",
        "title": "Predict and rotate the connector",
        "narration": "The connector starts north/east. Its target is south/west. Two clockwise quarter-turns map both original ports to the target directions.",
        "why": "A labelled mapping is stronger evidence than an attractive silhouette.",
        "prompt": "Set the clockwise rotation.",
        "controls": [
          {
            "id": "orientation",
            "label": "Connector rotation",
            "type": "number",
            "initial": 0,
            "expected": 180,
            "min": 0,
            "max": 270,
            "tolerance": 0,
            "unit": "degrees"
          }
        ],
        "before": {
          "room": "spatial",
          "shot": "close",
          "values": {
            "orientation": 0,
            "level": 0,
            "ports": [
              "north",
              "east"
            ]
          },
          "labels": [
            "Start N/E; target S/W"
          ],
          "focus": "connector"
        },
        "after": {
          "room": "spatial",
          "shot": "close",
          "values": {
            "orientation": 180,
            "level": 0,
            "ports": [
              "north",
              "east"
            ]
          },
          "labels": [
            "Orientation correct"
          ],
          "focus": "connector"
        },
        "success": "The two labelled ports reach their predicted directions.",
        "pitfall": "One clockwise turn would produce east/south instead.",
        "hint": "Two quarter-turns total 180 degrees.",
        "duration": 18
      },
      {
        "id": "raise",
        "title": "Check position independently",
        "narration": "The correctly oriented connector must be on level 2. The demonstrator raises it without another turn.",
        "why": "Position and orientation are independent requirements.",
        "prompt": "Set the required level.",
        "controls": [
          {
            "id": "level",
            "label": "Connector level",
            "type": "number",
            "initial": 0,
            "expected": 2,
            "min": 0,
            "max": 2,
            "tolerance": 0
          }
        ],
        "before": {
          "room": "spatial",
          "shot": "close",
          "values": {
            "orientation": 180,
            "level": 0,
            "ports": [
              "north",
              "east"
            ]
          },
          "labels": [
            "Target level 2"
          ],
          "focus": "connector"
        },
        "after": {
          "room": "spatial",
          "shot": "close",
          "values": {
            "orientation": 180,
            "level": 2,
            "ports": [
              "north",
              "east"
            ],
            "verified": true
          },
          "labels": [
            "Orientation and level both verified"
          ],
          "focus": "connector"
        },
        "success": "Both fit conditions now hold.",
        "pitfall": "Correct ports at level 0 would still be misplaced.",
        "hint": "Retain the correct rotation while changing height.",
        "duration": 18
      },
      {
        "id": "ratio",
        "title": "Choose a defensible transmission",
        "narration": "The driver has 20 teeth. Six input turns must yield three opposite output turns, so the follower needs 40 teeth.",
        "why": "The unfamiliar numbers require the ratio principle rather than a copied gear choice.",
        "prompt": "Choose the driven tooth count.",
        "controls": [
          {
            "id": "gearFollower",
            "label": "Follower teeth",
            "type": "number",
            "initial": 20,
            "expected": 40,
            "min": 6,
            "max": 48,
            "tolerance": 0,
            "unit": "teeth"
          }
        ],
        "before": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 20,
            "gearFollower": 20,
            "turns": 0,
            "interlock": true,
            "cam": 0
          },
          "labels": [
            "6 input → 3 output"
          ],
          "focus": "follower"
        },
        "after": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 20,
            "gearFollower": 40,
            "turns": 0,
            "interlock": true,
            "cam": 0
          },
          "labels": [
            "Ratio correct; readiness still unresolved"
          ],
          "focus": "follower"
        },
        "success": "The selected ratio predicts the required magnitude.",
        "pitfall": "A correct number does not yet establish an operable mechanism.",
        "hint": "Follower = 20 × 6 ÷ 3.",
        "duration": 18
      },
      {
        "id": "ready",
        "title": "Resolve the readiness failure",
        "narration": "The interlock is engaged and the spring detached. The demonstrator releases the interlock, sets the required 90-degree cam and attaches the spring.",
        "why": "The initial failure came from blocked dependencies rather than an incorrect ratio.",
        "prompt": "Set the three readiness conditions.",
        "controls": [
          {
            "id": "interlock",
            "label": "Interlock engaged",
            "type": "toggle",
            "initial": true,
            "expected": false
          },
          {
            "id": "cam",
            "label": "Cam angle",
            "type": "number",
            "initial": 0,
            "expected": 90,
            "min": 0,
            "max": 270,
            "tolerance": 0,
            "unit": "degrees"
          },
          {
            "id": "spring",
            "label": "Spring attached",
            "type": "toggle",
            "initial": false,
            "expected": true
          }
        ],
        "before": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 20,
            "gearFollower": 40,
            "turns": 0,
            "interlock": true,
            "cam": 0,
            "spring": false
          },
          "labels": [
            "Release → position cam → attach spring"
          ],
          "focus": "interlock"
        },
        "after": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 20,
            "gearFollower": 40,
            "turns": 0,
            "interlock": false,
            "cam": 90,
            "spring": true
          },
          "labels": [
            "Ready for controlled run"
          ],
          "focus": "cam"
        },
        "success": "The model now has the support required for its predicted motion.",
        "pitfall": "Changing gears again would not fix the blocked cam.",
        "hint": "Satisfy every stated prerequisite before applying input.",
        "duration": 18
      },
      {
        "id": "verify",
        "title": "Apply the predicted input",
        "narration": "Six input turns produce three opposite output turns. The demonstrator compares the amount and direction, then records the model's limits.",
        "why": "Verification tests the actual requirement, not merely visible movement.",
        "prompt": "Apply six turns and identify the direction.",
        "controls": [
          {
            "id": "turns",
            "label": "Input turns",
            "type": "number",
            "initial": 0,
            "expected": 6,
            "min": 0,
            "max": 10,
            "tolerance": 0,
            "unit": "turns"
          },
          {
            "id": "direction",
            "label": "Output direction",
            "type": "select",
            "options": [
              {
                "value": "same",
                "label": "same"
              },
              {
                "value": "opposite",
                "label": "opposite"
              }
            ],
            "expected": "opposite"
          }
        ],
        "before": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 20,
            "gearFollower": 40,
            "turns": 0,
            "interlock": false,
            "cam": 90,
            "spring": true
          },
          "labels": [
            "Prediction: 3 opposite"
          ],
          "focus": "driver"
        },
        "after": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 20,
            "gearFollower": 40,
            "turns": 6,
            "interlock": false,
            "cam": 90,
            "spring": true,
            "verified": true
          },
          "labels": [
            "3 opposite output turns recorded"
          ],
          "focus": "follower"
        },
        "success": "The observed model result supports the causal account.",
        "pitfall": "The outcome should not be presented as a physical hardware measurement.",
        "hint": "Use the stated gear relation and external-mesh direction.",
        "duration": 18
      },
      {
        "id": "transfer",
        "title": "Meet a changed output requirement",
        "narration": "The revised task asks for four output turns from six input turns. A 30-tooth follower meets that requirement while the still-valid cam and spring settings remain.",
        "why": "A complete A1 account needs a justified response to a changed situation.",
        "prompt": "Set the revised follower.",
        "controls": [
          {
            "id": "gearFollower",
            "label": "Revised follower teeth",
            "type": "number",
            "initial": 40,
            "expected": 30,
            "min": 6,
            "max": 48,
            "tolerance": 0,
            "unit": "teeth"
          }
        ],
        "before": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 20,
            "gearFollower": 40,
            "turns": 6,
            "interlock": false,
            "cam": 90,
            "spring": true
          },
          "labels": [
            "New output requirement: 4 turns"
          ],
          "focus": "follower"
        },
        "after": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 20,
            "gearFollower": 30,
            "turns": 6,
            "interlock": false,
            "cam": 90,
            "spring": true,
            "verified": true
          },
          "labels": [
            "4 turns; revision and explanation exported"
          ],
          "focus": "follower"
        },
        "success": "The finished example explains the change and retains the first result.",
        "pitfall": "Repeating the first gear configuration would give only three output turns.",
        "hint": "Follower = 20 × 6 ÷ 4.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "Complete A1 model submission — Botanical Transfer Workshop",
      "filename": "worked-assessment-a1.md",
      "markdown": "# Complete authored A1 example — Botanical Transfer Workshop\n\n**Demonstration material, not assigned answers or a real student's submission.** The alternate scene, memory list, connector and carriage parameters differ from the assessed workshop.\n\n## Attempt record\n- Objective: prepare the model botanical carriage for documented transfer.\n- Observation: 13:15 display; white jar; open window. Note's sealing assertion retained as a claim.\n- Recall baseline error: “packing” substituted for Foam; cue revised and four-item sequence retrieved.\n- Connector: north/east at level 0 → 180-degree clockwise rotation → south/west at level 2.\n- Mechanism: driver 20, follower 40, input 6, output 3 opposite; interlock released, cam 90, spring attached.\n- Transfer: follower 30, input 6, output 4 opposite; other valid readiness conditions retained.\n\n## Causal model\nInput → gear pair → cam → spring-return follower → carriage.\nEngaged interlock blocks cam adjustment. Missing spring prevents the required return cycle. Ratio alone does not establish readiness.\nOutput turns = driver teeth ÷ follower teeth × input turns.\n\n## Individual explanation (422 words)\nMy objective was to prepare a model botanical carriage for a documented transfer, using observation, deliberate recall, spatial transformation and mechanism diagnosis. I treated these as connected checks. Recognising a familiar component did not establish that its current configuration met the new requirement. I recorded the attempt before examining the worked explanation so the difference between prediction and correction remained visible.\n\nThe inspection established a 13:15 display, a white jar beside the handling ledger and an open window. A note asserted that Tray Delta was sealed. I initially interpreted the open window as evidence of hurried departure, then withdrew that claim because the scene supplied no cause. Keeping the visible condition separate from the note's account prevented a plausible story from becoming a false premise for the transfer.\n\nI encoded Lens, Foam, Map and Beacon along Arch, Basin, Bench and Dome. The Foam cue was initially too generic: I recalled “packing” rather than the required item. I revised the cue to a large foam block floating in the Basin, covered the list and retrieved the four items in order. This was a guided retrieval result, not evidence of perfect memory or a permanent improvement. The record preserves both the substitution and its repair.\n\nThe replacement connector began with north/east ports on level zero. I predicted that two clockwise quarter-turns would move the original north port south and the east port west. After rotating 180 degrees, I moved the module to level two without further rotation. Checking orientation and height separately mattered: a correct outline at the wrong level would still have failed the stated fit requirement.\n\nFor the carriage, a 20-tooth driver had to produce three output turns from six input turns. The required follower was 40 teeth, with output opposite the driver. My first ratio calculation was correct, but the engaged interlock and detached spring prevented a ready mechanism. I released the interlock, set the published 90-degree cam and attached the spring before applying the six turns. The observed three-turn result supported both the transmission model and the readiness diagnosis.\n\nThe changed task required four output turns from the same six input turns. I selected a 30-tooth follower because 20 divided by 30, multiplied by six, equals four. The cam and spring requirements remained unchanged. This transfer showed why replaying the earlier configuration would have been insufficient. My remaining limitation is that these are model observations, not physical measurements of a constructed carriage. In another apparatus I would re-establish its rules and tolerances rather than assume this demonstration's exact values apply.\n\n## Counterexample and limitation\nA 40-tooth follower with an engaged interlock has the correct ratio but an unready mechanism. The example establishes behaviour within the published model, not a verified physical build.\n\n## Assistance and attribution\nThis is an authored worked demonstration using narrated feedback and a supplied domain model. A student's own response must identify their own attempt and assistance; copying this account does not demonstrate personal understanding."
    }
  },
  {
    "id": "assessment-a2",
    "kind": "assessment",
    "title": "A2 example: Restore Iris Relay",
    "subtitle": "A complete paired worked challenge with role rotation, revision and submission evidence.",
    "skill": "Circuit diagnosis, digital evidence, permissions and communication",
    "setting": "An alternate twelve-volt relay and research dispatch console.",
    "difference": "New 12 V readings, Delta/Echo/Foxtrot records, I-4/I-8 authority and South Dome/Hill Station instructions differ from the assessed relay.",
    "transfer": "Connect the checks while keeping each claim's authority and each role's contribution explicit.",
    "sourceHref": "/assessments/assignment-2/",
    "sourceLabel": "A2 — Restore the Relay",
    "estimatedMinutes": 16,
    "steps": [
      {
        "id": "roles",
        "title": "Agree who knows what",
        "narration": "Ari initially operates the apparatus; Nia holds its requirement cards and predicts readings. They agree to rotate after the circuit verification and keep both traces.",
        "why": "A shared outcome should not conceal who obtained or interpreted the evidence.",
        "prompt": "Select the initial operator.",
        "controls": [
          {
            "id": "role",
            "label": "Initial operator",
            "type": "select",
            "options": [
              {
                "value": "Ari",
                "label": "Ari"
              },
              {
                "value": "Nia",
                "label": "Nia"
              },
              {
                "value": "Unassigned",
                "label": "Unassigned"
              }
            ],
            "expected": "Ari"
          }
        ],
        "before": {
          "room": "council",
          "shot": "establishing",
          "values": {
            "role": "unassigned"
          },
          "labels": [
            "Ari: apparatus",
            "Nia: requirements"
          ],
          "focus": "crew"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "role": "Ari"
          },
          "labels": [
            "Role rotation planned; contributions recorded"
          ],
          "focus": "crew"
        },
        "success": "The task has explicit ownership and a planned exchange.",
        "pitfall": "A single role label cannot prove that both people understood the work.",
        "hint": "Use the stated initial assignment, then preserve the later rotation.",
        "duration": 18
      },
      {
        "id": "measure",
        "title": "Diagnose from the powered trace",
        "narration": "The source reads 12 V; fuse, cable and lamp outputs read 0 V. Ari records the readings while Nia compares the competing fault predictions.",
        "why": "The first missing supply supports a specific location rather than a generic dark-system complaint.",
        "prompt": "Select the supported open component.",
        "controls": [
          {
            "id": "fault",
            "label": "Fault location",
            "type": "select",
            "options": [
              {
                "value": "fuse",
                "label": "fuse"
              },
              {
                "value": "cable",
                "label": "cable"
              },
              {
                "value": "lamp",
                "label": "lamp"
              }
            ],
            "expected": "fuse"
          },
          {
            "id": "voltage",
            "label": "Source voltage",
            "type": "number",
            "initial": 0,
            "expected": 12,
            "min": 0,
            "max": 12,
            "tolerance": 0,
            "unit": "V"
          }
        ],
        "before": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 12,
            "powered": true,
            "fault": "fuse"
          },
          "labels": [
            "12 / 0 / 0 / 0 V"
          ],
          "focus": "fuse"
        },
        "after": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 12,
            "powered": true,
            "fault": "fuse",
            "selected": "fuse"
          },
          "labels": [
            "Open fuse supported by adjacent readings"
          ],
          "focus": "fuse"
        },
        "success": "The diagnosis precedes replacement and is supported by the trace.",
        "pitfall": "Guessing the cable would ignore the zero already present at the fuse output.",
        "hint": "Find the first failed supply node.",
        "duration": 18
      },
      {
        "id": "isolate",
        "title": "Replace in the isolated state",
        "narration": "Ari switches the source off, replaces the fuse and retains the earlier powered observations. The pair does not claim that zero readings while isolated locate a fault.",
        "why": "Diagnosis and replacement require different apparatus states.",
        "prompt": "Isolate power for replacement.",
        "controls": [
          {
            "id": "powered",
            "label": "Source powered",
            "type": "toggle",
            "initial": true,
            "expected": false
          }
        ],
        "before": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 12,
            "powered": true,
            "fault": "fuse"
          },
          "labels": [
            "Replacement pending"
          ],
          "focus": "source"
        },
        "after": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 12,
            "powered": false,
            "fault": "none"
          },
          "labels": [
            "Fuse replaced with source isolated"
          ],
          "focus": "fuse"
        },
        "success": "The faulty component is replaced in the stated isolated condition.",
        "pitfall": "An off-state voltage trace alone would not support the diagnosis.",
        "hint": "Keep the powered evidence, then change the source state.",
        "duration": 18
      },
      {
        "id": "verify",
        "title": "Verify and rotate responsibility",
        "narration": "Power returns, the lamp supply reads 12 V and the lamp lights. Nia becomes operator while Ari takes the requirement pack.",
        "why": "Both a working output and a meaningful role change must be explicit in the record.",
        "prompt": "Restore power and identify the next operator.",
        "controls": [
          {
            "id": "powered",
            "label": "Restore source",
            "type": "toggle",
            "initial": false,
            "expected": true
          },
          {
            "id": "role",
            "label": "Next operator",
            "type": "select",
            "options": [
              {
                "value": "Ari",
                "label": "Ari"
              },
              {
                "value": "Nia",
                "label": "Nia"
              }
            ],
            "expected": "Nia"
          }
        ],
        "before": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 12,
            "powered": false,
            "fault": "none"
          },
          "labels": [
            "Verify before proceeding"
          ],
          "focus": "lamp"
        },
        "after": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 12,
            "powered": true,
            "fault": "none",
            "role": "Nia",
            "verified": true
          },
          "labels": [
            "12 V and light confirmed; roles rotated"
          ],
          "focus": "lamp"
        },
        "success": "The circuit result is verified before the next domain begins.",
        "pitfall": "A rotated label without changed responsibility would not establish paired work.",
        "hint": "Nia operates the console in the next stage.",
        "duration": 18
      },
      {
        "id": "archive",
        "title": "Choose the currently authorised copy",
        "narration": "The original request is 22 sections/I-4. Delta is 22/I-4, Echo 22/I-8 and Foxtrot 21/I-1. Nia compares candidates while Ari states the reference.",
        "why": "A correct circuit does not answer the separate content-identity question.",
        "prompt": "Choose the copy under the original request.",
        "controls": [
          {
            "id": "selected",
            "label": "Archive selection",
            "type": "select",
            "options": [
              {
                "value": "Delta",
                "label": "Delta"
              },
              {
                "value": "Echo",
                "label": "Echo"
              },
              {
                "value": "Foxtrot",
                "label": "Foxtrot"
              }
            ],
            "expected": "Delta"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {},
          "labels": [
            "Reference 22 / I-4",
            "Delta 22/I-4",
            "Echo 22/I-8",
            "Foxtrot 21/I-1"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "Delta",
              "label": "Delta record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "22 sections / I-4"
            },
            {
              "id": "Echo",
              "label": "Echo record",
              "shape": "book",
              "color": "#c89179",
              "text": "22 sections / I-8"
            },
            {
              "id": "Foxtrot",
              "label": "Foxtrot record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "21 sections / I-1"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "selected": "Delta",
            "verified": true
          },
          "labels": [
            "Delta matches original authority"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "Delta",
              "label": "Delta record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "22 sections / I-4"
            },
            {
              "id": "Echo",
              "label": "Echo record",
              "shape": "book",
              "color": "#c89179",
              "text": "22 sections / I-8"
            },
            {
              "id": "Foxtrot",
              "label": "Foxtrot record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "21 sections / I-1"
            }
          ]
        },
        "success": "The selected copy satisfies count and digest.",
        "pitfall": "Echo's later timestamp would not replace the signed request.",
        "hint": "Use both reference conditions.",
        "duration": 18
      },
      {
        "id": "matrix",
        "title": "Repair the complete policy",
        "narration": "The reader initially has every right, while specialist roles lack their intended actions. The pair repairs all nine decisions: all read, maintainer services, custodian approves.",
        "why": "The fix must restore useful authority as well as remove excess authority.",
        "prompt": "Set all nine expected decisions.",
        "controls": [
          {
            "id": "reader:read",
            "label": "reader may read",
            "type": "toggle",
            "initial": true,
            "expected": true
          },
          {
            "id": "reader:service",
            "label": "reader may service",
            "type": "toggle",
            "initial": true,
            "expected": false
          },
          {
            "id": "reader:approve",
            "label": "reader may approve",
            "type": "toggle",
            "initial": true,
            "expected": false
          },
          {
            "id": "maintainer:read",
            "label": "maintainer may read",
            "type": "toggle",
            "initial": true,
            "expected": true
          },
          {
            "id": "maintainer:service",
            "label": "maintainer may service",
            "type": "toggle",
            "initial": false,
            "expected": true
          },
          {
            "id": "maintainer:approve",
            "label": "maintainer may approve",
            "type": "toggle",
            "initial": false,
            "expected": false
          },
          {
            "id": "custodian:read",
            "label": "custodian may read",
            "type": "toggle",
            "initial": true,
            "expected": true
          },
          {
            "id": "custodian:service",
            "label": "custodian may service",
            "type": "toggle",
            "initial": false,
            "expected": false
          },
          {
            "id": "custodian:approve",
            "label": "custodian may approve",
            "type": "toggle",
            "initial": false,
            "expected": true
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:allow",
              "reader:approve:allow",
              "maintainer:read:allow",
              "maintainer:service:deny",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:deny"
            ]
          },
          "labels": [
            "Intended charter visible"
          ],
          "focus": "policy",
          "items": [
            {
              "id": "Delta",
              "label": "Delta record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "22 sections / I-4"
            },
            {
              "id": "Echo",
              "label": "Echo record",
              "shape": "book",
              "color": "#c89179",
              "text": "22 sections / I-8"
            },
            {
              "id": "Foxtrot",
              "label": "Foxtrot record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "21 sections / I-1"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:deny",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ],
            "verified": true
          },
          "labels": [
            "Nine-cell repaired matrix"
          ],
          "focus": "policy",
          "items": [
            {
              "id": "Delta",
              "label": "Delta record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "22 sections / I-4"
            },
            {
              "id": "Echo",
              "label": "Echo record",
              "shape": "book",
              "color": "#c89179",
              "text": "22 sections / I-8"
            },
            {
              "id": "Foxtrot",
              "label": "Foxtrot record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "21 sections / I-1"
            }
          ]
        },
        "success": "Every expected permitted and denied action is represented.",
        "pitfall": "Denying all actions would leave the relay unusable.",
        "hint": "Derive each cell from the role's named responsibility.",
        "duration": 18
      },
      {
        "id": "regression",
        "title": "Test a positive and a negative",
        "narration": "The maintainer's service action succeeds; a reader approval request fails. The pair records these alongside the rest of the nine-cell check.",
        "why": "One successful denial is not enough to show a repair preserves required work.",
        "prompt": "Select the necessary positive case.",
        "controls": [
          {
            "id": "test",
            "label": "Positive regression test",
            "type": "select",
            "options": [
              {
                "value": "Reader approves",
                "label": "Reader approves"
              },
              {
                "value": "Maintainer services",
                "label": "Maintainer services"
              },
              {
                "value": "Reader services",
                "label": "Reader services"
              }
            ],
            "expected": "Maintainer services"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:deny",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ]
          },
          "labels": [
            "Regression checks"
          ],
          "focus": "policy",
          "items": [
            {
              "id": "Delta",
              "label": "Delta record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "22 sections / I-4"
            },
            {
              "id": "Echo",
              "label": "Echo record",
              "shape": "book",
              "color": "#c89179",
              "text": "22 sections / I-8"
            },
            {
              "id": "Foxtrot",
              "label": "Foxtrot record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "21 sections / I-1"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:deny",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ],
            "verified": true
          },
          "labels": [
            "Required service works; reader approval denied"
          ],
          "focus": "policy",
          "items": [
            {
              "id": "Delta",
              "label": "Delta record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "22 sections / I-4"
            },
            {
              "id": "Echo",
              "label": "Echo record",
              "shape": "book",
              "color": "#c89179",
              "text": "22 sections / I-8"
            },
            {
              "id": "Foxtrot",
              "label": "Foxtrot record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "21 sections / I-1"
            }
          ]
        },
        "success": "The repair retains the intended system purpose.",
        "pitfall": "A negative-only check set could endorse a blanket denial.",
        "hint": "Choose the action expressly permitted by the charter.",
        "duration": 18
      },
      {
        "id": "handoff",
        "title": "Repair the first read-back",
        "narration": "The card is South Dome / four / TEAL. Nia initially repeats three; Ari corrects it and waits for the whole message to be read back.",
        "why": "The correction is useful evidence of how the protocol prevented an erroneous dispatch.",
        "prompt": "Complete the correct handoff.",
        "controls": [
          {
            "id": "destination",
            "label": "Destination",
            "type": "text",
            "initial": "",
            "expected": "South Dome"
          },
          {
            "id": "count",
            "label": "Units",
            "type": "number",
            "initial": 1,
            "expected": 4,
            "min": 1,
            "max": 6,
            "tolerance": 0
          },
          {
            "id": "code",
            "label": "Code",
            "type": "text",
            "initial": "",
            "expected": "TEAL"
          },
          {
            "id": "acknowledged",
            "label": "Corrected read-back confirmed",
            "type": "toggle",
            "initial": false,
            "expected": true
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "role": "Nia",
            "count": 3
          },
          "labels": [
            "Card: South Dome / 4 / TEAL"
          ],
          "focus": "speaker"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "count": 4,
            "role": "Ari",
            "verified": true
          },
          "labels": [
            "Full read-back matches and is confirmed"
          ],
          "focus": "speaker"
        },
        "success": "The record preserves the initial count mismatch and its correction.",
        "pitfall": "A generic acknowledgement would not expose the wrong count.",
        "hint": "Match all three fields before confirming.",
        "duration": 18
      },
      {
        "id": "amend",
        "title": "Preserve and revise the selection",
        "narration": "A new signed request requires 22 sections/I-8. The original Delta decision is retained; Echo is now the matching deliverable. The permission charter remains unchanged.",
        "why": "A content amendment changes a content check, not unrelated role authority.",
        "prompt": "Select the revised copy.",
        "controls": [
          {
            "id": "selected",
            "label": "Selection under I-8",
            "type": "select",
            "options": [
              {
                "value": "Delta",
                "label": "Delta"
              },
              {
                "value": "Echo",
                "label": "Echo"
              },
              {
                "value": "Foxtrot",
                "label": "Foxtrot"
              }
            ],
            "expected": "Echo"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:deny",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ],
            "selected": "Delta",
            "revision": "Original I-4 decision retained"
          },
          "labels": [
            "Amended signed reference 22 / I-8"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "Delta",
              "label": "Delta record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "22 sections / I-4"
            },
            {
              "id": "Echo",
              "label": "Echo record",
              "shape": "book",
              "color": "#c89179",
              "text": "22 sections / I-8"
            },
            {
              "id": "Foxtrot",
              "label": "Foxtrot record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "21 sections / I-1"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:deny",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ],
            "selected": "Echo",
            "revision": "V2 under I-8",
            "verified": true
          },
          "labels": [
            "Changed authority explains changed selection"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "Delta",
              "label": "Delta record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "22 sections / I-4"
            },
            {
              "id": "Echo",
              "label": "Echo record",
              "shape": "book",
              "color": "#c89179",
              "text": "22 sections / I-8"
            },
            {
              "id": "Foxtrot",
              "label": "Foxtrot record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "21 sections / I-1"
            }
          ]
        },
        "success": "Both the original and revised recommendations remain explainable.",
        "pitfall": "Calling Delta always wrong would erase the earlier authority.",
        "hint": "Apply the current signed reference and preserve history.",
        "duration": 18
      },
      {
        "id": "final-handoff",
        "title": "Complete the revised delivery",
        "narration": "Roles rotate again. Nia issues Hill Station / two / GOLD; Ari reads back the new message and receives confirmation. The complete example includes both role records and a joint explanation.",
        "why": "A later instruction needs its own current fields and acknowledgement.",
        "prompt": "Record the revised handoff.",
        "controls": [
          {
            "id": "destination",
            "label": "New destination",
            "type": "text",
            "initial": "",
            "expected": "Hill Station"
          },
          {
            "id": "count",
            "label": "New units",
            "type": "number",
            "initial": 1,
            "expected": 2,
            "min": 1,
            "max": 6,
            "tolerance": 0
          },
          {
            "id": "code",
            "label": "New code",
            "type": "text",
            "initial": "",
            "expected": "GOLD"
          },
          {
            "id": "acknowledged",
            "label": "New read-back confirmed",
            "type": "toggle",
            "initial": false,
            "expected": true
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "count": 4,
            "role": "Nia"
          },
          "labels": [
            "New card: Hill Station / 2 / GOLD"
          ],
          "focus": "speaker"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "count": 2,
            "role": "Ari",
            "verified": true,
            "revision": "Original and revised deliveries retained"
          },
          "labels": [
            "Final paired record complete"
          ],
          "focus": "speaker"
        },
        "success": "The new handoff is explicit and does not inherit stale confirmation.",
        "pitfall": "Reusing TEAL would apply the old instruction to the wrong delivery.",
        "hint": "Treat the amended delivery as a distinct message.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "Complete A2 model submission — Iris Relay",
      "filename": "worked-assessment-a2.md",
      "markdown": "# Complete authored A2 example — Iris Relay\n\n**Teaching demonstration, not an assigned response or a claim of real student activity.**\n\n## Initial checkpoint\nCircuit: source/fuse/cable/lamp = 12/0/0/0 V while powered. Diagnosis: open fuse. Isolated replacement; powered verification 12/12/12/12 V and lamp lit.\nReference: 22 sections, I-4. Delta 22/I-4 matches; Echo 22/I-8 differs; Foxtrot 21/I-1 is incomplete.\nOriginal permission fault: reader had read/service/approve; maintainer and custodian had read only.\n\n## Before and after policy\n| Role | Before read/service/approve | After read/service/approve |\n| --- | --- | --- |\n| Reader | Allow / Allow / Allow | Allow / Deny / Deny |\n| Maintainer | Allow / Deny / Deny | Allow / Allow / Deny |\n| Custodian | Allow / Deny / Deny | Allow / Deny / Allow |\n\nAll nine after-state cells were compared with the mandate. Both denied and permitted operations were tested.\n\n## Handoff records\nFirst card: South Dome / 4 / TEAL. Initial read-back said 3; corrected complete read-back said 4 and was confirmed.\nAmended card: Hill Station / 2 / GOLD. Complete read-back matched and was confirmed.\n\n## Preserved revision\nVersion 1 selected Delta under I-4. Version 2 selected Echo after a signed amendment required I-8. The policy was not changed by that content amendment. The historical source and original selection were retained.\n\n## Responsibilities and contribution statements\n| Stage | Operator | Analyst / check |\n| --- | --- | --- |\n| Circuit diagnosis | Ari | Nia predicted and checked readings |\n| Archive and policy | Nia | Ari supplied manifest and expected matrix |\n| First handoff | Nia | Ari issued and confirmed instruction |\n| Revised handoff | Ari | Nia issued and confirmed amended instruction |\n\nAri: I obtained the circuit trace, performed the isolated replacement, checked the investigation requirements after rotation and received the revised instruction. The analyst's predictions informed my actions, but did not substitute for my recorded checks.\nNia: I compared candidate circuit faults, operated the archive and policy checks after rotation, corrected my initial count read-back and supplied the amended instruction. My role included questioning a result, not simply approving Ari's choices.\n\n## Joint explanation (543 words)\nOur pair's objective was to restore Iris Relay and deliver the research copy authorised by its current signed request. We divided the initial work between Ari as operator and Nia as analyst, then exchanged responsibilities. The role labels describe an authored demonstration rather than authenticated people. We retained separate traces so the joint explanation did not conceal which role obtained a reading, supplied a requirement or confirmed a handoff.\n\nThe twelve-volt support circuit was dark. Ari measured relative to the common return: source twelve volts, fuse output zero, cable output zero and lamp supply zero. Nia compared those values with predicted supply-break cases. Because the first missing supply was immediately after the fuse, the evidence supported an open fuse rather than a cable failure. Ari isolated power before replacement. Restoring power produced twelve volts at the lamp supply and a lit output. We recorded both observations because a healthy input alone would not establish a working load.\n\nAfter this verification we rotated roles. Nia operated the record console while Ari read the investigation pack. The signed request specified twenty-two sections and digest I-4. Delta contained twenty-two sections with I-4; Echo contained twenty-two with I-8 after annotation; Foxtrot contained twenty-one with I-1. Delta met the original count and identity conditions. Echo's later timestamp did not make it the required copy. Our recommendation remained limited to agreement with the supplied reference, not the scientific accuracy of every section.\n\nThe local permission model initially gave the reader service and approval rights while denying the specialist operations to maintainer and custodian. We wrote the intended matrix before changing it: everyone reads, only maintainer services, only custodian approves. Nia changed the policy while Ari checked each expected result. We tested all nine cells, including the legitimate operations. A blanket denial would have removed the unauthorised actions while preventing the relay from doing its job. That distinction made the positive checks necessary rather than optional reassurance.\n\nFor the first handoff, Ari's analyst card specified South Dome, four units, TEAL. Nia initially repeated three units. Ari corrected the count and Nia read back the complete message before acknowledgement. We preserved this mismatch because it shows what the protocol repaired. Merely writing that communication was good would have hidden the evidence. The acknowledgement was attached to that specific instruction, not treated as permission for later dispatches.\n\nThe published amendment then changed the signed deliverable to twenty-two sections with I-8. We preserved the Delta selection and its original authority, selected Echo under the new authority and documented why the change did not make the first comparison false. Responsibilities rotated again for the revised handoff. The new card specified Hill Station, two units, GOLD. The operator repeated all three fields and the analyst confirmed them. We did not reuse TEAL simply because it had been correct earlier.\n\nOur main lesson was that restoration, evidence and coordination form a dependency chain. A working circuit does not identify the correct data; correct data does not establish a shared delivery instruction. Each stage needed its own verification and a handoff of what had actually been established. The example remains limited to authored local models. In another system we would check its reference authority, measurement conventions and access contract before reusing any exact value from this trial.\n\n## Attribution and limitation\nThe names, actions and records form an authored worked path. No external system was tested and no physical circuit measurement is claimed. A student submission must supply its own role records and declared assistance."
    }
  },
  {
    "id": "assessment-final",
    "kind": "assessment",
    "title": "Final example: Operation Lamplight",
    "subtitle": "A complete recovery operation, two contrasting rehearsals, preserved revision and finished team submission.",
    "skill": "Integration of all twelve capabilities",
    "setting": "Storm-damaged Halcyon Observatory: arrival desk, workshop, power bay, record dome, instrumented gallery and dispatch balcony.",
    "difference": "Halcyon, the star atlas, H-3/H-8 records, 24/36 lift, nine-volt circuit, kit and crew are separate from Meridian's assigned operation.",
    "transfer": "Recognise relevant capabilities, connect their results, preserve revisions and defend a resolution against the current objective.",
    "sourceHref": "/assessments/final-project/",
    "sourceLabel": "Final Project — Operation Last Light",
    "estimatedMinutes": 24,
    "steps": [
      {
        "id": "contract",
        "title": "State Operation Lamplight's contract",
        "narration": "Halcyon Observatory needs verified star-atlas research recovered after a storm. Preserve the original records and document custody. Physical removal is a preferred method, not the only acceptable research-access result.",
        "why": "A clear objective allows the team to judge later alternatives without disguising a changed goal.",
        "prompt": "Choose the mission's actual success condition.",
        "controls": [
          {
            "id": "objective",
            "label": "Mission success",
            "type": "select",
            "options": [
              {
                "value": "Remove the original at any cost",
                "label": "Remove the original at any cost"
              },
              {
                "value": "Recover verified research while preserving the original and custody",
                "label": "Recover verified research while preserving the original and custody"
              },
              {
                "value": "Reach an ending quickly",
                "label": "Reach an ending quickly"
              }
            ],
            "expected": "Recover verified research while preserving the original and custody"
          }
        ],
        "before": {
          "room": "operations",
          "shot": "establishing",
          "values": {
            "originalPlan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "plan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "revision": "Initial charter"
          },
          "labels": [
            "Operation Lamplight",
            "Research access + preservation + custody"
          ],
          "focus": "contract"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "plan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "verified": true
          },
          "labels": [
            "Objective and stop conditions recorded"
          ],
          "focus": "contract"
        },
        "success": "The charter can accommodate a justified recovery method.",
        "pitfall": "Confusing the physical object with the entire objective can force a needless failure later.",
        "hint": "Include the preservation and custody constraints.",
        "duration": 18
      },
      {
        "id": "crew",
        "title": "Assign cross-role dependencies",
        "narration": "Lena observes and navigates; Omar diagnoses systems; Priya investigates records and policy; Jonah coordinates agreements. Each result must be received by another role before it permits a dependent action.",
        "why": "Four competent people do not automatically share the same model.",
        "prompt": "Who owns the atlas identity check?",
        "controls": [
          {
            "id": "role",
            "label": "Identity-check owner",
            "type": "select",
            "options": [
              {
                "value": "Lena — observer",
                "label": "Lena — observer"
              },
              {
                "value": "Omar — systems",
                "label": "Omar — systems"
              },
              {
                "value": "Priya — investigator",
                "label": "Priya — investigator"
              },
              {
                "value": "Jonah — coordinator",
                "label": "Jonah — coordinator"
              }
            ],
            "expected": "Priya — investigator"
          }
        ],
        "before": {
          "room": "council",
          "shot": "establishing",
          "values": {
            "role": "unassigned"
          },
          "labels": [
            "Lena / Omar / Priya / Jonah"
          ],
          "focus": "crew"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "role": "Priya — investigator"
          },
          "labels": [
            "Priya verifies identity; Jonah receives result"
          ],
          "focus": "crew"
        },
        "success": "The check has an owner and a recipient.",
        "pitfall": "A team may duplicate easy checks and omit difficult ones when ownership stays implicit.",
        "hint": "Match the responsibility to the relevant capability.",
        "duration": 18
      },
      {
        "id": "arrival",
        "title": "Inspect the storm-damaged arrival desk",
        "narration": "The display reads 06:45 beside a blue beacon, cracked outer case and open hatch. A note claims all plates are intact. Lena records the claim separately from the visible damage.",
        "why": "A dramatic setting should not decide the contents of an investigation.",
        "prompt": "Record the display and classify the intact-plates assertion.",
        "controls": [
          {
            "id": "clock",
            "label": "Display",
            "type": "text",
            "initial": "",
            "expected": "06:45"
          },
          {
            "id": "classification",
            "label": "Plate statement",
            "type": "select",
            "options": [
              {
                "value": "observation",
                "label": "observation"
              },
              {
                "value": "claim",
                "label": "claim"
              },
              {
                "value": "inference",
                "label": "inference"
              }
            ],
            "expected": "claim"
          }
        ],
        "before": {
          "room": "perception",
          "shot": "establishing",
          "values": {
            "clock": "06:45",
            "hatch": "open"
          },
          "labels": [
            "Blue beacon",
            "Cracked outer case",
            "Note: all plates intact"
          ],
          "focus": "clock",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "06:45"
            },
            {
              "id": "mug",
              "label": "Green mug",
              "shape": "mug",
              "color": "#8b9eae",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "All plates are intact"
            },
            {
              "id": "hatch",
              "label": "Service hatch",
              "shape": "hatch",
              "color": "#758a87",
              "open": true
            },
            {
              "id": "beacon",
              "label": "Blue beacon",
              "shape": "beacon",
              "color": "#5dabe2"
            },
            {
              "id": "case",
              "label": "Cracked outer case",
              "shape": "tile",
              "color": "#877a73",
              "text": "Outer casing cracked; interior unverified"
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "clock": "06:45",
            "hatch": "open",
            "selected": "claim",
            "verified": true
          },
          "labels": [
            "Visible damage and unverified account separated"
          ],
          "focus": "note",
          "items": [
            {
              "id": "clock",
              "label": "Scene display",
              "shape": "clock",
              "color": "#c69e58",
              "time": "06:45"
            },
            {
              "id": "mug",
              "label": "Green mug",
              "shape": "mug",
              "color": "#8b9eae",
              "text": "Empty"
            },
            {
              "id": "ledger",
              "label": "Inspection ledger",
              "shape": "book",
              "color": "#987a54",
              "text": "Published inspection record"
            },
            {
              "id": "note",
              "label": "Written account",
              "shape": "paper",
              "color": "#f4ead5",
              "text": "All plates are intact"
            },
            {
              "id": "hatch",
              "label": "Service hatch",
              "shape": "hatch",
              "color": "#758a87",
              "open": true
            },
            {
              "id": "beacon",
              "label": "Blue beacon",
              "shape": "beacon",
              "color": "#5dabe2"
            },
            {
              "id": "case",
              "label": "Cracked outer case",
              "shape": "tile",
              "color": "#877a73",
              "text": "Outer casing cracked; interior unverified"
            }
          ]
        },
        "success": "The evidence record supports investigation without inventing the contents' condition.",
        "pitfall": "A broken case does not prove that every plate is ruined, and a note does not prove they are intact.",
        "hint": "Separate what is visible from what the note asserts.",
        "duration": 18
      },
      {
        "id": "memory",
        "title": "Carry a short kit sequence",
        "narration": "Wedge, Lens, Spool and Beacon are linked to Gate, Basin, Workshop and Dome. Lena initially swaps the middle items, strengthens the Lens-at-Basin association and retrieves again with the list covered.",
        "why": "A corrected retrieval is evidence of practice, not evidence that memory is infallible.",
        "prompt": "Reconstruct the kit in route order.",
        "controls": [
          {
            "id": "items",
            "label": "Kit sequence",
            "type": "order",
            "options": [
              {
                "value": "Beacon",
                "label": "Beacon"
              },
              {
                "value": "Spool",
                "label": "Spool"
              },
              {
                "value": "Wedge",
                "label": "Wedge"
              },
              {
                "value": "Lens",
                "label": "Lens"
              }
            ],
            "initial": [
              "Beacon",
              "Spool",
              "Wedge",
              "Lens"
            ],
            "expected": [
              "Wedge",
              "Lens",
              "Spool",
              "Beacon"
            ]
          }
        ],
        "before": {
          "room": "perception",
          "shot": "close",
          "values": {
            "clock": "06:45",
            "hatch": "open",
            "covered": true,
            "items": [
              "Wedge",
              "Lens",
              "Spool",
              "Beacon"
            ]
          },
          "labels": [
            "Gate → Basin → Workshop → Dome"
          ],
          "focus": "items",
          "items": [
            {
              "id": "Wedge",
              "label": "Wedge",
              "shape": "tile",
              "color": "#a5c6df"
            },
            {
              "id": "Lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#e2ba77"
            },
            {
              "id": "Spool",
              "label": "Spool",
              "shape": "spool",
              "color": "#72a594"
            },
            {
              "id": "Beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#e8cf73"
            }
          ]
        },
        "after": {
          "room": "perception",
          "shot": "close",
          "values": {
            "clock": "06:45",
            "hatch": "open",
            "covered": false,
            "items": [
              "Wedge",
              "Lens",
              "Spool",
              "Beacon"
            ],
            "verified": true
          },
          "labels": [
            "Corrected sequence; written kit retained"
          ],
          "focus": "items",
          "items": [
            {
              "id": "Wedge",
              "label": "Wedge",
              "shape": "tile",
              "color": "#a5c6df"
            },
            {
              "id": "Lens",
              "label": "Lens",
              "shape": "lens",
              "color": "#e2ba77"
            },
            {
              "id": "Spool",
              "label": "Spool",
              "shape": "spool",
              "color": "#72a594"
            },
            {
              "id": "Beacon",
              "label": "Beacon",
              "shape": "beacon",
              "color": "#e8cf73"
            }
          ]
        },
        "success": "The sequence is recovered and the earlier substitution remains in the record.",
        "pitfall": "Deleting the first error would overstate reliability.",
        "hint": "Use the location order, not the appearance order of the shelf.",
        "duration": 18
      },
      {
        "id": "connector",
        "title": "Fit the unfamiliar connector",
        "narration": "The connector begins north/west at level 0. The target is west/south on level 1. Omar predicts a 270-degree clockwise rotation, then a separate level change.",
        "why": "Tracking labels makes spatial reasoning checkable in a changed context.",
        "prompt": "Set the required orientation and level.",
        "controls": [
          {
            "id": "orientation",
            "label": "Clockwise rotation",
            "type": "number",
            "initial": 0,
            "expected": 270,
            "min": 0,
            "max": 270,
            "tolerance": 0,
            "unit": "degrees"
          },
          {
            "id": "level",
            "label": "Required level",
            "type": "number",
            "initial": 0,
            "expected": 1,
            "min": 0,
            "max": 2,
            "tolerance": 0
          }
        ],
        "before": {
          "room": "spatial",
          "shot": "close",
          "values": {
            "ports": [
              "north",
              "west"
            ],
            "orientation": 0,
            "level": 0
          },
          "labels": [
            "Target W/S on level 1"
          ],
          "focus": "connector"
        },
        "after": {
          "room": "spatial",
          "shot": "close",
          "values": {
            "ports": [
              "north",
              "west"
            ],
            "orientation": 270,
            "level": 1,
            "verified": true
          },
          "labels": [
            "Both spatial constraints met"
          ],
          "focus": "connector"
        },
        "success": "North becomes west and west becomes south; translation preserves that orientation.",
        "pitfall": "A 90-degree turn would make east/north instead.",
        "hint": "Trace three clockwise quarter-turns from each original direction.",
        "duration": 18
      },
      {
        "id": "lift",
        "title": "Restore the model lift",
        "narration": "The lift has a 24-tooth driver and requires four output turns from six input turns. A 36-tooth follower satisfies the ratio, but the released interlock, 270-degree cam and attached spring are also required.",
        "why": "Integrated work still needs distinct ratio and readiness checks.",
        "prompt": "Set the lift's valid configuration.",
        "controls": [
          {
            "id": "gearFollower",
            "label": "Follower teeth",
            "type": "number",
            "initial": 24,
            "expected": 36,
            "min": 6,
            "max": 48,
            "tolerance": 0,
            "unit": "teeth"
          },
          {
            "id": "interlock",
            "label": "Interlock engaged",
            "type": "toggle",
            "initial": true,
            "expected": false
          },
          {
            "id": "cam",
            "label": "Cam angle",
            "type": "number",
            "initial": 0,
            "expected": 270,
            "min": 0,
            "max": 270,
            "tolerance": 0,
            "unit": "degrees"
          },
          {
            "id": "spring",
            "label": "Spring attached",
            "type": "toggle",
            "initial": false,
            "expected": true
          },
          {
            "id": "turns",
            "label": "Input turns",
            "type": "number",
            "initial": 0,
            "expected": 6,
            "min": 0,
            "max": 10,
            "tolerance": 0,
            "unit": "turns"
          }
        ],
        "before": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 24,
            "gearFollower": 24,
            "turns": 0,
            "interlock": true,
            "cam": 0,
            "spring": false
          },
          "labels": [
            "6 input → 4 opposite output"
          ],
          "focus": "driver"
        },
        "after": {
          "room": "mechanics",
          "shot": "close",
          "values": {
            "gearDriver": 24,
            "gearFollower": 36,
            "turns": 6,
            "interlock": false,
            "cam": 270,
            "spring": true,
            "verified": true
          },
          "labels": [
            "Four opposite output turns verified"
          ],
          "focus": "follower"
        },
        "success": "The motion matches the requirement and its readiness conditions are explicit.",
        "pitfall": "A familiar gear or cam setting may be wrong for this apparatus.",
        "hint": "Follower = 24 × 6 ÷ 4; then satisfy the published readiness rules.",
        "duration": 18
      },
      {
        "id": "circuit",
        "title": "Diagnose the support-circuit break",
        "narration": "Powered readings are source 9 V, fuse 9 V, cable 0 V and lamp 0 V. Omar localises the first missing supply to the cable and isolates power before replacement.",
        "why": "The diagnosis must precede the repair and name the measurement context.",
        "prompt": "Select the fault and isolate the source.",
        "controls": [
          {
            "id": "fault",
            "label": "Open component",
            "type": "select",
            "options": [
              {
                "value": "fuse",
                "label": "fuse"
              },
              {
                "value": "cable",
                "label": "cable"
              },
              {
                "value": "lamp",
                "label": "lamp"
              }
            ],
            "expected": "cable"
          },
          {
            "id": "powered",
            "label": "Source powered for replacement",
            "type": "toggle",
            "initial": true,
            "expected": false
          }
        ],
        "before": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": true,
            "fault": "cable"
          },
          "labels": [
            "9 / 9 / 0 / 0 V"
          ],
          "focus": "cable"
        },
        "after": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": false,
            "fault": "none"
          },
          "labels": [
            "Cable replaced with power isolated"
          ],
          "focus": "cable"
        },
        "success": "The repair follows a discriminating trace.",
        "pitfall": "A dark lamp alone would support several different faults.",
        "hint": "Find the first node after the last healthy supply.",
        "duration": 18
      },
      {
        "id": "verify-power",
        "title": "Verify the repaired output",
        "narration": "Power is restored. The lamp supply reads 9 V and the lamp lights. Jonah receives the result before treating the support circuit as ready.",
        "why": "A private check cannot support a team dependency until its result is communicated.",
        "prompt": "Restore power and confirm the expected supply.",
        "controls": [
          {
            "id": "powered",
            "label": "Restore power",
            "type": "toggle",
            "initial": false,
            "expected": true
          },
          {
            "id": "voltage",
            "label": "Verified supply",
            "type": "number",
            "initial": 0,
            "expected": 9,
            "min": 0,
            "max": 12,
            "tolerance": 0,
            "unit": "V"
          }
        ],
        "before": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": false,
            "fault": "none"
          },
          "labels": [
            "Verification and handoff pending"
          ],
          "focus": "lamp"
        },
        "after": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": true,
            "fault": "none",
            "verified": true
          },
          "labels": [
            "9 V + light; coordinator informed"
          ],
          "focus": "lamp"
        },
        "success": "Both the physical model output and the cross-role handoff are recorded.",
        "pitfall": "Replacing the cable is not itself a verification result.",
        "hint": "Return to the original symptom and confirm it has changed.",
        "duration": 18
      },
      {
        "id": "reference",
        "title": "Verify the baseline atlas",
        "narration": "The original signed reference requests 30 sections/H-3. Aster is 30/H-3, Cinder 30/H-8 and Dawn 29/H-1. Priya selects Aster while stating the comparison's limit.",
        "why": "Count and identity checks support a bounded content recommendation.",
        "prompt": "Choose the baseline atlas.",
        "controls": [
          {
            "id": "selected",
            "label": "Copy under H-3",
            "type": "select",
            "options": [
              {
                "value": "Aster",
                "label": "Aster"
              },
              {
                "value": "Cinder",
                "label": "Cinder"
              },
              {
                "value": "Dawn",
                "label": "Dawn"
              }
            ],
            "expected": "Aster"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {},
          "labels": [
            "Reference 30 / H-3",
            "Aster 30/H-3",
            "Cinder 30/H-8",
            "Dawn 29/H-1"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "Aster",
              "label": "Aster record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "30 sections / H-3"
            },
            {
              "id": "Cinder",
              "label": "Cinder record",
              "shape": "book",
              "color": "#c89179",
              "text": "30 sections / H-8"
            },
            {
              "id": "Dawn",
              "label": "Dawn record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "29 sections / H-1"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "selected": "Aster",
            "verified": true
          },
          "labels": [
            "Aster matches baseline authority"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "Aster",
              "label": "Aster record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "30 sections / H-3"
            },
            {
              "id": "Cinder",
              "label": "Cinder record",
              "shape": "book",
              "color": "#c89179",
              "text": "30 sections / H-8"
            },
            {
              "id": "Dawn",
              "label": "Dawn record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "29 sections / H-1"
            }
          ]
        },
        "success": "The baseline selection meets both requirements.",
        "pitfall": "A later file is not automatically the authorised one.",
        "hint": "Compare with the signed reference, not the timestamp alone.",
        "duration": 18
      },
      {
        "id": "policy",
        "title": "Check the recovery authority",
        "narration": "The charter permits all roles to read, the maintainer to service and the custodian to approve release. Priya finds the approval settings reversed: reader is allowed and custodian denied. She repairs those two decisions, then checks that reader approval fails while custodian approval works.",
        "why": "Useful and forbidden operations must both be tested.",
        "prompt": "Repair the two reversed approval settings.",
        "controls": [
          {
            "id": "readerApprove",
            "label": "Reader approval",
            "type": "toggle",
            "initial": true,
            "expected": false
          },
          {
            "id": "custodianApprove",
            "label": "Custodian approval",
            "type": "toggle",
            "initial": false,
            "expected": true
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:allow",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:deny"
            ]
          },
          "labels": [
            "Attempted policy: reader approval allowed; custodian denied"
          ],
          "focus": "policy",
          "items": [
            {
              "id": "Aster",
              "label": "Aster record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "30 sections / H-3"
            },
            {
              "id": "Cinder",
              "label": "Cinder record",
              "shape": "book",
              "color": "#c89179",
              "text": "30 sections / H-8"
            },
            {
              "id": "Dawn",
              "label": "Dawn record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "29 sections / H-1"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:deny",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ],
            "verified": true
          },
          "labels": [
            "Positive and negative approval checks agree"
          ],
          "focus": "policy",
          "items": [
            {
              "id": "Aster",
              "label": "Aster record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "30 sections / H-3"
            },
            {
              "id": "Cinder",
              "label": "Cinder record",
              "shape": "book",
              "color": "#c89179",
              "text": "30 sections / H-8"
            },
            {
              "id": "Dawn",
              "label": "Dawn record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "29 sections / H-1"
            }
          ]
        },
        "success": "The release authority is verified without disabling legitimate work.",
        "pitfall": "Denying every action would undermine recovery rather than complete the policy check.",
        "hint": "Use the published role/action relationship.",
        "duration": 18
      },
      {
        "id": "handoff",
        "title": "Send a precise environmental-pack instruction",
        "narration": "Jonah requests three environmental packs to West Store with code AZURE. The receiver repeats all fields before confirmation, rather than replying only 'understood'.",
        "why": "A mission can fail through ambiguity after technically correct work.",
        "prompt": "Complete the current handoff.",
        "controls": [
          {
            "id": "destination",
            "label": "Destination",
            "type": "text",
            "initial": "",
            "expected": "West Store"
          },
          {
            "id": "count",
            "label": "Pack count",
            "type": "number",
            "initial": 1,
            "expected": 3,
            "min": 1,
            "max": 6,
            "tolerance": 0
          },
          {
            "id": "code",
            "label": "Code",
            "type": "text",
            "initial": "",
            "expected": "AZURE"
          },
          {
            "id": "acknowledged",
            "label": "Read-back confirmed",
            "type": "toggle",
            "initial": false,
            "expected": true
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "role": "coordinator"
          },
          "labels": [
            "West Store / 3 / AZURE"
          ],
          "focus": "speaker"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "count": 3,
            "verified": true
          },
          "labels": [
            "Matching instruction and acknowledgement"
          ],
          "focus": "speaker"
        },
        "success": "The team shares the same actionable instruction.",
        "pitfall": "A past code or unspecified quantity would leave the task ambiguous.",
        "hint": "Read back destination, count and code together.",
        "duration": 18
      },
      {
        "id": "council",
        "title": "Negotiate supported baseline movement",
        "narration": "The original atlas has mass 9; the carrier alone supports 7. A checked cradle raises capacity to 11. The custodian permits supported original movement or a verified-copy transfer with custody.",
        "why": "The constraint is numeric and authoritative, not a judgement of an actor's confidence.",
        "prompt": "Choose the required supported capacity.",
        "controls": [
          {
            "id": "capacity",
            "label": "Verified cradle capacity",
            "type": "number",
            "initial": 0,
            "expected": 11,
            "min": 0,
            "max": 15,
            "tolerance": 0,
            "unit": "units"
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "count": 3,
            "load": 9,
            "capacity": 7
          },
          "labels": [
            "Unsupported carrier insufficient",
            "Cradle rated and verified at 11"
          ],
          "focus": "cart"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "count": 3,
            "load": 9,
            "capacity": 11,
            "verified": true
          },
          "labels": [
            "Baseline physical handling permitted"
          ],
          "focus": "cart"
        },
        "success": "The supported arrangement meets the load condition.",
        "pitfall": "Calling nine close to seven does not make the unsupported carrier adequate.",
        "hint": "Use the checked cradle configuration, not the bare carrier.",
        "duration": 18
      },
      {
        "id": "baseline",
        "title": "Run and preserve the baseline rehearsal",
        "narration": "The route 20→21→22→23→18→13→8→3 avoids published sensor cells 6, 7 and 12. With Aster verified and cradle support present, the baseline physical recovery completes and is saved as Version 1. Receipt B-RCPT-01 names Venn at DB-1. This separate simulated baseline is retained before the next rehearsal resets to initial custody.",
        "why": "Success establishes behaviour under these conditions, not permanent reliability.",
        "prompt": "Predict the baseline route's contacts.",
        "controls": [
          {
            "id": "count",
            "label": "Predicted contacts",
            "type": "number",
            "initial": 0,
            "expected": 0,
            "min": 0,
            "max": 8,
            "tolerance": 0
          }
        ],
        "before": {
          "room": "movement",
          "shot": "close",
          "values": {
            "route": [
              "20",
              "21",
              "22",
              "23",
              "18",
              "13",
              "8",
              "3"
            ],
            "sensors": [
              "6",
              "7",
              "12"
            ],
            "start": 20,
            "goal": 3,
            "currentStep": 0,
            "originalPlan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "plan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ]
          },
          "labels": [
            "Baseline equipment and reference hold"
          ],
          "focus": "route"
        },
        "after": {
          "room": "movement",
          "shot": "close",
          "values": {
            "route": [
              "20",
              "21",
              "22",
              "23",
              "18",
              "13",
              "8",
              "3"
            ],
            "sensors": [
              "6",
              "7",
              "12"
            ],
            "start": 20,
            "goal": 3,
            "originalPlan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "plan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "currentStep": 7,
            "count": 0,
            "verified": true,
            "revision": "Baseline rehearsal saved",
            "receipt": "B-RCPT-01",
            "recipient": "Dr Tomas Venn, DB-1",
            "custodian": "Dr Tomas Venn",
            "originalLocation": "Dispatch balcony, DB-1",
            "scenarioRun": "Rehearsal 1"
          },
          "labels": [
            "Physical baseline result preserved",
            "B-RCPT-01: Venn receives O-HAL-01 at DB-1"
          ],
          "focus": "route"
        },
        "success": "The predicted trace and required handling conditions agree.",
        "pitfall": "A successful rehearsal is not permission to skip later changed-condition checks.",
        "hint": "None of the route cells belongs to the published sensor set.",
        "duration": 18
      },
      {
        "id": "disruption",
        "title": "Stop the invalidated movement",
        "narration": "The second rehearsal resets O-HAL-01 to Quill's custody at RD-2. Its storm notice closes east cells 23, 18, 13 and 8 and withdraws the cradle. The original remains mass 9; the carrier supports only 7. Jonah stops original movement before reusing Version 1.",
        "why": "A changed prerequisite invalidates the dependent action even if it succeeded earlier.",
        "prompt": "Can the unsupported carrier move the original under the rule?",
        "controls": [
          {
            "id": "moveAllowed",
            "label": "Original movement authorised now",
            "type": "toggle",
            "initial": true,
            "expected": false
          }
        ],
        "before": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "plan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "load": 9,
            "capacity": 7,
            "revision": "East gallery closed; cradle unavailable",
            "closedCells": [
              "23",
              "18",
              "13",
              "8"
            ],
            "custodian": "Dr Edda Quill",
            "originalLocation": "Record dome, RD-2",
            "scenarioRun": "Rehearsal 2"
          },
          "labels": [
            "Published disruption; original unchanged"
          ],
          "focus": "original-plan"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "plan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "load": 9,
            "capacity": 7,
            "revision": "Movement stopped before action",
            "closedCells": [
              "23",
              "18",
              "13",
              "8"
            ],
            "custodian": "Dr Edda Quill",
            "originalLocation": "Record dome, RD-2",
            "scenarioRun": "Rehearsal 2"
          },
          "labels": [
            "Failed dependency identified"
          ],
          "focus": "original-plan"
        },
        "success": "The team preserves the baseline and recognises that its conditions no longer hold.",
        "pitfall": "Trying harder cannot change the published capacity limit.",
        "hint": "Compare the current capacity with the unchanged mass.",
        "duration": 18
      },
      {
        "id": "amend",
        "title": "Apply the current research authority",
        "narration": "A signed amendment requires the annotated 30-section H-8 copy. Priya selects Cinder while retaining Aster's earlier H-3 result. The research-access charter still permits verified digital recovery.",
        "why": "A changed deliverable and a changed transport condition must each be accounted for.",
        "prompt": "Choose the copy under the amendment.",
        "controls": [
          {
            "id": "selected",
            "label": "Current authorised copy",
            "type": "select",
            "options": [
              {
                "value": "Aster",
                "label": "Aster"
              },
              {
                "value": "Cinder",
                "label": "Cinder"
              },
              {
                "value": "Dawn",
                "label": "Dawn"
              }
            ],
            "expected": "Cinder"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:deny",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ],
            "selected": "Aster",
            "revision": "Original H-3 preserved"
          },
          "labels": [
            "Current mandate: 30 / H-8"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "Aster",
              "label": "Aster record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "30 sections / H-3"
            },
            {
              "id": "Cinder",
              "label": "Cinder record",
              "shape": "book",
              "color": "#c89179",
              "text": "30 sections / H-8"
            },
            {
              "id": "Dawn",
              "label": "Dawn record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "29 sections / H-1"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:allow",
              "reader:service:deny",
              "reader:approve:deny",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ],
            "selected": "Cinder",
            "verified": true,
            "revision": "Current H-8 verified"
          },
          "labels": [
            "Cinder now meets the request"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "Aster",
              "label": "Aster record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "30 sections / H-3"
            },
            {
              "id": "Cinder",
              "label": "Cinder record",
              "shape": "book",
              "color": "#c89179",
              "text": "30 sections / H-8"
            },
            {
              "id": "Dawn",
              "label": "Dawn record",
              "shape": "book",
              "color": "#a4afc7",
              "text": "29 sections / H-1"
            }
          ]
        },
        "success": "The revision has a named authority and a preserved history.",
        "pitfall": "Calling Aster never valid would falsify the earlier conditions.",
        "hint": "Use the amended digest and retain the original comparison.",
        "duration": 18
      },
      {
        "id": "rehearse-revision",
        "title": "Build and test Version 2",
        "narration": "Version 2 verifies Cinder and retains O-HAL-01 with Quill at RD-2. Lena checks west cells 20, 15, 10, 5, 0, 1, 2, 3 against sensors 5, 6, 12: one predicted and recorded contact at 5. Venn acknowledges DC-H8/Cinder at DB-1 in R2-RCPT-02. Version 1 remains visible.",
        "why": "A revision should be a testable dependency sequence, not a claim that the team adapted.",
        "prompt": "Arrange Version 2.",
        "controls": [
          {
            "id": "plan",
            "label": "Revised operation",
            "type": "order",
            "options": [
              {
                "value": "Transfer copy",
                "label": "Transfer copy"
              },
              {
                "value": "Preserve original",
                "label": "Preserve original"
              },
              {
                "value": "Confirm receipt",
                "label": "Confirm receipt"
              },
              {
                "value": "Check west route",
                "label": "Check west route"
              },
              {
                "value": "Verify H-8 copy",
                "label": "Verify H-8 copy"
              },
              {
                "value": "Agree digital custody",
                "label": "Agree digital custody"
              }
            ],
            "initial": [
              "Transfer copy",
              "Preserve original",
              "Confirm receipt",
              "Check west route",
              "Verify H-8 copy",
              "Agree digital custody"
            ],
            "expected": [
              "Preserve original",
              "Verify H-8 copy",
              "Agree digital custody",
              "Check west route",
              "Transfer copy",
              "Confirm receipt"
            ]
          }
        ],
        "before": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "plan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "load": 9,
            "capacity": 7,
            "revision": "Rehearsal 2: revised plan required",
            "route": [
              "20",
              "15",
              "10",
              "5",
              "0",
              "1",
              "2",
              "3"
            ],
            "sensors": [
              "5",
              "6",
              "12"
            ],
            "start": 20,
            "goal": 3,
            "predictedContacts": 1,
            "custodian": "Dr Edda Quill",
            "originalLocation": "Record dome, RD-2",
            "recipient": "Dr Tomas Venn, DB-1",
            "scenarioRun": "Rehearsal 2",
            "currentStep": 0
          },
          "labels": [
            "Digital recovery under the current charter",
            "H-ROUTE-02 west path; predicted one contact at 5"
          ],
          "focus": "revised-plan"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "plan": [
              "Preserve original",
              "Verify H-8 copy",
              "Agree digital custody",
              "Check west route",
              "Transfer copy",
              "Confirm receipt"
            ],
            "load": 9,
            "capacity": 7,
            "revision": "Rehearsal 2 completed",
            "verified": true,
            "route": [
              "20",
              "15",
              "10",
              "5",
              "0",
              "1",
              "2",
              "3"
            ],
            "sensors": [
              "5",
              "6",
              "12"
            ],
            "start": 20,
            "goal": 3,
            "predictedContacts": 1,
            "custodian": "Dr Edda Quill",
            "originalLocation": "Record dome, RD-2",
            "recipient": "Dr Tomas Venn, DB-1",
            "scenarioRun": "Rehearsal 2",
            "currentStep": 7,
            "count": 1,
            "observedTrace": [
              "20:0",
              "15:0",
              "10:0",
              "5:1",
              "0:1",
              "1:1",
              "2:1",
              "3:1"
            ],
            "receipt": "R2-RCPT-02"
          },
          "labels": [
            "Revised dependency chain tested",
            "West trace: one contact at 5",
            "R2-RCPT-02; original remains with Quill at RD-2"
          ],
          "focus": "revised-plan"
        },
        "success": "The contrasting rehearsal validates a different resolution under changed conditions.",
        "pitfall": "A copy transfer without a new agreement or receipt would leave custody unresolved.",
        "hint": "Put verification and agreement before transfer, then confirm the result.",
        "duration": 18
      },
      {
        "id": "final-run",
        "title": "Execute the current contract",
        "narration": "The final run independently verifies Cinder 30/H-8 and repeats the west trace: one predicted and observed contact at cell 5. Venn confirms DC-H8/Cinder at DB-1 in F-RCPT-03. Quill confirms original O-HAL-01 remains closed, supported and unmoved at RD-2. No unsupported original movement occurs.",
        "why": "The final record must name the resolution actually achieved.",
        "prompt": "Select the accurate final result.",
        "controls": [
          {
            "id": "resolution",
            "label": "Achieved resolution",
            "type": "select",
            "options": [
              {
                "value": "Physical extraction of the original",
                "label": "Physical extraction of the original"
              },
              {
                "value": "Verified digital recovery with original stabilised",
                "label": "Verified digital recovery with original stabilised"
              },
              {
                "value": "No evidence needed because rehearsal passed",
                "label": "No evidence needed because rehearsal passed"
              }
            ],
            "expected": "Verified digital recovery with original stabilised"
          },
          {
            "id": "acknowledged",
            "label": "Recipient and custodian records confirmed",
            "type": "toggle",
            "initial": false,
            "expected": true
          }
        ],
        "before": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "plan": [
              "Preserve original",
              "Verify H-8 copy",
              "Agree digital custody",
              "Check west route",
              "Transfer copy",
              "Confirm receipt"
            ],
            "load": 9,
            "capacity": 7,
            "selected": "Cinder",
            "revision": "Final run checks",
            "route": [
              "20",
              "15",
              "10",
              "5",
              "0",
              "1",
              "2",
              "3"
            ],
            "sensors": [
              "5",
              "6",
              "12"
            ],
            "start": 20,
            "goal": 3,
            "predictedContacts": 1,
            "custodian": "Dr Edda Quill",
            "originalLocation": "Record dome, RD-2",
            "recipient": "Dr Tomas Venn, DB-1",
            "scenarioRun": "Final run",
            "currentStep": 0
          },
          "labels": [
            "Current reference, receipt and custody",
            "Repeat H-ROUTE-02; predict one contact at 5"
          ],
          "focus": "record"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "plan": [
              "Preserve original",
              "Verify H-8 copy",
              "Agree digital custody",
              "Check west route",
              "Transfer copy",
              "Confirm receipt"
            ],
            "load": 9,
            "capacity": 7,
            "selected": "Cinder",
            "verified": true,
            "revision": "Final digital recovery recorded",
            "route": [
              "20",
              "15",
              "10",
              "5",
              "0",
              "1",
              "2",
              "3"
            ],
            "sensors": [
              "5",
              "6",
              "12"
            ],
            "start": 20,
            "goal": 3,
            "predictedContacts": 1,
            "custodian": "Dr Edda Quill",
            "originalLocation": "Record dome, RD-2",
            "recipient": "Dr Tomas Venn, DB-1",
            "scenarioRun": "Final run",
            "currentStep": 7,
            "count": 1,
            "observedTrace": [
              "20:0",
              "15:0",
              "10:0",
              "5:1",
              "0:1",
              "1:1",
              "2:1",
              "3:1"
            ],
            "receipt": "F-RCPT-03"
          },
          "labels": [
            "F-ROUTE-03: one contact at 5",
            "F-RCPT-03: Venn receives Cinder 30/H-8 at DB-1",
            "O-HAL-01 remains with Quill at RD-2"
          ],
          "focus": "record"
        },
        "success": "The final outcome meets the research-access charter within its recorded scope.",
        "pitfall": "Describing this as physical extraction would misstate the result.",
        "hint": "Name what moved and what remained in custody.",
        "duration": 18
      },
      {
        "id": "debrief",
        "title": "Defend the choice and its consequence",
        "narration": "The team account explains both rehearsals, preserved plans, individual contributions and the choice to deliver a copy. The original still needs a future supported handover if physical provenance work is required; scientific accuracy remains a separate question.",
        "why": "A complete recovery account includes consequences and credible alternatives, not only a success label.",
        "prompt": "Choose the honest final claim.",
        "controls": [
          {
            "id": "conclusion",
            "label": "Defensible debrief",
            "type": "select",
            "options": [
              {
                "value": "All future research questions are solved",
                "label": "All future research questions are solved"
              },
              {
                "value": "Reference identity and custody are verified; provenance transport and scientific accuracy retain limits",
                "label": "Reference identity and custody are verified; provenance transport and scientific accuracy retain limits"
              },
              {
                "value": "The storm proved the baseline plan was always foolish",
                "label": "The storm proved the baseline plan was always foolish"
              }
            ],
            "expected": "Reference identity and custody are verified; provenance transport and scientific accuracy retain limits"
          }
        ],
        "before": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "plan": [
              "Preserve original",
              "Verify H-8 copy",
              "Agree digital custody",
              "Check west route",
              "Transfer copy",
              "Confirm receipt"
            ],
            "load": 9,
            "capacity": 7,
            "revision": "Outcome ready for defence",
            "route": [
              "20",
              "15",
              "10",
              "5",
              "0",
              "1",
              "2",
              "3"
            ],
            "sensors": [
              "5",
              "6",
              "12"
            ],
            "start": 20,
            "goal": 3,
            "currentStep": 7,
            "count": 1,
            "observedTrace": [
              "20:0",
              "15:0",
              "10:0",
              "5:1",
              "0:1",
              "1:1",
              "2:1",
              "3:1"
            ],
            "custodian": "Dr Edda Quill",
            "originalLocation": "Record dome, RD-2",
            "recipient": "Dr Tomas Venn, DB-1",
            "receipt": "F-RCPT-03",
            "scenarioRun": "Final run"
          },
          "labels": [
            "Two rehearsals; one final record; four defences"
          ],
          "focus": "record"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Inspect arrival",
              "Restore apparatus",
              "Verify H-3 atlas",
              "Verify cradle",
              "Cross east gallery",
              "Confirm custody"
            ],
            "plan": [
              "Preserve original",
              "Verify H-8 copy",
              "Agree digital custody",
              "Check west route",
              "Transfer copy",
              "Confirm receipt"
            ],
            "load": 9,
            "capacity": 7,
            "verified": true,
            "revision": "Completed example dossier",
            "route": [
              "20",
              "15",
              "10",
              "5",
              "0",
              "1",
              "2",
              "3"
            ],
            "sensors": [
              "5",
              "6",
              "12"
            ],
            "start": 20,
            "goal": 3,
            "currentStep": 7,
            "count": 1,
            "observedTrace": [
              "20:0",
              "15:0",
              "10:0",
              "5:1",
              "0:1",
              "1:1",
              "2:1",
              "3:1"
            ],
            "custodian": "Dr Edda Quill",
            "originalLocation": "Record dome, RD-2",
            "recipient": "Dr Tomas Venn, DB-1",
            "receipt": "F-RCPT-03",
            "scenarioRun": "Final run"
          },
          "labels": [
            "Decision, result, alternatives and limits connected"
          ],
          "focus": "record"
        },
        "success": "The complete dossier can be assessed against the stated criteria without treating the ending as a grade.",
        "pitfall": "A successful copy operation does not prove every other desired outcome.",
        "hint": "Keep the conclusion no broader than the recorded checks.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "Complete final-project model submission — Operation Lamplight",
      "filename": "worked-assessment-final.md",
      "markdown": "# Complete authored final-project example — Operation Lamplight\n\n## Example status\n\nThis is a complete **authored teaching submission package** for an alternate operation at fictional Halcyon Observatory. It is not a real team's work, a record of student playtesting or an answer to Operation Last Light. The event records describe the narrated example's domain states. No physical equipment test or delivered presentation is claimed.\n\n## Mission contract\n\n**Objective:** recover usable research matching the current signed star-atlas reference while preserving the original records and an explicit custody trail.\n\n**Initial preference:** supported physical recovery. This is a method, not an unconditional objective.\n\n**Constraints:** verify content identity; verify support before movement; retain a named custodian; use the current published route and permission rules.\n\n**Stop conditions:** an unresolved identity mismatch, support below the load requirement, an unavailable route or an unconfirmed custody handoff blocks the dependent action.\n\n**Resolution alternatives:** supported original transfer, verified digital recovery, or stabilisation pending handover. Each requires a defensible match to the stated contract.\n\n## Six areas\n\n1. Arrival desk — observation, recall and initial contract.\n2. Workshop — connector and lift.\n3. Power bay — support-circuit diagnosis.\n4. Record dome — atlas comparison and permission charter.\n5. Instrumented gallery — route prediction, closure and revision.\n6. Dispatch balcony — agreement, receipt and debrief.\n\n## Team agreement and contribution record\n\n| Person | Principal role | Own evidence | Cross-role dependency reviewed |\n| --- | --- | --- | --- |\n| Lena | Observer / navigator | Arrival record, kit recall, route prediction and trace | Omar's support verification before route recommendation |\n| Omar | Systems specialist | Connector mapping, gear/readiness record, powered and isolated circuit trace | Priya's distinction between identity and physical requirements |\n| Priya | Investigator | Both manifests, copy comparisons and permission expectations | Jonah's objective and custody agreement |\n| Jonah | Coordinator | Contract, explicit handoffs, council agreement, preserved plans and receipt | Priya's current-reference result and Omar's support limit |\n\nAny member can stop a dependent action when its published prerequisite is unresolved. A result is handed to its recipient explicitly rather than assumed to be shared.\n\n## Complete evidence register\n\n- Arrival: 06:45, blue beacon, open hatch, cracked outer case. “All plates intact” remains a claim; outer damage alone does not establish internal loss.\n- Kit: Wedge, Lens, Spool, Beacon at Gate, Basin, Workshop, Dome. The first retrieval swapped the middle items; the corrected retrieval and written checklist were both retained.\n- Connector: initial north/west at level 0; clockwise 270 degrees gives west/south; translation to level 1 preserves orientation.\n- Lift: driver 24, follower 36, input 6, output 4 opposite. Interlock released, cam 270, spring attached. Ratio and readiness checked separately.\n- Circuit: powered source/fuse/cable/lamp 9/9/0/0 V; open cable diagnosed; isolated replacement; restored 9/9/9/9 V plus lamp light.\n- Initial atlas requirement: 30 sections, H-3. Aster 30/H-3; Cinder 30/H-8; Dawn 29/H-1. Aster selected under the original authority.\n- Permission charter: every role reads; maintainer services; custodian approves; all other combinations deny. Positive and negative cases checked.\n- Environmental-pack handoff: West Store / 3 / AZURE, complete read-back and confirmation.\n- Capacity: original mass 9; bare carrier capacity 7; checked cradle-supported capacity 11.\n- Baseline route: 20 → 21 → 22 → 23 → 18 → 13 → 8 → 3. Sensor set 6, 7, 12. Predicted contacts 0; model trace contacts 0.\n\n## Route verification records\n\nCells use the same five-by-five, row-major grid in every record: 0–4 are the top row and 20–24 the bottom row. Moves join orthogonally adjacent cells. A contact is recorded on entry to a listed sensor cell; one contact is an observation event, not an automatic mission failure.\n\n**Preserved baseline — B-ROUTE-01:** start 20; goal 3; route 20 → 21 → 22 → 23 → 18 → 13 → 8 → 3; sensors 6, 7, 12. Prediction: zero contacts. Authored trace: 20 (0), 21 (0), 22 (0), 23 (0), 18 (0), 13 (0), 8 (0), 3 (0), where parentheses give cumulative contacts. This original record remains unchanged.\n\n**Published storm route notice — H-ROUTE-02:** east-gallery cells 23, 18, 13 and 8 are closed. The available west path is 20 → 15 → 10 → 5 → 0 → 1 → 2 → 3. Its current published sensor pattern is 5, 6, 12. Every move is adjacent, no closed cell is entered, and the only sensor entered is cell 5. Lena predicts one contact before each execution.\n\n| West-path entry | Sensor contact on entry | Rehearsal 2 cumulative contacts | Final-run cumulative contacts |\n| --- | --- | --- | --- |\n| 20 (start) | No | 0 | 0 |\n| 15 | No | 0 | 0 |\n| 10 | No | 0 | 0 |\n| 5 | Yes | 1 | 1 |\n| 0 | No | 1 | 1 |\n| 1 | No | 1 | 1 |\n| 2 | No | 1 | 1 |\n| 3 (goal) | No | 1 | 1 |\n\n**R2-ROUTE-02, authored 07:17:** observed sequence equals the published west path; one contact at 5 matches the prior prediction. **F-ROUTE-03, authored 07:10:** the final run rechecks H-ROUTE-02, then records the same sequence and one contact independently. The earlier zero-contact result is never reused as the revised prediction.\n\n## Custody and receipt register\n\nThe original is **O-HAL-01**, the mass-nine star-atlas plate case initially held by **Dr Edda Quill**, observatory custodian, at **Record dome, stable cabinet RD-2**. The declared stable state is the closed case resting on the cabinet support with the position marker unchanged. This records preservation within the model; it does not establish the unseen condition of every plate.\n\nThe receiving archivist is **Dr Tomas Venn** at **Dispatch balcony, intake DB-1**. Jonah coordinates each handoff; Priya checks the content reference; Quill exercises the custodian approval. The digital carrier is **DC-H8**, containing the thirty-section Cinder package matching H-8. It travels along the west path; O-HAL-01 remains at RD-2. Carrier mass is 0.2 units, within the remaining capacity-seven handling limit.\n\nEach rehearsal and the final run is a separate authored simulation starting with O-HAL-01 at RD-2 under Quill's custody. The baseline's simulated movement does not remove it from the next run's initial state. All times below are authored scenario event times, not browser-measured performance.\n\n| Record | Authority and item | Transfer, location and acknowledgement |\n| --- | --- | --- |\n| B-CUST-01 / B-RCPT-01, 07:12 | Initial H-3 authority; O-HAL-01 with accompanying Aster 30/H-3 record | Quill releases the supported original to Venn at DB-1 after the capacity-eleven cradle and baseline route checks. Venn acknowledges: “Received O-HAL-01 and Aster, thirty sections, H-3, at DB-1.” Baseline end custodian: Venn; end location: DB-1. |\n| R2-CUST-02 / R2-RCPT-02, 07:26 | Signed H-8 amendment; carrier DC-H8 with Cinder 30/H-8; route R2-ROUTE-02 | Quill authorises the copy and retains O-HAL-01 at RD-2. Venn checks both section count and H-8, then acknowledges: “Received DC-H8, Cinder, thirty sections, H-8, at DB-1. Original O-HAL-01 remains with Dr Edda Quill at RD-2.” Jonah records the acknowledgement and Quill confirms the retained position marker. |\n| F-CUST-03 / F-RCPT-03, 07:19 | Current H-8 authority rechecked; carrier DC-H8 with Cinder 30/H-8; route F-ROUTE-03 | Priya repeats the count/reference check; Venn independently acknowledges the same complete copy and retained-original details under receipt F-RCPT-03. Quill confirms O-HAL-01 is still closed, supported and unmoved at RD-2. Final copy recipient: Venn at DB-1; original custodian: Quill at RD-2. |\n\nThe copy receipts do not claim transfer of the physical original. A later physical handover requires a new supported handling plan and a new custody record.\n\n## Preserved Version 1\n\nInspect arrival → restore apparatus → verify H-3 atlas → verify cradle → cross east gallery → confirm custody.\n\nSupporting conditions: H-3 reference current; east gallery available; cradle verified; supported capacity 11 for mass 9. Original objective and preferred physical method are recorded separately.\n\n## Rehearsal 1 — Baseline\n\n| Checkpoint | Predicted / required | Authored result |\n| --- | --- | --- |\n| Scene and kit | Record observations and retrieve four items | Middle-item recall substitution corrected and retained |\n| Connector / lift | West/south at level 1; 4 opposite output turns | Both requirements met |\n| Circuit | Localise supply break, isolate, verify | Open cable repaired; 9 V and light confirmed |\n| Atlas / authority | 30/H-3; authorised custodian approval | Aster selected; positive and negative permission checks agree |\n| Handling / route | Capacity 11 ≥ mass 9; east gallery available; 0 contacts | Supported path meets conditions |\n| Custody | Quill releases O-HAL-01 to Venn at DB-1 under H-3 | B-CUST-01 and B-RCPT-01 record the physical item, Aster 30/H-3, recipient, location and 07:12 acknowledgement |\n\n**Result:** supported physical recovery under baseline conditions. This result does not authorise movement after those conditions change.\n\n## Rehearsal 2 — Published storm changes\n\nNotice: the east gallery closes and the cradle is unavailable. The remaining carrier capacity is 7 for a mass-9 original. A signed amendment requires the 30-section annotated H-8 research copy.\n\n| Checkpoint | Proposed or expected | Authored result and diagnosis |\n| --- | --- | --- |\n| Reuse physical plan | Continue the successful baseline | Stopped before movement: missing cradle invalidates support |\n| Scope the change | Preserve valid evidence | Connector/circuit results retained within scope; current route and reference rechecked |\n| Current atlas | Match amended 30/H-8 authority | Cinder selected; Aster's historical H-3 result preserved |\n| New agreement | Research access with original preserved | Quill authorises DC-H8/Cinder and retains O-HAL-01, closed and supported at RD-2; R2-CUST-02 |\n| Revised route | H-ROUTE-02: 20 → 15 → 10 → 5 → 0 → 1 → 2 → 3; sensors 5, 6, 12; predicted 1 contact | R2-ROUTE-02 records the same sequence and one contact at 5; closed east cells are avoided |\n| Receipt | Venn confirms DC-H8/Cinder 30/H-8 at DB-1 and Quill's retained original at RD-2 | R2-RCPT-02 records the full acknowledgement at 07:26 |\n\n**Result:** verified digital recovery after a documented revision. No unsupported original movement occurs.\n\n## Version 2 and revision rationale\n\nPreserve original → verify H-8 copy → agree digital custody → check west route → transfer copy → confirm receipt.\n\nThe revision changes the affected transport and content conditions. It does not pretend the original baseline was unreasonable, erase its evidence or silently redefine physical recovery as digital recovery. The research-access objective remains; the preferred method changes. The original stays stable with the observatory custodian. Future physical-provenance work requires a supported handover.\n\n## Final run record\n\nCurrent checks repeat rather than inheriting permanent approval from rehearsal. Priya verifies Cinder has 30 sections/H-8 under the current signed authority. Lena reads H-ROUTE-02, predicts one contact on 20 → 15 → 10 → 5 → 0 → 1 → 2 → 3, and records one contact at 5 in F-ROUTE-03. Venn confirms receipt of DC-H8/Cinder at DB-1 in F-RCPT-03 at 07:19. Quill confirms original O-HAL-01 remains closed, supported and unmoved at RD-2 in F-CUST-03. The precise trace and acknowledgements appear in the registers above.\n\n**Resolution:** verified digital recovery with the original stabilised in place.\n\n**Consequence:** research access is achieved while physical-original transport remains outstanding. Matching a reference does not establish calibration or scientific correctness.\n\n## Team account (984 words)\n\nOperation Lamplight asked us to recover usable, verified star-atlas research from Halcyon Observatory while preserving the original instrument records. We defined success as delivering the currently authorised research copy or original with a documented custody trail. Physical removal was our initial preference, not an unconditional requirement. We agreed to stop any movement whose support conditions were unverified. This distinction mattered when the storm changed both the route and the equipment available to us.\n\nOur four roles were observer/navigator, systems specialist, investigator and coordinator. The observer owned the arrival record and route predictions. The systems specialist owned the connector, lift and support-circuit checks. The investigator owned manifest comparison and permission expectations. The coordinator owned handoffs, custody and changes to the shared plan. We required each result to reach another role: a private successful test could not silently become permission for the whole team to act. Each member also reviewed one dependency outside their main responsibility.\n\nAt the arrival desk, the observer recorded a 06:45 display, blue beacon and open inspection hatch. A note claimed all atlas plates were intact. We preserved that statement as an account rather than an observation of every plate. The cracked outer case was evidence of damage to the case, not proof that every record inside was lost. This separation prevented the atmosphere of the scene from deciding the investigation before the manifest and handling checks had taken place.\n\nThe route-kit exercise used Wedge, Lens, Spool and Beacon at Gate, Basin, Workshop and Dome. The observer initially swapped the middle two items, then strengthened the Lens-at-Basin image and retrieved the sequence with the list covered. We retained that correction. The mnemonic supported carrying a short instruction set between stations, but the written kit remained available for consequential verification. We did not turn successful recall into a claim of unlimited memory or make memory a substitute for a required check.\n\nThe workshop connector began north/west at level zero. A 270-degree clockwise rotation mapped its ports to west/south; moving it to level one changed height without changing orientation. The lift then required four output turns from six input turns using a 24-tooth driver. The systems specialist selected a 36-tooth follower, released the interlock, set the 270-degree cam and attached the spring. Six input turns produced four opposite output turns. The model trace explains both the ratio and the readiness conditions; merely showing movement would have omitted half the diagnosis.\n\nThe support circuit provided another independent check. Powered readings were nine volts at the source and fuse output, then zero after the cable and at the lamp supply. That transition supported an open cable. The specialist isolated power, replaced the cable and restored power. Nine volts at the lamp together with visible light verified the complete repair. We treated these as authored model observations, not hardware measurements, and kept the apparatus state beside each reading so isolated zeros could not be mistaken for diagnostic evidence.\n\nUnder the initial signed reference, the required atlas contained thirty sections with digest H-3. Aster met both conditions, Cinder contained thirty with H-8 after annotation, and Dawn contained twenty-nine with H-1. The investigator selected Aster and stated the limit: a digest match establishes identity against that reference, not the scientific truth of every stellar observation. The local charter allowed all roles to read, maintainers to service and custodians to approve release. We checked useful operations as well as denied ones so a blanket lockout could not masquerade as a repair.\n\nThe coordinator arranged a delivery of three environmental packs to West Store with code AZURE. The receiver read back all fields before confirmation. At the council, the original atlas had mass nine while the unsupported carrier capacity was seven. A verified cradle raised supported capacity to eleven. The custodian accepted either a documented verified-copy transfer or supported original movement under the initial research-access mandate. We selected physical recovery for the baseline rehearsal only after the cradle check, rather than treating a confident equipment claim as permission.\n\nRehearsal one used the baseline conditions. The instrumented route was 20, 21, 22, 23, 18, 13, 8, 3 with published sensor cells 6, 7 and 12. We predicted zero contacts and the recorded model trace agreed. With the cradle verified, Aster selected and custody confirmed, physical recovery met the stated conditions. We saved this as Version 1. Its success demonstrated the plan under those conditions; it did not prove that the same sequence would remain possible after the storm.\n\nThe second rehearsal introduced a published east-gallery closure and made the cradle unavailable. The unsupported carrier still had capacity seven, so moving the nine-unit original could not be justified. A signed amendment also required the annotated H-8 research copy. We stopped the original transport proposal before movement, preserved the baseline result and revised the plan. Cinder became the correct current copy; the historical Aster comparison remained valid under H-3. The coordinator negotiated verified digital recovery while leaving the original stable with the custodian.\n\nVersion 2 retained the successful connector and circuit findings within their stated scope, added a current-reference check, used the available west route and required a new receipt. The second rehearsal completed that revised chain. Our final run repeated the current checks rather than treating the rehearsal as permanent authorisation. Cinder matched thirty sections and H-8, the recipient confirmed receipt, and the original's location and custodian were recorded. The resolution was verified digital recovery with stabilisation of the original, not physical extraction.\n\nThe change preserved research access while accepting a consequence: the physical original remained at Halcyon and would require a later supported handover if provenance work demanded it. Calibration and scientific accuracy also remained separate questions. Our strongest decision was recognising that the original objective allowed a different resolution; our weakest early assumption was treating cradle availability as a stable background fact. The completed record therefore includes both successful and interrupted plans, their authorities and the checks that justified changing course.\n\n## Ten-minute presentation package\n\nThe 984-word team account above is the complete prepared spoken script. The schedule budgets speech at **130 words per minute** and rounds each spoken segment up to the next second: **458 seconds of speech**, **120 seconds for six demonstrations**, and **22 seconds for handoffs and visual transitions** total **600 seconds**. The demonstrations are silent pauses; pointing to records while speaking does not add an unbudgeted demonstration.\n\n| Segment | Speaker | Script allocation | Speech / demonstration / transition budget |\n| --- | --- | --- | --- |\n| 0:00–1:15 | Jonah | Paragraphs 1–2; 154 words. Contract, roles and stop conditions. Show objective beside preferred method while speaking. | 72 / 0 / 3 seconds |\n| 1:15–3:11 | Lena | Paragraphs 3–4; 158 words. Observation and mnemonic correction. Pause twenty seconds on the arrival record and twenty on covered-list retrieval. | 73 / 40 / 3 seconds |\n| 3:11–5:14 | Omar | Paragraphs 5–6; 173 words. Connector, lift and circuit. Pause twenty seconds at the blocked/readied mechanism and twenty on the powered trace. | 80 / 40 / 3 seconds |\n| 5:14–6:19 | Priya | Paragraph 7; 90 words. Reference identity and permissions. Pause twenty seconds on the comparison and matrix. | 42 / 20 / 3 seconds |\n| 6:19–7:02 | Jonah | Paragraph 8; 86 words. Handoff and supported capacity. Show B-CUST-01 and its actual recipient while speaking. | 40 / 0 / 3 seconds |\n| 7:02–7:42 | Lena | Paragraph 9; 79 words. Baseline route and preserved trace. Point to B-ROUTE-01 while speaking. | 37 / 0 / 3 seconds |\n| 7:42–8:44 | Priya | Paragraph 10; 83 words. Closure, missing cradle and changed authority. Pause twenty seconds on the paired H-3/H-8 records. | 39 / 20 / 3 seconds |\n| 8:44–10:00 | Jonah | Paragraphs 11–12; 161 words. Revision, final result and limits. Show the west trace and F-RCPT-03 beside both plans while speaking. | 75 / 0 / 1 second |\n\nAt a slower delivery rate the team must rehearse and shorten the spoken script before presenting; it must not silently borrow time from another segment. The full records remain available for questions outside the ten-minute presentation. This is a complete written script and timed delivery plan, not a claim that it has been performed.\n\nRole notes: Lena must distinguish a camera viewpoint from the fixed grid and the baseline zero from the revised one-contact trace; Omar must distinguish ratio from readiness and supply from output; Priya must distinguish reference identity from scientific truth; Jonah must identify Venn's copy receipt and Quill's continuing custody of O-HAL-01 at RD-2.\n\n## Individual defences\n\n### Lena — Observer / navigator (300 words)\n\nMy contribution was to make the arrival and route records specific for other roles to use. I recorded the 06:45 display, blue beacon and open hatch separately from the note claiming all plates were intact. The damaged outer case did not establish the state of every plate. I wanted the investigator to receive observations and questions, not a story that already decided the answer.\n\nI also used the four-location mnemonic for the route kit. My first retrieval exchanged Lens and Spool. Recording that substitution mattered because the second attempt could otherwise look effortless and reliable than it was. I made the Lens-at-Basin association more distinctive and retrieved again with the list covered. The written kit remained available for verification; I did not claim that memory should replace a record when a record can be carried.\n\nFor navigation I preserved the exact route and the published sensor cells before executing it. The baseline path produced zero contacts under its stated pattern. That result was not a general property of the corridor or a real surveillance claim. When the gallery closed, route availability changed independently of the old sensor prediction. I had to update the map used by the coordinator rather than merely repeat the earlier zero.\n\nMy cross-role dependency was the systems specialist's support result. A route that reached dispatch could still be unusable for an unsupported load. I therefore asked whether the cradle condition held before recommending original transport. An alternative was to focus only on the shortest path, but that would have optimised a route for a movement the equipment could not justify. The final digital transfer preserved research access, while leaving physical provenance work for a later supported handover. I can defend that choice within our charter, but I cannot use this demonstration to claim physical field proficiency.\n\n### Omar — Systems specialist (300 words)\n\nI owned the connector, lift and support-circuit checks. For the connector I predicted the labelled mapping before moving it: a 270-degree clockwise turn took north/west to west/south, and the later move to level one did not change that orientation. Keeping those two requirements separate helped the observer use my result without relying on a similar-looking silhouette.\n\nFor the lift I calculated the follower rather than selecting a familiar part. Twenty-four driver teeth multiplied by six input turns, divided by four desired output turns, gave thirty-six follower teeth. The driven shaft turned oppositely. That calculation did not establish readiness: the interlock, cam and spring had their own conditions. I recorded their states before applying input so a later reader could distinguish a blocked mechanism from a wrong ratio.\n\nThe circuit trace showed nine volts before the cable and zero after it. I used that transition to localise the supply break, isolated power for replacement and then verified both supply voltage and light. The observations belong to this authored model. I did not measure a constructed apparatus and should not present the ideal values as physical test evidence.\n\nMy most consequential action was refusing to treat the unavailable cradle as a minor inconvenience. The original had mass nine and the unsupported carrier capacity was seven. A successful lift test did not change that capacity limit. The investigator depended on this distinction when comparing physical and digital recovery options.\n\nA possible alternative was to wait for replacement support and preserve the original objective's physical preference. Our charter prioritised verified research access, so the coordinator could instead agree a digital transfer with stable custody. I supported that revision while recording that later physical movement still needed equipment verification. I would recheck the apparatus before any such handover rather than reuse this rehearsal's result indefinitely.\n\n### Priya — Investigator (300 words)\n\nI owned the relationship between a selected atlas and the authority that made it the required deliverable. Under the first signed reference, Aster's thirty sections and H-3 digest satisfied both conditions. Cinder's later annotation and H-8 digest made it different, not automatically better or malicious. Dawn's twenty-nine sections were incomplete against the request. I recorded the comparison before recommending a copy.\n\nThe storm rehearsal included a signed amendment requiring H-8. I changed the recommendation to Cinder while preserving Aster's earlier match. This was a change in the authorised target, not evidence that the original calculation had been wrong. Explicitly putting both references next to their selections made the revision understandable without pretending we had known the amendment earlier.\n\nI also checked the local permission charter. All roles needed reading, the maintainer needed service and the custodian needed release approval. Negative tests mattered because a reader should not approve release. Positive tests mattered equally because denying everything would stop legitimate recovery. The charter remained separate from the archive amendment: changing the required content did not silently change every role's authority.\n\nMy cross-role dependency was the coordinator's mission contract. If the task had required immediate physical provenance, a verified digital copy alone would not have completed it. The stated charter instead sought research access while preserving the original. I therefore supplied a bounded verification result and let the coordinator negotiate the resolution rather than claim technical certainty answered every value question.\n\nI would have challenged an unsupported statement that matching H-8 proved the scientific truth of the atlas. Identity against a signed reference is narrower than calibration or research validity. A useful next investigation would inspect the amendment's rationale and the original observation records. The final account records those limits so a successful copy transfer does not hide the questions still open.\n\n### Jonah — Coordinator (300 words)\n\nMy responsibility was to turn technical results into a justified plan. I wrote the contract as verified research access with preservation of the original. Physical recovery was our baseline method, but it was not an requirement. That distinction gave the team room to revise the method without quietly changing what we claimed to have achieved.\n\nI assigned each check an owner and identified who needed its result. For the environmental-pack handoff, the sender specified West Store, three units and AZURE. The receiver repeated all three fields before I accepted confirmation. A general statement that the team understood would not establish which instruction had been acknowledged. I treated delivery instructions as separate agreements rather than inheriting that confirmation.\n\nThe council made two constraints visible: the custodian retained responsibility for the original, and the unsupported carrier could not carry its nine-unit mass. The verified cradle made baseline physical recovery possible. When the cradle became unavailable and the east gallery closed, I stopped the transport proposal instead of asking the team to make the old plan happen regardless.\n\nI negotiated verified digital recovery after the investigator applied the signed H-8 amendment. My cross-role dependency was explicit: I needed the investigator's current-reference result and the systems specialist's statement about support. Neither a correct digest nor a working lift alone authorised every recovery method. The revised plan therefore retained the original with a named custodian and required a recipient's new confirmation of the copy.\n\nAn alternative was to delay all delivery until replacement support arrived. Under the research-access charter, that would postpone usable information without improving the immediate digital check. We chose timely verified access while documenting the physical handover. I cannot claim that this resolved provenance research or calibration. My defence is that the chosen resolution met the stated contract within its recorded limits.\n\n## Attribution\n\nAll characters, records, rules, narrative and submission examples are authored teaching material. The 3D scene and takeover controls represent those same fictional facts. They do not certify real-world security work, physical construction or a student's personal experience. A learner should transfer the method to the assigned case and submit their own recorded reasoning."
    }
  }
];

export function demonstrationById(id:string):Demonstration {
 const demo=demonstrations.find(value=>value.id===id);
 if(!demo) throw new RangeError("Unknown worked demonstration: "+id);
 return demo;
}
