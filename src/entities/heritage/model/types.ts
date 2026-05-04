export type { Locale } from '@/i18n/locale';

export interface LocalizedString {
	ru: string;
	uz: string;
}

export interface ArchitectureDetail {
	title: LocalizedString;
	description: LocalizedString;
	imageUrl?: string;
	imageSourceUrl?: string;
	imageCredit?: LocalizedString;
}

export interface BiographyMilestone {
	year: number;
	event: LocalizedString;
}

export interface HistoricalFigure {
	name: LocalizedString;
	role: LocalizedString;
	bio: LocalizedString;
	photoUrl?: string;
	gallery?: PhotoItem[];
	milestones?: BiographyMilestone[];
}

export interface PhotoItem {
	url: string;
	caption?: LocalizedString;
	isHistorical?: boolean;
	year?: number;
	sourceUrl?: string;
	credit?: LocalizedString;
}

export interface AudioGuideTrack {
	url: string;
	shortTitle: LocalizedString;
	fullTitle?: LocalizedString;
}

export interface HeritageCoordinates {
	lat: number;
	lng: number;
}

export interface BeforeAfterPair {
	before: PhotoItem;
	after: PhotoItem;
	label: LocalizedString;
}

export interface AudioGuide {
	narratorLabel: LocalizedString;
	tracks: AudioGuideTrack[];
	transcript: LocalizedString;
	atmosphereDescription: LocalizedString;
	musicSuggestion: LocalizedString;
}

export interface HeritageObject {
	id: string;
	slug: string;
	name: LocalizedString;
	formerName?: LocalizedString;
	currentPurpose: LocalizedString;
	historicalPurpose: LocalizedString;
	address: LocalizedString;
	coordinates?: HeritageCoordinates;
	mapUrl?: string;
	yearBuilt: number;
	yearRange?: string;
	yearBuiltLabel?: LocalizedString;
	architecturalStyle: LocalizedString;
	architect?: LocalizedString;
	architectBio?: HistoricalFigure;
	shortDescription: LocalizedString;
	architecturalDescription: LocalizedString;
	architectureDetails: ArchitectureDetail[];
	history: LocalizedString;
	historyMedia?: PhotoItem[];
	historicalFigures: HistoricalFigure[];
	photos: PhotoItem[];
	beforeAfterPairs: BeforeAfterPair[];
	audioGuide: AudioGuide;
	coverImageUrl: string;
	visualStyleNotes?: LocalizedString;
	order: number;
	createdAt?: string;
	updatedAt?: string;
	isPublished?: boolean;
	tourPublished?: boolean;
	tourEntryUrl?: string;
}

export interface HeritageListItem {
	id: string;
	slug: string;
	name: LocalizedString;
	yearBuilt: number;
	yearRange?: string;
	address: LocalizedString;
	coverImageUrl: string;
	shortDescription: LocalizedString;
	order: number;
	createdAt?: string;
	updatedAt?: string;
	isPublished?: boolean;
}
