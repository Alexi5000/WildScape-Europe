# WildScape Europe Backend Operations

This document outlines the backend operations required for the WildScape Europe application. Currently, these operations are handled by a mock API service (`src/services/api.ts`) that uses local JSON data to simulate server responses.

## Overview

The WildScape Europe platform requires several backend services to provide a complete camping discovery and booking experience. This document details each operation, its purpose, and current mock implementation.

## 1. Campsite Management

### `GET /api/campsites`
- **Description**: Fetches a list of all available campsites
- **Purpose**: Populates the main search results and map with campsite data
- **Request**:
  - Method: `GET`
  - Endpoint: `/api/campsites`
  - Parameters: None
- **Response**:
  - Status: `200 OK`
  - Body: `Campsite[]` (array of campsite objects)
- **Mock Implementation**: `ApiService.getCampsites()` reads from `src/data/europeCampsites.json`

### `GET /api/campsites/:id`
- **Description**: Fetches detailed information for a specific campsite
- **Purpose**: Displays campsite details page when user selects a campsite
- **Request**:
  - Method: `GET`
  - Endpoint: `/api/campsites/:id`
  - Parameters: `id` (string) - unique campsite identifier
- **Response**:
  - Status: `200 OK` or `404 Not Found`
  - Body: `Campsite` object or `null`
- **Mock Implementation**: `ApiService.getCampsiteById(id)` searches local data

### `POST /api/campsites/search`
- **Description**: Advanced campsite search with filters
- **Purpose**: Server-side filtering for large datasets
- **Request**:
  - Method: `POST`
  - Endpoint: `/api/campsites/search`
  - Body:
    ```typescript
    interface SearchRequest {
      query?: string;
      country?: string;
      difficulty?: string;
      priceRange?: [number, number];
      amenities?: string[];
      capacity?: number;
      dateRange?: [string, string];
    }
    ```
- **Response**:
  - Status: `200 OK`
  - Body: `Campsite[]` (filtered results)
- **Mock Implementation**: `ApiService.searchCampsites(filters)` performs client-side filtering

## 2. Booking Management

### `POST /api/bookings`
- **Description**: Submits a new booking request
- **Purpose**: Handles the booking process from campsite details page
- **Request**:
  - Method: `POST`
  - Endpoint: `/api/bookings`
  - Body:
    ```typescript
    interface BookingRequest {
      campsiteId: string;
      selectedDates: string[];
      guests: number;
      totalPrice: number;
      userDetails: {
        name: string;
        email: string;
        phone: string;
      };
    }
    ```
- **Response**:
  - Status: `201 Created` or `400 Bad Request`
  - Body: Booking confirmation or error details
- **Mock Implementation**: `ApiService.submitBooking(bookingDetails)` simulates successful booking

### `GET /api/bookings/:id`
- **Description**: Retrieves booking details
- **Purpose**: Displays booking confirmation and status
- **Request**:
  - Method: `GET`
  - Endpoint: `/api/bookings/:id`
  - Parameters: `id` (string) - booking identifier
- **Response**:
  - Status: `200 OK` or `404 Not Found`
  - Body: Booking details object
- **Mock Implementation**: `ApiService.getBookingById(id)` returns mock booking data

### `PUT /api/bookings/:id/cancel`
- **Description**: Cancels an existing booking
- **Purpose**: Allows users to cancel their reservations
- **Request**:
  - Method: `PUT`
  - Endpoint: `/api/bookings/:id/cancel`
  - Parameters: `id` (string) - booking identifier
- **Response**:
  - Status: `200 OK` or `404 Not Found`
  - Body: Cancellation confirmation
- **Mock Implementation**: `ApiService.cancelBooking(id)` simulates cancellation

## 3. Weather Data

### `GET /api/weather`
- **Description**: Fetches current weather data for coordinates
- **Purpose**: Provides real-time weather conditions for map and campsite details
- **Request**:
  - Method: `GET`
  - Endpoint: `/api/weather`
  - Parameters:
    - `latitude` (number): Location latitude
    - `longitude` (number): Location longitude
- **Response**:
  - Status: `200 OK`
  - Body: `WeatherData` object
- **Mock Implementation**: `ApiService.getWeatherData(coordinates)` reads from `src/data/weatherData.json`

### `GET /api/weather/forecast`
- **Description**: Fetches weather forecast for multiple days
- **Purpose**: Displays extended weather forecast for trip planning
- **Request**:
  - Method: `GET`
  - Endpoint: `/api/weather/forecast`
  - Parameters:
    - `latitude` (number): Location latitude
    - `longitude` (number): Location longitude
    - `days` (number): Number of forecast days (default: 7)
- **Response**:
  - Status: `200 OK`
  - Body: `WeatherForecast[]` array
- **Mock Implementation**: `ApiService.getWeatherForecast(coordinates, days)` returns mock forecast data

## 4. Search and Suggestions

### `GET /api/search/suggestions`
- **Description**: Provides search suggestions based on partial query
- **Purpose**: Enhances search bar with autocomplete functionality
- **Request**:
  - Method: `GET`
  - Endpoint: `/api/search/suggestions`
  - Parameters: `query` (string) - partial search query
