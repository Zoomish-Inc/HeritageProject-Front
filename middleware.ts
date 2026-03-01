import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOCALES = ['ru', 'uz'];
const DEFAULT_LOCALE = 'ru';

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check if pathname has a locale prefix
	const hasLocale = LOCALES.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	);

	if (!hasLocale && pathname === '/') {
		// Try to detect from Accept-Language header
		const acceptLanguage = request.headers.get('accept-language') ?? '';
		const preferred = acceptLanguage
			.split(',')[0]
			?.split('-')[0]
			?.toLowerCase();
		const locale = LOCALES.includes(preferred) ? preferred : DEFAULT_LOCALE;
		return NextResponse.redirect(new URL(`/${locale}`, request.url));
	}
}

export const config = {
	matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
};
