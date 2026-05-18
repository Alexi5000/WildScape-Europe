import type { Campsite, Review } from '@/types/campsite';
import type {
  AuroraForecast,
  BookingRequest,
  BookingResponse,
  BookingSummary,
  CampsiteAnalytics,
  CampsiteSearchFilters,
  NearbyAttraction,
  OperationResult,
  PopularDestination,
  ReviewStats,
  ReviewSubmission,
  TrendingSearch,
  UserPreferences,
  UserProfile,
  WeatherForecastDay
} from '@/types/api';
import type { WeatherData } from '@/types/weather';
import { productionService } from './serviceFacade';
import { UserRepository } from './repositories/userRepository';
import { WeatherRepository } from './repositories/weatherRepository';
import { delay } from './repositories/delay';

export type {
  AuroraForecast,
  BookingRequest,
  BookingResponse,
  BookingSummary,
  CampsiteAnalytics,
  CampsiteSearchFilters as SearchFilters,
  NearbyAttraction,
  OperationResult,
  PopularDestination,
  ReviewStats,
  ReviewSubmission,
  TrendingSearch,
  UserPreferences,
  UserProfile,
  WeatherForecastDay
} from '@/types/api';

export class EnhancedApiService {
  private static instance: EnhancedApiService;
  private readonly users = new UserRepository();
  private readonly weather = new WeatherRepository();
  private searchHistory: string[] = [];
  private recentlyViewed: string[] = [];

  public static getInstance(): EnhancedApiService {
    if (!EnhancedApiService.instance) {
      EnhancedApiService.instance = new EnhancedApiService();
    }

    return EnhancedApiService.instance;
  }

  async getCampsites(): Promise<Campsite[]> {
    return productionService.getCampsites();
  }

  async getCampsiteById(id: string): Promise<Campsite | null> {
    const campsite = await productionService.getCampsiteById(id);
    if (campsite) {
      this.addToRecentlyViewed(id);
    }
    return campsite;
  }

  async searchCampsites(filters: CampsiteSearchFilters): Promise<Campsite[]> {
    if (filters.query) {
      this.addToSearchHistory(filters.query);
    }
    return productionService.searchCampsites(filters);
  }

  async getFeaturedCampsites(): Promise<Campsite[]> {
    await delay(100);
    const allCampsites = await this.getCampsites();
    return allCampsites.filter(campsite => campsite.rating >= 4.5).sort((a, b) => b.rating - a.rating).slice(0, 12);
  }

  async getNearbyAttractions(campsiteId: string): Promise<NearbyAttraction[]> {
    await delay(75);
    const attractions: Omit<NearbyAttraction, 'id' | 'campsiteId'>[] = [
      { name: 'Historic Castle', distance: '2.3 km', type: 'historical' },
      { name: 'Scenic Waterfall', distance: '1.8 km', type: 'nature' },
      { name: 'Local Market', distance: '5.1 km', type: 'cultural' },
      { name: 'Adventure Park', distance: '3.7 km', type: 'recreation' },
      { name: 'Museum', distance: '4.2 km', type: 'educational' }
    ];

    return attractions.slice(0, 4).map((attraction, index) => ({
      ...attraction,
      id: `${campsiteId}_attraction_${index + 1}`,
      campsiteId
    }));
  }

  async submitBooking(bookingDetails: BookingRequest): Promise<BookingResponse> {
    return productionService.submitBooking(bookingDetails);
  }

  async getUserBookings(userId: string): Promise<BookingSummary[]> {
    return productionService.getUserBookings(userId);
  }

  async cancelBooking(bookingId: string): Promise<OperationResult> {
    const cancelled = await productionService.cancelBooking(bookingId);
    return {
      success: cancelled,
      message: cancelled ? 'Booking cancelled successfully. Refund will be processed within 3-5 business days.' : `Booking ${bookingId} could not be found.`
    };
  }

  async getWeatherData(coordinates: [number, number]): Promise<WeatherData> {
    return productionService.getWeatherData(coordinates);
  }

  async getWeatherForecast(coordinates: [number, number], days = 7): Promise<WeatherForecastDay[]> {
    await delay(80);
    return this.weather.getWeatherForecast(coordinates, days);
  }

  async getAuroraForecast(coordinates: [number, number]): Promise<AuroraForecast> {
    await delay(80);
    return this.weather.getAuroraForecast(coordinates);
  }

  async getSuggestions(query: string): Promise<string[]> {
    return productionService.getSuggestions(query);
  }

  async getTrendingSearches(): Promise<TrendingSearch[]> {
    await delay(60);
    return [
      { term: 'Northern Lights Norway', category: 'destination', growth: 45, searchCount: 1250 },
      { term: 'Alpine Camping', category: 'activity', growth: 32, searchCount: 980 },
      { term: 'Switzerland', category: 'country', growth: 28, searchCount: 1800 },
      { term: 'Aurora Photography', category: 'activity', growth: 67, searchCount: 650 },
      { term: 'Winter Camping', category: 'activity', growth: 89, searchCount: 420 }
    ];
  }

