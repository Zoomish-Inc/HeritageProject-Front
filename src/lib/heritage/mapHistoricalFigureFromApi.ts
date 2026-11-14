import type { HistoricalFigure } from '@/entities/heritage';
import { biographyMilestoneSchema, localizedStringSchema, parseLocalizedOptional, parseStringFlexible } from './heritageSchemaPrimitives';
import { mapArrayFromApi, resolveOptionalImageUrl } from './mapHeritageApiShared';
import { mapPhotoItemFromApi } from './mapHeritageMediaFromApi';

export const MAX_FIGURE_GALLERY = 5;

export function mapHistoricalFigureFromApi(
	row: Record<string, unknown>
): HistoricalFigure | null {
	const name = localizedStringSchema.safeParse(row.name);
	const role = localizedStringSchema.safeParse(row.role);
	const bio = localizedStringSchema.safeParse(row.bio);
	if (!name.success || !role.success || !bio.success) return null;

	const milestones = mapArrayFromApi(
		row.milestones,
		(item) => {
			const parsed = biographyMilestoneSchema.safeParse(item);
			return parsed.success ? parsed.data : null;
		},
		'historicalFigure.milestones'
	);

	const gallery = mapArrayFromApi(
		row.gallery,
		mapPhotoItemFromApi,
		'historicalFigure.gallery'
	);

	return {
		name: name.data,
		role: role.data,
		bio: bio.data,
		bioSourceUrl:
			parseStringFlexible(row.bioSourceUrl ?? row.bio_source_url) || undefined,
		bioSourceCredit: parseLocalizedOptional(
			row.bioSourceCredit ?? row.bio_source_credit
		),
		photoUrl: resolveOptionalImageUrl(
			row.photoUrl ?? row.photo_url,
			row.photo
		),
		...(gallery.length > 0 ? { gallery } : {}),
		...(milestones.length > 0 ? { milestones } : {}),
	};
}

export function clampFigureGallery(fig: HistoricalFigure): HistoricalFigure {
	if (!fig.gallery?.length || fig.gallery.length <= MAX_FIGURE_GALLERY) return fig;
	return { ...fig, gallery: fig.gallery.slice(0, MAX_FIGURE_GALLERY) };
}
