# WildScape Europe - Project Structure

Clean, organized project structure for easy navigation and maintenance.

## 📁 Root Directory Structure

```
WildScape-Europe/
├── 📄 Configuration Files (Root)
│   ├── package.json              # NPM dependencies and scripts
│   ├── package-lock.json         # NPM lock file
│   ├── tsconfig.json             # TypeScript configuration
│   ├── tsconfig.node.json        # TypeScript config for Node
│   ├── vite.config.ts            # Vite build configuration
│   ├── tailwind.config.ts        # Tailwind CSS configuration
│   ├── .env.example              # Environment variables template
│   ├── .gitignore                # Git ignore rules
│   ├── .editorconfig             # Editor configuration
│   └── index.html                # HTML entry point
│
├── 📚 Documentation
│   ├── README.md                 # Main project documentation
│   ├── CHANGELOG.md              # Version history
│   ├── LICENSE                   # MIT License
│   ├── CONTRIBUTING.md           # Contribution guidelines
│   └── docs/                     # Detailed documentation
│       ├── README.md             # Documentation index
│       ├── GETTING_STARTED.md    # Setup guide
│       ├── ARCHITECTURE.md       # System architecture
│       ├── API.md                # API documentation
│       ├── DEPLOYMENT.md         # Deployment guide
│       ├── TROUBLESHOOTING.md    # Common issues
│       └── LANDING_PAGE_BUILD.md # Landing page specs
│
├── 🚀 Deployment
│   └── deployment/               # DevOps configuration
│       ├── README.md             # Deployment docs
│       ├── Dockerfile            # Docker configuration
│       ├── docker-compose.yml    # Docker Compose setup
│       ├── nginx.conf            # Nginx configuration
│       └── Makefile              # Build automation
│
├── 🛠️ Scripts
│   └── scripts/                  # Utility scripts
│       ├── check-env.sh          # Environment checker
│       └── setup-wsl.sh          # WSL setup script
│
├── 🌐 Public Assets
│   └── public/                   # Static public files
│       ├── robots.txt            # SEO crawler rules
│       ├── sitemap.xml           # SEO sitemap
│       ├── humans.txt            # Credits file
│       └── manifest.json         # PWA manifest
│
└── 💻 Source Code
    └── src/                      # Application source
        ├── App.tsx               # Main app component
        ├── main.tsx              # Entry point
        ├── index.css             # Global styles
        ├── fonts.css             # Font imports
        │
        ├── components/           # React components
        │   ├── Landing/          # Landing page components
        │   ├── Hero/             # Hero section components
        │   ├── Map/              # 3D map components
        │   ├── Search/           # Search components
        │   ├── Campsite/         # Campsite components
        │   ├── Background/       # Background effects
        │   ├── UI/               # Reusable UI components
        │   ├── Audio/            # Audio components
        │   ├── Dashboard/        # Dashboard components
        │   ├── Interactive/      # Interactive elements
        │   ├── Content/          # Content components
        │   └── Layout/           # Layout components
        │
        ├── hooks/                # Custom React hooks
        │   ├── useMapbox.ts
        │   ├── useSearch.ts
        │   ├── useWeather.ts
        │   ├── useThree.ts
        │   ├── useRealTime.ts
        │   └── useSmoothScroll.ts
        │
        ├── services/             # API and external services
        │   ├── api.ts
        │   ├── enhancedApi.ts
        │   ├── mapbox.ts
        │   ├── weather.ts
        │   ├── mockBackend.ts
        │   └── realTimeService.ts
        │
        ├── store/                # State management (Zustand)
        │   ├── campsiteStore.ts
        │   ├── searchStore.ts
        │   └── uiStore.ts
        │
        ├── types/                # TypeScript type definitions
        │   ├── campsite.ts
        │   ├── map.ts
        │   └── weather.ts
        │
        ├── data/                 # Static data files
        │   ├── europeCampsites.json
        │   ├── amenities.json
        │   └── weatherData.json
        │
        └── styles/               # Additional styles
            └── accessibility.css
```

