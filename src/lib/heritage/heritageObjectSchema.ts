import { z } from 'zod';
import type { HeritageObject } from '@/types/heritage';
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
	parseIsoDateOptional,
	parseLocalizedFlexible,
	parseLocalizedOptional,
	parseNumberFlexible,
	parseStringFlexible,
	photoItemSchema,
} from './heritageSchemaPrimitives';

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
				coalesceKey(r, 'architectureDetails', 'architecture_details')
			),
			history: parseLocalizedFlexible(coalesceKey(r, 'history', 'history')),
			historicalFigures: parseArrayFlexible(
				historicalFigureSchema,
				coalesceKey(r, 'historicalFigures', 'historical_figures')
			),
			photos: parseArrayFlexible(
				photoItemSchema,
				coalesceKey(r, 'photos', 'photos')
			),
			beforeAfterPairs: parseArrayFlexible(
				beforeAfterPairSchema,
				coalesceKey(r, 'beforeAfterPairs', 'before_after_pairs')
			),
			audioGuide: audioParsed.success ? audioParsed.data : emptyAudioGuideParsed,
			coverImageUrl: parseStringFlexible(coalesceKey(r, 'coverImageUrl', 'cover')),
		};

		if (formerName) core.formerName = formerName;
		if (architect) core.architect = architect;
		if (architectBioParsed.success) core.architectBio = architectBioParsed.data;
		if (visualNotes) core.visualStyleNotes = visualNotes;

		const publishedRaw = coalesceKey(r, 'isPublished', 'is_published');
		if (publishedRaw === false) core.isPublished = false;

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
