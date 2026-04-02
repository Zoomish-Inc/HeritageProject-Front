# Наследие Ферганы — Frontend

Виртуальный тур по историко-архитектурному наследию г. Фергана XIX–начала XX века.

## Стек

- **Next.js 14** (App Router, SSR/SSG)
- **TypeScript** (строгая типизация)
- **Tailwind CSS** (дизайн-система 19 века)
- **React Query** (клиентский кэш, гидратация списка)
- **next-intl** (локализация `ru` / `uz`)
- **Zod** (валидация публичных env)

## Структура проекта

```
src/
├── types/
│   ├── heritage.ts     # Типы ОКН, локализация
│   └── api.ts          # Типы API
├── env.ts              # NEXT_PUBLIC_* (Zod)
├── lib/
│   ├── heritage/       # getHeritageList, getHeritageById, query key
│   └── queryClient.ts
├── i18n/
│   ├── ru.ts / uz.ts   # Сообщения next-intl
│   ├── routing.ts, request.ts, navigation.ts
│   └── index.ts
├── mocks/
│   ├── heritage.ts
│   └── heritage.test.ts
├── hooks/
│   └── useHeritageListQuery.ts
├── components/
│   ├── Header/
│   │   ├── Header.tsx          # Шапка с выпадающим меню
│   │   ├── NavDropdown.tsx     # Dropdown с ОКН
│   │   └── LanguageSwitcher.tsx
│   ├── Heritage/
│   │   ├── HeritageCard.tsx    # Карточка ОКН
│   │   └── HeritageDetail.tsx  # Детальная страница
│   └── UI/
│       ├── OrnamentalDivider.tsx
│       └── LoadingSpinner.tsx
└── app/
    ├── layout.tsx              # Root layout, metadataBase, lang
    ├── page.tsx                # Редирект / → /ru или локаль из cookie
    ├── globals.css
    └── [locale]/
        ├── layout.tsx          # next-intl + prefetch списка
        ├── page.tsx            # Главная (RSC)
        ├── error.tsx / not-found.tsx
        └── heritage/[id]/
            └── page.tsx        # Деталь ОКН (RSC)
```

## Запуск

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

## Подключение бекенда

1. В `.env.local` установить `NEXT_PUBLIC_USE_MOCK=false`
2. В `NEXT_PUBLIC_API_URL` указать URL бекенда
3. Раскомментировать API-вызовы в хуках и SSR-странице

## Локализация

- Маршруты: `/ru/...` и `/uz/...`
- Middleware автоматически определяет язык из `Accept-Language`
- Переключение языка меняет URL без перезагрузки страницы