- **Response**:
  - Status: `200 OK`
  - Body: `string[]` (array of suggested search terms)
- **Mock Implementation**: `ApiService.getSuggestions(query)` provides mock suggestions

### `GET /api/search/popular`
- **Description**: Fetches popular search terms and destinations
- **Purpose**: Shows trending searches and popular destinations
- **Request**:
  - Method: `GET`
  - Endpoint: `/api/search/popular`
  - Parameters: None
- **Response**:
  - Status: `200 OK`
  - Body: `PopularSearch[]` array
- **Mock Implementation**: `ApiService.getPopularSearches()` returns predefined popular searches

## 5. User Management (Future Implementation)

### `POST /api/auth/register`
- **Description**: User registration
- **Purpose**: Create new user accounts
- **Status**: Not implemented (would require authentication system)

### `POST /api/auth/login`
- **Description**: User authentication
- **Purpose**: User login and session management
- **Status**: Not implemented (would require authentication system)

### `GET /api/users/profile`
- **Description**: Fetch user profile data
- **Purpose**: Display user information and booking history
- **Status**: Not implemented (would require authentication system)

## 6. Reviews and Ratings

### `GET /api/campsites/:id/reviews`
- **Description**: Fetches reviews for a specific campsite
- **Purpose**: Displays user reviews on campsite details page
- **Request**:
  - Method: `GET`
  - Endpoint: `/api/campsites/:id/reviews`
  - Parameters: `id` (string) - campsite identifier
- **Response**:
  - Status: `200 OK`
  - Body: `Review[]` array
- **Mock Implementation**: Reviews are embedded in campsite data

### `POST /api/reviews`
- **Description**: Submits a new review
- **Purpose**: Allows users to rate and review campsites
- **Request**:
  - Method: `POST`
  - Endpoint: `/api/reviews`
  - Body:
    ```typescript
    interface ReviewRequest {
      campsiteId: string;
      rating: number;
      comment: string;
      userId: string;
    }
    ```
- **Response**:
  - Status: `201 Created`
  - Body: Review confirmation
- **Mock Implementation**: `ApiService.submitReview(reviewData)` simulates review submission

## 7. Availability Management

### `GET /api/campsites/:id/availability`
- **Description**: Checks campsite availability for date range
- **Purpose**: Real-time availability checking for booking
- **Request**:
  - Method: `GET`
  - Endpoint: `/api/campsites/:id/availability`
  - Parameters:
    - `id` (string) - campsite identifier
    - `startDate` (string) - check-in date
    - `endDate` (string) - check-out date
- **Response**:
  - Status: `200 OK`
  - Body: Availability status and pricing
- **Mock Implementation**: `ApiService.checkAvailability(id, dateRange)` uses embedded availability data

## Data Models

### Campsite
```typescript
interface Campsite {
  id: string;
  name: string;
  location: {
    country: string;
    region: string;
    coordinates: [number, number];
    elevation: number;
  };
  description: string;
  amenities: string[];
  difficulty: 'easy' | 'moderate' | 'challenging' | 'expert';
  capacity: number;
  price_per_night: number;
  images: string[];
  weather: WeatherInfo;
  availability: Record<string, boolean>;
  rating: number;
  reviews: Review[];
  features: CampsiteFeatures;
}
```

### WeatherData
```typescript
interface WeatherData {
  temperature: number;
  condition: 'clear' | 'rain' | 'snow' | 'fog' | 'cloudy';
  wind_speed: number;
  humidity: number;
  aurora_probability?: number;
  forecast: WeatherForecast[];
}
```

### BookingRequest
```typescript
interface BookingRequest {
  campsiteId: string;
  selectedDates: string[];
  guests: number;
  totalPrice: number;
  userDetails: {
    name: string;
    email: string;
    phone: string;
  };
}
```

## Current Implementation Status

✅ **Implemented (Mock)**:
- Campsite data fetching
- Basic weather data
- Search suggestions
- Booking simulation

🔄 **Partially Implemented**:
- Advanced search filtering (client-side only)
- Review display (embedded in campsite data)

❌ **Not Implemented**:
- User authentication
- Real-time availability updates
- Payment processing
- Email notifications
- Admin panel for campsite management

## Migration to Real Backend

When transitioning to a real backend implementation:

1. **Database Setup**: Implement PostgreSQL or MongoDB for data persistence
2. **Authentication**: Add JWT-based authentication system
3. **Payment Integration**: Integrate Stripe or similar payment processor
4. **Real-time Updates**: Implement WebSocket connections for live availability
5. **Email Service**: Add email notifications for bookings and confirmations
6. **File Storage**: Implement cloud storage for campsite images
7. **Caching**: Add Redis for performance optimization
8. **API Rate Limiting**: Implement rate limiting for API endpoints
9. **Monitoring**: Add logging and monitoring systems
10. **Testing**: Comprehensive API testing suite

## Performance Considerations

- **Pagination**: Implement pagination for large campsite lists
- **Caching**: Cache frequently accessed data (weather, popular searches)
- **Image Optimization**: Implement image CDN and optimization
- **Database Indexing**: Proper indexing for search and filter operations
- **API Response Compression**: Gzip compression for API responses