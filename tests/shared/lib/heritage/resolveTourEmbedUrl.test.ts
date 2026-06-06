import { describe, expect, it, vi } from 'vitest';

vi.mock('@/env', () => ({
	getMetadataBaseUrl: () => new URL('https://heritage-project-front.vercel.app'),
}));

import { resolveTourEmbedUrl } from '@/shared/lib/heritage/resolveTourEmbedUrl';

describe('resolveTourEmbedUrl', () => {
	it('keeps relative tour pack paths', () => {
		expect(resolveTourEmbedUrl('/tour-packs/zhenskaya-gimnaziya/index.htm')).toBe(
			'/tour-packs/zhenskaya-gimnaziya/index.htm'
		);
	});

	it('normalizes same-origin absolute urls to path', () => {
		expect(
			resolveTourEmbedUrl(
				'https://heritage-project-front.vercel.app/tour-packs/slug/index.htm'
			)
		).toBe('/tour-packs/slug/index.htm');
	});

	it('keeps external absolute urls', () => {
		const url = 'https://cdn.example.com/tours/slug/index.htm';
		expect(resolveTourEmbedUrl(url)).toBe(url);
	});
});
