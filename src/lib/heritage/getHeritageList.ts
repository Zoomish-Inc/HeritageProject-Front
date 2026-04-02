import { cache } from 'react';
import { getApiBaseUrl } from '@/env';
import { MOCK_HERITAGE_LIST } from '@/mocks/heritage';
import type { ApiResponse, HeritageListItem } from '@/types/heritage';
import { isHeritageMockEnabled } from './config';

export async function loadHeritageList(cacheOptions?: {
	next?: { revalidate: number };
}): Promise<HeritageListItem[]> {
	if (isHeritageMockEnabled()) {
		return MOCK_HERITAGE_LIST;
	}
	const res = await fetch(`${getApiBaseUrl()}/api/v1/heritage/`, {
		headers: { Accept: 'application/json' },
		...(cacheOptions ?? {}),
	});
	if (!res.ok) {
		throw new Error(`Heritage list fetch failed: ${res.status}`);
	}
	const json = (await res.json()) as ApiResponse<HeritageListItem[]>;
	return json.data;
}

export const getHeritageList = cache(() =>
	loadHeritageList({ next: { revalidate: 3600 } })
);
