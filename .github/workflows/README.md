# 🔄 GitHub Actions Workflows

This directory contains all CI/CD workflows for WildScape Europe.

## 📁 Workflow Files

### Core Workflows

| File | Description | Triggers | Duration |
|------|-------------|----------|----------|
| **ci.yml** | Main CI pipeline | Push, PR | ~6 min |
| **cd.yml** | Continuous Deployment | Main branch, Tags | ~4 min |
| **pr-check.yml** | PR validation & preview | Pull Requests | ~8 min |
| **security.yml** | Security scanning | Daily, Push, PR | ~12 min |
| **release.yml** | Release automation | Tags (v*) | ~10 min |

---

## 🔄 Workflow Overview

### 1. CI Workflow (`ci.yml`)

**Purpose**: Continuous Integration checks on every push and PR

**What it does:**
- ✅ Installs dependencies with caching
- ✅ Runs ESLint and Prettier
- ✅ TypeScript type checking
- ✅ Builds application (Node 18 & 20)
- ✅ Bundle size analysis
- ✅ NPM security audit
- ✅ Lighthouse performance tests
- ✅ Test execution

**When it runs:**
- Every push to `main` or `develop`
- Every pull request
- Manual trigger

**Duration**: ~5-8 minutes

---

### 2. CD Workflow (`cd.yml`)

**Purpose**: Automated deployment to production and staging

**What it does:**
- 🚀 Builds optimized production bundle
- 🚀 Deploys to Vercel (primary)
- 🚀 Deploys to GitHub Pages (backup)
- 🚀 Deploys to Netlify (optional)
- 🚀 Deploys to AWS S3/CloudFront (optional)
- ✅ Post-deployment verification
- 📧 Sends deployment notifications
- 🔄 Rollback capability

**When it runs:**
- Push to `main` branch
- Git tags (v*.*.*)
- Manual trigger

**Duration**: ~3-5 minutes

**Deployment Platforms:**
- **Vercel** (default, enabled)
- **GitHub Pages** (enabled)
- **Netlify** (disabled, set `if: true` to enable)
- **AWS** (disabled, set `if: true` to enable)

---

### 3. PR Check Workflow (`pr-check.yml`)

**Purpose**: Automated PR validation and preview deployments

**What it does:**
- 📋 Validates PR title (conventional commits)
- 🏷️ Auto-labels PR based on changes
- 🔍 Code quality analysis
- 🔒 Dependency security review
- 🎨 Builds PR preview
- 📱 Deploys preview to Vercel
- ♿ Accessibility (a11y) checks
- 📊 Performance budget validation
- 👁️ Visual regression testing (Percy)

**When it runs:**
- Pull request opened
- New commits pushed to PR
- PR reopened

**Duration**: ~6-10 minutes

**Preview URL Format:**
```
pr-{number}.wildscape-europe.vercel.app
```

---

### 4. Security Workflow (`security.yml`)

**Purpose**: Comprehensive security scanning

**What it does:**
- 🔒 NPM audit for vulnerabilities
- 🔒 Snyk security analysis
- 🔒 CodeQL static analysis
- 🔒 Secret scanning (TruffleHog, GitLeaks)
- 📄 License compliance checking
- 🛡️ OWASP dependency check
- 🐳 Container security (if using Docker)
- 🚨 Creates security issues for findings
- 📧 Sends security alerts

**When it runs:**
- Daily at 3 AM UTC (scheduled)
- Push to `main` or `develop`
- Pull requests
- Manual trigger

**Duration**: ~10-15 minutes

---

### 5. Release Workflow (`release.yml`)

**Purpose**: Automated release creation and publishing

**What it does:**
- 📦 Creates GitHub releases
- 📝 Generates changelogs
- 🏷️ Version management
- 📦 Builds release assets
- 🔐 Generates checksums
- 📢 Release notifications
- 🐳 Publishes Docker images (optional)
- 📦 Publishes to NPM (optional)

**When it runs:**
- Git tags matching `v*.*.*` pushed
- Manual version bump workflow

**Duration**: ~8-12 minutes

**Version Formats:**
- `v1.0.0` - Production release
- `v1.0.0-alpha.1` - Alpha release
- `v1.0.0-beta.1` - Beta release
- `v1.0.0-rc.1` - Release candidate

---

## 🔧 Configuration

### Required Secrets

Minimum configuration:
```bash
VITE_MAPBOX_TOKEN  # Mapbox API token
```

### Recommended Secrets

For full functionality:
```bash
# Vercel Deployment
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID

# Security Scanning
SNYK_TOKEN

# Notifications
SLACK_WEBHOOK_URL

# Analytics (optional)
VITE_GA_TRACKING_ID
```

