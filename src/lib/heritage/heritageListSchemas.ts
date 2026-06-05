import { z } from 'zod';
import type { HeritageListItem } from '@/entities/heritage';
import {
	coalesceKey,
	localizedStringSchema,
	parseBooleanFlexible,
	parseIsoDateOptional,
	parseNumberFlexible,
	parseStringFlexible,
} from './heritageSchemaPrimitives';
import { logHeritageParseFailure } from './logHeritageParseFailure';

const heritageListItemInputSchema = z
	.object({
		id: z.string(),
		slug: z.string(),
		name: localizedStringSchema,
		address: localizedStringSchema,
		order: z.number(),
		cover: z.string().optional(),
		coverImageUrl: z.string().optional(),
		short_description: localizedStringSchema.optional(),
		shortDescription: localizedStringSchema.optional(),
		year_built: z.number().optional(),
		yearBuilt: z.number().optional(),
		year_range: z.string().nullable().optional(),
		yearRange: z.string().nullable().optional(),
		is_published: z.boolean().optional(),
		isPublished: z.boolean().optional(),
		created_at: z.string().optional(),
		createdAt: z.string().optional(),
		updated_at: z.string().optional(),
		updatedAt: z.string().optional(),
	})
	.passthrough()
	.superRefine((row, ctx) => {
		const shortDesc = row.shortDescription ?? row.short_description;
		if (!shortDesc) {
			ctx.addIssue({
				code: 'custom',
				message: 'short_description required',
				path: ['short_description'],
			});
		}
		const cover = row.coverImageUrl ?? row.cover;
		if (!cover) {
			ctx.addIssue({
				code: 'custom',
				message: 'cover required',
				path: ['cover'],
			});
		}
	});

export const heritageListItemApiSchema = heritageListItemInputSchema.transform(
	(row): HeritageListItem => {
		const rowRecord = row as Record<string, unknown>;
		const shortDescRaw = coalesceKey(rowRecord, 'shortDescription', 'short_description');
		const shortDescParsed = localizedStringSchema.parse(shortDescRaw);
		const coverRaw = coalesceKey(rowRecord, 'coverImageUrl', 'cover');
		const cover = parseStringFlexible(coverRaw);

		const yearBuiltRaw = coalesceKey(rowRecord, 'yearBuilt', 'year_built');
		const yearRangeRaw = coalesceKey(rowRecord, 'yearRange', 'year_range');
		let yearBuilt = parseNumberFlexible(yearBuiltRaw);
		const yearRangeStr = parseStringFlexible(yearRangeRaw);
		if (yearBuilt === 0 && yearRangeStr) {
			yearBuilt = parseNumberFlexible(yearRangeStr);
		}

		const base: HeritageListItem = {
			id: row.id,
			slug: row.slug,
			name: row.name,
			yearBuilt,
			...(yearRangeStr ? { yearRange: yearRangeStr } : {}),
			address: row.address,
			shortDescription: shortDescParsed,
			coverImageUrl: cover,
			order: row.order,
		};

		const isPublishedParsed = parseBooleanFlexible(
			coalesceKey(rowRecord, 'isPublished', 'is_published')
		);
		if (isPublishedParsed === false) {
			base.isPublished = false;
		}

		const createdAt = parseIsoDateOptional(
			coalesceKey(rowRecord, 'createdAt', 'created_at')
		);
		const updatedAt = parseIsoDateOptional(
			coalesceKey(rowRecord, 'updatedAt', 'updated_at')
		);
		if (createdAt) base.createdAt = createdAt;
		if (updatedAt) base.updatedAt = updatedAt;

		return base;
	}
);

export const heritageListApiResponseSchema = z.object({
	success: z.boolean(),
	message: z.string().nullable().optional(),
	data: z.array(heritageListItemApiSchema),
});

export function parseHeritageListResponseJson(
	json: unknown
): HeritageListItem[] {
	const parsed = heritageListApiResponseSchema.safeParse(json);
	if (!parsed.success) {
		logHeritageParseFailure('list response', parsed.error, json);
		throw new Error(`Heritage list response invalid: ${parsed.error.message}`);
	}
	return parsed.data.data;
}
