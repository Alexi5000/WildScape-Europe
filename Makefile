# WildScape Europe - Development Makefile
# For use with WSL, Linux, or macOS

.PHONY: help install dev build preview test lint format clean docker-up docker-down setup-wsl

# Default target
.DEFAULT_GOAL := help

# Colors for output
CYAN := \033[0;36m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

##@ General

help: ## Display this help message
	@echo "$(CYAN)═══════════════════════════════════════════$(NC)"
	@echo "$(GREEN)  WildScape Europe - Development Commands$(NC)"
	@echo "$(CYAN)═══════════════════════════════════════════$(NC)"
	@awk 'BEGIN {FS = ":.*##"; printf "\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  $(CYAN)%-15s$(NC) %s\n", $$1, $$2 } /^##@/ { printf "\n$(YELLOW)%s$(NC)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
	@echo ""

##@ Setup & Installation

install: ## Install dependencies
	@echo "$(GREEN)Installing dependencies...$(NC)"
	npm install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

setup-wsl: ## Setup WSL development environment
	@echo "$(GREEN)Setting up WSL environment...$(NC)"
	@bash scripts/setup-wsl.sh
	@echo "$(GREEN)✓ WSL setup complete$(NC)"

setup: install ## Initial project setup
	@echo "$(GREEN)Running initial setup...$(NC)"
	@if [ ! -f .env ]; then \
		cp env.example .env; \
		echo "$(YELLOW)⚠ Created .env file - please configure it$(NC)"; \
	fi
	@echo "$(GREEN)✓ Setup complete$(NC)"

##@ Development

dev: ## Start development server
	@echo "$(GREEN)Starting development server...$(NC)"
	npm run dev

build: ## Build for production
	@echo "$(GREEN)Building for production...$(NC)"
	npm run build
	@echo "$(GREEN)✓ Build complete$(NC)"

preview: build ## Preview production build
	@echo "$(GREEN)Starting preview server...$(NC)"
	npm run preview

watch: ## Watch mode for development
	@echo "$(GREEN)Starting watch mode...$(NC)"
	npm run dev -- --watch

##@ Code Quality

lint: ## Run ESLint
	@echo "$(GREEN)Running linter...$(NC)"
	npm run lint

lint-fix: ## Fix linting issues
	@echo "$(GREEN)Fixing linting issues...$(NC)"
	npm run lint:fix
	@echo "$(GREEN)✓ Linting complete$(NC)"

format: ## Format code with Prettier
	@echo "$(GREEN)Formatting code...$(NC)"
	npm run format
	@echo "$(GREEN)✓ Code formatted$(NC)"

type-check: ## Run TypeScript type checking
	@echo "$(GREEN)Checking types...$(NC)"
	npm run type-check
	@echo "$(GREEN)✓ Type check complete$(NC)"

validate: lint type-check ## Run all validation (lint + type-check)
	@echo "$(GREEN)✓ All validation passed$(NC)"

##@ Testing

test: ## Run tests
	@echo "$(GREEN)Running tests...$(NC)"
	@if grep -q "\"test\":" package.json; then \
		npm test; \
	else \
		echo "$(YELLOW)⚠ No tests configured yet$(NC)"; \
	fi

test-watch: ## Run tests in watch mode
	@echo "$(GREEN)Running tests in watch mode...$(NC)"
	@if grep -q "\"test:watch\":" package.json; then \
		npm run test:watch; \
	else \
		echo "$(YELLOW)⚠ No test:watch script configured$(NC)"; \
	fi

test-coverage: ## Run tests with coverage
	@echo "$(GREEN)Running tests with coverage...$(NC)"
	@if grep -q "\"test:coverage\":" package.json; then \
		npm run test:coverage; \
	else \
		echo "$(YELLOW)⚠ No test:coverage script configured$(NC)"; \
	fi

##@ Analysis

analyze: ## Analyze bundle size
	@echo "$(GREEN)Analyzing bundle size...$(NC)"
	npm run analyze

audit: ## Run security audit
	@echo "$(GREEN)Running security audit...$(NC)"
	npm audit
	@echo "$(GREEN)✓ Audit complete$(NC)"

audit-fix: ## Fix security vulnerabilities
	@echo "$(GREEN)Fixing security vulnerabilities...$(NC)"
	npm audit fix
	@echo "$(GREEN)✓ Vulnerabilities fixed$(NC)"

outdated: ## Check for outdated dependencies
	@echo "$(GREEN)Checking for outdated dependencies...$(NC)"
	npm outdated

##@ Cleaning

clean: ## Clean build artifacts and dependencies
	@echo "$(RED)Cleaning build artifacts...$(NC)"
	rm -rf dist
	rm -rf node_modules
	rm -rf .vite
	rm -rf coverage
	@echo "$(GREEN)✓ Clean complete$(NC)"

clean-cache: ## Clean npm cache
	@echo "$(RED)Cleaning npm cache...$(NC)"
	npm cache clean --force
	@echo "$(GREEN)✓ Cache cleaned$(NC)"

reset: clean install ## Reset project (clean + install)
	@echo "$(GREEN)✓ Project reset complete$(NC)"

##@ Docker

docker-build: ## Build Docker image
	@echo "$(GREEN)Building Docker image...$(NC)"
	docker build -t wildscape-europe .
	@echo "$(GREEN)✓ Docker image built$(NC)"

docker-run: ## Run Docker container
	@echo "$(GREEN)Starting Docker container...$(NC)"
	docker run -p 3000:3000 wildscape-europe

docker-up: ## Start Docker Compose services
	@echo "$(GREEN)Starting Docker Compose services...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)✓ Services started$(NC)"

docker-down: ## Stop Docker Compose services
	@echo "$(RED)Stopping Docker Compose services...$(NC)"
	docker-compose down
	@echo "$(GREEN)✓ Services stopped$(NC)"

docker-logs: ## View Docker Compose logs
	docker-compose logs -f

##@ Git Hooks

hooks: ## Install git hooks
	@echo "$(GREEN)Installing git hooks...$(NC)"
	@if [ -d .git ]; then \
		echo "#!/bin/sh\nmake lint-fix\nmake type-check" > .git/hooks/pre-commit; \
		chmod +x .git/hooks/pre-commit; \
		echo "$(GREEN)✓ Git hooks installed$(NC)"; \
	else \
		echo "$(RED)✗ Not a git repository$(NC)"; \
	fi

##@ CI/CD

ci: validate test build ## Run CI pipeline locally
	@echo "$(GREEN)✓ CI pipeline complete$(NC)"

pre-commit: lint-fix type-check ## Run pre-commit checks
	@echo "$(GREEN)✓ Pre-commit checks passed$(NC)"

pre-push: validate test ## Run pre-push checks
	@echo "$(GREEN)✓ Pre-push checks passed$(NC)"

##@ WSL Specific

wsl-check: ## Check WSL environment
	@echo "$(GREEN)Checking WSL environment...$(NC)"
	@if grep -qi microsoft /proc/version 2>/dev/null; then \
		echo "$(GREEN)✓ Running in WSL$(NC)"; \
		echo "WSL Version: $$(cat /proc/version | grep -o 'WSL[0-9]*')"; \
		echo "Node Version: $$(node --version)"; \
		echo "NPM Version: $$(npm --version)"; \
	else \
		echo "$(YELLOW)⚠ Not running in WSL$(NC)"; \
	fi

wsl-fix-permissions: ## Fix WSL file permissions
	@echo "$(GREEN)Fixing WSL permissions...$(NC)"
	find . -type f -name "*.sh" -exec chmod +x {} \;
	@echo "$(GREEN)✓ Permissions fixed$(NC)"

##@ Info

info: ## Display project information
	@echo "$(CYAN)═══════════════════════════════════════════$(NC)"
	@echo "$(GREEN)  WildScape Europe - Project Info$(NC)"
	@echo "$(CYAN)═══════════════════════════════════════════$(NC)"
	@echo "  Project: WildScape Europe"
	@echo "  Version: $$(cat package.json | grep version | head -1 | awk -F: '{ print $$2 }' | sed 's/[\",]//g' | tr -d ' ')"
	@echo "  Node: $$(node --version)"
	@echo "  NPM: $$(npm --version)"
	@echo "  Directory: $$(pwd)"
	@echo "$(CYAN)═══════════════════════════════════════════$(NC)"

version: ## Display version information
	@echo "Node: $$(node --version)"
	@echo "NPM: $$(npm --version)"
	@echo "Git: $$(git --version)"

##@ Quick Commands

all: install build ## Install dependencies and build
	@echo "$(GREEN)✓ All tasks complete$(NC)"

quick: lint-fix build ## Quick build (lint-fix + build)
	@echo "$(GREEN)✓ Quick build complete$(NC)"

ready: validate test build ## Ensure project is ready for commit
	@echo "$(GREEN)✓ Project is ready!$(NC)"

