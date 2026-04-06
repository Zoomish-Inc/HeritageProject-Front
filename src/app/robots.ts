import type { MetadataRoute } from 'next';
import { getMetadataBaseUrl } from '@/env';

export default function robots(): MetadataRoute.Robots {
	const origin = getMetadataBaseUrl().origin;
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/'],
		},
		sitemap: `${origin}/sitemap.xml`,
		host: origin.replace(/^https?:\/\//, ''),
	};
}
