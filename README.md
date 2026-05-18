# WildScape Europe

<p align="center">
  <img src="docs/assets/wildscape-release-hero.svg" alt="Animated WildScape Europe Release 1.0.0 hero" width="100%" />
</p>

**WildScape Europe** is a premium React and TypeScript camping discovery platform for European wilderness travel. The application combines animated landing experiences, typed campsite search, deterministic production-style services, weather and aurora intelligence, booking workflows, user dashboards, and interactive map visualization in a single Vite frontend application.[1] [2]

> **Release 1.0.0 is the stable CloseLight build.** The repository now keeps the product surface rich, the maintenance surface light, and every change close to a repeatable validation gate.

## Release 1.0.0 note

Release 1.0.0 turns WildScape Europe into a state-of-the-art product repository rather than a polished working product application. The build ships with animated README graphics, SOLID service boundaries, strict domain types, deterministic production repositories, Vitest coverage across business behavior, zero-warning linting, production deployment guidance, and a focused documentation map.

| Release area | What is ready in 1.0 |
|---|---|
| Product experience | Immersive wilderness landing visuals, campsite discovery, maps, weather, aurora context, bookings, and dashboards. |
| Engineering quality | Strict TypeScript, zero-warning ESLint, typed stores, typed service responses, and explicit real-time event payloads. |
| Testing | Vitest and Testing Library cover services, state behavior, filtering, booking lifecycle, weather behavior, and reusable UI adapters.[3] [4] |
| Repo hygiene | CloseLight standards keep stale documents removed, docs organized, scripts explicit, and validation easy to run. |
| Release confidence | `npm run hygiene` checks documentation style first, then runs the complete validation gate. |

<p align="center">
  <img src="docs/assets/wildscape-system-flow.svg" alt="Animated WildScape Europe system flow" width="92%" />
</p>

## Core capabilities

WildScape Europe provides a complete wilderness discovery flow rather than a static landing page. Users can browse and search a generated catalogue of European campsites, filter by destination and amenities, inspect availability and weather, simulate booking operations, view personalized dashboard content, and receive typed real-time updates.

| Capability | Implementation |
|---|---|
| Campsite catalogue | `CampsiteRepository` generates deterministic campsite data across European countries and regions. |
| Search and suggestions | `productionService.searchCampsites` and `productionService.getSuggestions` expose filterable discovery workflows. |
| Booking workflow | `BookingRepository` owns booking creation, cancellation, seeded user bookings, and confirmation numbers. |
| User profile | `UserRepository` owns preferences, wishlist, and current-user state. |
| Weather and aurora | `WeatherRepository` owns forecasts, current weather, and latitude-aware aurora predictions. |
| Real-time updates | `RealTimeService` publishes discriminated weather, booking, availability, review, and system events. |
| Application state | Zustand stores manage campsite filters and UI map or weather preferences.[5] |
| Visual experience | Framer Motion, Three.js, Mapbox GL, GSAP, and Lenis power the immersive UI layers.[6] [7] [8] |

## Quick start

Install dependencies, then run the development server. A Mapbox token is optional because the repository ships with deterministic local data and production service adapters.

```bash
git clone https://github.com/Alexi5000/WildScape-Europe.git
cd WildScape-Europe
npm install
npm run dev
```

The app starts on the Vite development server. To build and validate the project locally, run the following commands.

```bash
npm run type-check
npm run lint
npm run test
npm run build
npm run hygiene
```

## Environment variables

| Variable | Required | Purpose |
|---|---:|---|
| `VITE_MAPBOX_ACCESS_TOKEN` | No | Enables authenticated Mapbox map rendering when available. The app still works with local service data without it. |

## Project structure

```text
WildScape-Europe/
├── docs/                    # Architecture, API, testing, release, deployment, and hygiene documentation
├── docs/assets/             # Animated README and documentation graphics
├── scripts/                 # Local repository hygiene checks
├── src/
│   ├── components/          # React UI, landing sections, maps, dashboard, and reusable UI adapters
│   ├── data/                # Local campsite seed data
│   ├── hooks/               # Smooth scrolling, map, engagement, and Three.js hooks
│   ├── services/            # SOLID service facades, repositories, map, weather, and real-time services
│   ├── store/               # Zustand state stores
│   ├── test/                # Shared Vitest setup
│   └── types/               # Explicit domain, API, map, weather, and real-time contracts
├── vite.config.ts           # Vite, build, alias, and Vitest configuration
├── package.json             # Runtime, development, validation, and hygiene scripts
└── README.md                # Release 1.0.0 overview
```

## Validation scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Starts the local Vite development server. |
| `npm run type-check` | Runs TypeScript without emitting files. |
| `npm run lint` | Runs ESLint with zero-warning enforcement. |
| `npm run test` | Runs the Vitest suite once. |
| `npm run test:watch` | Runs Vitest in watch mode. |
| `npm run test:coverage` | Runs coverage reporting. |
| `npm run docs:check` | Checks authored Markdown for Release 1.0.0 style requirements, including the no em dash rule. |
| `npm run build` | Runs TypeScript and Vite production build. |
| `npm run validate` | Runs documentation checks, type-check, lint, test, and build in sequence. |
| `npm run hygiene` | Runs the same complete gate under the CloseLight repo hygiene name. |

## Documentation map

See [`SESSION_AND_DATA.md`](docs/SESSION_AND_DATA.md) for session behavior, data contracts, and schema-readiness policy.

| Document | Scope |
|---|---|
| [`docs/RELEASE_1_0.md`](docs/RELEASE_1_0.md) | Release 1.0.0 note, validation evidence, and launch checklist. |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | SOLID architecture, service boundaries, state model, and data flow. |
| [`docs/API.md`](docs/API.md) | Application service contracts and domain response shapes. |
| [`docs/TESTING.md`](docs/TESTING.md) | Automated test strategy, covered scenarios, and local commands. |
| [`docs/QUALITY.md`](docs/QUALITY.md) | Quality model, acceptance gates, and state-of-the-art repo standards. |
| [`docs/REPO_HYGIENE.md`](docs/REPO_HYGIENE.md) | CloseLight repo hygiene rules for docs, branches, scripts, and release readiness. |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Production build, environment variables, and deployment checklist. |
| [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md) | Developer onboarding and troubleshooting. |

## License

This project is licensed under the Apache License 2.0. See [`LICENSE`](LICENSE) for details.

## References

[1]: https://react.dev/ "React Documentation"
[2]: https://vite.dev/ "Vite Documentation"
[3]: https://vitest.dev/ "Vitest Documentation"
[4]: https://testing-library.com/docs/react-testing-library/intro/ "React Testing Library Introduction"
[5]: https://zustand.docs.pmnd.rs/ "Zustand Documentation"
[6]: https://motion.dev/docs/react "Motion for React Documentation"
[7]: https://threejs.org/docs/ "Three.js Documentation"
[8]: https://docs.mapbox.com/mapbox-gl-js/ "Mapbox GL JS Documentation"
