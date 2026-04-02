import { describe, expect, it } from 'vitest';
import {
	heritageListApiResponseSchema,
	heritageObjectApiResponseSchema,
} from '@/lib/heritage/schemas';
import { MOCK_HERITAGE_LIST, MOCK_HERITAGE_OBJECTS } from '@/mocks/heritage';

describe('heritageListApiResponseSchema', () => {
	it('accepts valid list envelope', () => {
		const parsed = heritageListApiResponseSchema.safeParse({
			success: true,
			data: MOCK_HERITAGE_LIST,
		});
		expect(parsed.success).toBe(true);
		if (parsed.success) {
			expect(parsed.data.data.length).toBe(MOCK_HERITAGE_LIST.length);
		}
	});

	it('rejects when data is not an array', () => {
		const parsed = heritageListApiResponseSchema.safeParse({
			success: true,
			data: {},
		});
		expect(parsed.success).toBe(false);
	});

	it('rejects list item missing localized name', () => {
		const parsed = heritageListApiResponseSchema.safeParse({
			success: true,
			data: [
				{
					id: 'x',
					slug: 'x',
					name: { ru: 'only-ru' },
					yearBuilt: 1,
					address: { ru: 'a', uz: 'a' },
					coverImageUrl: 'https://example.com/x.jpg',
					shortDescription: { ru: 's', uz: 's' },
					order: 1,
				},
			],
		});
		expect(parsed.success).toBe(false);
	});
});

describe('heritageObjectApiResponseSchema', () => {
	it('accepts full mock object envelope', () => {
		const obj = MOCK_HERITAGE_OBJECTS[0];
		const parsed = heritageObjectApiResponseSchema.safeParse({
			success: true,
			data: obj,
		});
		expect(parsed.success).toBe(true);
		if (parsed.success) {
			expect(parsed.data.data.slug).toBe(obj.slug);
		}
	});

	it('rejects object missing required audioGuide', () => {
		const obj = MOCK_HERITAGE_OBJECTS[0];
		const broken = { ...obj, audioGuide: undefined };
		const parsed = heritageObjectApiResponseSchema.safeParse({
			success: true,
			data: broken,
		});
		expect(parsed.success).toBe(false);
	});
});
