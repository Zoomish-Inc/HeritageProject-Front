const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

function tryRemotePatternFromEnvUrl(envVar) {
	const raw = process.env[envVar];
	if (!raw) return null;
	try {
		const u = new URL(raw);
		const pattern = {
			protocol: u.protocol.replace(':', ''),
			hostname: u.hostname,
			pathname: '/**',
		};
		if (u.port) {
			pattern.port = u.port;
		}
		return pattern;
	} catch {
		return null;
	}
}

const baseRemotePatterns = [
	{
		protocol: 'https',
		hostname: 'upload.wikimedia.org',
		pathname: '/wikipedia/**',
	},
];

const apiPattern = tryRemotePatternFromEnvUrl('NEXT_PUBLIC_API_URL');
const cdnPattern = tryRemotePatternFromEnvUrl('NEXT_PUBLIC_IMAGE_CDN_URL');

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			...baseRemotePatterns,
			...(apiPattern ? [apiPattern] : []),
			...(cdnPattern ? [cdnPattern] : []),
		],
	},
};

module.exports = withNextIntl(nextConfig);
