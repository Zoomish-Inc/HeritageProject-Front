import { JsonLdScript } from '@/components/SEO/JsonLdScript';
import { buildHeritageStructuredDataGraph } from '@/lib/seo/buildHeritageGraph';
import type { HeritageObject, Locale } from '@/types/heritage';

export function HeritageJsonLd({
	object,
	locale,
	pageUrl,
}: {
	object: HeritageObject;
	locale: Locale;
	pageUrl: string;
}) {
	const payload = buildHeritageStructuredDataGraph({ object, locale, pageUrl });

	return <JsonLdScript payload={payload} />;
}
