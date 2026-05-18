# Session and data contracts

WildScape Europe Release 1.0.0 is a lab-built, working product application. The current release ships as a client-side React application with repository-backed domain services and explicit TypeScript contracts. It does not ship a server database migration because the product experience is validated through production-seeded domain repositories inside the application bundle.

| Concern | Release 1.0.0 behavior | Production contract |
|---|---|---|
| Session state | The active explorer profile, search history, recent campsites, wishlist state, and booking flows are managed through typed service facades and Zustand stores. | Session data remains scoped to the browser runtime unless a future remote adapter persists it server-side. |
| Booking state | Booking creation and cancellation use typed request and response objects with confirmation numbers, guest details, selected dates, and status transitions. | A remote adapter can map the same request and response contracts to a bookings table without changing UI consumers. |
| Campsite catalogue | Campsites are generated from curated European destination rules and normalized into the shared `Campsite` domain type. | A future catalogue database should preserve the same location, pricing, amenity, availability, and media fields. |
| Weather and aurora | Weather and aurora intelligence are exposed through service methods that accept campsite coordinates and return typed forecast models. | External weather providers can be introduced behind the same repository boundary. |
| Map token | Mapbox is optional in local and CI environments. A public `VITE_MAPBOX_ACCESS_TOKEN` can be supplied for authenticated map tiles. | Private secrets must stay outside the Vite client bundle. |

## Schema readiness

The application does not contain database schema files in Release 1.0.0, so there are no stale development database tables to clean up. Instead, the production contract lives in `src/types` and in the service repository interfaces. Those contracts define the shape that a future Postgres, MySQL, Supabase, or API-backed implementation should honor.

| Domain table candidate | Source contract | Required production fields |
|---|---|---|
| `campsites` | `src/types/campsite.ts` | Identifier, name, description, location, pricing, capacity, amenities, difficulty, media, ratings, availability, and seasonal metadata. |
| `bookings` | Booking request and response types used by `productionService` and `enhancedApiService`. | Booking identifier, campsite identifier, selected dates, guest count, guest contact details, total price, status, and confirmation number. |
| `users` | Profile and preference contracts owned by the user repository. | User identifier, display name, email, travel preferences, wishlist references, and notification preferences. |
| `weather_snapshots` | Weather and aurora response contracts. | Coordinates, date or observation time, forecast summary, temperature, precipitation, wind, aurora probability, and visibility. |

## Adapter policy

New persistence work should be implemented as an adapter behind the existing service boundaries. UI components should not import database clients, raw schemas, or vendor SDKs directly. This keeps the current app behavior stable while allowing a production database to replace the seeded repository implementation when the backend is introduced.
