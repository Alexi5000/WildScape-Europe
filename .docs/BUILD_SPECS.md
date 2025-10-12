# Build Specifications

Complete technical specifications for WildScape Europe build configuration.

## 🔧 Build Configuration

### Vite Configuration

**File**: `vite.config.ts`

```typescript
{
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': './src'  // Path alias for imports
    }
  },
  
  build: {
    target: 'es2015',           // Browser compatibility
    minify: 'terser',           // Minification engine
    terserOptions: {
      compress: {
        drop_console: true,     // Remove console.log in production
        drop_debugger: true     // Remove debugger statements
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-mapbox': ['mapbox-gl'],
          'vendor-animations': ['framer-motion', 'gsap'],
          'vendor-ui': ['lucide-react', 'zustand']
        }
      }
    }
  },
  
  optimizeDeps: {
    include: [
      'react', 'react-dom', 'three', 'mapbox-gl',
      'framer-motion', 'gsap', 'lucide-react', 'zustand'
    ],
    exclude: ['@mapbox/node-pre-gyp']
  },
  
  server: {
    port: 3000,
    host: true              // Expose to network
  },
  
  preview: {
    port: 4173,
    host: true
  }
}
```

### TypeScript Configuration

**File**: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Tailwind Configuration

**File**: `tailwind.config.ts`

```typescript
{
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  
  theme: {
    extend: {
      colors: {
        forest: {
          50-950: /* 11 shades */
        },
        earth: {
          brown, tan, moss, bark, stone
        },
        nature: {
          sky, water, sun, mist
        }
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      
      animation: {
        'forest-sway', 'leaf-fall', 'mist-float',
        'aurora', 'float', 'glow', 'morph',
        'pulse-slow', 'bounce-slow', 'spin-slow'
      },
      
      screens: {
        xs: '475px',
        3xl: '1600px'
      }
    }
  },
  
  plugins: [/* Custom forest utilities */]
}
```

## 📦 Dependencies

### Production Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "framer-motion": "^10.16.0",
  "mapbox-gl": "^2.15.0",
  "lucide-react": "^0.263.0",
  "zustand": "^4.4.0",
  "clsx": "^2.0.0",
  "lenis": "^1.3.4",
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.88.0",
  "three": "^0.157.0",
  "gsap": "^3.12.0"
}
```

### Development Dependencies

```json
{
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0",
  "@types/mapbox-gl": "^2.7.0",
  "@types/three": "^0.157.0",
  "@types/node": "^20.0.0",
  "@vitejs/plugin-react": "^4.1.0",
  "autoprefixer": "^10.4.14",
  "postcss": "^8.4.24",
  "tailwindcss": "^3.3.0",
  "typescript": "^5.2.0",
  "vite": "^4.5.0",
  "eslint": "^8.45.0",
  "@typescript-eslint/eslint-plugin": "^6.0.0",
  "@typescript-eslint/parser": "^6.0.0",
  "eslint-plugin-react-hooks": "^4.6.0",
  "eslint-plugin-react-refresh": "^0.4.3",
  "prettier": "^3.0.0",
  "terser": "^5.19.0"
}
```

## 🚀 Scripts

```json
{
  "dev": "vite",                          // Start dev server (port 3000)
  "build": "tsc && vite build",           // Type check + build
  "preview": "vite preview",              // Preview build (port 4173)
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "lint:fix": "eslint . --ext ts,tsx --fix",
  "type-check": "tsc --noEmit",
  "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
  "analyze": "npx vite-bundle-analyzer"
}
```

## 🎯 Build Output

### Manual Chunks (Code Splitting)

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js              # Main app code
│   ├── vendor-react-[hash].js       # ~140KB (react, react-dom)
│   ├── vendor-three-[hash].js       # ~580KB (three.js ecosystem)
│   ├── vendor-mapbox-[hash].js      # ~450KB (mapbox-gl)
│   ├── vendor-animations-[hash].js  # ~150KB (framer-motion, gsap)
│   ├── vendor-ui-[hash].js          # ~50KB (lucide, zustand)
│   └── index-[hash].css             # Tailwind styles
└── ...
```

### Optimization Results

- **Total Bundle Size**: ~1.5MB (uncompressed)
- **Gzipped**: ~450KB
- **First Load**: vendor-react + index (~200KB gzipped)
- **Code Splitting**: 6 vendor chunks + app code
- **Tree Shaking**: Enabled via Rollup
- **Minification**: Terser with aggressive compression

## 🌐 Browser Support

### Target Browsers

```javascript
{
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead",
    "not ie 11"
  ]
}
```

### Supported Browsers

- **Chrome**: Latest 2 versions (✅)
- **Edge**: Latest 2 versions (✅)
- **Firefox**: Latest 2 versions (✅)
- **Safari**: Latest 2 versions (✅)
- **iOS Safari**: 14+ (✅)
- **Chrome Android**: Latest (✅)

### Required Features

- ES2015 support
- WebGL 1.0/2.0 (for Three.js)
- CSS Grid & Flexbox
- CSS Custom Properties
- Async/Await
- ES Modules

## ⚙️ Development Environment

### Port Configuration

- **Development**: `http://localhost:3000`
- **Preview**: `http://localhost:4173`
- **Network Access**: Enabled (`host: true`)

### Hot Module Replacement (HMR)

- Fast Refresh for React components
- Instant style updates (Tailwind)
- Preserves component state
- Error overlay in development

### Path Aliases

```typescript
// Use @ for src imports
import { Component } from '@/components/Component';
import { useStore } from '@/store/store';
import type { Campsite } from '@/types/campsite';
```

## 📊 Performance Metrics

### Build Performance

- **Clean Build**: ~15-20 seconds
- **Incremental Build**: ~2-5 seconds
- **Dev Server Start**: ~3-5 seconds
- **HMR Update**: <1 second

### Runtime Performance

- **Lighthouse Performance**: 90+
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Time to Interactive**: <3.5s
- **Total Blocking Time**: <200ms

## 🔒 Production Optimizations

### Enabled in Production

✅ Terser minification  
✅ Console statement removal  
✅ Debugger statement removal  
✅ Dead code elimination  
✅ Tree shaking  
✅ CSS minification  
✅ Asset optimization  
✅ Gzip compression  
✅ Brotli compression  
✅ Source map generation (optional)

### Disabled in Production

❌ Development error overlay  
❌ Hot module replacement  
❌ Verbose logging  
❌ Development source maps

## 📝 Environment Variables

### Required Format

```bash
# Must be prefixed with VITE_
VITE_MAPBOX_TOKEN=your_token
VITE_API_URL=https://api.example.com
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Access in Code

```typescript
// Use import.meta.env (not process.env)
const token = import.meta.env.VITE_MAPBOX_TOKEN;
const apiUrl = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
```

## 🛠️ Build Commands

### Development

```bash
npm run dev              # Start dev server
npm run dev -- --host    # Expose to network
npm run dev -- --port 5173  # Custom port
```

### Production

```bash
npm run build            # Full production build
npm run preview          # Preview production build
npm run analyze          # Analyze bundle size
```

### Quality Checks

```bash
npm run lint             # Check for errors
npm run lint:fix         # Fix auto-fixable errors
npm run type-check       # TypeScript validation
npm run format           # Format code
```

## 📚 Additional Configuration Files

- `.editorconfig` - Editor settings
- `.gitignore` - Git ignore rules
- `postcss.config.js` - PostCSS plugins (autoprefixer)
- `tsconfig.node.json` - Node TypeScript config

---

**Last Updated**: October 12, 2024  
**Build System**: Vite 4.5  
**Target**: ES2015  
**Node Version**: 18+

