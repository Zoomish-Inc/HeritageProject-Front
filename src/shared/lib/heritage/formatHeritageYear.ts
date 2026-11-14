export function formatHeritageYear(item: {
	yearRange?: string | null;
	yearBuilt?: number | null;
}): string {
	const range = item.yearRange?.trim() ?? '';
	if (range) return range;
	if (typeof item.yearBuilt === 'number' && item.yearBuilt > 0) {
		return String(item.yearBuilt);
	}
	return '';
}
