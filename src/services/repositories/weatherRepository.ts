import type { AuroraForecast, WeatherForecastDay } from "@/types/api";
import type { WeatherCondition } from "@/types/common";
import type { WeatherData } from "@/types/weather";

const conditions: WeatherCondition[] = ["clear", "rain", "snow", "fog", "cloudy"];
const pick = <T>(items: readonly T[], seed: number): T => items[Math.abs(seed) % items.length];

export class WeatherRepository {
  private readonly weatherCache = new Map<string, WeatherData>();

  getWeatherData(coordinates: [number, number]): WeatherData {
    const cacheKey = `${coordinates[0]}_${coordinates[1]}`;
    const cached = this.weatherCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const seed = Math.round((coordinates[0] + coordinates[1]) * 100);
    const data: WeatherData = {
      temperature: (Math.abs(seed) % 31) - 5,
      condition: pick(conditions, seed),
      wind_speed: (Math.abs(seed + 7) % 26) + 5,
      humidity: (Math.abs(seed + 11) % 41) + 40,
      aurora_probability: coordinates[1] > 60 ? Math.abs(seed + 13) % 100 : 0,
      forecast: this.getWeatherForecast(coordinates, 7),
    };

    this.weatherCache.set(cacheKey, data);
    return data;
  }

  getWeatherForecast(coordinates: [number, number], days = 7): WeatherForecastDay[] {
    const seed = Math.round((coordinates[0] + coordinates[1]) * 100);

    return Array.from({ length: days }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      return {
        date: date.toISOString().split("T")[0],
        temperature_high: (Math.abs(seed + index * 3) % 21) + 5,
        temperature_low: (Math.abs(seed + index * 5) % 11) - 5,
        condition: pick(conditions, seed + index),
        precipitation_chance: Math.abs(seed + index * 11) % 100,
        wind_speed: (Math.abs(seed + index * 13) % 21) + 5,
        humidity: (Math.abs(seed + index * 17) % 41) + 40,
      };
    });
  }

  getAuroraForecast(coordinates: [number, number]): AuroraForecast {
    if (coordinates[1] < 60) {
      return { probability: 0, message: "Aurora not visible at this latitude" };
    }

    const seed = Math.round((coordinates[0] + coordinates[1]) * 100);
    return {
      probability: Math.abs(seed) % 100,
      kpIndex: Math.abs(seed + 3) % 9,
      visibility: pick(["Poor", "Fair", "Good", "Excellent"] as const, seed + 5),
      peakTime: "22:30 - 02:00",
      cloudCover: Math.abs(seed + 7) % 100,
    };
  }
}
