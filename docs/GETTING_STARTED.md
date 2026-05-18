# Getting Started

This guide helps a new contributor run WildScape Europe, understand the repository layout, and verify Release 1.0.0 quality expectations.

## Prerequisites

| Tool | Required version | Notes |
|---|---|---|
| Node.js | 18 or newer | The package manifest declares the supported engine range. |
| npm | 9 or newer | Use npm scripts documented in `package.json`. |
| Git | Current stable | Clone from the GitHub repository and work from `main`. |

## First run

```bash
git clone https://github.com/Alexi5000/WildScape-Europe.git
cd WildScape-Europe
npm install
npm run dev
```

The app runs locally through Vite. The Mapbox token is optional for Release 1.0, so contributors can still exercise the deterministic service layer without external credentials.

## First validation

```bash
npm run hygiene
```

The hygiene command checks documentation style, TypeScript, ESLint, tests, and the production build. It is the preferred command before committing.

## Where to start reading

| Goal | Read |
|---|---|
| Understand the release | `docs/RELEASE_1_0.md` |
| Understand the architecture | `docs/ARCHITECTURE.md` |
| Add or change service behavior | `docs/API.md` and `docs/TESTING.md` |
| Prepare a deploy | `docs/DEPLOYMENT.md` |
| Maintain the repository | `docs/REPO_HYGIENE.md` and `docs/MAINTAINER_GUIDE.md` |

## Troubleshooting

| Symptom | Resolution |
|---|---|
| Type errors | Run `npm run type-check`, then inspect the reported file and domain type. |
| Lint failures | Run `npm run lint` and fix the first warning or error before rerunning. |
| Test failures | Run `npm run test` and inspect the failing service or store behavior. |
| Build failures | Run `npm run build` after type and lint pass. |
| Docs check failures | Remove em dashes, remove incomplete release wording, or restore a required release document. |
