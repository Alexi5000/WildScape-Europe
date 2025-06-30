import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  type: 'leaf' | 'pollen' | 'dust' | 'firefly';
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  direction: number;
  life: number;
  maxLife: number;
}

interface EnhancedForestParticlesProps {
  density?: 'low' | 'medium' | 'high';
  types?: ('leaf' | 'pollen' | 'dust' | 'firefly')[];
  windStrength?: number;
  timeOfDay?: 'dawn' | 'day' | 'dusk' | 'night';
}

export const EnhancedForestParticles: React.FC<EnhancedForestParticlesProps> = ({ 
  density = 'medium',
  types = ['leaf', 'pollen', 'dust'],
  windStrength = 1,
  timeOfDay = 'day'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const particleCount = {
    low: 20,
    medium: 40,
    high: 80
  }[density];

  // Particle configurations based on type
  const particleConfigs = {
    leaf: {
      size: { min: 6, max: 12 },
      speed: { min: 0.5, max: 2 },
      colors: ['#4A7C59', '#6B9B7A', '#2D5A3D', '#A8C8A8'],
      life: { min: 300, max: 600 }
    },
    pollen: {
      size: { min: 2, max: 4 },
      speed: { min: 0.2, max: 1 },
      colors: ['#FFD700', '#FFA500', '#FFFF99', '#F0E68C'],
      life: { min: 400, max: 800 }
    },
    dust: {
      size: { min: 1, max: 3 },
      speed: { min: 0.1, max: 0.5 },
      colors: ['#D4E6D4', '#E8F5E8', '#F0FDF4', '#FFFFFF'],
      life: { min: 500, max: 1000 }
    },
    firefly: {
      size: { min: 3, max: 6 },
      speed: { min: 0.3, max: 1.5 },
      colors: ['#FFFF00', '#90EE90', '#00FF7F', '#ADFF2F'],
      life: { min: 200, max: 400 }
    }
  };

  // Initialize particles
  useEffect(() => {
    const initParticles = () => {
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const config = particleConfigs[type];
        const life = Math.random() * (config.life.max - config.life.min) + config.life.min;
        
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * (config.size.max - config.size.min) + config.size.min,
          speed: Math.random() * (config.speed.max - config.speed.min) + config.speed.min,
          type,
          color: config.colors[Math.floor(Math.random() * config.colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2,
          opacity: Math.random() * 0.6 + 0.4,
          direction: Math.random() * Math.PI * 2,
          life,
          maxLife: life
        });
      }
      
      setParticles(newParticles);
    };

    initParticles();
  }, [particleCount, types]);

  // Mouse interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let { x, y, rotation, life, direction, speed } = particle;
          
          // Mouse interaction - particles avoid cursor
          const dx = x - mousePosition.x;
          const dy = y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 100;
            x += (dx / distance) * force * 2;
            y += (dy / distance) * force * 2;
          }
          
          // Wind effect
          const windEffect = windStrength * 0.5;
          x += Math.cos(direction) * speed + windEffect;
          y += Math.sin(direction) * speed;
          
          // Gravity for leaves
          if (particle.type === 'leaf') {
            y += 0.3;
          }
          
          // Floating motion for pollen and dust
          if (particle.type === 'pollen' || particle.type === 'dust') {
            y += Math.sin(Date.now() * 0.001 + particle.id) * 0.5;
            x += Math.cos(Date.now() * 0.001 + particle.id) * 0.3;
          }
          
          // Firefly behavior
          if (particle.type === 'firefly' && timeOfDay === 'night') {
            direction += (Math.random() - 0.5) * 0.2;
            y += Math.sin(Date.now() * 0.002 + particle.id) * 1;
          }
          
          // Rotation
          rotation += particle.rotationSpeed;
          
          // Life cycle
          life -= 1;
          
          // Reset particle if it goes off screen or dies
          if (x < -50 || x > window.innerWidth + 50 || 
              y < -50 || y > window.innerHeight + 50 || 
              life <= 0) {
            const config = particleConfigs[particle.type];
            const newLife = Math.random() * (config.life.max - config.life.min) + config.life.min;
            
            return {
              ...particle,
              x: Math.random() * window.innerWidth,
              y: -50,
              life: newLife,
              maxLife: newLife,
              direction: Math.random() * Math.PI * 2
            };
          }
          
          return {
            ...particle,
            x,
            y,
            rotation,
            life,
            direction,
            opacity: Math.min(particle.opacity, life / particle.maxLife)
          };
        })
      );
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition, windStrength, timeOfDay]);

  // Render particle based on type
  const renderParticle = (particle: Particle) => {
    const baseStyle = {
      position: 'absolute' as const,
      left: particle.x,
      top: particle.y,
      width: particle.size,
      height: particle.size,
      opacity: particle.opacity,
      transform: `rotate(${particle.rotation}deg)`,
      pointerEvents: 'none' as const,
      willChange: 'transform, opacity'
    };

    switch (particle.type) {
      case 'leaf':
        return (
          <div
            key={particle.id}
            style={{
              ...baseStyle,
              background: `linear-gradient(45deg, ${particle.color}, ${particle.color}dd)`,
              borderRadius: '50% 0% 50% 0%',
              boxShadow: `0 2px 4px rgba(0,0,0,0.1)`
            }}
          />
        );
        
      case 'pollen':
        return (
          <div
            key={particle.id}
            style={{
              ...baseStyle,
              background: `radial-gradient(circle, ${particle.color}, transparent)`,
              borderRadius: '50%',
              filter: 'blur(0.5px)'
            }}
          />
        );
        
      case 'dust':
        return (
          <div
            key={particle.id}
            style={{
              ...baseStyle,
              background: particle.color,
              borderRadius: '50%',
              filter: 'blur(1px)'
            }}
          />
        );
        
      case 'firefly':
        return (
          <motion.div
            key={particle.id}
            style={{
              ...baseStyle,
              background: `radial-gradient(circle, ${particle.color}, transparent)`,
              borderRadius: '50%',
              filter: 'blur(1px)'
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      style={{ 
        background: timeOfDay === 'night' 
          ? 'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, transparent 70%)'
          : 'transparent'
      }}
    >
      {particles.map(renderParticle)}
      
      {/* Additional atmospheric effects */}
      {timeOfDay === 'dusk' && (
        <div className="absolute inset-0 bg-gradient-to-t from-orange-100/20 to-transparent pointer-events-none" />
      )}
      
      {timeOfDay === 'night' && (
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
      )}
    </div>
  );
};