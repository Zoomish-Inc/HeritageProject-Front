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

describe('seo snapshots', () => {
	it('matches home metadata snapshot for ru and uz', () => {
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

		expect(ru).toMatchSnapshot('home-metadata-ru');
		expect(uz).toMatchSnapshot('home-metadata-uz');
	});

	it('matches heritage metadata snapshot for ru and uz', () => {
		const ru = buildHeritageMetadataFactory({
			locale: 'ru',
			title: 'T',
			description: 'D',
			projectName: 'Project',
			slug: 'sample-slug',
		});
		const uz = buildHeritageMetadataFactory({
			locale: 'uz',
			title: 'T',
			description: 'D',
			projectName: 'Project',
			slug: 'sample-slug',
		});

		expect(ru).toMatchSnapshot('heritage-metadata-ru');
		expect(uz).toMatchSnapshot('heritage-metadata-uz');
	});

	it('matches structured data snapshots for ru and uz', () => {
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

		expect(homeRu).toMatchSnapshot('home-jsonld-ru');
		expect(homeUz).toMatchSnapshot('home-jsonld-uz');
		expect(detailRu).toMatchSnapshot('detail-jsonld-ru');
		expect(detailUz).toMatchSnapshot('detail-jsonld-uz');
	});
});
