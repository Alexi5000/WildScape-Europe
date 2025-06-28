import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMapbox } from '@/hooks/useMapbox';
import { useCampsiteStore } from '@/store/campsiteStore';
import { useUIStore } from '@/store/uiStore';
import { Campsite } from '@/types/campsite';
import { MapControls } from './MapControls';
import { WeatherParticles } from './WeatherParticles';

interface Terrain3DMapProps {
  className?: string;
  onCampsiteSelect?: (campsite: Campsite) => void;
}

export const Terrain3DMap: React.FC<Terrain3DMapProps> = ({ 
  className = '', 
  onCampsiteSelect 
}) => {
  const { filteredCampsites, selectedCampsite, setSelectedCampsite } = useCampsiteStore();
  const { mapViewState, setMapViewState, weatherEffectsEnabled } = useUIStore();
  const [isMapReady, setIsMapReady] = useState(false);

  const { mapContainer, map, isLoaded, flyToLocation } = useMapbox({
    campsites: filteredCampsites,
    onCampsiteSelect: (campsite) => {
      setSelectedCampsite(campsite);
      onCampsiteSelect?.(campsite);
    },
    initialViewState: mapViewState
  });

  useEffect(() => {
    if (isLoaded) {
      setIsMapReady(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (selectedCampsite && map) {
      flyToLocation(selectedCampsite.location.coordinates, 12);
    }
  }, [selectedCampsite, map, flyToLocation]);

  const handleViewStateChange = (newViewState: any) => {
    setMapViewState(newViewState);
  };

  return (
    <motion.div 
      className={`relative w-full h-full bg-dark rounded-xl overflow-hidden shadow-2xl ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Map Container */}
      <div 
        ref={mapContainer} 
        className="w-full h-full"
        style={{ minHeight: '600px' }}
      />

      {/* Weather Particles Overlay */}
      {weatherEffectsEnabled && isMapReady && (
        <div className="absolute inset-0 pointer-events-none">
          <WeatherParticles condition="clear" />
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10">
        <MapControls 
          onViewChange={handleViewStateChange}
          currentViewState={mapViewState}
        />
      </div>

      {/* Loading Overlay */}
      {!isMapReady && (
        <div className="absolute inset-0 bg-dark/80 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white font-medium">Loading 3D Terrain...</p>
          </div>
        </div>
      )}

      {/* Campsite Info Panel */}
      {selectedCampsite && (
        <motion.div
          className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 mb-1">
                {selectedCampsite.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {selectedCampsite.location.region}, {selectedCampsite.location.country}
              </p>
              <p className="text-sm text-gray-700 line-clamp-2">
                {selectedCampsite.description}
              </p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-primary font-semibold">
                  €{selectedCampsite.price_per_night}/night
                </span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">
                  {selectedCampsite.difficulty}
                </span>
                <span className="text-xs text-gray-500">
                  ⭐ {selectedCampsite.rating} ({selectedCampsite.reviews_count})
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedCampsite(null)}
              className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};