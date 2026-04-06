import { describe, expect, it, vi } from 'vitest';
import {
	buildHeritageStructuredDataGraph,
	collectHeritageImageUrls,
} from '@/lib/seo/buildHeritageGraph';
import type { HeritageObject } from '@/types/heritage';

vi.mock('@/env', () => ({
	getMetadataBaseUrl: () => new URL('https://example.com'),
}));

const minimalObject = (): HeritageObject => ({
	id: 'x',
	slug: 'test-slug',
	order: 1,
	name: { ru: 'Название', uz: 'Nomi' },
	currentPurpose: { ru: '', uz: '' },
	historicalPurpose: { ru: '', uz: '' },
	address: { ru: 'Улица 1', uz: "Ko'cha 1" },
	yearBuilt: 1900,
	architecturalStyle: { ru: '', uz: '' },
	shortDescription: { ru: 'Кратко', uz: 'Qisqa' },
	architecturalDescription: { ru: '', uz: '' },
	architectureDetails: [],
	history: { ru: '', uz: '' },
	historicalFigures: [],
	photos: [],
	beforeAfterPairs: [],
	audioGuide: {
		narratorLabel: { ru: '', uz: '' },
		transcript: { ru: '', uz: '' },
		atmosphereDescription: { ru: '', uz: '' },
		musicSuggestion: { ru: '', uz: '' },
	},
	coverImageUrl: '/covers/a.webp',
});

describe('collectHeritageImageUrls', () => {
	it('absolutizes relative cover url against base', () => {
		const base = new URL('https://example.com');
		const urls = collectHeritageImageUrls(minimalObject(), base);
		expect(urls).toContain('https://example.com/covers/a.webp');
	});
});

describe('buildHeritageStructuredDataGraph', () => {
	it('builds LandmarksOrHistoricalBuildings with locale fields and page url', () => {
		const graph = buildHeritageStructuredDataGraph({
			object: minimalObject(),
			locale: 'ru',
			pageUrl: 'https://example.com/ru/heritage/test-slug',
		});
		expect(graph['@context']).toBe('https://schema.org');
		expect(graph['@type']).toBe('LandmarksOrHistoricalBuildings');
		expect(graph.name).toBe('Название');
		expect(graph.description).toBe('Кратко');
		expect(graph.url).toBe('https://example.com/ru/heritage/test-slug');
		expect(graph.address).toEqual({
			'@type': 'PostalAddress',
			streetAddress: 'Улица 1',
		});
		expect(Array.isArray(graph.image)).toBe(true);
	});
});
