import React from 'react';
import { motion } from 'framer-motion';

interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 'md',
  className = ''
}) => {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  };

  const gridClasses = [
    'grid',
    `grid-cols-${columns.sm || 1}`,
    `md:grid-cols-${columns.md || 2}`,
    `lg:grid-cols-${columns.lg || 3}`,
    `xl:grid-cols-${columns.xl || 4}`,
    gapClasses[gap],
    className
  ].join(' ');

  return (
    <div className={gridClasses}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

// Card component with proper spacing and visual hierarchy
export const ContentCard: React.FC<{
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}> = ({
  children,
  padding = 'md',
  elevation = 'md',
  className = ''
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const elevationClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-forest-lg',
    lg: 'shadow-forest-xl'
  };

  return (
    <motion.div
      className={`
        bg-white/10 backdrop-blur-md rounded-xl border border-white/20
        ${paddingClasses[padding]} ${elevationClasses[elevation]} ${className}
        hover:shadow-forest-xl transition-all duration-300
      `}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};