import { describe, expect, it } from 'vitest';
import { splitProseParagraphs } from '@/widgets/heritage/lib/splitProseParagraphs';

describe('splitProseParagraphs', () => {
	it('splits blank lines and joins hard wraps inside a paragraph', () => {
		expect(
			splitProseParagraphs(
				'Синтез культур\r\n\r\nОдной из жемчужин\nгимназии являются\r\nвходные группы.'
			)
		).toEqual([
			'Синтез культур',
			'Одной из жемчужин гимназии являются входные группы.',
		]);
	});

	it('drops empty paragraphs and collapses extra spaces', () => {
		expect(splitProseParagraphs('  \n\nПервый   абзац  \n\n\n  ')).toEqual([
			'Первый абзац',
		]);
	});
});
