import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { WeatherParticles } from '../Map/WeatherParticles';
import { useWeather } from '@/hooks/useWeather';

interface WeatherSystemProps {
  coordinates?: [number, number];
  enabled?: boolean;
}

export const WeatherSystem: React.FC<WeatherSystemProps> = ({ 
  coordinates = [10.0, 60.0], 
  enabled = true 
}) => {
  const { weatherData, isLoading } = useWeather(coordinates);
  const [currentCondition, setCurrentCondition] = useState<'clear' | 'rain' | 'snow' | 'fog' | 'cloudy'>('clear');

  useEffect(() => {
    if (weatherData) {
      setCurrentCondition(weatherData.condition);
    }
  }, [weatherData]);

  if (!enabled || isLoading) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
        <WeatherParticles condition={currentCondition} intensity={0.8} />
      </Canvas>
      
      {/* Weather overlay effects */}
      {currentCondition === 'fog' && (
        <div className="absolute inset-0 bg-gray-500/10 backdrop-blur-sm" />
      )}
      
      {currentCondition === 'rain' && (
        <div className="absolute inset-0 bg-blue-900/5" />
      )}
      
      {currentCondition === 'snow' && (
        <div className="absolute inset-0 bg-blue-100/10" />
      )}
    </div>
  );
};