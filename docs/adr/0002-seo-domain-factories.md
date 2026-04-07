# ADR 0002: SEO domain factories

## Status

Accepted

## Context

SEO metadata and JSON-LD logic were spread across multiple utility files with duplicated patterns for home/detail pages.

## Decision

Create `entities/seo` as a dedicated domain module:

- `contentPlan` for centralized keywords/templates
- `factories` for metadata and structured data generation
- legacy `src/lib/seo/*` kept as compatibility re-exports during migration

## Consequences

- Consistent SEO output across locales/pages.
- Easier extension of SEO policies (verification, organization, search action).
- Snapshot tests can assert generated metadata/JSON-LD deterministically.
