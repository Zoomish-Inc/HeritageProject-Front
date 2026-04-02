import { describe, expect, it } from 'vitest';
import { heritageListApiResponseSchema } from '@/lib/heritage/schemas';
import { getMockHeritageById, MOCK_HERITAGE_LIST } from './heritage';

describe('heritageListApiResponseSchema', () => {
	it('accepts API-shaped list payload', () => {
		const parsed = heritageListApiResponseSchema.safeParse({
			success: true,
			data: MOCK_HERITAGE_LIST,
		});
		expect(parsed.success).toBe(true);
		if (parsed.success) {
			expect(parsed.data.data).toHaveLength(MOCK_HERITAGE_LIST.length);
		}
	});
});

describe('getMockHeritageById', () => {
	it('resolves by slug', () => {
		const obj = getMockHeritageById('voennoye-sobranie');
		expect(obj).toBeDefined();
		expect(obj?.slug).toBe('voennoye-sobranie');
	});

	it('resolves by id', () => {
		const obj = getMockHeritageById('1');
		expect(obj).toBeDefined();
		expect(obj?.id).toBe('1');
	});

	it('returns undefined for unknown id', () => {
		expect(getMockHeritageById('unknown-slug')).toBeUndefined();
	});
});
