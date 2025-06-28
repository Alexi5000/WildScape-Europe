import { Campsite } from '@/types/campsite';
import { WeatherData } from '@/types/weather';
import campsitesData from '@/data/europeCampsites.json';
import weatherData from '@/data/weatherData.json';

// Mock API service for demonstration
export class ApiService {
  private static instance: ApiService;
  
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

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

  async getWeatherData(coordinates: [number, number]): Promise<WeatherData> {
    await this.delay(500);
    return weatherData as WeatherData;
  }

  async searchCampsites(query: string): Promise<Campsite[]> {
    await this.delay(400);
    const campsites = campsitesData as Campsite[];
    
    if (!query.trim()) return campsites;
    
    const searchTerm = query.toLowerCase();
    return campsites.filter(campsite => 
      campsite.name.toLowerCase().includes(searchTerm) ||
      campsite.location.country.toLowerCase().includes(searchTerm) ||
      campsite.location.region.toLowerCase().includes(searchTerm) ||
      campsite.description.toLowerCase().includes(searchTerm)
    );
  }

  async getSuggestions(query: string): Promise<string[]> {
    await this.delay(200);
    
    if (!query.trim()) return [];
    
    const suggestions = [
      'Norway Aurora Camping',
      'Swiss Alpine Retreats',
      'Portuguese Coastal Sites',
      'German Forest Camping',
      'Italian Vineyard Stays',
      'Fjord Edge Adventures',
      'Mountain View Campsites',
      'Beach Access Locations',
      'Wildlife Watching Spots',
      'Photography Destinations'
    ];

    return suggestions.filter(s => 
      s.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const apiService = ApiService.getInstance();