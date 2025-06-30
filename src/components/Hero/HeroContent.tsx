import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Trees, Mountain, Star, Wind, Leaf, Camera } from 'lucide-react';

interface HeroContentProps {
  onExploreClick: () => void;
}

export const HeroContent = ({ onExploreClick }: HeroContentProps) => {
  const [currentText, setCurrentText] = useState(0);
  const heroTexts = [
    "Discover Forest Sanctuaries",
    "Experience Nature's Magic", 
    "Find Your Wild Adventure",
    "Camp Among Ancient Trees"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const floatingIcons = [Trees, Mountain, Star, Wind, Leaf, Camera];

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
      {/* Floating forest icons */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingIcons.map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-forest-300/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [0, 1.2, 0],
              x: [
                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)
              ],
              y: [
                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
              ]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: index * 2,
              ease: "easeInOut"
            }}
          >
            <Icon size={48} />
          </motion.div>
        ))}
      </div>

      {/* Main title with forest theme */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-forest-600 via-forest-500 to-forest-400 bg-clip-text text-transparent mb-2">
          WildScape
        </h1>
        <div className="flex items-center justify-center gap-2 text-forest-700">
          <Trees className="w-8 h-8" />
          <span className="text-xl font-medium">Europe</span>
          <Trees className="w-8 h-8" />
        </div>
      </motion.div>

      {/* Morphing subtitle with forest theme */}
      <div className="h-20 mb-8">
        <motion.h2
          key={currentText}
          className="text-2xl md:text-4xl text-forest-800 font-light"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {heroTexts[currentText]}
        </motion.h2>
      </div>

      {/* Enhanced description */}
      <motion.p 
        className="text-lg md:text-xl text-forest-700 max-w-3xl mb-12 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Immerse yourself in Europe's most enchanting forest sanctuaries. From ancient woodlands to mountain groves, 
        discover premium camping experiences with real-time weather, 3D terrain maps, and wildlife tracking.
      </motion.p>

      {/* Enhanced CTA Buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <motion.button
          className="group px-8 py-4 bg-gradient-to-r from-forest-600 to-forest-500 text-white rounded-full font-semibold text-lg shadow-forest-lg hover:shadow-forest-xl transition-all duration-300 flex items-center gap-3"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExploreClick}
        >
          <Trees className="w-5 h-5 group-hover:animate-forest-sway" />
          Explore Forest Camps
          <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
        
        <motion.button
          className="group px-8 py-4 border-2 border-forest-500 text-forest-700 rounded-full font-semibold text-lg backdrop-blur-sm hover:bg-forest-500 hover:text-white transition-all duration-300 flex items-center gap-3"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Virtual Forest Tours
        </motion.button>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-forest-500 rounded-full flex justify-center relative">
          <motion.div 
            className="w-1 h-3 bg-forest-500 rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute -bottom-8 text-forest-600 text-sm font-medium">
            Scroll to explore
          </div>
        </div>
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-forest-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};