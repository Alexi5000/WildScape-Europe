import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Trees, Mountain, Star, Wind, Leaf, Camera, Compass, Heart } from 'lucide-react';

interface EnhancedHeroContentProps {
  onExploreClick: () => void;
}

export const EnhancedHeroContent = ({ onExploreClick }: EnhancedHeroContentProps) => {
  const [currentText, setCurrentText] = useState(0);
  const { scrollY } = useScroll();
  
  // Parallax effects for hero content
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const heroTexts = [
    "Where Ancient Trees Tell Stories",
    "Discover Europe's Hidden Sanctuaries", 
    "Find Your Wild Soul",
    "Camp Among Whispering Giants",
    "Experience Nature's Cathedral"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const floatingIcons = [
    { Icon: Trees, delay: 0, duration: 8 },
    { Icon: Mountain, delay: 1, duration: 10 },
    { Icon: Star, delay: 2, duration: 12 },
    { Icon: Wind, delay: 3, duration: 9 },
    { Icon: Leaf, delay: 4, duration: 11 },
    { Icon: Camera, delay: 5, duration: 7 },
    { Icon: Compass, delay: 6, duration: 13 },
    { Icon: Heart, delay: 7, duration: 6 }
  ];

  return (
    <motion.div 
      className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4"
      style={{ y, opacity, scale }}
    >
      {/* Floating forest icons with enhanced animations */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingIcons.map(({ Icon, delay, duration }, index) => (
          <motion.div
            key={index}
            className="absolute text-forest-medium/20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              rotate: [0, 360, 720]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay * 2,
              ease: "easeInOut"
            }}
          >
            <Icon size={64} />
          </motion.div>
        ))}
      </div>

      {/* Enhanced main title */}
      <motion.div
        className="mb-8 relative"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-4 relative"
          style={{
            background: 'linear-gradient(135deg, var(--forest-deep) 0%, var(--forest-medium) 50%, var(--forest-primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 4px 20px rgba(45, 90, 61, 0.3)'
          }}
        >
          WildScape
        </motion.h1>
        
        <motion.div 
          className="flex items-center justify-center gap-4 text-forest-primary"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Trees className="w-10 h-10" />
          <span className="text-2xl font-medium tracking-wider">Europe</span>
          <Trees className="w-10 h-10" />
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-8 -left-8 w-16 h-16 border-2 border-forest-light rounded-full opacity-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-8 -right-8 w-12 h-12 border-2 border-forest-medium rounded-full opacity-40"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Enhanced morphing subtitle */}
      <div className="h-24 mb-8 flex items-center justify-center">
        <motion.h2
          key={currentText}
          className="text-2xl md:text-4xl lg:text-5xl text-forest-primary font-body italic"
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -30, rotateX: 90 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {heroTexts[currentText]}
        </motion.h2>
      </div>

      {/* Enhanced description with typewriter effect */}
      <motion.div 
        className="max-w-4xl mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <p className="text-lg md:text-xl lg:text-2xl text-forest-primary leading-relaxed font-body">
          Step into Europe's most enchanting forest sanctuaries, where every path leads to wonder. 
          From ancient woodlands to mountain groves, discover premium camping experiences with 
          <span className="text-forest-medium font-semibold"> real-time weather</span>, 
          <span className="text-forest-medium font-semibold"> 3D terrain maps</span>, and 
          <span className="text-forest-medium font-semibold"> wildlife tracking</span>.
        </p>
      </motion.div>

      {/* Enhanced CTA Buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-6 mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.button
          className="group relative px-10 py-5 bg-gradient-to-r from-forest-medium to-forest-primary text-white rounded-full font-semibold text-lg shadow-lg overflow-hidden"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExploreClick}
        >
          <span className="relative z-10 flex items-center gap-3">
            <Trees className="w-6 h-6 group-hover:animate-pulse" />
            Begin Forest Journey
            <motion.div
              className="w-3 h-3 bg-white rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </span>
          
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-forest-primary to-forest-dark"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
        
        <motion.button
          className="group px-10 py-5 border-3 border-forest-medium text-forest-primary rounded-full font-semibold text-lg backdrop-blur-sm bg-white/10 hover:bg-forest-medium hover:text-white transition-all duration-300"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center gap-3">
            <Camera className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            Virtual Forest Tours
          </span>
        </motion.button>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative">
          <div className="w-8 h-14 border-3 border-forest-medium rounded-full flex justify-center relative overflow-hidden">
            <motion.div 
              className="w-2 h-4 bg-forest-medium rounded-full mt-3"
              animate={{ 
                y: [0, 16, 0],
                opacity: [0.3, 1, 0.3] 
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </div>
          
          <motion.div 
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-forest-primary text-sm font-medium whitespace-nowrap"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore the forest
          </motion.div>
          
          {/* Decorative arrows */}
          <motion.div
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-forest-medium" />
              <div className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-forest-medium opacity-60" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Ambient floating particles specific to hero */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-forest-light rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -200, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};