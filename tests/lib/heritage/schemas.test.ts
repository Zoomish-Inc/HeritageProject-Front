import { describe, expect, it } from 'vitest';
import {
	heritageListApiResponseSchema,
	heritageObjectApiResponseSchema,
} from '@/lib/heritage/schemas';
import {
	MOCK_HERITAGE_LIST,
	MOCK_HERITAGE_LIST_RESPONSE,
	MOCK_HERITAGE_OBJECTS,
} from '@/mocks/heritage';

describe('heritageListApiResponseSchema', () => {
	it('accepts valid list envelope and normalizes API rows', () => {
		const parsed = heritageListApiResponseSchema.safeParse(
			MOCK_HERITAGE_LIST_RESPONSE
		);
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

	it('fills defaults when audioGuide and rich fields are omitted', () => {
		const obj = MOCK_HERITAGE_OBJECTS[0];
		const broken = { ...obj, audioGuide: undefined };
		const parsed = heritageObjectApiResponseSchema.safeParse({
			success: true,
			data: broken,
		});
		expect(parsed.success).toBe(true);
		if (parsed.success) {
			expect(parsed.data.data.audioGuide.transcript.ru).toBe('');
		}
	});

	it('accepts API payload with audio_guides array (empty)', () => {
		const parsed = heritageObjectApiResponseSchema.safeParse({
			success: true,
			message: null,
			data: {
				id: '6ab495cb-b13c-4f14-9c87-2ab87098407b',
				slug: 'zdanie-voennogo-sobraniya-dom-oficerov',
				name: { ru: 'Здание', uz: 'Bino' },
				address: { ru: 'ул', uz: 'k' },
				order: 1,
				year_built: 1878,
				year_range: '',
				short_description: { ru: 's', uz: 's' },
				current_purpose: { ru: 'a', uz: 'b' },
				historical_purpose: { ru: 'c', uz: 'd' },
				architectural_style: { ru: 'e', uz: 'f' },
				architectural_description: { ru: 'g', uz: 'h' },
				history: { ru: 'i', uz: 'j' },
				cover: 'https://example.com/x.png',
				architecture_details: [],
				before_after_pairs: [],
				historical_figures: [],
				audio_guides: [],
				is_published: true,
			},
		});
		expect(parsed.success).toBe(true);
		if (parsed.success) {
			expect(parsed.data.data.audioGuide.transcript.ru).toBe('');
		}
	});

	it('maps legacy audioUrl to tracks when tracks omitted', () => {
		const parsed = heritageObjectApiResponseSchema.safeParse({
			success: true,
			message: null,
			data: {
				id: '6ab495cb-b13c-4f14-9c87-2ab87098407b',
				slug: 'zdanie-voennogo-sobraniya-dom-oficerov',
				name: { ru: 'Здание', uz: 'Bino' },
				address: { ru: 'ул. 1', uz: "Ko'cha 1" },
				order: 1,
				year_built: 1878,
				year_range: '',
				short_description: { ru: 'Кратко', uz: 'Qisqa' },
				cover: 'https://example.com/c.jpg',
				audioGuide: {
					narratorLabel: { ru: 'Гид', uz: 'Gid' },
					audioUrl: 'https://example.com/a.mp3',
					transcript: { ru: '', uz: '' },
					atmosphereDescription: { ru: '', uz: '' },
					musicSuggestion: { ru: '', uz: '' },
				},
			},
		});
		expect(parsed.success).toBe(true);
		if (parsed.success) {
			expect(parsed.data.data.audioGuide.tracks).toHaveLength(1);
			expect(parsed.data.data.audioGuide.tracks[0].url).toBe(
				'https://example.com/a.mp3'
			);
		}
	});

	it('parses coordinates from nested object or latitude keys', () => {
		const parsed = heritageObjectApiResponseSchema.safeParse({
			success: true,
			data: {
				id: 'x',
				slug: 'x',
				name: { ru: 'A', uz: 'B' },
				address: { ru: '1', uz: '1' },
				order: 1,
				coordinates: { lat: 40.5, lng: 71.2 },
			},
		});
		expect(parsed.success).toBe(true);
		if (parsed.success) {
			expect(parsed.data.data.coordinates).toEqual({ lat: 40.5, lng: 71.2 });
		}
		const parsed2 = heritageObjectApiResponseSchema.safeParse({
			success: true,
			data: {
				id: 'y',
				slug: 'y',
				name: { ru: 'A', uz: 'B' },
				address: { ru: '1', uz: '1' },
				order: 1,
				latitude: 41,
				longitude: 72,
			},
		});
		expect(parsed2.success).toBe(true);
		if (parsed2.success) {
			expect(parsed2.data.data.coordinates).toEqual({ lat: 41, lng: 72 });
		}
	});

	it('accepts minimal snake_case detail payload from API', () => {
		const parsed = heritageObjectApiResponseSchema.safeParse({
			success: true,
			message: null,
			data: {
				id: '6ab495cb-b13c-4f14-9c87-2ab87098407b',
				slug: 'zdanie-voennogo-sobraniya-dom-oficerov',
				name: { ru: 'Здание', uz: 'Bino' },
				address: { ru: 'ул. 1', uz: "Ko'cha 1" },
				order: 1,
				year_built: 1878,
				year_range: '',
				short_description: { ru: 'Кратко', uz: 'Qisqa' },
				cover: 'https://example.com/c.jpg',
			},
		});
		expect(parsed.success).toBe(true);
		if (parsed.success) {
			expect(parsed.data.data.yearBuilt).toBe(1878);
			expect(parsed.data.data.coverImageUrl).toBe('https://example.com/c.jpg');
			expect(parsed.data.data.architectureDetails).toEqual([]);
			expect(parsed.data.data.audioGuide.narratorLabel.ru).toBe('');
		}
	});
});
