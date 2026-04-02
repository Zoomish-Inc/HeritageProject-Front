'use client';

import { useLocale, useTranslations } from 'next-intl';
import { HeritageDetailArchitecture } from '@/components/Heritage/heritageDetail/HeritageDetailArchitecture';
import { HeritageDetailAudio } from '@/components/Heritage/heritageDetail/HeritageDetailAudio';
import { HeritageDetailBeforeAfter } from '@/components/Heritage/heritageDetail/HeritageDetailBeforeAfter';
import { HeritageDetailClosingRule } from '@/components/Heritage/heritageDetail/HeritageDetailClosingRule';
import { HeritageDetailFigures } from '@/components/Heritage/heritageDetail/HeritageDetailFigures';
import { HeritageDetailHero } from '@/components/Heritage/heritageDetail/HeritageDetailHero';
import { HeritageDetailHistory } from '@/components/Heritage/heritageDetail/HeritageDetailHistory';
import { HeritageDetailPurpose } from '@/components/Heritage/heritageDetail/HeritageDetailPurpose';
import { HeritageDetailVisualNotes } from '@/components/Heritage/heritageDetail/HeritageDetailVisualNotes';
import { OrnamentalDivider } from '@/components/UI/OrnamentalDivider';
import type { HeritageObject, Locale } from '@/types/heritage';

interface Props {
	object: HeritageObject;
}

export const HeritageDetail = ({ object }: Props) => {
	const locale = useLocale() as Locale;
	const t = useTranslations('heritage');

	return (
		<article className="max-w-4xl mx-auto px-6 py-8">
			<HeritageDetailHero object={object} locale={locale} backLabel={t('back')} />

			<HeritageDetailBeforeAfter
				slug={object.slug}
				pairs={object.beforeAfterPairs}
				locale={locale}
				title={t('before_after')}
				historicalPhotos={t('historical_photos')}
				modernPhotos={t('modern_photos')}
				sliderAria={t('compare_slider_aria')}
				compareHint={t('compare_hint')}
			/>

			<HeritageDetailPurpose
				object={object}
				locale={locale}
				labels={{
					title: t('current_purpose'),
					currentPurpose: t('current_purpose'),
					historicalPurpose: t('historical_purpose'),
					address: t('address'),
					yearBuilt: t('year_built'),
					style: t('style'),
					architect: t('architect'),
				}}
			/>

			<OrnamentalDivider />

			<HeritageDetailArchitecture
				object={object}
				locale={locale}
				labels={{
					title: t('architecture'),
					architectureDetails: t('architecture_details'),
				}}
			/>

			<OrnamentalDivider />

			<HeritageDetailHistory
				object={object}
				locale={locale}
				title={t('history')}
			/>

			<HeritageDetailAudio
				object={object}
				locale={locale}
				labels={{
					title: t('audio_guide'),
					listen: t('listen'),
					atmosphere: t('atmosphere'),
					musicSuggestion: t('music_suggestion'),
				}}
			/>

			<HeritageDetailFigures
				object={object}
				locale={locale}
				title={t('figures')}
			/>

			<HeritageDetailVisualNotes
				object={object}
				locale={locale}
				title={t('visual_style')}
			/>

			<HeritageDetailClosingRule />
		</article>
	);
};
