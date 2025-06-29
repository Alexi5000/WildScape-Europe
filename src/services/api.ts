import { Campsite } from '@/types/campsite';
import { WeatherData } from '@/types/weather';
import campsitesData from '@/data/europeCampsites.json';
import weatherData from '@/data/weatherData.json';

// Interfaces for API requests and responses
export interface BookingRequest {
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

export interface BookingResponse {
  success: boolean;
  message: string;
  bookingId?: string;
  confirmationNumber?: string;
}

export interface SearchFilters {
  query?: string;
  country?: string;
  difficulty?: string;
  priceRange?: [number, number];
  amenities?: string[];
  capacity?: number;
  dateRange?: [string, string];
}

export interface PopularSearch {
  id: string;
  term: string;
  category: 'destination' | 'activity' | 'country';
  count: number;
}

export interface ReviewRequest {
  campsiteId: string;
  rating: number;
  comment: string;
  userId: string;
  userName: string;
}

export interface AvailabilityRequest {
  campsiteId: string;
  startDate: string;
  endDate: string;
  guests: number;
}

export interface AvailabilityResponse {
  available: boolean;
  totalPrice: number;
  unavailableDates: string[];
  message?: string;
}

// Mock API service for demonstration
export class ApiService {
  private static instance: ApiService;
  
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Campsite Management
  async getCampsites(): Promise<Campsite[]> {
    // Simulate network delay
    await this.delay(800);
    return campsitesData as Campsite[];
  }

  async getCampsiteById(id: string): Promise<Campsite | null> {
    await this.delay(300);
    const campsites = campsitesData as Campsite[];
    return campsites.find(c => c.id === id) || null;
  }

  async searchCampsites(filters: SearchFilters): Promise<Campsite[]> {
    await this.delay(600);
    const campsites = campsitesData as Campsite[];
    
    return campsites.filter(campsite => {
      // Query filter
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const matchesName = campsite.name.toLowerCase().includes(query);
        const matchesCountry = campsite.location.country.toLowerCase().includes(query);
        const matchesRegion = campsite.location.region.toLowerCase().includes(query);
        
        if (!matchesName && !matchesCountry && !matchesRegion) {
          return false;
        }
      }

      // Country filter
      if (filters.country && campsite.location.country.toLowerCase() !== filters.country.toLowerCase()) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty && campsite.difficulty !== filters.difficulty) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (campsite.price_per_night < min || campsite.price_per_night > max) {
          return false;
        }
      }

      // Capacity filter
      if (filters.capacity && campsite.capacity < filters.capacity) {
        return false;
      }

