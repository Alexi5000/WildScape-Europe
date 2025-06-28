import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'mapbox': ['mapbox-gl'],
          'animations': ['framer-motion', 'gsap'],
        }
      }
    }
  },
  optimizeDeps: {
    include: ['three', 'mapbox-gl']
  },
  define: {
    global: 'globalThis',
  },
});