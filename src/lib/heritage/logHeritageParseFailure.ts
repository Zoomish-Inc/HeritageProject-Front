import type { ZodError } from 'zod';

function summarizePayload(payload: unknown): Record<string, unknown> {
	if (!payload || typeof payload !== 'object') {
		return { type: typeof payload };
	}

	const record = payload as Record<string, unknown>;
	const summary: Record<string, unknown> = {
		keys: Object.keys(record),
	};

	if ('success' in record) summary.success = record.success;
	if ('message' in record) summary.message = record.message;

	const data = record.data;
	if (Array.isArray(data)) {
		summary.dataLength = data.length;
		summary.slugs = data
			.slice(0, 10)
			.map((item) =>
				item && typeof item === 'object' && 'slug' in item
					? (item as { slug: unknown }).slug
					: undefined
			);
	} else if (data && typeof data === 'object') {
		const row = data as Record<string, unknown>;
		if (typeof row.slug === 'string') summary.slug = row.slug;
		if (typeof row.id === 'string') summary.id = row.id;
	}

	return summary;
}

export function logHeritageParseFailure(
	scope: string,
	error: ZodError,
	payload?: unknown
): void {
	console.error(`[heritage] ${scope} parse failed`, {
		message: error.message,
		issues: error.issues,
		...(payload !== undefined ? { payload: summarizePayload(payload) } : {}),
	});
}
