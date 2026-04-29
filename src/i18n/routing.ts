import { defineRouting } from 'next-intl/routing';

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
export const appLocales = ['ru', 'uz'] as const;

const oneYearSeconds = 60 * 60 * 24 * 365;

export const routing = defineRouting({
	locales: appLocales,
	defaultLocale: 'ru',
	localePrefix: 'always',
	localeCookie: {
		name: LOCALE_COOKIE_NAME,
		maxAge: oneYearSeconds,
		sameSite: 'lax',
		path: '/',
	},
	localeDetection: true,
});
