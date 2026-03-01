import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/types/heritage';
import { Header } from '@/components/Header/Header';
import { Providers } from './providers';

type Props = {
	children: React.ReactNode;
	params: { locale: string };
};

const VALID_LOCALES: Locale[] = ['ru', 'uz'];

export async function generateStaticParams() {
	return VALID_LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
	title: "Наследие Ферганы | Farg'ona Merosi",
};

export default function LocaleLayout({ children, params }: Props) {
	const locale = params.locale as Locale;
	if (!VALID_LOCALES.includes(locale)) notFound();

	return (
		<Providers initialLocale={locale}>
			<Header />
			<main className="pt-16 min-h-screen">{children}</main>
			<footer className="border-t border-gold-400/15 mt-16 py-8 text-center">
				<div className="flex items-center justify-center gap-4 mb-3">
					<div className="flex-1 max-w-24 h-px bg-gradient-to-r from-transparent to-gold-400/30" />
					<span className="text-gold-400/50 text-xs">✦</span>
					<div className="flex-1 max-w-24 h-px bg-gradient-to-l from-transparent to-gold-400/30" />
				</div>
				<p className="text-parchment-300/40 font-ui text-xs tracking-[0.2em] uppercase">
					Наследие Ферганы · XIX–XX вв.
				</p>
			</footer>
		</Providers>
	);
}
