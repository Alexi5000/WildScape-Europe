# Architecture Guide

This document provides a comprehensive overview of WildScape Europe's architecture, design patterns, and technical decisions.

## 🏗️ System Overview

WildScape Europe is a modern single-page application (SPA) built with React, focusing on performance, user experience, and maintainability.

### Architecture Principles

1. **Component-Based**: Modular, reusable React components
2. **Type-Safe**: Comprehensive TypeScript coverage
3. **Performance-First**: Optimized rendering and loading
4. **Accessibility**: WCAG 2.1 AA compliant
5. **Mobile-First**: Responsive design for all devices

## 📦 Tech Stack

### Core Technologies

```
┌─────────────────────────────────────┐
│         React 18 + TypeScript       │
├─────────────────────────────────────┤
│  UI Layer                           │
│  - Framer Motion (animations)       │
│  - Tailwind CSS (styling)           │
│  - Lucide React (icons)             │
├─────────────────────────────────────┤
│  3D & Graphics                      │
│  - Three.js (3D engine)             │
│  - React Three Fiber (React)        │
│  - @react-three/drei (helpers)      │
├─────────────────────────────────────┤
│  State Management                   │
│  - Zustand (global state)           │
│  - React Hooks (local state)        │
├─────────────────────────────────────┤
│  Mapping                            │
│  - Mapbox GL JS (maps)              │
├─────────────────────────────────────┤
│  Build & Dev                        │
│  - Vite (build tool)                │
│  - ESLint + Prettier (quality)      │
└─────────────────────────────────────┘
```

### Key Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| React | 18.2.0 | UI framework |
| TypeScript | 5.2.0 | Type safety |
| Vite | 4.5.0 | Build tool |
| Three.js | 0.157.0 | 3D graphics |
| Mapbox GL | 2.15.0 | Interactive maps |
| Framer Motion | 10.16.0 | Animations |
| Zustand | 4.4.0 | State management |
| Tailwind CSS | 3.3.0 | Styling |
| GSAP | 3.12.0 | Advanced animations |

## 🗂️ Project Structure

```
src/
├── components/              # React components (by feature)
│   ├── Hero/               # Landing page
│   │   ├── AuroraBackground.tsx
│   │   ├── EnhancedHeroContent.tsx
│   │   └── FloatingCTA.tsx
│   ├── Map/                # 3D mapping
│   │   ├── Terrain3DMap.tsx
│   │   ├── CampsiteMarkers.tsx
│   │   ├── MapControls.tsx
│   │   └── WeatherParticles.tsx
│   ├── Background/         # Visual effects
│   │   ├── AuroraEffect.tsx
│   │   ├── EnhancedForestParallax.tsx
│   │   └── WeatherSystem.tsx
│   ├── Search/             # Search & filtering
│   │   ├── MorphingSearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   └── SearchResults.tsx
│   ├── Campsite/           # Campsite features
│   │   ├── CampsiteCard.tsx
│   │   ├── CampsiteDetails.tsx
│   │   ├── BookingPanel.tsx
│   │   └── VirtualTour.tsx
│   └── UI/                 # Reusable UI
│       ├── LoadingSpinner.tsx
│       ├── ThemeToggle.tsx
│       ├── NotificationCenter.tsx
│       └── OptimizedImage.tsx
├── hooks/                  # Custom React hooks
│   ├── useMapbox.ts       # Mapbox integration
│   ├── useThree.ts        # Three.js utilities
│   ├── useWeather.ts      # Weather data
│   ├── useSearch.ts       # Search logic
│   └── useRealTime.ts     # Real-time updates
├── services/               # External services & API
│   ├── api.ts             # Main API client
│   ├── enhancedApi.ts     # Enhanced features
│   ├── mapbox.ts          # Mapbox service
│   ├── weather.ts         # Weather service
│   ├── mockBackend.ts     # Mock data
│   └── realTimeService.ts # WebSocket/SSE
├── store/                  # Zustand stores
│   ├── campsiteStore.ts   # Campsite data
│   ├── searchStore.ts     # Search state
│   └── uiStore.ts         # UI state
├── types/                  # TypeScript types
│   ├── campsite.ts        # Campsite types
│   ├── map.ts             # Map types
│   └── weather.ts         # Weather types
├── data/                   # Static data
│   ├── europeCampsites.json
│   ├── amenities.json
│   └── weatherData.json
├── styles/                 # Global styles
│   └── accessibility.css
├── App.tsx                 # Root component
└── main.tsx                # Entry point
```

## 🎯 Design Patterns

### Component Architecture

#### 1. Presentational vs Container Components

**Presentational** (Pure UI):
```typescript
// components/UI/Button.tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {label}
    </button>
  );
};
```

**Container** (Logic + Data):
```typescript
// components/Campsite/CampsiteContainer.tsx
export const CampsiteContainer = ({ id }: { id: string }) => {
  const campsite = useCampsiteStore((state) => state.getCampsite(id));
  const [isLoading, setIsLoading] = useState(false);
  
  // Logic and data fetching
  
  return <CampsiteDetails campsite={campsite} />;
};
```

#### 2. Custom Hooks for Logic Reuse

```typescript
// hooks/useSearch.ts
export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Campsite[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const search = useDebouncedCallback(async (q: string) => {
    setIsSearching(true);
    const data = await searchCampsites(q);
    setResults(data);
    setIsSearching(false);
  }, 300);
  
  return { query, setQuery, results, isSearching, search };
};
```

#### 3. Compound Components

