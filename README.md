# Наследие Ферганы — Frontend

Виртуальный тур по историко-архитектурному наследию г. Фергана XIX–начала XX века.

## Стек
- **Next.js 14** (App Router, SSR/SSG)
- **TypeScript** (строгая типизация)
- **Tailwind CSS** (дизайн-система 19 века)
- **React Query + Axios** (работа с API)
- **Framer Motion** (анимации)

## Структура проекта

```
src/
├── types/
│   ├── heritage.ts     # Типы ОКН, локализация
│   └── api.ts          # Типы API
├── lib/
│   ├── axios.ts        # Axios instance
│   └── queryClient.ts  # React Query config
├── i18n/
│   ├── ru.ts           # Русские переводы
│   ├── uz.ts           # Узбекские переводы
│   └── index.ts        # Context провайдер
├── mocks/
│   └── heritage.ts     # Моковые данные 6 ОКН
├── hooks/
│   ├── useHeritageListQuery.ts
│   └── useHeritageQuery.ts
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
    ├── layout.tsx              # Root layout (шрифты)
    ├── page.tsx                # Редирект → /ru
    ├── globals.css
    └── [locale]/
        ├── layout.tsx          # Locale layout + Providers
        ├── page.tsx            # Главная страница
        └── heritage/[id]/
            ├── page.tsx        # SSR страница ОКН
            └── HeritageDetailClient.tsx
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
