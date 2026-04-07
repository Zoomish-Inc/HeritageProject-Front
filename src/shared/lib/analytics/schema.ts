'use client';

import { z } from 'zod';
import { runtimeConfig } from '@/shared/config';

export const analyticsEventSchemas = {
	page_view: z.object({
		page_path: z.string().min(1),
		page_title: z.string().optional(),
		page_location: z.string().url().optional(),
	}),
	view_heritage: z.object({
		locale: z.string().min(2),
		slug: z.string().min(1),
		page_path: z.string().min(1),
	}),
	theme_toggle: z.object({
		theme: z.enum(['light', 'dark']),
	}),
	language_switch: z.object({
		from_locale: z.string().min(2),
		to_locale: z.string().min(2),
		path: z.string().min(1),
	}),
	mobile_menu_open: z
		.object({})
		.optional()
		.transform(() => ({})),
	mobile_menu_close: z.object({
		reason: z.string().min(1),
	}),
	heritage_card_click: z.object({
		slug: z.string().min(1),
		locale: z.string().min(2),
		index: z.number().int().positive(),
	}),
	landmark_nav_click: z.object({
		slug: z.string().min(1),
		locale: z.string().min(2),
		placement: z.enum(['menu', 'list']),
		index: z.number().int().positive(),
	}),
	before_after_interact: z.object({
		label: z.string().min(1),
		source: z.enum(['drag', 'range']),
	}),
} as const;

export type AnalyticsEventName = keyof typeof analyticsEventSchemas;

export type AnalyticsEventPayloadMap = {
	[K in AnalyticsEventName]: z.infer<(typeof analyticsEventSchemas)[K]>;
};

export function validateAnalyticsPayload<K extends AnalyticsEventName>(
	eventName: K,
	payload: AnalyticsEventPayloadMap[K]
) {
	if (!runtimeConfig.isDev) return payload;
	const schema = analyticsEventSchemas[eventName];
	const result = schema.safeParse(payload);
	if (!result.success) {
		console.warn('[analytics] payload validation failed', {
			eventName,
			issues: result.error.issues,
		});
	}
	return payload;
}
