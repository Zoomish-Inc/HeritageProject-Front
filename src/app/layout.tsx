import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond, Playfair_Display } from 'next/font/google';
import { getMetadataBaseUrl } from '@/env';
import { getLocale } from 'next-intl/server';
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

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const locale = await getLocale();

	return (
		<html lang={locale}>
			<body
				className={`${playfairDisplay.variable} ${cormorantGaramond.variable} ${cinzel.variable}`}
			>
				{children}
			</body>
		</html>
	);
}
