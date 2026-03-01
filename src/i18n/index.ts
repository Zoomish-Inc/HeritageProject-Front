'use client';
import { createContext, useContext } from 'react';
import { ru } from './ru';
import { uz } from './uz';
import type { Translations } from './ru';
import type { Locale } from '@/types/heritage';

export const translations: Record<Locale, Translations> = { ru, uz };

export const LocaleContext = createContext<{
	locale: Locale;
	t: Translations;
	setLocale: (l: Locale) => void;
}>({
	locale: 'ru',
	t: ru,
	setLocale: () => {},
});

export const useLocale = () => useContext(LocaleContext);
export { type Translations };
