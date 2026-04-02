import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import {
	getMessages,
	getTranslations,
	setRequestLocale,
} from 'next-intl/server';
import { dehydrate } from '@tanstack/react-query';
import { DecorativeFlourish } from '@/components/UI/DecorativeFlourish';
import { Header } from '@/components/Header/Header';
import { routing } from '@/i18n/routing';
import { heritageListQueryFn } from '@/lib/heritage/getHeritageList';
import {
	heritageListQueryKey,
	heritageListStaleTime,
} from '@/lib/heritage/listQuery';
import { createQueryClient } from '@/lib/queryClient';
import type { Locale } from '@/types/heritage';
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
			queryFn: heritageListQueryFn,
			staleTime: heritageListStaleTime,
		});
	} catch (err) {
		if (process.env.NODE_ENV === 'development') {
			console.warn('[heritage] list prefetch failed', err);
		}
	}

	const dehydratedState = dehydrate(queryClient);

	return (
		<NextIntlClientProvider messages={messages}>
			<Providers dehydratedState={dehydratedState}>
				<Header />
				<main className="pt-16 min-h-screen">{children}</main>
				<footer className="border-t border-gold-400/15 mt-16 py-8 text-center">
					<DecorativeFlourish variant="footer" className="justify-center mb-3" />
					<p className="text-parchment-300/40 font-ui text-xs tracking-[0.2em] uppercase">
						{tLayout('footer_line')}
					</p>
				</footer>
			</Providers>
		</NextIntlClientProvider>
	);
}
