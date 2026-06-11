const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const remotePatterns = [
	{
		protocol: 'https',
		hostname: '**',
		pathname: '/**',
	},
	{
		protocol: 'http',
		hostname: '**',
		pathname: '/**',
	},
];

/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		dirs: ['src'],
	},
	images: {
		unoptimized: true,
		remotePatterns,
	},
};

module.exports = withNextIntl(nextConfig);
