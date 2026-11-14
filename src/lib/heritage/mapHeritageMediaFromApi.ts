import type { ArchitectureDetail, BeforeAfterPair, PhotoItem } from '@/entities/heritage';
import { localizedStringSchema, parseLocalizedOptional, parseStringFlexible, photoItemSchema } from './heritageSchemaPrimitives';
import { emptyLocalized, resolveOptionalImageUrl } from './mapHeritageApiShared';

export const MAX_PHOTOS = 7;
export const MAX_BEFORE_AFTER_PAIRS = 5;
export const MAX_HISTORY_MEDIA = 7;

export function mapPhotoItemFromApi(row: Record<string, unknown>): PhotoItem | null {
	const parsed = photoItemSchema.safeParse(row);
	return parsed.success ? parsed.data : null;
}

export function mapArchitectureDetailFromApi(
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

export function mapBeforeAfterPairFromApi(row: Record<string, unknown>): BeforeAfterPair | null {
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
