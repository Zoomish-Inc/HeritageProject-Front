import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/buildPageMetadata';
import { homePathForLocale } from '@/lib/seo/paths';
import type { PageSeoBase, PageSeoMedia } from '@/lib/seo/types';

export type BuildHomeMetadataInput = PageSeoBase & Partial<PageSeoMedia>;

export function buildHomeMetadata(input: BuildHomeMetadataInput): Metadata {
	const { openGraphType = 'website', ...rest } = input;
	return buildPageMetadata({
		...rest,
		openGraphType,
		pathForLocale: homePathForLocale,
	});
}
