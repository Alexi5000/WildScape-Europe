import { create } from 'zustand';

interface UIStore {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  mapViewState: {
    longitude: number;
    latitude: number;
    zoom: number;
    pitch: number;
    bearing: number;
  };
  weatherEffectsEnabled: boolean;
  performanceMode: 'high' | 'medium' | 'low';
  
  // Actions
  setTheme: (theme: 'light' | 'dark') => void;
  setSidebarOpen: (open: boolean) => void;
  setMapViewState: (viewState: any) => void;
  setWeatherEffectsEnabled: (enabled: boolean) => void;
  setPerformanceMode: (mode: 'high' | 'medium' | 'low') => void;
}

export const useUIStore = create<UIStore>((set) => ({
  theme: 'dark',
  sidebarOpen: false,
  mapViewState: {
    longitude: 10.0,
    latitude: 60.0,
    zoom: 4,
    pitch: 60,
    bearing: 0,
  },
  weatherEffectsEnabled: true,
  performanceMode: 'high',

  setTheme: (theme) => set({ theme }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setMapViewState: (viewState) => set({ mapViewState: viewState }),
  setWeatherEffectsEnabled: (enabled) => set({ weatherEffectsEnabled: enabled }),
  setPerformanceMode: (mode) => set({ performanceMode: mode }),
}));