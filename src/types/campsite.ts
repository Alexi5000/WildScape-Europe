import type { Difficulty, WeatherCondition } from './common';

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Campsite {
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
  difficulty: Difficulty;
  capacity: number;
  price_per_night: number;
  images: string[];
  weather: {
    current: WeatherCondition;
    temperature: number;
    wind_speed: number;
    aurora_probability?: number;
  };
  availability: Record<string, boolean>;
  rating: number;
  reviews: Review[];
  features: {
    has_aurora_viewing: boolean;
    has_hot_springs: boolean;
    has_lake_access: boolean;
    has_mountain_views: boolean;
  };
}

export interface CampsiteFilter {
  country?: string;
  difficulty?: Difficulty;
  amenities?: string[];
  priceRange?: [number, number];
  capacity?: number;
}

export interface SearchFilters {
  location: string;
  dateRange: [Date | null, Date | null];
  guests: number;
  amenities: string[];
  difficulty: 'any' | Difficulty;
  priceRange: [number, number];
}

export const CAMPSITE_DIFFICULTIES: Difficulty[] = ['easy', 'moderate', 'challenging', 'expert'];

export const isDifficulty = (value: string): value is Difficulty =>
  CAMPSITE_DIFFICULTIES.includes(value as Difficulty);
