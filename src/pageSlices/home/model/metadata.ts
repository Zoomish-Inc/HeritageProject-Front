import { buildHomeMetadataFactory } from '@/entities/seo';
import { isSupportedLocale, type Locale } from '@/i18n/locale';
import { getPublicHeritageList } from '@/lib/heritage/readModel';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function getHomePageMetadata(locale: Locale): Promise<Metadata> {
	if (!isSupportedLocale(locale)) {
		return { title: 'Not Found' };
	}

	const tHome = await getTranslations({ locale, namespace: 'home' });
	const tCommon = await getTranslations({ locale, namespace: 'common' });
	const title = `${tCommon('project_name')} · ${tHome('hero_subtitle')}`;
	const description = tHome('hero_description');
	let previewImageUrl: string | undefined;

	try {
		const list = await getPublicHeritageList();
		const firstPublic = list[0];
		previewImageUrl = firstPublic?.coverImageUrl;
	} catch {
		previewImageUrl = undefined;
	}

	return buildHomeMetadataFactory({
		locale,
		title,
		description,
		projectName: tCommon('project_name'),
		...(previewImageUrl
			? {
					ogImages: [{ url: previewImageUrl, alt: tCommon('project_name') }],
					twitterImages: [previewImageUrl],
				}
			: {}),
	});
}
