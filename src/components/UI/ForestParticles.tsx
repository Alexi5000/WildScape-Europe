import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ForestParticlesProps {
  density?: 'low' | 'medium' | 'high';
  types?: ('leaf' | 'pollen' | 'dust')[];
}

export const ForestParticles: React.FC<ForestParticlesProps> = ({ 
  density = 'medium',
  types = ['leaf', 'pollen', 'dust']
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const particleCount = {
    low: 15,
    medium: 30,
    high: 50
  }[density];

  const generateParticle = (index: number) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const size = type === 'leaf' ? 4 + Math.random() * 4 : 
                 type === 'pollen' ? 2 + Math.random() * 2 : 
                 1 + Math.random() * 2;
    
    const color = type === 'leaf' ? '#22C55E' : 
                  type === 'pollen' ? '#FCD34D' : 
                  '#D1FAE5';

    return {
      id: index,
      type,
      size,
      color,
      initialX: Math.random() * 100,
      initialY: -10,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 8,
    };
  };

  const particles = Array.from({ length: particleCount }, (_, i) => generateParticle(i));

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            left: `${particle.initialX}%`,
            filter: particle.type === 'leaf' ? 'none' : 'blur(0.5px)',
            boxShadow: particle.type === 'pollen' ? '0 0 4px rgba(252, 211, 77, 0.6)' : 'none',
          }}
          initial={{
            y: particle.initialY,
            x: 0,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            y: window.innerHeight + 50,
            x: particle.type === 'leaf' ? [0, 20, -10, 15, 0] : [0, 10, -5, 0],
            rotate: particle.type === 'leaf' ? [0, 180, 360, 540, 720] : [0, 360],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
            times: particle.type === 'leaf' ? [0, 0.25, 0.5, 0.75, 1] : [0, 1],
          }}
        />
      ))}
    </div>
  );
};