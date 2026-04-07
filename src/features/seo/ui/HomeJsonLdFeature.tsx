import { JsonLdScript } from '@/shared/ui';
import { buildHomeStructuredDataFactory } from '@/entities/seo';
import type { HeritageListItem, Locale } from '@/entities/heritage';

type HomeJsonLdFeatureProps = {
	items: HeritageListItem[];
	locale: Locale;
	projectName: string;
	description: string;
};

export function HomeJsonLdFeature({
	items,
	locale,
	projectName,
	description,
}: HomeJsonLdFeatureProps) {
	const payload = buildHomeStructuredDataFactory({
		items,
		locale,
		projectName,
		description,
	});

	return <JsonLdScript payload={payload} />;
}
