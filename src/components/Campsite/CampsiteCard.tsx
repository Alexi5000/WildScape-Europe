import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Euro, Users, Mountain, Waves } from 'lucide-react';
import { Campsite } from '@/types/campsite';
import { useCampsiteStore } from '@/store/campsiteStore';
import { WeatherIcon } from '../UI/WeatherIcon';

interface CampsiteCardProps {
  campsite: Campsite;
}

export const CampsiteCard: React.FC<CampsiteCardProps> = ({ campsite }) => {
  const { setSelectedCampsite } = useCampsiteStore();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'challenging': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAmenityIcon = (amenity: string) => {
    const icons: Record<string, React.ReactNode> = {
      mountain_views: <Mountain className="w-4 h-4" />,
      beach_access: <Waves className="w-4 h-4" />,
      aurora_viewing: <span className="text-aurora">✨</span>,
      hiking_trails: <span>🥾</span>,
      fishing: <span>🎣</span>,
      wildlife_watching: <span>🦌</span>,
    };
    return icons[amenity] || <span>🏕️</span>;
  };

  return (
    <motion.div
      className="group bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-white/20"
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedCampsite(campsite)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={campsite.images[0]}
          alt={campsite.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Weather overlay */}
        <div className="absolute top-3 right-3">
          <WeatherIcon 
            condition={campsite.weather.current} 
            temperature={campsite.weather.temperature}
          />
        </div>

        {/* Difficulty badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getDifficultyColor(campsite.difficulty)}`}>
            {campsite.difficulty}
          </span>
        </div>

        {/* Aurora probability (if applicable) */}
        {campsite.weather.aurora_probability && (
          <div className="absolute bottom-3 right-3 bg-aurora/80 text-white px-2 py-1 rounded-full text-xs">
            Aurora {campsite.weather.aurora_probability}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">
              {campsite.name}
            </h3>
            <div className="flex items-center gap-1 text-gray-300 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{campsite.location.region}, {campsite.location.country}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-white text-sm">{campsite.rating}</span>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {campsite.description}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {campsite.amenities.slice(0, 4).map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full text-xs text-gray-300"
              title={amenity.replace('_', ' ')}
            >
              {getAmenityIcon(amenity)}
            </div>
          ))}
          {campsite.amenities.length > 4 && (
            <div className="bg-white/10 px-2 py-1 rounded-full text-xs text-gray-300">
              +{campsite.amenities.length - 4}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{campsite.capacity}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mountain className="w-4 h-4" />
              <span>{campsite.location.elevation}m</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary font-semibold">
            <Euro className="w-4 h-4" />
            <span>{campsite.price_per_night}/night</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};