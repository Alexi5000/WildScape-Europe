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
  difficulty: 'easy' | 'moderate' | 'challenging';
  capacity: number;
  price_per_night: number;
  images: string[];
  weather: {
    current: 'clear' | 'rain' | 'snow' | 'fog' | 'cloudy';
    temperature: number;
    wind_speed: number;
    aurora_probability?: number;
  };
  availability: Record<string, boolean>;
  rating: number;
  reviews_count: number;
}

export interface CampsiteFilter {
  country?: string;
  difficulty?: string;
  amenities?: string[];
  priceRange?: [number, number];
  capacity?: number;
}