import { loadHeritageListForRequest } from '@/lib/heritage/getHeritageList';
import { isHeritageListItemPublic } from '@/lib/heritage/listVisibility';

export async function getHeritageListForSitemap() {
	const list = await loadHeritageListForRequest();
	return list.filter(isHeritageListItemPublic);
}
