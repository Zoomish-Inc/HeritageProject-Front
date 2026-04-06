import { describe, expect, it } from 'vitest';
import { heritageListItemsToApiWire } from '@/lib/heritage/heritageListWire';
import {
	heritageListApiResponseSchema,
	heritageObjectApiResponseSchema,
} from '@/lib/heritage/schemas';
import { MOCK_HERITAGE_LIST, MOCK_HERITAGE_OBJECTS } from '@/mocks/heritage';

describe('heritageListApiResponseSchema', () => {
	it('accepts valid list envelope and normalizes API rows', () => {
		const parsed = heritageListApiResponseSchema.safeParse({
			success: true,
			message: null,
			data: heritageListItemsToApiWire(MOCK_HERITAGE_LIST),
		});
		expect(parsed.success).toBe(true);
		if (parsed.success) {
			expect(parsed.data.data).toEqual(MOCK_HERITAGE_LIST);
		}
	});

	it('accepts backend sample shape', () => {
		const parsed = heritageListApiResponseSchema.safeParse({
			success: true,
			data: [
				{
					id: '6ab495cb-b13c-4f14-9c87-2ab87098407b',
					slug: 'zdanie-voennogo-sobraniya-dom-oficerov',
					name: {
						ru: 'Здание военного собрания (Дом офицеров)',
						uz: "Harbiy yig'ilish binosi (Ofitserlar uyi)",
					},
					year_built: 1878,
					year_range: '',
					address: {
						ru: 'г. Фергана, ул. Мустақиллик, 12',
						uz: "Farg'ona sh., Mustaqillik ko'ch., 12",
					},
					short_description: {
						ru: 'Одно из первых капитальных зданий.',
						uz: 'Qisqa.',
					},
					cover: 'https://example.com/cover.jpg',
					order: 1,
				},
			],
			message: null,
		});
		expect(parsed.success).toBe(true);
		if (parsed.success) {
			const row = parsed.data.data[0];
			expect(row.yearBuilt).toBe(1878);
			expect(row.yearRange).toBeUndefined();
			expect(row.coverImageUrl).toBe('https://example.com/cover.jpg');
			expect(row.shortDescription.ru).toContain('капитальных');
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
					year_built: 1,
					address: { ru: 'a', uz: 'a' },
					cover: 'https://example.com/x.jpg',
					short_description: { ru: 's', uz: 's' },
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

	it('accepts null message', () => {
		const obj = MOCK_HERITAGE_OBJECTS[0];
		const parsed = heritageObjectApiResponseSchema.safeParse({
			success: true,
			message: null,
			data: obj,
		});
		expect(parsed.success).toBe(true);
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
