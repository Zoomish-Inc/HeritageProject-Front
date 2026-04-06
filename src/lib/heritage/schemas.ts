import { z } from 'zod';

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

export const heritageObjectSchema = z.object({
	id: z.string(),
	slug: z.string(),
	name: localizedStringSchema,
	formerName: localizedStringSchema.optional(),
	currentPurpose: localizedStringSchema,
	historicalPurpose: localizedStringSchema,
	address: localizedStringSchema,
	yearBuilt: z.number(),
	yearRange: z.string().optional(),
	architecturalStyle: localizedStringSchema,
	architect: localizedStringSchema.optional(),
	architectBio: historicalFigureSchema.optional(),
	shortDescription: localizedStringSchema,
	architecturalDescription: localizedStringSchema,
	architectureDetails: z.array(architectureDetailSchema),
	history: localizedStringSchema,
	historicalFigures: z.array(historicalFigureSchema),
	photos: z.array(photoItemSchema),
	beforeAfterPairs: z.array(beforeAfterPairSchema),
	audioGuide: audioGuideSchema,
	coverImageUrl: z.string(),
	visualStyleNotes: localizedStringSchema.optional(),
	order: z.number(),
});

export const heritageListApiResponseSchema = z.object({
	success: z.boolean(),
	message: z.string().nullable().optional(),
	data: z.array(heritageListItemApiSchema),
});

export const heritageObjectApiResponseSchema = z.object({
	success: z.boolean(),
	message: z.string().nullable().optional(),
	data: heritageObjectSchema,
});
