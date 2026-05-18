import type { Campsite } from '@/types/campsite';
import type { BookingRequest, BookingResponse, CampsiteSearchFilters } from '@/types/api';
import type { WeatherData } from '@/types/weather';
import { BookingRepository } from './mock/bookingRepository';
import { CampsiteRepository } from './mock/campsiteRepository';
import { delay } from './mock/delay';
import { WeatherRepository } from './mock/weatherRepository';

export class MockBackend {
  private static instance: MockBackend;
  private readonly campsites = new CampsiteRepository();
  private readonly bookings = new BookingRepository();
  private readonly weather = new WeatherRepository();

  public static getInstance(): MockBackend {
    if (!MockBackend.instance) {
      MockBackend.instance = new MockBackend();
    }

    return MockBackend.instance;
  }

  async getCampsites(): Promise<Campsite[]> {
    await delay(120);
    return this.campsites.findAll();
  }

  async getCampsiteById(id: string): Promise<Campsite | null> {
    await delay(80);
    return this.campsites.findById(id);
  }

  async searchCampsites(filters: CampsiteSearchFilters): Promise<Campsite[]> {
    await delay(120);
    return this.campsites.search(filters);
  }

  async getWeatherData(coordinates: [number, number]): Promise<WeatherData> {
    await delay(90);
    return this.weather.getWeatherData(coordinates);
  }

  async submitBooking(bookingDetails: BookingRequest): Promise<BookingResponse> {
    await delay(150);
    return this.bookings.createBooking(bookingDetails);
  }

  async getUserBookings(userId: string) {
    await delay(100);
    return this.bookings.findByUser(userId);
  }

  async cancelBooking(bookingId: string): Promise<boolean> {
    await delay(100);
    return this.bookings.cancel(bookingId);
  }

  async getSuggestions(query: string): Promise<string[]> {
    await delay(50);
    return this.campsites.suggestions(query);
  }
}

export const mockBackend = MockBackend.getInstance();
