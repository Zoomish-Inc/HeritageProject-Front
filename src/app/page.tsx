import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LOCALE_COOKIE_NAME, routing } from '@/i18n/routing';

export default function RootPage() {
	const preferred = cookies().get(LOCALE_COOKIE_NAME)?.value;
	const locale =
		preferred && (routing.locales as readonly string[]).includes(preferred)
			? preferred
			: routing.defaultLocale;
	redirect(`/${locale}`);
}
