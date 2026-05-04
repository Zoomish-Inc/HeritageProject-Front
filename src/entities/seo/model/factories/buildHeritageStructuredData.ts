import { getMetadataBaseUrl } from '@/env';
import { absolutizeMediaUrl } from '@/shared/lib/seo/absolutizeMediaUrl';
import type { HeritageObject, Locale } from '@/entities/heritage';

export type HeritageJsonLdBreadcrumb = {
	homeLabel: string;
	catalogLabel: string;
	homeUrl: string;
	catalogUrl: string;
};

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
	for (const p of object.historyMedia ?? []) add(p.url);
	for (const d of object.architectureDetails) add(d.imageUrl);
	for (const pair of object.beforeAfterPairs) {
		add(pair.before.url);
		add(pair.after.url);
	}
	if (object.architectBio?.photoUrl) add(object.architectBio.photoUrl);
	for (const p of object.architectBio?.gallery ?? []) add(p.url);
	for (const f of object.historicalFigures) {
		add(f.photoUrl);
		for (const p of f.gallery ?? []) add(p.url);
	}
	return Array.from(urls).slice(0, 24);
}

export function buildHeritageStructuredDataFactory({
	object,
	locale,
	pageUrl,
	breadcrumb,
}: {
	object: HeritageObject;
	locale: Locale;
	pageUrl: string;
	breadcrumb: HeritageJsonLdBreadcrumb;
}): Record<string, unknown> {
	const base = getMetadataBaseUrl();
	const origin = base.origin;
	const name = object.name[locale];
	const description = object.shortDescription[locale];
	const images = collectHeritageImageUrls(object, base);

	const breadcrumbList: Record<string, unknown> = {
		'@type': 'BreadcrumbList',
		'@id': `${pageUrl}#breadcrumb`,
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: breadcrumb.homeLabel,
				item: breadcrumb.homeUrl,
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: breadcrumb.catalogLabel,
				item: breadcrumb.catalogUrl,
			},
			{
				'@type': 'ListItem',
				position: 3,
				name,
				item: pageUrl,
			},
		],
	};

	const modifiedIso = object.updatedAt ?? object.createdAt;

	const landmark: Record<string, unknown> = {
		'@type': 'LandmarksOrHistoricalBuildings',
		'@id': `${pageUrl}#heritage`,
		name,
		description,
		url: pageUrl,
		isPartOf: { '@id': `${origin}/#website` },
		...(images.length ? { image: images } : {}),
		address: {
			'@type': 'PostalAddress',
			streetAddress: object.address[locale],
		},
		...(modifiedIso ? { dateModified: modifiedIso } : {}),
	};

	return {
		'@context': 'https://schema.org',
		'@graph': [breadcrumbList, landmark],
	};
}
