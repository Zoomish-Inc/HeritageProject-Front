import { z } from 'zod';

export const localizedStringSchema = z.object({
	ru: z.string(),
	uz: z.string(),
});

export const photoItemSchema = z.object({
	url: z.string(),
	caption: localizedStringSchema.optional(),
	isHistorical: z.boolean().optional(),
	year: z.number().optional(),
});

export const biographyMilestoneSchema = z.object({
	year: z.number(),
	event: localizedStringSchema,
});

export const historicalFigureSchema = z.object({
	name: localizedStringSchema,
	role: localizedStringSchema,
	bio: localizedStringSchema,
	photoUrl: z.string().optional(),
	milestones: z.array(biographyMilestoneSchema).optional(),
});

export const architectureDetailSchema = z.object({
	title: localizedStringSchema,
	description: localizedStringSchema,
	imageUrl: z.string().optional(),
});

export const beforeAfterPairSchema = z.object({
	before: photoItemSchema,
	after: photoItemSchema,
	label: localizedStringSchema,
});

export const audioGuideSchema = z.object({
	narratorLabel: localizedStringSchema,
	audioUrl: z.string().optional(),
	transcript: localizedStringSchema,
	atmosphereDescription: localizedStringSchema,
	musicSuggestion: localizedStringSchema,
});

const emptyLocalized = (): { ru: string; uz: string } => ({ ru: '', uz: '' });

export const emptyAudioGuideParsed = audioGuideSchema.parse({
	narratorLabel: emptyLocalized(),
	transcript: emptyLocalized(),
	atmosphereDescription: emptyLocalized(),
	musicSuggestion: emptyLocalized(),
});

export function coalesceKey(
	row: Record<string, unknown>,
	camel: string,
	snake: string
): unknown {
	if (row[camel] !== undefined && row[camel] !== null) return row[camel];
	return row[snake];
}

export function parseLocalizedFlexible(v: unknown): { ru: string; uz: string } {
	const p = localizedStringSchema.safeParse(v);
	return p.success ? p.data : emptyLocalized();
}

export function parseLocalizedOptional(
	v: unknown
): { ru: string; uz: string } | undefined {
	if (v === undefined || v === null) return undefined;
	const p = localizedStringSchema.safeParse(v);
	return p.success ? p.data : undefined;
}

export function parseNumberFlexible(v: unknown): number {
	if (typeof v === 'number' && !Number.isNaN(v)) return v;
	if (typeof v === 'string' && v.trim() !== '') {
		const n = Number(v);
		if (!Number.isNaN(n)) return n;
	}
	return 0;
}

export function parseStringFlexible(v: unknown): string {
	return typeof v === 'string' ? v : '';
}

export function parseArrayFlexible<T extends z.ZodTypeAny>(
	itemSchema: T,
	value: unknown
): Array<z.infer<T>> {
	if (value === undefined || value === null) return [];
	const p = z.array(itemSchema).safeParse(value);
	return p.success ? p.data : [];
}

export function coalesceAudioGuideRaw(row: Record<string, unknown>): unknown {
	const single = coalesceKey(row, 'audioGuide', 'audio_guide');
	if (single !== undefined && single !== null) return single;
	const guides = row.audio_guides;
	if (Array.isArray(guides) && guides.length > 0) return guides[0];
	return undefined;
}

export function parseIsoDateOptional(v: unknown): string | undefined {
	if (v === undefined || v === null) return undefined;
	if (typeof v !== 'string' || v.trim() === '') return undefined;
	const d = new Date(v);
	if (Number.isNaN(d.getTime())) return undefined;
	return d.toISOString();
}
