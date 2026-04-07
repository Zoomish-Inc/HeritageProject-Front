# ADR 0004: Reserved Next directories guardrail

## Status

Accepted

## Context

Next.js treats `pages` and `api` as reserved router directories. Our FSD layer previously used `src/pages`, which caused build-time route conflicts and false page discovery.

## Decision

Enforce reserved naming constraints:

- FSD page-layer modules must live in `src/pageSlices`
- `src/pages` is forbidden
- `src/api` is forbidden
- Route handlers must use `src/app/api`

Add `scripts/checkReservedDirs.mjs` and include it in `check:all` (therefore in CI) to fail fast if forbidden directories appear in `src`.

## Consequences

- Prevents accidental Next router conflicts from future refactors.
- Keeps App Router behavior predictable in dev, CI, and production.
- Adds one more structural gate to quality checks.
