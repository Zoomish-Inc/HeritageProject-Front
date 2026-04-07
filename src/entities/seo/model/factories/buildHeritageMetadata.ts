import type { Metadata } from 'next';
import { heritagePathForLocale } from '@/shared/lib/seo/paths';
import { getSeoKeywords } from '../contentPlan';
import { buildPageMetadataFactory } from './buildPageMetadata';
import type { PageSeoBase, PageSeoMedia } from '../types';

export type BuildHeritageMetadataInput = PageSeoBase &
	Partial<PageSeoMedia> & {
		slug: string;
	};

export function buildHeritageMetadataFactory(
	input: BuildHeritageMetadataInput
): Metadata {
	const { slug, openGraphType = 'article', ...rest } = input;
	const keywords = getSeoKeywords(input.locale, 'heritage', input.projectName);
	return buildPageMetadataFactory({
		...rest,
		keywords,
		openGraphType,
		pathForLocale: (loc) => heritagePathForLocale(loc, slug),
	});
}
