import { buildHeritageMetadataFactory } from '@/entities/seo';
import { isSupportedLocale, type Locale } from '@/i18n/locale';
import { getHeritageDetailPageData } from '@/lib/heritage/readModel';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function getHeritageDetailPageMetadata({
	locale,
	id,
}: {
	locale: Locale;
	id: string;
}): Promise<Metadata> {
	if (!isSupportedLocale(locale)) {
		return { title: 'Not Found' };
	}

	const { obj } = await getHeritageDetailPageData(id);
	if (!obj) {
		return { title: 'Not Found' };
	}

	const tCommon = await getTranslations({ locale, namespace: 'common' });
	const title = `${obj.name[locale]} | ${tCommon('project_name')}`;
	const description = obj.shortDescription[locale];

	return buildHeritageMetadataFactory({
		locale,
		title,
		description,
		projectName: tCommon('project_name'),
		slug: obj.slug,
		ogImages: [{ url: obj.coverImageUrl, alt: obj.name[locale] }],
		twitterImages: [obj.coverImageUrl],
		openGraphArticleTimes: {
			...(obj.createdAt ? { publishedTime: obj.createdAt } : {}),
			...(obj.updatedAt ? { modifiedTime: obj.updatedAt } : {}),
		},
	});
}
