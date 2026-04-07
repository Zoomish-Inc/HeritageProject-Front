import { z } from 'zod';
import type { HeritageListItem } from '@/entities/heritage';
import {
	localizedStringSchema,
	parseIsoDateOptional,
} from './heritageSchemaPrimitives';

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
		is_published: z.boolean().optional(),
		created_at: z.string().optional(),
		updated_at: z.string().optional(),
	})
	.transform((row): HeritageListItem => {
		const base: HeritageListItem = {
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
		};
		if (row.is_published === false) {
			base.isPublished = false;
		}
		const createdAt = parseIsoDateOptional(row.created_at);
		const updatedAt = parseIsoDateOptional(row.updated_at);
		if (createdAt) base.createdAt = createdAt;
		if (updatedAt) base.updatedAt = updatedAt;
		return base;
	});

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
		throw new Error(`Heritage list response invalid: ${parsed.error.message}`);
	}
	return parsed.data.data;
}
