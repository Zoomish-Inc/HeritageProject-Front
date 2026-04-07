import {
	heritageListItemsToApiWire,
	type HeritageListApiResponseWire,
} from '@/lib/heritage/heritageListWire';
import { parseHeritageListResponseJson } from '@/lib/heritage/schemas';
import { rawMockHeritageObjects } from '@/mocks/heritage/rawMockHeritageObjects';
import type { HeritageListItem, HeritageObject } from '@/entities/heritage';

const buildPlaceholderUrl = (seed: string, width = 1400, height = 900) =>
	`https://placehold.co/${width}x${height}/3d2b1f/f5ede0.webp?text=${encodeURIComponent(
		seed
	)}`;

const withPlaceholderImage = (url: string, seed: string) => {
	const isHttp = /^https?:\/\//.test(url);
	if (!isHttp) return url;
	return buildPlaceholderUrl(seed);
};

export const MOCK_HERITAGE_OBJECTS: HeritageObject[] =
	rawMockHeritageObjects.map((obj) => ({
		...obj,
		coverImageUrl: withPlaceholderImage(obj.coverImageUrl, `${obj.slug}-cover`),
		photos: obj.photos.map((photo, index) => ({
			...photo,
			url: withPlaceholderImage(photo.url, `${obj.slug}-photo-${index}`),
		})),
		beforeAfterPairs: obj.beforeAfterPairs.map((pair, index) => ({
			...pair,
			before: {
				...pair.before,
				url: withPlaceholderImage(pair.before.url, `${obj.slug}-before-${index}`),
			},
			after: {
				...pair.after,
				url: withPlaceholderImage(pair.after.url, `${obj.slug}-after-${index}`),
			},
		})),
		architectureDetails: obj.architectureDetails.map((item, index) => ({
			...item,
			imageUrl: item.imageUrl
				? withPlaceholderImage(item.imageUrl, `${obj.slug}-architecture-${index}`)
				: item.imageUrl,
		})),
		historicalFigures: obj.historicalFigures.map((figure, index) => ({
			...figure,
			photoUrl: figure.photoUrl
				? withPlaceholderImage(figure.photoUrl, `${obj.slug}-figure-${index}`)
				: figure.photoUrl,
		})),
		audioGuide: {
			...obj.audioGuide,
			audioUrl: obj.audioGuide.audioUrl
				? withPlaceholderImage(obj.audioGuide.audioUrl, `${obj.slug}-audio`)
				: obj.audioGuide.audioUrl,
		},
	}));

function heritageObjectToListItem(obj: HeritageObject): HeritageListItem {
	return {
		id: obj.id,
		slug: obj.slug,
		name: obj.name,
		yearBuilt: obj.yearBuilt,
		yearRange: obj.yearRange,
		address: obj.address,
		coverImageUrl: obj.coverImageUrl,
		shortDescription: obj.shortDescription,
		order: obj.order,
	};
}

export const MOCK_HERITAGE_LIST_RESPONSE: HeritageListApiResponseWire = {
	success: true,
	message: null,
	data: heritageListItemsToApiWire(
		MOCK_HERITAGE_OBJECTS.map(heritageObjectToListItem)
	),
};

export const MOCK_HERITAGE_LIST: HeritageListItem[] =
	parseHeritageListResponseJson(MOCK_HERITAGE_LIST_RESPONSE);

export const getMockHeritageById = (id: string): HeritageObject | undefined =>
	MOCK_HERITAGE_OBJECTS.find((o) => o.id === id || o.slug === id);
