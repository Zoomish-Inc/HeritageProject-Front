export const runtimeConfig = {
	isDev: process.env.NODE_ENV === 'development',
	isProd: process.env.NODE_ENV === 'production',
	vercelUrl: process.env.VERCEL_URL,
};

export const seoConfig = {
	googleVerification: process.env.GOOGLE_SITE_VERIFICATION?.trim(),
	yandexVerification: process.env.YANDEX_VERIFICATION?.trim(),
	organizationSameAs: process.env.ORGANIZATION_SAME_AS?.trim(),
	additionalSitemapUrls: process.env.ADDITIONAL_SITEMAP_URLS?.trim(),
};

export const analyticsConfig = {
	gaId: process.env.NEXT_PUBLIC_GA_ID?.trim(),
	provider: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER?.trim(),
};
