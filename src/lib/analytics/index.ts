'use client';

import { clientEnv } from '@/env';

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

type AnalyticsProvider = 'ga' | 'plausible' | 'posthog' | 'none';

export type AnalyticsEventName =
	| 'page_view'
	| 'view_heritage'
	| 'theme_toggle'
	| 'language_switch'
	| 'mobile_menu_open'
	| 'mobile_menu_close'
	| 'heritage_card_click'
	| 'landmark_nav_click'
	| 'before_after_interact';

function getAnalyticsProvider(): AnalyticsProvider {
	const configured = clientEnv.NEXT_PUBLIC_ANALYTICS_PROVIDER;
	if (configured) return configured;
	if (clientEnv.NEXT_PUBLIC_GA_ID) return 'ga';
	return 'none';
}

function trackViaGoogleAnalytics(
	eventName: string,
	params?: Record<string, unknown>
) {
	if (typeof window === 'undefined') return;
	if (!window.gtag || !clientEnv.NEXT_PUBLIC_GA_ID) return;
	window.gtag('event', eventName, params ?? {});
}

export function trackEvent(
	eventName: AnalyticsEventName,
	params?: Record<string, unknown>
) {
	const provider = getAnalyticsProvider();
	if (provider === 'ga') {
		trackViaGoogleAnalytics(eventName, params);
		return;
	}
	if (provider === 'plausible') return;
	if (provider === 'posthog') return;
}

export function trackPageView(
	pagePath: string,
	pageTitle?: string,
	pageLocation?: string
) {
	trackEvent('page_view', {
		page_path: pagePath,
		...(pageTitle ? { page_title: pageTitle } : {}),
		...(pageLocation ? { page_location: pageLocation } : {}),
	});
}
