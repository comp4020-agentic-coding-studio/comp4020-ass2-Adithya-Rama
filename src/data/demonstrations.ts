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
    "difference": "The conservatory uses its own 11:35 scene, a tray-check claim, an unsupported duration estimate, and a later two-feature comparison. Its recall and investigation decisions differ from the assigned scene.",
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
        "prompt": "What time does the wall clock show? Enter the time as HH:MM.",
        "controls": [
          {
            "id": "clock",
            "label": "Clock time (HH:MM)",
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
              "label": "Wall clock",
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
              "label": "Wall clock",
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
        "hint": "Read the clock hands: the short hand shows the hour, and each number on the long hand’s scale represents five minutes. Enter HH:MM.",
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
          "focus": "note",
          "items": [
            {
              "id": "clock",
              "label": "Wall clock",
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
          "focus": "note",
          "items": [
            {
              "id": "clock",
              "label": "Wall clock",
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
        "title": "Distinguish clock time from duration",
        "narration": "The wall clock reads 11:35. The demonstrator initially writes that the tray inspection lasted thirty-five minutes. No start time or elapsed-time record has been supplied, so the duration is an inference.",
        "why": "A clock reading gives a time of day. Duration needs a justified start and finish; the minute hand alone does not supply either.",
        "prompt": "Classify 'The tray inspection lasted thirty-five minutes'.",
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
            "selected": "clock"
          },
          "labels": [
            "Clock time 11:35; start time unknown"
          ],
          "focus": "clock",
          "items": [
            {
              "id": "clock",
              "label": "Wall clock",
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
            "selected": "clock"
          },
          "labels": [
            "Inspection duration remains unresolved"
          ],
          "focus": "clock",
          "items": [
            {
              "id": "clock",
              "label": "Wall clock",
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
        "success": "The proposed duration is recorded as an unsupported inference. The observation remains the 11:35 clock reading.",
        "pitfall": "Treating the minute hand as elapsed time silently invents a start at eleven o'clock.",
        "hint": "What start time would you need before this clock reading could establish thirty-five elapsed minutes?",
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
              "label": "Wall clock",
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
              "label": "Wall clock",
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
              "label": "Wall clock",
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
              "label": "Wall clock",
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
              "label": "Wall clock",
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
              "label": "Wall clock",
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
      "markdown": "# Completed demonstration example — conservatory observation record\n\nThis alternate example shows a method. It is not an answer to the assigned lab.\n\n## Initial inspection\nAt the first inspection the clock displayed 11:35, a green mug stood beside the planting ledger and the service hatch was closed. These are supplied scene observations. A visible note asserted, “I checked every tray.” The note's presence is observable; its contents remain a claim.\n\n## Reconstruction and correction\nI initially recalled the hatch as open. Rechecking the scene showed that I had inserted a familiar detail. I preserved the incorrect recollection and correction rather than rewriting the attempt. I classified “the tray inspection lasted thirty-five minutes” as an inference: the 11:35 reading alone supplies neither the inspection start nor its duration.\n\n## Changed situation\nAt the second inspection the clock read 11:50 and the hatch was open. The green mug remained unchanged. Two recorded features changed. No record established who opened the hatch or why.\n\n## Next investigation\nInspect the tray check records against the claimed complete inspection. Matching records would support the account within their scope; missing entries would require clarification.\n\n## Reflection\nMy main error was adding a plausible detail, not failing to look at an object. A regional inspection helped coverage, but preserving a separate interpretation column helped more with this mistake. In my own scene I would make the same distinction before building a story. I would not claim that two changed features prove a particular person's intent.\n\nRoute: authored 3D/interactive demonstration. Assistance: narrated example and one recorded correction."
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
    "title": "The beacon with two faults",
    "subtitle": "Repair one supply break, then explain why the same beacon still fails.",
    "skill": "Electronic fault diagnosis",
    "setting": "One fictional nine-volt beacon whose fault card permits more than one open component at the same time.",
    "difference": "The assigned browser and campus circuits each contain exactly one open fault. This single beacon contains a cable break and an open lamp together: the first correct repair restores supply but does not restore light.",
    "transfer": "Use the habit of checking the original symptom after a repair. Your assigned case promises one fault, so use its own trace and rules instead of assuming this example has revealed its component.",
    "sourceHref": "/sessions/week-05/",
    "sourceLabel": "Week 5 lab",
    "estimatedMinutes": 10,
    "steps": [
      {
        "id": "measure",
        "title": "Read the case rule and initial trace",
        "narration": "The case card says this one beacon may contain several faults at once. With power on, source and fuse outputs read 9 V; cable output and beacon supply read 0 V. The dark lamp cannot yet tell us whether its own load is healthy because supply is missing.",
        "why": "A known supply break can hide a second defect. The assigned single-fault assumption does not apply to this example.",
        "prompt": "Record the powered source and the case rule before diagnosing.",
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
          },
          {
            "id": "faultRule",
            "label": "How many faults may coexist?",
            "type": "select",
            "options": [
              {
                "value": "Exactly one fault is guaranteed",
                "label": "Exactly one fault is guaranteed"
              },
              {
                "value": "More than one fault may coexist",
                "label": "More than one fault may coexist"
              }
            ],
            "expected": "More than one fault may coexist"
          }
        ],
        "before": {
          "room": "systems",
          "shot": "establishing",
          "values": {
            "voltage": 9,
            "powered": false,
            "fault": "cable-and-lamp",
            "faultLabel": "Awaiting measurements",
            "sourceVoltage": 9
          },
          "labels": [
            "One beacon; multiple faults are possible",
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
            "fault": "cable-and-lamp",
            "faultLabel": "Supply break; load unknown",
            "sourceVoltage": 9
          },
          "labels": [
            "Powered trace: 9 / 9 / 0 / 0 V",
            "Lamp dark; load condition not yet established"
          ],
          "focus": "cable"
        },
        "success": "The trace establishes a supply interruption without declaring that it is the only defect.",
        "pitfall": "Importing the assigned lab’s one-fault guarantee would make the first diagnosis falsely exhaustive.",
        "hint": "Read this case’s fault-count rule, then separate the missing supply from the unknown lamp condition.",
        "duration": 18
      },
      {
        "id": "locate",
        "title": "Locate the first supported fault",
        "narration": "The fuse output is 9 V while the cable output is 0 V. That comparison supports an open cable. The demonstrator records a first diagnosis, not a claim that every other component is working.",
        "why": "A diagnosis should say what the measurement discriminates. A downstream unpowered load remains untested.",
        "prompt": "Identify the supported first fault and the limit of this conclusion.",
        "controls": [
          {
            "id": "fault",
            "label": "First supported open component",
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
            "id": "scope",
            "label": "What is still unresolved?",
            "type": "select",
            "options": [
              {
                "value": "The cable must be healthy",
                "label": "The cable must be healthy"
              },
              {
                "value": "Whether the lamp itself also has a fault",
                "label": "Is the lamp also faulty?"
              },
              {
                "value": "Nothing; the whole repair is already verified",
                "label": "Nothing; repair is complete"
              }
            ],
            "expected": "Whether the lamp itself also has a fault"
          }
        ],
        "before": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": true,
            "fault": "cable-and-lamp",
            "faultLabel": "Locate supply break",
            "sourceVoltage": 9
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
            "fault": "cable-and-lamp",
            "selected": "cable",
            "faultLabel": "Cable open; load unknown",
            "sourceVoltage": 9
          },
          "labels": [
            "First diagnosis: open cable",
            "Lamp condition remains unresolved"
          ],
          "focus": "cable"
        },
        "success": "The cable fault is supported while the load remains an open question.",
        "pitfall": "Finding one real fault does not establish that no other fault exists.",
        "hint": "The supply readings can locate the cable break; they cannot exercise an unpowered lamp.",
        "duration": 18
      },
      {
        "id": "isolate",
        "title": "Replace the cable while isolated",
        "narration": "The demonstrator switches the model source off and replaces only the cable supported by the trace. The lamp has not been tested or replaced. The original powered readings stay in the record.",
        "why": "Changing only the diagnosed component makes the next verification informative.",
        "prompt": "Isolate the model and choose the evidence-backed first replacement.",
        "controls": [
          {
            "id": "powered",
            "label": "Source powered during replacement",
            "type": "toggle",
            "initial": true,
            "expected": false
          },
          {
            "id": "replacement",
            "label": "Replace first",
            "type": "select",
            "options": [
              {
                "value": "Cable only",
                "label": "Cable only"
              },
              {
                "value": "Lamp only",
                "label": "Lamp only"
              },
              {
                "value": "Every component",
                "label": "Every component"
              }
            ],
            "expected": "Cable only"
          }
        ],
        "before": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": true,
            "fault": "cable-and-lamp",
            "faultLabel": "Isolate before replacement",
            "sourceVoltage": 9
          },
          "labels": [
            "Cable replacement pending",
            "Retain the original powered trace"
          ],
          "focus": "source"
        },
        "after": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": false,
            "fault": "lamp",
            "cableRepaired": true,
            "faultLabel": "Cable replaced; load unknown",
            "sourceVoltage": 9
          },
          "labels": [
            "Cable replaced with power isolated",
            "Load condition still unverified"
          ],
          "focus": "cable"
        },
        "success": "The cable is replaced without treating the untested lamp as repaired.",
        "pitfall": "Replacing everything would conceal which change resolved which symptom.",
        "hint": "Use the trace to justify one replacement and keep the source off during it.",
        "duration": 18
      },
      {
        "id": "verify",
        "title": "Let failed verification change the diagnosis",
        "narration": "Power returns to the same beacon. Source, fuse, cable output and lamp supply now all read 9 V, yet the lamp stays dark. The cable repair restored supply but did not fix the original symptom. The demonstrator keeps the first diagnosis and opens a second investigation.",
        "why": "A successful intermediate repair and an unsuccessful whole-system check can both be true.",
        "prompt": "Restore power, report the remaining symptom and decide whether the job is complete.",
        "controls": [
          {
            "id": "powered",
            "label": "Restore power",
            "type": "toggle",
            "initial": false,
            "expected": true
          },
          {
            "id": "verification",
            "label": "Observed output after cable repair",
            "type": "select",
            "options": [
              {
                "value": "Lamp lit; repair complete",
                "label": "Lamp lit; repair complete"
              },
              {
                "value": "9 V at the lamp, but the lamp is still dark",
                "label": "9 V present; lamp still dark"
              }
            ],
            "expected": "9 V at the lamp, but the lamp is still dark"
          },
          {
            "id": "complete",
            "label": "Whole beacon verified working",
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
            "powered": false,
            "fault": "lamp",
            "cableRepaired": true,
            "faultLabel": "Output not yet verified",
            "sourceVoltage": 9
          },
          "labels": [
            "Cable replacement complete",
            "Whole beacon not yet tested"
          ],
          "focus": "beacon"
        },
        "after": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": true,
            "fault": "lamp",
            "cableRepaired": true,
            "verified": false,
            "faultLabel": "Supply OK; lamp dark",
            "sourceVoltage": 9
          },
          "labels": [
            "After cable repair: 9 / 9 / 9 / 9 V",
            "Same beacon remains dark"
          ],
          "focus": "beacon"
        },
        "success": "The record preserves a valid cable repair and a failed complete-system verification.",
        "pitfall": "Counting healthy supply as success would leave the original dark-beacon problem unresolved.",
        "hint": "Compare the light output with the original symptom as well as reading the voltage.",
        "duration": 18
      },
      {
        "id": "load",
        "title": "Test the newly exposed load fault",
        "narration": "The healthy 9 V supply and still-dark output make a load check informative. The demonstrator isolates the source and tests lamp continuity. The authored result is open: the same beacon had an open lamp as well as the cable break.",
        "why": "Restoring one prerequisite can expose a defect that the original measurements could not distinguish.",
        "prompt": "Choose the next discriminating test and its required power state.",
        "controls": [
          {
            "id": "test",
            "label": "Next test",
            "type": "select",
            "options": [
              {
                "value": "Repeat the healthy source voltage",
                "label": "Repeat the healthy source voltage"
              },
              {
                "value": "Check lamp continuity with power isolated",
                "label": "Isolate; test lamp continuity"
              },
              {
                "value": "Replace the already verified cable again",
                "label": "Replace the cable again"
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
            "fault": "lamp",
            "cableRepaired": true,
            "faultLabel": "Test load while isolated",
            "sourceVoltage": 9
          },
          "labels": [
            "Healthy supply, dark output",
            "Choose a test of the load"
          ],
          "focus": "beacon"
        },
        "after": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": false,
            "fault": "lamp",
            "cableRepaired": true,
            "continuity": "open",
            "faultLabel": "Lamp continuity: OPEN",
            "sourceVoltage": 9
          },
          "labels": [
            "Isolated lamp continuity: OPEN",
            "Second defect confirmed in the same beacon"
          ],
          "focus": "beacon"
        },
        "success": "Isolated continuity identifies the second fault without invalidating the earlier cable diagnosis.",
        "pitfall": "Repeating the source reading adds no evidence about the load itself.",
        "hint": "The remaining question is whether the lamp has a complete internal path, with power isolated.",
        "duration": 18
      },
      {
        "id": "conclude",
        "title": "Repair the second fault and verify the whole beacon",
        "narration": "With power still isolated, the demonstrator replaces the confirmed open lamp. Restored power now gives 9 V at every supply node and visible light. The final record retains both faults, the incomplete first repair and the final verification; no second beacon or reset was introduced.",
        "why": "Completion follows a check of the original system requirement after all supported repairs, not simply the first successful intervention.",
        "prompt": "Choose the second replacement, restore power and state what the complete trace established.",
        "controls": [
          {
            "id": "replacement",
            "label": "Second isolated replacement",
            "type": "select",
            "options": [
              {
                "value": "Lamp",
                "label": "Lamp"
              },
              {
                "value": "Cable again",
                "label": "Cable again"
              },
              {
                "value": "Source",
                "label": "Source"
              }
            ],
            "expected": "Lamp"
          },
          {
            "id": "powered",
            "label": "Restore power after lamp replacement",
            "type": "toggle",
            "initial": false,
            "expected": true
          },
          {
            "id": "conclusion",
            "label": "Diagnostic lesson",
            "type": "select",
            "options": [
              {
                "value": "The first diagnosis was wrong because the beacon stayed dark",
                "label": "The cable diagnosis was wrong"
              },
              {
                "value": "Two coexisting faults required two justified repairs and a final output check",
                "label": "Two faults; verify both repairs"
              },
              {
                "value": "Every circuit always has two faults",
                "label": "Every circuit has two faults"
              }
            ],
            "expected": "Two coexisting faults required two justified repairs and a final output check"
          }
        ],
        "before": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 9,
            "powered": false,
            "fault": "lamp",
            "cableRepaired": true,
            "continuity": "open",
            "faultLabel": "Lamp fault confirmed",
            "sourceVoltage": 9
          },
          "labels": [
            "Lamp continuity confirmed open",
            "Replace this lamp while isolated"
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
            "cableRepaired": true,
            "lampRepaired": true,
            "verified": true,
            "faultLabel": "Repairs verified",
            "sourceVoltage": 9
          },
          "labels": [
            "Final trace: 9 / 9 / 9 / 9 V; light ON",
            "Both repairs and failed interim check preserved"
          ],
          "focus": "beacon"
        },
        "success": "The same beacon now meets its supply and light requirements after two evidence-backed repairs.",
        "pitfall": "Neither a one-fault assumption nor an “always two faults” rule transfers safely to a different published case.",
        "hint": "Name both established defects and the final observation that proves this beacon’s original symptom is resolved.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "Completed example — beacon with two faults",
      "filename": "worked-lab-05.md",
      "markdown": "# Completed demonstration example — beacon with two faults\n\nThis is one fictional nine-volt beacon throughout the attempt. Its published case card allows multiple simultaneous open faults. The assigned browser and campus lab instead introduce exactly one fault at a time.\n\n## Initial evidence and first diagnosis\nWith power on, source / fuse output / cable output / lamp supply read **9 / 9 / 0 / 0 V** relative to the common return. The lamp was dark. The first missing supply supported an open cable. The unpowered lamp's own condition remained unresolved; the readings did not prove it healthy.\n\n## First repair and failed whole-system check\nI isolated the source and replaced the cable only. After restoring power, the trace became **9 / 9 / 9 / 9 V**, but the **same beacon stayed dark**. The repair successfully restored supply without resolving the original symptom. I preserved both statements instead of calling the cable diagnosis wrong or declaring the job complete.\n\n## Second diagnosis and repair\nWith healthy supply and a dark load, I isolated power and tested lamp continuity. The result was **open**. I replaced that confirmed open lamp while isolated, then restored power. The supply remained **9 / 9 / 9 / 9 V** and the lamp lit.\n\n## Preserved diagnostic chain\n\n| Stage | Supported finding | Action | Verification |\n| --- | --- | --- | --- |\n| Initial trace | Open cable; lamp condition unknown | Isolated cable replacement | Supply restored, light still absent |\n| Same beacon after first repair | Healthy lamp supply, dark output | Isolated lamp continuity test | Open load confirmed |\n| Confirmed second fault | Open lamp as well as the earlier cable break | Isolated lamp replacement | 9 V supply and visible light |\n\n## Reflection\nMy first diagnosis was useful but incomplete. Assuming it explained the entire symptom would have stopped the investigation too early. The failed output check changed what I needed to test, without erasing the evidence that justified the cable replacement. In a new case I would read whether its rules permit multiple faults, diagnose from its own trace and check the original symptom after every repair. This example does not establish that the assigned one-fault circuit has two defects.\n\n## Limits\nThese are idealised authored model readings, not measurements from constructed hardware. A continuity check is performed only in the model's isolated state. The record establishes this fictional apparatus's behaviour and does not certify work on an arbitrary physical circuit.\n\nNamed output: circuit-diagnosis. Assistance: complete narrated worked example.\n"
    }
  },
  {
    "id": "lab-06",
    "kind": "lab",
    "week": 6,
    "title": "The request that is not yet authority",
    "subtitle": "Keep a valid decision through an unsigned request, then verify a repaired record under a genuine amendment.",
    "skill": "Digital investigation",
    "setting": "Three weather ledgers, an initially valid signed request, an unsigned proposed change and a later authenticated amendment with a repaired candidate.",
    "difference": "An unsigned request cannot supersede the current authority. A later authenticated instruction and a separately verified repair justify a new selection; this example requires checking both authority and version identity.",
    "transfer": "Compare completeness and identity under your assigned source, and establish whether a new instruction is authoritative before revising a decision. This example’s unsigned message, repaired candidate and North-to-South outcome are not assigned answers.",
    "sourceHref": "/sessions/week-06/",
    "sourceLabel": "Week 6 lab",
    "estimatedMinutes": 11,
    "steps": [
      {
        "id": "contract",
        "title": "Identify which instruction can govern the choice",
        "narration": "The published rule says that only an instruction marked authenticated in the supplied authority register can supersede the current request. Signed request R1 requires 18 sections with digest Q-7. North is 18/Q-7 at 07:50; East is 18/Q-9 at 07:20; South is 17/Q-2 at 07:35. The three book objects represent these version records.",
        "why": "A content match and an authorised requirement are separate conditions. A message about a new requirement is not automatically authority to change it.",
        "prompt": "Record the required count and the rule for changing the request.",
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
          },
          {
            "id": "authority",
            "label": "What may supersede R1?",
            "type": "select",
            "options": [
              {
                "value": "Any later message",
                "label": "Any later message"
              },
              {
                "value": "An instruction marked authenticated in the authority register",
                "label": "Authenticated instruction"
              },
              {
                "value": "Whichever file has the newest timestamp",
                "label": "Newest file wins"
              }
            ],
            "expected": "An instruction marked authenticated in the authority register"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "establishing",
          "values": {
            "count": 18,
            "authority": "signed-R1",
            "verified": false
          },
          "labels": [
            "Authenticated R1: 18 sections / Q-7",
            "Only authenticated instructions can supersede R1"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:50"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:20"
            },
            {
              "id": "South",
              "label": "South original",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:35"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "authority": "signed-R1",
            "verified": false
          },
          "labels": [
            "Authority rule recorded",
            "R1 remains the current request"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:50"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:20"
            },
            {
              "id": "South",
              "label": "South original",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:35"
            }
          ]
        },
        "success": "The comparison has both a completeness requirement and an explicit authority rule.",
        "pitfall": "Treating any later message as an amendment would remove the very check this case requires.",
        "hint": "Use the supplied authority register, not a sender’s confident wording or a file timestamp.",
        "duration": 18
      },
      {
        "id": "timeline",
        "title": "Separate chronology from selection",
        "narration": "The records arrived East, South, North. North is newest in this example. Recency alone neither qualifies nor disqualifies it: the next step must still compare count and digest with authenticated R1.",
        "why": "“Never choose the newest” is as unsupported as “always choose the newest.” Timing and content answer different questions.",
        "prompt": "Order the records without treating their order as the selection rule.",
        "controls": [
          {
            "id": "timeline",
            "label": "Record timeline",
            "type": "order",
            "options": [
              {
                "value": "East 07:20",
                "label": "East 07:20"
              },
              {
                "value": "South 07:35",
                "label": "South 07:35"
              },
              {
                "value": "North 07:50",
                "label": "North 07:50"
              }
            ],
            "initial": [
              "North 07:50",
              "East 07:20",
              "South 07:35"
            ],
            "expected": [
              "East 07:20",
              "South 07:35",
              "North 07:50"
            ]
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "authority": "signed-R1"
          },
          "labels": [
            "East 07:20 / South 07:35 / North 07:50",
            "Newest can be correct, but needs evidence"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:50"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:20"
            },
            {
              "id": "South",
              "label": "South original",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:35"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "authority": "signed-R1",
            "itemsOrder": [
              "East 07:20",
              "South 07:35",
              "North 07:50"
            ]
          },
          "labels": [
            "Chronology recorded separately",
            "Now check count and digest against R1"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:50"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:20"
            },
            {
              "id": "South",
              "label": "South original",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:35"
            }
          ]
        },
        "success": "The timeline is recorded without turning newest or oldest into an authenticity rule.",
        "pitfall": "Rejecting North merely because it is newest replaces evidence with a blanket recency rule.",
        "hint": "Sort the times first; save the selection for the reference comparison.",
        "duration": 18
      },
      {
        "id": "compare",
        "title": "Select the copy supported by R1",
        "narration": "North has both the required 18 sections and Q-7 digest. East is complete but differs from R1; the original South is incomplete and has Q-2. The demonstrator selects North because it meets both requirements, not because it is newest.",
        "why": "The same candidate can be newest and correct; only the actual count and reference comparison justify that decision.",
        "prompt": "Select the version that meets authenticated R1.",
        "controls": [
          {
            "id": "selected",
            "label": "Selection under R1",
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
            "authority": "signed-R1",
            "verified": false
          },
          "labels": [
            "R1 requires 18 / Q-7",
            "North 18/Q-7; East 18/Q-9; South 17/Q-2"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:50"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:20"
            },
            {
              "id": "South",
              "label": "South original",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:35"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "authority": "signed-R1",
            "verified": true,
            "selected": "North"
          },
          "labels": [
            "North verified under authenticated R1",
            "Historical selection preserved"
          ],
          "focus": "North",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:50"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:20"
            },
            {
              "id": "South",
              "label": "South original",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:35"
            }
          ]
        },
        "success": "North is supported by count and digest under the current authenticated request.",
        "pitfall": "A correct answer reached only by timestamp luck is weaker than the stated two-part check.",
        "hint": "Require both completeness and the digest named by R1.",
        "duration": 18
      },
      {
        "id": "limit",
        "title": "Do not promote an unsigned message into authority",
        "narration": "At 08:00 an unsigned message says “Use East, Q-9 instead.” The authority register marks that message unverified. Nothing has superseded R1. The demonstrator records the proposed change as a claim, keeps North as the current authorised selection, and asks for an authenticated instruction.",
        "why": "A plausible or later instruction can remain a claim. Preserving a valid decision while checking authority is an active evidence-based response.",
        "prompt": "Classify the proposed change and decide which version is currently authorised.",
        "controls": [
          {
            "id": "status",
            "label": "Status of the 08:00 message",
            "type": "select",
            "options": [
              {
                "value": "Authenticated amendment",
                "label": "Authenticated amendment"
              },
              {
                "value": "Unverified request requiring confirmation",
                "label": "Unverified; ask for authority"
              },
              {
                "value": "Proof that East is scientifically correct",
                "label": "East is scientifically proven"
              }
            ],
            "expected": "Unverified request requiring confirmation"
          },
          {
            "id": "selected",
            "label": "Current selection while authority is unresolved",
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
            "authority": "signed-R1",
            "proposedDigest": "Q-9",
            "selected": "North"
          },
          "labels": [
            "08:00 message: use East / Q-9",
            "Authority register: UNVERIFIED"
          ],
          "focus": "North",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:50"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:20"
            },
            {
              "id": "South",
              "label": "South original",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:35"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "authority": "signed-R1",
            "messageStatus": "claim",
            "verified": true,
            "selected": "North"
          },
          "labels": [
            "Retain North under R1",
            "Request authentication; do not erase the valid comparison"
          ],
          "focus": "North",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:50"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:20"
            },
            {
              "id": "South",
              "label": "South original",
              "shape": "book",
              "color": "#a4afc7",
              "text": "17 sections / Q-2 / 07:35"
            }
          ]
        },
        "success": "The unsigned proposal is preserved as a claim and North remains valid under R1.",
        "pitfall": "Immediately switching to East would treat an unverified request as an authenticated instruction.",
        "hint": "A later message has not changed the active requirement unless the authority register authenticates it.",
        "duration": 18
      },
      {
        "id": "amend",
        "title": "Check genuine authority and a repaired version independently",
        "narration": "The register later authenticates instruction R2, issued at 08:15, requiring 18 sections with Q-12. It does not authenticate the earlier Q-9 message. A repair receipt publishes South version S2 at 08:20: 18 sections and Q-12. South’s original 17/Q-2 record remains preserved. The demonstrator checks both the new authority and the repaired version before selecting South S2.",
        "why": "An authoritative requirement does not repair a file, and a repaired file does not authorise itself. Both new facts must be verified.",
        "prompt": "Confirm the authenticated instruction and choose the version that now satisfies it.",
        "controls": [
          {
            "id": "authenticated",
            "label": "R2 marked authenticated in supplied register",
            "type": "toggle",
            "initial": false,
            "expected": true
          },
          {
            "id": "selected",
            "label": "Selection under authenticated R2",
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
            "expected": "South"
          },
          {
            "id": "version",
            "label": "South version to transfer",
            "type": "select",
            "options": [
              {
                "value": "Original 17-section Q-2 version",
                "label": "Original 17-section Q-2 version"
              },
              {
                "value": "Repaired S2: 18 sections / Q-12",
                "label": "Repaired S2: 18 sections / Q-12"
              }
            ],
            "expected": "Repaired S2: 18 sections / Q-12"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "authority": "signed-R2",
            "verified": false,
            "oldSouth": "17 / Q-2 / 07:35",
            "selected": "North"
          },
          "labels": [
            "Authenticated R2: 18 / Q-12",
            "South S2 repair receipt: 18 / Q-12 at 08:20"
          ],
          "focus": "North",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:50"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:20"
            },
            {
              "id": "South",
              "label": "South repaired version",
              "shape": "book",
              "color": "#a4afc7",
              "text": "18 sections / Q-12 / 08:20; earlier 17/Q-2 retained"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "authority": "signed-R2",
            "verified": true,
            "revision": "North under R1 → South S2 under authenticated R2",
            "oldSouth": "17 / Q-2 / 07:35",
            "selected": "South"
          },
          "labels": [
            "South S2 matches R2",
            "North under R1 and original South retained"
          ],
          "focus": "South",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:50"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:20"
            },
            {
              "id": "South",
              "label": "South repaired version",
              "shape": "book",
              "color": "#a4afc7",
              "text": "18 sections / Q-12 / 08:20; earlier 17/Q-2 retained"
            }
          ]
        },
        "success": "South S2 is supported by authenticated R2 and its new completeness and identity checks.",
        "pitfall": "Neither the unsigned East request nor the old incomplete South record satisfies R2.",
        "hint": "Check the instruction’s authentication and the repaired version’s 18 sections/Q-12 separately.",
        "duration": 18
      },
      {
        "id": "record",
        "title": "Preserve the decision that stayed and the decision that changed",
        "narration": "The final timeline retains North under R1, the rejected-as-authority unsigned East request, and South S2 under authenticated R2. It also retains South’s earlier incomplete version. The demonstrator limits the conclusion to authority, completeness and identity; the weather observations still need their own scientific checks.",
        "why": "A traceable record explains why one proposed change was withheld and a later different change was justified.",
        "prompt": "Choose the conclusion that preserves the full sequence and its limit.",
        "controls": [
          {
            "id": "recommendation",
            "label": "Final recommendation",
            "type": "select",
            "options": [
              {
                "value": "East became authorised as soon as the unsigned message arrived",
                "label": "Unsigned request approves East"
              },
              {
                "value": "North stayed authorised under R1; authenticated R2 and the repaired S2 record later justified South; scientific truth remains unchecked",
                "label": "Retain R1; verify R2 and S2"
              },
              {
                "value": "South was complete all along and the earlier records can be deleted",
                "label": "Erase South’s earlier failure"
              }
            ],
            "expected": "North stayed authorised under R1; authenticated R2 and the repaired S2 record later justified South; scientific truth remains unchecked"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "authority": "signed-R2",
            "verified": true,
            "selected": "South"
          },
          "labels": [
            "Keep R1 / unsigned proposal / R2 separate",
            "Keep original South and repaired S2 separate"
          ],
          "focus": "South",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:50"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:20"
            },
            {
              "id": "South",
              "label": "South repaired version",
              "shape": "book",
              "color": "#a4afc7",
              "text": "18 sections / Q-12 / 08:20; earlier 17/Q-2 retained"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "count": 18,
            "authority": "signed-R2",
            "verified": true,
            "selected": "South"
          },
          "labels": [
            "Final: South S2 under authenticated R2",
            "History preserved; scientific accuracy remains separate"
          ],
          "focus": "South",
          "items": [
            {
              "id": "North",
              "label": "North record",
              "shape": "book",
              "color": "#8bbca0",
              "text": "18 sections / Q-7 / 07:50"
            },
            {
              "id": "East",
              "label": "East record",
              "shape": "book",
              "color": "#c89179",
              "text": "18 sections / Q-9 / 07:20"
            },
            {
              "id": "South",
              "label": "South repaired version",
              "shape": "book",
              "color": "#a4afc7",
              "text": "18 sections / Q-12 / 08:20; earlier 17/Q-2 retained"
            }
          ]
        },
        "success": "The completed record explains both retaining a valid selection and making a later justified revision.",
        "pitfall": "A final correct file name cannot replace the explanation of which authority and which version made it correct.",
        "hint": "Include the unchanged decision at 08:00, the later authenticated change, the repaired version and the remaining limit.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "Completed example — request authority and repaired weather ledger",
      "filename": "worked-lab-06.md",
      "markdown": "# Completed demonstration example — request authority and repaired weather ledger\n\nThis alternate example changes the authority problem. The assigned browser and campus transfer immediately provides a valid signed amendment. Here an unsigned message is not sufficient, and the later valid deliverable is a newly repaired version of a previously incomplete record.\n\n## Published authority rule\nOnly an instruction marked authenticated in the supplied authority register can supersede the current request. This is a fictional case-file rule; no live signature service is contacted.\n\n## Preserved timeline\n\n| Time | Record | Direct result | Decision or limit |\n| --- | --- | --- | --- |\n| 07:05 | Authenticated R1 | Requires 18 sections and Q-7 | Governs the initial comparison |\n| 07:20 | East | 18 sections, Q-9 | Complete but does not match R1 |\n| 07:35 | Original South | 17 sections, Q-2 | Incomplete and different from R1 |\n| 07:50 | North | 18 sections, Q-7 | Matches R1, although it is newest |\n| 08:00 | Unsigned message | Says “Use East, Q-9”; register marks unverified | Record as a claim; retain North under R1 and request authentication |\n| 08:15 | Authenticated R2 | Requires 18 sections and Q-12 | Legitimately supersedes R1; does not authenticate the earlier Q-9 message |\n| 08:20 | South repair receipt S2 | Repaired version contains 18 sections and Q-12 | Verify this new version; select South S2 under R2 |\n\n## Preserved recommendations\n1. **Under R1:** select North after count and digest checks. Its newer timestamp neither proves nor disproves correctness.\n2. **After the unsigned message:** retain North as the currently authorised deliverable. Preserve the request, ask for authenticated authority and do not quietly promote the claim into a rule.\n3. **Under authenticated R2:** select South **S2**, after separately checking authentication, 18 sections and Q-12. Preserve the original South record at 17/Q-2 and the original North justification.\n\n## Two independent checks\nAuthentication established what the current instruction required. The repair receipt and new comparison established what South S2 contained. Neither check could substitute for the other. The old incomplete South file was not silently rewritten into a successful historical result.\n\n## Limits and next check\nAgreement with the authenticated reference establishes identity and completeness within this case. It does not prove the scientific accuracy of the weather observations. The unsigned Q-9 proposal remains an unverified account; the later R2 does not retroactively authorise it. Its origin and purpose would need separate investigation.\n\n## Reflection\nI initially expected a later request to trigger a different selection. The authority rule showed why keeping North at 08:00 was the justified action. When an authenticated instruction and a newly repaired record later appeared, I changed to South S2 for two explicit reasons. The useful method is to verify authority and content, not to memorise “choose the first copy, then the second.” My assigned case has different rules and records, so I must read those afresh.\n\nNamed output: evidence-timeline. Demonstration material, not an assigned response.\n"
    }
  },
  {
    "id": "lab-07",
    "kind": "lab",
    "week": 7,
    "title": "The embargoed observatory charter",
    "subtitle": "A complete alternate worked example, followed by meaningful takeover practice.",
    "skill": "Permission diagnosis",
    "setting": "A telescope console separates research-reading authority from equipment-maintenance authority.",
    "difference": "This local charter permits equipment maintenance without research reading and contains two opposite permission faults. Derive the matrix from this embargo charter, then derive a fresh matrix from your assigned task's own rules.",
    "transfer": "Derive every permission from its local charter. Retain required work, repair missing and excess rights, then apply a narrow release hold.",
    "sourceHref": "/sessions/week-07/",
    "sourceLabel": "Week 7 lab",
    "estimatedMinutes": 8,
    "steps": [
      {
        "id": "mandate",
        "title": "Derive rights from this charter",
        "narration": "The research embargo separates two responsibilities. Readers may read research; maintainers may service equipment but may not read research; custodians may read and approve release. Every other combination is denied. A job title does not imply extra access.",
        "why": "Equipment responsibility and research visibility are separate permissions in this local model.",
        "prompt": "Which action is the maintainer authorised to perform?",
        "controls": [
          {
            "id": "role",
            "label": "Maintainer authority",
            "type": "select",
            "options": [
              {
                "value": "Service only",
                "label": "Service only"
              },
              {
                "value": "Read and service",
                "label": "Read and service"
              },
              {
                "value": "Read and approve",
                "label": "Read and approve"
              }
            ],
            "expected": "Service only"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "establishing",
          "values": {
            "policy": [
              "reader:read:deny",
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
            "Reader: read only",
            "Maintainer: service only; no research reading",
            "Custodian: read and approve"
          ],
          "focus": "policy"
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:deny",
              "reader:service:deny",
              "reader:approve:deny",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ],
            "role": "maintainer"
          },
          "labels": [
            "Expected: maintainer service allowed; research read denied"
          ],
          "focus": "policy"
        },
        "success": "The maintainer needs service access without research visibility. The local charter defines the expected result.",
        "pitfall": "Assuming every signed-in role must read would reproduce the defect.",
        "hint": "Find the explicit embargo restriction before inferring rights from a role name.",
        "duration": 18
      },
      {
        "id": "negative",
        "title": "Record an excess right and a missing right",
        "narration": "The observed policy allows maintainer reading even though the embargo forbids it. It also denies reader reading even though the charter requires it. The demonstrator records both failures before changing anything.",
        "why": "A policy can simultaneously expose information and prevent legitimate work.",
        "prompt": "Record the observed results, even though both contradict the charter.",
        "controls": [
          {
            "id": "observedMaintainerRead",
            "label": "Observed maintainer / read",
            "type": "select",
            "options": [
              {
                "value": "Allow",
                "label": "Allow"
              },
              {
                "value": "Deny",
                "label": "Deny"
              }
            ],
            "expected": "Allow"
          },
          {
            "id": "observedReaderRead",
            "label": "Observed reader / read",
            "type": "select",
            "options": [
              {
                "value": "Allow",
                "label": "Allow"
              },
              {
                "value": "Deny",
                "label": "Deny"
              }
            ],
            "expected": "Deny"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:deny",
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
            "Maintainer/read expected deny; observed allow",
            "Reader/read expected allow; observed deny"
          ],
          "focus": "policy"
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:deny",
              "reader:service:deny",
              "reader:approve:deny",
              "maintainer:read:allow",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ],
            "role": "maintainer"
          },
          "labels": [
            "Two failed tests retained before repair"
          ],
          "focus": "policy"
        },
        "success": "The audit preserves a forbidden success and a required operation that failed. Both need repair.",
        "pitfall": "Recording only the excessive permission would miss the blocked reader.",
        "hint": "Separate what the charter expects from what the faulty table does.",
        "duration": 18
      },
      {
        "id": "repair",
        "title": "Repair the two affected decisions",
        "narration": "The demonstrator denies maintainer reading and restores reader reading. Maintainer service remains allowed. Custodian reading and release approval remain allowed. The other four denied combinations are retained.",
        "why": "The repair must remove excess authority and restore required work without inventing a broader role.",
        "prompt": "Choose the smallest complete repair.",
        "controls": [
          {
            "id": "rule",
            "label": "Policy repair",
            "type": "select",
            "options": [
              {
                "value": "Deny maintainer reading and allow reader reading",
                "label": "Deny maintainer; allow reader"
              },
              {
                "value": "Allow every role to read",
                "label": "Allow every role to read"
              },
              {
                "value": "Deny every operation",
                "label": "Deny every operation"
              }
            ],
            "expected": "Deny maintainer reading and allow reader reading"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {
            "policy": [
              "reader:read:deny",
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
            "Two incorrect cells in the original table"
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
              "maintainer:read:deny",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ]
          },
          "labels": [
            "Reader/read restored",
            "Maintainer/read denied",
            "Other seven decisions preserved"
          ],
          "focus": "policy"
        },
        "success": "Exactly the two observed mismatches are corrected under the published charter.",
        "pitfall": "Denying all reading prevents the exposure but also violates reader and custodian duties.",
        "hint": "There are two errors, not one; the other seven cells already match.",
        "duration": 18
      },
      {
        "id": "positive",
        "title": "Check that useful work remains possible",
        "narration": "The repaired policy passes all nine expected decisions. Positive checks include reader reading, maintainer service and custodian approval. Negative checks include maintainer reading and reader approval. The demonstrator records the complete table.",
        "why": "Testing only forbidden requests cannot show whether a repair preserves useful work.",
        "prompt": "Set the two regression results that distinguish this charter.",
        "controls": [
          {
            "id": "readerRead",
            "label": "Reader may read research",
            "type": "toggle",
            "initial": false,
            "expected": true
          },
          {
            "id": "maintainerRead",
            "label": "Maintainer may read research",
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
              "maintainer:read:deny",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ]
          },
          "labels": [
            "Retest all nine role/action pairs"
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
              "maintainer:read:deny",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ],
            "verified": true
          },
          "labels": [
            "Reader/read allowed",
            "Maintainer/read denied; service allowed",
            "Custodian/approve allowed"
          ],
          "focus": "policy"
        },
        "success": "The reading results differ by role; the repaired table also preserves maintenance and release duties.",
        "pitfall": "Giving every role research-reading permission would violate this embargo.",
        "hint": "Reading is allowed to reader and custodian only.",
        "duration": 18
      },
      {
        "id": "hold",
        "title": "Apply a release hold without changing the embargo",
        "narration": "A new signed release hold suspends custodian approval. Reader and custodian reading remain permitted. Maintainer service remains permitted, while maintainer research reading is still forbidden. Version 1 is retained beside the changed authority.",
        "why": "An authorised change must be scoped to the operation it names.",
        "prompt": "Apply the release hold.",
        "controls": [
          {
            "id": "custodianApprove",
            "label": "Custodian approval during release hold",
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
              "maintainer:read:deny",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:allow"
            ],
            "revision": "V1 retained: embargo charter"
          },
          "labels": [
            "New notice: suspend release approval only"
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
              "maintainer:read:deny",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:deny"
            ],
            "revision": "V2: release hold"
          },
          "labels": [
            "Custodian/approve now denied",
            "Embargo and service rules unchanged"
          ],
          "focus": "policy"
        },
        "success": "Only custodian approval changes. The earlier matrix was correct under its original authority.",
        "pitfall": "Treating the hold as permission to reveal embargoed records changes an unrelated rule.",
        "hint": "The notice names approval; it neither grants research access nor suspends maintenance.",
        "duration": 18
      },
      {
        "id": "audit",
        "title": "Explain repair separately from authorised change",
        "narration": "The completed audit keeps the original two failures, the nine-cell repaired matrix, the positive and negative checks, and the later release hold. The demonstrator labels each with its governing charter or notice.",
        "why": "A reviewer must distinguish a bug from a changed requirement.",
        "prompt": "Choose the explanation that preserves both events.",
        "controls": [
          {
            "id": "status",
            "label": "Reason for the two versions",
            "type": "select",
            "options": [
              {
                "value": "V1 repairs two bugs; V2 applies a new release hold",
                "label": "V1: bug fixes; V2: new hold"
              },
              {
                "value": "The old charter never applied",
                "label": "The old charter never applied"
              },
              {
                "value": "Both versions permit maintainers to read",
                "label": "Maintainer may read in both"
              }
            ],
            "expected": "V1 repairs two bugs; V2 applies a new release hold"
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
              "maintainer:read:deny",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:deny"
            ],
            "revision": "V1 and V2 comparison"
          },
          "labels": [
            "Bug repair and authority change are separate"
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
              "maintainer:read:deny",
              "maintainer:service:allow",
              "maintainer:approve:deny",
              "custodian:read:allow",
              "custodian:service:deny",
              "custodian:approve:deny"
            ],
            "revision": "Two bugs repaired; later hold scoped",
            "verified": true
          },
          "labels": [
            "Expected, observed and authority recorded"
          ],
          "focus": "policy"
        },
        "success": "The audit explains each changed result without rewriting the historical charter.",
        "pitfall": "A clean final table alone conceals why earlier outcomes differed.",
        "hint": "Attach the governing rule to the result, not just the date.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "The embargoed observatory charter — completed record",
      "filename": "worked-lab-07.md",
      "markdown": "# Completed demonstration example — embargoed observatory permission audit\n\n**Authored alternate example.** Read this local research embargo before deciding any permission.\n\n## Published authority\nReader: read research only. Maintainer: service equipment only; embargoed research is not readable. Custodian: read research and approve release. Every other combination is denied.\n\n## Preserved faulty results\n| Request | Expected | Observed before repair |\n| --- | --- | --- |\n| Maintainer / read | Deny | Allow |\n| Reader / read | Allow | Deny |\n\nThe other seven decisions already matched. The first failure exposed an embargoed resource; the second blocked an authorised reader.\n\n## Version 1 — repaired charter\n| Role | Read | Service | Approve |\n| --- | --- | --- | --- |\n| Reader | Allow | Deny | Deny |\n| Maintainer | Deny | Allow | Deny |\n| Custodian | Allow | Deny | Allow |\n\nAll nine cells were compared with the charter. Positive checks preserved reader reading, maintainer service and custodian reading/approval. Negative checks retained the embargo and remaining limits. The repair changed only maintainer/read and reader/read.\n\n## Version 2 — new release hold\nA later signed notice suspended custodian approval. The other eight decisions stayed as in Version 1. Reader and custodian could still read; maintainer could still service but could not read research. The previous correct approval is preserved under its earlier authority.\n\n## Reflection\nI initially expected equipment responsibility to include research visibility. The embargo contradicted that shortcut. Checking forbidden operations alone would also have missed the blocked reader, so I recorded both kinds of failure. The release hold was a new rule, not proof that the original approval test was dishonest. In the assigned lab I must derive a fresh table from its own charter and identify exactly which right its later notice changes. I can reuse the testing method without reusing these permission answers.\n\nNamed output: permission-audit. These are fictional local decisions, not an external security test."
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
    "title": "The council that changes its brief",
    "subtitle": "A complete alternate worked example, followed by meaningful takeover practice.",
    "skill": "Evidence-based negotiation",
    "setting": "A conservatory council prepares an authorised physical ledger handover, then receives a narrower request before dispatch.",
    "difference": "The copy claim is corroborated, the original fits the certified cart, and the initial physical handover is replaced by copy-only access before dispatch. Judge each agreement against its current evidence and mandate.",
    "transfer": "Test each claim even when it proves correct, distinguish feasibility from authority, and reconsider an agreement when the requested outcome changes.",
    "sourceHref": "/sessions/week-09/",
    "sourceLabel": "Week 9 lab",
    "estimatedMinutes": 8,
    "steps": [
      {
        "id": "role",
        "title": "Identify the actual responsibility",
        "narration": "Ada permits the original ledger to travel to named recipient Mira for a physical provenance examination, provided custody and return are recorded. The mediator must find an agreement within that brief. A verified copy alone does not meet this original request.",
        "why": "A defensible agreement serves the published objective and the custodian’s conditions together.",
        "prompt": "Which outcome is required by the original brief?",
        "controls": [
          {
            "id": "proposal",
            "label": "Original required outcome",
            "type": "select",
            "options": [
              {
                "value": "Documented physical handover to Mira",
                "label": "Handover original to Mira"
              },
              {
                "value": "Any readable copy",
                "label": "Any readable copy"
              },
              {
                "value": "Remove the ledger without a recipient",
                "label": "Remove without a recipient"
              }
            ],
            "expected": "Documented physical handover to Mira"
          }
        ],
        "before": {
          "room": "council",
          "shot": "establishing",
          "values": {
            "role": "mediator",
            "load": 7,
            "capacity": 9
          },
          "labels": [
            "Physical provenance examination",
            "Mira: named recipient; custody and return required"
          ],
          "focus": "speaker"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "role": "mediator",
            "load": 7,
            "capacity": 9,
            "verified": true
          },
          "labels": [
            "The objective requires the original"
          ],
          "focus": "speaker"
        },
        "success": "The mediator has an explicit required outcome and custody condition before choosing transport.",
        "pitfall": "Assuming the lowest-effort copy is sufficient ignores physical provenance.",
        "hint": "Read what Mira needs to examine.",
        "duration": 18
      },
      {
        "id": "claim",
        "title": "Accept corroboration within its limits",
        "narration": "Rin says the two supplied copies contain identical recorded content. The comparison log lists twelve sections and digest R-4 for both. This record supports that content-identity claim. It does not prove every measurement true or establish Rin’s honesty in general.",
        "why": "Verification can support a claim as well as contradict it; neither outcome is a personality test.",
        "prompt": "What does the comparison record support?",
        "controls": [
          {
            "id": "evidence",
            "label": "Supported conclusion",
            "type": "select",
            "options": [
              {
                "value": "The supplied copies match on section count and digest",
                "label": "Count and digest both match"
              },
              {
                "value": "Rin is always honest",
                "label": "Rin is always honest"
              },
              {
                "value": "The copies differ because Rin sounded confident",
                "label": "Confidence proves difference"
              }
            ],
            "expected": "The supplied copies match on section count and digest"
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "role": "archivist",
            "selected": "12/R-4 and 12/R-4"
          },
          "labels": [
            "Cedar: 12 sections / R-4",
            "Birch: 12 sections / R-4"
          ],
          "focus": "records"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "role": "archivist",
            "selected": "matching comparison",
            "verified": true
          },
          "labels": [
            "Rin’s bounded content claim is corroborated"
          ],
          "focus": "records"
        },
        "success": "The records support the specific identity claim while leaving scientific accuracy and intent outside their scope.",
        "pitfall": "Automatically finding a contradiction because a previous exercise contained one would misread these records.",
        "hint": "Compare both values before deciding whether the claim conflicts.",
        "duration": 18
      },
      {
        "id": "capacity",
        "title": "Check whether the equipment really fits",
        "narration": "Bo’s certificate gives the standard cart a supported capacity of nine units. The original ledger weighs seven units. No extra cradle is required under this certificate; the handling inspection is recorded as passed. Equipment capacity supports the proposed physical handover.",
        "why": "A familiar transport concern must be checked against the current numbers rather than assumed to recur.",
        "prompt": "Does the certified cart support this original?",
        "controls": [
          {
            "id": "supported",
            "label": "Seven-unit original fits the nine-unit cart",
            "type": "toggle",
            "initial": false,
            "expected": true
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "role": "engineer",
            "load": 7,
            "capacity": 9
          },
          "labels": [
            "Original mass: 7",
            "Certified capacity: 9",
            "Handling inspection passed"
          ],
          "focus": "capacity"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "role": "engineer",
            "load": 7,
            "capacity": 9,
            "verified": true
          },
          "labels": [
            "7 ≤ 9: capacity met; custody still required"
          ],
          "focus": "capacity"
        },
        "success": "Physical handover is feasible under the published model. Capacity does not independently grant permission.",
        "pitfall": "Calling stabilisation mandatory because another cart was too small substitutes an old result for a measurement.",
        "hint": "Compare seven with nine, then return to the separate mandate.",
        "duration": 18
      },
      {
        "id": "agree",
        "title": "Prepare the authorised physical agreement",
        "narration": "The council records a proposed handover of the original to Mira on the certified cart, with Ada retaining the custody record and a return commitment. Copy-only delivery cannot serve the original provenance examination. Nothing has been dispatched yet.",
        "why": "A feasible plan still needs an authorised recipient and a recorded custody condition.",
        "prompt": "Select the agreement supported by the current brief.",
        "controls": [
          {
            "id": "proposal",
            "label": "Proposed agreement",
            "type": "select",
            "options": [
              {
                "value": "Send the original to Mira with custody and return recorded",
                "label": "Original + custody + return"
              },
              {
                "value": "Send only a copy regardless of the request",
                "label": "Copy regardless of the brief"
              },
              {
                "value": "Move the original anonymously",
                "label": "Move the original anonymously"
              }
            ],
            "expected": "Send the original to Mira with custody and return recorded"
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "load": 7,
            "capacity": 9,
            "role": "caretaker",
            "revision": "Before dispatch"
          },
          "labels": [
            "Original required; cart fits; recipient named"
          ],
          "focus": "speaker"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "load": 7,
            "capacity": 9,
            "proposal": "documented physical handover",
            "revision": "Agreement V1; not yet dispatched",
            "verified": true
          },
          "labels": [
            "V1: physical handover prepared",
            "Dispatch has not occurred"
          ],
          "focus": "speaker"
        },
        "success": "The first agreement satisfies objective, capacity and custody. Its status is a prepared plan, not a completed delivery.",
        "pitfall": "Presenting a proposed agreement as an accomplished handover would invent evidence.",
        "hint": "Keep authority, capacity, recipient and completion status separate.",
        "duration": 18
      },
      {
        "id": "change",
        "title": "Revise the agreement when scope narrows",
        "narration": "Before dispatch, a replacement signed brief cancels the physical examination. Mira now needs remote catalogue access only; the original must remain with Ada. A verified Cedar copy can meet the new request. Cart capacity has not changed.",
        "why": "The right agreement can change even though the equipment and earlier evidence remain valid.",
        "prompt": "Choose the agreement for the replacement brief.",
        "controls": [
          {
            "id": "proposal",
            "label": "Revised agreement",
            "type": "select",
            "options": [
              {
                "value": "Transfer the verified Cedar copy; keep the original with Ada",
                "label": "Cedar copy; original with Ada"
              },
              {
                "value": "Continue physical dispatch because the cart can carry it",
                "label": "Cart fits; dispatch anyway"
              },
              {
                "value": "Wait for a stronger cart before answering the request",
                "label": "Wait for a stronger cart"
              }
            ],
            "expected": "Transfer the verified Cedar copy; keep the original with Ada"
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "load": 7,
            "capacity": 9,
            "revision": "New brief: remote access; original stays"
          },
          "labels": [
            "Remote catalogue access",
            "Original remains with Ada"
          ],
          "focus": "speaker"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "load": 7,
            "capacity": 9,
            "proposal": "verified Cedar copy; original with Ada",
            "revision": "V2 replaces unexecuted physical plan",
            "verified": true
          },
          "labels": [
            "V2: verified-copy access",
            "Cart remains feasible but unnecessary"
          ],
          "focus": "speaker"
        },
        "success": "The scope change, rather than a transport failure, justifies switching from physical handover to copy access.",
        "pitfall": "A valid capacity certificate does not override a new instruction to retain the original.",
        "hint": "Identify what changed: the required outcome, not the cart.",
        "duration": 18
      },
      {
        "id": "record",
        "title": "Keep corroboration and both decisions",
        "narration": "The record preserves the matching copies, adequate cart, first physical agreement, replacement remote-access brief and revised copy agreement. The demonstrator states that no physical dispatch occurred and that Rin’s general intent was never established.",
        "why": "A traceable account reports both what evidence supports and what it cannot establish.",
        "prompt": "Choose the defensible closing statement.",
        "controls": [
          {
            "id": "conclusion",
            "label": "Closing statement",
            "type": "select",
            "options": [
              {
                "value": "The copy claim was supported; the new brief changed the agreement before dispatch",
                "label": "Claim supported; brief changed"
              },
              {
                "value": "Rin’s confidence proved honesty",
                "label": "Rin’s confidence proved honesty"
              },
              {
                "value": "The original was delivered before the revised brief",
                "label": "Original already delivered"
              }
            ],
            "expected": "The copy claim was supported; the new brief changed the agreement before dispatch"
          }
        ],
        "before": {
          "room": "council",
          "shot": "close",
          "values": {
            "load": 7,
            "capacity": 9,
            "revision": "V1 physical plan / V2 copy agreement"
          },
          "labels": [
            "Corroborated content claim; intent outside scope"
          ],
          "focus": "speaker"
        },
        "after": {
          "room": "council",
          "shot": "close",
          "values": {
            "load": 7,
            "capacity": 9,
            "revision": "Both agreements and current authority retained",
            "verified": true
          },
          "labels": [
            "No physical dispatch claimed",
            "Verified-copy request now governs"
          ],
          "focus": "speaker"
        },
        "success": "The completed record explains the changed objective without inventing a faulty cart or a dishonest speaker.",
        "pitfall": "Forcing a familiar copy-then-stabilise story onto this evidence reverses its supported decisions.",
        "hint": "Report the agreement sequence these records justify.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "The council that changes its brief — completed record",
      "filename": "worked-lab-09.md",
      "markdown": "# Completed demonstration example — changing-brief council agreement\n\n**Authored alternate example.** This council reaches a different decision sequence from the assigned negotiation.\n\n## Responsibilities and original authority\nAda is the caretaker. Rin compares the record copies. Bo checks transport capacity. The mediator coordinates the agreement. Recipient Mira initially needs the physical ledger for a provenance examination; Ada authorises that handover if custody and return are recorded.\n\n## Claim and capacity checks\nRin claims the supplied copies have matching recorded content. Cedar and Birch each contain twelve sections with digest R-4. The record corroborates that limited claim; it does not prove the observations scientifically true or establish Rin’s intent.\n\nThe original weighs 7 units. Bo’s current certificate rates the standard cart for 9, and the supplied handling inspection is marked passed. The original fits; no additional cradle is required. Capacity establishes feasibility within this model, not independent permission to move the original.\n\n## Agreement Version 1 — prepared, not executed\nSend the original to named recipient Mira using the certified cart, record custody with Ada and retain the return commitment. Copy-only delivery would not meet the physical provenance request. No dispatch occurs before the next notice.\n\n## Replacement brief and Agreement Version 2\nThe replacement signed brief cancels physical examination before dispatch. Mira now needs remote catalogue access; the original must remain with Ada. Transfer the verified Cedar copy, record the reference used and confirm the recipient’s access. The 9-unit cart remains usable but is no longer needed. The original stays with Ada.\n\n## Reflection and limit\nI checked the claim even though it turned out to be supported. I did not infer honesty or deceit from the speaker’s manner. The adequate cart made the first physical agreement feasible, but it did not entitle me to ignore the later instruction. The change was in the requested outcome, not a new equipment failure. Preserving the unexecuted first agreement made that distinction visible. In the assigned council I must reread its comparison records, capacity certificate and current mandate instead of copying this physical-then-copy sequence.\n\nNamed output: claim-verification. These are authored example agreements, not evidence of a real delivery."
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
    "title": "When the release authority expires",
    "subtitle": "A complete alternate worked example, followed by meaningful takeover practice.",
    "skill": "Preserved revision",
    "setting": "A conservatory dispatch plan must satisfy a replacement authorisation rule while every route and item of equipment remains available.",
    "difference": "No passage closes and no meter fails. A superseding authorisation rule requires recipient-scope verification and recorded permission before sealing, so the team must reorder dependencies rather than choose another route.",
    "transfer": "Locate the dependency a new authority invalidates, preserve valid evidence, and put a named verification before the action it now governs.",
    "sourceHref": "/sessions/week-11/",
    "sourceLabel": "Week 11 lab",
    "estimatedMinutes": 8,
    "steps": [
      {
        "id": "baseline",
        "title": "Preserve the originally authorised sequence",
        "narration": "Under the original release authority, Version 1 reads: verify ledger, seal case, dispatch case, log receipt. The route is open and equipment checks are valid. The demonstrator preserves this plan before reading the replacement notice.",
        "why": "A useful revision needs an honest original plan and the authority under which it made sense.",
        "prompt": "Arrange Version 1 under its original authority.",
        "controls": [
          {
            "id": "items",
            "label": "Original plan",
            "type": "order",
            "options": [
              {
                "value": "Log receipt",
                "label": "Log receipt"
              },
              {
                "value": "Dispatch case",
                "label": "Dispatch case"
              },
              {
                "value": "Seal case",
                "label": "Seal case"
              },
              {
                "value": "Verify ledger",
                "label": "Verify ledger"
              }
            ],
            "initial": [
              "Log receipt",
              "Dispatch case",
              "Seal case",
              "Verify ledger"
            ],
            "expected": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ]
          }
        ],
        "before": {
          "room": "operations",
          "shot": "establishing",
          "values": {
            "originalPlan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "plan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "revision": "Baseline awaiting preservation"
          },
          "labels": [
            "Earlier authority permits this sequence"
          ],
          "focus": "plan"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "plan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "revision": "V1 uses earlier release authority"
          },
          "labels": [
            "V1 preserved before the new notice"
          ],
          "focus": "plan"
        },
        "success": "The baseline remains visible as an earlier justified plan. It is not rewritten with later knowledge.",
        "pitfall": "Pretending the extra checks were always in Version 1 destroys the comparison.",
        "hint": "Keep the earlier authority beside the original sequence.",
        "duration": 18
      },
      {
        "id": "disruption",
        "title": "Find the failed authority dependency",
        "narration": "A published replacement notice withdraws the old dispatch authority. Before sealing, an investigator must check that the recipient’s request covers this ledger, and a coordinator must record the replacement authorisation. Routes remain open and equipment readings remain valid.",
        "why": "An available route does not authorise an action; dependencies include authority as well as hardware.",
        "prompt": "Which dependency has become invalid?",
        "controls": [
          {
            "id": "dependency",
            "label": "Failed dependency",
            "type": "select",
            "options": [
              {
                "value": "The old authority permits sealing and dispatch",
                "label": "Old release authority"
              },
              {
                "value": "The east route is closed",
                "label": "The east route is closed"
              },
              {
                "value": "The ledger identity result changed",
                "label": "The ledger identity result changed"
              }
            ],
            "expected": "The old authority permits sealing and dispatch"
          }
        ],
        "before": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "plan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "revision": "V1 uses earlier release authority"
          },
          "labels": [
            "Verify scope and record permission before sealing",
            "Routes and equipment unchanged"
          ],
          "focus": "plan"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "plan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "revision": "Old release authority withdrawn"
          },
          "labels": [
            "Affected dependency: authority before sealing"
          ],
          "focus": "plan"
        },
        "success": "The notice invalidates the old permission to proceed, not the route or verified ledger identity.",
        "pitfall": "Searching for a west-route detour solves a problem this notice does not contain.",
        "hint": "Read which action must now wait, and what it must wait for.",
        "duration": 18
      },
      {
        "id": "retain",
        "title": "Carry forward evidence within its scope",
        "narration": "The signed ledger comparison is unchanged, and equipment checks remain valid. Those findings can be retained, but neither proves that the recipient’s current request includes this ledger. That authorisation question remains open.",
        "why": "Preserved evidence is useful only for the question it answers.",
        "prompt": "Which finding remains valid without establishing the new authority?",
        "controls": [
          {
            "id": "retained",
            "label": "Retained finding",
            "type": "select",
            "options": [
              {
                "value": "The unchanged signed ledger identity check",
                "label": "Signed ledger identity check"
              },
              {
                "value": "The withdrawn permit is still current",
                "label": "Withdrawn permit still applies"
              },
              {
                "value": "An open route grants release permission",
                "label": "Open route grants permission"
              }
            ],
            "expected": "The unchanged signed ledger identity check"
          }
        ],
        "before": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "plan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "revision": "Separate retained findings from the new question"
          },
          "labels": [
            "Identity and equipment evidence retained"
          ],
          "focus": "plan"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "plan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "revision": "Identity retained; recipient scope unchecked",
            "verified": true
          },
          "labels": [
            "New scope question remains explicit"
          ],
          "focus": "plan"
        },
        "success": "The team keeps justified work without treating identity evidence as permission.",
        "pitfall": "Restarting every equipment test is unnecessary; skipping the new scope check is unsupported.",
        "hint": "Ask what the old comparison proves rather than whether the whole plan feels valid.",
        "duration": 18
      },
      {
        "id": "assign",
        "title": "Assign the authorisation checks",
        "narration": "The investigator compares the recipient’s signed request with this ledger’s identity and purpose. The coordinator receives that result and records the new authorisation before anyone seals the case. An unanswered scope question stops sealing.",
        "why": "A prerequisite needs both a checker and someone who receives the result.",
        "prompt": "Who checks the recipient’s scope?",
        "controls": [
          {
            "id": "role",
            "label": "Scope-check owner",
            "type": "select",
            "options": [
              {
                "value": "Investigator",
                "label": "Investigator"
              },
              {
                "value": "Systems specialist checking a route",
                "label": "Systems: route check"
              },
              {
                "value": "Nobody; the route is open",
                "label": "Nobody; the route is open"
              }
            ],
            "expected": "Investigator"
          }
        ],
        "before": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "plan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "revision": "Recipient-scope check pending",
            "role": "unassigned"
          },
          "labels": [
            "Unverified scope blocks sealing"
          ],
          "focus": "crew"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "plan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "revision": "Investigator checks; coordinator records authority",
            "role": "investigator"
          },
          "labels": [
            "Named owner and recipient of the result"
          ],
          "focus": "crew"
        },
        "success": "The investigator owns scope comparison; the coordinator records authority and releases the next step.",
        "pitfall": "Assigning the check to everyone without a named recipient leaves the dependency unresolved.",
        "hint": "Separate investigation from the decision to release the package.",
        "duration": 18
      },
      {
        "id": "revise",
        "title": "Put the new prerequisite before sealing",
        "narration": "Version 2 keeps ledger verification, then checks recipient scope and records the new authorisation before sealing. Dispatch and the receipt follow on the same open route. The original four-step plan remains unchanged beside it.",
        "why": "A revision must change the order governing action, not append a warning after the dependent step.",
        "prompt": "Arrange the revised plan so authority precedes sealing.",
        "controls": [
          {
            "id": "items",
            "label": "Version 2",
            "type": "order",
            "options": [
              {
                "value": "Log receipt",
                "label": "Log receipt"
              },
              {
                "value": "Dispatch case",
                "label": "Dispatch case"
              },
              {
                "value": "Seal case",
                "label": "Seal case"
              },
              {
                "value": "Record new authorisation",
                "label": "Record new authorisation"
              },
              {
                "value": "Check recipient scope",
                "label": "Check recipient scope"
              },
              {
                "value": "Verify ledger",
                "label": "Verify ledger"
              }
            ],
            "initial": [
              "Log receipt",
              "Dispatch case",
              "Seal case",
              "Record new authorisation",
              "Check recipient scope",
              "Verify ledger"
            ],
            "expected": [
              "Verify ledger",
              "Check recipient scope",
              "Record new authorisation",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ]
          }
        ],
        "before": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "plan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "revision": "V1 retained; V2 draft"
          },
          "labels": [
            "Sealing waits for scope and new authority"
          ],
          "focus": "plan"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "plan": [
              "Verify ledger",
              "Check recipient scope",
              "Record new authorisation",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "revision": "V2: authority before sealing"
          },
          "labels": [
            "Same route; new prerequisites before sealing"
          ],
          "focus": "plan"
        },
        "success": "The revised order addresses the actual dependency. A check after dispatch would not satisfy the notice.",
        "pitfall": "Appending authorisation at the end leaves the unsupported action unchanged.",
        "hint": "Place both new steps before the first action governed by the new rule.",
        "duration": 18
      },
      {
        "id": "communicate",
        "title": "Confirm the new stop condition",
        "narration": "The coordinator reads back the revised sequence: no sealing until the investigator confirms scope and replacement authorisation is recorded. The team confirms it will use the same route after that gate is met. This is a revised plan, not a claim that dispatch has happened.",
        "why": "Everyone needs the same current action condition; a revised document alone does not establish shared understanding.",
        "prompt": "Confirm the new sequencing and stop condition.",
        "controls": [
          {
            "id": "acknowledged",
            "label": "All roles know sealing waits for the new authority",
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
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "plan": [
              "Verify ledger",
              "Check recipient scope",
              "Record new authorisation",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "revision": "V2 communicated; confirmation pending"
          },
          "labels": [
            "Stop if scope or recorded authority is missing"
          ],
          "focus": "crew"
        },
        "after": {
          "room": "operations",
          "shot": "close",
          "values": {
            "originalPlan": [
              "Verify ledger",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "plan": [
              "Verify ledger",
              "Check recipient scope",
              "Record new authorisation",
              "Seal case",
              "Dispatch case",
              "Log receipt"
            ],
            "revision": "Both versions retained; stop condition acknowledged",
            "verified": true
          },
          "labels": [
            "Order confirmed; dispatch not claimed"
          ],
          "focus": "crew"
        },
        "success": "The record identifies authority, order, owner, communication and the still-unexecuted action.",
        "pitfall": "Treating acknowledgement as proof that authorisation was granted invents a result.",
        "hint": "Confirm the rule separately from the future result of its checks.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "When the release authority expires — completed record",
      "filename": "worked-lab-11.md",
      "markdown": "# Completed demonstration example — release-authority revision memo\n\n**Authored alternate example.** Every route stays open. The disruption changes an authorisation dependency rather than equipment or transport availability.\n\n## Version 1 and its authority\nVerify ledger → Seal case → Dispatch case → Log receipt.\n\nThe original release authority permitted this order. Ledger identity and equipment checks were supplied as valid; the plan was preserved before the replacement notice.\n\n## Published disruption\nThe replacement notice withdraws the old dispatch authority. Before sealing, the investigator must compare the recipient’s request with this ledger’s identity and purpose. The coordinator must record the new authorisation. Neither open routes nor working equipment removes those conditions.\n\n## Diagnosis and retained evidence\nThe failed dependency is the old authority to seal and dispatch. The unchanged signed ledger comparison remains useful for identity. Equipment remains available. Neither finding establishes that the recipient’s current request covers this ledger. No route change is required.\n\n## Version 2\nVerify ledger → Check recipient scope → Record new authorisation → Seal case → Dispatch case → Log receipt.\n\nThe investigator owns scope comparison and sends the result to the coordinator. The coordinator records authority and authorises sealing only when both prerequisites are met. If scope is unresolved or authorisation absent, stop before sealing. The route, verified identity and receipt obligation remain unchanged.\n\n## Communication and status\nThe coordinator reads back the new order and stop condition; all roles acknowledge them. Version 1 stays preserved. This memo records a revised plan, not an invented completed authorisation or dispatch.\n\n## Reflection\nMy first temptation was to choose another route, but availability was not the dependency the notice changed. The important change was the point at which permission had to be established. Adding a scope check after dispatch would mention the new rule without satisfying it. I kept the identity evidence, named an investigator to check scope, and made the coordinator receive and record the result before sealing. In the assigned route or meter disruptions I must identify their different failed dependency instead of copying this sequence.\n\nNamed output: revised-plan. No physical dispatch or grant of authority is claimed."
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
      "markdown": "# Completed demonstration portfolio — Weekly Fieldwork\n\n**Authored teaching example.** These are twelve alternate worked records, not a real student's submission and not answers to the assigned configurations. The traces describe the authored demonstration path. No physical test or academic grade is claimed.\n\n## Portfolio register\n- Week 1: Completed observation record — conservatory; record and transfer included below.\n- Week 2: Completed recall strategy — storm kit; record and transfer included below.\n- Week 3: Completed spatial model — dome connector; record and transfer included below.\n- Week 4: Completed mechanism diagnosis — conservatory lift; record and transfer included below.\n- Week 5: Completed example — beacon with two faults; record and changed-condition reasoning included below.\n- Week 6: Completed example — request authority and repaired weather ledger; record and changed-condition reasoning included below.\n- Week 7: The embargoed observatory charter — completed record; record and changed-condition reasoning included below.\n- Week 8: Five cases to the dome — completed record; record and transfer included below.\n- Week 9: The council that changes its brief — completed record; record and changed-condition reasoning included below.\n- Week 10: Predict the instrumented gallery — completed record; record and transfer included below.\n- Week 11: When the release authority expires — completed record; record and changed-condition reasoning included below.\n- Week 12: Recover the rainfall recorder — completed record; record and transfer included below.\n\nTwelve records are supplied. Under the published rule, the best ten are counted by a teacher using skill 40%, transfer 40%, reflection 20%. The player does not invent grades or choose the best records by game completion.\n\n## Completed demonstration example — conservatory observation record\n\nThis alternate example shows a method. It is not an answer to the assigned lab.\n\n## Initial inspection\nAt the first inspection the clock displayed 11:35, a green mug stood beside the planting ledger and the service hatch was closed. These are supplied scene observations. A visible note asserted, “I checked every tray.” The note's presence is observable; its contents remain a claim.\n\n## Reconstruction and correction\nI initially recalled the hatch as open. Rechecking the scene showed that I had inserted a familiar detail. I preserved the incorrect recollection and correction rather than rewriting the attempt. I classified “the tray inspection lasted thirty-five minutes” as an inference: the 11:35 reading alone supplies neither the inspection start nor its duration.\n\n## Changed situation\nAt the second inspection the clock read 11:50 and the hatch was open. The green mug remained unchanged. Two recorded features changed. No record established who opened the hatch or why.\n\n## Next investigation\nInspect the tray check records against the claimed complete inspection. Matching records would support the account within their scope; missing entries would require clarification.\n\n## Reflection\nMy main error was adding a plausible detail, not failing to look at an object. A regional inspection helped coverage, but preserving a separate interpretation column helped more with this mistake. In my own scene I would make the same distinction before building a story. I would not claim that two changed features prove a particular person's intent.\n\nRoute: authored 3D/interactive demonstration. Assistance: narrated example and one recorded correction.\n\n### Further reflection\n\nThe independent tray record is important because it could actually contradict the note. Asking the writer to repeat the same account would not add comparable independence. I would therefore preserve both the account and the proposed test instead of reducing the record to a confidence label.\n\n---\n\n## Completed demonstration example — storm-kit recall strategy\n\nThis alternate worked example uses Gate, Pool, Press and Dome. It does not supply the assigned lab's item answers.\n\n## Baseline\nI recalled Lens and Beacon: two correct items out of four. I kept that result before inspecting the full list.\n\n## Encoding route\n1. Gate: a giant Lens frames the entrance.\n2. Pool: a Tether splashes in the water.\n3. Press: a Pocket atlas unfolds into maps under the rollers.\n4. Dome: a Beacon lights the roof.\n\n## Retrieval and error\nWith the list covered, I retrieved Lens, Tether, Pocket atlas and Beacon in order. A later attempt produced “book” at the Press. I recorded the substitution and strengthened the map-specific cue rather than silently counting it as exact recall.\n\n## Comparison\nThe guided attempt improved from two correct items to four. That is a result of this small demonstration, not proof of permanent improvement or photographic memory. Rehearsal and item familiarity may also have helped.\n\n## Reflection\nThe fixed locations helped order, while the distinctive images helped item identity. The delayed substitution showed that a generic association preserved a category but not the required object. In another task I would preserve the route, change the items, and inspect whether the same weakness returned. For a critical instruction set that can be carried openly, a checklist may remain the better tool.\n\nRoute: guided example with list covering. Hints: association prompts. Named output: recall-strategy.\n\n### Further reflection\n\nA second unfamiliar list would be a better transfer check than endlessly repeating these four items. I would also record the delay before recall, because immediate retrieval and remembering after an interruption are different demands. The example should not hide the effect of repeated practice.\n\n---\n\n## Completed demonstration example — dome connector\n\nThe assigned connector uses different starting and target conditions.\n\n## Reference frame and prediction\nWorld north and up remain fixed when the camera moves. The alternate connector initially has north/west ports at level 0. A clockwise 90-degree turn maps the original north port to east and the original west port to north.\n\n## Transformation record\n- Initial: 0 degrees, level 0, north/west.\n- After rotation: 90 degrees, level 0, east/north.\n- After translation: 90 degrees, level 2, east/north.\n- Verification: both labelled ports and the required level match.\n\nA mirrored substitute was rejected because outline similarity did not preserve the original label mapping.\n\n## Changed destination\nThe target moved to level 1 without changing port requirements. I lowered the connector and retained its 90-degree orientation.\n\n## Reflection\nI initially treated reaching the right orientation as completion, but the target included a separate height condition. Writing two checks prevented that omission. Tracking the original north tip also made the rotation explainable when the camera changed. In a new configuration I would predict the label mapping before movement and then test position independently.\n\nNamed output: spatial-model. Evidence route: alternate worked simulation.\n\n### Further reflection\n\nI would ask for another labelled view if the mapping remained ambiguous rather than rotating until the outline looked familiar. An ordered text account of the transformation makes the same reasoning available without relying on visual mental rotation or precise manipulation.\n\n---\n\n## Completed demonstration example — conservatory lift\n\nThis alternate mechanism uses an 18-tooth driver, different turn requirements and a 270-degree cam.\n\n## Causal model\nInput rotation → external gear pair → cam → spring-return follower → lift output. The interlock blocks cam adjustment until released. Motion also requires the spring and specified cam phase.\n\n## Prediction and diagnosis\nFor three output turns from five input turns: follower = 18 × 5 ÷ 3 = 30 teeth. The driven gear turns opposite the driver. A correct ratio did not initially produce a ready mechanism because the interlock was engaged and the return spring absent.\n\nI released the interlock, set the cam to 270 degrees and attached the spring. I retained the ratio calculation because it was not contradicted by the readiness fault.\n\n## Verification\nFive input turns produced three opposite output turns. Both the amount and direction matched the prediction.\n\n## Transfer\nThe changed task required two output turns from four input turns. I selected 36 follower teeth: 18 ÷ 36 × 4 = 2. The cam and spring conditions remained valid.\n\n## Reflection\nThe useful distinction was between an incorrect transmission ratio and a blocked dependency. Changing gears would not have released the cam. In a new apparatus I would record the output requirement, list readiness conditions and test both separately.\n\nNamed output: mechanism-diagnosis. This is a model, not a real lock or physical qualification.\n\n### Further reflection\n\nThe readiness conditions belong in the model rather than a footnote. I would test a blocked configuration as a counterexample so that another student could see why the correct gear ratio alone is insufficient. That negative example explains the distinction better than a successful run by itself.\n\n---\n\n## Completed demonstration example — beacon with two faults\n\nThis is one fictional nine-volt beacon throughout the attempt. Its published case card allows multiple simultaneous open faults. The assigned browser and campus lab instead introduce exactly one fault at a time.\n\n## Initial evidence and first diagnosis\nWith power on, source / fuse output / cable output / lamp supply read **9 / 9 / 0 / 0 V** relative to the common return. The lamp was dark. The first missing supply supported an open cable. The unpowered lamp's own condition remained unresolved; the readings did not prove it healthy.\n\n## First repair and failed whole-system check\nI isolated the source and replaced the cable only. After restoring power, the trace became **9 / 9 / 9 / 9 V**, but the **same beacon stayed dark**. The repair successfully restored supply without resolving the original symptom. I preserved both statements instead of calling the cable diagnosis wrong or declaring the job complete.\n\n## Second diagnosis and repair\nWith healthy supply and a dark load, I isolated power and tested lamp continuity. The result was **open**. I replaced that confirmed open lamp while isolated, then restored power. The supply remained **9 / 9 / 9 / 9 V** and the lamp lit.\n\n## Preserved diagnostic chain\n\n| Stage | Supported finding | Action | Verification |\n| --- | --- | --- | --- |\n| Initial trace | Open cable; lamp condition unknown | Isolated cable replacement | Supply restored, light still absent |\n| Same beacon after first repair | Healthy lamp supply, dark output | Isolated lamp continuity test | Open load confirmed |\n| Confirmed second fault | Open lamp as well as the earlier cable break | Isolated lamp replacement | 9 V supply and visible light |\n\n## Reflection\nMy first diagnosis was useful but incomplete. Assuming it explained the entire symptom would have stopped the investigation too early. The failed output check changed what I needed to test, without erasing the evidence that justified the cable replacement. In a new case I would read whether its rules permit multiple faults, diagnose from its own trace and check the original symptom after every repair. This example does not establish that the assigned one-fault circuit has two defects.\n\n## Limits\nThese are idealised authored model readings, not measurements from constructed hardware. A continuity check is performed only in the model's isolated state. The record establishes this fictional apparatus's behaviour and does not certify work on an arbitrary physical circuit.\n\nNamed output: circuit-diagnosis. Assistance: complete narrated worked example.\n\n### Further reflection\n\nThe failed first verification was essential evidence: it showed a successful supply repair without a working beacon. I would retain that intermediate state when explaining the second test. The assigned one-fault promise should still be respected; I would not invent an additional defect when its own completed trace establishes the required result. Equally, I should not import that promise into a different case that explicitly allows several faults. Each intervention needs a specific reason and a return to the original symptom. A healthy voltage after replacement answered whether supply had been restored, while the dark lamp showed that illumination remained unresolved. Preserving both observations made the second continuity test purposeful rather than another speculative component swap.\n\n---\n\n## Completed demonstration example — request authority and repaired weather ledger\n\nThis alternate example changes the authority problem. The assigned browser and campus transfer immediately provides a valid signed amendment. Here an unsigned message is not sufficient, and the later valid deliverable is a newly repaired version of a previously incomplete record.\n\n## Published authority rule\nOnly an instruction marked authenticated in the supplied authority register can supersede the current request. This is a fictional case-file rule; no live signature service is contacted.\n\n## Preserved timeline\n\n| Time | Record | Direct result | Decision or limit |\n| --- | --- | --- | --- |\n| 07:05 | Authenticated R1 | Requires 18 sections and Q-7 | Governs the initial comparison |\n| 07:20 | East | 18 sections, Q-9 | Complete but does not match R1 |\n| 07:35 | Original South | 17 sections, Q-2 | Incomplete and different from R1 |\n| 07:50 | North | 18 sections, Q-7 | Matches R1, although it is newest |\n| 08:00 | Unsigned message | Says “Use East, Q-9”; register marks unverified | Record as a claim; retain North under R1 and request authentication |\n| 08:15 | Authenticated R2 | Requires 18 sections and Q-12 | Legitimately supersedes R1; does not authenticate the earlier Q-9 message |\n| 08:20 | South repair receipt S2 | Repaired version contains 18 sections and Q-12 | Verify this new version; select South S2 under R2 |\n\n## Preserved recommendations\n1. **Under R1:** select North after count and digest checks. Its newer timestamp neither proves nor disproves correctness.\n2. **After the unsigned message:** retain North as the currently authorised deliverable. Preserve the request, ask for authenticated authority and do not quietly promote the claim into a rule.\n3. **Under authenticated R2:** select South **S2**, after separately checking authentication, 18 sections and Q-12. Preserve the original South record at 17/Q-2 and the original North justification.\n\n## Two independent checks\nAuthentication established what the current instruction required. The repair receipt and new comparison established what South S2 contained. Neither check could substitute for the other. The old incomplete South file was not silently rewritten into a successful historical result.\n\n## Limits and next check\nAgreement with the authenticated reference establishes identity and completeness within this case. It does not prove the scientific accuracy of the weather observations. The unsigned Q-9 proposal remains an unverified account; the later R2 does not retroactively authorise it. Its origin and purpose would need separate investigation.\n\n## Reflection\nI initially expected a later request to trigger a different selection. The authority rule showed why keeping North at 08:00 was the justified action. When an authenticated instruction and a newly repaired record later appeared, I changed to South S2 for two explicit reasons. The useful method is to verify authority and content, not to memorise “choose the first copy, then the second.” My assigned case has different rules and records, so I must read those afresh.\n\nNamed output: evidence-timeline. Demonstration material, not an assigned response.\n\n### Further reflection\n\nA record can justify waiting as well as changing. The unsigned message required an authority check, not a guess about which speaker sounded convincing. I would keep the current authorised selection, the proposed change and the later authenticated version in separate rows so neither hindsight nor a repaired file overwrites the original evidence. The newest original candidate was also the correct one here, which prevented me from turning an earlier warning about recency into a new rigid rule. South then became usable because a distinct repaired version satisfied a distinct authenticated request. If either authentication or the repair comparison had been absent, that final recommendation would remain unsupported. I would name the missing check rather than fill it in from expectation.\n\n---\n\n## Completed demonstration example — embargoed observatory permission audit\n\n**Authored alternate example.** Read this local research embargo before deciding any permission.\n\n## Published authority\nReader: read research only. Maintainer: service equipment only; embargoed research is not readable. Custodian: read research and approve release. Every other combination is denied.\n\n## Preserved faulty results\n| Request | Expected | Observed before repair |\n| --- | --- | --- |\n| Maintainer / read | Deny | Allow |\n| Reader / read | Allow | Deny |\n\nThe other seven decisions already matched. The first failure exposed an embargoed resource; the second blocked an authorised reader.\n\n## Version 1 — repaired charter\n| Role | Read | Service | Approve |\n| --- | --- | --- | --- |\n| Reader | Allow | Deny | Deny |\n| Maintainer | Deny | Allow | Deny |\n| Custodian | Allow | Deny | Allow |\n\nAll nine cells were compared with the charter. Positive checks preserved reader reading, maintainer service and custodian reading/approval. Negative checks retained the embargo and remaining limits. The repair changed only maintainer/read and reader/read.\n\n## Version 2 — new release hold\nA later signed notice suspended custodian approval. The other eight decisions stayed as in Version 1. Reader and custodian could still read; maintainer could still service but could not read research. The previous correct approval is preserved under its earlier authority.\n\n## Reflection\nI initially expected equipment responsibility to include research visibility. The embargo contradicted that shortcut. Checking forbidden operations alone would also have missed the blocked reader, so I recorded both kinds of failure. The release hold was a new rule, not proof that the original approval test was dishonest. In the assigned lab I must derive a fresh table from its own charter and identify exactly which right its later notice changes. I can reuse the testing method without reusing these permission answers.\n\nNamed output: permission-audit. These are fictional local decisions, not an external security test.\n\n### Further reflection\n\nThe non-obvious decision is denying research reading to a role that still needs equipment service. I would use a fresh expected-versus-observed table for another charter, because role names and a familiar layout cannot establish rights. The signed hold changes one expectation while retaining the earlier evidence.\n\n## Completed demonstration example — dome handoff\n\n## Role information\nAnalyst card: five sealed cases to Dome, verification VIOLET.\nOperator: controls dispatch and must request exact destination, count and code.\n\n## Recorded exchange\nAnalyst: “Deliver five sealed cases to Dome; verification code VIOLET. Read back before dispatch.”\nOperator first read-back: “Dome, four, VIOLET.”\nAnalyst: “Correct the count to five.”\nOperator corrected read-back: “Dome, five, VIOLET.”\nAnalyst: “Confirmed.”\n\nThe count mismatch was found before movement. A bare acknowledgement would not have exposed it.\n\n## Changed situation\nNew card: Pool / 2 / SILVER. The team repeated the same protocol with new values. The operator's matching read-back was confirmed separately from the earlier handoff.\n\n## Agreement\nThe analyst owns instruction accuracy; the operator records and repeats the three fields; either role may stop if a field conflicts. A completed acknowledgement applies to one identified instruction, not every later delivery.\n\n## Reflection\nThe protocol was useful because it made the receiver's interpretation visible. My error was a wrong count, not unwillingness to cooperate. In another task I would preserve exact labels and ask which condition permits action, especially when the roles see different screens.\n\nNamed output: handoff-agreement. This is an alternate demonstration, not the assigned Relay/Archive/Dispatch answer.\n\n### Further reflection\n\nThe code is meaningful only because both roles know which current instruction it belongs to. I would record the instruction version as well as the acknowledgement when several deliveries are in progress. That prevents a correct read-back from being attached to the wrong task.\n\n---\n\n## Completed demonstration example — changing-brief council agreement\n\n**Authored alternate example.** This council reaches a different decision sequence from the assigned negotiation.\n\n## Responsibilities and original authority\nAda is the caretaker. Rin compares the record copies. Bo checks transport capacity. The mediator coordinates the agreement. Recipient Mira initially needs the physical ledger for a provenance examination; Ada authorises that handover if custody and return are recorded.\n\n## Claim and capacity checks\nRin claims the supplied copies have matching recorded content. Cedar and Birch each contain twelve sections with digest R-4. The record corroborates that limited claim; it does not prove the observations scientifically true or establish Rin’s intent.\n\nThe original weighs 7 units. Bo’s current certificate rates the standard cart for 9, and the supplied handling inspection is marked passed. The original fits; no additional cradle is required. Capacity establishes feasibility within this model, not independent permission to move the original.\n\n## Agreement Version 1 — prepared, not executed\nSend the original to named recipient Mira using the certified cart, record custody with Ada and retain the return commitment. Copy-only delivery would not meet the physical provenance request. No dispatch occurs before the next notice.\n\n## Replacement brief and Agreement Version 2\nThe replacement signed brief cancels physical examination before dispatch. Mira now needs remote catalogue access; the original must remain with Ada. Transfer the verified Cedar copy, record the reference used and confirm the recipient’s access. The 9-unit cart remains usable but is no longer needed. The original stays with Ada.\n\n## Reflection and limit\nI checked the claim even though it turned out to be supported. I did not infer honesty or deceit from the speaker’s manner. The adequate cart made the first physical agreement feasible, but it did not entitle me to ignore the later instruction. The change was in the requested outcome, not a new equipment failure. Preserving the unexecuted first agreement made that distinction visible. In the assigned council I must reread its comparison records, capacity certificate and current mandate instead of copying this physical-then-copy sequence.\n\nNamed output: claim-verification. These are authored example agreements, not evidence of a real delivery.\n\n### Further reflection\n\nThe first agreement was not invalidated by a new capacity problem. Its objective was replaced before execution. I would keep that timing explicit so a reader can distinguish a sound earlier plan from a delivery that never occurred, and distinguish corroboration of a statement from proof of its speaker’s intent.\n\n## Completed demonstration example — instrumented gallery routes\n\nThis alternate five-by-five model uses zero-based cells, start 20 and destination 3.\n\n## Original sensor set\n15, 16, 11.\n\nRoute A: 20 → 15 → 10 → 5 → 0 → 1 → 2 → 3. Prediction: one contact. Trace: one contact at 15.\nRoute B: 20 → 21 → 22 → 23 → 18 → 13 → 8 → 3. Prediction: zero. Trace: zero. Both routes use seven moves.\n\n## Changed sensor set\n21, 22, 23.\nRoute B now records three contacts; Route A records zero. The earlier records remain labelled with the original pattern.\n\n## Decision\nIf the objective is minimal recorded contact, Route B fits the original pattern and Route A fits the changed one. If the task is to verify detector observations, a route through the sensor cells may be more useful. Contact is a game event, not automatic failure.\n\n## Reflection\nThe most useful artefact was the ordered route plus the sensor set, because it made each count reproducible. I avoided treating a once-correct zero as a permanent property of the path. In my own task I would predict before execution and inspect the first disagreement rather than changing the route until an attractive ending appears.\n\nNamed output: sensor-route.\n\n### Further reflection\n\nExplicit cell identifiers helped separate the model from camera position and intuition. I would keep the event trace when a prediction fails, because its first mismatch tells me more than the final contact count alone. Different objectives can justify different routes under the same rules.\n\n---\n\n## Completed demonstration example — release-authority revision memo\n\n**Authored alternate example.** Every route stays open. The disruption changes an authorisation dependency rather than equipment or transport availability.\n\n## Version 1 and its authority\nVerify ledger → Seal case → Dispatch case → Log receipt.\n\nThe original release authority permitted this order. Ledger identity and equipment checks were supplied as valid; the plan was preserved before the replacement notice.\n\n## Published disruption\nThe replacement notice withdraws the old dispatch authority. Before sealing, the investigator must compare the recipient’s request with this ledger’s identity and purpose. The coordinator must record the new authorisation. Neither open routes nor working equipment removes those conditions.\n\n## Diagnosis and retained evidence\nThe failed dependency is the old authority to seal and dispatch. The unchanged signed ledger comparison remains useful for identity. Equipment remains available. Neither finding establishes that the recipient’s current request covers this ledger. No route change is required.\n\n## Version 2\nVerify ledger → Check recipient scope → Record new authorisation → Seal case → Dispatch case → Log receipt.\n\nThe investigator owns scope comparison and sends the result to the coordinator. The coordinator records authority and authorises sealing only when both prerequisites are met. If scope is unresolved or authorisation absent, stop before sealing. The route, verified identity and receipt obligation remain unchanged.\n\n## Communication and status\nThe coordinator reads back the new order and stop condition; all roles acknowledge them. Version 1 stays preserved. This memo records a revised plan, not an invented completed authorisation or dispatch.\n\n## Reflection\nMy first temptation was to choose another route, but availability was not the dependency the notice changed. The important change was the point at which permission had to be established. Adding a scope check after dispatch would mention the new rule without satisfying it. I kept the identity evidence, named an investigator to check scope, and made the coordinator receive and record the result before sealing. In the assigned route or meter disruptions I must identify their different failed dependency instead of copying this sequence.\n\nNamed output: revised-plan. No physical dispatch or grant of authority is claimed.\n\n### Further reflection\n\nThe coordinator needs the scope-check result before the authority record can permit sealing. A named checker without that receipt leaves the sequence incomplete. I would ask a teammate to read back the actual stop condition rather than simply agreeing that the new document looks sensible.\n\n## Completed demonstration example — Lark Weather Mast recovery\n\n## Mission contract\nRecover verified rainfall data while keeping the original recorder stable. Abort movement if the support apparatus cannot meet its required output. The original remains with the mast custodian.\n\n## Evidence and actions\nThe display read 16:25 and the service lamp was amber. The operator's completeness statement remained a claim until the manifest check.\n\nA 16-tooth driver and 32-tooth follower produced two opposite output turns from four input turns after recorded readiness checks. Copy Ash contained 12 records and matched W-6; Birch contained 11/W-3 and did not meet the request.\n\nThe operator read back “Ash copy, twelve records, W-6.” The custodian confirmed transfer and retained the original at Lark.\n\n## Resolution\nVerified digital data recovered; original stabilised in place; receipt and custody recorded.\n\n## Alternative and limit\nPhysical removal was unnecessary for the research-access objective and would introduce handling work. Matching W-6 establishes identity against the reference, not calibration accuracy. A calibration review remains the next question.\n\n## Reflection\nThe operation worked because several modest checks connected: observation informed investigation, mechanical verification supported handling, and a clear agreement defined what recovery meant. I would not describe this as physical recovery or as proof that every rainfall measurement is correct.\n\nNamed output: recovery-record. Separate from the Meridian assessment and the Halcyon final demonstration.\n\n### Further reflection\n\nAn honest debrief should include a next question that the completed mission did not answer. The calibration limit is consequential because matching a data reference does not verify the instrument that produced it. Preserving that distinction is part of a useful recovery record.\n\n## Attribution and completeness\nAll twelve records are labelled alternate demonstration material. Each retains its setting, supplied result, changed-situation response and reflection. A submitted personal portfolio would replace these with the student's own attempts and declared assistance. Exporting this example does not submit it."
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
    "subtitle": "A complete paired diagnosis of a dark load with healthy supply, equivalent copies and a changed evidence scope.",
    "skill": "Circuit diagnosis, digital evidence, permissions and communication",
    "setting": "Iris Relay: a twelve-volt lamp circuit, mirrored core records and a calibration-trace dispatch request.",
    "difference": "The lamp is open even though every powered supply point reads 12 V. Two mirrored records both satisfy the first request; a later calibration-trace requirement selects a larger bundle. The assigned relay has a supply-break fault and a different archive problem.",
    "transfer": "Transfer the method: choose a discriminating test, recognise when evidence permits several answers, then revise only the dependencies affected by a new requirement.",
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
        "title": "Full supply, but no light",
        "narration": "Ari records 12 V at the source, fuse output, cable output and lamp supply, all relative to the common return. The lamp stays dark. Nia explains that supply is present throughout: these readings do not yet prove the lamp is continuous. The next discriminating test is lamp continuity with the source isolated.",
        "why": "A healthy supply reading does not prove that current can pass through the load. Looking for the first zero would not locate this fault.",
        "prompt": "Record the source voltage and choose the next test; do not replace a part from these readings alone.",
        "controls": [
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
          },
          {
            "id": "nextTest",
            "label": "Next discriminating test",
            "type": "select",
            "options": [
              {
                "value": "Replace the fuse immediately",
                "label": "Replace the fuse immediately"
              },
              {
                "value": "Isolate and check lamp continuity",
                "label": "Isolate and check lamp continuity"
              },
              {
                "value": "Select the newest archive",
                "label": "Select the newest archive"
              }
            ],
            "expected": "Isolate and check lamp continuity"
          }
        ],
        "before": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 12,
            "powered": true,
            "fault": "lamp",
            "faultLabel": "Supply present · load unverified",
            "sourceVoltage": 12
          },
          "labels": [
            "Source / fuse / cable / lamp: 12 / 12 / 12 / 12 V",
            "Lamp dark · continuity not yet established"
          ],
          "focus": "lamp"
        },
        "after": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 12,
            "powered": true,
            "fault": "lamp",
            "nextTest": "isolated lamp continuity",
            "faultLabel": "Supply present · load unverified",
            "sourceVoltage": 12
          },
          "labels": [
            "Source / fuse / cable / lamp: 12 / 12 / 12 / 12 V",
            "Lamp dark · continuity not yet established"
          ],
          "focus": "lamp"
        },
        "success": "All four supply points read 12 V. The next justified action is an isolated lamp-continuity check.",
        "pitfall": "No supply zero appears in this trace. Replacing the fuse would skip the test that distinguishes an open load from a supply break.",
        "hint": "The lamp receives supply but does not light. Choose the test that checks the load itself, after isolation.",
        "duration": 18
      },
      {
        "id": "isolate",
        "title": "Prove the load fault, then replace",
        "narration": "Ari isolates the source. The supplied continuity record now reads CONTINUOUS through the fuse and cable, but OPEN through the lamp. Nia identifies the lamp as the supported fault. Ari replaces only that lamp while power remains off; they keep the OPEN reading as pre-repair evidence.",
        "why": "The isolated continuity result supplies the missing evidence. Replacing a part does not by itself establish what was wrong.",
        "prompt": "Set the source off, record the lamp continuity result, and choose the component supported for replacement.",
        "controls": [
          {
            "id": "powered",
            "label": "Source powered during replacement",
            "type": "toggle",
            "initial": true,
            "expected": false
          },
          {
            "id": "continuity",
            "label": "Lamp continuity before replacement",
            "type": "select",
            "options": [
              {
                "value": "CONTINUOUS",
                "label": "CONTINUOUS"
              },
              {
                "value": "OPEN",
                "label": "OPEN"
              },
              {
                "value": "Not measured",
                "label": "Not measured"
              }
            ],
            "expected": "OPEN"
          },
          {
            "id": "replacement",
            "label": "Component to replace",
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
            "expected": "lamp"
          }
        ],
        "before": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 12,
            "powered": true,
            "fault": "lamp",
            "faultLabel": "Supply present · load unverified",
            "sourceVoltage": 12
          },
          "labels": [
            "Isolate before continuity or replacement",
            "Powered supply was 12 V at every node"
          ],
          "focus": "lamp"
        },
        "after": {
          "room": "systems",
          "shot": "close",
          "values": {
            "voltage": 12,
            "powered": false,
            "fault": "none",
            "continuityBeforeReplacement": "OPEN",
            "replaced": "lamp",
            "faultLabel": "OPEN continuity recorded · lamp replaced",
            "sourceVoltage": 12
          },
          "labels": [
            "Isolated: lamp OPEN; fuse and cable continuous",
            "Lamp replaced · verification still pending"
          ],
          "focus": "lamp"
        },
        "success": "The isolated lamp tested OPEN while the fuse and cable were continuous. Only the lamp was replaced, with power off.",
        "pitfall": "Zero voltage after isolation is expected everywhere; it cannot locate this fault. Keep the specific continuity result and the healthy comparison checks.",
        "hint": "The continuity record names one open component. Preserve that result before changing it.",
        "duration": 18
      },
      {
        "id": "verify",
        "title": "Verify and rotate responsibility",
        "narration": "Ari restores power. The same four supply readings remain 12/12/12/12 V, but now the lamp lights. Nia checks that a changed output, not a changed voltage, supports the repair. Nia then becomes operator and Ari takes the requirement pack.",
        "why": "The before and after voltage traces are identical; the verified lamp output and retained continuity evidence explain what changed.",
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
            "fault": "none",
            "faultLabel": "Lamp replaced · power isolated",
            "sourceVoltage": 12
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
            "verified": true,
            "faultLabel": "Lamp lit · repair verified",
            "sourceVoltage": 12
          },
          "labels": [
            "Same 12 / 12 / 12 / 12 V · lamp now lit",
            "Nia operates; Ari checks requirements"
          ],
          "focus": "lamp"
        },
        "success": "The repaired lamp lights with 12 V supply, and Nia takes over the console with Ari checking the requirements.",
        "pitfall": "Claiming that voltage rose after this repair would misreport the trace. The lamp output changed; the measured supply did not.",
        "hint": "Restore power, verify visible light, and name Nia as the next operator.",
        "duration": 18
      },
      {
        "id": "archive",
        "title": "Recognise two defensible matches",
        "narration": "The signed first request requires exactly 22 core sections with digest I-4. Delta and Echo are byte-identical mirrors: both contain 22 sections and I-4, although their transfer timestamps differ. Foxtrot contains the same core plus six calibration-trace sections, a 28-section bundle with digest I-9. Identify every copy that meets the first request.",
        "why": "A reference can admit more than one matching copy. A later transfer timestamp does not make identical content more authentic, and a larger bundle does not match an exact-scope request.",
        "prompt": "Select the complete set of copies that satisfies the original core-only request.",
        "controls": [
          {
            "id": "matches",
            "label": "Copies matching the original request",
            "type": "select",
            "options": [
              {
                "value": "Delta only",
                "label": "Delta only"
              },
              {
                "value": "Echo only",
                "label": "Echo only"
              },
              {
                "value": "Delta and Echo",
                "label": "Delta and Echo"
              },
              {
                "value": "Foxtrot only",
                "label": "Foxtrot only"
              }
            ],
            "expected": "Delta and Echo"
          }
        ],
        "before": {
          "room": "digital",
          "shot": "close",
          "values": {},
          "labels": [
            "Signed request: exactly 22 core sections / I-4",
            "Delta 22/I-4 · Echo 22/I-4 · Foxtrot 28/I-9"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "Delta",
              "label": "Delta mirror",
              "shape": "book",
              "color": "#8bbca0",
              "text": "22 sections / I-4 / 09:10"
            },
            {
              "id": "Echo",
              "label": "Echo mirror",
              "shape": "book",
              "color": "#c89179",
              "text": "22 sections / I-4 / 10:40"
            },
            {
              "id": "Foxtrot",
              "label": "Foxtrot trace bundle",
              "shape": "book",
              "color": "#a4afc7",
              "text": "28 sections / I-9 / core + trace"
            }
          ]
        },
        "after": {
          "room": "digital",
          "shot": "close",
          "values": {
            "matching": [
              "Delta",
              "Echo"
            ],
            "verified": true
          },
          "labels": [
            "Two equally matching core mirrors: Delta and Echo",
            "Timestamp does not distinguish identical content"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "Delta",
              "label": "Delta mirror",
              "shape": "book",
              "color": "#8bbca0",
              "text": "22 sections / I-4 / 09:10"
            },
            {
              "id": "Echo",
              "label": "Echo mirror",
              "shape": "book",
              "color": "#c89179",
              "text": "22 sections / I-4 / 10:40"
            },
            {
              "id": "Foxtrot",
              "label": "Foxtrot trace bundle",
              "shape": "book",
              "color": "#a4afc7",
              "text": "28 sections / I-9 / core + trace"
            }
          ]
        },
        "success": "Both Delta and Echo meet 22 sections/I-4. Foxtrot has additional trace material and is outside the original core-only scope.",
        "pitfall": "Forcing a unique winner between identical mirrors invents a distinction the evidence does not support. More sections is not automatically better.",
        "hint": "Compare content identity and required scope. Delta and Echo have the same count and digest despite different transfer times.",
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
              "label": "Delta mirror",
              "shape": "book",
              "color": "#8bbca0",
              "text": "22 sections / I-4 / 09:10"
            },
            {
              "id": "Echo",
              "label": "Echo mirror",
              "shape": "book",
              "color": "#c89179",
              "text": "22 sections / I-4 / 10:40"
            },
            {
              "id": "Foxtrot",
              "label": "Foxtrot trace bundle",
              "shape": "book",
              "color": "#a4afc7",
              "text": "28 sections / I-9 / core + trace"
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
              "label": "Delta mirror",
              "shape": "book",
              "color": "#8bbca0",
              "text": "22 sections / I-4 / 09:10"
            },
            {
              "id": "Echo",
              "label": "Echo mirror",
              "shape": "book",
              "color": "#c89179",
              "text": "22 sections / I-4 / 10:40"
            },
            {
              "id": "Foxtrot",
              "label": "Foxtrot trace bundle",
              "shape": "book",
              "color": "#a4afc7",
              "text": "28 sections / I-9 / core + trace"
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
        "prompt": "Select one required success and one required denial.",
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
          },
          {
            "id": "negative",
            "label": "Negative regression test",
            "type": "select",
            "options": [
              {
                "value": "Reader approval denied",
                "label": "Reader approval denied"
              },
              {
                "value": "Maintainer service denied",
                "label": "Maintainer service denied"
              },
              {
                "value": "Custodian approval denied",
                "label": "Custodian approval denied"
              }
            ],
            "expected": "Reader approval denied"
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
              "label": "Delta mirror",
              "shape": "book",
              "color": "#8bbca0",
              "text": "22 sections / I-4 / 09:10"
            },
            {
              "id": "Echo",
              "label": "Echo mirror",
              "shape": "book",
              "color": "#c89179",
              "text": "22 sections / I-4 / 10:40"
            },
            {
              "id": "Foxtrot",
              "label": "Foxtrot trace bundle",
              "shape": "book",
              "color": "#a4afc7",
              "text": "28 sections / I-9 / core + trace"
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
              "label": "Delta mirror",
              "shape": "book",
              "color": "#8bbca0",
              "text": "22 sections / I-4 / 09:10"
            },
            {
              "id": "Echo",
              "label": "Echo mirror",
              "shape": "book",
              "color": "#c89179",
              "text": "22 sections / I-4 / 10:40"
            },
            {
              "id": "Foxtrot",
              "label": "Foxtrot trace bundle",
              "shape": "book",
              "color": "#a4afc7",
              "text": "28 sections / I-9 / core + trace"
            }
          ]
        },
        "success": "Maintainer service is allowed and reader approval is denied; both outcomes agree with the charter alongside the other seven checks.",
        "pitfall": "A negative-only check set could endorse a blanket denial.",
        "hint": "Choose the action expressly permitted by the charter.",
        "duration": 18
      },
      {
        "id": "handoff",
        "title": "Repair the first read-back",
        "narration": "The confirmed core package can be read from either Delta or Echo. Ari issues South Dome / four / TEAL for its labelled delivery units. Nia first repeats three; Ari corrects the count and waits for the complete destination, quantity and code before confirming this first handoff.",
        "why": "The copy-equivalence decision and delivery instruction answer different questions. Explicit read-back catches the count error without inventing a unique archive winner.",
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
        "title": "A changed scope needs a different bundle",
        "narration": "A new signed scope requests the 22-section core together with six calibration-trace sections: exactly 28 sections with bundle digest I-9. Delta and Echo still match the old core-only request, but neither contains the required trace. Foxtrot contains the signed core-and-trace bundle. Preserve the original two-match finding and select the deliverable for the amended scope.",
        "why": "The decision changes because the required evidence package changes, not because either mirror becomes corrupt or less authentic. Content scope and permission authority remain separate.",
        "prompt": "Choose the amended deliverable and the criterion that justifies it.",
        "controls": [
          {
            "id": "selected",
            "label": "Bundle for the amended trace request",
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
            "expected": "Foxtrot"
          },
          {
            "id": "criterion",
            "label": "Why the deliverable changes",
            "type": "select",
            "options": [
              {
                "value": "Newest transfer timestamp",
                "label": "Newest transfer timestamp"
              },
              {
                "value": "Required core plus calibration trace",
                "label": "Core plus calibration trace"
              },
              {
                "value": "The earlier mirrors are now corrupt",
                "label": "Earlier mirrors are corrupt"
              }
            ],
            "expected": "Required core plus calibration trace"
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
            "matching": [
              "Delta",
              "Echo"
            ],
            "revision": "V1: both 22/I-4 mirrors accepted"
          },
          "labels": [
            "Amended signed scope: 22 core + 6 trace = 28 / I-9",
            "Keep the original core-only comparison"
          ],
          "focus": "manifest",
          "items": [
            {
              "id": "Delta",
              "label": "Delta mirror",
              "shape": "book",
              "color": "#8bbca0",
              "text": "22 sections / I-4 / 09:10"
            },
            {
              "id": "Echo",
              "label": "Echo mirror",
              "shape": "book",
              "color": "#c89179",
              "text": "22 sections / I-4 / 10:40"
            },
            {
              "id": "Foxtrot",
              "label": "Foxtrot trace bundle",
              "shape": "book",
              "color": "#a4afc7",
              "text": "28 sections / I-9 / core + trace"
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
            "selected": "Foxtrot",
            "revision": "V2: Foxtrot 28/I-9 trace bundle",
            "verified": true
          },
          "labels": [
            "Foxtrot satisfies the added trace requirement",
            "Original mirrors remain valid for original scope"
          ],
          "focus": "Foxtrot",
          "items": [
            {
              "id": "Delta",
              "label": "Delta mirror",
              "shape": "book",
              "color": "#8bbca0",
              "text": "22 sections / I-4 / 09:10"
            },
            {
              "id": "Echo",
              "label": "Echo mirror",
              "shape": "book",
              "color": "#c89179",
              "text": "22 sections / I-4 / 10:40"
            },
            {
              "id": "Foxtrot",
              "label": "Foxtrot trace bundle",
              "shape": "book",
              "color": "#a4afc7",
              "text": "28 sections / I-9 / core + trace"
            }
          ]
        },
        "success": "Foxtrot alone provides the signed 28-section/I-9 core-and-trace bundle. Delta and Echo remain valid mirrors of the earlier 22-section/I-4 core.",
        "pitfall": "Calling the mirrors corrupt would erase a valid earlier finding. Choosing the newest timestamp would ignore the added trace requirement.",
        "hint": "Add the six required trace sections to the 22 core sections, then check the signed bundle digest.",
        "duration": 18
      },
      {
        "id": "final-handoff",
        "title": "Complete the revised delivery",
        "narration": "The revised delivery contains the verified Foxtrot core-and-trace bundle. Roles rotate again: Nia issues Hill Station / two / GOLD; Ari repeats all three fields and Nia confirms that exact message. The joint explanation links the load diagnosis, two-copy finding, changed scope, policy checks and both role records.",
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
            "Foxtrot trace bundle · Hill Station / 2 / GOLD",
            "Both role records and preserved revision complete"
          ],
          "focus": "speaker"
        },
        "success": "The Foxtrot trace bundle has its own current destination, count, code and confirmed read-back. The earlier TEAL confirmation remains attached to the earlier core package.",
        "pitfall": "Reusing TEAL would apply the old instruction to the wrong delivery.",
        "hint": "Treat the amended delivery as a distinct message.",
        "duration": 18
      }
    ],
    "artifact": {
      "title": "Complete A2 model submission — Iris Relay",
      "filename": "worked-assessment-a2.md",
      "markdown": "# Complete authored A2 example — Iris Relay\n\n**Teaching demonstration, not an assigned response or a claim of real student activity.**\n\n## Checkpoint: diagnosis before repair\n\n| State / test | Source | Fuse output | Cable output | Lamp supply | Lamp |\n| --- | --- | --- | --- | --- | --- |\n| Powered before repair | 12 V | 12 V | 12 V | 12 V | Dark |\n| Isolated continuity | Source off | Continuous | Continuous | Lamp continuity: OPEN | Fault confirmed |\n| Powered after lamp replacement | 12 V | 12 V | 12 V | 12 V | Lit |\n\nAll voltage readings use the common return. The unchanged voltage trace does not prove the lamp repair; the OPEN pre-repair continuity and verified light explain it. Ari replaced only the lamp with the source isolated.\n\n## Source comparison: more than one valid match\n\nOriginal signed scope: **exactly 22 core sections, digest I-4**.\n\n| Record | Content | Transfer time | Original scope |\n| --- | --- | --- | --- |\n| Delta | 22 sections / I-4 | 09:10 | Matches |\n| Echo | 22 sections / I-4; byte-identical mirror of Delta | 10:40 | Matches |\n| Foxtrot | Same 22 core sections plus 6 calibration-trace sections; 28 / I-9 bundle | 10:15 | Different scope |\n\nThe signed source card supplies both the I-4 core identity and the I-9 bundle composition. Delta and Echo are equally defensible matches for the original request. A later transfer timestamp does not distinguish their content.\n\n## Before and after policy\n\n| Role | Before read/service/approve | After read/service/approve |\n| --- | --- | --- |\n| Reader | Allow / Allow / Allow | Allow / Deny / Deny |\n| Maintainer | Allow / Deny / Deny | Allow / Allow / Deny |\n| Custodian | Allow / Deny / Deny | Allow / Deny / Allow |\n\nAll nine resulting decisions were checked. Positive regression: maintainer service allowed. Negative regression: reader approval denied. The other seven results also matched the charter.\n\n## Handoff records\n\n- Core package: **South Dome / 4 / TEAL**. Nia initially repeated 3. Ari corrected the count; Nia repeated all fields and Ari confirmed.\n- Amended trace package: **Hill Station / 2 / GOLD**. Ari repeated all fields and Nia confirmed. This receipt applies to the Foxtrot bundle, not the earlier core-only instruction.\n\n## Preserved revision\n\n**Version 1:** accepted both Delta and Echo under the 22-section/I-4 core-only scope; completed the first package handoff.\n\n**Signed scope amendment:** deliver the same core **plus six calibration-trace sections**, exactly 28 sections with bundle digest I-9.\n\n**Version 2:** selected Foxtrot under that larger evidence requirement. The original mirrors remain valid for the original scope. The permission charter remains unchanged; the new delivery requires its own confirmed handoff.\n\n## Responsibilities and contribution statements\n\n| Stage | Operator / receiver | Analyst / sender |\n| --- | --- | --- |\n| Circuit | Ari measured, isolated and replaced the lamp | Nia compared fault predictions and continuity |\n| Archive and policy | Nia compared both mirrors and operated the policy | Ari read the signed scope and checked all nine cells |\n| First handoff | Nia corrected 3 to 4 and repeated the full message | Ari issued and confirmed South Dome / 4 / TEAL |\n| Revised handoff | Ari received and repeated the new message | Nia issued and confirmed Hill Station / 2 / GOLD |\n\n**Ari:** I collected the powered readings, performed the isolated continuity and replacement sequence, and verified the lamp output. After rotation I checked the archive scope and policy; I later received the amended handoff. I did not claim that identical mirrors required a unique winner.\n\n**Nia:** I proposed the continuity check because available supply did not prove a healthy load. I then operated the record and policy comparisons, preserved my corrected count error, and issued the amended trace-package instruction after another role exchange.\n\n## Joint explanation (580 words)\n\nOur pair restored Iris Relay and prepared the research package authorised by its current signed request. Ari initially operated the circuit while Nia held the requirement cards and predicted what each possible fault would produce. We agreed to exchange responsibilities after verification. This is an authored example of paired reasoning: the contribution records show who measured, compared, operated and confirmed, rather than treating a shared result as proof of equal understanding.\n\nThe lamp was dark, but Ari measured twelve volts at the source, fuse output, cable output and lamp supply, all against the common return. These readings established available supply throughout the model. They did not establish a complete path through the lamp. Nia rejected an immediate fuse replacement because there was no missing supply after that component. We chose a different test: isolate the source and inspect continuity through the load, with healthy components as comparisons.\n\nWith power off, the supplied continuity record showed the fuse and cable continuous and the lamp open. That evidence supported replacing the lamp. Ari made the replacement while isolated, then restored power. All four supply readings remained twelve volts, but the lamp now lit. The voltage trace alone therefore could not explain the repair; the retained continuity result and changed output could. We preserved both the original dark condition and the verified result before rotating roles.\n\nNia next operated the archive console while Ari stated the first request: exactly twenty-two core sections with digest I-4. Delta and Echo had identical content satisfying both conditions. Their different transfer timestamps did not create different content identities. We recorded both as matching mirrors instead of inventing a unique winner. Foxtrot contained the same core plus six calibration-trace sections, forming a twenty-eight-section bundle with digest I-9. Its extra material was outside the original exact scope, without making that material false or corrupt.\n\nThe permission charter remained a separate question. The reader originally held excess service and approval rights, while specialist roles lacked their required actions. We repaired all nine cells: everyone could read, only the maintainer could service, and only the custodian could approve. We checked both the permitted maintainer service and the denied reader approval, alongside the other seven decisions. Denying everything would remove misuse but also prevent the relay from performing its intended work.\n\nFor the first delivery, either matching mirror supported the core package. Ari issued South Dome, four units, TEAL. Nia initially repeated three units. Ari corrected that discrepancy, and Nia repeated the entire message before confirmation. We retained the mistake because it demonstrates what the protocol caught. Confirmation applied to this package and these fields; it was not general permission for a later delivery.\n\nThe signed amendment then required the core together with six calibration-trace sections, exactly twenty-eight sections and bundle digest I-9. Foxtrot alone met that enlarged scope. Delta and Echo remained valid answers to the earlier request, so Version Two preserved the original two-match finding rather than rewriting it as failure. The amendment changed the deliverable, not the permission charter. Roles rotated again: Nia issued Hill Station, two units, GOLD, and Ari completed a fresh read-back.\n\nOur completed evidence links diagnosis, content scope, authority and communication without treating them as interchangeable checks. Matching a supplied digest establishes reference agreement within this model; it does not establish scientific truth, permanent hardware reliability or a real-world delivery. In a new task we would reuse the reasoning method, identify its actual measurement conventions and requirements, and collect fresh evidence before reusing any conclusion.\n\n## Attribution and limitation\n\nThe names, actions and records are a complete authored example. No physical measurements, external system tests, real student participation or real delivery are claimed. An assessed pair must provide its own records, reasoning, contributions and declared assistance.\n"
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
            "fault": "cable",
            "sourceVoltage": 9
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
            "fault": "none",
            "sourceVoltage": 9
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
            "fault": "none",
            "sourceVoltage": 9
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
            "verified": true,
            "sourceVoltage": 9
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
