import { getApiBaseUrl } from '@/env';
import { MOCK_HERITAGE_LIST_RESPONSE } from '@/mocks/heritage';
import type { HeritageListItem } from '@/entities/heritage';
import * as React from 'react';
import { isHeritageMockEnabled } from './config';
import { parseHeritageListResponseJson } from './schemas';

const heritageFetchTimeoutMs = 15000;

const heritageListNextRevalidate = { next: { revalidate: 3600 } } as const;

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

const cacheFn =
	typeof React.cache === 'function'
		? React.cache
		: <A extends unknown[], R>(fn: (...args: A) => R) => fn;

export const loadHeritageListForRequest = cacheFn(async () =>
	loadHeritageList(heritageListNextRevalidate)
);

export async function heritageListQueryFn(): Promise<HeritageListItem[]> {
	if (typeof window === 'undefined') {
		return loadHeritageListForRequest();
	}
	return loadHeritageList();
}
