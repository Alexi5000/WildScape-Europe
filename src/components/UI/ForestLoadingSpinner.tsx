import React from 'react';
import { motion } from 'framer-motion';
import { Trees, Leaf } from 'lucide-react';

interface ForestLoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export const ForestLoadingSpinner: React.FC<ForestLoadingSpinnerProps> = ({ 
  size = 'md',
  message = 'Loading forest data...'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Animated tree icon */}
      <div className="relative mb-4">
        <motion.div
          className={`${sizeClasses[size]} flex items-center justify-center`}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Trees 
            size={iconSizes[size]} 
            className="text-forest-600"
          />
        </motion.div>
        
        {/* Floating leaves */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: [0, 20 * Math.cos(i * 2.1), 0],
              y: [0, 20 * Math.sin(i * 2.1), 0],
              rotate: [0, 360],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          >
            <Leaf size={12} className="text-forest-400" />
          </motion.div>
        ))}
      </div>

      {/* Loading message */}
      <motion.p
        className="text-forest-700 font-medium text-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {message}
      </motion.p>

      {/* Progress dots */}
      <div className="flex gap-1 mt-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-forest-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};