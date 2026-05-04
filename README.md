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

Раздел ниже генерируется автоматически командой `npm run docs:update`. Корни и исключения задаются в [`docs/structure.config.json`](docs/structure.config.json).

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
├── entities
│   ├── heritage
│   │   ├── model
│   │   │   └── types.ts
│   │   └── index.ts
│   └── seo
│       ├── model
│       │   ├── factories
│       │   │   ├── buildHeritageMetadata.ts
│       │   │   ├── buildHeritageStructuredData.ts
│       │   │   ├── buildHomeMetadata.ts
│       │   │   ├── buildHomeStructuredData.ts
│       │   │   └── buildPageMetadata.ts
│       │   ├── contentPlan.ts
│       │   ├── sitemapEntries.ts
│       │   └── types.ts
│       └── index.ts
├── features
│   ├── heritageNavigation
│   │   ├── ui
│   │   │   ├── HeritageNavDropdown.tsx
│   │   │   └── LandmarksNavList.tsx
│   │   └── index.ts
│   ├── languageSwitch
│   │   ├── ui
│   │   │   └── LanguageSwitch.tsx
│   │   └── index.ts
│   ├── mobileMenu
│   │   ├── model
│   │   │   └── useMobileMenu.ts
│   │   └── index.ts
│   ├── seo
│   │   ├── ui
│   │   │   ├── HeritageJsonLdFeature.tsx
│   │   │   └── HomeJsonLdFeature.tsx
│   │   └── index.ts
│   └── themeToggle
│       ├── ui
│       │   └── ThemeToggle.tsx
│       └── index.ts
├── hooks
│   └── useHeritageListQuery.ts
├── i18n
│   ├── index.ts
│   ├── locale.ts
│   ├── navigation.ts
│   ├── request.ts
│   ├── routing.ts
│   ├── ru.ts
│   └── uz.ts
├── lib
│   ├── analytics
│   │   ├── AnalyticsPageTracker.tsx
│   │   ├── GoogleAnalytics.tsx
│   │   ├── index.ts
│   │   └── YandexMetrika.tsx
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
│   │   ├── listVisibility.ts
│   │   ├── readModel.ts
│   │   └── schemas.ts
│   └── queryClient.ts
├── mocks
│   ├── heritage
│   │   └── rawMockHeritageObjects.ts
│   └── heritage.ts
├── pageSlices
│   ├── heritageDetail
│   │   ├── model
│   │   │   └── metadata.ts
│   │   ├── ui
│   │   │   ├── HeritageDetailPageView.tsx
│   │   │   └── NextHeritagePrefetch.tsx
│   │   └── index.ts
│   └── home
│       ├── model
│       │   └── metadata.ts
│       ├── ui
│       │   └── HomePageView.tsx
│       └── index.ts
├── processes
├── shared
│   ├── config
│   │   └── index.ts
│   ├── lib
│   │   ├── analytics
│   │   │   ├── core.ts
│   │   │   ├── events.ts
│   │   │   ├── index.ts
│   │   │   ├── provider.tsx
│   │   │   └── schema.ts
│   │   ├── i18n
│   │   │   ├── DocumentLangSync.tsx
│   │   │   └── index.ts
│   │   ├── image
│   │   │   └── placeholder.ts
│   │   ├── react
│   │   │   └── cache.ts
│   │   └── seo
│   │       ├── absolutizeMediaUrl.ts
│   │       ├── paths.ts
│   │       ├── serverSeoEnv.ts
│   │       └── sitemapConfig.ts
│   └── ui
│       ├── DecorativeFlourish.tsx
│       ├── ErrorOrNotFoundShell.tsx
│       ├── index.ts
│       ├── JsonLdScript.tsx
│       ├── LoadingSpinner.tsx
│       ├── NavigatorBackButton.tsx
│       ├── NotFoundView.tsx
│       ├── OrnamentalDivider.tsx
│       ├── RenderOnView.tsx
│       ├── UiBadge.tsx
│       └── UiCtaButton.tsx
├── styles
│   └── globals.css
├── types
│   └── api.ts
├── widgets
│   ├── header
│   │   ├── ui
│   │   │   ├── Header.tsx
│   │   │   ├── HeaderWidget.tsx
│   │   │   └── MobileNavDrawer.tsx
│   │   └── index.ts
│   └── heritage
│       ├── lib
│       │   └── heritageDetailLocale.ts
│       ├── ui
│       │   ├── heritageDetail
│       │   │   ├── HeritageDetailArchitectBio.tsx
│       │   │   ├── HeritageDetailArchitecture.tsx
│       │   │   ├── HeritageDetailAudio.tsx
│       │   │   ├── HeritageDetailBeforeAfter.tsx
│       │   │   ├── HeritageDetailClosingRule.tsx
│       │   │   ├── HeritageDetailFigures.tsx
│       │   │   ├── HeritageDetailGallery.tsx
│       │   │   ├── HeritageDetailHero.tsx
│       │   │   ├── HeritageDetailHistory.tsx
│       │   │   ├── HeritageDetailMediaAttribution.tsx
│       │   │   ├── HeritageDetailPurpose.tsx
│       │   │   ├── HeritageDetailSection.tsx
│       │   │   └── HeritageDetailVisualNotes.tsx
│       │   ├── BeforeAfterSlider.tsx
│       │   ├── HeritageCard.tsx
│       │   ├── HeritageDetail.tsx
│       │   ├── HeritageDetailWidget.tsx
│       │   └── HeritageObjectsSection.tsx
│       └── index.ts
└── env.ts

tests
├── components
│   ├── DecorativeFlourish.test.tsx
│   └── HeritageObjectsSection.test.tsx
├── e2e
│   └── smoke.spec.ts
├── i18n
│   └── routing.test.ts
├── lib
│   ├── analytics
│   │   └── analyticsFacade.test.ts
│   ├── heritage
│   │   ├── getHeritageById.test.ts
│   │   ├── getHeritageList.test.ts
│   │   ├── getHeritageSlugs.test.ts
│   │   └── schemas.test.ts
│   └── seo
│       ├── __snapshots__
│       │   └── seoSnapshots.test.ts.snap
│       ├── buildHeritageGraph.test.ts
│       ├── buildHomeGraph.test.ts
│       ├── buildPageMetadata.test.ts
│       ├── criticalSeo.test.ts
│       └── seoSnapshots.test.ts
├── mocks
│   └── heritage.test.ts
└── setup.ts
```

<!-- docs:structure:end -->

## Architectural guardrails

<!-- docs:guardrails:start -->

Reserved Next.js directory rules (from docs/structure.config.json):

- forbidden top-level dirs in src: pages, api
- preferred FSD page layer dir: pageSlices
- allowed API dirs: app/api
<!-- docs:guardrails:end -->

## Скрипты

```bash
npm run dev
npm run build
npm run start
npm run fix
npm run check:all
npm run check:imports
npm run lint:boundaries
npm run test:e2e
npm run docs:update
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
- В CI (`.github/workflows/ci.yml`) выполняются `npm ci`, `npm run check:all`, `npm run docs:check`.
