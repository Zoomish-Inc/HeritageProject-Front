import { describe, expect, it, vi } from 'vitest';
import { MOCK_HERITAGE_LIST } from '@/mocks/heritage';

vi.mock('@/lib/heritage/config', () => ({
	isHeritageMockEnabled: vi.fn(),
}));

vi.mock('@/lib/heritage/getHeritageList', () => ({
	loadHeritageListForRequest: vi.fn(),
}));

import { isHeritageMockEnabled } from '@/lib/heritage/config';
import { loadHeritageListForRequest } from '@/lib/heritage/getHeritageList';
import { getHeritageSlugsForStaticParams } from '@/lib/heritage/getHeritageSlugs';

describe('getHeritageSlugsForStaticParams', () => {
	it('returns slugs from cached list in mock mode', async () => {
		vi.mocked(isHeritageMockEnabled).mockReturnValue(true);
		vi.mocked(loadHeritageListForRequest).mockResolvedValue(MOCK_HERITAGE_LIST);
		const slugs = await getHeritageSlugsForStaticParams();
		expect(slugs).toEqual(MOCK_HERITAGE_LIST.map((o) => o.slug));
	});

	it('returns slugs from API list when mock mode is off', async () => {
		vi.mocked(isHeritageMockEnabled).mockReturnValue(false);
		vi.mocked(loadHeritageListForRequest).mockResolvedValue([
			{
				id: '1',
				slug: 'from-api',
				name: { ru: 'r', uz: 'u' },
				yearBuilt: 1900,
				address: { ru: 'r', uz: 'u' },
				coverImageUrl: 'https://example.com/a.jpg',
				shortDescription: { ru: 'r', uz: 'u' },
				order: 1,
			},
		]);
		const slugs = await getHeritageSlugsForStaticParams();
		expect(slugs).toEqual(['from-api']);
	});

	it('omits unpublished list items', async () => {
		vi.mocked(isHeritageMockEnabled).mockReturnValue(false);
		vi.mocked(loadHeritageListForRequest).mockResolvedValue([
			{
				id: '1',
				slug: 'live',
				name: { ru: 'r', uz: 'u' },
				yearBuilt: 1900,
				address: { ru: 'r', uz: 'u' },
				coverImageUrl: 'https://example.com/a.jpg',
				shortDescription: { ru: 'r', uz: 'u' },
				order: 1,
			},
			{
				id: '2',
				slug: 'draft',
				name: { ru: 'd', uz: 'd' },
				yearBuilt: 1900,
				address: { ru: 'd', uz: 'd' },
				coverImageUrl: 'https://example.com/b.jpg',
				shortDescription: { ru: 'd', uz: 'd' },
				order: 2,
				isPublished: false,
			},
		]);
		const slugs = await getHeritageSlugsForStaticParams();
		expect(slugs).toEqual(['live']);
	});
});
