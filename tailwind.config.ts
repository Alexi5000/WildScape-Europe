import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Forest Theme Colors
        forest: {
          50: '#F0FDF4',   // Lightest forest green
          100: '#DCFCE7',  // Very light forest green
          200: '#BBF7D0',  // Light forest green
          300: '#86EFAC',  // Medium light forest green
          400: '#4ADE80',  // Medium forest green
          500: '#22C55E',  // Base forest green
          600: '#16A34A',  // Medium dark forest green
          700: '#15803D',  // Dark forest green
          800: '#166534',  // Very dark forest green
          900: '#14532D',  // Darkest forest green
          950: '#052E16',  // Ultra dark forest green
        },
        
        // Earth Tones
        earth: {
          brown: '#8B4513',
          tan: '#D2B48C',
          moss: '#228B22',
          bark: '#4A4A4A',
          stone: '#696969',
        },
        
        // Nature Colors
        nature: {
          sky: '#87CEEB',
          water: '#4682B4',
          sun: '#FFD700',
          mist: '#F5F5F5',
        },
        
        // Legacy colors (maintaining compatibility)
        primary: '#059669',    // Forest Emerald
        secondary: '#14B8A6',  // Teal Waters  
        accent: '#F97316',     // Sunset Orange
        aurora: '#8B5CF6',     // Aurora Purple
        light: '#F3F4F6',      // Morning Mist
        dark: '#0F172A',       // Night Sky
        water: '#0891B2'       // Clear Waters
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      animation: {
        // Forest-themed animations
        'forest-sway': 'forestSway 4s ease-in-out infinite',
        'leaf-fall': 'leafFall 8s linear infinite',
        'mist-float': 'mistFloat 6s ease-in-out infinite',
        'tree-grow': 'treeGrow 2s ease-out',
        
        // Enhanced existing animations
        'aurora': 'aurora 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'morph': 'morph 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      
      keyframes: {
        forestSway: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateX(-2px) rotate(-1deg)' },
          '75%': { transform: 'translateX(2px) rotate(1deg)' },
        },
        leafFall: {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        mistFloat: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)', opacity: '0.3' },
          '50%': { transform: 'translateX(20px) translateY(-10px)', opacity: '0.6' },
        },
        treeGrow: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
        aurora: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.7' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(5, 150, 105, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(5, 150, 105, 0.6)' },
        },
        morph: {
          '0%': { borderRadius: '50px' },
          '100%': { borderRadius: '12px' },
        }
      },
      
      backdropBlur: {
        xs: '2px',
      },
      
      boxShadow: {
        'forest': '0 4px 6px -1px rgba(6, 78, 59, 0.1), 0 2px 4px -1px rgba(6, 78, 59, 0.06)',
        'forest-lg': '0 10px 15px -3px rgba(6, 78, 59, 0.1), 0 4px 6px -2px rgba(6, 78, 59, 0.05)',
        'forest-xl': '0 20px 25px -5px rgba(6, 78, 59, 0.1), 0 10px 10px -5px rgba(6, 78, 59, 0.04)',
        'inner-forest': 'inset 0 2px 4px 0 rgba(6, 78, 59, 0.06)',
      },
      
      backgroundImage: {
        'forest-gradient': 'linear-gradient(135deg, #064E3B 0%, #059669 50%, #10B981 100%)',
        'earth-gradient': 'linear-gradient(135deg, #8B4513 0%, #D2B48C 100%)',
        'nature-gradient': 'linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)',
      },
      
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [
    // Custom plugin for forest utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow-forest': {
          textShadow: '2px 2px 4px rgba(6, 78, 59, 0.3)',
        },
        '.backdrop-forest': {
          backdropFilter: 'blur(12px) saturate(180%)',
          backgroundColor: 'rgba(209, 250, 229, 0.1)',
        },
        '.glass-forest': {
          background: 'rgba(209, 250, 229, 0.1)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(209, 250, 229, 0.2)',
        },
        '.scrollbar-forest': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: theme('colors.forest.100'),
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme('colors.forest.500'),
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: theme('colors.forest.700'),
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config