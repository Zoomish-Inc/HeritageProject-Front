import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { trackEvent } from '@/lib/analytics';
import type { HeritageListItem, Locale } from '@/types/heritage';

interface Props {
	item: HeritageListItem;
	index: number;
	locale: Locale;
	readMoreLabel: string;
}

export const HeritageCard = ({ item, index, locale, readMoreLabel }: Props) => {
	return (
		<Link
			href={`/heritage/${item.slug}`}
			onClick={() =>
				trackEvent('heritage_card_click', {
					slug: item.slug,
					locale,
					index: index + 1,
				})
			}
			className="group relative block overflow-hidden rounded-xl border border-gold-400/20 hover:border-gold-400/60 transition-all duration-500 bg-sepia-800"
		>
			<div className="relative h-56 overflow-hidden">
				<Image
					src={item.coverImageUrl}
					alt={item.name[locale]}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
					className="object-cover [filter:sepia(0.4)] transition-transform duration-700 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-sepia-900/40 z-10 group-hover:bg-sepia-900/20 transition-all duration-500 pointer-events-none" />
				<div className="absolute top-3 left-3 z-20 w-8 h-8 border border-gold-400/60 flex items-center justify-center bg-sepia-900/80">
					<span className="text-gold-400 font-ui text-xs">
						{String(index + 1).padStart(2, '0')}
					</span>
				</div>
				<div className="absolute bottom-3 right-3 z-20 bg-sepia-900/80 border border-gold-400/30 px-2 py-1">
					<span className="text-gold-400 font-ui text-xs tracking-widest">
						{item.yearRange ?? item.yearBuilt}
					</span>
				</div>
			</div>

			<div className="p-5 relative">
				<div className="h-px bg-gradient-to-r from-gold-400/60 to-transparent mb-4" />

				<h3 className="font-display text-parchment-100 text-base leading-snug mb-2 group-hover:text-gold-300 transition-colors duration-300">
					{item.name[locale]}
				</h3>
				<p className="text-parchment-200/60 font-body text-sm leading-relaxed line-clamp-2">
					{item.shortDescription[locale]}
				</p>

				<div className="mt-4 flex items-center gap-2 text-gold-400/50 group-hover:text-gold-400 transition-colors duration-300">
					<span className="font-ui text-[10px] tracking-[0.2em] uppercase">
						{readMoreLabel}
					</span>
					<span className="text-xs group-hover:translate-x-1 transition-transform duration-300">
						→
					</span>
				</div>

				<div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold-400/20 group-hover:border-gold-400/50 transition-colors duration-300" />
			</div>
		</Link>
	);
};
