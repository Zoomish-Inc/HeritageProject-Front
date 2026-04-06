import type { HeritageListItem } from '@/types/heritage';

export type HeritageListItemApiWire = {
	id: string;
	slug: string;
	name: { ru: string; uz: string };
	year_built: number;
	year_range?: string | null;
	address: { ru: string; uz: string };
	short_description: { ru: string; uz: string };
	cover: string;
	order: number;
	is_published?: boolean;
	created_at?: string;
	updated_at?: string;
};

export type HeritageListApiResponseWire = {
	success: boolean;
	message?: string | null;
	data: HeritageListItemApiWire[];
};

export function heritageListItemsToApiWire(
	items: HeritageListItem[]
): HeritageListItemApiWire[] {
	return items.map((item) => {
		const row: HeritageListItemApiWire = {
			id: item.id,
			slug: item.slug,
			name: item.name,
			year_built: item.yearBuilt,
			year_range: item.yearRange ?? '',
			address: item.address,
			short_description: item.shortDescription,
			cover: item.coverImageUrl,
			order: item.order,
		};
		if (item.isPublished === false) row.is_published = false;
		if (item.createdAt) row.created_at = item.createdAt;
		if (item.updatedAt) row.updated_at = item.updatedAt;
		return row;
	});
}
