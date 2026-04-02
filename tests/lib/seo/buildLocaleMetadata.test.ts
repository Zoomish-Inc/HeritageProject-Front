import { describe, expect, it, vi } from 'vitest';
import { buildLocaleMetadata } from '@/lib/seo/buildLocaleMetadata';

vi.mock('@/env', () => ({
	getMetadataBaseUrl: () => new URL('https://example.com'),
}));

describe('buildLocaleMetadata', () => {
	it('builds canonical and language alternates from pathForLocale', () => {
		const meta = buildLocaleMetadata({
			locale: 'ru',
			title: 'T',
			description: 'D',
			projectName: 'P',
			pathForLocale: (loc) => `/${loc}/heritage/item`,
		});
		expect(meta.alternates?.canonical).toBe('/ru/heritage/item');
		expect(meta.alternates?.languages).toEqual({
			ru: '/ru/heritage/item',
			uz: '/uz/heritage/item',
		});
	});

	it('sets OpenGraph url from base and path', () => {
		const meta = buildLocaleMetadata({
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
		const meta = buildLocaleMetadata({
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
});
