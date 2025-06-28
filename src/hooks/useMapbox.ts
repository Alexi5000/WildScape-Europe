import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { mapboxService } from '@/services/mapbox';
import { Campsite } from '@/types/campsite';

interface UseMapboxOptions {
  campsites?: Campsite[];
  onCampsiteSelect?: (campsite: Campsite) => void;
  initialViewState?: {
    longitude: number;
    latitude: number;
    zoom: number;
    pitch: number;
    bearing: number;
  };
}

export const useMapbox = (options: UseMapboxOptions = {}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = mapboxService.createMap(mapContainer.current, options.initialViewState);
    
    // Add terrain layer
    mapboxService.addTerrainLayer(map.current);

    // Set up event listeners
    map.current.on('load', () => {
      setIsLoaded(true);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current || !isLoaded || !options.campsites) return;

    // Add campsite markers
    mapboxService.addCampsiteMarkers(
      map.current,
      options.campsites,
      options.onCampsiteSelect
    );
  }, [isLoaded, options.campsites, options.onCampsiteSelect]);

  const flyToLocation = (coordinates: [number, number], zoom?: number) => {
    if (map.current) {
      mapboxService.flyToLocation(map.current, coordinates, zoom);
    }
  };

  const updateViewState = (viewState: any) => {
    if (map.current) {
      map.current.jumpTo(viewState);
    }
  };

  return {
    mapContainer,
    map: map.current,
    isLoaded,
    flyToLocation,
    updateViewState
  };
};