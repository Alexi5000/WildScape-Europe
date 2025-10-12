# 🐧 WSL Setup Guide for WildScape Europe

Complete guide for setting up Windows Subsystem for Linux (WSL) for development.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [WSL Installation](#wsl-installation)
- [Project Setup](#project-setup)
- [Configuration](#configuration)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)
- [Docker Integration](#docker-integration)

---

## 🎯 Prerequisites

### Windows Requirements

- Windows 10 version 2004+ (Build 19041+) or Windows 11
- Administrative access
- At least 8GB RAM
- 20GB free disk space

### Check Windows Version

```powershell
# In PowerShell
winver
```

---

## 🚀 WSL Installation

### 1. Enable WSL

```powershell
# Run in PowerShell as Administrator
wsl --install
```

This installs:
- WSL 2
- Ubuntu (default distribution)
- Virtual Machine Platform
- Windows Subsystem for Linux

### 2. Restart Computer

After installation, restart your computer.

### 3. Set Up Ubuntu

After restart, Ubuntu will open automatically:

```bash
# Create your UNIX username
Enter new UNIX username: yourname

# Create your password
New password: ********
Retype new password: ********
```

### 4. Update Ubuntu

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 🔧 Project Setup

### Method 1: Automated Setup (Recommended)

```bash
# Navigate to project directory
cd /mnt/c/TechTide/Apps/WildScape-Europe

# Run setup script
bash scripts/setup-wsl.sh
```

This will:
- ✅ Install Node.js via nvm
- ✅ Install build tools
- ✅ Install project dependencies
- ✅ Create .env file
- ✅ Fix file permissions
- ✅ Verify installation

### Method 2: Manual Setup

#### 1. Install Node.js via nvm

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell
source ~/.bashrc

# Install Node.js LTS
nvm install --lts
nvm use --lts

# Verify installation
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

#### 2. Install Build Tools

```bash
# Install essential build tools
sudo apt-get install -y build-essential git curl wget unzip
```

#### 3. Clone/Navigate to Project

```bash
# If cloning fresh
git clone https://github.com/Alexi5000/WildScape-Europe.git
cd WildScape-Europe

# Or navigate to existing project
cd /mnt/c/TechTide/Apps/WildScape-Europe
```

#### 4. Install Dependencies

```bash
npm install
```

#### 5. Configure Environment

```bash
# Copy environment template
cp env.example .env

# Edit with your preferred editor
nano .env  # or vim, code, etc.
```

---

## ⚙️ Configuration

### WSL Configuration (.wslconfig)

Copy `.wslconfig` to your Windows user folder:

```powershell
# In PowerShell
copy .wslconfig $env:USERPROFILE\.wslconfig
```

Then restart WSL:

```powershell
wsl --shutdown
wsl
```

### Git Configuration

```bash
# Set your Git identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# Enable credential storage
git config --global credential.helper store
```

### File Permissions

```bash
# Fix script permissions
chmod +x scripts/*.sh

# Or use Make command
make wsl-fix-permissions
```

---

## 💻 Development Workflow

### Using Makefile (Recommended)

```bash
# View all available commands
make help

# Start development server
make dev

# Build for production
make build

# Run linting
make lint

# Fix linting issues
make lint-fix

# Type checking
make type-check

# Clean and rebuild
make reset
```

### Using npm Scripts

```bash
# Start development
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Lint
npm run lint

# Type check
npm run type-check
```

### Accessing from Windows

When running `make dev` or `npm run dev`:

- **WSL URL**: http://localhost:3000
- **Windows Browser**: http://localhost:3000
- **Network URL**: http://[your-ip]:3000

---

## 🔍 Verifying Setup

Run the environment check script:

```bash
bash scripts/check-env.sh
```

Expected output:

```
═══════════════════════════════════════════
  Environment Check
═══════════════════════════════════════════

Checking Node.js... ✓ v18.x.x
Checking npm... ✓ 9.x.x
Checking Git... ✓ 2.x.x
Checking Make... ✓ 4.x
Checking .env file... ✓ Exists
Checking node_modules... ✓ Installed
WSL Environment... ✓ Detected

═══════════════════════════════════════════
✓ All checks passed!
═══════════════════════════════════════════
```

---

## 🐛 Troubleshooting

### Issue: WSL Command Not Found

**Solution:**

```powershell
# In PowerShell as Administrator
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# Restart computer
```

### Issue: Network Connectivity Problems

**Solution:**

```bash
# In WSL
sudo rm /etc/resolv.conf
sudo bash -c 'echo "nameserver 8.8.8.8" > /etc/resolv.conf'
sudo bash -c 'echo "nameserver 8.8.4.4" >> /etc/resolv.conf'
```

### Issue: Slow File System Performance

**Problem:** Files in `/mnt/c/` are slow.

**Solution:** Clone project to WSL filesystem:

```bash
# Clone to WSL home directory
cd ~
git clone https://github.com/Alexi5000/WildScape-Europe.git
cd WildScape-Europe
```

**Note:** WSL native filesystem is much faster than mounted Windows drives.

### Issue: Permission Denied Errors

**Solution:**

```bash
# Fix permissions
chmod +x scripts/*.sh

# Or use Makefile
make wsl-fix-permissions
```

### Issue: Node/npm Not Found After Installation

**Solution:**

```bash
# Reload bash configuration
source ~/.bashrc

# Or restart WSL
exit
wsl
```

### Issue: Port Already in Use

**Solution:**

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
npm run dev -- --port 3001
```

---

## 🐳 Docker Integration

### Install Docker Desktop for Windows

1. Download Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop)
2. Enable WSL 2 backend during installation
3. Enable WSL integration in Docker Desktop settings

### Using Docker with Project

```bash
# Build and run development container
docker-compose up app-dev

# Build and run production container
docker-compose --profile production up app-prod

# Stop all containers
docker-compose down

# Or use Makefile
make docker-up
make docker-down
```

### Access Containers

- **Development**: http://localhost:3000
- **Production**: http://localhost:8080

---

## 📊 Performance Tips

### 1. Use WSL Native Filesystem

Store project files in WSL filesystem (`~` directory) instead of Windows filesystem (`/mnt/c/`).

**Performance difference:**
- WSL filesystem: ⚡ Fast
- Windows filesystem via `/mnt/c/`: 🐌 Slow

### 2. Increase WSL Memory

Edit `.wslconfig` to allocate more memory:

```ini
[wsl2]
memory=8GB  # Increase if you have more RAM
processors=4
```

### 3. Enable systemd (WSL 2.0.9+)

```bash
# Edit /etc/wsl.conf
sudo nano /etc/wsl.conf

# Add:
[boot]
systemd=true
```

---

## 🔗 Useful Commands

### WSL Management

```powershell
# List installed distributions
wsl --list --verbose

# Set default distribution
wsl --set-default Ubuntu

# Shutdown WSL
wsl --shutdown

# Update WSL
wsl --update

# Check WSL version
wsl --version
```

### Quick Access

```powershell
# Open WSL in current directory
wsl

# Open project in WSL
wsl cd /mnt/c/TechTide/Apps/WildScape-Europe

# Open VS Code in WSL
wsl code .
```

---

## 📚 Additional Resources

### Official Documentation

- [WSL Documentation](https://docs.microsoft.com/en-us/windows/wsl/)
- [WSL Best Practices](https://docs.microsoft.com/en-us/windows/wsl/setup/environment)
- [Docker Desktop WSL 2 Backend](https://docs.docker.com/desktop/windows/wsl/)

### VS Code Integration

1. Install "Remote - WSL" extension
2. Open command palette (Ctrl+Shift+P)
3. Type "WSL: Open Folder in WSL"
4. Navigate to project directory

### Terminal Integration

**Windows Terminal:**
```json
{
  "name": "WildScape WSL",
  "commandline": "wsl.exe -d Ubuntu",
  "startingDirectory": "\\\\wsl$\\Ubuntu\\home\\username\\WildScape-Europe"
}
```

---

## ✅ Checklist

After setup, verify:

- [ ] WSL 2 installed and running
- [ ] Ubuntu distribution set up
- [ ] Node.js 18+ installed
- [ ] npm dependencies installed
- [ ] Git configured
- [ ] `.env` file created
- [ ] Development server starts: `make dev`
- [ ] Build succeeds: `make build`
- [ ] All checks pass: `bash scripts/check-env.sh`

---

## 🎉 You're Ready!

Your WSL environment is now set up for WildScape Europe development!

**Next Steps:**

1. Start development server: `make dev`
2. Open browser: http://localhost:3000
3. Start coding! 🚀

**Need Help?**

- Run `make help` to see all available commands
- Check [Troubleshooting](#troubleshooting) section
- Create an issue on GitHub

---

**Happy Camping! Happy Coding!** 🏕️✨

