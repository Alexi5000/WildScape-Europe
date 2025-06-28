import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, CloudSnow, Sun, CloudDrizzle } from 'lucide-react';

interface WeatherIconProps {
  condition: 'clear' | 'rain' | 'snow' | 'fog' | 'cloudy';
  temperature?: number;
  className?: string;
  animated?: boolean;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  condition, 
  temperature, 
  className = '', 
  animated = true 
}) => {
  const getIcon = () => {
    switch (condition) {
      case 'clear':
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'rain':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      case 'snow':
        return <CloudSnow className="w-6 h-6 text-blue-200" />;
      case 'fog':
        return <CloudDrizzle className="w-6 h-6 text-gray-400" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (condition) {
      case 'clear':
        return 'bg-yellow-500/20';
      case 'cloudy':
        return 'bg-gray-500/20';
      case 'rain':
        return 'bg-blue-500/20';
      case 'snow':
        return 'bg-blue-200/20';
      case 'fog':
        return 'bg-gray-400/20';
      default:
        return 'bg-yellow-500/20';
    }
  };

  const iconElement = (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-sm ${getBackgroundColor()} ${className}`}>
      {getIcon()}
      {temperature !== undefined && (
        <span className="text-white font-medium text-sm">
          {temperature}°C
        </span>
      )}
    </div>
  );

  if (!animated) {
    return iconElement;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {iconElement}
    </motion.div>
  );
};