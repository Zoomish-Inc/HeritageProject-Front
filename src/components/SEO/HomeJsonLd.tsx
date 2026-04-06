import { JsonLdScript } from '@/components/SEO/JsonLdScript';
import { buildHomeStructuredDataGraph } from '@/lib/seo/buildHomeGraph';
import type { HeritageListItem, Locale } from '@/types/heritage';

export function HomeJsonLd({
	items,
	locale,
	projectName,
	description,
}: {
	items: HeritageListItem[];
	locale: Locale;
	projectName: string;
	description: string;
}) {
	const payload = buildHomeStructuredDataGraph({
		items,
		locale,
		projectName,
		description,
	});

	return <JsonLdScript payload={payload} />;
}
