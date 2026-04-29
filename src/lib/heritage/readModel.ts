import { getHeritageById } from './getHeritageById';
import { loadHeritageListForRequest } from './getHeritageList';
import { isHeritageListItemPublic } from './listVisibility';

export async function getPublicHeritageList() {
	const list = await loadHeritageListForRequest();
	return list.filter(isHeritageListItemPublic);
}

export async function getHeritageDetailPageData(id: string) {
	const [obj, publicList] = await Promise.all([
		getHeritageById(id),
		getPublicHeritageList(),
	]);

	if (!obj) {
		return { obj: null, nextSlug: undefined };
	}

	const orderedPublic = [...publicList].sort((a, b) => a.order - b.order);
	const currentIndex = orderedPublic.findIndex((item) => item.slug === obj.slug);
	const nextSlug =
		currentIndex >= 0 && currentIndex < orderedPublic.length - 1
			? orderedPublic[currentIndex + 1].slug
			: undefined;

	return { obj, nextSlug, publicList: orderedPublic };
}
