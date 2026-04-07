import type { Locale } from '@/entities/heritage';

export type SeoPageKind = 'home' | 'heritage';

const commonKeywordsByLocale: Record<Locale, string[]> = {
	ru: [
		'Наследие Ферганы',
		'Фергана',
		'архитектурное наследие',
		'исторические здания',
		'достопримечательности Ферганы',
		'виртуальный тур',
	],
	uz: [
		"Farg'ona merosi",
		"Farg'ona",
		"me'moriy meros",
		'tarixiy binolar',
		"Farg'ona diqqatga sazovor joylari",
		'virtual sayohat',
	],
};

const pageKeywordsByLocale: Record<Locale, Record<SeoPageKind, string[]>> = {
	ru: {
		home: ['культурное наследие', 'XIX век', 'XX век'],
		heritage: ['памятник архитектуры', 'история здания', 'аудиогид'],
	},
	uz: {
		home: ['madaniy meros', 'XIX asr', 'XX asr'],
		heritage: ["me'moriy yodgorlik", 'bino tarixi', 'audio guide'],
	},
};

export function getSeoKeywords(
	locale: Locale,
	pageKind: SeoPageKind,
	projectName: string
): string[] {
	const all = [
		projectName,
		...commonKeywordsByLocale[locale],
		...pageKeywordsByLocale[locale][pageKind],
	];
	return Array.from(new Set(all));
}
