import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Compass } from 'lucide-react';

interface HeroContentProps {
  onSearchClick: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ onSearchClick }) => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-display font-bold text-white mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          Wild<span className="text-aurora">Scape</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Discover Europe's most breathtaking camping destinations with immersive 3D terrain maps and real-time weather visualization
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <button
            onClick={onSearchClick}
            className="group relative px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-glow"
          >
            <span className="flex items-center gap-3">
              <Search className="w-5 h-5" />
              Explore Campsites
            </span>
            <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <button className="group px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
            <span className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              View 3D Map
            </span>
          </button>
        </motion.div>

        <motion.div
          className="flex justify-center gap-8 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-aurora" />
            <span>15+ Countries</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>500+ Locations</span>
          </div>
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-secondary" />
            <span>Real-time Weather</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5, repeat: Infinity, repeatType: 'reverse' }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </div>
  );
};