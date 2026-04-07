import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/env', () => ({
	clientEnv: {
		NEXT_PUBLIC_ANALYTICS_PROVIDER: 'ga',
		NEXT_PUBLIC_GA_ID: 'G-TEST1234',
	},
}));

describe('analytics facade', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.resetModules();
	});

	it('sends typed event to gtag when ready', async () => {
		const gtag = vi.fn();
		(window as unknown as { gtag?: (...args: unknown[]) => void }).gtag = gtag;

		const { trackThemeToggle } = await import('@/shared/lib/analytics');
		trackThemeToggle('light');

		expect(gtag).toHaveBeenCalledWith('event', 'theme_toggle', {
			theme: 'light',
		});
	});

	it('queues event and flushes after gtag appears', async () => {
		(window as unknown as { gtag?: (...args: unknown[]) => void }).gtag =
			undefined;

		const { trackMobileMenuOpen } = await import('@/shared/lib/analytics');
		trackMobileMenuOpen();

		const gtag = vi.fn();
		(window as unknown as { gtag?: (...args: unknown[]) => void }).gtag = gtag;

		await vi.advanceTimersByTimeAsync(3200);
		expect(gtag).toHaveBeenCalledWith('event', 'mobile_menu_open', {});
	});

	it('validates payload shape via typed wrappers', async () => {
		const gtag = vi.fn();
		(window as unknown as { gtag?: (...args: unknown[]) => void }).gtag = gtag;

		const { trackHeritageCardClick } = await import('@/shared/lib/analytics');
		trackHeritageCardClick('slug-x', 'ru', 1);

		expect(gtag).toHaveBeenCalledWith('event', 'heritage_card_click', {
			slug: 'slug-x',
			locale: 'ru',
			index: 1,
		});
	});
});
