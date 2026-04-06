import { z } from 'zod';
import type { HeritageListItem, HeritageObject } from '@/types/heritage';

const localizedStringSchema = z.object({
	ru: z.string(),
	uz: z.string(),
});

const photoItemSchema = z.object({
	url: z.string(),
	caption: localizedStringSchema.optional(),
	isHistorical: z.boolean().optional(),
	year: z.number().optional(),
});

const biographyMilestoneSchema = z.object({
	year: z.number(),
	event: localizedStringSchema,
});

const historicalFigureSchema = z.object({
	name: localizedStringSchema,
	role: localizedStringSchema,
	bio: localizedStringSchema,
	photoUrl: z.string().optional(),
	milestones: z.array(biographyMilestoneSchema).optional(),
});

const architectureDetailSchema = z.object({
	title: localizedStringSchema,
	description: localizedStringSchema,
	imageUrl: z.string().optional(),
});

const beforeAfterPairSchema = z.object({
	before: photoItemSchema,
	after: photoItemSchema,
	label: localizedStringSchema,
});

const audioGuideSchema = z.object({
	narratorLabel: localizedStringSchema,
	audioUrl: z.string().optional(),
	transcript: localizedStringSchema,
	atmosphereDescription: localizedStringSchema,
	musicSuggestion: localizedStringSchema,
});

const emptyLocalized = (): { ru: string; uz: string } => ({ ru: '', uz: '' });

const emptyAudioGuideParsed = audioGuideSchema.parse({
	narratorLabel: emptyLocalized(),
	transcript: emptyLocalized(),
	atmosphereDescription: emptyLocalized(),
	musicSuggestion: emptyLocalized(),
});

function coalesceKey(
	row: Record<string, unknown>,
	camel: string,
	snake: string
): unknown {
	if (row[camel] !== undefined && row[camel] !== null) return row[camel];
	return row[snake];
}

function parseLocalizedFlexible(v: unknown): { ru: string; uz: string } {
	const p = localizedStringSchema.safeParse(v);
	return p.success ? p.data : emptyLocalized();
}

function parseLocalizedOptional(
	v: unknown
): { ru: string; uz: string } | undefined {
	if (v === undefined || v === null) return undefined;
	const p = localizedStringSchema.safeParse(v);
	return p.success ? p.data : undefined;
}

function parseNumberFlexible(v: unknown): number {
	if (typeof v === 'number' && !Number.isNaN(v)) return v;
	if (typeof v === 'string' && v.trim() !== '') {
		const n = Number(v);
		if (!Number.isNaN(n)) return n;
	}
	return 0;
}

function parseStringFlexible(v: unknown): string {
	return typeof v === 'string' ? v : '';
}

function parseArrayFlexible<T extends z.ZodTypeAny>(
	itemSchema: T,
	value: unknown
): Array<z.infer<T>> {
	if (value === undefined || value === null) return [];
	const p = z.array(itemSchema).safeParse(value);
	return p.success ? p.data : [];
}

function coalesceAudioGuideRaw(row: Record<string, unknown>): unknown {
	const single = coalesceKey(row, 'audioGuide', 'audio_guide');
	if (single !== undefined && single !== null) return single;
	const guides = row.audio_guides;
	if (Array.isArray(guides) && guides.length > 0) return guides[0];
	return undefined;
}

export const heritageListItemApiSchema = z
	.object({
		id: z.string(),
		slug: z.string(),
		name: localizedStringSchema,
		year_built: z.number(),
		year_range: z.string().nullable().optional(),
		address: localizedStringSchema,
		short_description: localizedStringSchema,
		cover: z.string(),
		order: z.number(),
	})
	.transform((row) => ({
		id: row.id,
		slug: row.slug,
		name: row.name,
		yearBuilt: row.year_built,
		yearRange:
			row.year_range !== undefined &&
			row.year_range !== null &&
			row.year_range !== ''
				? row.year_range
				: undefined,
		address: row.address,
		shortDescription: row.short_description,
		coverImageUrl: row.cover,
		order: row.order,
	}));

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

		return core;
	});

export const heritageListApiResponseSchema = z.object({
	success: z.boolean(),
	message: z.string().nullable().optional(),
	data: z.array(heritageListItemApiSchema),
});

export const heritageObjectApiResponseSchema = z.object({
	success: z.boolean(),
	message: z.string().nullable().optional(),
	data: heritageObjectApiDataSchema,
});

export function parseHeritageListResponseJson(
	json: unknown
): HeritageListItem[] {
	const parsed = heritageListApiResponseSchema.safeParse(json);
	if (!parsed.success) {
		throw new Error(`Heritage list response invalid: ${parsed.error.message}`);
	}
	return parsed.data.data;
}
