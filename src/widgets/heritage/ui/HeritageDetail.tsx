import type { HeritageObject, Locale } from '@/entities/heritage';
import { getLocale, getTranslations } from 'next-intl/server';
import { heritageTourPath } from '@/shared/lib/seo/paths';
import { HeritageDetailArchitectBio } from './heritageDetail/HeritageDetailArchitectBio';
import { HeritageDetailArchitecture } from './heritageDetail/HeritageDetailArchitecture';
import { HeritageDetailAudio } from './heritageDetail/HeritageDetailAudio';
import { HeritageDetailBeforeAfter } from './heritageDetail/HeritageDetailBeforeAfter';
import { HeritageDetailClosingRule } from './heritageDetail/HeritageDetailClosingRule';
import { HeritageDetailFigures } from './heritageDetail/HeritageDetailFigures';
import { HeritageDetailGallery } from './heritageDetail/HeritageDetailGallery';
import { HeritageDetailHero } from './heritageDetail/HeritageDetailHero';
import { HeritageDetailHistory } from './heritageDetail/HeritageDetailHistory';
import { HeritageDetailMap } from './heritageDetail/HeritageDetailMap';
import { HeritageDetailPurpose } from './heritageDetail/HeritageDetailPurpose';
import { HeritageDetailVisualNotes } from './heritageDetail/HeritageDetailVisualNotes';

interface Props {
	object: HeritageObject;
}

export async function HeritageDetail({ object }: Props) {
	const locale = (await getLocale()) as Locale;
	const t = await getTranslations('heritage');
	const sourceLabel = t('photo_source');

	return (
		<article className="max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-8">
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

			<HeritageDetailBeforeAfter
				slug={object.slug}
				pairs={object.beforeAfterPairs}
				locale={locale}
				title={t('before_after')}
				historicalPhotos={t('historical_photos')}
				modernPhotos={t('modern_photos')}
				historicalPhotosShort={t('historical_photos_short')}
				modernPhotosShort={t('modern_photos_short')}
				sliderAria={t('compare_slider_aria')}
				compareHint={t('compare_hint')}
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
				}}
			/>

			<HeritageDetailMap
				object={object}
				title={t('map_title')}
				embedTitle={t('map_embed_title')}
				openMapLabel={t('open_map')}
			/>

			<HeritageDetailArchitectBio
				object={object}
				locale={locale}
				title={t('architect_bio')}
				sourceLabel={sourceLabel}
			/>

			<HeritageDetailArchitecture
				object={object}
				locale={locale}
				labels={{
					title: t('architecture'),
					architectureDetails: t('architecture_details'),
					sourceLabel,
				}}
			/>

			<HeritageDetailHistory
				object={object}
				locale={locale}
				title={t('history')}
				sourceLabel={sourceLabel}
			/>

			<HeritageDetailGallery
				photos={object.photos}
				locale={locale}
				title={t('gallery')}
				sourceLabel={sourceLabel}
			/>

			<HeritageDetailFigures
				object={object}
				locale={locale}
				title={t('figures')}
				sourceLabel={sourceLabel}
			/>

			<HeritageDetailVisualNotes object={object} locale={locale} title={t('visual_style')} />

			<HeritageDetailClosingRule />
		</article>
	);
}
