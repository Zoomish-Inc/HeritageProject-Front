import type { MetadataRoute } from 'next';
import { getMetadataBaseUrl } from '@/env';
import { routing } from '@/i18n/routing';
import { heritagePathForLocale, homePathForLocale } from '@/lib/seo/paths';
import {
	SITEMAP_MAX_URLS,
	SITEMAP_WARN_THRESHOLD,
} from '@/lib/seo/sitemapConfig';
import { getHeritageListForSitemap } from '@/lib/seo/sitemapEntries';
import type { HeritageListItem } from '@/types/heritage';

export const revalidate = 3600;

function lastModifiedForHeritageItem(item: HeritageListItem): Date | undefined {
	const raw = item.updatedAt ?? item.createdAt;
	if (!raw) return undefined;
	const d = new Date(raw);
	return Number.isNaN(d.getTime()) ? undefined : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const origin = getMetadataBaseUrl().origin;
	const list = await getHeritageListForSitemap();
	const entries: MetadataRoute.Sitemap = [];

	for (const locale of routing.locales) {
		entries.push({
			url: `${origin}${homePathForLocale(locale)}`,
			changeFrequency: 'weekly',
			priority: 1,
		});
	}

	for (const item of list) {
		for (const locale of routing.locales) {
			const path = heritagePathForLocale(locale, item.slug);
			const lastModified = lastModifiedForHeritageItem(item);
			entries.push({
				url: `${origin}${path}`,
				...(lastModified ? { lastModified } : {}),
				changeFrequency: 'monthly',
				priority: 0.85,
			});
		}
	}

	if (
		process.env.NODE_ENV === 'development' &&
		entries.length > SITEMAP_WARN_THRESHOLD
	) {
		console.warn(
			`[seo] sitemap has ${entries.length} URLs (warn at ${SITEMAP_WARN_THRESHOLD}, max ~${SITEMAP_MAX_URLS}); consider splitting`
		);
	}

	return entries;
}
