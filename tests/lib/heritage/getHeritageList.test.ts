import { describe, expect, it, vi } from 'vitest';
import { loadHeritageList } from '@/lib/heritage/getHeritageList';
import { heritageListItemsToApiWire } from '@/lib/heritage/heritageListWire';
import { MOCK_HERITAGE_LIST } from '@/mocks/heritage';

vi.mock('@/lib/heritage/config', () => ({
	isHeritageMockEnabled: vi.fn(),
}));

import { isHeritageMockEnabled } from '@/lib/heritage/config';

describe('loadHeritageList', () => {
	it('returns mock list when mock mode is on', async () => {
		vi.mocked(isHeritageMockEnabled).mockReturnValue(true);
		const list = await loadHeritageList();
		expect(list).toBe(MOCK_HERITAGE_LIST);
	});

	it('fetches and parses API response when mock mode is off', async () => {
		vi.mocked(isHeritageMockEnabled).mockReturnValue(false);
		const payload = {
			success: true,
			message: null,
			data: heritageListItemsToApiWire(MOCK_HERITAGE_LIST),
		};
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => payload,
		});

		const list = await loadHeritageList();
		expect(list).toEqual(MOCK_HERITAGE_LIST);
		expect(global.fetch).toHaveBeenCalled();
	});

	it('throws on non-ok response', async () => {
		vi.mocked(isHeritageMockEnabled).mockReturnValue(false);
		global.fetch = vi.fn().mockResolvedValue({
			ok: false,
			status: 503,
			json: async () => ({}),
		});
		await expect(loadHeritageList()).rejects.toThrow('503');
	});

	it('throws when JSON fails schema validation', async () => {
		vi.mocked(isHeritageMockEnabled).mockReturnValue(false);
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({ success: true, data: 'bad' }),
		});
		await expect(loadHeritageList()).rejects.toThrow(/invalid/i);
	});
});

describe('heritageListQueryFn', () => {
	it('delegates to loadHeritageList', async () => {
		vi.mocked(isHeritageMockEnabled).mockReturnValue(true);
		const { heritageListQueryFn } =
			await import('@/lib/heritage/getHeritageList');
		const list = await heritageListQueryFn();
		expect(list).toBe(MOCK_HERITAGE_LIST);
	});
});
