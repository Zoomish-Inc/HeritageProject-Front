import { describe, expect, it, vi } from 'vitest';
import { buildHomeStructuredDataFactory } from '@/entities/seo';
import type { HeritageListItem } from '@/entities/heritage';

vi.mock('@/env', () => ({
	getMetadataBaseUrl: () => new URL('https://example.com'),
	clientEnv: {},
}));

vi.mock('@/shared/lib/seo/serverSeoEnv', () => ({
	getOrganizationSameAsUrls: () => ['https://example.com/profile'],
}));

const item = (slug: string, order: number): HeritageListItem => ({
	id: slug,
	slug,
	name: { ru: `N-${slug}`, uz: `N-${slug}` },
	yearBuilt: 1900,
	address: { ru: 'a', uz: 'a' },
	coverImageUrl: 'https://example.com/c.jpg',
	shortDescription: { ru: 's', uz: 's' },
	order,
});

describe('buildHomeStructuredDataFactory', () => {
	it('includes Organization, WebSite, WebPage and ItemList in @graph', () => {
		const graph = buildHomeStructuredDataFactory({
			items: [item('a', 1)],
			locale: 'ru',
			projectName: 'P',
			description: 'D',
		});
		const nodes = graph['@graph'] as Record<string, unknown>[];
		const types = nodes.map((n) => n['@type']);
		expect(types).toContain('Organization');
		expect(types).toContain('WebSite');
		expect(types).toContain('WebPage');
		expect(types).toContain('ItemList');
		const org = nodes.find((n) => n['@type'] === 'Organization');
		expect(org?.sameAs).toEqual(['https://example.com/profile']);
	});

	it('drops unpublished items from ItemList', () => {
		const graph = buildHomeStructuredDataFactory({
			items: [item('pub', 1), { ...item('hid', 2), isPublished: false }],
			locale: 'ru',
			projectName: 'P',
			description: 'D',
		});
		const nodes = graph['@graph'] as Record<string, unknown>[];
		const list = nodes.find((n) => n['@type'] === 'ItemList') as {
			numberOfItems?: number;
		};
		expect(list.numberOfItems).toBe(1);
	});
});
