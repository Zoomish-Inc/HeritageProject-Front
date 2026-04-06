import type { MetadataRoute } from 'next';
import { getMetadataBaseUrl } from '@/env';
import { getHeritageSlugsForStaticParams } from '@/lib/heritage/getHeritageSlugs';
import { routing } from '@/i18n/routing';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const origin = getMetadataBaseUrl().origin;
	const slugs = await getHeritageSlugsForStaticParams();
	const entries: MetadataRoute.Sitemap = [];

	for (const locale of routing.locales) {
		entries.push({
			url: `${origin}/${locale}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		});
	}

	for (const slug of slugs) {
		for (const locale of routing.locales) {
			entries.push({
				url: `${origin}/${locale}/heritage/${slug}`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: 0.85,
			});
		}
	}

	return entries;
}
