import { notFound } from 'next/navigation';
import { appLocales } from './routing';

export type Locale = (typeof appLocales)[number];

export function isSupportedLocale(locale: string): locale is Locale {
	return appLocales.includes(locale as Locale);
}

export function assertLocaleOrNotFound(locale: string): Locale {
	if (!isSupportedLocale(locale)) {
		notFound();
	}
	return locale;
}
