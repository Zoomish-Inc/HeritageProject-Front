import { getHeritageListForSitemap } from '@/entities/seo';

export async function getHeritageSlugsForStaticParams(): Promise<string[]> {
	try {
		const items = await getHeritageListForSitemap();
		return items.map((o) => o.slug);
	} catch (error) {
		console.error('[heritage] static params list unavailable', error);
		return [];
	}
}
