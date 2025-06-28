import React from 'react';
import { motion } from 'framer-motion';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Cloud 
} from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

interface MapControlsProps {
  onViewChange: (viewState: any) => void;
  currentViewState: any;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onViewChange,
  currentViewState
}) => {
  const { weatherEffectsEnabled, setWeatherEffectsEnabled } = useUIStore();

  const handleZoomIn = () => {
    onViewChange({
      ...currentViewState,
      zoom: Math.min(currentViewState.zoom + 1, 20)
    });
  };

  const handleZoomOut = () => {
    onViewChange({
      ...currentViewState,
      zoom: Math.max(currentViewState.zoom - 1, 1)
    });
  };

  const handleReset = () => {
    onViewChange({
      longitude: 10.0,
      latitude: 60.0,
      zoom: 4,
      pitch: 60,
      bearing: 0
    });
  };

  const toggleWeatherEffects = () => {
    setWeatherEffectsEnabled(!weatherEffectsEnabled);
  };

  const controls = [
    {
      icon: ZoomIn,
      label: 'Zoom In',
      onClick: handleZoomIn,
    },
    {
      icon: ZoomOut,
      label: 'Zoom Out',
      onClick: handleZoomOut,
    },
    {
      icon: RotateCcw,
      label: 'Reset View',
      onClick: handleReset,
    },
    {
      icon: Cloud,
      label: 'Weather Effects',
      onClick: toggleWeatherEffects,
      active: weatherEffectsEnabled,
    },
  ];

  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {controls.map((control, index) => (
        <motion.button
          key={control.label}
          className={`group relative p-3 rounded-lg shadow-lg transition-all duration-300 ${
            control.active
              ? 'bg-primary text-white shadow-primary/50'
              : 'bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 shadow-black/10'
          } backdrop-blur-sm hover:scale-105`}
          onClick={control.onClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <control.icon className="w-5 h-5" />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900 text-white text-sm px-2 py-1 rounded whitespace-nowrap">
              {control.label}
            </div>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};