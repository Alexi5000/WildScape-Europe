import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FloatingCTAProps {
  onExploreClick: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onExploreClick }) => {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0.8, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
        onClick={onExploreClick}
        className="group relative bg-gradient-to-r from-aurora to-primary p-4 rounded-full shadow-2xl hover:shadow-aurora/50 transition-all duration-300 animate-float"
      >
        <div className="flex items-center gap-3 text-white font-semibold">
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span className="hidden sm:block">Start Exploring</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-aurora to-primary rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10" />
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
      </button>
    </motion.div>
  );
};