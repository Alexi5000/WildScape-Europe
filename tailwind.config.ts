import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#059669',    // Forest Emerald
        secondary: '#14B8A6',  // Teal Waters  
        accent: '#F97316',     // Sunset Orange
        aurora: '#8B5CF6',     // Aurora Purple
        light: '#F3F4F6',      // Morning Mist
        dark: '#0F172A',       // Night Sky
        forest: '#064E3B',     // Deep Forest
        water: '#0891B2'       // Clear Waters
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'aurora': 'aurora 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'morph': 'morph 0.5s ease-in-out',
      },
      keyframes: {
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
      }
    },
  },
  plugins: [],
} satisfies Config