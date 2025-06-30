import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';

export const EnhancedForestParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Enhanced parallax transforms with spring physics
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), { stiffness: 100, damping: 30 });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), { stiffness: 100, damping: 30 });
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -300]), { stiffness: 100, damping: 30 });
  const y4 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -400]), { stiffness: 100, damping: 30 });
  const y5 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -500]), { stiffness: 100, damping: 30 });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const trees = containerRef.current?.querySelectorAll('.tree');
    if (trees) {
      // Enhanced tree swaying animation
      gsap.to(trees, {
        rotation: '+=2',
        duration: 6 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 3,
          from: 'random'
        }
      });

      // Wind effect
      gsap.to(trees, {
        x: '+=5',
        duration: 8 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        stagger: {
          amount: 2,
          from: 'random'
        }
      });
    }

    // Ambient lighting animation
    const lightRays = containerRef.current?.querySelectorAll('.light-ray');
    if (lightRays) {
      gsap.to(lightRays, {
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5
      });
    }
  }, []);

  // Generate enhanced tree layers with more variety
  const generateTreeLayer = (count: number, seed: number = 0, layerType: string) => {
    const trees = [];
    const sectionsPerTree = 100 / count;
    
    for (let i = 0; i < count; i++) {
      const sectionStart = i * sectionsPerTree;
      const sectionEnd = (i + 1) * sectionsPerTree;
      const basePosition = sectionStart + (sectionsPerTree * 0.5);
      
      const randomOffset = (Math.sin(i * 2.5 + seed) * 0.5 + 0.5) * (sectionsPerTree * 0.7) - (sectionsPerTree * 0.35);
      const finalPosition = Math.max(1, Math.min(99, basePosition + randomOffset));
      
      // Enhanced tree properties based on layer
      const baseHeight = layerType === 'distant' ? 60 : 
                        layerType === 'middle' ? 80 : 
                        layerType === 'near' ? 100 : 120;
      
      const heightVariation = Math.abs(Math.sin(i * 1.3 + seed)) * 40;
      const widthVariation = Math.abs(Math.cos(i * 1.7 + seed)) * 15;
      
      trees.push({
        left: finalPosition,
        height: baseHeight + heightVariation,
        width: 20 + widthVariation,
        rotation: Math.sin(i * 1.9 + seed) * 6,
        opacity: Math.abs(Math.cos(i * 0.8 + seed)) * 0.3 + 0.7,
        hue: Math.abs(Math.sin(i * 0.5 + seed)) * 15 - 7.5,
        treeType: Math.floor(Math.random() * 3), // Different tree shapes
        hasCanopy: Math.random() > 0.3,
        branchCount: Math.floor(Math.random() * 3) + 2
      });
    }
    
    return trees;
  };

  // Create multiple detailed forest layers
  const distantMountains = generateTreeLayer(8, 1, 'mountains');
  const distantTrees = generateTreeLayer(25, 2, 'distant');
  const middleTrees = generateTreeLayer(30, 3, 'middle');
  const nearTrees = generateTreeLayer(22, 4, 'near');
  const foregroundTrees = generateTreeLayer(18, 5, 'foreground');

  // Tree component with enhanced details
  const TreeComponent = ({ tree, className, style }: any) => {
    const treeShapes = [
      'polygon(50% 0%, 20% 100%, 80% 100%)', // Classic pine
      'polygon(50% 0%, 15% 100%, 85% 100%)', // Tall pine
      'polygon(50% 0%, 25% 80%, 75% 80%, 85% 100%, 15% 100%)' // Layered pine
    ];

    return (
      <div
        className={`tree absolute bottom-0 will-change-transform ${className}`}
        style={{
          left: `${tree.left}%`,
          height: `${tree.height}px`,
          width: `${tree.width}px`,
          transform: `translateX(-50%) rotate(${tree.rotation}deg)`,
          opacity: tree.opacity,
          ...style
        }}
      >
        {/* Tree trunk */}
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{
            width: `${tree.width * 0.15}px`,
            height: `${tree.height * 0.3}px`,
            background: `linear-gradient(to top, 
              hsl(${25 + tree.hue}, 40%, 20%), 
              hsl(${25 + tree.hue}, 35%, 25%))`,
            borderRadius: '2px'
          }}
        />
        
        {/* Tree canopy */}
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          style={{
            width: `${tree.width}px`,
            height: `${tree.height * 0.8}px`,
            background: `linear-gradient(to top, 
              hsl(${120 + tree.hue}, 60%, 25%), 
              hsl(${120 + tree.hue}, 55%, 35%))`,
            clipPath: treeShapes[tree.treeType],
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
          }}
        />

        {/* Additional canopy layers for depth */}
        {tree.hasCanopy && (
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            style={{
              width: `${tree.width * 0.8}px`,
              height: `${tree.height * 0.6}px`,
              background: `linear-gradient(to top, 
                hsl(${120 + tree.hue}, 65%, 30%), 
                hsl(${120 + tree.hue}, 60%, 40%))`,
              clipPath: treeShapes[(tree.treeType + 1) % 3],
              opacity: 0.8
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="fixed inset-0 -z-20 overflow-hidden">
      {/* Enhanced sky gradient with time-of-day feeling */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: `linear-gradient(180deg, 
              #87CEEB 0%, 
              #98D8E8 20%, 
              #B8E6B8 40%, 
              #D4F4D4 60%, 
              #E8F8E8 80%, 
              #F0FDF4 100%)`
          }}
        />
        
        {/* Atmospheric light rays */}
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="light-ray absolute opacity-20"
              style={{
                left: `${20 + i * 15}%`,
                top: '10%',
                width: '2px',
                height: '60%',
                background: 'linear-gradient(180deg, #FFD700, transparent)',
                transform: `rotate(${-10 + i * 5}deg)`,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Distant mountains */}
      <motion.div 
        className="absolute inset-0 opacity-15"
        style={{ y: y1 }}
      >
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2D5A3D" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1A4B2F" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            d="M0,400 Q200,200 400,250 T800,230 Q1000,210 1200,240 L1200,800 L0,800 Z"
            fill="url(#mountainGradient)"
          />
          <path
            d="M0,480 Q300,280 600,320 T1200,300 L1200,800 L0,800 Z"
            fill="url(#mountainGradient)"
            opacity="0.6"
          />
        </svg>
      </motion.div>

      {/* Layer 1: Distant forest */}
      <motion.div 
        className="absolute inset-0 opacity-25"
        style={{ 
          y: y1,
          x: mousePosition.x * 0.5
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-96 w-full">
          {distantTrees.map((tree, i) => (
            <TreeComponent
              key={`distant-${i}`}
              tree={tree}
              className="opacity-70"
              style={{
                filter: 'blur(2px)',
                zIndex: 1
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Layer 2: Middle forest */}
      <motion.div 
        className="absolute inset-0 opacity-45"
        style={{ 
          y: y2,
          x: mousePosition.x * 0.7
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-80 w-full">
          {middleTrees.map((tree, i) => (
            <TreeComponent
              key={`middle-${i}`}
              tree={tree}
              className="opacity-80"
              style={{
                filter: 'blur(1px)',
                zIndex: 2
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Layer 3: Near forest */}
      <motion.div 
        className="absolute inset-0 opacity-65"
        style={{ 
          y: y3,
          x: mousePosition.x * 0.9
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-64 w-full">
          {nearTrees.map((tree, i) => (
            <TreeComponent
              key={`near-${i}`}
              tree={tree}
              className="opacity-90"
              style={{
                filter: 'blur(0.5px)',
                zIndex: 3
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Layer 4: Foreground forest */}
      <motion.div 
        className="absolute inset-0 opacity-85"
        style={{ 
          y: y4,
          x: mousePosition.x
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-48 w-full">
          {foregroundTrees.map((tree, i) => (
            <TreeComponent
              key={`foreground-${i}`}
              tree={tree}
              className="opacity-95"
              style={{
                zIndex: 4,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Atmospheric effects */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: y2 }}
      >
        {/* Mist layers */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/30 via-white/10 to-transparent" />
        <div className="absolute bottom-20 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent" />
        
        {/* Sunlight filtering through trees */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-100/5 to-transparent" />
      </motion.div>

      {/* Ground layer with organic texture */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{ y: y5 }}
      >
        <div 
          className="w-full h-full"
          style={{
            background: `linear-gradient(180deg, 
              transparent 0%, 
              #4A7C59 50%, 
              #2D5A3D 100%)`,
            borderRadius: '100% 100% 0 0 / 20px 20px 0 0'
          }}
        />
      </motion.div>
    </div>
  );
};