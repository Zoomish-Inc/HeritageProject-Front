import { getMetadataBaseUrl } from '@/env';

export function resolveTourEmbedUrl(tourEntryUrl: string): string {
	const trimmed = tourEntryUrl.trim();
	if (!trimmed) return trimmed;

	if (trimmed.startsWith('/')) {
		return trimmed;
	}

	try {
		const parsed = new URL(trimmed);
		if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
			throw new Error('unsupported protocol');
		}
		const siteOrigin = getMetadataBaseUrl().origin;
		if (parsed.origin !== siteOrigin) {
			return parsed.toString();
		}
		return parsed.pathname + parsed.search + parsed.hash;
	} catch {
		return trimmed;
	}
}
