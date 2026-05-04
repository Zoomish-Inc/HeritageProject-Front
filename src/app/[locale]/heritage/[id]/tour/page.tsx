import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import {
	assertLocaleOrNotFound,
	isSupportedLocale,
	type Locale,
} from '@/i18n/locale';
import { getHeritageById } from '@/lib/heritage/getHeritageById';
import { getTranslations } from 'next-intl/server';

type Props = {
	params: { locale: string; id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale: localeParam, id } = params;
	if (!isSupportedLocale(localeParam)) {
		return { title: 'Not Found' };
	}
	const locale = localeParam as Locale;
	const obj = await getHeritageById(id);
	if (!obj || !obj.tourPublished || !obj.tourEntryUrl?.trim()) {
		const tCommon = await getTranslations({ locale, namespace: 'common' });
		return { title: tCommon('project_name') };
	}
	const tCommon = await getTranslations({ locale, namespace: 'common' });
	const title = `${obj.name[locale]} — 3D | ${tCommon('project_name')}`;
	return {
		title,
		description: obj.shortDescription[locale],
	};
}

export default async function HeritageTourPage({ params }: Props) {
	assertLocaleOrNotFound(params.locale);
	const obj = await getHeritageById(params.id);
	if (!obj || !obj.tourPublished || !obj.tourEntryUrl?.trim()) {
		notFound();
	}
	redirect(obj.tourEntryUrl.trim());
}
