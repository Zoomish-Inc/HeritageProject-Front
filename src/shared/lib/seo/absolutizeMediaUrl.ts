export function absolutizeMediaUrl(url: string, base: URL): string {
	try {
		return new URL(url, base).toString();
	} catch {
		return url;
	}
}
