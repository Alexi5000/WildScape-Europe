# WildScape Europe Documentation

This directory contains the maintained production documentation for WildScape Europe. The documentation is intentionally concise and aligned with the current SOLID service architecture, validation workflow, and static deployment model.

| Document | Purpose |
|---|---|
| [`GETTING_STARTED.md`](GETTING_STARTED.md) | Local setup, first run, validation commands, and troubleshooting. |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Application layers, SOLID boundaries, service decomposition, stores, and extension strategy. |
| [`API.md`](API.md) | Typed service contracts for campsite, booking, user, weather, enhanced API, and real-time events. |
| [`TESTING.md`](TESTING.md) | Vitest setup, current coverage, and guidance for adding reliable tests. |
| [`DEPLOYMENT.md`](DEPLOYMENT.md) | Production build checklist, environment variables, static hosting, and rollback guidance. |

Run `npm run validate` before relying on a build or publishing changes.
