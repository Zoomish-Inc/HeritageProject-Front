import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import {
	imagePlaceholderDataUrl,
	imageQuality,
} from '@/shared/lib/image/placeholder';
import type { HeritageObject, Locale } from '@/entities/heritage';

type Props = {
	object: HeritageObject;
	locale: Locale;
	backLabel: string;
};

export const HeritageDetailHero = ({ object, locale, backLabel }: Props) => (
	<>
		<Link
			href="/"
			className="inline-flex items-center gap-2 text-gold-400/60 hover:text-gold-400 transition-colors font-ui text-xs tracking-widest uppercase mb-10 group"
		>
			<span className="group-hover:-translate-x-1 transition-transform duration-200">
				←
			</span>
			<span>{backLabel}</span>
		</Link>

		<div className="relative mb-12 overflow-hidden">
			<div className="h-px bg-gradient-to-r from-gold-400 via-gold-400/40 to-transparent mb-6" />
			<div className="flex items-start justify-between gap-4 mb-4">
				<div>
					<p className="text-gold-400/60 font-ui text-xs tracking-[0.3em] uppercase mb-2">
						{object.yearRange ?? object.yearBuilt}
					</p>
					<h1 className="font-display text-parchment-50 text-3xl md:text-4xl leading-tight">
						{object.name[locale]}
					</h1>
					{object.formerName && (
						<p className="text-parchment-200/50 font-body italic text-sm mt-2">
							{object.formerName[locale]}
						</p>
					)}
				</div>
			</div>

			<div className="relative w-full h-72 md:h-96 mb-6 border border-gold-400/20 rounded-xl overflow-hidden">
				<Image
					src={object.coverImageUrl}
					alt={object.name[locale]}
					fill
					priority
					quality={imageQuality}
					placeholder="blur"
					blurDataURL={imagePlaceholderDataUrl}
					sizes="(max-width: 896px) 100vw, 896px"
					className="object-cover [filter:sepia(0.3)]"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-sepia-900/60 to-transparent pointer-events-none" />
				<div className="absolute bottom-4 left-4 right-4 z-10">
					<p className="text-parchment-100/80 font-body italic text-sm leading-relaxed">
						{object.shortDescription[locale]}
					</p>
				</div>
			</div>
			<div className="h-px bg-gradient-to-r from-gold-400 via-gold-400/40 to-transparent" />
		</div>
	</>
);
