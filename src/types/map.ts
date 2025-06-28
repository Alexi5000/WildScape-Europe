export interface MapViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

export interface MapMarker {
  id: string;
  coordinates: [number, number];
  type: 'campsite' | 'poi' | 'weather';
  data: any;
}

export interface TerrainSettings {
  exaggeration: number;
  showContours: boolean;
  showHillshade: boolean;
  opacity: number;
}