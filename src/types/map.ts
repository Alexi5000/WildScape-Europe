import type { Campsite } from './campsite';

export interface MapViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

export interface MapMarker<TData = Campsite> {
  id: string;
  coordinates: [number, number];
  type: 'campsite' | 'poi' | 'user_location';
  data: TData;
}

export interface TerrainSettings {
  exaggeration: number;
  showContours: boolean;
  showHillshade: boolean;
  opacity: number;
}
