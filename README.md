# WildScape Europe

**WildScape Europe** is a premium React and TypeScript camping discovery platform for European wilderness travel. The application combines animated landing experiences, typed campsite search, deterministic mock production services, weather and aurora intelligence, booking workflows, user dashboards, and interactive map visualization in a single Vite-powered frontend application.[1] [2]

> WildScape Europe is designed as a self-contained product prototype: it can run entirely from local deterministic data and mock services, while its architecture cleanly separates UI orchestration, repositories, domain types, state management, and service adapters.

## Project status

| Area | Current state |
|---|---|
| Branch strategy | `main` is the single synchronized active branch. |
| Type safety | Strict TypeScript passes with `npm run type-check`. |
| Testing | Vitest and Testing Library cover services, state stores, real-time events, and reusable UI adapters.[3] [4] |
| Build | Vite production build is configured with manual vendor chunking and terser minification.[2] |
| Architecture | SOLID-oriented decomposition separates campsite, booking, user, weather, map, real-time, store, and UI responsibilities. |
| Documentation | Root and `/docs` documentation describe setup, architecture, API contracts, testing, and deployment. |

## Core capabilities

WildScape Europe provides a complete wilderness discovery flow rather than a static landing page. Users can browse and search a generated catalogue of European campsites, filter by destination and amenities, inspect availability and weather, simulate booking operations, view personalized dashboard content, and receive typed real-time updates.

| Capability | Implementation |
|---|---|
| Campsite catalogue | `CampsiteRepository` generates deterministic campsite data across European countries and regions. |
| Search and suggestions | `mockBackend.searchCampsites` and `mockBackend.getSuggestions` expose filterable discovery workflows. |
| Booking workflow | `BookingRepository` owns booking creation, cancellation, seeded user bookings, and confirmation numbers. |
| User profile | `UserRepository` owns preferences, wishlist, and current-user state. |
| Weather and aurora | `WeatherRepository` owns forecasts, current weather, and latitude-aware aurora predictions. |
| Real-time updates | `RealTimeService` publishes discriminated weather, booking, availability, review, and system events. |
| Application state | Zustand stores manage campsite filters and UI map/weather preferences.[5] |
| Visual experience | Framer Motion, Three.js, Mapbox GL, GSAP, and Lenis power the immersive UI layers.[6] [7] [8] |

## Quick start

Install dependencies, then run the development server. A Mapbox token is optional because the repository ships with deterministic local data and mock services.

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
```

## Environment variables

| Variable | Required | Purpose |
|---|---:|---|
| `VITE_MAPBOX_ACCESS_TOKEN` | No | Enables authenticated Mapbox map rendering when available. The app still works with local service data without it. |

## Project structure

```text
WildScape-Europe/
├── src/
│   ├── components/          # React UI, landing sections, maps, dashboard, and reusable UI adapters
│   ├── data/                # Local campsite seed data
│   ├── hooks/               # Smooth scrolling, map, and Three.js hooks
│   ├── services/            # SOLID service facades, repositories, map, weather, and real-time services
│   ├── store/               # Zustand state stores
│   ├── test/                # Shared Vitest setup
│   └── types/               # Explicit domain, API, map, weather, and real-time contracts
├── docs/                    # Production documentation
├── public/                  # Static assets
├── vite.config.ts           # Vite, build, alias, and Vitest configuration
├── package.json             # Runtime, development, and validation scripts
└── README.md                # Project overview
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
| `npm run build` | Runs TypeScript and Vite production build. |
| `npm run validate` | Runs type-check, lint, test, and build in sequence. |

## Documentation

| Document | Scope |
|---|---|
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | SOLID architecture, service boundaries, state model, and data flow. |
| [`docs/API.md`](docs/API.md) | Application service contracts and domain response shapes. |
| [`docs/TESTING.md`](docs/TESTING.md) | Automated test strategy, covered scenarios, and local commands. |
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
