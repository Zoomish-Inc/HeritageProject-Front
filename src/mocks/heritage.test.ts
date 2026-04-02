import { describe, expect, it } from 'vitest';
import { getMockHeritageById } from './heritage';

describe('getMockHeritageById', () => {
	it('resolves by slug', () => {
		const obj = getMockHeritageById('voennoye-sobranie');
		expect(obj).toBeDefined();
		expect(obj?.slug).toBe('voennoye-sobranie');
	});

	it('resolves by id', () => {
		const obj = getMockHeritageById('1');
		expect(obj).toBeDefined();
		expect(obj?.id).toBe('1');
	});

	it('returns undefined for unknown id', () => {
		expect(getMockHeritageById('unknown-slug')).toBeUndefined();
	});
});
