import type { Locale } from '@/i18n/locale';
import { HeritageJsonLdFeature } from '@/features/seo';
import { getMetadataBaseUrl } from '@/env';
import { isSupportedLocale } from '@/i18n/locale';
import { getHeritageDetailPageData } from '@/lib/heritage/readModel';
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
	if (!isSupportedLocale(locale)) notFound();
	const { obj, nextSlug } = await getHeritageDetailPageData(id);
	if (!obj) notFound();

	const pageUrl = absolutePageUrl(heritagePathForLocale(locale, obj.slug));
	const base = getMetadataBaseUrl();
	const homeUrl = new URL(homePathForLocale(locale), base).toString();
	const catalogUrl = `${homeUrl}#objects`;
	const tNav = await getTranslations({ locale, namespace: 'nav' });
	const tHome = await getTranslations({ locale, namespace: 'home' });
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