## 📋 File Organization Principles

### Root Level
- **Configuration files** remain in root (required by tools)
- **Main documentation** (README, CHANGELOG, LICENSE)
- **Single .env.example** for environment setup

### Organized Folders

#### `/docs` - All Documentation
- Comprehensive guides
- API documentation
- Architecture diagrams
- Deployment instructions
- Troubleshooting guides

#### `/deployment` - DevOps Files
- Docker configurations
- Nginx setup
- Build automation
- CI/CD configs
- Deployment scripts

#### `/scripts` - Utility Scripts
- Environment setup
- Build helpers
- Testing utilities
- Development tools

#### `/public` - Static Assets
- SEO files (robots.txt, sitemap.xml)
- PWA manifest
- Static images
- Favicon

#### `/src` - Application Code
Organized by feature/domain:
- **components/** - React components by feature
- **hooks/** - Custom React hooks
- **services/** - API and external integrations
- **store/** - State management
- **types/** - TypeScript definitions
- **data/** - Static data
- **styles/** - Global styles

## 🎯 Benefits of This Structure

### Clarity
- Easy to find files
- Logical grouping
- Clear separation of concerns

### Maintainability
- Related files together
- Easy to update
- Simple to refactor

### Scalability
- Room to grow
- Clear patterns
- Consistent organization

### Developer Experience
- Quick navigation
- Predictable locations
- Self-documenting structure

## 🔍 Finding Files

### Need to...
- **Configure build?** → Root config files (vite.config.ts, tsconfig.json)
- **Read docs?** → `/docs` folder
- **Deploy app?** → `/deployment` folder
- **Run scripts?** → `/scripts` folder
- **Edit code?** → `/src` folder
- **Update SEO?** → `/public` folder

## 📝 Naming Conventions

### Files
- **Components**: PascalCase (`MountainHero.tsx`)
- **Hooks**: camelCase with `use` prefix (`useSearch.ts`)
- **Services**: camelCase (`api.ts`)
- **Types**: camelCase (`campsite.ts`)
- **Docs**: UPPERCASE with hyphens (`GETTING-STARTED.md`)
- **Config**: lowercase with dots (`vite.config.ts`)

### Folders
- **Components**: PascalCase (`Landing/`, `Hero/`)
- **Utilities**: lowercase (`hooks/`, `services/`)
- **Root folders**: lowercase (`docs/`, `deployment/`)

## 🚫 What NOT to Put in Root

- ❌ Temporary files
- ❌ Build artifacts
- ❌ IDE-specific files (use .gitignore)
- ❌ Personal notes
- ❌ Test data
- ❌ Random scripts (use /scripts)
- ❌ Documentation files (use /docs)
- ❌ Deployment configs (use /deployment)

## ✅ What CAN Stay in Root

- ✅ package.json (required)
- ✅ tsconfig.json (required)
- ✅ vite.config.ts (required)
- ✅ tailwind.config.ts (required)
- ✅ index.html (required by Vite)
- ✅ .env.example (convention)
- ✅ .gitignore (convention)
- ✅ .editorconfig (convention)
- ✅ README.md (convention)
- ✅ CHANGELOG.md (convention)
- ✅ LICENSE (convention)

## 🔄 Migration Complete

All loose files have been organized:
- ✅ Dockerfile → deployment/
- ✅ docker-compose.yml → deployment/
- ✅ nginx.conf → deployment/
- ✅ Makefile → deployment/
- ✅ LANDING_PAGE_BUILD.md → docs/
- ✅ env.example → .env.example (renamed)

## 📊 Structure Statistics

- **Total folders**: 20+
- **Configuration files in root**: 8 (essential only)
- **Documentation files**: 8 (organized in /docs)
- **Deployment files**: 4 (organized in /deployment)
- **Source files**: 50+ (organized in /src)

---

**Status**: ✅ Project structure cleaned and organized  
**Date**: October 12, 2024  
**Maintainer**: WildScape Europe Team

