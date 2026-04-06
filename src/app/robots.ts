import type { MetadataRoute } from 'next';
import { getMetadataBaseUrl } from '@/env';

function additionalSitemapUrls(origin: string): string[] {
	const raw = process.env.ADDITIONAL_SITEMAP_URLS?.trim();
	if (!raw) return [];
	return raw
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean)
		.map((u) =>
			u.startsWith('http://') || u.startsWith('https://')
				? u
				: `${origin}${u.startsWith('/') ? '' : '/'}${u}`
		);
}

export default function robots(): MetadataRoute.Robots {
	const origin = getMetadataBaseUrl().origin;
	const primary = `${origin}/sitemap.xml`;
	const extra = additionalSitemapUrls(origin);
	const sitemap: string | string[] =
		extra.length > 0 ? [primary, ...extra] : primary;
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/'],
		},
		sitemap,
		host: origin.replace(/^https?:\/\//, ''),
	};
}
