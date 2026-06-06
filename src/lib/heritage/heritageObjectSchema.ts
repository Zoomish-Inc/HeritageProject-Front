import { z } from 'zod';
import { localizedStringSchema } from './heritageSchemaPrimitives';
import { mapHeritageDetailFromApi } from './mapHeritageDetailFromApi';

export const heritageObjectApiDataSchema = z
	.object({
		id: z.string(),
		slug: z.string(),
		name: localizedStringSchema,
		address: localizedStringSchema,
		order: z.number(),
	})
	.passthrough()
	.transform((base) =>
		mapHeritageDetailFromApi(base as Record<string, unknown>, {
			id: base.id,
			slug: base.slug,
			name: base.name,
			address: base.address,
			order: base.order,
		})
	);

export const heritageObjectApiResponseSchema = z.object({
	success: z.boolean(),
	message: z.string().nullable().optional(),
	data: heritageObjectApiDataSchema,
});
