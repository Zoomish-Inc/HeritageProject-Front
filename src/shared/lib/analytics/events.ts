'use client';

import { trackRawEvent } from './core';

export function trackHeritageView(
	locale: string,
	slug: string,
	pagePath: string
) {
	trackRawEvent('view_heritage', {
		locale,
		slug,
		page_path: pagePath,
	});
}

export function trackThemeToggle(theme: 'light' | 'dark') {
	trackRawEvent('theme_toggle', { theme });
}

export function trackLanguageSwitch(
	fromLocale: string,
	toLocale: string,
	path: string
) {
	trackRawEvent('language_switch', {
		from_locale: fromLocale,
		to_locale: toLocale,
		path,
	});
}

export function trackMobileMenuOpen() {
	trackRawEvent('mobile_menu_open', {});
}

export function trackMobileMenuClose(reason: string) {
	trackRawEvent('mobile_menu_close', { reason });
}

export function trackHeritageCardClick(
	slug: string,
	locale: string,
	index: number
) {
	trackRawEvent('heritage_card_click', { slug, locale, index });
}

export function trackLandmarkNavClick(
	slug: string,
	locale: string,
	placement: 'menu' | 'list',
	index: number
) {
	trackRawEvent('landmark_nav_click', { slug, locale, placement, index });
}

export function trackBeforeAfterInteract(
	label: string,
	source: 'drag' | 'range'
) {
	trackRawEvent('before_after_interact', { label, source });
}
