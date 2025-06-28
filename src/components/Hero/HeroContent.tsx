import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Tent, Mountain, Star, Wind } from 'lucide-react';

interface HeroContentProps {
  onExploreClick: () => void;
}

export const HeroContent = ({ onExploreClick }: HeroContentProps) => {
  const [currentText, setCurrentText] = useState(0);
  const heroTexts = [
    "Discover Wild Europe",
    "Experience Aurora Magic", 
    "Find Your Adventure",
    "Camp Under Stars"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden">
        {[Tent, Mountain, Star, Wind].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-white/20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 2,
              ease: "easeInOut"
            }}
          >
            <Icon size={40} />
          </motion.div>
        ))}
      </div>

      {/* Main title with morphing effect */}
      <motion.h1 
        className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-purple-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        WildScape
      </motion.h1>

      {/* Morphing subtitle */}
      <div className="h-20 mb-8">
        <motion.h2
          key={currentText}
          className="text-2xl md:text-4xl text-white/90 font-light"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {heroTexts[currentText]}
        </motion.h2>
      </div>

      {/* Description */}
      <motion.p 
        className="text-lg md:text-xl text-white/70 max-w-2xl mb-12 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Immerse yourself in Europe's most breathtaking wilderness. From Norwegian fjords to Alpine meadows, 
        discover premium camping experiences with real-time weather, 3D terrain maps, and aurora forecasts.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <motion.button
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300"
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(5, 150, 105, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onExploreClick}
        >
          Explore Campsites
        </motion.button>
        
        <motion.button
          className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.6)" }}
          whileTap={{ scale: 0.95 }}
        >
          Watch Aurora Live
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};