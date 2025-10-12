#!/bin/bash
# WildScape Europe - Environment Check Script
# Verifies all required tools and dependencies are installed

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}  Environment Check${NC}"
echo -e "${CYAN}═══════════════════════════════════════════${NC}\n"

ERRORS=0

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d. -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -ge 18 ]; then
        echo -e "${GREEN}✓${NC} $NODE_VERSION"
    else
        echo -e "${YELLOW}⚠${NC} $NODE_VERSION (< 18.0.0)"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "${RED}✗ Not installed${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    echo -e "${GREEN}✓${NC} $(npm --version)"
else
    echo -e "${RED}✗ Not installed${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check Git
echo -n "Checking Git... "
if command -v git &> /dev/null; then
    echo -e "${GREEN}✓${NC} $(git --version | awk '{print $3}')"
else
    echo -e "${RED}✗ Not installed${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check Make
echo -n "Checking Make... "
if command -v make &> /dev/null; then
    echo -e "${GREEN}✓${NC} $(make --version | head -1 | awk '{print $3}')"
else
    echo -e "${YELLOW}⚠ Not installed${NC}"
fi

# Check for .env file
echo -n "Checking .env file... "
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} Exists"
else
    echo -e "${YELLOW}⚠${NC} Not found (optional)"
fi

# Check node_modules
echo -n "Checking node_modules... "
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Installed"
else
    echo -e "${YELLOW}⚠${NC} Not installed (run: npm install)"
fi

# Check WSL (if applicable)
if grep -qi microsoft /proc/version 2>/dev/null; then
    echo -n "WSL Environment... "
    echo -e "${GREEN}✓${NC} Detected"
fi

# Summary
echo -e "\n${CYAN}═══════════════════════════════════════════${NC}"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════${NC}\n"
    exit 0
else
    echo -e "${RED}✗ $ERRORS check(s) failed${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════${NC}\n"
    exit 1
fi

