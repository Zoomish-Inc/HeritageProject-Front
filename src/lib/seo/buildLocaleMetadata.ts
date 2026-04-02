import type { Metadata } from 'next';
import { getMetadataBaseUrl } from '@/env';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/types/heritage';

type OgImage = { url: string; alt?: string };

export function buildLocaleMetadata({
	locale,
	title,
	description,
	projectName,
	pathForLocale,
	ogImages,
	twitterImages,
}: {
	locale: Locale;
	title: string;
	description: string;
	projectName: string;
	pathForLocale: (loc: string) => string;
	ogImages?: OgImage[];
	twitterImages?: string[];
}): Metadata {
	const base = getMetadataBaseUrl();
	const canonical = pathForLocale(locale);
	const url = new URL(canonical, base).toString();

	const openGraph: Metadata['openGraph'] = {
		title,
		description,
		url,
		siteName: projectName,
		locale: locale === 'uz' ? 'uz_UZ' : 'ru_RU',
		type: 'website',
		...(ogImages?.length
			? {
					images: ogImages.map((img) => ({
						url: img.url,
						...(img.alt ? { alt: img.alt } : {}),
					})),
				}
			: {}),
	};

	return {
		title,
		description,
		alternates: {
			canonical,
			languages: Object.fromEntries(
				routing.locales.map((l) => [l, pathForLocale(l)])
			),
		},
		openGraph,
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			...(twitterImages?.length ? { images: twitterImages } : {}),
		},
	};
}
