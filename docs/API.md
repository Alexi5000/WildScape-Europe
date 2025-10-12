# API Documentation

This document describes the API services used in WildScape Europe, including mock backend, external integrations, and data models.

## 📡 API Overview

WildScape Europe currently uses a mock backend for demonstration purposes. The architecture is designed to easily integrate with a real backend API.

### Base Configuration

```typescript
// Environment configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const USE_MOCK_BACKEND = import.meta.env.VITE_USE_MOCK_BACKEND === 'true';
```

## 🏕️ Campsite API

### Get All Campsites

```typescript
GET /api/campsites
```

**Query Parameters:**
- `country` (string, optional): Filter by country
- `terrain` (string, optional): Filter by terrain type
- `minPrice` (number, optional): Minimum price per night
- `maxPrice` (number, optional): Maximum price per night
- `amenities` (string[], optional): Required amenities
- `limit` (number, optional): Results per page (default: 50)
- `offset` (number, optional): Pagination offset (default: 0)

**Response:**
```json
{
  "data": [
    {
      "id": "camp-001",
      "name": "Arctic Aurora Basecamp",
      "description": "Experience the northern lights...",
      "location": {
        "country": "Norway",
        "region": "Troms og Finnmark",
        "coordinates": {
          "lat": 69.6492,
          "lng": 18.9553
        },
        "address": "Tromsø, Norway"
      },
      "terrain": "mountain",
      "elevation": 450,
      "pricePerNight": 75,
      "rating": 4.8,
      "reviewCount": 234,
      "amenities": ["wifi", "showers", "restaurant"],
      "images": [
        {
          "url": "https://example.com/image.jpg",
          "alt": "Campsite view",
          "isPrimary": true
        }
      ],
      "availability": {
        "isAvailable": true,
        "nextAvailableDate": "2024-10-15"
      }
    }
  ],
  "pagination": {
    "total": 500,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

### Get Single Campsite

```typescript
GET /api/campsites/:id
```

**Response:**
```json
{
  "data": {
    "id": "camp-001",
    "name": "Arctic Aurora Basecamp",
    // ... full campsite details
    "weatherForecast": {
      "current": {
        "temp": 12,
        "condition": "partly_cloudy",
        "windSpeed": 15
      },
      "forecast": [
        {
          "date": "2024-10-13",
          "tempHigh": 15,
          "tempLow": 8,
          "condition": "sunny"
        }
      ]
    },
    "nearbyAttractions": [
      {
        "name": "Tromsø Cable Car",
        "distance": 5.2,
        "type": "attraction"
      }
    ]
  }
}
```

### Search Campsites

```typescript
POST /api/campsites/search
```

**Request Body:**
```json
{
  "query": "norway mountain",
  "filters": {
    "countries": ["Norway", "Sweden"],
    "terrains": ["mountain", "forest"],
    "priceRange": [50, 150],
    "amenities": ["wifi", "electricity"],
    "minRating": 4.0
  },
  "sortBy": "rating",
  "sortOrder": "desc"
}
```

**Response:**
```json
{
  "data": [...],
  "facets": {
    "countries": {
      "Norway": 45,
      "Sweden": 32
    },
    "terrains": {
      "mountain": 50,
      "forest": 27
    }
  }
}
```

## 🌤️ Weather API

### Get Weather for Location

```typescript
GET /api/weather/:lat/:lng
```

**Response:**
```json
{
  "data": {
    "current": {
      "temp": 12,
      "feelsLike": 10,
      "condition": "rain",
      "humidity": 75,
      "windSpeed": 20,
      "windDirection": "NW",
      "visibility": 8000,
      "pressure": 1013,
      "uvIndex": 3
    },
    "forecast": [
      {
        "date": "2024-10-13",
        "tempHigh": 15,
        "tempLow": 8,
        "condition": "partly_cloudy",
        "precipitation": 20,
        "windSpeed": 15
      }
    ],
    "aurora": {
      "probability": 75,
      "kpIndex": 5,
      "visibility": "good",
      "peakTime": "22:00"
    }
  }
}
```

## 📅 Booking API

### Create Booking

```typescript
POST /api/bookings
```

**Request Body:**
```json
{
  "campsiteId": "camp-001",
  "checkIn": "2024-10-20",
  "checkOut": "2024-10-25",
  "guests": {
    "adults": 2,
    "children": 1
  },
  "spotType": "tent",
  "addons": ["firewood", "breakfast"],
  "contactInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+47 123 45 678"
  }
}
```

**Response:**
```json
{
  "data": {
    "bookingId": "book-123456",
    "status": "confirmed",
    "campsiteId": "camp-001",
    "checkIn": "2024-10-20",
    "checkOut": "2024-10-25",
    "totalNights": 5,
    "priceBreakdown": {
      "basePrice": 375,
      "addons": 50,
      "tax": 42.5,
      "total": 467.5,
      "currency": "EUR"
    },
    "confirmationCode": "WSE-ABC123"
  }
}
```

### Get User Bookings

```typescript
GET /api/bookings/user/:userId
```

### Cancel Booking

```typescript
DELETE /api/bookings/:bookingId
```

## 🗺️ Map & Location API

### Get Nearby Campsites

```typescript
GET /api/campsites/nearby
```

**Query Parameters:**
- `lat` (number, required): Latitude
- `lng` (number, required): Longitude
- `radius` (number, optional): Search radius in km (default: 50)
- `limit` (number, optional): Max results (default: 20)

### Get Elevation Data

```typescript
GET /api/map/elevation/:lat/:lng
```

**Response:**
```json
{
  "data": {
    "elevation": 450,
    "unit": "meters",
    "resolution": "30m"
  }
}
```

## 📊 Analytics API

### Track Event

```typescript
POST /api/analytics/event
```

**Request Body:**
```json
{
  "eventType": "campsite_view",
  "campsiteId": "camp-001",
  "userId": "user-123",
  "timestamp": "2024-10-12T14:30:00Z",
  "metadata": {
    "source": "search",
    "device": "mobile"
  }
}
```

## 🔐 Authentication (Future)

### Login

```typescript
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "refresh_token_here",
    "expiresIn": 3600,
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

