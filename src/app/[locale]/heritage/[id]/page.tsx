import type { Metadata } from 'next';
import { assertLocaleOrNotFound } from '@/i18n/locale';
import {
	getHeritageDetailPageMetadata,
	HeritageDetailPageView,
} from '@/pageSlices/heritageDetail';

type Props = {
	params: { locale: string; id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const locale = assertLocaleOrNotFound(params.locale);
	return getHeritageDetailPageMetadata({
		locale,
		id: params.id,
	});
}

export default async function HeritagePage({ params }: Props) {
	const locale = assertLocaleOrNotFound(params.locale);
	return HeritageDetailPageView({ locale, id: params.id });
}
