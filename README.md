# Наследие Ферганы — Frontend

Виртуальный тур по историко-архитектурному наследию г. Фергана XIX–начала XX века.

## Стек

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **@tanstack/react-query**
- **next-intl** (`ru`, `uz`)
- **Zod** (валидация env и API-ответов)
- **Vitest + Testing Library**

## Структура проекта

Раздел ниже генерируется автоматически командой `npm run docs:sync` (алиас к `docs:structure`, с тем же форматированием README). Корни и исключения задаются в [`docs/structure.config.json`](docs/structure.config.json).

<!-- docs:structure:start -->

```text
src
├── app
│   ├── [locale]
│   │   ├── heritage
│   │   │   └── [id]
│   │   │       └── page.tsx
│   │   ├── error.tsx
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   └── providers.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components
│   ├── Header
│   │   ├── Header.tsx
│   │   ├── LandmarksNavList.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── MobileNavDrawer.tsx
│   │   ├── NavDropdown.tsx
│   │   └── ThemeToggle.tsx
│   ├── Heritage
│   │   ├── heritageDetail
│   │   │   ├── HeritageDetailArchitecture.tsx
│   │   │   ├── HeritageDetailAudio.tsx
│   │   │   ├── HeritageDetailBeforeAfter.tsx
│   │   │   ├── HeritageDetailClosingRule.tsx
│   │   │   ├── HeritageDetailFigures.tsx
│   │   │   ├── HeritageDetailHero.tsx
│   │   │   ├── HeritageDetailHistory.tsx
│   │   │   ├── HeritageDetailPurpose.tsx
│   │   │   ├── HeritageDetailSection.tsx
│   │   │   └── HeritageDetailVisualNotes.tsx
│   │   ├── BeforeAfterSlider.tsx
│   │   ├── HeritageCard.tsx
│   │   ├── HeritageDetail.tsx
│   │   └── HeritageObjectsSection.tsx
│   ├── i18n
│   │   └── DocumentLangSync.tsx
│   ├── SEO
│   │   ├── HeritageJsonLd.tsx
│   │   ├── HomeJsonLd.tsx
│   │   └── JsonLdScript.tsx
│   └── UI
│       ├── DecorativeFlourish.tsx
│       ├── ErrorOrNotFoundShell.tsx
│       ├── LoadingSpinner.tsx
│       ├── NavigatorBackButton.tsx
│       └── OrnamentalDivider.tsx
├── hooks
│   └── useHeritageListQuery.ts
├── i18n
│   ├── index.ts
│   ├── navigation.ts
│   ├── request.ts
│   ├── routing.ts
│   ├── ru.ts
│   └── uz.ts
├── lib
│   ├── heritage
│   │   ├── config.ts
│   │   ├── getHeritageById.ts
│   │   ├── getHeritageList.ts
│   │   ├── getHeritageSlugs.ts
│   │   ├── heritageListSchemas.ts
│   │   ├── heritageListWire.ts
│   │   ├── heritageObjectSchema.ts
│   │   ├── heritageSchemaPrimitives.ts
│   │   ├── listQuery.ts
│   │   └── schemas.ts
│   ├── seo
│   │   ├── absolutizeMediaUrl.ts
│   │   ├── buildHeritageGraph.ts
│   │   ├── buildHeritageMetadata.ts
│   │   ├── buildHomeGraph.ts
│   │   ├── buildHomeMetadata.ts
│   │   ├── buildPageMetadata.ts
│   │   ├── index.ts
│   │   ├── paths.ts
│   │   └── types.ts
│   └── queryClient.ts
├── mocks
│   ├── heritage
│   │   └── rawMockHeritageObjects.ts
│   └── heritage.ts
├── styles
│   └── globals.css
├── types
│   ├── api.ts
│   └── heritage.ts
└── env.ts

tests
├── components
│   ├── DecorativeFlourish.test.tsx
│   └── HeritageObjectsSection.test.tsx
├── i18n
│   └── routing.test.ts
├── lib
│   ├── heritage
│   │   ├── getHeritageById.test.ts
│   │   ├── getHeritageList.test.ts
│   │   ├── getHeritageSlugs.test.ts
│   │   └── schemas.test.ts
│   └── seo
│       ├── buildHeritageGraph.test.ts
│       └── buildPageMetadata.test.ts
├── mocks
│   └── heritage.test.ts
└── setup.ts
```

<!-- docs:structure:end -->

## Скрипты

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run check-lint
npm run check-format
npm run fix
npm run docs:sync
npm run docs:structure
npm run docs:check
npm test
```

## Локальный запуск

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

## Роутинг и рендеринг

- `/` — редирект на локализованный маршрут.
- `/{locale}` — главная страница (`ru` или `uz`).
- `/{locale}/heritage/{id}` — страница объекта наследия, рендерится динамически на запрос.
- `middleware.ts` обрабатывает локаль и перенаправления.

## Моки и API

- Моки активируются только при `NEXT_PUBLIC_USE_MOCK=true`.
- Для backend-режима укажите `NEXT_PUBLIC_API_URL`.
- API-ответы валидируются в `src/lib/heritage/schemas.ts`.

## Тесты и CI

- Unit-тесты лежат в `tests/`, окружение и cleanup — `tests/setup.ts`.
- В CI (`.github/workflows/ci.yml`) выполняются `npm ci`, `npm test`, `npm run lint`, `npm run docs:check`.
