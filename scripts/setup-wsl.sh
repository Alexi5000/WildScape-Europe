#!/bin/bash
# WildScape Europe - WSL Setup Script
# Sets up the complete development environment in WSL

set -e  # Exit on error

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}  WildScape Europe - WSL Setup${NC}"
echo -e "${CYAN}═══════════════════════════════════════════${NC}\n"

# Check if running in WSL
if ! grep -qi microsoft /proc/version 2>/dev/null; then
    echo -e "${RED}✗ This script must be run in WSL${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Running in WSL${NC}\n"

# Update system
echo -e "${CYAN}Updating system packages...${NC}"
sudo apt-get update -qq
echo -e "${GREEN}✓ System updated${NC}\n"

# Install Node.js using nvm (if not already installed)
if ! command -v node &> /dev/null; then
    echo -e "${CYAN}Installing Node.js via nvm...${NC}"
    
    # Install nvm
    if [ ! -d "$HOME/.nvm" ]; then
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
        
        # Load nvm
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    fi
    
    # Install Node.js LTS
    nvm install --lts
    nvm use --lts
    
    echo -e "${GREEN}✓ Node.js installed: $(node --version)${NC}"
else
    echo -e "${GREEN}✓ Node.js already installed: $(node --version)${NC}"
fi

# Install essential build tools
echo -e "\n${CYAN}Installing build essentials...${NC}"
sudo apt-get install -y build-essential git curl wget unzip

echo -e "${GREEN}✓ Build tools installed${NC}\n"

# Install npm packages
echo -e "${CYAN}Installing npm dependencies...${NC}"
if [ -f "package.json" ]; then
    npm install
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠ No package.json found${NC}"
fi

# Create .env file if it doesn't exist
echo -e "\n${CYAN}Checking environment configuration...${NC}"
if [ ! -f ".env" ]; then
    if [ -f "env.example" ]; then
        cp env.example .env
        echo -e "${YELLOW}⚠ Created .env file from env.example${NC}"
        echo -e "${YELLOW}  Please configure your environment variables${NC}"
    else
        echo -e "${RED}✗ No env.example file found${NC}"
    fi
else
    echo -e "${GREEN}✓ .env file exists${NC}"
fi

# Fix permissions
echo -e "\n${CYAN}Fixing file permissions...${NC}"
find . -type f -name "*.sh" -exec chmod +x {} \;
echo -e "${GREEN}✓ Permissions fixed${NC}"

# Git configuration check
echo -e "\n${CYAN}Checking Git configuration...${NC}"
if [ -z "$(git config user.name)" ]; then
    echo -e "${YELLOW}⚠ Git user.name not set${NC}"
    echo -e "  Run: git config --global user.name \"Your Name\""
fi
if [ -z "$(git config user.email)" ]; then
    echo -e "${YELLOW}⚠ Git user.email not set${NC}"
    echo -e "  Run: git config --global user.email \"your.email@example.com\""
fi

# Check for required tools
echo -e "\n${CYAN}Verifying installed tools...${NC}"
TOOLS=("node" "npm" "git" "curl" "make")
for tool in "${TOOLS[@]}"; do
    if command -v $tool &> /dev/null; then
        VERSION=$($tool --version 2>/dev/null | head -1)
        echo -e "${GREEN}✓${NC} $tool: $VERSION"
    else
        echo -e "${RED}✗${NC} $tool: not found"
    fi
done

# Display system info
echo -e "\n${CYAN}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}  System Information${NC}"
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo -e "WSL Version: $(cat /proc/version | grep -o 'WSL[0-9]*' || echo 'WSL1')"
echo -e "Distribution: $(cat /etc/os-release | grep PRETTY_NAME | cut -d= -f2 | tr -d '\"')"
echo -e "Kernel: $(uname -r)"
echo -e "Node: $(node --version)"
echo -e "NPM: $(npm --version)"
echo -e "Git: $(git --version | awk '{print $3}')"

# Final message
echo -e "\n${CYAN}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}  Setup Complete!${NC}"
echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo -e "\n${GREEN}Next steps:${NC}"
echo -e "  1. Configure your .env file"
echo -e "  2. Run: ${CYAN}make dev${NC} to start development server"
echo -e "  3. Run: ${CYAN}make help${NC} to see all available commands"
echo -e "\n${GREEN}Happy coding! 🚀${NC}\n"

