import { describe, expect, it } from 'vitest';
import {
	getMediaSourceResourceLabel,
	resolvePhotoAttributionSourceUrl,
} from '@/widgets/heritage/lib/mediaSourceResourceLabel';

describe('getMediaSourceResourceLabel', () => {
	it('maps Wikimedia hosts to Wikipedia label', () => {
		expect(
			getMediaSourceResourceLabel(
				'https://upload.wikimedia.org/wikipedia/commons/a/a.jpg',
				'ru'
			)
		).toBe('Википедия');
		expect(
			getMediaSourceResourceLabel(
				'https://ru.wikipedia.org/wiki/File:Example.jpg',
				'uz'
			)
		).toBe('Vikipediya');
	});

	it('maps Yandex hosts', () => {
		expect(
			getMediaSourceResourceLabel('https://yandex.uz/maps/org/1/gallery/', 'ru')
		).toBe('Яндекс Карты');
		expect(
			getMediaSourceResourceLabel(
				'https://avatars.mds.yandex.net/get-altay/x/orig',
				'uz'
			)
		).toBe('Yandex Xaritalar');
	});

	it('maps Wikimapia', () => {
		expect(
			getMediaSourceResourceLabel('http://photos.wikimapia.org/p/1.jpg', 'ru')
		).toBe('Викимапия');
	});

	it('returns undefined for unknown hosts', () => {
		expect(
			getMediaSourceResourceLabel('https://example.com/a.jpg', 'ru')
		).toBeUndefined();
	});
});

describe('resolvePhotoAttributionSourceUrl', () => {
	it('prefers explicit sourceUrl', () => {
		expect(
			resolvePhotoAttributionSourceUrl(
				'https://ru.wikipedia.org/wiki/File:X',
				'https://upload.wikimedia.org/a.jpg',
				'ru'
			)
		).toBe('https://ru.wikipedia.org/wiki/File:X');
	});

	it('falls back to media url when it is a known resource', () => {
		expect(
			resolvePhotoAttributionSourceUrl(
				undefined,
				'https://upload.wikimedia.org/wikipedia/commons/a/a.jpg',
				'ru'
			)
		).toBe('https://upload.wikimedia.org/wikipedia/commons/a/a.jpg');
	});

	it('returns undefined when no known resource', () => {
		expect(
			resolvePhotoAttributionSourceUrl(undefined, 'https://sobory.ru/x.jpg', 'ru')
		).toBeUndefined();
	});
});
