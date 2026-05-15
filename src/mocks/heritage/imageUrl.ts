const imageExtensionPattern = /\.(avif|gif|jpe?g|png|webp)(\?.*)?$/i;

const directImageHostPatterns = [
	/^upload\.wikimedia\.org$/i,
	/^commons\.wikimedia\.org$/i,
];

export function isDirectImageUrl(url: string): boolean {
	if (!/^https?:\/\//i.test(url)) {
		return false;
	}
	try {
		const parsed = new URL(url);
		if (directImageHostPatterns.some((pattern) => pattern.test(parsed.hostname))) {
			return true;
		}
		return imageExtensionPattern.test(parsed.pathname);
	} catch {
		return false;
	}
}
