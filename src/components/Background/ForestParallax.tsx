import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';

export const ForestParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms for different layers
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    const trees = containerRef.current?.querySelectorAll('.tree');
    if (trees) {
      // Animate trees with natural swaying motion
      gsap.to(trees, {
        rotation: '+=3',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 2,
          from: 'random'
        }
      });
    }
  }, []);

  // Generate tree positions with proper distribution
  const generateTreeLayer = (count: number, seed: number = 0) => {
    const trees = [];
    const sectionsPerTree = 100 / count; // Divide viewport into sections
    
    for (let i = 0; i < count; i++) {
      // Calculate base position for even distribution
      const sectionStart = i * sectionsPerTree;
      const sectionEnd = (i + 1) * sectionsPerTree;
      const basePosition = sectionStart + (sectionsPerTree * 0.5); // Center of section
      
      // Add controlled randomness within the section
      const randomOffset = (Math.sin(i * 2.5 + seed) * 0.5 + 0.5) * (sectionsPerTree * 0.6) - (sectionsPerTree * 0.3);
      const finalPosition = Math.max(2, Math.min(98, basePosition + randomOffset));
      
      trees.push({
        left: finalPosition,
        height: Math.abs(Math.sin(i * 1.3 + seed)) * 60 + 80, // 80-140px height
        width: Math.abs(Math.cos(i * 1.7 + seed)) * 12 + 18, // 18-30px width
        rotation: Math.sin(i * 1.9 + seed) * 8, // ±8 degrees rotation
        opacity: Math.abs(Math.cos(i * 0.8 + seed)) * 0.4 + 0.6, // 0.6-1.0 opacity
        hue: Math.abs(Math.sin(i * 0.5 + seed)) * 20 - 10, // Slight color variation
      });
    }
    
    return trees;
  };

  // Create multiple forest layers for depth
  const distantTrees = generateTreeLayer(20, 1);
  const middleTrees = generateTreeLayer(25, 2);
  const nearTrees = generateTreeLayer(18, 3);
  const foregroundTrees = generateTreeLayer(15, 4);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-20 overflow-hidden">
      {/* Sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200 via-green-100 to-green-200" />
      
      {/* Distant mountains */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: y1 }}
      >
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#064E3B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#064E3B" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M0,400 Q200,250 400,300 T800,280 Q1000,260 1200,290 L1200,800 L0,800 Z"
            fill="url(#mountainGradient)"
          />
          <path
            d="M0,450 Q300,300 600,350 T1200,320 L1200,800 L0,800 Z"
            fill="url(#mountainGradient)"
            opacity="0.6"
          />
        </svg>
      </motion.div>

      {/* Layer 1: Distant forest (background) */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: y1 }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-96 w-full">
          {distantTrees.map((tree, i) => (
            <div
              key={`distant-${i}`}
              className="tree absolute bottom-0 will-change-transform"
              style={{
                left: `${tree.left}%`,
                height: `${tree.height}px`,
                width: `${tree.width}px`,
                background: `linear-gradient(to top, 
                  hsl(${158 + tree.hue}, 70%, 25%), 
                  hsl(${158 + tree.hue}, 60%, 35%))`,
                clipPath: 'polygon(50% 0%, 20% 100%, 80% 100%)',
                transform: `translateX(-50%) rotate(${tree.rotation}deg)`,
                filter: 'blur(1px)',
                opacity: tree.opacity * 0.7,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Layer 2: Middle forest */}
      <motion.div 
        className="absolute inset-0 opacity-50"
        style={{ y: y2 }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-80 w-full">
          {middleTrees.map((tree, i) => (
            <div
              key={`middle-${i}`}
              className="tree absolute bottom-0 will-change-transform"
              style={{
                left: `${tree.left}%`,
                height: `${tree.height + 30}px`,
                width: `${tree.width + 4}px`,
                background: `linear-gradient(to top, 
                  hsl(${158 + tree.hue}, 75%, 20%), 
                  hsl(${158 + tree.hue}, 65%, 30%))`,
                clipPath: 'polygon(50% 0%, 15% 100%, 85% 100%)',
                transform: `translateX(-50%) rotate(${tree.rotation}deg)`,
                filter: 'blur(0.5px)',
                opacity: tree.opacity * 0.8,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Layer 3: Near forest */}
      <motion.div 
        className="absolute inset-0 opacity-70"
        style={{ y: y3 }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-64 w-full">
          {nearTrees.map((tree, i) => (
            <div
              key={`near-${i}`}
              className="tree absolute bottom-0 will-change-transform"
              style={{
                left: `${tree.left}%`,
                height: `${tree.height + 60}px`,
                width: `${tree.width + 8}px`,
                background: `linear-gradient(to top, 
                  hsl(${158 + tree.hue}, 80%, 15%), 
                  hsl(${158 + tree.hue}, 70%, 25%))`,
                clipPath: 'polygon(50% 0%, 10% 100%, 90% 100%)',
                transform: `translateX(-50%) rotate(${tree.rotation}deg)`,
                opacity: tree.opacity * 0.9,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Layer 4: Foreground forest */}
      <motion.div 
        className="absolute inset-0 opacity-90"
        style={{ y: y4 }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-48 w-full">
          {foregroundTrees.map((tree, i) => (
            <div
              key={`foreground-${i}`}
              className="tree absolute bottom-0 will-change-transform"
              style={{
                left: `${tree.left}%`,
                height: `${tree.height + 90}px`,
                width: `${tree.width + 12}px`,
                background: `linear-gradient(to top, 
                  hsl(${158 + tree.hue}, 85%, 10%), 
                  hsl(${158 + tree.hue}, 75%, 20%))`,
                clipPath: 'polygon(50% 0%, 5% 100%, 95% 100%)',
                transform: `translateX(-50%) rotate(${tree.rotation}deg)`,
                opacity: tree.opacity,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Atmospheric effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent pointer-events-none" />
      
      {/* Mist effect */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};