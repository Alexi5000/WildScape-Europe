# Getting Started

This guide explains how to run, validate, and understand WildScape Europe locally. The application is a Vite-powered React and TypeScript SPA with deterministic local services, so a new contributor can run the full product without provisioning a back end.[1] [2]

> The fastest successful setup is `npm install`, `npm run dev`, and `npm run validate`. A Mapbox token is optional.

## Prerequisites

| Tool | Required version | Notes |
|---|---:|---|
| Node.js | 18 or newer | Node 20 or newer is recommended for modern local development. |
| npm | 9 or newer | The repository includes `package-lock.json`, so npm is the default package manager. |
| Git | Current stable | Required for branch, commit, and contribution workflow. |
| Browser | Current Chromium, Firefox, Safari, or Edge | WebGL-capable browsers provide the best visual experience. |

## Installation

```bash
git clone https://github.com/Alexi5000/WildScape-Europe.git
cd WildScape-Europe
npm install
npm run dev
```

The Vite development server prints the local URL in the terminal. If the default port is occupied, Vite will either choose another port or can be started explicitly with `npm run dev -- --port 5173`.

## Optional environment setup

Create a local `.env` file only when you need a public Mapbox token for authenticated map rendering.

```bash
cat > .env <<'EOF'
VITE_MAPBOX_ACCESS_TOKEN=your_public_mapbox_token
EOF
```

Vite only exposes variables prefixed with `VITE_` to the browser bundle.[3] Do not place private server credentials in `.env` for this frontend application.

## First product walkthrough

| Step | What to verify |
|---|---|
| Landing | The mountain-themed hero, background effects, and primary calls to action render. |
| Search | Search text and filters return a deterministic campsite list. |
| Map | Map controls and selected campsite state respond without runtime errors. |
| Details | Campsite detail views show pricing, location, amenities, weather, and booking actions. |
| Booking | A mock booking returns a confirmation payload. |
| Dashboard | User bookings, recommendations, and wishlist-related surfaces render. |

## Validation workflow

Run the full repository gate before committing changes.

```bash
npm run validate
```

The validation command is intentionally strict. It runs type checking, linting, unit tests, and the production build so failures are caught before deployment.

| Command | When to use it |
|---|---|
| `npm run type-check` | After changing TypeScript contracts, services, stores, or component props. |
| `npm run lint` | After changing implementation code. |
| `npm run test` | After changing services, stores, utilities, or components covered by tests. |
| `npm run test:watch` | While actively developing tests. |
| `npm run build` | Before deployment or when modifying build configuration. |
| `npm run preview` | To inspect the production artifact locally. |

## Where to start in the codebase

| Area | Entry point |
|---|---|
| Application orchestration | `src/App.tsx` |
| Campsite domain types | `src/types/campsite.ts` |
| API and response types | `src/types/api.ts` |
| Repository layer | `src/services/repositories/` |
| Compatibility facade | `src/services/mockBackend.ts` |
| Enhanced product workflows | `src/services/enhancedApi.ts` |
| Real-time events | `src/services/realTimeService.ts` |
| Campsite state | `src/store/campsiteStore.ts` |
| UI/map state | `src/store/uiStore.ts` |
| Test setup | `src/test/setup.ts` |

## Development expectations

Changes should preserve the SOLID boundaries documented in [`ARCHITECTURE.md`](ARCHITECTURE.md). UI components should not generate domain data or contain booking/weather business rules. New service behavior should be represented in typed contracts and tested through Vitest.[4]

| Change type | Expected follow-up |
|---|---|
| New domain behavior | Add or update service/repository tests. |
| New store action | Add a store transition test. |
| New component adapter | Add a Testing Library test for user-visible behavior. |
| Type changes | Run `npm run type-check` and update docs if public contracts changed. |
| Build configuration changes | Run `npm run build` and `npm run preview`. |

## Troubleshooting

| Problem | Resolution |
|---|---|
| Dependency install fails | Delete `node_modules`, keep `package-lock.json`, and run `npm install` again. |
| Port is occupied | Start with `npm run dev -- --port 5173`. |
| Browser API missing in tests | Add a targeted mock to `src/test/setup.ts`. |
| TypeScript fails after data changes | Normalize data into the `Campsite` type instead of weakening types. |
| Map does not show external tiles | Check `VITE_MAPBOX_ACCESS_TOKEN`, or continue with local deterministic service data. |
| Production preview differs from dev | Run `npm run build`, then `npm run preview`, and inspect console output for bundled-runtime errors. |

## Next reading

| Document | Purpose |
|---|---|
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Understand SOLID layers and data flow. |
| [`API.md`](API.md) | Review service contracts and migration path to a real API. |
| [`TESTING.md`](TESTING.md) | Understand the Vitest strategy and how to add coverage. |
| [`DEPLOYMENT.md`](DEPLOYMENT.md) | Prepare a production static deployment. |

## References

[1]: https://vite.dev/ "Vite Documentation"
[2]: https://react.dev/ "React Documentation"
[3]: https://vite.dev/guide/env-and-mode "Vite Environment Variables and Modes"
[4]: https://vitest.dev/ "Vitest Documentation"
