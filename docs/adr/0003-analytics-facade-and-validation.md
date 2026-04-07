# ADR 0003: Analytics facade and validation

## Status

Accepted

## Context

Raw event names were called directly from UI, making analytics brittle and harder to evolve across providers.

## Decision

Use a single analytics facade in `shared/lib/analytics`:

- typed wrappers per business event
- zod payload validation in development
- queue/retry delivery for delayed provider initialization
- pluggable provider model (`ga`, `plausible`, `posthog`)

## Consequences

- Safer event contracts and easier provider switches.
- Minimal UI coupling to analytics transport details.
- Additional test surface for provider behavior and queue semantics.
