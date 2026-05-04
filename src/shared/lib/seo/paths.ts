import { getMetadataBaseUrl } from '@/env';

export function homePathForLocale(locale: string): string {
	return `/${locale}`;
}

export function heritagePathForLocale(locale: string, slug: string): string {
	return `/${locale}/heritage/${slug}`;
}

export function heritageTourPath(slug: string): string {
	return `/heritage/${slug}/tour`;
}

export function heritageTourPathForLocale(
	locale: string,
	slug: string
): string {
	return `/${locale}/heritage/${slug}/tour`;
}

export function absolutePageUrl(path: string): string {
	return new URL(path, getMetadataBaseUrl()).toString();
}
