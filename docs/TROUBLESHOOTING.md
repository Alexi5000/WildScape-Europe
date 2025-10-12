# Troubleshooting Guide

Common issues and their solutions for WildScape Europe.

## 🔧 Installation Issues

### Node Version Mismatch

**Problem**: Error about Node version incompatibility

**Solution**:
```bash
# Check your Node version
node --version

# Should be 18.0.0 or higher
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use correct Node version
nvm install 18
nvm use 18
```

### Package Installation Fails

**Problem**: `npm install` fails with errors

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Or use pnpm (faster)
npm install -g pnpm
pnpm install
```

### Module Not Found

**Problem**: Error: Cannot find module 'xyz'

**Solution**:
```bash
# Reinstall dependencies
npm install

# If still failing, check if package is in package.json
npm install xyz --save

# Clear Vite cache
rm -rf node_modules/.vite
```

## 🚀 Development Server Issues

### Port Already in Use

**Problem**: Error: Port 3000 is already in use

**Solution**:
```bash
# Find and kill process on port 3000
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- --port 5173
```

### Hot Reload Not Working

**Problem**: Changes not reflecting in browser

**Solution**:
```bash
# 1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

# 2. Restart dev server
# Stop server (Ctrl+C) and restart
npm run dev

# 3. Check file watching limits (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Slow Development Server

**Problem**: Dev server is very slow

**Solution**:
```bash
# 1. Exclude large directories from watching
# Add to vite.config.ts
server: {
  watch: {
    ignored: ['**/node_modules/**', '**/dist/**']
  }
}

# 2. Use pnpm instead of npm (faster)
npm install -g pnpm
pnpm install

# 3. Clear Vite cache
rm -rf node_modules/.vite
```

## 🎨 Styling Issues

### Tailwind Classes Not Working

**Problem**: Tailwind CSS classes have no effect

**Solution**:
```bash
# 1. Check if PostCSS is configured
# Verify postcss.config.js exists

# 2. Restart dev server
npm run dev

# 3. Check tailwind.config.ts includes all content paths
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]

# 4. Clear cache
rm -rf node_modules/.vite
```

### Dark Mode Not Working

**Problem**: Dark mode toggle has no effect

**Solution**:
```typescript
// Check tailwind.config.ts has darkMode enabled
export default {
  darkMode: 'class', // or 'media'
  // ...
}

// Ensure dark class is added to html element
document.documentElement.classList.toggle('dark');
```

## 🗺️ Map & 3D Issues

### Mapbox Map Not Loading

**Problem**: Map shows blank or error

**Solution**:
```bash
# 1. Check if Mapbox token is set
echo $VITE_MAPBOX_TOKEN

# 2. Verify token in .env file
VITE_MAPBOX_TOKEN=pk.your_actual_token_here

# 3. Restart dev server after adding .env
npm run dev

# 4. Check token permissions on Mapbox dashboard
# Token needs: styles:read, fonts:read, tiles:read

# 5. Application works without token (uses mock data)
```

### Three.js WebGL Errors

**Problem**: WebGL errors or black screen in 3D views

**Solution**:
```javascript
// 1. Check WebGL support
// Open browser console and run:
!!document.createElement('canvas').getContext('webgl2')

// 2. Update graphics drivers

// 3. Try different browser (Chrome recommended)

// 4. Disable hardware acceleration and re-enable
// Chrome: Settings > System > Hardware acceleration

// 5. Check for WebGL context loss
canvas.addEventListener('webglcontextlost', (event) => {
  event.preventDefault();
  // Reload page or reinitialize
});
```

### Performance Issues with 3D/Particles

**Problem**: Slow performance, low FPS

**Solution**:
```typescript
// 1. Reduce particle count
const PARTICLE_COUNT = isMobile ? 500 : 1000;

// 2. Disable expensive effects on mobile
const ENABLE_AURORA = !isMobile;
const ENABLE_3D_TERRAIN = !isMobile;

// 3. Use performance monitor
import Stats from 'three/examples/jsm/libs/stats.module';

// 4. Enable LOD (Level of Detail)
// Reduce complexity based on distance

// 5. Check in Chrome DevTools
// Performance tab > Record > Look for long tasks
```

## 📦 Build Issues

### Build Fails with Type Errors

**Problem**: `npm run build` fails with TypeScript errors

**Solution**:
```bash
# 1. Run type checking separately to see errors
npm run type-check

# 2. Fix type errors shown

# 3. Ensure tsconfig.json is correct
# Check "strict": true and paths

# 4. Clear TypeScript cache
rm -rf node_modules/.cache
```

### Build Fails - Out of Memory

**Problem**: JavaScript heap out of memory

**Solution**:
```bash
# Increase Node memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Or add to package.json scripts:
"build": "NODE_OPTIONS='--max-old-space-size=4096' vite build"

# On Windows:
set NODE_OPTIONS=--max-old-space-size=4096 && npm run build
```

