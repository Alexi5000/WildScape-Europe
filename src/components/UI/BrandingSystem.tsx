import React from 'react';
import { motion } from 'framer-motion';

interface BrandingSystemProps {
  variant?: 'primary' | 'secondary' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const BrandingSystem: React.FC<BrandingSystemProps> = ({
  variant = 'primary',
  size = 'md',
  showTagline = true
}) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl'
  };

  const logoVariants = {
    primary: {
      background: 'linear-gradient(135deg, #064E3B 0%, #059669 50%, #10B981 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    secondary: {
      color: '#FFFFFF'
    },
    minimal: {
      color: '#064E3B'
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {/* Forest Icon */}
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 48 48" 
            className="text-forest-600"
          >
            <defs>
              <linearGradient id="forestGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#064E3B" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
            {/* Tree shapes */}
            <path d="M24 8 L16 20 L32 20 Z" fill="url(#forestGradient)" />
            <path d="M24 12 L18 22 L30 22 Z" fill="url(#forestGradient)" opacity="0.8" />
            <path d="M24 16 L20 24 L28 24 Z" fill="url(#forestGradient)" opacity="0.6" />
            <rect x="22" y="24" width="4" height="16" fill="#8B4513" />
          </svg>
        </motion.div>

        <motion.h1 
          className={`font-serif font-bold ${sizeClasses[size]} tracking-tight`}
          style={logoVariants[variant]}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          WildScape
        </motion.h1>

        <motion.span 
          className="text-forest-medium font-medium text-xl tracking-wider"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Europe
        </motion.span>
      </div>

      {/* Tagline */}
      {showTagline && (
        <motion.p 
          className="text-forest-primary font-body italic text-lg text-center max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Where Ancient Forests Tell Their Stories
        </motion.p>
      )}
    </motion.div>
  );
};