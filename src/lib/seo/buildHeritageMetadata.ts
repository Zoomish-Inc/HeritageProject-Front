import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/buildPageMetadata';
import { getSeoKeywords } from '@/lib/seo/keywords';
import { heritagePathForLocale } from '@/lib/seo/paths';
import type { PageSeoBase, PageSeoMedia } from '@/lib/seo/types';

export type BuildHeritageMetadataInput = PageSeoBase &
	Partial<PageSeoMedia> & {
		slug: string;
	};

export function buildHeritageMetadata(
	input: BuildHeritageMetadataInput
): Metadata {
	const { slug, openGraphType = 'article', ...rest } = input;
	const keywords = getSeoKeywords(input.locale, 'heritage', input.projectName);
	return buildPageMetadata({
		...rest,
		keywords,
		openGraphType,
		pathForLocale: (loc) => heritagePathForLocale(loc, slug),
	});
}
