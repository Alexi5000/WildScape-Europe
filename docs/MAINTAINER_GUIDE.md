# Maintainer Guide

This guide explains how to keep WildScape Europe healthy after Release 1.0. It is written for maintainers who need to accept changes, prepare releases, or diagnose regressions.

## Maintainer workflow

| Step | Command or action | Purpose |
|---|---|---|
| Install | `npm install` | Recreate the dependency graph from the lockfile. |
| Develop | `npm run dev` | Start the local Vite server. |
| Validate docs | `npm run docs:check` | Confirm release docs and style rules. |
| Validate code | `npm run validate` | Run docs, types, lint, tests, and build. |
| Release gate | `npm run hygiene` | Run the full CloseLight gate. |

## Review checklist

| Review area | Questions to answer |
|---|---|
| Product | Does the change preserve search, filtering, map controls, weather context, and booking simulation? |
| Architecture | Does the change keep service, repository, store, and component responsibilities separate? |
| Types | Are new values represented by explicit contracts instead of broad objects? |
| Tests | Does the suite protect the behavior that changed? |
| Docs | Are README, release, API, testing, or deployment docs updated when public behavior changes? |
| Hygiene | Does `npm run hygiene` pass from a clean checkout? |

## Release process

A release should come from `main` after the hygiene gate passes. Update `CHANGELOG.md`, verify `docs/RELEASE_1_0.md` or the latest release note, run `npm run hygiene`, then tag the validated commit.
