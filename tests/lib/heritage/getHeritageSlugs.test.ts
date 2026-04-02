import { describe, expect, it, vi } from 'vitest';
import { MOCK_HERITAGE_OBJECTS } from '@/mocks/heritage';

vi.mock('@/lib/heritage/config', () => ({
	isHeritageMockEnabled: vi.fn(),
}));

vi.mock('@/lib/heritage/getHeritageList', () => ({
	loadHeritageList: vi.fn(),
}));

import { isHeritageMockEnabled } from '@/lib/heritage/config';
import { loadHeritageList } from '@/lib/heritage/getHeritageList';
import { getHeritageSlugsForStaticParams } from '@/lib/heritage/getHeritageSlugs';

describe('getHeritageSlugsForStaticParams', () => {
	it('returns slugs from mock objects when mock mode is on', async () => {
		vi.mocked(isHeritageMockEnabled).mockReturnValue(true);
		const slugs = await getHeritageSlugsForStaticParams();
		expect(slugs).toEqual(MOCK_HERITAGE_OBJECTS.map((o) => o.slug));
		expect(loadHeritageList).not.toHaveBeenCalled();
	});

	it('returns slugs from API list when mock mode is off', async () => {
		vi.mocked(isHeritageMockEnabled).mockReturnValue(false);
		vi.mocked(loadHeritageList).mockResolvedValue([
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
});
