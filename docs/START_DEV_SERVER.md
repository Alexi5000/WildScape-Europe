# Start Development Server - Quick Guide

## Issue: PowerShell Script Execution Disabled

Your system has PowerShell script execution disabled. Here are solutions:

## ✅ Solution 1: Enable PowerShell Scripts (Recommended)

### Option A: Temporary (Current Session Only)
Run this in PowerShell as Administrator:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm install
npm run dev
```

### Option B: Permanent (For Current User)
Run this in PowerShell as Administrator:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
Then run:
```powershell
npm install
npm run dev
```

## ✅ Solution 2: Use Command Prompt (Easiest)

1. **Open Command Prompt** (not PowerShell)
   - Press `Win + R`
   - Type `cmd` and press Enter

2. **Navigate to project**
   ```cmd
   cd C:\TechTide\Apps\WildScape-Europe
   ```

3. **Install dependencies**
   ```cmd
   npm install
   ```

4. **Start dev server**
   ```cmd
   npm run dev
   ```

## ✅ Solution 3: Use VS Code Terminal

1. **Open VS Code**
2. **Open Terminal** (Ctrl + `)
3. **Switch to Command Prompt**
   - Click dropdown in terminal
   - Select "Command Prompt" or "Git Bash"
4. **Run commands**
   ```cmd
   npm install
   npm run dev
   ```

## 🚀 Expected Result

Once running, you should see:

```
  VITE v4.5.0  ready in 1234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.x:3000/
  ➜  press h to show help
```

## 🌐 Access Your App

- **Local**: http://localhost:3000
- **Network**: Use the network URL to test on mobile devices

## 📱 What You'll See

1. **Landing Page** - Mountain hiking style hero section
2. **Find Your Campsite** - Filter categories
3. **Featured Campsites** - 4 beautiful campsite cards
4. **Info Sections** - Alternating content layouts
5. **Footer** - Complete with contact info

## 🔥 Hot Reload Enabled

- Changes to code automatically refresh browser
- Save any file to see instant updates
- React Fast Refresh preserves component state

## 🛑 To Stop Server

Press `Ctrl + C` in the terminal

## 🐛 Troubleshooting

### Port 3000 Already in Use?
```cmd
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- --port 5173
```

### Module Not Found?
```cmd
# Clear cache and reinstall
rd /s /q node_modules
del package-lock.json
npm install
```

### Still Issues?
See [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)

---

**Ready to test your beautiful landing page!** 🎉

