# 🚀 CI/CD Quick Start Guide

Get your CI/CD pipeline up and running in minutes!

## ⚡ 5-Minute Setup

### Step 1: Enable GitHub Actions

✅ Already enabled! The workflows are in `.github/workflows/`

### Step 2: Configure Required Secrets

Go to **Settings → Secrets and variables → Actions** and add:

#### Minimum Configuration (Mapbox Only)

```bash
VITE_MAPBOX_TOKEN=pk.your_mapbox_token_here
```

That's it! With just this secret, you can:
- ✅ Run CI checks
- ✅ Build the application
- ✅ Deploy to GitHub Pages

#### Recommended: Add Vercel Deployment

For professional deployment with preview URLs:

```bash
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=team_xxxxx
VERCEL_PROJECT_ID=prj_xxxxx
```

**How to get Vercel credentials:**
1. Sign up at [vercel.com](https://vercel.com)
2. Create new project or import from GitHub
3. Get token: Account Settings → Tokens → Create
4. Get IDs: Project Settings → General

---

## 🎯 What Happens Automatically

### When You Push Code

```bash
git push origin main
```

✅ **CI Workflow Runs:**
- Linting and code quality checks
- TypeScript type checking
- Build verification
- Bundle size analysis
- Security scanning

✅ **CD Workflow Runs:**
- Production build
- Deploy to GitHub Pages
- Deploy to Vercel (if configured)
- Post-deployment verification

**Duration**: ~5-8 minutes

### When You Create a Pull Request

```bash
git checkout -b feature/awesome-feature
git push origin feature/awesome-feature
# Create PR on GitHub
```

✅ **PR Check Workflow Runs:**
- All CI checks
- PR validation and auto-labeling
- Build preview deployment
- Bundle size comparison
- Automated code review suggestions

**Duration**: ~6-10 minutes

---

## 📊 Viewing Workflow Status

### Option 1: GitHub Actions Tab

1. Go to **Actions** tab in your repository
2. See all workflow runs
3. Click any run for detailed logs
4. Download artifacts (build files, reports)

### Option 2: PR/Commit Checks

- ✅ Green checkmark = All checks passed
- ❌ Red X = Some checks failed
- 🟡 Yellow circle = In progress
- ⏸️ Gray = Pending/Queued

### Option 3: Status Badges

Add to your README:

```markdown
![CI](https://github.com/Alexi5000/WildScape-Europe/workflows/CI/badge.svg)
![CD](https://github.com/Alexi5000/WildScape-Europe/workflows/CD/badge.svg)
```

---

## 🔧 Common Tasks

### Running Workflows Manually

1. Go to **Actions** tab
2. Select workflow (e.g., "Security Scanning")
3. Click "Run workflow" button
4. Choose branch
5. Click "Run workflow"

### Creating a Release

#### Method 1: Automated

```bash
# The release workflow will auto-generate releases
git tag v1.0.0
git push origin v1.0.0
```

#### Method 2: GitHub UI

1. Go to **Releases** → **Draft a new release**
2. Click "Choose a tag" → Create new tag (e.g., v1.0.1)
3. Title: "Release v1.0.1"
4. Describe changes
5. Click "Publish release"

### Downloading Build Artifacts

1. **Actions** tab → Select workflow run
2. Scroll to **Artifacts** section
3. Download:
   - `build-artifacts` - Production build
   - `bundle-analysis` - Size report
   - `pr-preview-{number}` - PR preview build

---

## 🎨 Deployment URLs

### Production

After pushing to `main`:

- **GitHub Pages**: `https://alexi5000.github.io/WildScape-Europe/`
- **Vercel** (if configured): `https://wildscape-europe.vercel.app`

### Preview Deployments

Each PR gets a preview URL:

- **Format**: `pr-{number}.wildscape-europe.vercel.app`
- **Posted**: Automatically commented on PR
- **Updated**: On every new commit

---

## 📈 Monitoring

### What to Monitor

1. **Build Success Rate**
   - Actions tab → See workflow history
   - Target: > 95% success rate

2. **Bundle Size**
   - Check bundle-analysis artifacts
   - Watch for size increases
   - Target: < 1MB total

3. **Security Issues**
   - Review security workflow results
   - Fix high/critical vulnerabilities
   - Keep dependencies updated

4. **Deployment Status**
   - Verify production deployments
   - Check post-deploy smoke tests
   - Monitor error rates

### Set Up Notifications

#### Slack Notifications

1. Create Slack incoming webhook
2. Add to GitHub secrets: `SLACK_WEBHOOK_URL`
3. Get alerts for:
   - Failed builds
   - Security issues
   - Successful deployments

#### Email Notifications

1. GitHub Settings → Notifications
2. Enable "Actions" notifications
3. Choose frequency (instant/daily)

---

## 🔍 Troubleshooting

### Build Failures

**"Cannot find module"**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "fix: update dependencies"
```

**"Out of memory"**
- Normal for large builds
- GitHub Actions has 7GB RAM limit
- Consider optimizing build process

### Deployment Failures

**"Vercel deployment failed"**
1. Check Vercel token is valid
2. Verify project IDs are correct
3. Check Vercel dashboard for errors

**"GitHub Pages not updating"**
1. Check Pages settings enabled
2. Source: GitHub Actions
3. Wait 2-3 minutes for propagation

### Security Scan Failures

**"High vulnerabilities found"**
```bash
# Check vulnerabilities
npm audit

# Fix them
npm audit fix

# Update package-lock.json
git add package-lock.json
git commit -m "fix: update dependencies"
```

---

## 📚 Next Steps

### Essential Reading

1. **[Full CI/CD Documentation](.github/CICD_SETUP.md)**
   - Detailed configuration
   - All deployment options
   - Advanced features

2. **[Contributing Guide](.github/CONTRIBUTING.md)**
   - Development workflow
   - Coding standards
   - PR guidelines

3. **[Project README](README.md)**
   - Project overview
   - Features
   - Getting started

### Optional Enhancements

1. **Add More Secrets**
   - `VITE_GA_TRACKING_ID` - Google Analytics
   - `SNYK_TOKEN` - Enhanced security scanning
   - `PERCY_TOKEN` - Visual regression testing

2. **Enable Additional Workflows**
   - Edit workflow files
   - Set `if: false` to `if: true`
   - Configure required secrets

3. **Customize Workflows**
   - Adjust schedule times
   - Modify build commands
   - Add custom jobs

---

## ✅ Verification Checklist

- [ ] GitHub Actions enabled
- [ ] At least `VITE_MAPBOX_TOKEN` secret added
- [ ] CI workflow runs on push
- [ ] CD workflow deploys to GitHub Pages
- [ ] PR workflow creates preview deployments
- [ ] Can view workflow logs in Actions tab
- [ ] Build artifacts downloadable
- [ ] Security scans running daily
- [ ] Status badges added to README (optional)

---

## 🆘 Getting Help

### Resources

- **Logs**: Actions tab → Click workflow → Expand steps
- **Documentation**: `.github/CICD_SETUP.md`
- **Issues**: Create issue with `ci/cd` label
- **Discussions**: Post in GitHub Discussions

### Common Questions

**Q: Do I need all the secrets?**
A: No! Only `VITE_MAPBOX_TOKEN` is required. Others are optional.

**Q: How much does this cost?**
A: $0! GitHub Actions is free for public repos (2000 mins/month for private).

**Q: Can I use a different deployment platform?**
A: Yes! We support Vercel, Netlify, AWS, and GitHub Pages.

**Q: How do I disable a workflow?**
A: Comment out the `on:` triggers or delete the workflow file.

**Q: Can I run workflows locally?**
A: Yes! Use [act](https://github.com/nektos/act) to run Actions locally.

---

## 🎉 Success!

Your CI/CD pipeline is now set up! 🚀

**What's happening:**
- ✅ Automatic builds on every commit
- ✅ Automated testing and quality checks
- ✅ Security scanning
- ✅ Automatic deployments
- ✅ PR preview deployments

**Next commit will:**
1. Trigger CI checks
2. Build your application
3. Run all tests
4. Deploy to production

Just push your code and watch the magic happen! ✨

---

**Quick Links:**
- [Full Documentation](.github/CICD_SETUP.md)
- [Contributing Guide](.github/CONTRIBUTING.md)
- [Project README](README.md)

---

Made with ❤️ for WildScape Europe

