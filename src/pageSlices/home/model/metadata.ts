import { buildHomeMetadataFactory } from '@/entities/seo';
import type { Locale } from '@/entities/heritage';
import { routing } from '@/i18n/routing';
import { loadHeritageListForRequest } from '@/lib/heritage/getHeritageList';
import { isHeritageListItemPublic } from '@/lib/heritage/listVisibility';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function getHomePageMetadata(locale: Locale): Promise<Metadata> {
	if (!routing.locales.includes(locale)) {
		return { title: 'Not Found' };
	}

	const tHome = await getTranslations({ locale, namespace: 'home' });
	const tCommon = await getTranslations({ locale, namespace: 'common' });
	const title = `${tCommon('project_name')} · ${tHome('hero_subtitle')}`;
	const description = tHome('hero_description');
	let previewImageUrl: string | undefined;

	try {
		const list = await loadHeritageListForRequest();
		const firstPublic = list.filter(isHeritageListItemPublic)[0];
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
