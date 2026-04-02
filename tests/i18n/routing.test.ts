import { describe, expect, it } from 'vitest';
import { LOCALE_COOKIE_NAME, routing } from '@/i18n/routing';

describe('routing', () => {
	it('defines ru and uz with ru as default', () => {
		expect(routing.locales).toEqual(['ru', 'uz']);
		expect(routing.defaultLocale).toBe('ru');
	});

	it('uses expected locale cookie name', () => {
		expect(LOCALE_COOKIE_NAME).toBe('NEXT_LOCALE');
	});
});
