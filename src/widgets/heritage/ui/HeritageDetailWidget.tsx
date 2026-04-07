import { HeritageDetail } from './HeritageDetail';
import type { HeritageObject } from '@/entities/heritage';

export function HeritageDetailWidget({ object }: { object: HeritageObject }) {
	return <HeritageDetail object={object} />;
}
