import { describe, expect, it, vi } from 'vitest';
import {
	buildHeritageMetadataFactory,
	buildHomeMetadataFactory,
} from '@/entities/seo';

vi.mock('@/env', () => ({
	getMetadataBaseUrl: () => new URL('https://example.com'),
}));

vi.mock('@/shared/lib/seo/serverSeoEnv', () => ({
	getMetadataVerification: () => undefined,
}));

describe('critical seo assertions', () => {
	it('home metadata includes canonical and hreflang', () => {
		const meta = buildHomeMetadataFactory({
			locale: 'ru',
			title: 'T',
			description: 'D',
			projectName: 'P',
			ogImages: [{ url: '/cover.jpg', alt: 'cover' }],
			twitterImages: ['/cover.jpg'],
		});
		expect(meta.alternates?.canonical).toBe('/ru');
		expect(meta.alternates?.languages?.ru).toBe('https://example.com/ru');
		expect(meta.alternates?.languages?.uz).toBe('https://example.com/uz');
		expect(meta.openGraph?.images).toEqual([
			{ url: 'https://example.com/cover.jpg', alt: 'cover' },
		]);
	});

	it('detail metadata includes canonical and og image', () => {
		const meta = buildHeritageMetadataFactory({
			locale: 'ru',
			title: 'T',
			description: 'D',
			projectName: 'P',
			slug: 'x',
			ogImages: [{ url: '/x.jpg', alt: 'x' }],
			twitterImages: ['/x.jpg'],
		});
		expect(meta.alternates?.canonical).toBe('/ru/heritage/x');
		expect(meta.openGraph?.url).toBe('https://example.com/ru/heritage/x');
		expect(meta.openGraph?.images).toEqual([
			{ url: 'https://example.com/x.jpg', alt: 'x' },
		]);
	});
});
