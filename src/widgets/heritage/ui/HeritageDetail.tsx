'use client';

import type { HeritageObject, Locale } from '@/entities/heritage';
import dynamic from 'next/dynamic';
import { useLocale, useTranslations } from 'next-intl';
import { heritageTourPath } from '@/shared/lib/seo/paths';
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

const HeritageDetailArchitectBio = dynamic(
	() =>
		import('./heritageDetail/HeritageDetailArchitectBio').then((m) => ({
			default: m.HeritageDetailArchitectBio,
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

const HeritageDetailGallery = dynamic(
	() =>
		import('./heritageDetail/HeritageDetailGallery').then((m) => ({
			default: m.HeritageDetailGallery,
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
	const sourceLabel = t('photo_source');

	return (
		<article className="max-w-4xl mx-auto px-6 py-8">
			<HeritageDetailHero
				object={object}
				locale={locale}
				backLabel={t('back')}
				tourHref={
					object.tourPublished && object.tourEntryUrl
						? heritageTourPath(object.slug)
						: undefined
				}
				tourLabel={
					object.tourPublished && object.tourEntryUrl ? t('tour_link') : undefined
				}
			/>

			<HeritageDetailBeforeAfter
				slug={object.slug}
				pairs={object.beforeAfterPairs}
				locale={locale}
				title={t('before_after')}
				historicalPhotos={t('historical_photos')}
				modernPhotos={t('modern_photos')}
				sliderAria={t('compare_slider_aria')}
				compareHint={t('compare_hint')}
				sourceLabel={sourceLabel}
			/>

			<HeritageDetailPurpose
				object={object}
				locale={locale}
				labels={{
					sectionTitle: t('facts_title'),
					currentPurpose: t('current_purpose'),
					historicalPurpose: t('historical_purpose'),
					address: t('address'),
					yearBuilt: t('year_built'),
					style: t('style'),
					architect: t('architect'),
					coordinates: t('coordinates'),
					openMap: t('open_map'),
				}}
			/>

			<RenderOnView fallback={sectionLoading()}>
				<HeritageDetailArchitectBio
					object={object}
					locale={locale}
					title={t('architect_bio')}
					sourceLabel={sourceLabel}
				/>
			</RenderOnView>

			<OrnamentalDivider />

			<RenderOnView fallback={sectionLoading()}>
				<HeritageDetailArchitecture
					object={object}
					locale={locale}
					labels={{
						title: t('architecture'),
						architectureDetails: t('architecture_details'),
						sourceLabel,
					}}
				/>
			</RenderOnView>

			<OrnamentalDivider />

			<RenderOnView fallback={sectionLoading()}>
				<HeritageDetailHistory
					object={object}
					locale={locale}
					title={t('history')}
					sourceLabel={sourceLabel}
				/>
			</RenderOnView>

			<RenderOnView fallback={sectionLoading()}>
				<HeritageDetailGallery
					photos={object.photos}
					locale={locale}
					title={t('gallery')}
					sourceLabel={sourceLabel}
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
						audioTracks: t('audio_tracks'),
						fullTitle: t('audio_full_title'),
					}}
				/>
			</RenderOnView>

			<RenderOnView fallback={sectionLoading()}>
				<HeritageDetailFigures
					object={object}
					locale={locale}
					title={t('figures')}
					sourceLabel={sourceLabel}
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
