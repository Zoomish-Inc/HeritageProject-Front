'use client';

import { clientEnv } from '@/env';
import type { AnalyticsEventName, AnalyticsEventPayloadMap } from './schema';
import { validateAnalyticsPayload } from './schema';

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
		ym?: (counterId: number, method: string, ...args: unknown[]) => void;
	}
}

type AnalyticsProvider = 'ga' | 'plausible' | 'posthog' | 'none';

type QueueItem = {
	name: AnalyticsEventName;
	payload: Record<string, unknown>;
	attempts: number;
};

const maxQueueAttempts = 5;
const queue: QueueItem[] = [];
let flushTimer: number | undefined;
let flushQueueRunner: () => void = () => undefined;

function getAnalyticsProvider(): AnalyticsProvider {
	const configured = clientEnv.NEXT_PUBLIC_ANALYTICS_PROVIDER;
	if (configured) return configured;
	if (clientEnv.NEXT_PUBLIC_GA_ID) return 'ga';
	return 'none';
}

function canSendToGa() {
	return (
		typeof window !== 'undefined' &&
		typeof window.gtag === 'function' &&
		!!clientEnv.NEXT_PUBLIC_GA_ID
	);
}

function sendToGa(eventName: string, payload: Record<string, unknown>) {
	window.gtag?.('event', eventName, payload);
}

function scheduleFlush(delayMs = 1000) {
	if (flushTimer !== undefined || typeof window === 'undefined') return;
	flushTimer = window.setTimeout(() => {
		flushTimer = undefined;
		flushQueueRunner();
	}, delayMs);
}

function enqueue(
	eventName: AnalyticsEventName,
	payload: Record<string, unknown>
) {
	queue.push({
		name: eventName,
		payload:
			payload && typeof payload === 'object' && !Array.isArray(payload)
				? payload
				: {},
		attempts: 0,
	});
	scheduleFlush();
}

export function flushAnalyticsQueue() {
	if (queue.length === 0) return;
	if (!canSendToGa()) {
		scheduleFlush(2000);
		return;
	}
	const nextQueue: QueueItem[] = [];
	for (const item of queue) {
		if (item && typeof item === 'object') {
			const payload =
				item.payload &&
				typeof item.payload === 'object' &&
				!Array.isArray(item.payload)
					? item.payload
					: {};

			try {
				sendToGa(item.name, payload);
			} catch {
				const attempts = item.attempts + 1;
				if (attempts < maxQueueAttempts) {
					nextQueue.push({ ...item, payload, attempts });
				}
			}
		}
	}
	queue.length = 0;
	queue.push(...nextQueue);
	if (queue.length > 0) scheduleFlush(2000);
}

flushQueueRunner = flushAnalyticsQueue;

export function trackRawEvent<K extends AnalyticsEventName>(
	eventName: K,
	payload: AnalyticsEventPayloadMap[K]
) {
	validateAnalyticsPayload(eventName, payload);
	const provider = getAnalyticsProvider();
	if (provider !== 'ga') return;

	if (canSendToGa()) {
		sendToGa(eventName, payload as Record<string, unknown>);
		return;
	}
	enqueue(eventName, payload as Record<string, unknown>);
}

function tryYandexMetrikaHit(
	counterId: number,
	url: string,
	pageTitle?: string
) {
	if (typeof window === 'undefined') return;
	const send = () => {
		if (typeof window.ym !== 'function') return false;
		window.ym(counterId, 'hit', url, {
			...(pageTitle ? { title: pageTitle } : {}),
		});
		return true;
	};
	if (send()) return;
	window.setTimeout(() => {
		send();
	}, 800);
}

export function trackPageView(
	pagePath: string,
	pageTitle?: string,
	pageLocation?: string
) {
	trackRawEvent('page_view', {
		page_path: pagePath,
		...(pageTitle ? { page_title: pageTitle } : {}),
		...(pageLocation ? { page_location: pageLocation } : {}),
	});

	const ymIdRaw = clientEnv.NEXT_PUBLIC_YANDEX_METRIKA_ID;
	if (ymIdRaw) {
		const url =
			pageLocation ??
			(typeof window !== 'undefined' ? window.location.href : undefined);
		if (url) {
			tryYandexMetrikaHit(Number(ymIdRaw), url, pageTitle);
		}
	}
}
