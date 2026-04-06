import { JsonLdScript } from '@/components/SEO/JsonLdScript';
import {
	buildHeritageStructuredDataGraph,
	type HeritageJsonLdBreadcrumb,
} from '@/lib/seo/buildHeritageGraph';
import type { HeritageObject, Locale } from '@/types/heritage';

export function HeritageJsonLd({
	object,
	locale,
	pageUrl,
	breadcrumb,
}: {
	object: HeritageObject;
	locale: Locale;
	pageUrl: string;
	breadcrumb: HeritageJsonLdBreadcrumb;
}) {
	const payload = buildHeritageStructuredDataGraph({
		object,
		locale,
		pageUrl,
		breadcrumb,
	});

	return <JsonLdScript payload={payload} />;
}

export type { HeritageJsonLdBreadcrumb };
