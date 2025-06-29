import { Campsite, Review } from '@/types/campsite';
import { WeatherData } from '@/types/weather';
import { mockBackend } from './mockBackend';

// Enhanced API service with comprehensive backend simulation
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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    favoriteActivities: string[];
    preferredDifficulty: string;
    budgetRange: [number, number];
  };
  bookingHistory: string[];
  wishlist: string[];
}

export interface PopularDestination {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
  averageRating: number;
  totalCampsites: number;
  popularActivities: string[];
}

export interface TrendingSearch {
  term: string;
  category: 'destination' | 'activity' | 'country';
  growth: number;
  searchCount: number;
}

export class EnhancedApiService {
  private static instance: EnhancedApiService;
  private currentUser: UserProfile | null = null;
  private searchHistory: string[] = [];
  private recentlyViewed: string[] = [];

  public static getInstance(): EnhancedApiService {
    if (!EnhancedApiService.instance) {
      EnhancedApiService.instance = new EnhancedApiService();
    }
    return EnhancedApiService.instance;
  }

  // Campsite Management
  async getCampsites(): Promise<Campsite[]> {
    return mockBackend.getCampsites();
  }

  async getCampsiteById(id: string): Promise<Campsite | null> {
    const campsite = await mockBackend.getCampsiteById(id);
    if (campsite) {
      this.addToRecentlyViewed(id);
    }
    return campsite;
  }

  async searchCampsites(filters: SearchFilters): Promise<Campsite[]> {
    if (filters.query) {
      this.addToSearchHistory(filters.query);
    }
    return mockBackend.searchCampsites(filters);
  }

  async getFeaturedCampsites(): Promise<Campsite[]> {
    await this.delay(400);
    const allCampsites = await this.getCampsites();
    return allCampsites
      .filter(c => c.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 12);
  }

  async getNearbyAttractions(campsiteId: string): Promise<any[]> {
    await this.delay(300);
    const attractions = [
      { name: 'Historic Castle', distance: '2.3 km', type: 'historical' },
      { name: 'Scenic Waterfall', distance: '1.8 km', type: 'nature' },
      { name: 'Local Market', distance: '5.1 km', type: 'cultural' },
      { name: 'Adventure Park', distance: '3.7 km', type: 'recreation' },
      { name: 'Museum', distance: '4.2 km', type: 'educational' }
    ];
    
    return attractions.slice(0, Math.floor(Math.random() * 3) + 2);
  }

  // Booking Management
  async submitBooking(bookingDetails: BookingRequest): Promise<BookingResponse> {
    return mockBackend.submitBooking(bookingDetails);
  }

  async getUserBookings(userId: string): Promise<any[]> {
    await this.delay(500);
    // Mock user bookings
    return [
      {
        id: 'booking_001',
        campsiteId: 'camp_001',
        campsiteName: 'Aurora Valley Wilderness',
        startDate: '2024-02-15',
        endDate: '2024-02-17',
        guests: 2,
        totalPrice: 180,
        status: 'confirmed'
      },
      {
        id: 'booking_002',
        campsiteId: 'camp_005',
        campsiteName: 'Coastal Dunes Paradise',
        startDate: '2024-03-10',
        endDate: '2024-03-12',
        guests: 4,
        totalPrice: 240,
        status: 'pending'
      }
    ];
  }

  async cancelBooking(bookingId: string): Promise<{ success: boolean; message: string }> {
    await this.delay(600);
    return {
      success: true,
      message: 'Booking cancelled successfully. Refund will be processed within 3-5 business days.'
    };
  }

  // Weather Services
  async getWeatherData(coordinates: [number, number]): Promise<WeatherData> {
    return mockBackend.getWeatherData(coordinates);
  }

