import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Star, Euro, Users, Mountain, Calendar, Cloud } from 'lucide-react';
import { Campsite } from '@/types/campsite';
import { useCampsiteStore } from '@/store/campsiteStore';
import { WeatherIcon } from '../UI/WeatherIcon';

interface CampsiteDetailsProps {
  campsite: Campsite;
  onClose: () => void;
}

export const CampsiteDetails: React.FC<CampsiteDetailsProps> = ({ campsite, onClose }) => {
  const availableDates = Object.entries(campsite.availability)
    .filter(([_, available]) => available)
    .map(([date]) => date);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={campsite.images[0]}
              alt={campsite.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl font-bold text-white mb-2">{campsite.name}</h1>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-5 h-5" />
                <span>{campsite.location.region}, {campsite.location.country}</span>
                <span className="mx-2">•</span>
                <Mountain className="w-5 h-5" />
                <span>{campsite.location.elevation}m elevation</span>
              </div>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <div className="font-semibold">{campsite.rating}</div>
                <div className="text-sm text-gray-600">{campsite.reviews_count} reviews</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <Euro className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="font-semibold">€{campsite.price_per_night}</div>
                <div className="text-sm text-gray-600">per night</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <Users className="w-6 h-6 text-secondary mx-auto mb-2" />
                <div className="font-semibold">{campsite.capacity}</div>
                <div className="text-sm text-gray-600">max capacity</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <WeatherIcon 
                  condition={campsite.weather.current} 
                  temperature={campsite.weather.temperature}
                  className="mx-auto mb-2"
                />
                <div className="font-semibold">{campsite.weather.temperature}°C</div>
                <div className="text-sm text-gray-600 capitalize">{campsite.weather.current}</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">About this campsite</h2>
              <p className="text-gray-700 leading-relaxed">{campsite.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {campsite.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <span className="text-primary">✓</span>
                    <span className="capitalize text-sm">{amenity.replace('_', ' ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather Details */}
            {campsite.weather.aurora_probability && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Aurora Forecast</h2>
                <div className="bg-gradient-to-r from-aurora/10 to-primary/10 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✨</span>
                    <div>
                      <div className="font-semibold text-aurora">
                        {campsite.weather.aurora_probability}% chance tonight
                      </div>
                      <div className="text-sm text-gray-600">
                        Perfect conditions for northern lights viewing
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Availability */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">Availability</h2>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {Object.entries(campsite.availability).map(([date, available]) => (
                  <div
                    key={date}
                    className={`p-2 rounded-lg text-center text-sm ${
                      available
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    <div className="font-medium">
                      {new Date(date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="text-xs">
                      {available ? 'Available' : 'Booked'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Button */}
            <div className="sticky bottom-0 bg-white pt-4 border-t">
              <button className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-semibold text-lg transition-colors">
                Book Now - €{campsite.price_per_night}/night
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};