export function sortHeritageListByOrder<T extends { order: number }>(
	items: T[]
): T[] {
	return [...items].sort((a, b) => a.order - b.order);
}
