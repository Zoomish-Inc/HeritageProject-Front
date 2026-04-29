import type { Metadata } from 'next';
import { assertLocaleOrNotFound } from '@/i18n/locale';
import { getHomePageMetadata, HomePageView } from '@/pageSlices/home';

type Props = {
	params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const locale = assertLocaleOrNotFound(params.locale);
	return getHomePageMetadata(locale);
}

export default async function HomePage({ params }: Props) {
	const locale = assertLocaleOrNotFound(params.locale);
	return HomePageView({ locale });
}
