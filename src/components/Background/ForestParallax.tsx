import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';

export const ForestParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  useEffect(() => {
    const trees = containerRef.current?.querySelectorAll('.tree');
    if (trees) {
      gsap.to(trees, {
        rotation: '+=5',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5
      });
    }
  }, []);

  // Generate tree positions for better distribution
  const generateTreePositions = (count: number, seed: number = 0) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      // Use a more distributed approach
      const basePosition = (i / count) * 100; // Evenly distribute base positions
      const randomOffset = (Math.sin(i + seed) * 0.5 + 0.5) * 15 - 7.5; // ±7.5% random offset
      const position = Math.max(0, Math.min(100, basePosition + randomOffset));
      
      positions.push({
        left: position,
        height: Math.abs(Math.sin(i * 1.5 + seed)) * 80 + 120, // 120-200px height
        rotation: (Math.sin(i * 2.3 + seed) * 10), // ±10 degrees rotation
        width: Math.abs(Math.cos(i * 1.8 + seed)) * 15 + 20, // 20-35px width
      });
    }
    return positions;
  };

  const layer1Trees = generateTreePositions(25, 1);
  const layer2Trees = generateTreePositions(20, 2);
  const layer3Trees = generateTreePositions(15, 3);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-forest/20 to-dark" />
      
      {/* Layer 1 - Distant mountains */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: y1 }}
      >
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <path
            d="M0,400 Q300,200 600,300 T1200,250 L1200,800 L0,800 Z"
            fill="url(#mountainGradient1)"
          />
          <defs>
            <linearGradient id="mountainGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#064E3B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#064E3B" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Layer 2 - Middle trees (distant) */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        style={{ y: y2 }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-96 w-full">
          {layer2Trees.map((tree, i) => (
            <div
              key={`layer2-${i}`}
              className="tree absolute bottom-0"
              style={{
                left: `${tree.left}%`,
                height: `${tree.height}px`,
                width: `${tree.width}px`,
                background: 'linear-gradient(to top, #064E3B, #059669)',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                transform: `translateX(-50%) rotate(${tree.rotation}deg)`,
                filter: 'blur(0.5px)', // Slight blur for distance effect
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Layer 3 - Middle trees */}
      <motion.div 
        className="absolute inset-0 opacity-60"
        style={{ y: y2 }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-80 w-full">
          {layer1Trees.map((tree, i) => (
            <div
              key={`layer1-${i}`}
              className="tree absolute bottom-0"
              style={{
                left: `${tree.left}%`,
                height: `${tree.height + 50}px`,
                width: `${tree.width + 5}px`,
                background: 'linear-gradient(to top, #064E3B, #059669)',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                transform: `translateX(-50%) rotate(${tree.rotation}deg)`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Layer 4 - Foreground trees */}
      <motion.div 
        className="absolute inset-0 opacity-80"
        style={{ y: y3 }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-64 w-full">
          {layer3Trees.map((tree, i) => (
            <div
              key={`layer3-${i}`}
              className="tree absolute bottom-0"
              style={{
                left: `${tree.left}%`,
                height: `${tree.height + 100}px`,
                width: `${tree.width + 10}px`,
                background: 'linear-gradient(to top, #022C22, #064E3B)',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                transform: `translateX(-50%) rotate(${tree.rotation}deg)`,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Additional scattered trees for more density */}
      <motion.div 
        className="absolute inset-0 opacity-50"
        style={{ y: y1 }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-48 w-full">
          {Array.from({ length: 30 }).map((_, i) => {
            const position = (i * 3.33) % 100; // Distribute across 100% width
            const offset = Math.sin(i * 0.7) * 8; // Small random offset
            const finalPosition = Math.max(0, Math.min(100, position + offset));
            
            return (
              <div
                key={`scattered-${i}`}
                className="tree absolute bottom-0"
                style={{
                  left: `${finalPosition}%`,
                  height: `${Math.abs(Math.sin(i * 1.2)) * 60 + 80}px`,
                  width: `${Math.abs(Math.cos(i * 0.9)) * 8 + 15}px`,
                  background: 'linear-gradient(to top, #064E3B, #059669)',
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  transform: `translateX(-50%) rotate(${Math.sin(i * 1.5) * 8}deg)`,
                  opacity: 0.7,
                }}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Fog overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent pointer-events-none" />
      
      {/* Additional atmospheric effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/2 to-transparent pointer-events-none" />
    </div>
  );
};