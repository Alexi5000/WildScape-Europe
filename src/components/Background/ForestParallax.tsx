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

      {/* Layer 2 - Middle trees */}
      <motion.div 
        className="absolute inset-0 opacity-50"
        style={{ y: y2 }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-96">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="tree absolute bottom-0"
              style={{
                left: `${(i * 6) % 100}%`,
                height: `${Math.random() * 100 + 150}px`,
                width: '20px',
                background: 'linear-gradient(to top, #064E3B, #059669)',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                transform: `translateX(-50%) rotate(${Math.random() * 10 - 5}deg)`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Layer 3 - Foreground trees */}
      <motion.div 
        className="absolute inset-0 opacity-70"
        style={{ y: y3 }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-64">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="tree absolute bottom-0"
              style={{
                left: `${(i * 8) % 100}%`,
                height: `${Math.random() * 80 + 120}px`,
                width: '30px',
                background: 'linear-gradient(to top, #022C22, #064E3B)',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                transform: `translateX(-50%) rotate(${Math.random() * 8 - 4}deg)`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Fog overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent pointer-events-none" />
    </div>
  );
};