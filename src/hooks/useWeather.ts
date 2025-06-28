import { useState, useEffect } from 'react';
import { WeatherData, WeatherParticle } from '@/types/weather';
import { weatherService } from '@/services/weather';
import { apiService } from '@/services/api';

export const useWeather = (coordinates?: [number, number]) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [particles, setParticles] = useState<WeatherParticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!coordinates) return;

    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getWeatherData(coordinates);
        setWeatherData(data);
        
        // Generate particles based on weather condition
        const newParticles = weatherService.generateWeatherParticles(
          data.condition,
          100
        );
        setParticles(newParticles);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [coordinates]);

  const updateParticles = (deltaTime: number) => {
    setParticles(prevParticles => 
      weatherService.updateParticles(prevParticles, deltaTime)
    );
  };

  return {
    weatherData,
    particles,
    isLoading,
    updateParticles,
    weatherService
  };
};