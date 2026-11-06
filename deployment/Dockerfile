# WildScape Europe - Production Dockerfile
# Multi-stage build for optimized production image
#
# Build from the repository root (the build context must contain package.json and src/):
#   docker build -f deployment/Dockerfile --target production -t wildscape-europe .

# Stage 1: Build
FROM node:22-alpine AS builder

LABEL maintainer="WildScape Europe <support@wildscape-europe.com>"
LABEL description="Premium camping discovery platform with 3D terrain visualization"

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies: the build (tsc && vite build) needs devDependencies.
# Only the static dist/ output is copied into the production image.
RUN npm ci --ignore-scripts && \
    npm cache clean --force

# Copy source code
COPY . .

# Build application
RUN npm run build

# Stage 2: Production
FROM nginx:alpine AS production

# Copy custom nginx config
COPY deployment/nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# Stage 3: Development
FROM node:22-alpine AS development

WORKDIR /app

# Install development dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Expose development port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

