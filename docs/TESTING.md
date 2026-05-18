# Testing Guide

WildScape Europe uses **Vitest** for Vite-native test execution and **React Testing Library** for component assertions based on user-visible behavior.[1] [2] The test suite is intentionally focused on stable product seams: services, repositories, stores, event delivery, and reusable UI adapters.

> Tests should verify contracts, not implementation trivia. A passing suite means the public behavior of the service layer, store layer, and component adapters remains safe to refactor.

## Test commands

| Command | Purpose |
|---|---|
| `npm run test` | Runs the full suite once in CI-style mode. |
| `npm run test:watch` | Runs Vitest interactively while developing. |
| `npm run test:coverage` | Produces text, JSON, and HTML coverage output in `coverage/`. |
| `npm run validate` | Runs type-check, lint, tests, and production build in order. |

## Test environment

The shared test setup lives in `src/test/setup.ts`. It loads jest-dom matchers, stubs `matchMedia`, and provides a `ResizeObserver` mock so browser-oriented components can render in jsdom.[3]

| Configuration | Location |
|---|---|
| Test runner | `vite.config.ts` under the `test` key. |
| Environment | `jsdom`. |
| Global setup | `src/test/setup.ts`. |
| Path alias | `@` points to `src`. |

## Current coverage areas

| Test file | Behavior validated |
|---|---|
| `src/services/__tests__/services.test.ts` | Campsite catalogue size and identifiers, typed filtering, booking creation and cancellation, search history, recently viewed campsites, aurora latitude rules, wishlist operations, typed booking events, and notification preferences. |
| `src/store/__tests__/campsiteStore.test.tsx` | Campsite JSON normalization, text and structured filtering, search-filter translation, and semantic button behavior. |

## Adding new tests

New tests should live near the code they protect. Service tests belong in `src/services/__tests__`, store tests belong in `src/store/__tests__`, and component tests should be colocated by feature when they verify user behavior.

| Scenario | Preferred test style |
|---|---|
| Pure domain logic | Unit test the repository or helper directly. |
| Service orchestration | Call the public facade and assert typed outputs. |
| Store transition | Reset Zustand state, execute store actions, and assert final state. |
| Component interaction | Render with Testing Library and interact with `userEvent`. |
| Real-time event | Subscribe a listener, emit the event, assert payload, and unsubscribe. |

## Reliability rules

Tests should not rely on external network calls, real credentials, wall-clock timing, or browser APIs that are not controlled by setup mocks. The current suite uses deterministic repository data and local service simulations so failures represent application regressions rather than environmental instability.

## References

[1]: https://vitest.dev/ "Vitest Documentation"
[2]: https://testing-library.com/docs/react-testing-library/intro/ "React Testing Library Introduction"
[3]: https://github.com/jsdom/jsdom "jsdom Project"
