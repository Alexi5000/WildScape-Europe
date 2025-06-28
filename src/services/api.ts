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

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const apiService = ApiService.getInstance();