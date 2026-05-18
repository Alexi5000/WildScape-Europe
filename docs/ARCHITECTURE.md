# WildScape Europe Architecture

WildScape Europe is a Vite, React, and TypeScript single-page application that models a premium camping marketplace prototype.[1] [2] The codebase is organized around **explicit domain boundaries** so UI components do not own data generation, booking logic, weather calculation, or real-time event delivery.

> The architectural goal is to make every module easy to reason about, test, and replace. Components render state, stores coordinate UI-level state, services expose application use cases, repositories own domain data operations, and shared types keep contracts explicit.

## Architectural principles

| SOLID principle | Repository implementation |
|---|---|
| Single responsibility | `CampsiteRepository`, `BookingRepository`, `UserRepository`, and `WeatherRepository` each own one domain concern. |
| Open/closed | Service facades expose stable methods while repositories can be extended with real HTTP clients later. |
| Liskov substitution | Repository classes can be replaced by remote adapters as long as they preserve the same typed method contracts. |
| Interface segregation | UI code consumes narrow use-case methods rather than a broad untyped object. |
| Dependency inversion | `mockBackend` and `enhancedApiService` depend on domain repositories and typed contracts rather than UI components. |

## Runtime layers

| Layer | Primary files | Responsibility |
|---|---|---|
| Application shell | `src/App.tsx` | Coordinates view mode, selected campsite, dashboard visibility, weather state, and high-level user flows. |
| Components | `src/components/**` | Render visual states, user interactions, map controls, search panels, detail views, and dashboard sections. |
| State stores | `src/store/campsiteStore.ts`, `src/store/uiStore.ts` | Hold client-side filter state, selected campsite state, map preferences, and UI preferences. |
| Application services | `src/services/mockBackend.ts`, `src/services/enhancedApi.ts` | Expose product use cases such as search, booking, profile, reviews, weather, and recommendations. |
| Domain repositories | `src/services/repositories/*` | Own deterministic data generation and domain-specific mutations. |
| Shared contracts | `src/types/*` | Define campsite, map, weather, API, and real-time event structures. |
| Tests | `src/services/__tests__`, `src/store/__tests__` | Validate services, repositories, stores, event publishing, and UI adapters with Vitest.[3] |

## Service decomposition

The service layer was split so application workflows can evolve without creating another god module. `mockBackend` remains the compatibility facade for existing components, while repository classes hold separate responsibilities.

| Service boundary | Responsibility | Typical consumers |
|---|---|---|
| `CampsiteRepository` | Deterministic campsite catalogue generation, search filtering, suggestion generation, and campsite lookup. | Search components, campsite store, enhanced API. |
| `BookingRepository` | Booking submission, cancellation, availability checks, seeded user bookings, and confirmation identifiers. | Booking form, user dashboard, tests. |
| `UserRepository` | Current user, profile creation, preferences, wishlist, search history, and recently viewed campsites. | Dashboard and enhanced API. |
| `WeatherRepository` | Current weather, multi-day forecasts, route conditions, and aurora forecast logic. | Map panels, detail views, enhanced API. |
| `RealTimeService` | Discriminated event delivery for availability, weather alerts, reviews, bookings, and system events. | Notification surfaces and tests. |

## Data flow

The default product flow starts in the application shell. User actions update store or service state, services delegate domain operations to repositories, and components re-render from typed results.

```text
User interaction
  -> React component event handler
  -> Zustand store or application service
  -> Domain repository or typed event bus
  -> Typed result, state update, or notification event
  -> React component render
```

This flow keeps data access and UI rendering separate. For example, campsite filtering is not duplicated in a visual search component; the store and service layer own that behavior so both the UI and tests can exercise the same contract.

## State management

Zustand provides lightweight state management without imposing reducers or provider boilerplate.[4] WildScape Europe uses it for client state that must be shared across components but does not belong in a repository.

| Store | State scope | Design note |
|---|---|---|
| `useCampsiteStore` | Campsite list, filtered list, selected campsite, search query, filters, loading, and errors. | JSON data is normalized into strict `Campsite` objects before use. |
| `useUIStore` | Map viewport, selected coordinates, weather layer mode, and global UI preferences. | Map and weather options are typed so visual controls cannot emit invalid state. |

## Testing architecture

The test suite intentionally targets architectural seams. Service tests verify that repositories and facades preserve product behavior, store tests verify state transitions and data normalization, and UI adapter tests verify semantic rendering. The stack uses Vitest for fast Vite-native testing and Testing Library for user-centered React assertions.[3] [5]

| Test file | Coverage |
|---|---|
| `src/services/__tests__/services.test.ts` | Campsite catalogue, search, booking lifecycle, enhanced API history, aurora rules, wishlist operations, and real-time events. |
| `src/store/__tests__/campsiteStore.test.tsx` | Campsite loading, filtering, search-filter translation, and reusable button semantics. |

## Extension strategy

The current repository uses deterministic local data so it is safe to run without credentials. A production back end can be introduced by replacing repository implementations with API clients while keeping the current facades and domain types intact. This approach limits change impact to infrastructure code and avoids forcing visual components to understand transport details.

| Future replacement | Low-risk migration path |
|---|---|
| Remote campsite API | Implement a `CampsiteRepository` adapter that returns the existing `Campsite` type. |
| Real booking service | Replace `BookingRepository` internals while keeping `submitBooking`, `cancelBooking`, and `getUserBookings`. |
| Authenticated profiles | Replace `UserRepository` persistence and keep typed profile methods. |
| Live weather provider | Replace `WeatherRepository` calculations with provider calls normalized to current weather types. |
| WebSocket notifications | Replace simulated intervals in `RealTimeService` with socket messages mapped to existing event discriminants. |

## References

[1]: https://react.dev/ "React Documentation"
[2]: https://vite.dev/ "Vite Documentation"
[3]: https://vitest.dev/ "Vitest Documentation"
[4]: https://zustand.docs.pmnd.rs/ "Zustand Documentation"
[5]: https://testing-library.com/docs/react-testing-library/intro/ "React Testing Library Introduction"
