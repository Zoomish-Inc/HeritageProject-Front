import { describe, expect, it, vi } from 'vitest';
import { buildHomeStructuredDataGraph } from '@/lib/seo/buildHomeGraph';
import type { HeritageListItem } from '@/types/heritage';

vi.mock('@/env', () => ({
	getMetadataBaseUrl: () => new URL('https://example.com'),
	clientEnv: {},
}));

vi.mock('@/lib/seo/serverSeoEnv', () => ({
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

describe('buildHomeStructuredDataGraph', () => {
	it('includes Organization, WebSite, WebPage and ItemList in @graph', () => {
		const graph = buildHomeStructuredDataGraph({
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
		const graph = buildHomeStructuredDataGraph({
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
