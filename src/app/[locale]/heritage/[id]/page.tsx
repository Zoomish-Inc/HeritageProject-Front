import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { HeritageDetail } from '@/components/Heritage/HeritageDetail';
import { getHeritageById } from '@/lib/heritage/getHeritageById';
import { MOCK_HERITAGE_OBJECTS } from '@/mocks/heritage';
import { routing } from '@/i18n/routing';
import { getMetadataBaseUrl } from '@/env';
import type { Locale } from '@/types/heritage';

type Props = {
	params: { locale: string; id: string };
};

export async function generateStaticParams() {
	return MOCK_HERITAGE_OBJECTS.flatMap((obj) =>
		routing.locales.map((locale) => ({ locale, id: obj.slug }))
	);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const obj = await getHeritageById(params.id);
	if (!obj) {
		return { title: 'Not Found' };
	}
	const locale = params.locale as Locale;
	const tCommon = await getTranslations({ locale, namespace: 'common' });
	const title = `${obj.name[locale]} | ${tCommon('project_name')}`;
	const description = obj.shortDescription[locale];
	const base = getMetadataBaseUrl();
	const path = `/${locale}/heritage/${obj.slug}`;

	return {
		title,
		description,
		alternates: {
			canonical: path,
			languages: Object.fromEntries(
				routing.locales.map((l) => [l, `/${l}/heritage/${obj.slug}`])
			),
		},
		openGraph: {
			title,
			description,
			url: new URL(path, base).toString(),
			siteName: tCommon('project_name'),
			locale: locale === 'uz' ? 'uz_UZ' : 'ru_RU',
			type: 'website',
			images: [{ url: obj.coverImageUrl, alt: obj.name[locale] }],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [obj.coverImageUrl],
		},
	};
}

export default async function HeritagePage({ params }: Props) {
	const obj = await getHeritageById(params.id);
	if (!obj) notFound();

	return <HeritageDetail object={obj} />;
}
