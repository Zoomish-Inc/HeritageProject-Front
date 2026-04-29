import { getPublicHeritageList } from '@/lib/heritage/readModel';

export async function getHeritageListForSitemap() {
	return getPublicHeritageList();
}
