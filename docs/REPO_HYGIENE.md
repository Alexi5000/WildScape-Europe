# CloseLight Repo Hygiene

**CloseLight Repo Hygiene** is the maintenance standard for WildScape Europe. It closes loose ends, keeps the repository light, and verifies that the project is always near a shippable state.

## Operating model

| Rule | Practice |
|---|---|
| Close loose ends | Remove stale docs, dead scripts, unused branches, and outdated setup notes instead of letting them drift. |
| Keep the surface light | Prefer a small curated docs tree over many overlapping files. |
| Prove the state | Run `npm run hygiene` before release work is considered complete. |
| Make intent obvious | Give every script, document, type, repository, and service a clear responsibility. |
| Avoid style drift | Authored Markdown must not use em dashes and must keep release language current. |

## Repository surfaces

| Surface | Hygiene expectation |
|---|---|
| `README.md` | Acts as the public front door with animated graphics, release status, quick start, and documentation links. |
| `docs/` | Holds focused guides for release, architecture, API, testing, quality, hygiene, deployment, and onboarding. |
| `src/services/` | Separates repository-level behavior from facade-level behavior. |
| `src/types/` | Centralizes shared domain contracts and avoids broad untyped objects. |
| `src/**/__tests__` | Keeps behavior tests close to the code being protected. |
| `scripts/` | Contains lightweight checks that do not require external services. |

## Routine maintenance checklist

| Frequency | Action |
|---|---|
| Every change | Run the narrow command for the touched area, then run `npm run hygiene` before commit. |
| Every documentation update | Run `npm run docs:check` and verify links in the README documentation map. |
| Every dependency update | Run `npm run validate` and inspect build chunk output for unexpected growth. |
| Every release | Update `CHANGELOG.md`, confirm the release note, and tag only after the hygiene gate passes. |

## No em dash rule

The repository uses a plain professional writing style. Authored Markdown should use commas, colons, semicolons, or parentheses instead of em dashes. The check is automated through `npm run docs:check`.
