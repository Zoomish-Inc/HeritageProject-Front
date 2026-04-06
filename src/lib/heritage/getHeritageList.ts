import { getApiBaseUrl } from '@/env';
import { MOCK_HERITAGE_LIST_RESPONSE } from '@/mocks/heritage';
import type { HeritageListItem } from '@/types/heritage';
import { isHeritageMockEnabled } from './config';
import { parseHeritageListResponseJson } from './schemas';

const heritageFetchTimeoutMs = 15000;

export async function loadHeritageList(cacheOptions?: {
	next?: { revalidate: number };
}): Promise<HeritageListItem[]> {
	if (isHeritageMockEnabled()) {
		return parseHeritageListResponseJson(MOCK_HERITAGE_LIST_RESPONSE);
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
	return parseHeritageListResponseJson(json);
}

export async function heritageListQueryFn(): Promise<HeritageListItem[]> {
	const isServer = typeof window === 'undefined';
	return loadHeritageList(isServer ? { next: { revalidate: 3600 } } : undefined);
}