## 📝 TypeScript Interfaces

### Campsite Type

```typescript
interface Campsite {
  id: string;
  name: string;
  description: string;
  location: Location;
  terrain: TerrainType;
  elevation: number;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  amenities: Amenity[];
  images: Image[];
  availability: Availability;
  features: string[];
  rules: string[];
}

interface Location {
  country: string;
  region: string;
  coordinates: Coordinates;
  address: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

type TerrainType = 'mountain' | 'forest' | 'lake' | 'coastal' | 'valley';
type Amenity = 'wifi' | 'showers' | 'electricity' | 'restaurant' | 'store';
```

### Weather Type

```typescript
interface Weather {
  current: CurrentWeather;
  forecast: ForecastDay[];
  aurora?: AuroraData;
}

interface CurrentWeather {
  temp: number;
  feelsLike: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  windDirection: string;
}

type WeatherCondition = 'sunny' | 'cloudy' | 'rain' | 'snow' | 'fog';
```

### Booking Type

```typescript
interface Booking {
  bookingId: string;
  campsiteId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: GuestCount;
  status: BookingStatus;
  totalPrice: number;
  confirmationCode: string;
}

type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
```

## 🛠️ Service Implementation

### API Client

```typescript
// services/api.ts
class ApiClient {
  private baseURL: string;
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }
  
  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
    return response.json();
  }
}

export const api = new ApiClient(API_BASE_URL);
```

## 🌐 External API Integrations

### Mapbox API

```typescript
// services/mapbox.ts
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export const geocode = async (address: string) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}`;
  const response = await fetch(url);
  return response.json();
};
```

## 📚 Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "CAMPSITE_NOT_FOUND",
    "message": "Campsite with ID 'camp-999' not found",
    "statusCode": 404,
    "details": {}
  }
}
```

### Common Error Codes

- `400` - Bad Request
- `404` - Not Found
- `422` - Validation Error
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error

## 🔄 Rate Limiting

- **Default Limit**: 100 requests per minute per IP
- **Header**: `X-RateLimit-Remaining`
- **Retry After**: `Retry-After` header when rate limited

## 📖 Further Resources

- [Getting Started](./GETTING_STARTED.md)
- [Architecture Guide](./ARCHITECTURE.md)
- [Deployment Guide](./DEPLOYMENT.md)

---

**API Design**: Alex Cinovoj (TechTideAI)  
**Architecture**: RESTful API with TypeScript type safety

