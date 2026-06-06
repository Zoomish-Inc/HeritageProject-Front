import { z } from 'zod';
import type {
	HeritageCoordinates,
	HeritageObject,
	HistoricalFigure,
} from '@/entities/heritage';
import {
	architectureDetailSchema,
	audioGuideSchema,
	beforeAfterPairSchema,
	coalesceAudioGuideRaw,
	coalesceKey,
	emptyAudioGuideParsed,
	historicalFigureSchema,
	localizedStringSchema,
	parseArrayFlexible,
	parseBooleanFlexible,
	parseIsoDateOptional,
	parseLocalizedFlexible,
	parseLocalizedOptional,
	parseNumberFlexible,
	parseStringFlexible,
	photoItemSchema,
} from './heritageSchemaPrimitives';

const MAX_PHOTOS = 7;
const MAX_BEFORE_AFTER_PAIRS = 5;
const MAX_HISTORY_MEDIA = 7;
const MAX_FIGURE_GALLERY = 5;

function parseCoordinates(
	row: Record<string, unknown>
): HeritageCoordinates | undefined {
	const latDirect = row.lat ?? row.latitude;
	const lngDirect = row.lng ?? row.longitude ?? row.lon;
	const latFromTop =
		typeof latDirect === 'number'
			? latDirect
			: typeof latDirect === 'string'
				? Number(latDirect)
				: Number.NaN;
	const lngFromTop =
		typeof lngDirect === 'number'
			? lngDirect
			: typeof lngDirect === 'string'
				? Number(lngDirect)
				: Number.NaN;
	if (!Number.isNaN(latFromTop) && !Number.isNaN(lngFromTop)) {
		return { lat: latFromTop, lng: lngFromTop };
	}

	const nested = coalesceKey(row, 'coordinates', 'coordinates');
	if (nested && typeof nested === 'object') {
		const o = nested as Record<string, unknown>;
		const latRaw = o.lat ?? o.latitude;
		const lngRaw = o.lng ?? o.longitude ?? o.lon;
		const lat =
			typeof latRaw === 'number'
				? latRaw
				: typeof latRaw === 'string'
					? Number(latRaw)
					: Number.NaN;
		const lng =
			typeof lngRaw === 'number'
				? lngRaw
				: typeof lngRaw === 'string'
					? Number(lngRaw)
					: Number.NaN;
		if (!Number.isNaN(lat) && !Number.isNaN(lng)) return { lat, lng };
	}
	const latTop = coalesceKey(row, 'latitude', 'latitude');
	const lngTop = coalesceKey(row, 'longitude', 'longitude');
	const lat =
		typeof latTop === 'number'
			? latTop
			: typeof latTop === 'string'
				? Number(latTop)
				: Number.NaN;
	const lng =
		typeof lngTop === 'number'
			? lngTop
			: typeof lngTop === 'string'
				? Number(lngTop)
				: Number.NaN;
	if (!Number.isNaN(lat) && !Number.isNaN(lng)) return { lat, lng };
	return undefined;
}

function clampFigureGallery(fig: HistoricalFigure): HistoricalFigure {
	if (!fig.gallery?.length) return fig;
	if (fig.gallery.length <= MAX_FIGURE_GALLERY) return fig;
	return { ...fig, gallery: fig.gallery.slice(0, MAX_FIGURE_GALLERY) };
}

