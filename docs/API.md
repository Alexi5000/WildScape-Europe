# WildScape Europe API and Service Contracts

WildScape Europe currently exposes application behavior through TypeScript service facades rather than a network API. This keeps the prototype deterministic, testable, and runnable without credentials while preserving stable contracts for a future HTTP or WebSocket back end.[1]

> Treat this document as the application contract reference. Methods listed here are the boundaries that UI code should consume, and repository implementations may change as long as these method-level contracts remain stable.

## Service overview

| Facade | File | Responsibility |
|---|---|---|
| `mockBackend` | `src/services/mockBackend.ts` | Compatibility facade for campsite, booking, user, weather, reviews, and analytics workflows. |
| `enhancedApiService` | `src/services/enhancedApi.ts` | Higher-level product workflows such as recommendations, search history, recently viewed campsites, route conditions, and wishlist operations. |
| `realTimeService` | `src/services/realTimeService.ts` | Client-side event bus for availability, booking, weather, review, and system events. |
| `mapService` | `src/services/mapService.ts` | Map initialization, markers, viewport, geocoding-like behavior, and map layer coordination. |

## Campsite contracts

The campsite catalogue is returned as strict `Campsite` objects. Campsite identifiers use the `camp_###` format.

```typescript
const campsites = await mockBackend.getCampsites();
const campsite = await mockBackend.getCampsiteById('camp_001');
const results = await mockBackend.searchCampsites({
  country: 'Norway',
  difficulty: 'easy',
  priceRange: [0, 200],
  capacity: 5,
  amenities: ['aurora_viewing'],
});
```

| Method | Input | Output |
|---|---|---|
| `getCampsites()` | None | `Promise<Campsite[]>` |
| `getCampsiteById(id)` | Campsite id | `Promise<Campsite | null>` |
| `searchCampsites(filters)` | `SearchFilters` | `Promise<Campsite[]>` |
| `getSuggestions(query)` | Search text | `Promise<string[]>` |

## Booking contracts

Bookings are created through a narrow payload that contains only product-level details. The repository generates booking ids and confirmation numbers.

```typescript
const booking = await mockBackend.submitBooking({
  campsiteId: 'camp_001',
  selectedDates: ['2026-06-01', '2026-06-03'],
  guests: 2,
  totalPrice: 240,
  userDetails: {
    name: 'Example Camper',
    email: 'camper@example.com',
  },
});
```

| Method | Input | Output |
|---|---|---|
| `submitBooking(request)` | `BookingRequest` | `Promise<BookingResponse>` |
| `cancelBooking(bookingId)` | Booking id | `Promise<boolean>` |
| `getUserBookings(userId)` | User id | `Promise<UserBooking[]>` |
| `checkAvailability(campsiteId, dates)` | Campsite id and dates | `Promise<AvailabilityResult>` |

## Weather and aurora contracts

Weather logic is local and deterministic. Aurora forecasts are latitude-aware: northern locations can return meaningful probability, while lower latitudes return a zero-probability explanation.

```typescript
const current = await mockBackend.getCurrentWeather([10.75, 59.91]);
const forecast = await mockBackend.getWeatherForecast('camp_001');
const aurora = await enhancedApiService.getAuroraForecast([10, 64]);
```

| Method | Input | Output |
|---|---|---|
| `getCurrentWeather(coordinates)` | `[longitude, latitude]` | `Promise<CurrentWeather>` |
| `getWeatherForecast(campsiteId)` | Campsite id | `Promise<WeatherForecast[]>` |
| `getAuroraForecast(coordinates)` | `[longitude, latitude]` | `Promise<AuroraForecast>` |
| `getRouteConditions(start, end)` | Route coordinates | `Promise<RouteConditions>` |

## User and personalization contracts

The user boundary manages profile-like behavior without forcing UI components to understand persistence.

```typescript
const profile = await enhancedApiService.createUserProfile({
  name: 'Integration Camper',
  email: 'integration@example.com',
});
await enhancedApiService.addToWishlist(profile.id, 'camp_010');
await enhancedApiService.removeFromWishlist(profile.id, 'camp_010');
```

| Method | Input | Output |
|---|---|---|
| `getCurrentUser()` | None | `Promise<UserProfile>` |
| `createUserProfile(input)` | Name, email, optional preferences | `Promise<UserProfile>` |
| `addToWishlist(userId, campsiteId)` | User id and campsite id | `Promise<boolean>` |
| `removeFromWishlist(userId, campsiteId)` | User id and campsite id | `Promise<boolean>` |
| `getSearchHistory()` | None | `Promise<string[]>` |
| `getRecentlyViewed()` | None | `Promise<string[]>` |

## Real-time contracts

`realTimeService` uses a discriminated event model so event handlers can narrow payloads by event type. This approach mirrors WebSocket payload handling while remaining deterministic in local tests.

```typescript
const unsubscribeId = 'dashboard-notifications';
realTimeService.subscribe(unsubscribeId, event => {
  if (event.type === 'booking') {
    console.log(event.data.bookingId, event.data.status);
  }
});

realTimeService.simulateBookingUpdate('booking_001', 'confirmed');
realTimeService.unsubscribe(unsubscribeId);
```

| Event type | Payload purpose |
|---|---|
| `availability` | Campsite availability changes. |
| `booking` | Booking status changes. |
| `weather` | Weather alerts and severity. |
| `review` | Newly submitted reviews. |
| `system` | Product-level notifications and maintenance messages. |

## Error-handling model

The local services prefer safe return values for expected absence, such as `null` for missing campsites and `false` for unsuccessful cancellation. Unexpected failures should throw standard `Error` instances so callers can surface meaningful UI messages.

| Case | Recommended UI handling |
|---|---|
| Missing campsite | Show not-found state and return to search. |
| Empty search result | Show an empty-result state with suggestions. |
| Booking failure | Keep form data, show retry guidance, and avoid duplicate submissions. |
| Weather unavailable | Hide weather overlay or show cached/default weather copy. |
| Event subscription cleanup | Always call `unsubscribe` during component unmount. |

## Migration to a network API

A production back end can be added without changing component contracts. Replace repository internals with HTTP clients, normalize response payloads into current domain types, and keep facade method names stable. Vite supports environment variables through `import.meta.env`, which should be used for public client configuration such as API base URLs.[2]

| Future endpoint | Existing method to preserve |
|---|---|
| `GET /campsites` | `mockBackend.getCampsites()` |
| `GET /campsites/:id` | `mockBackend.getCampsiteById(id)` |
| `POST /campsites/search` | `mockBackend.searchCampsites(filters)` |
| `POST /bookings` | `mockBackend.submitBooking(request)` |
| `DELETE /bookings/:id` | `mockBackend.cancelBooking(id)` |
| `GET /weather/current` | `mockBackend.getCurrentWeather(coordinates)` |
| `GET /weather/aurora` | `enhancedApiService.getAuroraForecast(coordinates)` |

## References

[1]: https://www.typescriptlang.org/docs/ "TypeScript Documentation"
[2]: https://vite.dev/guide/env-and-mode "Vite Environment Variables and Modes"