  async getWeatherForecast(coordinates: [number, number], days: number = 7): Promise<any[]> {
    await this.delay(400);
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
        wind_speed: Math.floor(Math.random() * 20 + 5),
        humidity: Math.floor(Math.random() * 40 + 40)
      });
    }
    
    return forecast;
  }

  async getAuroraForecast(coordinates: [number, number]): Promise<any> {
    await this.delay(300);
    if (coordinates[1] < 60) {
      return { probability: 0, message: 'Aurora not visible at this latitude' };
    }
    
    return {
      probability: Math.floor(Math.random() * 100),
      kpIndex: Math.floor(Math.random() * 9),
      visibility: ['Poor', 'Fair', 'Good', 'Excellent'][Math.floor(Math.random() * 4)],
      peakTime: '22:30 - 02:00',
      cloudCover: Math.floor(Math.random() * 100)
    };
  }

  // Search and Discovery
  async getSuggestions(query: string): Promise<string[]> {
    return mockBackend.getSuggestions(query);
  }

  async getTrendingSearches(): Promise<TrendingSearch[]> {
    await this.delay(200);
    return [
      { term: 'Northern Lights Norway', category: 'destination', growth: 45, searchCount: 1250 },
      { term: 'Alpine Camping', category: 'activity', growth: 32, searchCount: 980 },
      { term: 'Switzerland', category: 'country', growth: 28, searchCount: 1800 },
      { term: 'Aurora Photography', category: 'activity', growth: 67, searchCount: 650 },
      { term: 'Winter Camping', category: 'activity', growth: 89, searchCount: 420 }
    ];
  }

  async getPopularDestinations(): Promise<PopularDestination[]> {
    await this.delay(350);
    return [
      {
        id: 'dest_001',
        name: 'Lofoten Islands',
        country: 'Norway',
        imageUrl: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg',
        averageRating: 4.8,
        totalCampsites: 12,
        popularActivities: ['aurora_viewing', 'hiking_trails', 'photography']
      },
      {
        id: 'dest_002',
        name: 'Bernese Oberland',
        country: 'Switzerland',
        imageUrl: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg',
        averageRating: 4.7,
        totalCampsites: 8,
        popularActivities: ['mountain_views', 'hiking_trails', 'rock_climbing']
      },
      {
        id: 'dest_003',
        name: 'Black Forest',
        country: 'Germany',
        imageUrl: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg',
        averageRating: 4.6,
        totalCampsites: 15,
        popularActivities: ['forest_trails', 'wildlife_watching', 'meditation']
      }
    ];
  }

  // User Management
  async createUserProfile(userData: Partial<UserProfile>): Promise<UserProfile> {
    await this.delay(500);
    const user: UserProfile = {
      id: `user_${Date.now()}`,
      name: userData.name || 'Anonymous User',
      email: userData.email || '',
      preferences: {
        favoriteActivities: userData.preferences?.favoriteActivities || [],
        preferredDifficulty: userData.preferences?.preferredDifficulty || 'moderate',
        budgetRange: userData.preferences?.budgetRange || [30, 100]
      },
      bookingHistory: [],
      wishlist: []
    };
    
    this.currentUser = user;
    return user;
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    await this.delay(300);
    return this.currentUser;
  }

  async updateUserPreferences(userId: string, preferences: any): Promise<boolean> {
    await this.delay(400);
    if (this.currentUser) {
      this.currentUser.preferences = { ...this.currentUser.preferences, ...preferences };
      return true;
    }
    return false;
  }

  async addToWishlist(userId: string, campsiteId: string): Promise<boolean> {
    await this.delay(200);
    if (this.currentUser && !this.currentUser.wishlist.includes(campsiteId)) {
      this.currentUser.wishlist.push(campsiteId);
      return true;
    }
    return false;
  }

  async removeFromWishlist(userId: string, campsiteId: string): Promise<boolean> {
    await this.delay(200);
    if (this.currentUser) {
      this.currentUser.wishlist = this.currentUser.wishlist.filter(id => id !== campsiteId);
      return true;
    }
    return false;
  }

  // Reviews and Ratings
  async submitReview(reviewData: any): Promise<{ success: boolean; message: string }> {
    await this.delay(600);
    return {
      success: true,
      message: 'Thank you for your review! It will be published after moderation.'
    };
  }

  async getCampsiteReviews(campsiteId: string): Promise<Review[]> {
    await this.delay(300);
    const campsite = await this.getCampsiteById(campsiteId);
    return campsite?.reviews || [];
  }

  async getReviewStats(campsiteId: string): Promise<any> {
    await this.delay(250);
    const reviews = await this.getCampsiteReviews(campsiteId);
    
    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      ratingCounts[review.rating as keyof typeof ratingCounts]++;
    });
    
    return {
      totalReviews: reviews.length,
      averageRating: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
      ratingDistribution: ratingCounts,
      recentReviews: reviews.slice(-5)
    };
  }

  // Analytics and Insights
  async getCampsiteAnalytics(campsiteId: string): Promise<any> {
    await this.delay(400);
    return {
      viewCount: Math.floor(Math.random() * 1000) + 100,
      bookingRate: Math.floor(Math.random() * 30) + 10,
      averageStayDuration: Math.floor(Math.random() * 5) + 2,
      peakSeason: ['June', 'July', 'August'],
      popularAmenities: ['hiking_trails', 'mountain_views', 'stargazing'],
      visitorDemographics: {
        ageGroups: { '18-25': 20, '26-35': 35, '36-45': 25, '46+': 20 },
        countries: { 'Germany': 30, 'UK': 25, 'France': 20, 'Others': 25 }
      }
    };
  }

  async getPersonalizedRecommendations(userId: string): Promise<Campsite[]> {
    await this.delay(500);
    const allCampsites = await this.getCampsites();
    
    // Simple recommendation based on user preferences
    if (this.currentUser) {
      const preferredActivities = this.currentUser.preferences.favoriteActivities;
      const [minBudget, maxBudget] = this.currentUser.preferences.budgetRange;
      
      return allCampsites
        .filter(campsite => {
          const inBudget = campsite.price_per_night >= minBudget && campsite.price_per_night <= maxBudget;
          const hasPreferredActivity = preferredActivities.some(activity => 
            campsite.amenities.includes(activity)
          );
          return inBudget && (hasPreferredActivity || preferredActivities.length === 0);
        })
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);
    }
    
    return allCampsites.slice(0, 8);
  }

  // Utility Methods
  private addToSearchHistory(query: string) {
    if (!this.searchHistory.includes(query)) {
      this.searchHistory.unshift(query);
      this.searchHistory = this.searchHistory.slice(0, 10); // Keep last 10 searches
    }
  }

  private addToRecentlyViewed(campsiteId: string) {
    if (!this.recentlyViewed.includes(campsiteId)) {
      this.recentlyViewed.unshift(campsiteId);
      this.recentlyViewed = this.recentlyViewed.slice(0, 5); // Keep last 5 viewed
    }
  }

  async getSearchHistory(): Promise<string[]> {
    return [...this.searchHistory];
  }

  async getRecentlyViewed(): Promise<string[]> {
    return [...this.recentlyViewed];
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const enhancedApiService = EnhancedApiService.getInstance();