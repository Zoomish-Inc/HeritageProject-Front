import type { Locale } from '@/entities/heritage';

export function getMediaSourceResourceLabel(
	sourceUrl: string | undefined,
	locale: Locale
): string | undefined {
	const raw = sourceUrl?.trim();
	if (!raw) return undefined;
	try {
		const host = new URL(raw).hostname.toLowerCase();
		if (
			host === 'avatars.mds.yandex.net' ||
			host.startsWith('yandex.') ||
			host.endsWith('.yandex.ru') ||
			host.endsWith('.yandex.uz') ||
			host.endsWith('.yandex.com')
		) {
			return locale === 'uz' ? 'Yandex' : 'Яндекс';
		}
		if (
			host === 'upload.wikimedia.org' ||
			host.endsWith('.wikipedia.org') ||
			host === 'commons.wikimedia.org'
		) {
			return locale === 'uz' ? 'Vikipediya' : 'Википедия';
		}
		if (host.endsWith('wikimapia.org')) {
			return locale === 'uz' ? 'Wikimapia' : 'Викимапия';
		}
		return undefined;
	} catch {
		return undefined;
	}
}

export function resolvePhotoAttributionSourceUrl(
	sourceUrl: string | undefined,
	mediaUrl: string | undefined,
	locale: Locale
): string | undefined {
	const trimmed = sourceUrl?.trim();
	if (trimmed) return trimmed;
	const media = mediaUrl?.trim();
	if (!media || !/^https?:\/\//i.test(media)) return undefined;
	return getMediaSourceResourceLabel(media, locale) ? media : undefined;
}
