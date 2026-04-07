import type { Metadata } from 'next';
import type { Locale } from '@/types/heritage';

export type OgImage = { url: string; alt?: string };

export type OpenGraphPageType = 'website' | 'article';

export type PageSeoBase = {
	locale: Locale;
	title: string;
	description: string;
	projectName: string;
};

export type PageSeoMedia = {
	ogImages?: OgImage[];
	twitterImages?: string[];
	keywords?: string[];
	openGraphType?: OpenGraphPageType;
	openGraphArticleTimes?: {
		publishedTime?: string;
		modifiedTime?: string;
	};
	robots?: Metadata['robots'];
};
