import { JsonLdScript } from '@/shared/ui';
import {
	buildHeritageStructuredDataFactory,
	type HeritageJsonLdBreadcrumb,
} from '@/entities/seo';
import type { HeritageObject, Locale } from '@/entities/heritage';

type HeritageJsonLdFeatureProps = {
	object: HeritageObject;
	locale: Locale;
	pageUrl: string;
	breadcrumb: HeritageJsonLdBreadcrumb;
};

export function HeritageJsonLdFeature({
	object,
	locale,
	pageUrl,
	breadcrumb,
}: HeritageJsonLdFeatureProps) {
	const payload = buildHeritageStructuredDataFactory({
		object,
		locale,
		pageUrl,
		breadcrumb,
	});

	return <JsonLdScript payload={payload} />;
}

export type { HeritageJsonLdBreadcrumb };
