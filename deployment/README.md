# Deployment Configuration

This folder contains all deployment and DevOps configuration files for WildScape Europe.

## Files

### Docker
- **Dockerfile** - Docker container configuration
- **docker-compose.yml** - Multi-container Docker setup
- **nginx.conf** - Nginx web server configuration

### Build Tools
- **Makefile** - Build automation scripts

## Quick Start

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t wildscape-europe .
docker run -p 80:80 wildscape-europe
```

### Using Makefile

```bash
# See available commands
make help

# Build for production
make build

# Run tests
make test

# Deploy
make deploy
```

## Environment Variables

Copy `.env.example` from the root directory and configure:

```bash
cp ../.env.example .env
# Edit .env with your configuration
```

## Nginx Configuration

The `nginx.conf` file is configured for:
- SPA routing (all routes to index.html)
- Gzip compression
- Static asset caching
- Security headers

## Production Deployment

See [../docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md) for detailed deployment instructions for various platforms:
- Vercel
- Netlify
- AWS
- Docker
- Kubernetes

## Docker Image Optimization

The Dockerfile uses multi-stage builds:
1. **Builder stage** - Installs dependencies and builds
2. **Production stage** - Nginx serves static files

This results in a lightweight production image (~50MB).

## Health Checks

The container includes health checks:
```bash
docker ps  # Check container status
```

## Troubleshooting

See [../docs/TROUBLESHOOTING.md](../docs/TROUBLESHOOTING.md) for common issues.

## Security

- Never commit `.env` files
- Use secrets management for production
- Keep Docker images updated
- Follow least privilege principle

