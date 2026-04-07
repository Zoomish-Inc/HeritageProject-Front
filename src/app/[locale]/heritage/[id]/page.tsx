import type { Locale } from '@/entities/heritage';
import type { Metadata } from 'next';
import {
	getHeritageDetailPageMetadata,
	HeritageDetailPageView,
} from '@/pages/heritageDetail';

type Props = {
	params: { locale: string; id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const locale = params.locale as Locale;
	return getHeritageDetailPageMetadata({
		locale,
		id: params.id,
	});
}

export default async function HeritagePage({ params }: Props) {
	const locale = params.locale as Locale;
	return HeritageDetailPageView({ locale, id: params.id });
}
