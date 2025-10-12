# Getting Started with WildScape Europe

This guide will help you set up and run WildScape Europe on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **pnpm** (v8.0.0 or higher)
- **Git** for version control
- A modern code editor (VS Code recommended)

### Checking Your Installation

```bash
node --version   # Should be v18.0.0+
npm --version    # Should be v9.0.0+
git --version    # Any recent version
```

## 🚀 Installation

### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/Alexi5000/WildScape-Europe.git

# Or using SSH
git clone git@github.com:Alexi5000/WildScape-Europe.git

# Navigate to project directory
cd WildScape-Europe
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using pnpm (faster)
pnpm install

# Or using yarn
yarn install
```

### 3. Environment Configuration (Optional)

The application works with mock data out of the box, but you can configure additional features:

```bash
# Copy environment template
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
# For enhanced map features
VITE_MAPBOX_TOKEN=your_mapbox_token_here

# For analytics (optional)
VITE_GA_TRACKING_ID=your_ga_id
```

**Getting a Mapbox Token** (Optional):
1. Sign up at [mapbox.com](https://account.mapbox.com/auth/signup/)
2. Go to [Access Tokens](https://account.mapbox.com/access-tokens/)
3. Copy your default public token or create a new one
4. Add it to your `.env` file

### 4. Start Development Server

```bash
npm run dev
```

The application will open at `http://localhost:3000`

## 🎯 First Run

When you first launch the application:

1. **Landing Page**: You'll see the hero section with aurora effects
2. **Scroll Down**: Explore the parallax forest scenes
3. **Search**: Click the search bar to find campsites
4. **Filter**: Use filters to refine your search
5. **Map**: Click on markers to view campsite details
6. **Booking**: Select dates and proceed with booking

## 🛠️ Development Tools

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Type checking
npm run type-check

# Format code
npm run format

# Analyze bundle size
npm run analyze
```

### Recommended VS Code Extensions

- **ESLint** - Real-time linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Autocomplete for Tailwind
- **TypeScript Vue Plugin (Volar)** - Enhanced TypeScript support

### VS Code Settings

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## 📁 Project Structure

```
wildscape-europe/
├── src/
│   ├── components/        # React components
│   │   ├── Hero/         # Landing page components
│   │   ├── Map/          # 3D map and terrain
│   │   ├── Background/   # Visual effects
│   │   ├── Search/       # Search and filters
│   │   ├── Campsite/     # Campsite details
│   │   └── UI/           # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   ├── store/            # State management (Zustand)
│   ├── data/             # Mock data
│   ├── types/            # TypeScript types
│   ├── styles/           # Global styles
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── docs/                 # Documentation
├── .env.example          # Environment template
├── package.json          # Dependencies
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## 🔧 Configuration

### Vite Configuration

Key settings in `vite.config.ts`:

- **Port**: 3000 (development), 4173 (preview)
- **Hot Module Replacement**: Enabled
- **Build Target**: ES2015
- **Minification**: Terser (with console/debugger removal)
- **Manual Chunks**: React, Three.js, Mapbox, Animations, UI libraries
- **Alias**: `@/` points to `src/`
- **Host**: Exposed for network access

### Tailwind Configuration

Customization in `tailwind.config.ts`:

- **Custom Colors**: Forest theme (50-950 scale), earth tones, nature colors
- **Custom Fonts**: Inter (sans), Poppins (display), JetBrains Mono (mono)
- **Custom Animations**: Forest sway, leaf fall, mist float, aurora, glow, morph
- **Dark Mode**: Class-based strategy
- **Custom Utilities**: Glass-forest, backdrop-forest, scrollbar-forest, text-shadow
- **Custom Shadows**: Forest-themed box shadows
- **Breakpoints**: xs (475px), 3xl (1600px) in addition to defaults

## 🌐 Browser Support

WildScape Europe supports:

- **Chrome/Edge**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Mobile**: iOS Safari 14+, Chrome Android latest

### Feature Detection

The app gracefully degrades for older browsers:
- 3D effects disabled if WebGL not supported
- Simplified animations for lower-end devices
- Fallback for custom CSS properties

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- --port 5173
```

### Module Not Found Errors

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Type Errors

```bash
# Regenerate types
npm run type-check
```

### Mapbox Not Loading

- Check if `VITE_MAPBOX_TOKEN` is set correctly
- Verify token has correct permissions
- Check browser console for specific errors
- The app works with mock data if token is missing

## 📚 Next Steps

Now that you have the project running:

1. Read the [Architecture Guide](./ARCHITECTURE.md) to understand the codebase
2. Check the [API Documentation](./API.md) for service integration
3. Review [Contributing Guidelines](../CONTRIBUTING.md) before making changes
4. Explore [Deployment Guide](./DEPLOYMENT.md) for production deployment

## 💡 Tips

- **Hot Reload**: Changes auto-refresh in development
- **Fast Refresh**: React state preserved across updates
- **Source Maps**: Full debugging support in browser DevTools
- **Performance**: Use React DevTools Profiler to identify bottlenecks

## ❓ Need Help?

- Check [Troubleshooting Section](#-troubleshooting)
- Review [API Documentation](./API.md)
- Open an [Issue](https://github.com/Alexi5000/WildScape-Europe/issues)
- Join our [Discussions](https://github.com/Alexi5000/WildScape-Europe/discussions)
- Contact: Alex Cinovoj (TechTideAI)

Happy coding! 🏕️🌲

