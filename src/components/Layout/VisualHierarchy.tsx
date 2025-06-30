import React from 'react';
import { motion } from 'framer-motion';

interface VisualHierarchyProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  spacing?: 'tight' | 'normal' | 'loose' | 'extra-loose';
  alignment?: 'left' | 'center' | 'right';
}

export const VisualHierarchy: React.FC<VisualHierarchyProps> = ({
  children,
  level = 1,
  spacing = 'normal',
  alignment = 'left'
}) => {
  const spacingClasses = {
    tight: 'space-y-4',
    normal: 'space-y-8',
    loose: 'space-y-12',
    'extra-loose': 'space-y-16'
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const levelStyles = {
    1: 'mb-16',
    2: 'mb-12',
    3: 'mb-8',
    4: 'mb-6'
  };

  return (
    <motion.section
      className={`${spacingClasses[spacing]} ${alignmentClasses[alignment]} ${levelStyles[level]}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
};

// Typography components with proper hierarchy
export const Heading1: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <h1 className={`text-5xl md:text-7xl font-serif font-bold text-forest-deep leading-tight mb-6 ${className}`}>
    {children}
  </h1>
);

export const Heading2: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <h2 className={`text-3xl md:text-5xl font-serif font-semibold text-forest-deep leading-tight mb-4 ${className}`}>
    {children}
  </h2>
);

export const Heading3: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <h3 className={`text-2xl md:text-3xl font-serif font-medium text-forest-primary leading-snug mb-3 ${className}`}>
    {children}
  </h3>
);

export const BodyText: React.FC<{ children: React.ReactNode; size?: 'sm' | 'base' | 'lg'; className?: string }> = ({ 
  children, 
  size = 'base',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl'
  };

  return (
    <p className={`${sizeClasses[size]} text-forest-primary leading-relaxed mb-4 ${className}`}>
      {children}
    </p>
  );
};