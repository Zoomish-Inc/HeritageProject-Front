import type { Metadata } from 'next';

export function getMetadataVerification():
	| Metadata['verification']
	| undefined {
	const google = process.env.GOOGLE_SITE_VERIFICATION?.trim();
	const yandex = process.env.YANDEX_VERIFICATION?.trim();
	if (!google && !yandex) return undefined;
	return {
		...(google ? { google } : {}),
		...(yandex ? { yandex } : {}),
	};
}

export function getOrganizationSameAsUrls(): string[] {
	const raw = process.env.ORGANIZATION_SAME_AS?.trim();
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
