import { clientEnv, getMetadataBaseUrl } from '@/env';
import { absolutizeMediaUrl } from '@/lib/seo/absolutizeMediaUrl';
import { heritagePathForLocale } from '@/lib/seo/paths';
import type { HeritageListItem, Locale } from '@/types/heritage';

function siteSearchTemplate(): string | undefined {
	const t = clientEnv.NEXT_PUBLIC_SITE_SEARCH_URL_TEMPLATE;
	return t && t.includes('{search_term_string}') ? t : undefined;
}

export function buildHomeStructuredDataGraph({
	items,
	locale,
	projectName,
	description,
}: {
	items: HeritageListItem[];
	locale: Locale;
	projectName: string;
	description: string;
}): Record<string, unknown> {
	const base = getMetadataBaseUrl();
	const origin = base.origin;
	const inLanguage = locale === 'uz' ? 'uz' : 'ru';

	const website: Record<string, unknown> = {
		'@type': 'WebSite',
		'@id': `${origin}/#website`,
		name: projectName,
		url: origin,
		description,
		inLanguage,
	};

	const template = siteSearchTemplate();
	if (template) {
		website.potentialAction = {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: template,
			},
			'query-input': 'required name=search_term_string',
		};
	}

	const itemListElement = [...items]
		.sort((a, b) => a.order - b.order)
		.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			item: {
				'@type': 'LandmarksOrHistoricalBuildings',
				name: item.name[locale],
				description: item.shortDescription[locale],
				url: new URL(heritagePathForLocale(locale, item.slug), base).toString(),
				image: absolutizeMediaUrl(item.coverImageUrl, base),
			},
		}));

	const itemList: Record<string, unknown> = {
		'@type': 'ItemList',
		name: projectName,
		numberOfItems: itemListElement.length,
		itemListElement,
	};

	return {
		'@context': 'https://schema.org',
		'@graph': [website, itemList],
	};
}
