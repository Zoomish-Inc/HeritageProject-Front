import type { Metadata } from 'next';
import { seoConfig } from '@/shared/config';

export function getMetadataVerification():
	| Metadata['verification']
	| undefined {
	const google = seoConfig.googleVerification;
	const yandex = seoConfig.yandexVerification;
	if (!google && !yandex) return undefined;
	return {
		...(google ? { google } : {}),
		...(yandex ? { yandex } : {}),
	};
}

export function getOrganizationSameAsUrls(): string[] {
	const raw = seoConfig.organizationSameAs;
	if (!raw) return [];
	return raw
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean)
		.filter((u) => {
			try {
				new URL(u);
				return true;
			} catch {
				return false;
			}
		});
}
