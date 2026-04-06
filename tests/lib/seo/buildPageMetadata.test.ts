import type { Metadata } from 'next';
import { describe, expect, it, vi } from 'vitest';
import { buildPageMetadata } from '@/lib/seo/buildPageMetadata';

type OpenGraphArticle = Extract<
	NonNullable<Metadata['openGraph']>,
	{ type: 'article' }
>;

vi.mock('@/env', () => ({
	getMetadataBaseUrl: () => new URL('https://example.com'),
}));

vi.mock('@/lib/seo/serverSeoEnv', () => ({
	getMetadataVerification: () => undefined,
}));

describe('buildPageMetadata', () => {
	it('builds canonical and language alternates from pathForLocale', () => {
		const meta = buildPageMetadata({
			locale: 'ru',
			title: 'T',
			description: 'D',
			projectName: 'P',
			pathForLocale: (loc) => `/${loc}/heritage/item`,
		});
		expect(meta.alternates?.canonical).toBe('/ru/heritage/item');
		expect(meta.alternates?.languages).toEqual({
			ru: 'https://example.com/ru/heritage/item',
			uz: 'https://example.com/uz/heritage/item',
			'x-default': 'https://example.com/ru/heritage/item',
		});
	});

	it('sets OpenGraph url from base and path', () => {
		const meta = buildPageMetadata({
			locale: 'uz',
			title: 'T',
			description: 'D',
			projectName: 'P',
			pathForLocale: (loc) => `/${loc}`,
		});
		expect(meta.openGraph?.url).toBe('https://example.com/uz');
		expect(meta.openGraph?.locale).toBe('uz_UZ');
	});

	it('includes og and twitter images when provided', () => {
		const meta = buildPageMetadata({
			locale: 'ru',
			title: 'T',
			description: 'D',
			projectName: 'P',
			pathForLocale: () => '/ru/x',
			ogImages: [{ url: 'https://cdn.example/img.jpg', alt: 'A' }],
			twitterImages: ['https://cdn.example/img.jpg'],
		});
		expect(meta.openGraph?.images).toEqual([
			{ url: 'https://cdn.example/img.jpg', alt: 'A' },
		]);
		expect(meta.twitter?.images).toEqual(['https://cdn.example/img.jpg']);
	});

	it('sets OpenGraph article times when type is article', () => {
		const meta = buildPageMetadata({
			locale: 'ru',
			title: 'T',
			description: 'D',
			projectName: 'P',
			pathForLocale: () => '/ru/x',
			openGraphType: 'article',
			openGraphArticleTimes: {
				publishedTime: '2026-01-01T00:00:00.000Z',
				modifiedTime: '2026-01-02T00:00:00.000Z',
			},
		});
		const og = meta.openGraph as OpenGraphArticle | null | undefined;
		expect(og?.type).toBe('article');
		expect(og?.publishedTime).toBe('2026-01-01T00:00:00.000Z');
		expect(og?.modifiedTime).toBe('2026-01-02T00:00:00.000Z');
	});
});
