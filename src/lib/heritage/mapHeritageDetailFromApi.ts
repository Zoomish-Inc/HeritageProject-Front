import type {
	ArchitectureDetail,
	AudioGuide,
	AudioGuideTrack,
	BeforeAfterPair,
	HeritageCoordinates,
	HeritageObject,
	HistoricalFigure,
	LocalizedString,
	PhotoItem,
} from '@/entities/heritage';
import {
	biographyMilestoneSchema,
	coalesceKey,
	localizedStringSchema,
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

const emptyLocalized = (): LocalizedString => ({ ru: '', uz: '' });

export const emptyAudioGuide: AudioGuide = {
	narratorLabel: emptyLocalized(),
	tracks: [],
	transcript: emptyLocalized(),
	atmosphereDescription: emptyLocalized(),
	musicSuggestion: emptyLocalized(),
};

export type HeritageDetailCore = {
	id: string;
	slug: string;
	name: LocalizedString;
	address: LocalizedString;
	order: number;
};

function localizedNonEmpty(s: LocalizedString): boolean {
	return s.ru.trim().length > 0 || s.uz.trim().length > 0;
}

function resolveOptionalImageUrl(
	camel: unknown,
	snake: unknown
): string | undefined {
	const raw = camel ?? snake;
	if (typeof raw !== 'string') return undefined;
	const trimmed = raw.trim();
	return trimmed !== '' ? trimmed : undefined;
}

function mapArrayFromApi<T>(
	value: unknown,
	mapItem: (item: Record<string, unknown>) => T | null,
	scope: string
): T[] {
	if (!Array.isArray(value)) {
		if (value !== undefined && value !== null && process.env.NODE_ENV === 'development') {
			console.warn(`[heritage] ${scope}: expected array`);
		}
		return [];
	}

	const mapped: T[] = [];
	let skipped = 0;

	for (const item of value) {
		if (!item || typeof item !== 'object') {
			skipped++;
			continue;
		}
		const result = mapItem(item as Record<string, unknown>);
		if (result) mapped.push(result);
		else skipped++;
	}

	if (skipped > 0 && process.env.NODE_ENV === 'development') {
		console.warn(`[heritage] ${scope}: skipped ${skipped} item(s)`);
	}

	return mapped;
}

function mapPhotoItemFromApi(row: Record<string, unknown>): PhotoItem | null {
	const parsed = photoItemSchema.safeParse(row);
	return parsed.success ? parsed.data : null;
}

function mapArchitectureDetailFromApi(
	row: Record<string, unknown>
): ArchitectureDetail | null {
	const title = localizedStringSchema.safeParse(row.title);
	const description = localizedStringSchema.safeParse(row.description);
	if (!title.success || !description.success) return null;

	return {
		title: title.data,
		description: description.data,
		imageUrl: resolveOptionalImageUrl(row.imageUrl, row.image),
		imageSourceUrl: parseStringFlexible(row.imageSourceUrl ?? row.image_source_url) || undefined,
		imageCredit: parseLocalizedOptional(row.imageCredit ?? row.image_credit),
	};
}

function mapBeforeAfterPairFromApi(row: Record<string, unknown>): BeforeAfterPair | null {
	const labelParsed = localizedStringSchema.safeParse(row.label ?? row.title);
	const label = labelParsed.success ? labelParsed.data : emptyLocalized();

	const resolveSide = (
		photo: unknown,
		imageUrl: unknown
	): PhotoItem | null => {
		if (photo && typeof photo === 'object') {
			const mapped = mapPhotoItemFromApi(photo as Record<string, unknown>);
			if (mapped?.url.trim()) return mapped;
		}
		const url = resolveOptionalImageUrl(imageUrl, imageUrl);
		return url ? { url } : null;
	};

	const before = resolveSide(row.before, row.before_image);
	const after = resolveSide(row.after, row.after_image);
	if (!before || !after) return null;

	return { before, after, label };
}

function mapHistoricalFigureFromApi(
	row: Record<string, unknown>
): HistoricalFigure | null {
	const name = localizedStringSchema.safeParse(row.name);
	const role = localizedStringSchema.safeParse(row.role);
	const bio = localizedStringSchema.safeParse(row.bio);
	if (!name.success || !role.success || !bio.success) return null;

	const milestones = mapArrayFromApi(
		row.milestones,
		(item) => {
			const parsed = biographyMilestoneSchema.safeParse(item);
			return parsed.success ? parsed.data : null;
		},
		'historicalFigure.milestones'
	);

	const gallery = mapArrayFromApi(
		row.gallery,
		mapPhotoItemFromApi,
		'historicalFigure.gallery'
	);

	return {
		name: name.data,
		role: role.data,
		bio: bio.data,
		bioSourceUrl:
			parseStringFlexible(row.bioSourceUrl ?? row.bio_source_url) || undefined,
		bioSourceCredit: parseLocalizedOptional(
			row.bioSourceCredit ?? row.bio_source_credit
		),
		photoUrl: resolveOptionalImageUrl(
			row.photoUrl ?? row.photo_url,
			row.photo
		),
		...(gallery.length > 0 ? { gallery } : {}),
		...(milestones.length > 0 ? { milestones } : {}),
	};
}

function mapAudioGuideTrackFromApi(row: Record<string, unknown>): AudioGuideTrack | null {
	const url = parseStringFlexible(row.url).trim();
	if (!url) return null;

	const shortTitle = parseLocalizedFlexible(row.shortTitle ?? row.short_title);
	const fullTitle = parseLocalizedOptional(row.fullTitle ?? row.full_title);

	return {
		url,
		shortTitle: localizedNonEmpty(shortTitle)
			? shortTitle
			: { ru: 'Аудиозапись', uz: 'Audio yozuv' },
		...(fullTitle ? { fullTitle } : {}),
	};
}

function coalesceAudioGuideRaw(row: Record<string, unknown>): unknown {
	const single = coalesceKey(row, 'audioGuide', 'audio_guide');
	if (single !== undefined && single !== null) return single;
	const guides = row.audio_guides;
	if (Array.isArray(guides) && guides.length > 0) return guides[0];
	return undefined;
}

export function mapAudioGuideFromApi(raw: unknown): AudioGuide {
	if (!raw || typeof raw !== 'object') return emptyAudioGuide;

	const row = raw as Record<string, unknown>;
	let tracks = mapArrayFromApi(row.tracks, mapAudioGuideTrackFromApi, 'audioGuide.tracks');

	const audioUrl = parseStringFlexible(row.audioUrl ?? row.audio_url).trim();
	if (tracks.length === 0 && audioUrl) {
		const narratorLabel = parseLocalizedFlexible(row.narratorLabel ?? row.narrator_label);
		tracks = [
			{
				url: audioUrl,
				shortTitle: localizedNonEmpty(narratorLabel)
					? narratorLabel
					: { ru: 'Аудиозапись', uz: 'Audio yozuv' },
			},
		];
	}

	return {
		narratorLabel: parseLocalizedFlexible(row.narratorLabel ?? row.narrator_label),
		tracks,
		transcript: parseLocalizedFlexible(row.transcript),
		atmosphereDescription: parseLocalizedFlexible(
			row.atmosphereDescription ?? row.atmosphere_description
		),
		musicSuggestion: parseLocalizedFlexible(
			row.musicSuggestion ?? row.music_suggestion
		),
	};
}

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

function clampFigureGallery(fig: HistoricalFigure): HistoricalFigure {
	if (!fig.gallery?.length || fig.gallery.length <= MAX_FIGURE_GALLERY) return fig;
	return { ...fig, gallery: fig.gallery.slice(0, MAX_FIGURE_GALLERY) };
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
