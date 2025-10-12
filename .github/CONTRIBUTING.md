# 🤝 Contributing to WildScape Europe

Thank you for your interest in contributing to WildScape Europe! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [CI/CD Pipeline](#cicd-pipeline)
- [Issue Guidelines](#issue-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)

---

## 📜 Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. Please be respectful and considerate in all interactions.

### Our Standards

- ✅ Use welcoming and inclusive language
- ✅ Be respectful of differing viewpoints
- ✅ Accept constructive criticism gracefully
- ✅ Focus on what's best for the community
- ❌ No harassment or trolling
- ❌ No personal or political attacks

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork the Repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/WildScape-Europe.git
   cd WildScape-Europe
   ```

3. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/Alexi5000/WildScape-Europe.git
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Create Environment File**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```

7. **Open in Browser**
   - Navigate to `http://localhost:3000`

---

## 🔄 Development Workflow

### Branch Strategy

```
main (production)
  ↑
develop (staging)
  ↑
feature/your-feature (development)
```

### Creating a Feature Branch

```bash
# Update your local repository
git checkout develop
git pull upstream develop

# Create feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### Making Changes

1. **Make your changes**
   - Write clean, documented code
   - Follow coding standards (see below)
   - Test your changes thoroughly

2. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```
   
   Follow conventional commits:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation
   - `style:` Formatting
   - `refactor:` Code restructuring
   - `perf:` Performance improvement
   - `test:` Tests
   - `build:` Build system
   - `ci:` CI/CD
   - `chore:` Maintenance

3. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create Pull Request**
   - Go to GitHub and create PR
   - Fill out PR template completely
   - Link related issues

---

## 💻 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Define types for all function parameters and return values
- Avoid `any` type when possible

```typescript
// ✅ Good
interface CampsiteProps {
  id: string;
  name: string;
  location: { lat: number; lng: number };
}

function CampsiteCard({ id, name, location }: CampsiteProps): JSX.Element {
  // ...
}

// ❌ Bad
function CampsiteCard(props: any) {
  // ...
}
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use descriptive prop names

```typescript
// ✅ Good
export function SearchBar({ 
  value, 
  onChange, 
  placeholder 
}: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  // ...
}

// ❌ Bad
export function SearchBar(props) {
  // ...
}
```

### File Structure

```
src/
├── components/
│   ├── ComponentName/
│   │   ├── ComponentName.tsx
│   │   ├── ComponentName.test.tsx
│   │   └── index.ts
├── hooks/
│   └── useCustomHook.ts
├── services/
│   └── api.ts
├── store/
│   └── store.ts
└── types/
    └── types.ts
```

### Naming Conventions

- **Components**: PascalCase (`CampsiteCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useSearch.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RESULTS`)
- **Types/Interfaces**: PascalCase (`CampsiteData`)

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Add trailing commas
- Max line length: 100 characters

```typescript
// ✅ Good
const campsite = {
  id: '123',
  name: 'Mountain View',
  amenities: ['wifi', 'electricity'],
};

// Run formatter
npm run format
```

### Comments

- Write self-documenting code
- Add comments for complex logic
- Use JSDoc for functions and components

```typescript
/**
 * Calculates the distance between two geographic coordinates
 * @param coord1 - First coordinate {lat, lng}
 * @param coord2 - Second coordinate {lat, lng}
 * @returns Distance in kilometers
 */
function calculateDistance(
  coord1: Coordinate,
  coord2: Coordinate
): number {
  // Implementation...
}
```

---

## 📤 Submitting Changes

### Before Submitting

1. **Run linting**
   ```bash
   npm run lint
   ```

2. **Fix linting errors**
   ```bash
   npm run lint:fix
   ```

3. **Check types**
   ```bash
   npm run type-check
   ```

4. **Format code**
   ```bash
   npm run format
   ```

5. **Build project**
   ```bash
   npm run build
   ```

6. **Test locally**
   - Test all functionality
   - Check multiple browsers
   - Test on mobile devices

### Pull Request Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console.logs or debugging code
- [ ] Tests added (if applicable)
- [ ] All tests pass
- [ ] Build succeeds
- [ ] PR template filled out completely

---

## 🔄 CI/CD Pipeline

Our CI/CD pipeline automatically runs on all PRs and commits:

### What Gets Checked

1. **Linting** - ESLint and Prettier
2. **Type Checking** - TypeScript compilation
3. **Build** - Production build
4. **Bundle Size** - Size analysis and limits
5. **Security** - Dependency vulnerabilities
6. **Performance** - Lighthouse scores

### PR Preview Deployments

- Every PR gets a preview deployment
- URL posted as comment on PR
- Updated automatically on new commits
- Perfect for reviewing changes

### Workflow Status

Check workflow status in the **Actions** tab:
- ✅ Green checkmark: All checks passed
- ❌ Red X: Some checks failed (click for details)
- 🟡 Yellow dot: In progress

### Fixing Failed Checks

1. **Click on failed check**
2. **Review error logs**
3. **Fix issues locally**
4. **Push new commit**
5. **Wait for checks to run again**

See [CI/CD Setup Guide](.github/CICD_SETUP.md) for details.

---

## 🐛 Issue Guidelines

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check closed issues** for previous solutions
3. **Try latest version** to see if already fixed

### Bug Reports

Use the bug report template:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/OS information
- Console errors

### Feature Requests

Use the feature request template:
- Problem statement
- Proposed solution
- Benefits and use cases
- Mockups (if applicable)

### Issue Labels

Issues are automatically labeled:
- `bug` - Something isn't working
- `enhancement` - New feature request
- `documentation` - Documentation improvement
- `good first issue` - Good for beginners
- `help wanted` - Extra attention needed
- `priority: high` - High priority
- `needs triage` - Needs review

---

## 📝 Pull Request Guidelines

### PR Title

Use conventional commit format:
```
feat: add campsite filtering by amenities
fix: resolve map marker clustering issue
docs: update contributing guide
```

### PR Description

Fill out the template completely:
- Description of changes
- Type of change
- Related issues
- Screenshots/demo
- Testing checklist
- Browser/device testing

### PR Size

Keep PRs focused and manageable:
- ✅ **Small**: < 100 lines (ideal)
- ✅ **Medium**: 100-500 lines (acceptable)
- ⚠️ **Large**: 500-1000 lines (split if possible)
- ❌ **XL**: > 1000 lines (definitely split)

### PR Review Process

1. **Automated checks run** - Must pass before review
2. **Preview deployment** - Test the changes
3. **Code review** - Maintainers review code
4. **Request changes** - If needed
5. **Approval** - Once all checks pass
6. **Merge** - Squash and merge to main

### Addressing Review Comments

- Respond to all comments
- Make requested changes
- Push new commits (will update PR)
- Re-request review when ready

---

## 🧪 Testing

### Manual Testing

Test your changes:
- ✅ All functionality works as expected
- ✅ No console errors
- ✅ Responsive design works
- ✅ Accessibility standards met
- ✅ Performance is acceptable

### Browser Testing

Test on major browsers:
- Chrome
- Firefox
- Safari
- Edge

### Device Testing

Test on different devices:
- Desktop (various screen sizes)
- Tablet
- Mobile (iOS and Android)

---

## 🎨 Design Guidelines

### UI/UX Principles

- **Consistency**: Follow existing design patterns
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimize for 60fps
- **Responsiveness**: Mobile-first approach

### Color Palette

Use the defined color system:
```css
--primary: #059669;    /* Forest Emerald */
--secondary: #14B8A6;  /* Teal Waters */
--accent: #F97316;     /* Sunset Orange */
```

### Typography

- **Headings**: Poppins
- **Body**: Inter
- **Monospace**: Fira Code

---

## 📚 Resources

### Documentation

- [Project README](../README.md)
- [CI/CD Setup Guide](.github/CICD_SETUP.md)
- [Component Documentation](../docs/components.md)

### Tools

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)

### Community

- GitHub Issues
- GitHub Discussions
- Project Wiki

---

## 🏆 Recognition

Contributors are recognized in:
- GitHub Contributors page
- Project README
- Release notes

---

## ❓ Questions?

- **General questions**: GitHub Discussions
- **Bug reports**: GitHub Issues
- **Security issues**: Email maintainers directly

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the Apache-2.0 License.

---

Thank you for contributing to WildScape Europe! 🏕️✨

