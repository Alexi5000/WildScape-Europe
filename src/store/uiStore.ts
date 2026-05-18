import { create } from "zustand";
import type { PerformanceMode, ThemeMode, WeatherCondition } from "@/types/common";
import type { MapViewState } from "@/types/map";

interface UIStore {
  theme: ThemeMode;
  sidebarOpen: boolean;
  mapViewState: MapViewState;
  weatherEffectsEnabled: boolean;
  currentWeatherCondition: WeatherCondition;
  performanceMode: PerformanceMode;
  setTheme: (theme: ThemeMode) => void;
  setSidebarOpen: (open: boolean) => void;
  setMapViewState: (viewState: Partial<MapViewState>) => void;
  setWeatherEffectsEnabled: (enabled: boolean) => void;
  setCurrentWeatherCondition: (condition: WeatherCondition) => void;
  setPerformanceMode: (mode: PerformanceMode) => void;
}

const weatherConditions: WeatherCondition[] = ["clear", "rain", "snow", "fog", "cloudy"];
const performanceModes: PerformanceMode[] = ["high", "medium", "low"];

export const useUIStore = create<UIStore>((set, get) => ({
  theme: "dark",
  sidebarOpen: false,
  mapViewState: {
    longitude: 10.0,
    latitude: 60.0,
    zoom: 4,
    pitch: 60,
    bearing: 0,
  },
  weatherEffectsEnabled: true,
  currentWeatherCondition: "clear",
  performanceMode: "high",

  setTheme: (theme) => set({ theme }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setMapViewState: (viewState) => set({ mapViewState: { ...get().mapViewState, ...viewState } }),
  setWeatherEffectsEnabled: (enabled) => set({ weatherEffectsEnabled: enabled }),
  setCurrentWeatherCondition: (condition) => {
    if (weatherConditions.includes(condition)) {
      set({ currentWeatherCondition: condition });
    }
  },
  setPerformanceMode: (mode) => {
    if (performanceModes.includes(mode)) {
      set({ performanceMode: mode });
    }
  },
}));