      // Amenities filter
      if (filters.amenities && filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity =>
          campsite.amenities.includes(amenity)
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });
  }

  // Booking Management
  async submitBooking(bookingDetails: BookingRequest): Promise<BookingResponse> {
    await this.delay(1500); // Simulate booking processing time
    console.log('Mock Booking Submitted:', bookingDetails);
    
    // Simulate random booking success/failure for demo
    const success = Math.random() > 0.1; // 90% success rate
    
    if (success) {
      const bookingId = `BK${Date.now()}`;
      const confirmationNumber = `WS${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
      
      return {
        success: true,
        message: 'Booking confirmed successfully!',
        bookingId,
        confirmationNumber
      };
    } else {
      return {
        success: false,
        message: 'Sorry, the selected dates are no longer available. Please choose different dates.'
      };
    }
  }

  async getBookingById(bookingId: string): Promise<any> {
    await this.delay(400);
    // Mock booking data
    return {
      id: bookingId,
      campsiteId: 'camp_001',
      campsiteName: 'Aurora Valley Wilderness',
      selectedDates: ['2024-07-15', '2024-07-16'],
      guests: 2,
      totalPrice: 90,
      status: 'confirmed',
      confirmationNumber: `WS${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      userDetails: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890'
      }
    };
  }

  async cancelBooking(bookingId: string): Promise<{ success: boolean; message: string }> {
    await this.delay(800);
    console.log('Mock Booking Cancelled:', bookingId);
    
    return {
      success: true,
      message: 'Booking cancelled successfully. Refund will be processed within 3-5 business days.'
    };
  }

  // Weather Data
  async getWeatherData(coordinates: [number, number]): Promise<WeatherData> {
    await this.delay(500);
    // In a real application, you'd use coordinates to fetch specific weather data
    // For this mock, we return static weather data with some randomization
    const baseWeather = weatherData as WeatherData;
    
    return {
      ...baseWeather,
      temperature: baseWeather.temperature + Math.floor(Math.random() * 10 - 5), // ±5 degrees variation
      wind_speed: baseWeather.wind_speed + Math.floor(Math.random() * 10 - 5),
      aurora_probability: coordinates[1] > 60 ? Math.floor(Math.random() * 100) : 0 // Aurora only in northern latitudes
    };
  }

  async getWeatherForecast(coordinates: [number, number], days: number = 7): Promise<any[]> {
    await this.delay(600);
    const forecast = [];
    const conditions = ['clear', 'cloudy', 'rain', 'snow', 'fog'];
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      forecast.push({
        date: date.toISOString().split('T')[0],
        temperature_high: Math.floor(Math.random() * 20 + 5),
        temperature_low: Math.floor(Math.random() * 10 - 5),
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        precipitation_chance: Math.floor(Math.random() * 100),
        wind_speed: Math.floor(Math.random() * 20 + 5)
      });
    }
    
    return forecast;
  }

  // Search and Suggestions
  async getSuggestions(query: string): Promise<string[]> {
    await this.delay(200); // Simulate quick suggestion fetch
    
    if (!query || query.length < 2) {
      return [];
    }
    
    const campsites = campsitesData as Campsite[];
    const suggestions = new Set<string>();
    const lowerQuery = query.toLowerCase();
    
    // Add matching campsite names
    campsites.forEach(campsite => {
      if (campsite.name.toLowerCase().includes(lowerQuery)) {
        suggestions.add(campsite.name);
      }
      if (campsite.location.country.toLowerCase().includes(lowerQuery)) {
        suggestions.add(campsite.location.country);
      }
      if (campsite.location.region.toLowerCase().includes(lowerQuery)) {
        suggestions.add(campsite.location.region);
      }
    });
    
    // Add some predefined suggestions
    const predefinedSuggestions = [
      'Northern Lights', 'Aurora Viewing', 'Mountain Camping', 'Forest Retreat',
      'Coastal Camping', 'Alpine Adventure', 'Wilderness Experience', 'Stargazing',
      'Hiking Trails', 'Photography', 'Wildlife Watching', 'Hot Springs'
    ];
    
    predefinedSuggestions.forEach(suggestion => {
      if (suggestion.toLowerCase().includes(lowerQuery)) {
        suggestions.add(suggestion);
      }
    });
    
    return Array.from(suggestions).slice(0, 8); // Return top 8 suggestions
  }

  async getPopularSearches(): Promise<PopularSearch[]> {
    await this.delay(300);
    
    return [
      { id: '1', term: 'Northern Lights Norway', category: 'destination', count: 1250 },
      { id: '2', term: 'Alpine Camping Switzerland', category: 'destination', count: 980 },
      { id: '3', term: 'Aurora Viewing', category: 'activity', count: 875 },
      { id: '4', term: 'Norway', category: 'country', count: 2100 },
      { id: '5', term: 'Mountain Views', category: 'activity', count: 750 },
      { id: '6', term: 'Switzerland', category: 'country', count: 1800 },
      { id: '7', term: 'Forest Camping Germany', category: 'destination', count: 650 },
      { id: '8', term: 'Stargazing', category: 'activity', count: 580 }
    ];
  }

  // Reviews and Ratings
  async submitReview(reviewData: ReviewRequest): Promise<{ success: boolean; message: string }> {
    await this.delay(800);
    console.log('Mock Review Submitted:', reviewData);
    
    return {
      success: true,
      message: 'Thank you for your review! It will be published after moderation.'
    };
  }

  async getCampsiteReviews(campsiteId: string): Promise<any[]> {
    await this.delay(400);
    const campsite = (campsitesData as Campsite[]).find(c => c.id === campsiteId);
    return campsite?.reviews || [];
  }

  // Availability Management
  async checkAvailability(request: AvailabilityRequest): Promise<AvailabilityResponse> {
    await this.delay(600);
    const campsite = (campsitesData as Campsite[]).find(c => c.id === request.campsiteId);
    
    if (!campsite) {
      return {
        available: false,
        totalPrice: 0,
        unavailableDates: [],
        message: 'Campsite not found'
      };
    }
    
    // Mock availability check
    const startDate = new Date(request.startDate);
    const endDate = new Date(request.endDate);
    const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Simulate some unavailable dates
    const unavailableDates: string[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate < endDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      // Randomly mark some dates as unavailable (10% chance)
      if (Math.random() < 0.1) {
        unavailableDates.push(dateString);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    const available = unavailableDates.length === 0 && request.guests <= campsite.capacity;
    const totalPrice = available ? nights * campsite.price_per_night : 0;
    
    return {
      available,
      totalPrice,
      unavailableDates,
      message: available 
        ? `Available for ${nights} nights at €${campsite.price_per_night}/night`
        : unavailableDates.length > 0 
          ? 'Some dates in your range are not available'
          : 'Exceeds maximum capacity'
    };
  }

  // Utility method for simulating network delays
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const apiService = ApiService.getInstance();