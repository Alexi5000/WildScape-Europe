import type { WeatherCondition } from './common';
import type { WeatherForecastDay } from './api';

export interface WeatherData {
  temperature: number;
  condition: WeatherCondition;
  wind_speed: number;
  humidity: number;
  aurora_probability: number;
  forecast: WeatherForecastDay[];
}

export interface WeatherForecast {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: WeatherCondition;
  precipitation: number;
}

export interface WeatherParticle {
  id: string;
  x: number;
  y: number;
  z: number;
  velocity: {
    x: number;
    y: number;
    z: number;
  };
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
  type?: 'rain' | 'snow' | 'leaf' | 'fog';
}

export interface WeatherParticlesProps {
  condition: WeatherCondition;
  intensity?: number;
  className?: string;
}