### Optional Secrets

For advanced features:
```bash
# Netlify (alternative deployment)
NETLIFY_AUTH_TOKEN
NETLIFY_SITE_ID

# AWS (enterprise deployment)
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
S3_BUCKET_NAME
CLOUDFRONT_DISTRIBUTION_ID

# Visual Testing
PERCY_TOKEN

# Publishing
NPM_TOKEN
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

---

## 🚀 Usage

### Automatic Triggers

Workflows run automatically:

```bash
# Triggers CI workflow
git push origin main

# Triggers CI + PR check workflows
git push origin feature/new-feature
# (create PR on GitHub)

# Triggers release workflow
git tag v1.0.0
git push origin v1.0.0
```

### Manual Triggers

Run workflows manually:

1. Go to **Actions** tab
2. Select workflow to run
3. Click **Run workflow**
4. Choose branch/options
5. Click **Run workflow** button

---

## 📊 Workflow Status

### Checking Status

**Option 1: Actions Tab**
- View all workflow runs
- See detailed logs
- Download artifacts

**Option 2: Commit/PR Checks**
- ✅ Green checkmark: All passed
- ❌ Red X: Some failed
- 🟡 Yellow: In progress

**Option 3: Status Badges**
Add to README:
```markdown
![CI](https://github.com/Alexi5000/WildScape-Europe/workflows/CI/badge.svg)
```

### Artifacts

Workflows generate artifacts:

- `build-artifacts` - Production build
- `pr-preview-{number}` - PR preview
- `bundle-analysis` - Size report
- `coverage-reports` - Test coverage
- `lint-results` - Linting output
- `security-reports` - Security scan results

**Download**: Actions → Select run → Artifacts section

---

## 🔍 Debugging

### Enable Debug Logging

1. Settings → Secrets → Actions
2. Add secret: `ACTIONS_STEP_DEBUG` = `true`
3. Rerun failed workflow

### Common Issues

**Build Failures**
```bash
# Clear cache
rm -rf node_modules
npm install
```

**Type Errors**
```bash
# Check locally
npm run type-check
```

**Deployment Failures**
- Verify secrets are correct
- Check platform status page
- Review deployment logs

---

## 📈 Performance

### Optimization Strategies

**Caching:**
- Node modules cached
- Build outputs cached
- Dependency cache shared across jobs

**Parallelization:**
- Independent jobs run in parallel
- Matrix builds for multiple Node versions

**Conditional Execution:**
- Some jobs only run when needed
- Skip workflows on docs-only changes

### Expected Durations

| Workflow | Min | Avg | Max |
|----------|-----|-----|-----|
| CI | 4m | 6m | 10m |
| CD | 2m | 4m | 7m |
| PR Check | 5m | 8m | 12m |
| Security | 8m | 12m | 20m |
| Release | 6m | 10m | 15m |

---

## 🔒 Security

### Security Features

- **Secret Scanning**: TruffleHog + GitLeaks
- **Dependency Scanning**: NPM audit + Snyk
- **Code Analysis**: CodeQL
- **License Compliance**: Automated checks
- **Container Scanning**: Trivy (if using Docker)

### Security Best Practices

✅ **Do:**
- Store all secrets in GitHub Secrets
- Use environment-specific secrets
- Review security scan results
- Keep dependencies updated
- Enable Dependabot alerts

❌ **Don't:**
- Commit secrets to repository
- Use hardcoded credentials
- Ignore security warnings
- Skip security scans
- Use outdated dependencies

---

## 📚 Documentation

### Detailed Guides

- **[CI/CD Setup Guide](CICD_SETUP.md)** - Complete setup instructions
- **[Quick Start](../CICD_QUICKSTART.md)** - 5-minute setup
- **[Contributing Guide](CONTRIBUTING.md)** - Development workflow

### External Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Snyk Security Docs](https://docs.snyk.io)

---

## 🤝 Contributing

To modify workflows:

1. Test changes in a fork first
2. Use minimal examples
3. Add comments for complex logic
4. Update this documentation
5. Test all scenarios

---

## 📝 Changelog

- **2024-01**: Initial CI/CD setup
- **2024-01**: Added security scanning
- **2024-01**: Implemented PR previews
- **2024-01**: Added release automation

---

## 🆘 Support

Need help?

- **Documentation**: Read the full [CI/CD Setup Guide](CICD_SETUP.md)
- **Issues**: Create issue with `ci/cd` label
- **Logs**: Check Actions tab for detailed logs
- **Discussions**: Ask in GitHub Discussions

---

**Last Updated**: January 2024  
**Maintained By**: @Alexi5000

