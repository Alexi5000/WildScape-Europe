import type { Campsite } from "@/types/campsite";
import type { BookingRequest, BookingResponse, CampsiteSearchFilters } from "@/types/api";
import type { WeatherData } from "@/types/weather";
import { BookingRepository } from "./repositories/bookingRepository";
import { CampsiteRepository } from "./repositories/campsiteRepository";
import { delay } from "./repositories/delay";
import { WeatherRepository } from "./repositories/weatherRepository";

export class ProductionServiceFacade {
  private static instance: ProductionServiceFacade | undefined;
  private readonly campsites = new CampsiteRepository();
  private readonly bookings = new BookingRepository();
  private readonly weather = new WeatherRepository();

  public static getInstance(): ProductionServiceFacade {
    if (!ProductionServiceFacade.instance) {
      ProductionServiceFacade.instance = new ProductionServiceFacade();
    }

    return ProductionServiceFacade.instance;
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

export const productionService = ProductionServiceFacade.getInstance();
