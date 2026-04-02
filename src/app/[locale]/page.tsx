import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { HeritageCard } from '@/components/Heritage/HeritageCard';
import { getMetadataBaseUrl } from '@/env';
import { getHeritageList } from '@/lib/heritage/getHeritageList';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/types/heritage';

type Props = {
	params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const locale = params.locale as Locale;
	if (!routing.locales.includes(locale)) {
		return { title: 'Not Found' };
	}
	const tHome = await getTranslations({ locale, namespace: 'home' });
	const tCommon = await getTranslations({ locale, namespace: 'common' });
	const title = `${tCommon('project_name')} · ${tHome('hero_subtitle')}`;
	const description = tHome('hero_description');
	const base = getMetadataBaseUrl();
	const path = `/${locale}`;

	return {
		title,
		description,
		alternates: {
			canonical: path,
			languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
		},
		openGraph: {
			title,
			description,
			url: new URL(path, base).toString(),
			siteName: tCommon('project_name'),
			locale: locale === 'uz' ? 'uz_UZ' : 'ru_RU',
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
		},
	};
}

export default async function HomePage({ params }: Props) {
	const locale = params.locale as Locale;
	if (!routing.locales.includes(locale)) {
		notFound();
	}

	const t = await getTranslations({ locale, namespace: 'home' });
	const tHeritage = await getTranslations({ locale, namespace: 'heritage' });

	let items: Awaited<ReturnType<typeof getHeritageList>> | null = null;
	let listError = false;
	try {
		items = await getHeritageList();
	} catch {
		listError = true;
	}

	return (
		<>
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 opacity-5">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 30px,
              rgba(201,168,76,0.3) 30px,
              rgba(201,168,76,0.3) 31px
            )`,
						}}
					/>
				</div>

				<div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
					<div className="flex items-center justify-center gap-4 mb-8">
						<div className="flex-1 max-w-32 h-px bg-gradient-to-r from-transparent to-gold-400/60" />
						<div className="border border-gold-400/40 px-4 py-1">
							<span className="text-gold-400/70 font-ui text-[10px] tracking-[0.4em] uppercase">
								1878 — 1902
							</span>
						</div>
						<div className="flex-1 max-w-32 h-px bg-gradient-to-l from-transparent to-gold-400/60" />
					</div>

					<h1 className="font-display text-parchment-50 text-4xl md:text-6xl leading-tight mb-4">
						{t('hero_title')}
					</h1>
					<p className="text-gold-400 font-ui text-sm tracking-[0.3em] uppercase mb-6">
						{t('hero_subtitle')}
					</p>

					<div className="max-w-xl mx-auto">
						<div className="h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent mb-6" />
						<p className="text-parchment-200/70 font-body text-base leading-relaxed">
							{t('hero_description')}
						</p>
						<div className="h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent mt-6" />
					</div>

					<div className="mt-10">
						<a
							href="#objects"
							className="inline-flex items-center gap-3 border border-gold-400/50 hover:border-gold-400 text-gold-400 hover:bg-gold-400/10 transition-all duration-300 px-8 py-3 font-ui text-xs tracking-[0.3em] uppercase"
						>
							{t('explore_button')}
							<span>↓</span>
						</a>
					</div>
				</div>
			</section>

			<section id="objects" className="max-w-7xl mx-auto px-6 pb-24">
				<div className="text-center mb-12">
					<div className="flex items-center gap-4 mb-4">
						<div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-400/30" />
						<span className="text-gold-400 text-sm">✦</span>
						<div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-400/30" />
					</div>
					<h2 className="font-display text-parchment-100 text-2xl mb-2">
						{t('objects_title')}
					</h2>
					<p className="text-parchment-200/50 font-body italic text-sm">
						{t('objects_subtitle')}
					</p>
				</div>

				{listError && (
					<div className="text-center py-20 text-gold-400/60 font-body italic">
						{tHeritage('error')}
					</div>
				)}
				{items && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{items.map((item, idx) => (
							<HeritageCard
								key={item.id}
								item={item}
								index={idx}
								locale={locale}
								readMoreLabel={t('readMore')}
							/>
						))}
					</div>
				)}
			</section>
		</>
	);
}
