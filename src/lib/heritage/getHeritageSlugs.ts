import { MOCK_HERITAGE_OBJECTS } from '@/mocks/heritage';
import { isHeritageMockEnabled } from './config';
import { loadHeritageList } from './getHeritageList';

export async function getHeritageSlugsForStaticParams(): Promise<string[]> {
	if (isHeritageMockEnabled()) {
		return MOCK_HERITAGE_OBJECTS.map((o) => o.slug);
	}
	const list = await loadHeritageList({ next: { revalidate: 3600 } });
	return list.map((item) => item.slug);
}
