import { z } from 'zod';

const emptyToUndefined = (v: unknown) =>
	v === '' || v === undefined ? undefined : v;

const clientSchema = z.object({
	NEXT_PUBLIC_USE_MOCK: z.preprocess(
		emptyToUndefined,
		z.enum(['true', 'false']).optional()
	),
	NEXT_PUBLIC_API_URL: z.preprocess(
		emptyToUndefined,
		z.string().url().optional()
	),
	NEXT_PUBLIC_SITE_URL: z.preprocess(
		emptyToUndefined,
		z.string().url().optional()
	),
});

const parsed = clientSchema.safeParse({
	NEXT_PUBLIC_USE_MOCK: process.env.NEXT_PUBLIC_USE_MOCK,
	NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

export type ClientEnv = z.infer<typeof clientSchema>;

const fallback: ClientEnv = {};

export const clientEnv: ClientEnv = parsed.success
	? parsed.data
	: (() => {
			if (process.env.NODE_ENV === 'development' && parsed.error) {
				console.warn('[env] Invalid NEXT_PUBLIC_* values:', parsed.error.flatten());
			}
			return fallback;
		})();

export function getApiBaseUrl(): string {
	return (
		clientEnv.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? 'http://localhost:8000'
	);
}

export function getMetadataBaseUrl(): URL {
	if (clientEnv.NEXT_PUBLIC_SITE_URL) {
		return new URL(clientEnv.NEXT_PUBLIC_SITE_URL);
	}
	if (process.env.VERCEL_URL) {
		return new URL(`https://${process.env.VERCEL_URL}`);
	}
	return new URL('http://localhost:3000');
}
