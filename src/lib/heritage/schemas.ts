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

export const heritageListItemSchema = z.object({
	id: z.string(),
	slug: z.string(),
	name: localizedStringSchema,
	yearBuilt: z.number(),
	yearRange: z.string().optional(),
	address: localizedStringSchema,
	coverImageUrl: z.string(),
	shortDescription: localizedStringSchema,
	order: z.number(),
});

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
	message: z.string().optional(),
	data: z.array(heritageListItemSchema),
});

export const heritageObjectApiResponseSchema = z.object({
	success: z.boolean(),
	message: z.string().optional(),
	data: heritageObjectSchema,
});