### Large Bundle Size

**Problem**: Build output is too large (>1MB)

**Solution**:
```bash
# 1. Analyze bundle
npm run analyze

# 2. Identify large dependencies
npx vite-bundle-visualizer

# 3. Implement code splitting
const Component = lazy(() => import('./Component'));

# 4. Use dynamic imports
import('three').then(THREE => {
  // Use Three.js only when needed
});

# 5. Optimize images
# Convert to WebP, use appropriate sizes
```

## 🌐 Deployment Issues

### Environment Variables Not Working

**Problem**: Env vars undefined in production

**Solution**:
```bash
# 1. Ensure variables are prefixed with VITE_
VITE_API_URL=https://api.example.com

# 2. Set on deployment platform
# Vercel: Project Settings > Environment Variables
# Netlify: Site Settings > Build & deploy > Environment

# 3. Rebuild after adding variables

# 4. Don't use process.env in client code
# Use import.meta.env.VITE_API_URL instead
```

### 404 on Page Refresh (SPA)

**Problem**: Direct URLs or refresh returns 404

**Solution**:
```javascript
// Vercel - vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}

// Netlify - netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

// Apache - .htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Assets Not Loading in Production

**Problem**: Images or fonts don't load after deployment

**Solution**:
```typescript
// 1. Use correct base path in vite.config.ts
export default defineConfig({
  base: '/', // Or '/your-repo-name/' for GitHub Pages
});

// 2. Use absolute paths from public folder
<img src="/images/logo.png" alt="Logo" />

// 3. Or import assets
import logo from './assets/logo.png';
<img src={logo} alt="Logo" />

// 4. Check CORS headers for external assets
```

## 🔒 Security Warnings

### Vulnerable Dependency

**Problem**: `npm audit` shows vulnerabilities

**Solution**:
```bash
# 1. Check severity
npm audit

# 2. Auto-fix if possible
npm audit fix

# 3. Force update (be careful)
npm audit fix --force

# 4. Update specific package
npm update package-name

# 5. Check if vulnerability affects production
# Some dev dependencies may be flagged
```

## 🧪 Testing Issues

### Tests Failing

**Problem**: Unit tests or E2E tests fail

**Solution**:
```bash
# 1. Clear test cache
npm test -- --clearCache

# 2. Run tests in watch mode
npm test -- --watch

# 3. Run specific test
npm test -- ComponentName

# 4. Check test environment
# Ensure jsdom or test environment is configured
```

## 📱 Mobile Issues

### Touch Events Not Working

**Problem**: Interactions don't work on mobile

**Solution**:
```typescript
// Use both mouse and touch events
element.addEventListener('touchstart', handleTouch);
element.addEventListener('mousedown', handleMouse);

// Or use pointer events (unified)
element.addEventListener('pointerdown', handlePointer);

// Prevent default to avoid conflicts
event.preventDefault();
```

### Layout Issues on Mobile

**Problem**: Layout broken on small screens

**Solution**:
```css
/* Use mobile-first approach */
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Test on real devices or Chrome DevTools */
/* Use viewport units carefully */
```

## 🔍 Browser Compatibility

### Features Not Working in Safari

**Problem**: Site doesn't work properly in Safari

**Solution**:
```javascript
// 1. Check caniuse.com for feature support

// 2. Add polyfills if needed
// vite.config.ts
build: {
  target: ['es2015', 'safari11']
}

// 3. Test in Safari or BrowserStack

// 4. Use feature detection
if ('IntersectionObserver' in window) {
  // Use feature
} else {
  // Fallback
}
```

## 💡 General Tips

### Enable Verbose Logging

```bash
# Vite verbose output
npm run dev -- --debug

# More detailed error messages
DEBUG=* npm run dev
```

### Clear All Caches

```bash
# Nuclear option - clears everything
rm -rf node_modules
rm -rf .vite
rm -rf dist
rm package-lock.json
npm cache clean --force
npm install
```

### Check System Resources

```bash
# Check disk space
df -h

# Check memory
free -h

# Monitor processes
htop  # or 'top' on Mac
```

## 📞 Still Having Issues?

1. **Search Issues**: Check [GitHub Issues](https://github.com/Alexi5000/WildScape-Europe/issues)
2. **Ask Community**: Post in [Discussions](https://github.com/Alexi5000/WildScape-Europe/discussions)
3. **Contact Developer**: Alex Cinovoj (TechTideAI)
3. **Check Logs**: Include full error logs when asking for help
4. **Minimal Reproduction**: Create minimal example that reproduces issue

## 📚 Additional Resources

- [Getting Started Guide](./GETTING_STARTED.md)
- [Architecture Guide](./ARCHITECTURE.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Vite Troubleshooting](https://vitejs.dev/guide/troubleshooting.html)
- [React DevTools](https://react.dev/learn/react-developer-tools)

