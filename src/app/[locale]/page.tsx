import type { Metadata } from 'next';
import type { Locale } from '@/entities/heritage';
import { getHomePageMetadata, HomePageView } from '@/pages/home';

type Props = {
	params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const locale = params.locale as Locale;
	return getHomePageMetadata(locale);
}

export default async function HomePage({ params }: Props) {
	const locale = params.locale as Locale;
	return HomePageView({ locale });
}
