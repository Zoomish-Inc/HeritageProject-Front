import type { LocalizedString } from '@/entities/heritage';

export const emptyLocalized = (): LocalizedString => ({ ru: '', uz: '' });

export function localizedNonEmpty(s: LocalizedString): boolean {
	return s.ru.trim().length > 0 || s.uz.trim().length > 0;
}

export function resolveOptionalImageUrl(
	camel: unknown,
	snake: unknown
): string | undefined {
	const raw = camel ?? snake;
	if (typeof raw !== 'string') return undefined;
	const trimmed = raw.trim();
	return trimmed !== '' ? trimmed : undefined;
}

export function mapArrayFromApi<T>(
	value: unknown,
	mapItem: (item: Record<string, unknown>) => T | null,
	scope: string
): T[] {
	if (!Array.isArray(value)) {
		if (value !== undefined && value !== null && process.env.NODE_ENV === 'development') {
			console.warn(`[heritage] ${scope}: expected array`);
		}
		return [];
	}

	const mapped: T[] = [];
	let skipped = 0;

	for (const item of value) {
		if (!item || typeof item !== 'object') {
			skipped++;
			continue;
		}
		const result = mapItem(item as Record<string, unknown>);
		if (result) mapped.push(result);
		else skipped++;
	}

	if (skipped > 0 && process.env.NODE_ENV === 'development') {
		console.warn(`[heritage] ${scope}: skipped ${skipped} item(s)`);
	}

	return mapped;
}
