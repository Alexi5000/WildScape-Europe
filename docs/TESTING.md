# Testing Guide

WildScape Europe uses a layered test strategy that protects service contracts, state stores, filter translation, booking lifecycle, weather behavior, real-time event contracts, and reusable UI adapters. The suite is built with Vitest and React Testing Library so tests run quickly in the same TypeScript project used by the application.[1] [2]

## Test commands

| Command | Purpose |
|---|---|
| `npm run test` | Runs the complete Vitest suite once. |
| `npm run test:watch` | Runs Vitest in watch mode during development. |
| `npm run test:coverage` | Runs Vitest with coverage output. |
| `npm run test:ci` | Runs Vitest once with the Release 1.0 coverage reporter. |
| `npm run validate` | Runs docs, types, lint, tests, and production build. |
| `npm run hygiene` | Runs the complete CloseLight release gate. |

## Coverage map

| Layer | Covered behavior | Test file |
|---|---|---|
| Campsite services | Search, suggestions, lookup behavior, and filtered result contracts. | `src/services/__tests__/services.test.ts` |
| Booking services | Booking creation, confirmation behavior, cancellation behavior, and user booking retrieval. | `src/services/__tests__/services.test.ts` |
| Weather services | Current weather and aurora-aware data behavior. | `src/services/__tests__/services.test.ts` |
| Real-time services | Typed event subscription and event payload handling. | `src/services/__tests__/services.test.ts` |
| Store behavior | JSON normalization, filter application, and search-filter translation. | `src/store/__tests__/campsiteStore.test.tsx` |
| UI adapter | Reusable button adapter rendering and interaction contract. | `src/store/__tests__/campsiteStore.test.tsx` |

## Coverage reporting

The Release 1.0 coverage reporter uses the Vitest V8 provider and focuses on the tested service, store, and reusable UI adapter surface. This keeps coverage actionable instead of mixing deterministic logic coverage with animation-heavy visual components that are better protected by interaction tests, accessibility reviews, and visual QA.

| Coverage scope | Reason |
|---|---|
| `src/services` | Protects contract, repository, weather, booking, user, and event logic. |
| `src/store` | Protects state normalization and filter translation. |
| `src/components/ui` | Protects shared UI primitives that are reused by map controls and feature components. |

## Test design principles

The suite favors deterministic data and domain behavior over brittle snapshots. Tests should verify user-impacting outcomes, typed service contracts, and state transitions. A new feature is considered complete only when the relevant service, store, or component behavior is protected by at least one focused test.

| Principle | Practice |
|---|---|
| Deterministic fixtures | Use local seeded repositories and explicit values. |
| Contract clarity | Assert response shapes and important domain fields. |
| User behavior | Prefer Testing Library interactions for rendered UI adapters. |
| Fast feedback | Keep tests independent and avoid network calls. |
| Release confidence | Run `npm run hygiene` before merge or release. |

## Adding tests

Place tests close to the behavior they protect. Service tests belong under `src/services/__tests__`, store tests under `src/store/__tests__`, and shared setup belongs in `src/test/setup.ts`. When a public service contract changes, update both the tests and `docs/API.md`.

## Regression checklist

| Change type | Required tests |
|---|---|
| New service method | Happy path, failure or empty state, and typed response assertion. |
| New store behavior | Initial state, mutation, and derived selector or translation behavior. |
| New UI primitive | Rendering, class composition, accessibility role when relevant, and click or keyboard interaction. |
| New map or animation behavior | Type coverage, smoke behavior, and manual visual QA note in the pull request. |

## References

[1]: https://vitest.dev/ "Vitest Documentation"
[2]: https://testing-library.com/docs/react-testing-library/intro/ "React Testing Library Introduction"
[3]: https://typescript-eslint.io/ "typescript-eslint Documentation"
[4]: https://v8.dev/blog/javascript-code-coverage "V8 JavaScript Code Coverage"
