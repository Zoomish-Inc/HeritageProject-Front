import { clientEnv, getMetadataBaseUrl } from '@/env';
import { absolutizeMediaUrl } from '@/lib/seo/absolutizeMediaUrl';
import { heritagePathForLocale } from '@/lib/seo/paths';
import { isHeritageListItemPublic } from '@/lib/heritage/listVisibility';
import { getOrganizationSameAsUrls } from '@/lib/seo/serverSeoEnv';
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
	const pagePath = `/${locale}`;
	const webPageUrl = new URL(pagePath, base).toString();
	const organizationId = `${origin}/#organization`;
	const websiteId = `${origin}/#website`;
	const itemListId = `${webPageUrl}#heritage-itemlist`;

	const sameAs = getOrganizationSameAsUrls();
	const organization: Record<string, unknown> = {
		'@type': 'Organization',
		'@id': organizationId,
		name: projectName,
		url: origin,
		...(sameAs.length ? { sameAs } : {}),
	};

	const website: Record<string, unknown> = {
		'@type': 'WebSite',
		'@id': websiteId,
		name: projectName,
		url: origin,
		description,
		inLanguage,
		publisher: { '@id': organizationId },
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

	const visibleItems = items.filter(isHeritageListItemPublic);

	const itemListElement = [...visibleItems]
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
		'@id': itemListId,
		name: projectName,
		numberOfItems: itemListElement.length,
		itemListElement,
	};

	const webPage: Record<string, unknown> = {
		'@type': 'WebPage',
		'@id': `${webPageUrl}#webpage`,
		url: webPageUrl,
		name: projectName,
		description,
		inLanguage,
		isPartOf: { '@id': websiteId },
		publisher: { '@id': organizationId },
		mainEntity: { '@id': itemListId },
	};

	return {
		'@context': 'https://schema.org',
		'@graph': [organization, website, webPage, itemList],
	};
}
