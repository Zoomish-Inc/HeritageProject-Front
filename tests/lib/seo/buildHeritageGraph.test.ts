import { describe, expect, it, vi } from 'vitest';
import {
	buildHeritageStructuredDataFactory,
	collectHeritageImageUrls,
} from '@/entities/seo';
import type { HeritageObject } from '@/entities/heritage';

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
		tracks: [],
		transcript: { ru: '', uz: '' },
		atmosphereDescription: { ru: '', uz: '' },
		musicSuggestion: { ru: '', uz: '' },
	},
	coverImageUrl: '/covers/a.webp',
});

const breadcrumb = {
	homeLabel: 'Главная',
	catalogLabel: 'Объекты',
	homeUrl: 'https://example.com/ru',
	catalogUrl: 'https://example.com/ru#objects',
};

describe('collectHeritageImageUrls', () => {
	it('absolutizes relative cover url against base', () => {
		const base = new URL('https://example.com');
		const urls = collectHeritageImageUrls(minimalObject(), base);
		expect(urls).toContain('https://example.com/covers/a.webp');
	});
});

describe('buildHeritageStructuredDataFactory', () => {
	it('builds @graph with BreadcrumbList and LandmarksOrHistoricalBuildings', () => {
		const graph = buildHeritageStructuredDataFactory({
			object: minimalObject(),
			locale: 'ru',
			pageUrl: 'https://example.com/ru/heritage/test-slug',
			breadcrumb,
		});
		expect(graph['@context']).toBe('https://schema.org');
		const nodes = graph['@graph'] as Record<string, unknown>[];
		expect(Array.isArray(nodes)).toBe(true);
		const landmark = nodes.find(
			(n) => n['@type'] === 'LandmarksOrHistoricalBuildings'
		);
		expect(landmark?.name).toBe('Название');
		expect(landmark?.description).toBe('Кратко');
		expect(landmark?.url).toBe('https://example.com/ru/heritage/test-slug');
		expect(landmark?.address).toEqual({
			'@type': 'PostalAddress',
			streetAddress: 'Улица 1',
		});
		expect(Array.isArray(landmark?.image)).toBe(true);
		const crumbs = nodes.find((n) => n['@type'] === 'BreadcrumbList');
		expect(Array.isArray(crumbs?.itemListElement)).toBe(true);
	});

	it('adds dateModified when updatedAt is set', () => {
		const obj = minimalObject();
		obj.updatedAt = '2026-01-02T00:00:00.000Z';
		const graph = buildHeritageStructuredDataFactory({
			object: obj,
			locale: 'ru',
			pageUrl: 'https://example.com/ru/heritage/test-slug',
			breadcrumb,
		});
		const nodes = graph['@graph'] as Record<string, unknown>[];
		const landmark = nodes.find(
			(n) => n['@type'] === 'LandmarksOrHistoricalBuildings'
		);
		expect(landmark?.dateModified).toBe('2026-01-02T00:00:00.000Z');
	});
});
