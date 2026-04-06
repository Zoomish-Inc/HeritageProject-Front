import { getMetadataBaseUrl } from '@/env';
import { absolutizeMediaUrl } from '@/lib/seo/absolutizeMediaUrl';
import type { HeritageObject, Locale } from '@/types/heritage';

export function collectHeritageImageUrls(
	object: HeritageObject,
	base: URL
): string[] {
	const urls = new Set<string>();
	const add = (u?: string) => {
		if (u) urls.add(absolutizeMediaUrl(u, base));
	};
	add(object.coverImageUrl);
	for (const p of object.photos) add(p.url);
	for (const d of object.architectureDetails) add(d.imageUrl);
	for (const pair of object.beforeAfterPairs) {
		add(pair.before.url);
		add(pair.after.url);
	}
	if (object.architectBio?.photoUrl) add(object.architectBio.photoUrl);
	for (const f of object.historicalFigures) add(f.photoUrl);
	return Array.from(urls).slice(0, 24);
}

export function buildHeritageStructuredDataGraph({
	object,
	locale,
	pageUrl,
}: {
	object: HeritageObject;
	locale: Locale;
	pageUrl: string;
}): Record<string, unknown> {
	const base = getMetadataBaseUrl();
	const name = object.name[locale];
	const description = object.shortDescription[locale];
	const images = collectHeritageImageUrls(object, base);
	return {
		'@context': 'https://schema.org',
		'@type': 'LandmarksOrHistoricalBuildings',
		name,
		description,
		url: pageUrl,
		...(images.length ? { image: images } : {}),
		address: {
			'@type': 'PostalAddress',
			streetAddress: object.address[locale],
		},
	};
}
