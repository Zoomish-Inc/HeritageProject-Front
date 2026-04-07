import type { HeritageListItem } from '@/entities/heritage';

export function isHeritageListItemPublic(item: HeritageListItem): boolean {
	return item.isPublished !== false;
}
