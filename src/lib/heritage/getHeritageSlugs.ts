import { getHeritageListForSitemap } from '@/entities/seo';

export async function getHeritageSlugsForStaticParams(): Promise<string[]> {
	const items = await getHeritageListForSitemap();
	return items.map((o) => o.slug);
}
