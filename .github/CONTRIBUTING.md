# Contributing to WildScape Europe

Thank you for your interest in contributing to WildScape Europe! We appreciate your help in making this project better.

## 🤝 How to Contribute

### Reporting Bugs

Before creating a bug report, please check if the issue already exists. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version)

### Suggesting Features

Feature requests are welcome! Please provide:

- **Clear use case** for the feature
- **Expected behavior** and benefits
- **Possible implementation** approach (optional)

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following our coding standards
4. **Test thoroughly** - ensure nothing breaks
5. **Commit** using conventional commits (see below)
6. **Push** to your fork
7. **Open a Pull Request** with a clear description

## 📝 Coding Standards

### TypeScript

- Use **TypeScript strict mode** (already enabled)
- Add **type annotations** for function parameters and return types
- Avoid `any` type - use `unknown` if necessary
- Use **interfaces** for object shapes

### React Components

- Use **functional components** with hooks
- Keep components **small and focused** (single responsibility)
- Extract **reusable logic** into custom hooks
- Use **descriptive prop names**

### Code Style

```typescript
// ✅ Good
interface CampsiteCardProps {
  id: string;
  name: string;
  location: Location;
  onSelect?: (id: string) => void;
}

export const CampsiteCard = ({ id, name, location, onSelect }: CampsiteCardProps) => {
  const handleClick = () => onSelect?.(id);
  
  return (
    <div onClick={handleClick} className="campsite-card">
      <h3>{name}</h3>
      <p>{location.country}</p>
    </div>
  );
};
```

### File Naming

- **Components**: PascalCase (`CampsiteCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useSearch.ts`)
- **Utils**: camelCase (`formatDate.ts`)
- **Types**: camelCase (`campsite.ts`)

### Folder Structure

```
src/
├── components/
│   └── FeatureName/
│       ├── ComponentName.tsx
│       └── index.ts
├── hooks/
│   └── useFeatureName.ts
├── services/
│   └── featureService.ts
└── types/
    └── feature.ts
```

## 💬 Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(search): add location-based filtering
fix(map): resolve marker clustering issue
docs(readme): update installation instructions
refactor(campsite): extract booking logic to hook
perf(particles): optimize particle rendering
```

## 🧪 Testing

- Write **unit tests** for utilities and pure functions
- Test **component behavior**, not implementation
- Ensure all tests pass before submitting PR

## 🎨 Design Guidelines

### Colors

Use theme colors from Tailwind config:
- Forest: `text-forest-500`, `bg-forest-600`
- Earth: `text-earth-brown`, `bg-earth-tan`
- Nature: `text-nature-sky`, `bg-nature-water`

### Spacing

Follow consistent spacing scale:
- Use Tailwind spacing utilities
- Maintain visual hierarchy
- Ensure touch-friendly targets (min 44x44px)

### Animations

- Keep animations **subtle and purposeful**
- Use forest-themed animations: `animate-forest-sway`, `animate-leaf-fall`
- Use `motion.div` from Framer Motion for complex animations
- Respect `prefers-reduced-motion`

## 📚 Documentation

- Add **JSDoc comments** for complex functions
- Update **README.md** if adding new features
- Include **examples** for new APIs
- Update **type definitions**

## 🚀 Development Workflow

```bash
# 1. Update your fork
git checkout main
git pull upstream main

# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Make changes and commit
git add .
git commit -m "feat: add amazing feature"

# 4. Run checks
npm run lint
npm run type-check

# 5. Push and create PR
git push origin feature/amazing-feature
```

## ❓ Questions?

- Open a [Discussion](https://github.com/yourusername/wildscape-europe/discussions)
- Check existing documentation
- Ask maintainers for clarification

Thank you for contributing to WildScape Europe! 🏕️🌲

