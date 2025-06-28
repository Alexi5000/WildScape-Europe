import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Euro } from 'lucide-react';
import { Campsite } from '@/types/campsite';

interface CampsiteMarkersProps {
  campsites: Campsite[];
  onMarkerClick: (campsite: Campsite) => void;
  selectedCampsite?: Campsite | null;
}

export const CampsiteMarkers: React.FC<CampsiteMarkersProps> = ({
  campsites,
  onMarkerClick,
  selectedCampsite
}) => {
  return (
    <>
      {campsites.map((campsite) => (
        <motion.div
          key={campsite.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 ${
            selectedCampsite?.id === campsite.id ? 'z-20' : ''
          }`}
          style={{
            left: `${((campsite.location.coordinates[0] + 180) / 360) * 100}%`,
            top: `${((90 - campsite.location.coordinates[1]) / 180) * 100}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onMarkerClick(campsite)}
        >
          <div
            className={`relative group ${
              selectedCampsite?.id === campsite.id
                ? 'bg-accent shadow-accent/50'
                : 'bg-primary hover:bg-primary/90 shadow-primary/50'
            } w-10 h-10 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center`}
          >
            <MapPin className="w-5 h-5 text-white" />
            
            {/* Pulse animation for selected marker */}
            {selectedCampsite?.id === campsite.id && (
              <div className="absolute inset-0 rounded-full border-2 border-accent animate-ping" />
            )}
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-white rounded-lg shadow-xl p-3 min-w-48 border">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {campsite.name}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {campsite.location.region}, {campsite.location.country}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span>{campsite.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-primary font-semibold">
                    <Euro className="w-3 h-3" />
                    <span>{campsite.price_per_night}/night</span>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};