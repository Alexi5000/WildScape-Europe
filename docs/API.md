# API and Service Contracts

WildScape Europe is a frontend application with deterministic local repositories and production-style service facades. These facades behave like API adapters: they expose typed application contracts while keeping data generation and domain logic behind isolated modules.

## Service overview

| Service | Responsibility | Main consumers |
|---|---|---|
| `mockBackend` | Campsite search, suggestions, booking, user profile, wishlist, and weather workflows. | App shell, search components, dashboard, booking panels. |
| `enhancedApiService` | Higher-level typed API response wrappers and user-facing application operations. | App shell and future remote API adapters. |
| `realTimeService` | Discriminated event subscription and publication for weather, booking, availability, review, and system events. | UI notifications and reactive app features. |
| `mapService` | Map configuration, style, layer, and interaction support. | Map components and controls. |

## Response model

Service methods should return explicit domain values or typed wrappers. This keeps UI code readable and makes testing deterministic.

| Pattern | Meaning |
|---|---|
| `Promise<Campsite[]>` | A successful list of domain objects. |
| `Promise<Campsite | null>` | A lookup that may not find a campsite. |
| `Promise<Booking>` | A completed booking mutation with confirmation data. |
| `Promise<ApiResponse<T>>` | A facade response that can include data, status, and error information. |
| `void unsubscribe()` | A function returned by event subscription methods to clean up listeners. |

## Campsite discovery

Campsite discovery uses `CampsiteFilter` and search query inputs. Filters should remain serializable because they are used by stores, tests, and UI controls.

| Contract | Expected behavior |
|---|---|
| `searchCampsites(filters)` | Returns campsites matching region, country, amenities, rating, price, date, and guest criteria. |
| `getCampsiteById(id)` | Returns one campsite or `null`. |
| `getSuggestions(query)` | Returns deterministic search suggestions suitable for autosuggest UI. |

## Booking workflow

Booking operations are deterministic and local in Release 1.0, but the contracts are shaped for future remote adapters.

| Contract | Expected behavior |
|---|---|
| `createBooking(input)` | Creates a booking with campsite, user, dates, guest count, pricing, and confirmation details. |
| `getUserBookings(userId)` | Returns bookings associated with the current or requested user. |
| `cancelBooking(bookingId)` | Marks or removes the booking according to repository behavior and returns a typed result. |

## Weather and aurora workflow

Weather contracts support campsite context, current conditions, forecasts, and aurora-aware visual layers. Consumers should rely on typed condition values rather than raw strings.

| Contract | Expected behavior |
|---|---|
| `getCurrentWeather(location)` | Returns current weather values for a location. |
| `getWeatherForecast(location)` | Returns forecast entries for planning views. |
| `getAuroraForecast(latitude)` | Returns aurora probability shaped for visual experiences. |

## Real-time events

Real-time events use discriminated payloads so subscribers can handle each event safely.

| Event family | Example payload concern |
|---|---|
| Weather | Condition changes, forecast updates, and alert information. |
| Booking | Booking created, booking updated, or cancellation state. |
| Availability | Campsite availability changes. |
| Review | New review or rating signals. |
| System | General app messages and operational state. |

## Contract change checklist

| Change | Required update |
|---|---|
| New method | Add explicit input and output types, then add tests. |
| Changed response | Update domain types, tests, and relevant docs. |
| New event | Add a discriminated payload and subscription test. |
| New remote adapter | Keep facade names stable and isolate network behavior behind the adapter. |
