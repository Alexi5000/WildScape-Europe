# Quality Standard

**WildScape Europe** uses a state-of-the-art repository quality model built around typed contracts, repeatable validation, deterministic behavior, and clear ownership. The goal is not only to make the application run, but to make the repository easy to maintain, audit, test, and release.

## Quality pillars

| Pillar | Standard | Proof |
|---|---|---|
| Type safety | Domain values are represented through explicit TypeScript interfaces and unions. | `npm run type-check` |
| Lint discipline | ESLint runs with zero-warning enforcement so warnings do not become a second backlog. | `npm run lint` |
| Test reliability | Business behavior is validated through deterministic unit and integration tests. | `npm run test` |
| Build readiness | The production bundle is generated from the same source that passes tests. | `npm run build` |
| Documentation hygiene | Release docs are curated, linked, and checked for the no em dash style rule. | `npm run docs:check` |
| Release hygiene | The complete CloseLight gate runs before a release is considered ready. | `npm run hygiene` |

## Engineering expectations

The codebase should prefer small modules with explicit responsibilities. Repositories own deterministic data behavior, services expose stable contracts, stores own UI or domain state, and components render product experiences. New features should follow the same boundaries so the application remains scalable without a large rewrite.

| Change type | Required quality action |
|---|---|
| New service behavior | Add or update a service test and update `docs/API.md` when the public contract changes. |
| New store behavior | Add or update a store test and document any user-facing workflow in the relevant guide. |
| New animated UI | Keep the animation isolated in a component or asset and verify it does not weaken accessibility. |
| New release note | Update `CHANGELOG.md`, `docs/RELEASE_1_0.md` when relevant, and run `npm run docs:check`. |
| New dependency | Explain why the dependency is needed and keep bundle impact visible through the build output. |

## Acceptance gate

A branch is release-ready only when the complete hygiene gate passes from a clean checkout.

```bash
npm install
npm run hygiene
```

This gate intentionally combines documentation checks with engineering checks. Product quality and repository quality are treated as one release system.

## References

[1]: https://www.typescriptlang.org/docs/ "TypeScript Documentation"
[2]: https://eslint.org/docs/latest/ "ESLint Documentation"
[3]: https://vitest.dev/ "Vitest Documentation"
[4]: https://vite.dev/ "Vite Documentation"
