import { getApiBaseUrl } from '@/env';
import { MOCK_HERITAGE_LIST } from '@/mocks/heritage';
import type { HeritageListItem } from '@/types/heritage';
import { isHeritageMockEnabled } from './config';
import { heritageListApiResponseSchema } from './schemas';

const heritageFetchTimeoutMs = 15000;

export async function loadHeritageList(cacheOptions?: {
	next?: { revalidate: number };
}): Promise<HeritageListItem[]> {
	if (isHeritageMockEnabled()) {
		return MOCK_HERITAGE_LIST;
	}
	const res = await fetch(`${getApiBaseUrl()}/api/v1/heritage/`, {
		headers: { Accept: 'application/json' },
		signal: AbortSignal.timeout(heritageFetchTimeoutMs),
		...(cacheOptions ?? {}),
	});
	if (!res.ok) {
		throw new Error(`Heritage list fetch failed: ${res.status}`);
	}
	const json: unknown = await res.json();
	const parsed = heritageListApiResponseSchema.safeParse(json);
	if (!parsed.success) {
		throw new Error(`Heritage list response invalid: ${parsed.error.message}`);
	}
	return parsed.data.data;
}

export async function heritageListQueryFn(): Promise<HeritageListItem[]> {
	const isServer = typeof window === 'undefined';
	return loadHeritageList(isServer ? { next: { revalidate: 3600 } } : undefined);
}
