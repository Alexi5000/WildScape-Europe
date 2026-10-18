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
        manualChunks(id) {
          if (!id.includes('/node_modules/')) return;
          if (/\/node_modules\/(react|react-dom)\//.test(id)) return 'vendor-react';
          if (/\/node_modules\/(three|@react-three)\//.test(id)) return 'vendor-three';
          if (id.includes('/node_modules/mapbox-gl/')) return 'vendor-mapbox';
          if (/\/node_modules\/(framer-motion|gsap)\//.test(id)) return 'vendor-animations';
          if (/\/node_modules\/(lucide-react|zustand)\//.test(id)) return 'vendor-ui';
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
