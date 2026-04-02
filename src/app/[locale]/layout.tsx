import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import {
	getMessages,
	getTranslations,
	setRequestLocale,
} from 'next-intl/server';
import { dehydrate } from '@tanstack/react-query';
import type { Locale } from '@/types/heritage';
import { routing } from '@/i18n/routing';
import { getHeritageList } from '@/lib/heritage/getHeritageList';
import {
	heritageListQueryKey,
	heritageListStaleTime,
} from '@/lib/heritage/listQuery';
import { createQueryClient } from '@/lib/queryClient';
import { Header } from '@/components/Header/Header';
import { Providers } from './providers';

type Props = {
	children: React.ReactNode;
	params: { locale: string };
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
	title: "Наследие Ферганы | Farg'ona Merosi",
};

export default async function LocaleLayout({
	children,
	params,
}: Readonly<Props>) {
	const locale = params.locale as Locale;
	if (!routing.locales.includes(locale)) notFound();

	setRequestLocale(locale);
	const messages = await getMessages();
	const tLayout = await getTranslations({ locale, namespace: 'layout' });

	const queryClient = createQueryClient();

	try {
		await queryClient.prefetchQuery({
			queryKey: heritageListQueryKey,
			queryFn: getHeritageList,
			staleTime: heritageListStaleTime,
		});
	} catch {}

	const dehydratedState = dehydrate(queryClient);

	return (
		<NextIntlClientProvider messages={messages}>
			<Providers dehydratedState={dehydratedState}>
				<Header />
				<main className="pt-16 min-h-screen">{children}</main>
				<footer className="border-t border-gold-400/15 mt-16 py-8 text-center">
					<div className="flex items-center justify-center gap-4 mb-3">
						<div className="flex-1 max-w-24 h-px bg-gradient-to-r from-transparent to-gold-400/30" />
						<span className="text-gold-400/50 text-xs">✦</span>
						<div className="flex-1 max-w-24 h-px bg-gradient-to-l from-transparent to-gold-400/30" />
					</div>
					<p className="text-parchment-300/40 font-ui text-xs tracking-[0.2em] uppercase">
						{tLayout('footer_line')}
					</p>
				</footer>
			</Providers>
		</NextIntlClientProvider>
	);
}
