import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond, Playfair_Display } from 'next/font/google';
import { getMetadataBaseUrl } from '@/env';
import { routing } from '@/i18n/routing';
import { AnalyticsPageTracker } from '@/lib/analytics/AnalyticsPageTracker';
import { GoogleAnalytics } from '@/lib/analytics/GoogleAnalytics';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const playfairDisplay = Playfair_Display({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-display',
	display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500'],
	variable: '--font-body',
	display: 'swap',
});

const cinzel = Cinzel({
	subsets: ['latin'],
	weight: ['400', '600'],
	variable: '--font-ui',
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
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var key='theme-preference';var saved=localStorage.getItem(key);var prefersLight=window.matchMedia('(prefers-color-scheme: light)').matches;var theme=saved==='light'||saved==='dark'?saved:(prefersLight?'light':'dark');var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(theme);}catch(e){document.documentElement.classList.add('dark');}})();`,
					}}
				/>
				<meta
					name="google-site-verification"
					content="KJX3dKc13wdH-OnAQ-Uxl9VahGz0GtpzJfugV7iWGeg"
				/>
			</head>
			<body
				className={`${playfairDisplay.variable} ${cormorantGaramond.variable} ${cinzel.variable}`}
			>
				<GoogleAnalytics />
				<AnalyticsPageTracker />
				{children}
				<Analytics />
			</body>
		</html>
	);
}
