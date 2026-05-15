import { describe, expect, it, vi } from 'vitest';
import {
	buildHeritageMetadataFactory,
	buildHeritageStructuredDataFactory,
	buildHomeMetadataFactory,
	buildHomeStructuredDataFactory,
} from '@/entities/seo';
import { MOCK_HERITAGE_LIST, MOCK_HERITAGE_OBJECTS } from '@/mocks/heritage';

vi.mock('@/env', () => ({
	getMetadataBaseUrl: () => new URL('https://example.com'),
	clientEnv: {},
}));

vi.mock('@/shared/lib/seo/serverSeoEnv', () => ({
	getMetadataVerification: () => undefined,
	getOrganizationSameAsUrls: () => [],
}));

function graphTypes(data: Record<string, unknown>): string[] {
	const graph = data['@graph'];
	if (!Array.isArray(graph)) return [];
	return graph
		.map((node) => (node as Record<string, unknown>)['@type'])
		.filter((t): t is string => typeof t === 'string');
}

describe('SEO builders', () => {
	it('builds home and heritage metadata with required fields', () => {
		const ru = buildHomeMetadataFactory({
			locale: 'ru',
			title: 'T',
			description: 'D',
			projectName: 'Project',
		});
		const uz = buildHomeMetadataFactory({
			locale: 'uz',
			title: 'T',
			description: 'D',
			projectName: 'Project',
		});
		expect(ru.title).toBeTruthy();
		expect(ru.description).toBeTruthy();
		expect(uz.title).toBeTruthy();
		expect(uz.description).toBeTruthy();

		const hr = buildHeritageMetadataFactory({
			locale: 'ru',
			title: 'T',
			description: 'D',
			projectName: 'Project',
			slug: 'sample-slug',
		});
		const hu = buildHeritageMetadataFactory({
			locale: 'uz',
			title: 'T',
			description: 'D',
			projectName: 'Project',
			slug: 'sample-slug',
		});
		expect(hr.title).toBeTruthy();
		expect(hr.description).toBeTruthy();
		expect(hu.title).toBeTruthy();
		expect(hu.description).toBeTruthy();
	});

	it('builds home JSON-LD with stable graph shape', () => {
		const homeRu = buildHomeStructuredDataFactory({
			items: MOCK_HERITAGE_LIST,
			locale: 'ru',
			projectName: 'Project',
			description: 'D',
		});
		const homeUz = buildHomeStructuredDataFactory({
			items: MOCK_HERITAGE_LIST,
			locale: 'uz',
			projectName: 'Project',
			description: 'D',
		});

		for (const data of [homeRu, homeUz]) {
			expect(data['@context']).toBe('https://schema.org');
			expect(Array.isArray(data['@graph'])).toBe(true);
			const types = graphTypes(data);
			expect(types).toContain('Organization');
			expect(types).toContain('WebSite');
			expect(types).toContain('WebPage');
			expect(types).toContain('ItemList');
		}
	});

	it('builds heritage detail JSON-LD with breadcrumb and landmark', () => {
		const obj = MOCK_HERITAGE_OBJECTS[0];
		const detailRu = buildHeritageStructuredDataFactory({
			object: obj,
			locale: 'ru',
			pageUrl: 'https://example.com/ru/heritage/sample-slug',
			breadcrumb: {
				homeLabel: 'Главная',
				catalogLabel: 'Объекты',
				homeUrl: 'https://example.com/ru',
				catalogUrl: 'https://example.com/ru#objects',
			},
		});
		const detailUz = buildHeritageStructuredDataFactory({
			object: obj,
			locale: 'uz',
			pageUrl: 'https://example.com/uz/heritage/sample-slug',
			breadcrumb: {
				homeLabel: 'Bosh sahifa',
				catalogLabel: "Ob'ektlar",
				homeUrl: 'https://example.com/uz',
				catalogUrl: 'https://example.com/uz#objects',
			},
		});

		for (const data of [detailRu, detailUz]) {
			expect(data['@context']).toBe('https://schema.org');
			const types = graphTypes(data);
			expect(types).toContain('BreadcrumbList');
			expect(types).toContain('LandmarksOrHistoricalBuildings');
		}
	});
});
