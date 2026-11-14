import type { AudioGuide, AudioGuideTrack } from '@/entities/heritage';
import { coalesceKey, parseLocalizedFlexible, parseLocalizedOptional, parseStringFlexible } from './heritageSchemaPrimitives';
import { emptyLocalized, localizedNonEmpty, mapArrayFromApi } from './mapHeritageApiShared';

export const emptyAudioGuide: AudioGuide = {
	narratorLabel: emptyLocalized(),
	tracks: [],
	transcript: emptyLocalized(),
	atmosphereDescription: emptyLocalized(),
	musicSuggestion: emptyLocalized(),
};

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

export function coalesceAudioGuideRaw(row: Record<string, unknown>): unknown {
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