```typescript
// components/Search/SearchBar.tsx
export const SearchBar = ({ children }: { children: ReactNode }) => {
  return <div className="search-bar">{children}</div>;
};

SearchBar.Input = ({ ... }) => { /* ... */ };
SearchBar.Suggestions = ({ ... }) => { /* ... */ };
SearchBar.Filters = ({ ... }) => { /* ... */ };

// Usage
<SearchBar>
  <SearchBar.Input />
  <SearchBar.Suggestions />
  <SearchBar.Filters />
</SearchBar>
```

### State Management

#### Zustand Stores

```typescript
// store/campsiteStore.ts
interface CampsiteStore {
  campsites: Campsite[];
  selectedCampsite: Campsite | null;
  setCampsites: (campsites: Campsite[]) => void;
  selectCampsite: (id: string) => void;
  filters: FilterState;
  updateFilters: (filters: Partial<FilterState>) => void;
}

export const useCampsiteStore = create<CampsiteStore>((set, get) => ({
  campsites: [],
  selectedCampsite: null,
  filters: defaultFilters,
  
  setCampsites: (campsites) => set({ campsites }),
  
  selectCampsite: (id) => {
    const campsite = get().campsites.find(c => c.id === id);
    set({ selectedCampsite: campsite || null });
  },
  
  updateFilters: (filters) => 
    set((state) => ({ 
      filters: { ...state.filters, ...filters } 
    })),
}));
```

#### Local State with useState

```typescript
// For component-specific state
const [isOpen, setIsOpen] = useState(false);
const [selectedDate, setSelectedDate] = useState<Date>(new Date());
```

## 🎨 Styling Architecture

### Tailwind CSS Approach

```typescript
// Utility-first styling
<div className="
  flex items-center justify-between
  px-6 py-4
  bg-white dark:bg-slate-900
  rounded-lg shadow-lg
  hover:shadow-xl transition-shadow
">
  {/* Content */}
</div>
```

### Theme Configuration

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          500: '#059669',
          900: '#064E3B',
        },
        aurora: {
          400: '#a78bfa',
          500: '#8b5cf6',
        }
      },
      animation: {
        'aurora': 'aurora 20s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      }
    }
  }
}
```

## 🚀 Performance Optimizations

### Code Splitting

```typescript
// Lazy loading routes
const CampsiteDetails = lazy(() => import('./components/Campsite/CampsiteDetails'));
const UserDashboard = lazy(() => import('./components/Dashboard/UserDashboard'));

// With Suspense
<Suspense fallback={<LoadingSpinner />}>
  <CampsiteDetails />
</Suspense>
```

### Memoization

```typescript
// useMemo for expensive calculations
const filteredCampsites = useMemo(() => {
  return campsites.filter(site => matchesFilters(site, filters));
}, [campsites, filters]);

// useCallback for function references
const handleSearch = useCallback((query: string) => {
  performSearch(query);
}, []);

// React.memo for components
export const CampsiteCard = React.memo(({ campsite }: Props) => {
  // Component
});
```

### Virtual Scrolling

```typescript
// For large lists
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={campsites.length}
  itemSize={120}
>
  {({ index, style }) => (
    <CampsiteCard campsite={campsites[index]} style={style} />
  )}
</FixedSizeList>
```

## 🗺️ 3D Graphics Architecture

### Three.js Integration

```typescript
// Using React Three Fiber
<Canvas>
  <PerspectiveCamera position={[0, 10, 20]} />
  <ambientLight intensity={0.5} />
  <pointLight position={[10, 10, 10]} />
  <Terrain heightMap={heightMapData} />
  <WeatherParticles type="rain" count={1000} />
</Canvas>
```

### Custom Shaders

```glsl
// Aurora effect shader
uniform float time;
uniform vec3 color1;
uniform vec3 color2;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  float wave = sin(uv.x * 10.0 + time) * 0.5 + 0.5;
  vec3 color = mix(color1, color2, wave);
  gl_FragColor = vec4(color, 0.7);
}
```

## 🔌 API Integration

### Service Layer

```typescript
// services/api.ts
class ApiService {
  private baseURL = import.meta.env.VITE_API_BASE_URL;
  
  async getCampsites(filters?: FilterState): Promise<Campsite[]> {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${this.baseURL}/campsites?${params}`);
    return response.json();
  }
  
  async getCampsite(id: string): Promise<Campsite> {
    const response = await fetch(`${this.baseURL}/campsites/${id}`);
    return response.json();
  }
}

export const api = new ApiService();
```

## 📱 Responsive Design

### Breakpoint Strategy

```typescript
// Mobile-first approach
const breakpoints = {
  sm: '640px',   // Small devices
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px' // Large screens
};
```

### Adaptive Features

- **Mobile**: Simplified 3D, reduced particles, touch gestures
- **Tablet**: Medium detail, optimized layouts
- **Desktop**: Full effects, keyboard shortcuts, multi-panel views

## 🔒 Security Considerations

- **API Keys**: Stored in environment variables
- **Input Validation**: Client-side validation for UX
- **XSS Prevention**: React's built-in escaping
- **CORS**: Configured for specific domains
- **Content Security Policy**: Defined headers

## 📊 Monitoring & Analytics

```typescript
// Performance monitoring
import { reportWebVitals } from './reportWebVitals';

reportWebVitals((metric) => {
  console.log(metric);
  // Send to analytics
});
```

## 🧪 Testing Strategy

- **Unit Tests**: Utilities and pure functions
- **Component Tests**: User interactions
- **Integration Tests**: Feature workflows
- **E2E Tests**: Critical user journeys

## 📚 Further Reading

- [Getting Started Guide](./GETTING_STARTED.md)
- [API Documentation](./API.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Contributing Guidelines](../CONTRIBUTING.md)

