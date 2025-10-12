# Deployment Guide

This guide covers deploying WildScape Europe to various hosting platforms and production best practices.

## 🎯 Pre-Deployment Checklist

Before deploying to production:

- [ ] Run production build locally: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Run linting: `npm run lint`
- [ ] Type checking: `npm run type-check`
- [ ] Optimize images and assets
- [ ] Set up environment variables
- [ ] Configure analytics (optional)
- [ ] Test on multiple browsers and devices
- [ ] Review bundle size: `npm run analyze`
- [ ] Update `robots.txt` and `sitemap.xml`
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure CDN for static assets

## 🏗️ Building for Production

### Production Build

```bash
# Install dependencies
npm install

# Create production build
npm run build

# Output will be in the 'dist' folder
```

### Build Configuration

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation': ['framer-motion', 'gsap'],
          'map': ['mapbox-gl']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

### Environment Variables for Production

```bash
# .env.production
VITE_API_BASE_URL=https://api.wildscape-europe.com
VITE_MAPBOX_TOKEN=pk.your_production_token
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_ENABLE_SERVICE_WORKER=true
VITE_ENABLE_3D_TERRAIN=true
VITE_ENABLE_WEATHER_PARTICLES=true
```

## ☁️ Deployment Platforms

### Vercel (Recommended)

**Why Vercel?**
- Zero-config deployment
- Automatic HTTPS
- Edge network (CDN)
- Preview deployments for PRs
- Serverless functions support

**Deployment Steps:**

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
# First deployment
vercel

# Production deployment
vercel --prod
```

4. **Configure via Dashboard**
- Go to [vercel.com](https://vercel.com)
- Import repository
- Configure environment variables
- Deploy automatically on push

**vercel.json Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "routes": [
    {
      "src": "/assets/(.*)",
      "headers": { "cache-control": "public, max-age=31536000, immutable" }
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_MAPBOX_TOKEN": "@mapbox-token",
    "VITE_GA_TRACKING_ID": "@ga-tracking-id"
  }
}
```

### Netlify

**Deployment Steps:**

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build and Deploy**
```bash
netlify deploy --prod
```

**netlify.toml Configuration:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### GitHub Pages

**Deployment Steps:**

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Add Deploy Script**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. **Configure Base Path**
```typescript
// vite.config.ts
export default defineConfig({
  base: '/wildscape-europe/',  // Your repo name
  // ... other config
});
```

4. **Deploy**
```bash
npm run deploy
```

### AWS S3 + CloudFront

**Architecture:**
- S3: Static file hosting
- CloudFront: CDN distribution
- Route 53: DNS management
- Certificate Manager: SSL certificate

**Deployment Steps:**

1. **Build Application**
```bash
npm run build
```

2. **Create S3 Bucket**
```bash
aws s3 mb s3://wildscape-europe
```

3. **Configure Bucket for Static Hosting**
```bash
aws s3 website s3://wildscape-europe --index-document index.html --error-document index.html
```

4. **Upload Files**
```bash
aws s3 sync dist/ s3://wildscape-europe --delete
```

5. **Create CloudFront Distribution**
```bash
aws cloudfront create-distribution --origin-domain-name wildscape-europe.s3.amazonaws.com
```

6. **Set Cache Headers**
```json
{
  "CacheBehaviors": [
    {
      "PathPattern": "/assets/*",
      "DefaultTTL": 31536000,
      "MaxTTL": 31536000,
      "MinTTL": 31536000
    }
  ]
}
```

### Docker Deployment

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Build and Run:**
```bash
# Build image
docker build -t wildscape-europe .

# Run container
docker run -p 80:80 wildscape-europe

# Docker Compose
docker-compose up -d
```

## 🔧 Performance Optimization

### Asset Optimization

```bash
# Optimize images
npm install --save-dev imagemin imagemin-webp

# Generate WebP versions
for file in public/images/*.jpg; do
  cwebp -q 80 "$file" -o "${file%.jpg}.webp"
done
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run analyze

# Review and optimize large chunks
# Consider lazy loading or code splitting
```

### Service Worker (PWA)

```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'WildScape Europe',
        short_name: 'WildScape',
        description: 'Premium camping discovery platform',
        theme_color: '#059669',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

## 🔒 Security Headers

### Vercel Configuration

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=(self)"
        }
      ]
    }
  ]
}
```

## 📊 Monitoring & Analytics

### Google Analytics

```typescript
// src/utils/analytics.ts
export const initAnalytics = () => {
  const gaId = import.meta.env.VITE_GA_TRACKING_ID;
  
  if (gaId) {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', gaId);
  }
};
```

### Error Tracking with Sentry

```bash
npm install @sentry/react
```

```typescript
// src/main.tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

## 🌍 CDN Configuration

### Cloudflare

1. Add site to Cloudflare
2. Update DNS records
3. Enable Auto-Minify (JS, CSS, HTML)
4. Enable Brotli compression
5. Configure page rules for caching

### Cache Strategy

```
/assets/*        → Cache for 1 year
*.js, *.css      → Cache for 1 year
*.woff2, *.woff  → Cache for 1 year
index.html       → Cache for 5 minutes, revalidate
```

## 🔄 Continuous Deployment

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
        env:
          VITE_MAPBOX_TOKEN: ${{ secrets.VITE_MAPBOX_TOKEN }}
          VITE_GA_TRACKING_ID: ${{ secrets.VITE_GA_TRACKING_ID }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## 🧪 Preview Deployments

### Vercel Preview URLs

- Every PR gets a unique preview URL
- Automatically deployed on push
- Perfect for testing before merging

### Manual Preview

```bash
# Deploy preview
vercel

# Share preview URL with team
```

## 📈 Post-Deployment

### Verification Checklist

- [ ] Site loads correctly (all pages)
- [ ] No console errors
- [ ] Images load properly
- [ ] 3D effects work
- [ ] Map displays correctly
- [ ] Search functionality works
- [ ] Forms submit successfully
- [ ] Mobile responsive
- [ ] Performance metrics acceptable
- [ ] SSL certificate valid
- [ ] Analytics tracking
- [ ] Error monitoring active

### Performance Testing

```bash
# Lighthouse CI
npm install -g @lhci/cli

lhci autorun --collect.url=https://wildscape-europe.com
```

### Load Testing

```bash
# Using Artillery
npm install -g artillery

artillery quick --count 100 --num 20 https://wildscape-europe.com
```

## 🆘 Rollback Strategy

### Vercel Rollback

```bash
# List deployments
vercel ls

# Promote previous deployment
vercel promote <deployment-url>
```

### Manual Rollback

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or checkout previous version
git checkout <previous-commit>
git push origin main --force
```

## 📚 Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

## 🎯 Support

For deployment issues:
- Check [GitHub Issues](https://github.com/yourusername/wildscape-europe/issues)
- Review [Troubleshooting Guide](./GETTING_STARTED.md#-troubleshooting)
- Contact DevOps team

