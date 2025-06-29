export interface WeatherData {
  temperature: number;
  condition: 'clear' | 'rain' | 'snow' | 'fog' | 'cloudy';
  wind_speed: number;
  humidity: number;
  aurora_probability?: number;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  date: string;
  temperature_high: number;
  temperature_low: number;
  condition: string;
  precipitation_chance: number;
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
}

export interface WeatherParticlesProps {
  condition: "clear" | "rain" | "snow" | "fog" | "cloudy";
  intensity: number;
}