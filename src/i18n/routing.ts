import { defineRouting } from 'next-intl/routing';

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

const oneYearSeconds = 60 * 60 * 24 * 365;

export const routing = defineRouting({
	locales: ['ru', 'uz'],
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
