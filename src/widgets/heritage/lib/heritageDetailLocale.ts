import type { Locale, LocalizedString } from '@/entities/heritage';

export function localizedTrim(
	s: LocalizedString | undefined,
	locale: Locale
): string {
	if (!s) return '';
	return (s[locale] ?? '').trim();
}

export function localizedTrimEither(s: LocalizedString | undefined): boolean {
	if (!s) return false;
	return s.ru.trim().length > 0 || s.uz.trim().length > 0;
}
