import { describe, expect, it } from 'vitest';
import { getMockHeritageById } from '@/mocks/heritage';

describe('getMockHeritageById', () => {
	it('resolves by slug', () => {
		const obj = getMockHeritageById('zdanie-voennogo-sobraniya-dom-oficerov');
		expect(obj).toBeDefined();
		expect(obj?.slug).toBe('zdanie-voennogo-sobraniya-dom-oficerov');
	});

	it('resolves by id', () => {
		const obj = getMockHeritageById('6ab495cb-b13c-4f14-9c87-2ab87098407b');
		expect(obj).toBeDefined();
		expect(obj?.id).toBe('6ab495cb-b13c-4f14-9c87-2ab87098407b');
	});

	it('returns undefined for unknown id', () => {
		expect(getMockHeritageById('unknown-slug')).toBeUndefined();
	});
});
