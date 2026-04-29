import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { getMetadataBaseUrl } from '@/env';
import { routing } from '@/i18n/routing';
import {
	AnalyticsPageTracker,
	GoogleAnalytics,
	YandexMetrika,
} from '@/shared/lib/analytics/provider';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const cormorantGaramond = Cormorant_Garamond({
	subsets: ['latin', 'cyrillic'],
	weight: ['500', '600', '700'],
	variable: '--font-display',
	display: 'swap',
});

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500'],
	variable: '--font-body',
	display: 'swap',
});

export const metadata: Metadata = {
	metadataBase: getMetadataBaseUrl(),
	title: "Наследие Ферганы | Farg'ona Merosi",
	description:
		'Виртуальный тур по историко-архитектурному наследию г. Фергана XIX–XX вв.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang={routing.defaultLocale} suppressHydrationWarning>
			<head>
				<GoogleAnalytics />
				<YandexMetrika />
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var key='theme-preference';var saved=localStorage.getItem(key);var prefersLight=window.matchMedia('(prefers-color-scheme: light)').matches;var theme=saved==='light'||saved==='dark'?saved:(prefersLight?'light':'dark');var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(theme);}catch(e){document.documentElement.classList.add('dark');}})();`,
					}}
				/>
			</head>
			<body className={`${cormorantGaramond.variable} ${inter.variable}`}>
				<AnalyticsPageTracker />
				{children}
				<Analytics />
			</body>
		</html>
	);
}
