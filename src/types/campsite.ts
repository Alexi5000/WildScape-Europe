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
  difficulty: 'easy' | 'moderate' | 'challenging' | 'expert';
  capacity: number;
  price_per_night: number;
  images: string[];
  weather: {
    current: 'clear' | 'rain' | 'snow' | 'fog';
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
  difficulty?: string;
  amenities?: string[];
  priceRange?: [number, number];
  capacity?: number;
}

export interface SearchFilters {
  location: string;
  dateRange: [Date | null, Date | null];
  guests: number;
  amenities: string[];
  difficulty: string;
  priceRange: [number, number];
}