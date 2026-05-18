import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, RotateCcw, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/store/uiStore';
import type { MapViewState } from '@/types/map';

interface MapControlsProps {
  onViewChange: (viewState: Partial<MapViewState>) => void;
  currentViewState: MapViewState;
}

export const MapControls: React.FC<MapControlsProps> = ({ onViewChange, currentViewState }) => {
  const { weatherEffectsEnabled, setWeatherEffectsEnabled } = useUIStore();

  const zoomIn = () => {
    onViewChange({ ...currentViewState, zoom: Math.min(currentViewState.zoom + 1, 20) });
  };

  const zoomOut = () => {
    onViewChange({ ...currentViewState, zoom: Math.max(currentViewState.zoom - 1, 1) });
  };

  const resetView = () => {
    onViewChange({ longitude: 10.0, latitude: 60.0, zoom: 4, pitch: 60, bearing: 0 });
  };

  const controls = [
    { icon: Plus, action: zoomIn, label: 'Zoom In' },
    { icon: Minus, action: zoomOut, label: 'Zoom Out' },
    { icon: RotateCcw, action: resetView, label: 'Reset View' },
    {
      icon: Cloud,
      action: () => setWeatherEffectsEnabled(!weatherEffectsEnabled),
      label: 'Toggle Weather',
      active: weatherEffectsEnabled
    }
  ];

  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
      {controls.map((control, index) => {
        const Icon = control.icon;
        return (
          <motion.div
            key={control.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={control.active ? 'default' : 'secondary'}
              size="icon"
              onClick={control.action}
              className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              title={control.label}
            >
              <Icon className="w-4 h-4" />
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
};
