import type { Locale } from '@/entities/heritage';
import { HomeJsonLdFeature } from '@/features/seo';
import { isSupportedLocale } from '@/i18n/locale';
import { getPublicHeritageList } from '@/lib/heritage/readModel';
import { DecorativeFlourish, getUiCtaButtonClassName } from '@/shared/ui';
import { HeritageObjectsSection } from '@/widgets/heritage';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

export async function HomePageView({ locale }: { locale: Locale }) {
	if (!isSupportedLocale(locale)) {
		notFound();
	}

	const t = await getTranslations({ locale, namespace: 'home' });
	const tCommon = await getTranslations({ locale, namespace: 'common' });
	let listItems: Awaited<ReturnType<typeof getPublicHeritageList>> = [];

	try {
		listItems = await getPublicHeritageList();
	} catch {
		listItems = [];
	}

	return (
		<>
			<HomeJsonLdFeature
				items={listItems}
				locale={locale}
				projectName={tCommon('project_name')}
				description={t('hero_description')}
			/>
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
					<h1 className="font-display text-parchment-50 text-4xl md:text-6xl leading-tight mb-4">
						{t('hero_title')}
					</h1>
					<p className="text-theme-accent font-body text-sm tracking-[0.3em] uppercase mb-6">
						{t('hero_subtitle')}
					</p>

					<div className="max-w-xl mx-auto">
						<div className="h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent mb-6" />
						<p className="text-theme-muted font-body text-base leading-relaxed">
							{t('hero_description')}
						</p>
						<div className="h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent mt-6" />
					</div>

					<div className="mt-10">
						<a
							href="#objects"
							className={getUiCtaButtonClassName({
								size: 'md',
								variant: 'accent',
								className: 'gap-3 px-8 py-3 tracking-[0.3em]',
							})}
						>
							{t('explore_button')}
							<span>↓</span>
						</a>
					</div>
				</div>
			</section>

			<section id="objects" className="max-w-7xl mx-auto px-6 pb-24">
				<div className="text-center mb-12">
					<DecorativeFlourish className="mb-4" />
					<h2 className="font-display text-parchment-100 text-2xl">
						{t('objects_title')}
					</h2>
				</div>

				<HeritageObjectsSection />
			</section>
		</>
	);
}
