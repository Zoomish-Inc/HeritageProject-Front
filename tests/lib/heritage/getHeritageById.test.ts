import { describe, expect, it, vi } from 'vitest';

vi.mock('react', async (importOriginal) => {
	const actual = await importOriginal<typeof import('react')>();
	return {
		...actual,
		cache: <T extends (arg: string) => unknown>(fn: T) => fn,
	};
});

import { loadHeritageById } from '@/lib/heritage/getHeritageById';
import { MOCK_HERITAGE_OBJECTS } from '@/mocks/heritage';

vi.mock('@/lib/heritage/config', () => ({
	isHeritageMockEnabled: vi.fn(),
}));

import { isHeritageMockEnabled } from '@/lib/heritage/config';

const first = MOCK_HERITAGE_OBJECTS[0];

describe('loadHeritageById', () => {
	it('returns mock entity by slug when mock mode is on', async () => {
		vi.mocked(isHeritageMockEnabled).mockReturnValue(true);
		const obj = await loadHeritageById(first.slug);
		expect(obj?.id).toBe(first.id);
	});

	it('returns null for unknown id in mock mode', async () => {
		vi.mocked(isHeritageMockEnabled).mockReturnValue(true);
		expect(await loadHeritageById('no-such-slug')).toBeNull();
	});

	it('returns null on API 404', async () => {
		vi.mocked(isHeritageMockEnabled).mockReturnValue(false);
		global.fetch = vi.fn().mockResolvedValue({
			ok: false,
			status: 404,
			json: async () => ({}),
		});
		expect(await loadHeritageById('x')).toBeNull();
	});

	it('parses valid API envelope', async () => {
		vi.mocked(isHeritageMockEnabled).mockReturnValue(false);
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => ({ success: true, data: first }),
		});
		const obj = await loadHeritageById(first.slug);
		expect(obj?.slug).toBe(first.slug);
	});

	it('throws when envelope fails validation', async () => {
		vi.mocked(isHeritageMockEnabled).mockReturnValue(false);
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			status: 200,
			json: async () => ({ success: true, data: { id: '1' } }),
		});
		await expect(loadHeritageById('1')).rejects.toThrow(/invalid/i);
	});
});
