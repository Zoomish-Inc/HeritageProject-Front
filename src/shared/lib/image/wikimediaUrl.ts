const wikimediaUploadHost = /^upload\.wikimedia\.org$/i;

export function normalizeWikimediaImageUrl(url: string): string {
	if (!url.trim() || !/^https?:\/\//i.test(url)) {
		return url;
	}
	try {
		const parsed = new URL(url);
		if (!wikimediaUploadHost.test(parsed.hostname)) {
			return url;
		}
		parsed.search = '';
		parsed.hash = '';

		const thumbMarker = '/commons/thumb/';
		const thumbIndex = parsed.pathname.indexOf(thumbMarker);
		if (thumbIndex === -1) {
			return parsed.toString();
		}

		const parts = parsed.pathname.split('/');
		const thumbPos = parts.indexOf('thumb');
		if (thumbPos < 0 || parts.length < thumbPos + 5) {
			return parsed.toString();
		}

		const hash1 = parts[thumbPos + 1];
		const hash2 = parts[thumbPos + 2];
		const filename = parts[thumbPos + 3];
		if (!hash1 || !hash2 || !filename) {
			return parsed.toString();
		}

		parsed.pathname = `/wikipedia/commons/${hash1}/${hash2}/${filename}`;
		return parsed.toString();
	} catch {
		return url;
	}
}
