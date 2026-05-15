import { describe, expect, it } from 'vitest';
import { isDirectImageUrl } from '@/mocks/heritage/imageUrl';

describe('isDirectImageUrl', () => {
	it('accepts wikimedia upload URLs', () => {
		expect(
			isDirectImageUrl(
				'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Example.jpg/800px-Example.jpg'
			)
		).toBe(true);
	});

	it('accepts yandex avatar CDN URLs', () => {
		expect(
			isDirectImageUrl(
				'https://avatars.mds.yandex.net/get-altay/9724410/2a000001899818ed953dca12d75843d8fcec/orig'
			)
		).toBe(true);
	});

	it('accepts Yandex Disk preview image CDN', () => {
		expect(
			isDirectImageUrl(
				'https://downloader.disk.yandex.ru/preview/abc/xyz?content_type=image%2Fjpeg'
			)
		).toBe(true);
	});

	it('accepts URLs with image file extension', () => {
		expect(
			isDirectImageUrl('https://cdn.example.com/assets/photo.webp?v=1')
		).toBe(true);
	});

	it('rejects album and page URLs', () => {
		expect(isDirectImageUrl('https://ru.files.fm/u/9zv7sc6xgt')).toBe(false);
		expect(isDirectImageUrl('https://disk.yandex.ru/d/R2ioBrjeNW211g')).toBe(
			false
		);
		expect(isDirectImageUrl('https://humodoc.com/ru/ambar/example')).toBe(false);
	});

	it('rejects relative paths', () => {
		expect(isDirectImageUrl('/images/heritage/slug/cover.webp')).toBe(false);
	});
});
