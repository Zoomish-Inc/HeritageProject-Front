import { getHeritageListForSitemap } from '@/lib/seo/sitemapEntries';

export async function getHeritageSlugsForStaticParams(): Promise<string[]> {
	const items = await getHeritageListForSitemap();
	return items.map((o) => o.slug);
}