  async getPopularDestinations(): Promise<PopularDestination[]> {
    await delay(80);
    return [
      { id: 'dest_001', name: 'Lofoten Islands', country: 'Norway', imageUrl: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg', averageRating: 4.8, totalCampsites: 12, popularActivities: ['aurora_viewing', 'hiking_trails', 'photography'] },
      { id: 'dest_002', name: 'Bernese Oberland', country: 'Switzerland', imageUrl: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg', averageRating: 4.7, totalCampsites: 8, popularActivities: ['mountain_views', 'hiking_trails', 'rock_climbing'] },
      { id: 'dest_003', name: 'Black Forest', country: 'Germany', imageUrl: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg', averageRating: 4.6, totalCampsites: 15, popularActivities: ['forest_trails', 'wildlife_watching', 'meditation'] }
    ];
  }

  async createUserProfile(userData: Partial<UserProfile>): Promise<UserProfile> {
    await delay(100);
    return this.users.createProfile(userData);
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    await delay(75);
    return this.users.findProfile(userId);
  }

  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<boolean> {
    await delay(75);
    return this.users.updatePreferences(userId, preferences);
  }

  async addToWishlist(userId: string, campsiteId: string): Promise<boolean> {
    await delay(50);
    return this.users.addToWishlist(userId, campsiteId);
  }

  async removeFromWishlist(userId: string, campsiteId: string): Promise<boolean> {
    await delay(50);
    return this.users.removeFromWishlist(userId, campsiteId);
  }

  async submitReview(reviewData: ReviewSubmission): Promise<OperationResult> {
    await delay(100);
    return {
      success: reviewData.rating >= 1 && reviewData.rating <= 5,
      message: `Thank you for reviewing ${reviewData.campsiteId}. It will be published after moderation.`
    };
  }

  async getCampsiteReviews(campsiteId: string): Promise<Review[]> {
    await delay(75);
    const campsite = await this.getCampsiteById(campsiteId);
    return campsite?.reviews ?? [];
  }

  async getReviewStats(campsiteId: string): Promise<ReviewStats> {
    const reviews = await this.getCampsiteReviews(campsiteId);
    const ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    reviews.forEach(review => {
      const rating = Math.max(1, Math.min(5, Math.round(review.rating))) as 1 | 2 | 3 | 4 | 5;
      ratingDistribution[rating] += 1;
    });

    return {
      totalReviews: reviews.length,
      averageRating: reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0,
      ratingDistribution,
      recentReviews: reviews.slice(-5)
    };
  }

  async getCampsiteAnalytics(campsiteId: string): Promise<CampsiteAnalytics> {
    await delay(90);
    const seed = campsiteId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return {
      campsiteId,
      viewCount: (seed % 1000) + 100,
      bookingRate: (seed % 30) + 10,
      averageStayDuration: (seed % 5) + 2,
      peakSeason: ['June', 'July', 'August'],
      popularAmenities: ['hiking_trails', 'mountain_views', 'stargazing'],
      visitorDemographics: {
        ageGroups: { '18-25': 20, '26-35': 35, '36-45': 25, '46+': 20 },
        countries: { Germany: 30, UK: 25, France: 20, Others: 25 }
      }
    };
  }

  async getPersonalizedRecommendations(userId: string): Promise<Campsite[]> {
    await delay(100);
    const profile = await this.getUserProfile(userId);
    const allCampsites = await this.getCampsites();

    if (!profile) {
      return allCampsites.slice(0, 8);
    }

    const preferredActivities = profile.preferences.favoriteActivities;
    const [minBudget, maxBudget] = profile.preferences.budgetRange;

    return allCampsites
      .filter(campsite => campsite.price_per_night >= minBudget && campsite.price_per_night <= maxBudget)
      .filter(campsite => preferredActivities.length === 0 || preferredActivities.some(activity => campsite.amenities.includes(activity)))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  }

  async getSearchHistory(): Promise<string[]> {
    return [...this.searchHistory];
  }

  async getRecentlyViewed(): Promise<string[]> {
    return [...this.recentlyViewed];
  }

  private addToSearchHistory(query: string): void {
    this.searchHistory = [query, ...this.searchHistory.filter(item => item !== query)].slice(0, 10);
  }

  private addToRecentlyViewed(campsiteId: string): void {
    this.recentlyViewed = [campsiteId, ...this.recentlyViewed.filter(item => item !== campsiteId)].slice(0, 5);
  }
}

export const enhancedApiService = EnhancedApiService.getInstance();
