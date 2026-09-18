# MASTERMIND: Academy of Impossible Skills

## Direction and boundary

This redesign follows the user's rejection of the abstract Glass Crown implementation and approval of the replacement plan. It combines a third-person, stylised academy, distinct practical learning models, campus alternatives and a recovery capstone. Publication remains user-owned.

## Architecture

- Astro renders the full academic course, navigation, static worksheets and assessment descriptions.
- `src/data/curriculum.ts` defines the twelve capabilities and their connections. Dates and weights remain in the content records.
- `src/lib/training-engine.ts` contains deterministic weekly models and practice, check and transfer configurations. Semantic controls and scene equipment call the same rules.
- `src/game/world.ts` loads original GLB models, constructs the academy rooms, animates the student character and handles Rapier movement and collision. Graphics receive authoritative model state and cannot award completion.
- `src/lib/mission-engine.ts` implements the individual trial, paired relay and six-zone recovery mission with role tools, dependencies, evidence, preserved plans and debriefs.
- `src/lib/passport.ts` validates version-two backups, preserves version-one data for export, protects corrupted saves and retains work in memory when browser storage fails.
- Runtime assets are local. The implementation has no authentication, database, submission service, AI runtime or multiplayer server.

## Integration events

| Event | Purpose |
| --- | --- |
| `mastermind:interact` | Scene equipment requests an action; the active model validates it. |
| `mastermind:scene-state` | Model state drives visible mechanisms, circuits, displays and routes. |
| `mastermind:evidence` | An explicitly recorded attempt enters the skills passport. |
| `mastermind:checkpoint` | Unfinished practice and reflection are saved separately from evidence. |
| `mastermind:restore`, `mastermind:replace`, `mastermind:reset` | Validated lifecycle updates restore or reset the active lesson. |
| `mastermind:mission-zone` | The scene and semantic navigator share the current mission area. |

## Teaching progression

Observe and remember → represent space → diagnose mechanisms and electronics → investigate records and permissions → communicate and negotiate → predict simulated sensors → revise dependencies → recover the archive.

Every lab provides practice, check and transfer configurations. Printable campus packs target the same concepts. Browser checks do not validate construction of physical equipment or physical dexterity.

## Assessments

Fieldwork **10%**, individual workshop **20%**, paired relay **25%**, four-role recovery **45%**. A1 is due 19 March 2027; A2 has a 23 April checkpoint and 30 April final deadline, after communication teaching. The final is due 28 May. The software reports practice outcomes, not academic grades. Shared roles use one browser with rotating control or screen sharing; solo practice permits role switching.

## Save compatibility

The new key is `mastermind:SLOP4408:v2`. The legacy key, `mastermind:SLOP4408:v1`, is read only for an explicit raw backup download. Imports must be JSON, at most 1 MB, and pass version, identifier and model-domain validation before replacement. Replacing existing work requires confirmation. Role selection records a practice responsibility, not verified identity.

## Local verification and release

Use the pinned runtime in WSL:

```sh
export PATH="$HOME/.local/bin:$PATH"
mise exec -- pnpm check
mise exec -- pnpm check:evidence
mise exec -- pnpm test:browser
mise exec -- pnpm preview --host 0.0.0.0
```

The [validation record](REDESIGN-VALIDATION.md) distinguishes local automated and rendered checks from live GitHub Pages, CI and user acceptance. Commit without signing; the user will push.
