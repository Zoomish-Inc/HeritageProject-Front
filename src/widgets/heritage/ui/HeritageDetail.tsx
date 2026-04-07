'use client';

import type { HeritageObject, Locale } from '@/entities/heritage';
import dynamic from 'next/dynamic';
import { useLocale, useTranslations } from 'next-intl';
import { LoadingSpinner, OrnamentalDivider, RenderOnView } from '@/shared/ui';
import { HeritageDetailClosingRule } from './heritageDetail/HeritageDetailClosingRule';
import { HeritageDetailHero } from './heritageDetail/HeritageDetailHero';
import { HeritageDetailPurpose } from './heritageDetail/HeritageDetailPurpose';

const sectionLoading = () => (
	<div className="py-10 flex justify-center">
		<LoadingSpinner />
	</div>
);

const HeritageDetailBeforeAfter = dynamic(
	() =>
		import('./heritageDetail/HeritageDetailBeforeAfter').then((m) => ({
			default: m.HeritageDetailBeforeAfter,
		})),
	{ loading: sectionLoading }
);

const HeritageDetailArchitecture = dynamic(
	() =>
		import('./heritageDetail/HeritageDetailArchitecture').then((m) => ({
			default: m.HeritageDetailArchitecture,
		})),
	{ loading: sectionLoading }
);

const HeritageDetailHistory = dynamic(
	() =>
		import('./heritageDetail/HeritageDetailHistory').then((m) => ({
			default: m.HeritageDetailHistory,
		})),
	{ loading: sectionLoading }
);

const HeritageDetailAudio = dynamic(
	() =>
		import('./heritageDetail/HeritageDetailAudio').then((m) => ({
			default: m.HeritageDetailAudio,
		})),
	{ loading: sectionLoading }
);

const HeritageDetailFigures = dynamic(
	() =>
		import('./heritageDetail/HeritageDetailFigures').then((m) => ({
			default: m.HeritageDetailFigures,
		})),
	{ loading: sectionLoading }
);

const HeritageDetailVisualNotes = dynamic(
	() =>
		import('./heritageDetail/HeritageDetailVisualNotes').then((m) => ({
			default: m.HeritageDetailVisualNotes,
		})),
	{ loading: sectionLoading }
);

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

			<RenderOnView fallback={sectionLoading()}>
				<HeritageDetailArchitecture
					object={object}
					locale={locale}
					labels={{
						title: t('architecture'),
						architectureDetails: t('architecture_details'),
					}}
				/>
			</RenderOnView>

			<OrnamentalDivider />

			<RenderOnView fallback={sectionLoading()}>
				<HeritageDetailHistory
					object={object}
					locale={locale}
					title={t('history')}
				/>
			</RenderOnView>

			<RenderOnView fallback={sectionLoading()}>
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
			</RenderOnView>

			<RenderOnView fallback={sectionLoading()}>
				<HeritageDetailFigures
					object={object}
					locale={locale}
					title={t('figures')}
				/>
			</RenderOnView>

			<RenderOnView fallback={sectionLoading()}>
				<HeritageDetailVisualNotes
					object={object}
					locale={locale}
					title={t('visual_style')}
				/>
			</RenderOnView>

			<HeritageDetailClosingRule />
		</article>
	);
};
