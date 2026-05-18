# Architecture Guide

**WildScape Europe** uses a SOLID-oriented frontend architecture for a production-quality React and TypeScript application. The design separates interface orchestration, state stores, repositories, service facades, domain contracts, and visual infrastructure so each layer can evolve independently.[1] [2]

<p align="center">
  <img src="assets/wildscape-system-flow.svg" alt="Animated WildScape Europe system flow" width="100%" />
</p>

## Architectural principles

| Principle | Implementation |
|---|---|
| Single responsibility | Campsite, booking, user, weather, real-time, map, and UI concerns are implemented in focused modules. |
| Open and closed design | New campsite filters, service methods, or event payloads can be added through explicit contracts without rewriting the whole app shell. |
| Liskov-friendly contracts | Service methods return stable typed response shapes that UI consumers can rely on. |
| Interface segregation | Shared types are separated by domain so consumers import only the contracts they need. |
| Dependency inversion | UI orchestration depends on service facades and typed stores, not on raw seed data or component internals. |

## Layer map

| Layer | Main paths | Responsibility |
|---|---|---|
| Interface shell | `src/App.tsx`, `src/components` | Coordinates views, page sections, animated UI, maps, dashboard, and search interactions. |
| State | `src/store` | Owns UI preferences, map state, campsite filters, and normalized state transitions. |
| Service facades | `src/services/productionService.ts`, `src/services/enhancedApi.ts` | Preserve stable application-facing methods for campsite, booking, user, weather, and analytics behavior. |
| Repositories | `src/services/repositories` | Own deterministic data creation, search, booking, profile, and weather rules. |
| Domain types | `src/types` | Define campsite, weather, booking, map, API, app-handler, and real-time event contracts. |
| Test setup | `src/test/setup.ts`, `src/**/__tests__` | Provides jsdom setup, browser API polyfills, and executable regression coverage. |

## Data flow

The application shell receives user intent through search, filters, map interactions, or dashboard actions. That intent is translated into typed store updates or service facade calls. The facade delegates to deterministic repositories, then returns explicit response shapes to the UI. Real-time behavior uses discriminated event payloads so event subscribers can safely branch on event type.

| Flow | Source | Destination | Contract |
|---|---|---|---|
| Campsite search | Search UI | Campsite repository | `CampsiteFilter`, search query, and typed result list. |
| Booking | Booking panel | Booking repository | User, campsite, date range, guest count, and confirmation data. |
| Weather | Map or detail page | Weather repository | Location and forecast or current condition shape. |
| Events | Real-time service | Subscribed components | Discriminated event payloads by event name. |
| UI preferences | Controls | Zustand UI store | Map style, weather layer, and display preferences. |

## Module ownership

| Ownership boundary | Maintainer rule |
|---|---|
| Components | Render experiences and call typed handlers. They should not own repository data generation. |
| Stores | Own state transitions and normalization. They should not fetch remote data directly. |
| Services | Provide stable app methods. They should not render UI or depend on browser layout state. |
| Repositories | Own deterministic business behavior. They should not know about React components. |
| Types | Describe shared contracts. They should not contain runtime side effects. |

## Extension patterns

A new campsite filter should start with a domain type update, then update the repository search logic, store translation, UI control, and tests. A new real-time event should start with a discriminated payload type, then add publisher and subscriber behavior. A new external API integration should be wrapped behind a service facade so the UI contract remains stable.

## References

[1]: https://react.dev/learn/thinking-in-react "Thinking in React"
[2]: https://www.typescriptlang.org/docs/ "TypeScript Documentation"
[3]: https://zustand.docs.pmnd.rs/ "Zustand Documentation"
