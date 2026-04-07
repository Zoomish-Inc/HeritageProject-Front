import type { Metadata } from 'next';
import { homePathForLocale } from '@/shared/lib/seo/paths';
import { getSeoKeywords } from '../contentPlan';
import { buildPageMetadataFactory } from './buildPageMetadata';
import type { PageSeoBase, PageSeoMedia } from '../types';

export type BuildHomeMetadataInput = PageSeoBase & Partial<PageSeoMedia>;

export function buildHomeMetadataFactory(
	input: BuildHomeMetadataInput
): Metadata {
	const { openGraphType = 'website', ...rest } = input;
	const keywords = getSeoKeywords(input.locale, 'home', input.projectName);
	return buildPageMetadataFactory({
		...rest,
		keywords,
		openGraphType,
		pathForLocale: homePathForLocale,
	});
}
