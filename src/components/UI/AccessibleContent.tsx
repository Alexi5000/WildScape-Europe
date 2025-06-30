import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Type, Contrast, Volume2, VolumeX } from 'lucide-react';

export const AccessibilityControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    soundEnabled: true
  });

  const toggleSetting = (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    
    // Apply settings to document
    if (key === 'highContrast') {
      document.documentElement.classList.toggle('high-contrast', newSettings.highContrast);
    }
    if (key === 'largeText') {
      document.documentElement.classList.toggle('large-text', newSettings.largeText);
    }
    if (key === 'reducedMotion') {
      document.documentElement.classList.toggle('reduce-motion', newSettings.reducedMotion);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-forest-600 text-white rounded-full shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Accessibility controls"
      >
        <Eye className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 left-0 bg-white rounded-xl shadow-xl p-4 min-w-64"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-semibold text-forest-deep mb-4">Accessibility Options</h3>
            
            <div className="space-y-3">
              <AccessibilityToggle
                icon={<Contrast className="w-4 h-4" />}
                label="High Contrast"
                checked={settings.highContrast}
                onChange={() => toggleSetting('highContrast')}
              />
              
              <AccessibilityToggle
                icon={<Type className="w-4 h-4" />}
                label="Large Text"
                checked={settings.largeText}
                onChange={() => toggleSetting('largeText')}
              />
              
              <AccessibilityToggle
                icon={settings.reducedMotion ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                label="Reduce Motion"
                checked={settings.reducedMotion}
                onChange={() => toggleSetting('reducedMotion')}
              />
              
              <AccessibilityToggle
                icon={settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                label="Sound Effects"
                checked={settings.soundEnabled}
                onChange={() => toggleSetting('soundEnabled')}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AccessibilityToggle: React.FC<{
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: () => void;
}> = ({ icon, label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer">
    <div className="text-forest-600">{icon}</div>
    <span className="flex-1 text-sm text-forest-primary">{label}</span>
    <button
      onClick={onChange}
      className={`w-10 h-6 rounded-full transition-colors ${
        checked ? 'bg-forest-600' : 'bg-gray-300'
      }`}
      aria-checked={checked}
      role="switch"
    >
      <div
        className={`w-4 h-4 bg-white rounded-full transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-1'
        } mt-1`}
      />
    </button>
  </label>
);