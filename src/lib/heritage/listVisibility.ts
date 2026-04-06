import type { HeritageListItem } from '@/types/heritage';

export function isHeritageListItemPublic(item: HeritageListItem): boolean {
	return item.isPublished !== false;
}
