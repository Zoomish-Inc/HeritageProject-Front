import { cache } from 'react';
import { getApiBaseUrl } from '@/env';
import { getMockHeritageById } from '@/mocks/heritage';
import type { HeritageObject } from '@/types/heritage';
import { isHeritageMockEnabled } from './config';
import { heritageObjectApiResponseSchema } from './schemas';

export async function loadHeritageById(
	id: string,
	cacheOptions?: { next?: { revalidate: number } }
): Promise<HeritageObject | null> {
	if (isHeritageMockEnabled()) {
		return getMockHeritageById(id) ?? null;
	}
	const encoded = encodeURIComponent(id);
	const res = await fetch(`${getApiBaseUrl()}/api/v1/heritage/${encoded}/`, {
		headers: { Accept: 'application/json' },
		...(cacheOptions ?? {}),
	});
	if (res.status === 404) {
		return null;
	}
	if (!res.ok) {
		throw new Error(`Heritage fetch failed: ${res.status}`);
	}
	const json: unknown = await res.json();
	const parsed = heritageObjectApiResponseSchema.safeParse(json);
	if (!parsed.success) {
		throw new Error(`Heritage object response invalid: ${parsed.error.message}`);
	}
	return parsed.data.data;
}

export const getHeritageById = cache((id: string) =>
	loadHeritageById(id, { next: { revalidate: 3600 } })
);
