# ADR 0001: FSD migration baseline

## Status

Accepted

## Context

Code grew around `src/components` and `src/lib`, which increased coupling between UI, domain, and infra concerns.

## Decision

Adopt Feature-Sliced Design layout:

- `app` for Next routing/composition
- `widgets` for composed page blocks
- `features` for user actions
- `entities` for domain models/business logic
- `shared` for reusable ui/lib/config/api/types

Use layer-oriented import aliases and lint guardrails to keep boundaries explicit.

## Consequences

- Better scalability and clearer ownership per module.
- Migration requires temporary compatibility re-exports.
- New code must target FSD layers first.
