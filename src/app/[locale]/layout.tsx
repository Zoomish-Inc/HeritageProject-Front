import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import {
	getMessages,
	getTranslations,
	setRequestLocale,
} from 'next-intl/server';
import { dehydrate } from '@tanstack/react-query';
import { DocumentLangSync } from '@/shared/lib/i18n';
import { runtimeConfig } from '@/shared/config';
import { DecorativeFlourish } from '@/shared/ui';
import { routing } from '@/i18n/routing';
import { heritageListQueryFn } from '@/lib/heritage/getHeritageList';
import {
	heritageListQueryKey,
	heritageListStaleTime,
} from '@/lib/heritage/listQuery';
import { createQueryClient } from '@/lib/queryClient';
import type { Locale } from '@/entities/heritage';
import { HeaderWidget } from '@/widgets/header';
import { Providers } from './providers';

type Props = {
	children: React.ReactNode;
	params: { locale: string };
};

export function generateStaticParams() {
	if (runtimeConfig.isDev) {
		return [];
	}
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
		if (runtimeConfig.isDev) {
			console.warn('[heritage] list prefetch failed', err);
		}
	}

	const dehydratedState = dehydrate(queryClient);

	return (
		<NextIntlClientProvider messages={messages}>
			<DocumentLangSync />
			<Providers dehydratedState={dehydratedState}>
				<HeaderWidget />
				<main className="pt-16 min-h-screen">{children}</main>
				<footer className="border-t border-gold-400/15 mt-16 py-8 text-center">
					<DecorativeFlourish variant="footer" className="justify-center mb-3" />
					<p className="text-parchment-300/40 font-body text-xs tracking-[0.2em] uppercase">
						{tLayout('footer_line')}
					</p>
				</footer>
			</Providers>
		</NextIntlClientProvider>
	);
}
