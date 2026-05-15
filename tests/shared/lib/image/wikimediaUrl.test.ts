import { describe, expect, it } from 'vitest';
import { normalizeWikimediaImageUrl } from '@/shared/lib/image/wikimediaUrl';

const khramThumb =
	'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/%D0%A5%D1%80%D0%B0%D0%BC_%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%BE%D0%B1%D0%BD%D0%BE%D0%B3%D0%BE_%D0%A1%D0%B5%D1%80%D0%B3%D0%B8%D1%8F_%D0%A0%D0%B0%D0%B4%D0%BE%D0%BD%D0%B5%D0%B6%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%28%D0%A4%D0%B5%D1%80%D0%B3%D0%B0%D0%BD%D0%B0%29_%D1%84%D0%BE%D1%82%D0%BE_1..JPG/960px-%D0%A5%D1%80%D0%B0%D0%BC_%D0%BF%D1%80%D0%B5%D0%BF%D0%BE%D0%B4%D0%BE%D0%B1%D0%BD%D0%BE%D0%B3%D0%BE_%D0%A1%D0%B5%D1%80%D0%B3%D0%B8%D1%8F_%D0%A0%D0%B0%D0%B4%D0%BE%D0%BD%D0%B5%D0%B6%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%28%D0%A4%D0%B5%D1%80%D0%B3%D0%B0%D0%BD%D0%B0%29_%D1%84%D0%BE%D1%82%D0%BE_1..JPG?utm_source=ru.wikipedia.org&utm_campaign=index&utm_content=thumbnail';

describe('normalizeWikimediaImageUrl', () => {
	it('strips query params and converts thumb to direct commons path', () => {
		const normalized = normalizeWikimediaImageUrl(khramThumb);
		expect(normalized).not.toContain('?');
		expect(normalized).not.toContain('/thumb/');
		expect(normalized).toContain('/commons/5/59/');
		expect(normalized).toContain('%D1%84%D0%BE%D1%82%D0%BE_1..JPG');
	});

	it('leaves non-wikimedia URLs unchanged', () => {
		const url = 'https://cdn.example.com/a.jpg?v=1';
		expect(normalizeWikimediaImageUrl(url)).toBe(url);
	});
});
