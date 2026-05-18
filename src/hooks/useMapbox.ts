import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { mapboxService } from '@/services/mapbox';
import { Campsite } from '@/types/campsite';
import type { MapViewState } from '@/types/map';

interface UseMapboxOptions {
  campsites: Campsite[];
  onCampsiteClick?: (campsite: Campsite) => void;
  initialViewState?: MapViewState;
}

export const useMapbox = (options: UseMapboxOptions) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) {
      return;
    }

    map.current = mapboxService.createMap(mapContainer.current, options.initialViewState);

    map.current.on('load', () => {
      setIsLoaded(true);
      if (map.current) {
        mapboxService.addTerrainLayer(map.current);
        mapboxService.addCampsiteMarkers(map.current, options.campsites, options.onCampsiteClick);
      }
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (map.current && isLoaded) {
      mapboxService.addCampsiteMarkers(map.current, options.campsites, options.onCampsiteClick);
    }
  }, [options.campsites, options.onCampsiteClick, isLoaded]);

  const flyToLocation = (coordinates: [number, number], zoom = 12) => {
    if (map.current) {
      mapboxService.flyToLocation(map.current, coordinates, zoom);
    }
  };

  const updateViewState = (viewState: Partial<MapViewState>) => {
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
