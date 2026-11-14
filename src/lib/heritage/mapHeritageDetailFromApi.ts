import type { HeritageCoordinates, HeritageObject, LocalizedString } from '@/entities/heritage';
import {
	coalesceKey,
	parseBooleanFlexible,
	parseIsoDateOptional,
	parseLocalizedFlexible,
	parseLocalizedOptional,
	parseNumberFlexible,
	parseStringFlexible,
} from './heritageSchemaPrimitives';
import { mapArrayFromApi } from './mapHeritageApiShared';
import { coalesceAudioGuideRaw, mapAudioGuideFromApi } from './mapAudioGuideFromApi';
import { clampFigureGallery, mapHistoricalFigureFromApi } from './mapHistoricalFigureFromApi';
import {
	MAX_BEFORE_AFTER_PAIRS,
	MAX_HISTORY_MEDIA,
	MAX_PHOTOS,
	mapArchitectureDetailFromApi,
	mapBeforeAfterPairFromApi,
	mapPhotoItemFromApi,
} from './mapHeritageMediaFromApi';

export { emptyAudioGuide, mapAudioGuideFromApi } from './mapAudioGuideFromApi';

export type HeritageDetailCore = {
	id: string;
	slug: string;
	name: LocalizedString;
	address: LocalizedString;
	order: number;
};

function mapCoordinatesFromApi(row: Record<string, unknown>): HeritageCoordinates | undefined {
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

export function mapHeritageDetailFromApi(
	row: Record<string, unknown>,
	core: HeritageDetailCore
): HeritageObject {
	const yearRangeRaw = coalesceKey(row, 'yearRange', 'year_range');
	const yearRange =
		yearRangeRaw === null || yearRangeRaw === undefined || yearRangeRaw === ''
			? undefined
			: String(yearRangeRaw);

	const yearBuiltLabel = parseLocalizedOptional(
		coalesceKey(row, 'yearBuiltLabel', 'year_built_label')
	);
	const coordinates = mapCoordinatesFromApi(row);
	const mapUrlRaw = coalesceKey(row, 'mapUrl', 'map_url');
	const mapUrl =
		typeof mapUrlRaw === 'string' && mapUrlRaw.trim() !== ''
			? mapUrlRaw.trim()
			: undefined;

	const formerName = parseLocalizedOptional(coalesceKey(row, 'formerName', 'former_name'));
	const architect = parseLocalizedOptional(coalesceKey(row, 'architect', 'architect'));
	const visualNotes = parseLocalizedOptional(
		coalesceKey(row, 'visualStyleNotes', 'visual_style_notes')
	);

	const architectBioRaw = coalesceKey(row, 'architectBio', 'architect_bio');
	const architectBioMapped =
		architectBioRaw && typeof architectBioRaw === 'object'
			? mapHistoricalFigureFromApi(architectBioRaw as Record<string, unknown>)
			: null;

	const object: HeritageObject = {
		id: core.id,
		slug: core.slug,
		name: core.name,
		address: core.address,
		order: core.order,
		currentPurpose: parseLocalizedFlexible(
			coalesceKey(row, 'currentPurpose', 'current_purpose')
		),
		historicalPurpose: parseLocalizedFlexible(
			coalesceKey(row, 'historicalPurpose', 'historical_purpose')
		),
		yearBuilt: parseNumberFlexible(coalesceKey(row, 'yearBuilt', 'year_built')),
		yearRange,
		architecturalStyle: parseLocalizedFlexible(
			coalesceKey(row, 'architecturalStyle', 'architectural_style')
		),
		shortDescription: parseLocalizedFlexible(
			coalesceKey(row, 'shortDescription', 'short_description')
		),
		architecturalDescription: parseLocalizedFlexible(
			coalesceKey(row, 'architecturalDescription', 'architectural_description')
		),
		architectureDetails: mapArrayFromApi(
			coalesceKey(row, 'architectureDetails', 'architecture_details'),
			mapArchitectureDetailFromApi,
			'architectureDetails'
		),
		history: parseLocalizedFlexible(coalesceKey(row, 'history', 'history')),
		historicalFigures: mapArrayFromApi(
			coalesceKey(row, 'historicalFigures', 'historical_figures'),
			mapHistoricalFigureFromApi,
			'historicalFigures'
		).map(clampFigureGallery),
		photos: mapArrayFromApi(
			coalesceKey(row, 'photos', 'photos'),
			mapPhotoItemFromApi,
			'photos'
		).slice(0, MAX_PHOTOS),
		beforeAfterPairs: mapArrayFromApi(
			coalesceKey(row, 'beforeAfterPairs', 'before_after_pairs'),
			mapBeforeAfterPairFromApi,
			'beforeAfterPairs'
		).slice(0, MAX_BEFORE_AFTER_PAIRS),
		audioGuide: mapAudioGuideFromApi(coalesceAudioGuideRaw(row)),
		coverImageUrl: parseStringFlexible(coalesceKey(row, 'coverImageUrl', 'cover')),
	};

	if (formerName) object.formerName = formerName;
	if (architect) object.architect = architect;
	if (architectBioMapped) object.architectBio = clampFigureGallery(architectBioMapped);
	if (visualNotes) object.visualStyleNotes = visualNotes;
	if (yearBuiltLabel) object.yearBuiltLabel = yearBuiltLabel;
	if (coordinates) object.coordinates = coordinates;
	if (mapUrl) object.mapUrl = mapUrl;

	const historyMedia = mapArrayFromApi(
		coalesceKey(row, 'historyMedia', 'history_media'),
		mapPhotoItemFromApi,
		'historyMedia'
	).slice(0, MAX_HISTORY_MEDIA);
	if (historyMedia.length > 0) object.historyMedia = historyMedia;

	if (coalesceKey(row, 'isPublished', 'is_published') === false) {
		object.isPublished = false;
	}

	const tourPublished = parseBooleanFlexible(
		coalesceKey(row, 'tourPublished', 'tour_published')
	);
	if (tourPublished !== undefined) object.tourPublished = tourPublished;

	const tourEntryUrlRaw = coalesceKey(row, 'tourEntryUrl', 'tour_entry_url');
	if (typeof tourEntryUrlRaw === 'string' && tourEntryUrlRaw.trim() !== '') {
		object.tourEntryUrl = tourEntryUrlRaw.trim();
	}

	if (object.tourPublished && !object.tourEntryUrl?.trim()) {
		object.tourEntryUrl = `/tour-packs/${object.slug}/index.htm`;
	}

	const createdAt = parseIsoDateOptional(coalesceKey(row, 'createdAt', 'created_at'));
	const updatedAt = parseIsoDateOptional(coalesceKey(row, 'updatedAt', 'updated_at'));
	if (createdAt) object.createdAt = createdAt;
	if (updatedAt) object.updatedAt = updatedAt;

	return object;
}
