# Changelog

All notable changes to WildScape Europe are documented in this file.

**Developer**: Alex Cinovoj, TechTideAI  
**Repository**: https://github.com/Alexi5000/WildScape-Europe

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and the project version follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-18

### Added

Release 1.0.0 adds a complete production-quality repository layer around the WildScape Europe app. The release includes animated README and release graphics, SOLID service repositories, typed API and event contracts, deterministic seeded production data flows, Vitest service and store tests, documentation hygiene checks, and a focused documentation suite for maintainers.

| Area | Added capability |
|---|---|
| Product | Immersive campsite discovery, animated wilderness graphics, maps, booking simulation, dashboard state, weather, and aurora context. |
| Architecture | Campsite, booking, user, weather, map, real-time, enhanced API, store, and UI responsibilities are separated into focused modules. |
| Testing | Automated service, state, filtering, booking, weather, and UI adapter tests run with Vitest and Testing Library. |
| Documentation | README, release note, architecture, API, testing, quality, hygiene, deployment, onboarding, and maintainer guides. |
| Hygiene | `npm run docs:check`, `npm run validate`, and `npm run hygiene` provide a repeatable Release 1.0.0 gate. |

### Changed

The documentation set has been reduced to a curated set of current guides. Legacy overlapping docs were removed so the repo remains light and easy to navigate. Validation now includes documentation style checks before TypeScript, lint, tests, and build.

### Fixed

Release 1.0.0 fixes strict TypeScript gaps, broad untyped service contracts, missing test tooling, stale setup notes, and inconsistent documentation claims.

### Release gate

```bash
npm run hygiene
```

## Release types

| Type | Meaning |
|---|---|
| Added | New features or documentation. |
| Changed | Changes in existing functionality. |
| Deprecated | Features planned for removal. |
| Removed | Removed features or files. |
| Fixed | Bug fixes or correctness repairs. |
| Security | Vulnerability fixes or security hardening. |
