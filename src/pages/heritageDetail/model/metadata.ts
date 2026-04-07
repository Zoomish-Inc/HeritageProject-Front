import { buildHeritageMetadataFactory } from '@/entities/seo';
import { routing } from '@/i18n/routing';
import { getHeritageById } from '@/lib/heritage/getHeritageById';
import type { Locale } from '@/entities/heritage';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function getHeritageDetailPageMetadata({
	locale,
	id,
}: {
	locale: Locale;
	id: string;
}): Promise<Metadata> {
	if (!routing.locales.includes(locale)) {
		return { title: 'Not Found' };
	}

	const obj = await getHeritageById(id);
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
