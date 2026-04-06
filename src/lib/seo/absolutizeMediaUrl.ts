import { getMetadataBaseUrl } from '@/env';

export function absolutizeMediaUrl(url: string, base?: URL): string {
	if (!url) return url;
	const resolvedBase = base ?? getMetadataBaseUrl();
	try {
		if (/^https?:\/\//i.test(url)) return url;
		const path = url.startsWith('/') ? url : `/${url}`;
		return new URL(path, resolvedBase).toString();
	} catch {
		return url;
	}
}
