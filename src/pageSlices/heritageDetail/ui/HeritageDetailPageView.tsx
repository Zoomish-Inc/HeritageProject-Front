import type { Locale } from '@/entities/heritage';
import { HeritageJsonLdFeature } from '@/features/seo';
import { getMetadataBaseUrl } from '@/env';
import { routing } from '@/i18n/routing';
import { getHeritageById } from '@/lib/heritage/getHeritageById';
import { loadHeritageListForRequest } from '@/lib/heritage/getHeritageList';
import { isHeritageListItemPublic } from '@/lib/heritage/listVisibility';
import {
	absolutePageUrl,
	heritagePathForLocale,
	homePathForLocale,
} from '@/shared/lib/seo/paths';
import { HeritageDetailWidget } from '@/widgets/heritage';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { NextHeritagePrefetch } from './NextHeritagePrefetch';

export async function HeritageDetailPageView({
	locale,
	id,
}: {
	locale: Locale;
	id: string;
}) {
	if (!routing.locales.includes(locale)) notFound();

	const obj = await getHeritageById(id);
	if (!obj) notFound();

	const pageUrl = absolutePageUrl(heritagePathForLocale(locale, obj.slug));
	const base = getMetadataBaseUrl();
	const homeUrl = new URL(homePathForLocale(locale), base).toString();
	const catalogUrl = `${homeUrl}#objects`;
	const tNav = await getTranslations({ locale, namespace: 'nav' });
	const tHome = await getTranslations({ locale, namespace: 'home' });
	const list = await loadHeritageListForRequest();
	const orderedPublic = [...list]
		.filter(isHeritageListItemPublic)
		.sort((a, b) => a.order - b.order);
	const currentIndex = orderedPublic.findIndex((item) => item.slug === obj.slug);
	const nextSlug =
		currentIndex >= 0 && currentIndex < orderedPublic.length - 1
			? orderedPublic[currentIndex + 1].slug
			: undefined;

	return (
		<>
			<NextHeritagePrefetch locale={locale} slug={nextSlug} />
			<HeritageJsonLdFeature
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
			<HeritageDetailWidget object={obj} />
		</>
	);
}
