import { HeritageDetail } from '@/components/Heritage/HeritageDetail';
import { HeritageJsonLd } from '@/components/SEO/HeritageJsonLd';
import { getMetadataBaseUrl } from '@/env';
import { routing } from '@/i18n/routing';
import { getHeritageById } from '@/lib/heritage/getHeritageById';
import { buildHeritageMetadata } from '@/lib/seo/buildHeritageMetadata';
import {
	absolutePageUrl,
	heritagePathForLocale,
	homePathForLocale,
} from '@/lib/seo/paths';
import type { Locale } from '@/types/heritage';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

type Props = {
	params: { locale: string; id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const locale = params.locale as Locale;
	if (!routing.locales.includes(locale)) {
		return { title: 'Not Found' };
	}
	const obj = await getHeritageById(params.id);
	if (!obj) {
		return { title: 'Not Found' };
	}
	const tCommon = await getTranslations({ locale, namespace: 'common' });
	const title = `${obj.name[locale]} | ${tCommon('project_name')}`;
	const description = obj.shortDescription[locale];
	const slug = obj.slug;

	return buildHeritageMetadata({
		locale,
		title,
		description,
		projectName: tCommon('project_name'),
		slug,
		ogImages: [{ url: obj.coverImageUrl, alt: obj.name[locale] }],
		twitterImages: [obj.coverImageUrl],
		openGraphArticleTimes: {
			...(obj.createdAt ? { publishedTime: obj.createdAt } : {}),
			...(obj.updatedAt ? { modifiedTime: obj.updatedAt } : {}),
		},
	});
}

export default async function HeritagePage({ params }: Props) {
	const locale = params.locale as Locale;
	if (!routing.locales.includes(locale)) notFound();
	const obj = await getHeritageById(params.id);
	if (!obj) notFound();

	const pageUrl = absolutePageUrl(heritagePathForLocale(locale, obj.slug));
	const base = getMetadataBaseUrl();
	const homeUrl = new URL(homePathForLocale(locale), base).toString();
	const catalogUrl = `${homeUrl}#objects`;
	const tNav = await getTranslations({ locale, namespace: 'nav' });
	const tHome = await getTranslations({ locale, namespace: 'home' });

	return (
		<>
			<HeritageJsonLd
				object={obj}
				locale={locale}
				pageUrl={pageUrl}
				breadcrumb={{
					homeLabel: tNav('home'),
					catalogLabel: tHome('objects_title'),
					homeUrl,
					catalogUrl,
				}}
			/>
			<HeritageDetail object={obj} />
		</>
	);
}
