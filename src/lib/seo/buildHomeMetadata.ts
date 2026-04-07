import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/buildPageMetadata';
import { getSeoKeywords } from '@/lib/seo/keywords';
import { homePathForLocale } from '@/lib/seo/paths';
import type { PageSeoBase, PageSeoMedia } from '@/lib/seo/types';

export type BuildHomeMetadataInput = PageSeoBase & Partial<PageSeoMedia>;

export function buildHomeMetadata(input: BuildHomeMetadataInput): Metadata {
	const { openGraphType = 'website', ...rest } = input;
	const keywords = getSeoKeywords(input.locale, 'home', input.projectName);
	return buildPageMetadata({
		...rest,
		keywords,
		openGraphType,
		pathForLocale: homePathForLocale,
	});
}
