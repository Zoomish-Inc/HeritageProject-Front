import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { ru } from './ru';
import { uz } from './uz';

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale;
	if (!locale || !routing.locales.includes(locale as 'ru' | 'uz')) {
		locale = routing.defaultLocale;
	}
	return {
		locale,
		messages: locale === 'uz' ? uz : ru,
	};
});
