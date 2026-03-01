'use client';
import { useLocale } from '@/i18n';
import { useHeritageListQuery } from '@/hooks/useHeritageListQuery';
import { HeritageCard } from '@/components/Heritage/HeritageCard';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';

export default function HomePage() {
	const { t, locale } = useLocale();
	const { data: items, isLoading, isError } = useHeritageListQuery();

	return (
		<>
			{/* Hero */}
			<section className="relative overflow-hidden">
				{/* Background ornament */}
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
					{/* Top ornament */}
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
						{t.home.hero_title}
					</h1>
					<p className="text-gold-400 font-ui text-sm tracking-[0.3em] uppercase mb-6">
						{t.home.hero_subtitle}
					</p>

					<div className="max-w-xl mx-auto">
						<div className="h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent mb-6" />
						<p className="text-parchment-200/70 font-body text-base leading-relaxed">
							{t.home.hero_description}
						</p>
						<div className="h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent mt-6" />
					</div>

					<div className="mt-10">
						<a
							href="#objects"
							className="inline-flex items-center gap-3 border border-gold-400/50 hover:border-gold-400 text-gold-400 hover:bg-gold-400/10 transition-all duration-300 px-8 py-3 font-ui text-xs tracking-[0.3em] uppercase"
						>
							{t.home.explore_button}
							<span>↓</span>
						</a>
					</div>
				</div>
			</section>

			{/* Objects grid */}
			<section id="objects" className="max-w-7xl mx-auto px-6 pb-24">
				<div className="text-center mb-12">
					<div className="flex items-center gap-4 mb-4">
						<div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-400/30" />
						<span className="text-gold-400 text-sm">✦</span>
						<div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-400/30" />
					</div>
					<h2 className="font-display text-parchment-100 text-2xl mb-2">
						{t.home.objects_title}
					</h2>
					<p className="text-parchment-200/50 font-body italic text-sm">
						{t.home.objects_subtitle}
					</p>
				</div>

				{isLoading && <LoadingSpinner label={t.heritage.loading} />}
				{isError && (
					<div className="text-center py-20 text-gold-400/60 font-body italic">
						{t.heritage.error}
					</div>
				)}
				{items && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{items.map((item, idx) => (
							<HeritageCard key={item.id} item={item} index={idx} />
						))}
					</div>
				)}
			</section>
		</>
	);
}
