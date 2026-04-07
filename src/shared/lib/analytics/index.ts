'use client';

export { flushAnalyticsQueue, trackPageView } from './core';
export {
	trackBeforeAfterInteract,
	trackHeritageCardClick,
	trackHeritageView,
	trackLandmarkNavClick,
	trackLanguageSwitch,
	trackMobileMenuClose,
	trackMobileMenuOpen,
	trackThemeToggle,
} from './events';
export type { AnalyticsEventName, AnalyticsEventPayloadMap } from './schema';
