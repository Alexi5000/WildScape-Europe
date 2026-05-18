import type { Campsite, Review } from "./campsite";
import type { BookingStatus, Difficulty, WeatherCondition } from "./common";

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

export interface BookingSummary {
  id: string;
  campsiteId: string;
  campsiteName: string;
  startDate: string;
  endDate: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
}

export interface BookingRecord extends BookingSummary {
  userId: string;
  createdAt: string;
  confirmationNumber?: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  bookingId?: string;
  confirmationNumber?: string;
}

export interface CampsiteSearchFilters {
  query?: string;
  country?: string;
  difficulty?: Difficulty;
  priceRange?: [number, number];
  amenities?: string[];
  capacity?: number;
  dateRange?: [string, string];
}

export interface UserPreferences {
  favoriteActivities: string[];
  preferredDifficulty: Difficulty;
  budgetRange: [number, number];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
  bookingHistory: string[];
  wishlist: string[];
}

export interface UserSeed {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  totalBookings: number;
  favoriteActivities: string[];
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
  category: "destination" | "activity" | "country";
  growth: number;
  searchCount: number;
}

export interface NearbyAttraction {
  id: string;
  campsiteId: string;
  name: string;
  distance: string;
  type: "historical" | "nature" | "cultural" | "recreation" | "educational";
}

export interface WeatherForecastDay {
  date: string;
  temperature_high: number;
  temperature_low: number;
  condition: WeatherCondition;
  precipitation_chance: number;
  wind_speed?: number;
  humidity?: number;
}

export interface AuroraForecast {
  probability: number;
  message?: string;
  kpIndex?: number;
  visibility?: "Poor" | "Fair" | "Good" | "Excellent";
  peakTime?: string;
  cloudCover?: number;
}

export interface ReviewSubmission {
  campsiteId: string;
  userId: string;
  rating: number;
  comment: string;
}

export interface OperationResult {
  success: boolean;
  message: string;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number>;
  recentReviews: Review[];
}

export interface CampsiteAnalytics {
  campsiteId: string;
  viewCount: number;
  bookingRate: number;
  averageStayDuration: number;
  peakSeason: string[];
  popularAmenities: string[];
  visitorDemographics: {
    ageGroups: Record<string, number>;
    countries: Record<string, number>;
  };
}

export interface DiscoveryService {
  getCampsites(): Promise<Campsite[]>;
  getCampsiteById(id: string): Promise<Campsite | null>;
  searchCampsites(filters: CampsiteSearchFilters): Promise<Campsite[]>;
}
