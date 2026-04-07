import type { Metadata } from 'next';
import { getMetadataBaseUrl } from '@/env';
import { routing } from '@/i18n/routing';
import { absolutizeMediaUrl } from '@/lib/seo/absolutizeMediaUrl';
import type { Locale } from '@/types/heritage';
import { getMetadataVerification } from '@/lib/seo/serverSeoEnv';
import type { OgImage, PageSeoMedia } from '@/lib/seo/types';

function ogLocaleTag(loc: Locale): string {
	return loc === 'uz' ? 'uz_UZ' : 'ru_RU';
}

export type BuildPageMetadataInput = PageSeoMedia & {
	locale: Locale;
	title: string;
	description: string;
	projectName: string;
	pathForLocale: (loc: string) => string;
};

export function buildPageMetadata({
	locale,
	title,
	description,
	projectName,
	pathForLocale,
	ogImages,
	twitterImages,
	keywords,
	openGraphType = 'website',
	openGraphArticleTimes,
	robots,
}: BuildPageMetadataInput): Metadata {
	const base = getMetadataBaseUrl();
	const canonicalPath = pathForLocale(locale);
	const pageUrl = new URL(canonicalPath, base).toString();
	const alternateLocales = routing.locales
		.filter((l) => l !== locale)
		.map((l) => ogLocaleTag(l));

	const resolvedOgImages = ogImages?.length
		? ogImages.map((img: OgImage) => ({
				url: absolutizeMediaUrl(img.url, base),
				...(img.alt ? { alt: img.alt } : {}),
			}))
		: undefined;

	const resolvedTwitterImages = twitterImages?.length
		? twitterImages.map((u) => absolutizeMediaUrl(u, base))
		: undefined;

	const openGraphShared = {
		title,
		description,
		url: pageUrl,
		siteName: projectName,
		locale: ogLocaleTag(locale),
		...(alternateLocales.length ? { alternateLocale: alternateLocales } : {}),
		...(resolvedOgImages?.length ? { images: resolvedOgImages } : {}),
	};

	const openGraph: Metadata['openGraph'] =
		openGraphType === 'article'
			? {
					...openGraphShared,
					type: 'article',
					...(openGraphArticleTimes?.publishedTime
						? { publishedTime: openGraphArticleTimes.publishedTime }
						: {}),
					...(openGraphArticleTimes?.modifiedTime
						? { modifiedTime: openGraphArticleTimes.modifiedTime }
						: {}),
				}
			: {
					...openGraphShared,
					type: openGraphType,
				};

	const verification = getMetadataVerification();

	return {
		title,
		description,
		...(keywords?.length ? { keywords } : {}),
		applicationName: projectName,
		publisher: projectName,
		referrer: 'origin-when-cross-origin',
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
		...(verification ? { verification } : {}),
		robots: robots ?? {
			index: true,
			follow: true,
			googleBot: { index: true, follow: true },
		},
		alternates: {
			canonical: canonicalPath,
			languages: {
				...Object.fromEntries(
					routing.locales.map((l) => [l, new URL(pathForLocale(l), base).toString()])
				),
				'x-default': new URL(pathForLocale(routing.defaultLocale), base).toString(),
			},
		},
		openGraph,
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			...(resolvedTwitterImages?.length ? { images: resolvedTwitterImages } : {}),
		},
	};
}
