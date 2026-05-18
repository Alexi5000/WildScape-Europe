/**
 * Vite Configuration
 * @author Alex Cinovoj (TechTideAI)
 * @description Production-optimized build configuration for WildScape Europe
 */

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      include: [
        'src/services/**/*.{ts,tsx}',
        'src/store/**/*.{ts,tsx}',
        'src/components/ui/**/*.{ts,tsx}',
      ],
      exclude: [
        'src/test/**',
        'src/**/*.d.ts',
        'src/**/__tests__/**',
      ],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-mapbox': ['mapbox-gl'],
          'vendor-animations': ['framer-motion', 'gsap'],
          'vendor-ui': ['lucide-react', 'zustand'],
        }
      }
    },
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      'mapbox-gl',
      'framer-motion',
      'gsap',
      'lucide-react',
      'zustand'
    ],
    exclude: ['@mapbox/node-pre-gyp']
  },
  define: {
    global: 'globalThis',
  },
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
});
