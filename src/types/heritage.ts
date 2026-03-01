export type Locale = 'ru' | 'uz';

export interface LocalizedString {
	ru: string;
	uz: string;
}

export interface ArchitectureDetail {
	title: LocalizedString;
	description: LocalizedString;
	imageUrl?: string;
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
	milestones?: BiographyMilestone[];
}

export interface PhotoItem {
	url: string;
	caption?: LocalizedString;
	isHistorical?: boolean;
	year?: number;
}

export interface BeforeAfterPair {
	before: PhotoItem;
	after: PhotoItem;
	label: LocalizedString;
}

export interface AudioGuide {
	narratorLabel: LocalizedString;
	audioUrl?: string;
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
	yearBuilt: number;
	yearRange?: string;
	architecturalStyle: LocalizedString;
	architect?: LocalizedString;
	architectBio?: HistoricalFigure;
	shortDescription: LocalizedString;
	architecturalDescription: LocalizedString;
	architectureDetails: ArchitectureDetail[];
	history: LocalizedString;
	historicalFigures: HistoricalFigure[];
	photos: PhotoItem[];
	beforeAfterPairs: BeforeAfterPair[];
	audioGuide: AudioGuide;
	coverImageUrl: string;
	visualStyleNotes?: LocalizedString;
	order: number;
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
}

export interface ApiResponse<T> {
	data: T;
	success: boolean;
	message?: string;
}

export interface PaginatedResponse<T> {
	items: T[];
	total: number;
	page: number;
	pageSize: number;
}
