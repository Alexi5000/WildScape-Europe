# 🏕️ WildScape Europe - Immersive Camping Experience

<div align="center">
  <img src="./public/logo.png" alt="WildScape Logo" width="120" height="120">
  
  **Premium camping discovery platform with 3D terrain visualization and real-time weather effects**
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
  [![Three.js](https://img.shields.io/badge/Three.js-0.160.0-black)](https://threejs.org/)
  [![Mapbox](https://img.shields.io/badge/Mapbox-GL-green)](https://www.mapbox.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-blue)](https://tailwindcss.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

## ✨ Features

- 🗺️ **3D Terrain Mapping** - Interactive elevation maps with Mapbox GL
- 🌧️ **Weather Particles** - Real-time weather visualization systems
- 🌌 **Aurora Effects** - Dynamic northern lights background
- 🌲 **Parallax Forests** - Immersive depth-layered scenes
- 🔍 **Morphing Search** - Fluid, animated search interface
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Performance Optimized** - Smooth 60fps animations
- 🎨 **Premium UI/UX** - Apple-level design aesthetics
- 🌍 **European Focus** - 500+ curated camping locations
- 🏕️ **Virtual Tours** - 360° campsite previews

## 🎯 Live Demo

[🚀 View Live Demo](https://wildscape-europe.vercel.app) | [📱 Mobile Demo](https://wildscape-europe.vercel.app/mobile)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Mapbox API Token (optional for demo)

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/wildscape-camping-europe.git

# Navigate to project directory
cd wildscape-camping-europe

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup (Optional)
```bash
# Copy environment template
cp .env.example .env

# Add your Mapbox token (optional - demo works without it)
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **3D Graphics**: Three.js + React Three Fiber
- **Mapping**: Mapbox GL JS
- **Styling**: Tailwind CSS + Framer Motion
- **Animation**: GSAP + Lenis Smooth Scrolling
- **State Management**: Zustand
- **Build Tool**: Vite with optimized bundling

### Project Structure
```
src/
├── components/          # React components
│   ├── Hero/           # Landing page components
│   ├── Map/            # 3D map and terrain
│   ├── Background/     # Visual effects
│   ├── Search/         # Search and filters
│   ├── Campsite/       # Campsite details
│   └── UI/             # Reusable UI components
├── hooks/              # Custom React hooks
├── services/           # API and external services
├── store/              # Zustand state management
├── data/               # Mock data and configurations
├── types/              # TypeScript type definitions
└── assets/             # Static assets
```

## 🎨 Design System

### Color Palette
```javascript
const colors = {
  primary: '#059669',    // Forest Emerald
  secondary: '#14B8A6',  // Teal Waters  
  accent: '#F97316',     // Sunset Orange
  aurora: '#8B5CF6',     // Aurora Purple
  light: '#F3F4F6',      // Morning Mist
  dark: '#0F172A',       // Night Sky
  forest: '#064E3B',     // Deep Forest
  water: '#0891B2'       // Clear Waters
}
```

### Typography
- **Display Font**: Poppins (headings, hero text)
- **Body Font**: Inter (body text, UI elements)
- **Font Weights**: 300, 400, 500, 600, 700, 800

### Animation Principles
- **Duration**: 0.3s for micro-interactions, 0.8s for page transitions
- **Easing**: Custom cubic-bezier curves for natural motion
- **Performance**: 60fps target with GPU acceleration
- **Accessibility**: Respects `prefers-reduced-motion`

## 🌟 Key Features Deep Dive

### 3D Terrain Visualization
- **Mapbox Integration**: Custom 3D terrain with elevation data
- **Interactive Markers**: Animated campsite markers with hover effects
- **Camera Controls**: Smooth fly-to animations and orbit controls
- **Performance**: Optimized rendering with LOD (Level of Detail)

### Weather Particle Systems
- **Dynamic Effects**: Rain, snow, fog, and clear weather
- **Particle Physics**: Realistic particle behavior and lifecycle
- **Performance**: Efficient particle pooling and culling
- **Responsiveness**: Adaptive particle count based on device capability

### Aurora Background Effects
- **Shader Programming**: Custom GLSL shaders for realistic aurora
- **Color Animation**: Dynamic color transitions and wave patterns
- **Performance**: Optimized fragment shaders with minimal overdraw
- **Accessibility**: Reduced motion support for sensitive users

### Search & Discovery
- **Morphing Interface**: Smooth transitions between search states
- **Smart Suggestions**: Contextual search recommendations
- **Advanced Filters**: Multi-dimensional filtering system
- **Real-time Results**: Instant search with debounced queries

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

### Mobile Optimizations
- Touch-friendly interactions
- Optimized particle counts
- Simplified 3D effects
- Progressive image loading
- Gesture-based navigation

## ⚡ Performance

### Optimization Strategies
- **Code Splitting**: Route-based and component-based splitting
- **Lazy Loading**: Images, 3D models, and non-critical components
- **Asset Optimization**: Compressed textures and optimized models
- **Caching**: Service worker caching for offline capability
- **Bundle Analysis**: Regular bundle size monitoring

### Performance Metrics
- **Lighthouse Score**: 90+ across all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run test         # Run tests
npm run analyze      # Analyze bundle size
```

### Development Guidelines
- **TypeScript**: Strict mode enabled, comprehensive type coverage
- **Code Style**: Prettier + ESLint with custom rules
- **Git Hooks**: Pre-commit hooks for linting and formatting
- **Component Structure**: Functional components with hooks
- **Testing**: Unit tests for utilities, integration tests for components

## 🌍 Data & Content

### Campsite Data
- **Coverage**: 15+ European countries
- **Locations**: 500+ curated camping sites
- **Attributes**: 20+ data points per location
- **Images**: High-quality photography from Pexels
- **Reviews**: Realistic user-generated content

### Weather Integration
- **Mock API**: Realistic weather patterns
- **Seasonal Variations**: Dynamic weather based on location/season
- **Aurora Predictions**: Northern lights probability for Nordic locations
- **Forecast Data**: 7-day weather forecasts

## 🚀 Deployment

### Build Configuration
```bash
# Production build
npm run build

# Preview build locally
npm run preview

# Deploy to Vercel (recommended)
vercel --prod
```

### Environment Variables
```bash
# Optional - for enhanced map features
VITE_MAPBOX_TOKEN=your_mapbox_token

# Analytics (optional)
VITE_GA_TRACKING_ID=your_google_analytics_id
```

### Deployment Platforms
- **Vercel** (Recommended): Zero-config deployment
- **Netlify**: Static site hosting with edge functions
- **GitHub Pages**: Free hosting for open source projects
- **AWS S3 + CloudFront**: Enterprise-grade hosting

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with conventional commits: `git commit -m 'feat: add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code of Conduct
Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Mapbox** for incredible mapping technology
- **Three.js** community for 3D graphics inspiration
- **Pexels** for beautiful camping photography
- **React Three Fiber** for seamless React-Three.js integration
- **Framer Motion** for smooth animations
- **Tailwind CSS** for rapid UI development

## 📞 Support

- **Documentation**: [docs.wildscape-europe.com](https://docs.wildscape-europe.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/wildscape-camping-europe/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/wildscape-camping-europe/discussions)
- **Email**: support@wildscape-europe.com

---

<div align="center">
  <p>Built with ❤️ for outdoor enthusiasts and nature lovers</p>
  <p>
    <a href="https://wildscape-europe.vercel.app">🌲 Explore WildScape Europe</a> •
    <a href="#-features">✨ Features</a> •
    <a href="#-quick-start">🚀 Get Started</a> •
    <a href="#-contributing">🤝 Contribute</a>
  </p>
</div>