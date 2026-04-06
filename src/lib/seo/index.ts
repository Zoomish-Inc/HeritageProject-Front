export { buildHeritageMetadata } from '@/lib/seo/buildHeritageMetadata';
export type { BuildHeritageMetadataInput } from '@/lib/seo/buildHeritageMetadata';
export {
	buildHeritageStructuredDataGraph,
	collectHeritageImageUrls,
} from '@/lib/seo/buildHeritageGraph';
export { buildHomeStructuredDataGraph } from '@/lib/seo/buildHomeGraph';
export { buildHomeMetadata } from '@/lib/seo/buildHomeMetadata';
export type { BuildHomeMetadataInput } from '@/lib/seo/buildHomeMetadata';
export { buildPageMetadata } from '@/lib/seo/buildPageMetadata';
export type { BuildPageMetadataInput } from '@/lib/seo/buildPageMetadata';
export {
	absolutePageUrl,
	heritagePathForLocale,
	homePathForLocale,
} from '@/lib/seo/paths';
export type {
	OgImage,
	OpenGraphPageType,
	PageSeoBase,
	PageSeoMedia,
} from '@/lib/seo/types';
export { absolutizeMediaUrl } from '@/lib/seo/absolutizeMediaUrl';