export const heritageObjectApiDataSchema = z
	.object({
		id: z.string(),
		slug: z.string(),
		name: localizedStringSchema,
		address: localizedStringSchema,
		order: z.number(),
	})
	.passthrough()
	.transform((base): HeritageObject => {
		const r = base as Record<string, unknown>;
		const yearRangeRaw = coalesceKey(r, 'yearRange', 'year_range');
		const yearRange =
			yearRangeRaw === null || yearRangeRaw === undefined || yearRangeRaw === ''
				? undefined
				: String(yearRangeRaw);

		const yearBuiltLabel = parseLocalizedOptional(
			coalesceKey(r, 'yearBuiltLabel', 'year_built_label')
		);
		const coordinates = parseCoordinates(r);
		const mapUrlRaw = coalesceKey(r, 'mapUrl', 'map_url');
		const mapUrl =
			typeof mapUrlRaw === 'string' && mapUrlRaw.trim() !== ''
				? mapUrlRaw.trim()
				: undefined;

		const formerName = parseLocalizedOptional(
			coalesceKey(r, 'formerName', 'former_name')
		);
		const architect = parseLocalizedOptional(
			coalesceKey(r, 'architect', 'architect')
		);
		const architectBioRaw = coalesceKey(r, 'architectBio', 'architect_bio');
		const architectBioParsed = historicalFigureSchema.safeParse(architectBioRaw);

		const audioParsed = audioGuideSchema.safeParse(coalesceAudioGuideRaw(r));

		const visualNotes = parseLocalizedOptional(
			coalesceKey(r, 'visualStyleNotes', 'visual_style_notes')
		);

		const core: HeritageObject = {
			id: base.id,
			slug: base.slug,
			name: base.name,
			address: base.address,
			order: base.order,
			currentPurpose: parseLocalizedFlexible(
				coalesceKey(r, 'currentPurpose', 'current_purpose')
			),
			historicalPurpose: parseLocalizedFlexible(
				coalesceKey(r, 'historicalPurpose', 'historical_purpose')
			),
			yearBuilt: parseNumberFlexible(coalesceKey(r, 'yearBuilt', 'year_built')),
			yearRange,
			architecturalStyle: parseLocalizedFlexible(
				coalesceKey(r, 'architecturalStyle', 'architectural_style')
			),
			shortDescription: parseLocalizedFlexible(
				coalesceKey(r, 'shortDescription', 'short_description')
			),
			architecturalDescription: parseLocalizedFlexible(
				coalesceKey(r, 'architecturalDescription', 'architectural_description')
			),
			architectureDetails: parseArrayFlexible(
				architectureDetailSchema,
				coalesceKey(r, 'architectureDetails', 'architecture_details'),
				'architectureDetails'
			),
			history: parseLocalizedFlexible(coalesceKey(r, 'history', 'history')),
			historicalFigures: parseArrayFlexible(
				historicalFigureSchema,
				coalesceKey(r, 'historicalFigures', 'historical_figures'),
				'historicalFigures'
			).map(clampFigureGallery),
			photos: parseArrayFlexible(
				photoItemSchema,
				coalesceKey(r, 'photos', 'photos'),
				'photos'
			).slice(0, MAX_PHOTOS),
			beforeAfterPairs: parseArrayFlexible(
				beforeAfterPairSchema,
				coalesceKey(r, 'beforeAfterPairs', 'before_after_pairs'),
				'beforeAfterPairs'
			).slice(0, MAX_BEFORE_AFTER_PAIRS),
			audioGuide: audioParsed.success ? audioParsed.data : emptyAudioGuideParsed,
			coverImageUrl: parseStringFlexible(coalesceKey(r, 'coverImageUrl', 'cover')),
		};

		if (formerName) core.formerName = formerName;
		if (architect) core.architect = architect;
		if (architectBioParsed.success)
			core.architectBio = clampFigureGallery(architectBioParsed.data);
		if (visualNotes) core.visualStyleNotes = visualNotes;
		if (yearBuiltLabel) core.yearBuiltLabel = yearBuiltLabel;
		if (coordinates) core.coordinates = coordinates;
		if (mapUrl) core.mapUrl = mapUrl;

		const historyMediaRaw = parseArrayFlexible(
			photoItemSchema,
			coalesceKey(r, 'historyMedia', 'history_media'),
			'historyMedia'
		).slice(0, MAX_HISTORY_MEDIA);
		if (historyMediaRaw.length > 0) core.historyMedia = historyMediaRaw;

		const publishedRaw = coalesceKey(r, 'isPublished', 'is_published');
		if (publishedRaw === false) core.isPublished = false;

		const tourPublishedParsed = parseBooleanFlexible(
			coalesceKey(r, 'tourPublished', 'tour_published')
		);
		if (tourPublishedParsed !== undefined) {
			core.tourPublished = tourPublishedParsed;
		}

		const tourEntryUrlRaw = coalesceKey(r, 'tourEntryUrl', 'tour_entry_url');
		if (typeof tourEntryUrlRaw === 'string' && tourEntryUrlRaw.trim() !== '') {
			core.tourEntryUrl = tourEntryUrlRaw.trim();
		}

		if (core.tourPublished && !core.tourEntryUrl?.trim()) {
			core.tourEntryUrl = `/tour-packs/${core.slug}/index.htm`;
		}

		const createdAt = parseIsoDateOptional(
			coalesceKey(r, 'createdAt', 'created_at')
		);
		const updatedAt = parseIsoDateOptional(
			coalesceKey(r, 'updatedAt', 'updated_at')
		);
		if (createdAt) core.createdAt = createdAt;
		if (updatedAt) core.updatedAt = updatedAt;

		return core;
	});

export const heritageObjectApiResponseSchema = z.object({
	success: z.boolean(),
	message: z.string().nullable().optional(),
	data: heritageObjectApiDataSchema,
});
