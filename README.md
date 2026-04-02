# Наследие Ферганы — Frontend

Виртуальный тур по историко-архитектурному наследию г. Фергана XIX–начала XX века.

## Стек

- **Next.js 14** (App Router, SSR/SSG)
- **TypeScript** (строгая типизация)
- **Tailwind CSS** (дизайн-система 19 века)
- **React Query** (клиентский кэш, гидратация списка)
- **next-intl** (локализация `ru` / `uz`)
- **Zod** (env и ответы API heritage)

## Структура проекта

```
src/
├── types/
│   ├── heritage.ts     # Типы ОКН, локализация
│   └── api.ts          # Типы API
├── env.ts              # NEXT_PUBLIC_* (Zod)
├── lib/
│   ├── heritage/       # load*, queryFn, Zod-схемы, slugs для SSG
│   ├── seo/            # buildLocaleMetadata
│   └── queryClient.ts
├── i18n/
│   ├── ru.ts / uz.ts   # Сообщения next-intl
│   ├── routing.ts, request.ts, navigation.ts
│   └── index.ts
├── mocks/
│   └── heritage.ts
├── hooks/
│   └── useHeritageListQuery.ts
├── components/
│   ├── Header/
│   │   ├── Header.tsx          # Шапка с выпадающим меню
│   │   ├── NavDropdown.tsx     # Dropdown с ОКН
│   │   └── LanguageSwitcher.tsx
│   ├── Heritage/
│   │   ├── HeritageCard.tsx
│   │   ├── HeritageObjectsSection.tsx  # список (React Query)
│   │   ├── HeritageDetail.tsx
│   │   └── heritageDetail/     # секции карточки объекта
│   └── UI/
│       ├── OrnamentalDivider.tsx
│       ├── DecorativeFlourish.tsx
│       └── LoadingSpinner.tsx
└── app/
    ├── layout.tsx              # Root layout, metadataBase, lang
    ├── page.tsx                # Редирект / → /ru или локаль из cookie
    ├── globals.css
    └── [locale]/
        ├── layout.tsx          # next-intl + prefetch списка
        ├── page.tsx            # Главная: герой RSC + сетка (клиент)
        ├── error.tsx / not-found.tsx
        └── heritage/[id]/
            └── page.tsx        # Деталь ОКН (RSC)

tests/                    # Vitest (отдельно от src)
├── setup.ts
├── lib/, i18n/, components/, mocks/  # зеркально по смыслу
└── *.test.ts / *.test.tsx
```

## Запуск

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

## Тесты

```bash
npm test
```

Vitest (jsdom): unit-тесты в каталоге [`tests/`](tests/) — Zod-схемы, `loadHeritageList` / `loadHeritageById`, `buildLocaleMetadata`, `getHeritageSlugsForStaticParams`, `routing`, моки и часть UI (`DecorativeFlourish`, `HeritageObjectsSection`). После каждого теста вызывается `cleanup`: [`tests/setup.ts`](tests/setup.ts).

На push/PR в `main` или `master` в GitHub Actions выполняются `npm ci`, `npm test`, `npm run lint` (workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml)).

## Моки и API

- **Моки включены только при** `NEXT_PUBLIC_USE_MOCK=true` (так в `.env.local.example`).
- Для работы с бекендом: уберите переменную или установите любое значение, кроме `true`, и задайте `NEXT_PUBLIC_API_URL`. Ответы `/api/v1/heritage/` валидируются Zod-схемами в `src/lib/heritage/schemas.ts`.

## Локализация

- Маршруты: `/ru/...` и `/uz/...`
- Middleware автоматически определяет язык из `Accept-Language`
- Переключение языка меняет URL без перезагрузки страницы
