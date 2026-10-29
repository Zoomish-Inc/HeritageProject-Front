import type { HeritageObject, Locale } from '@/entities/heritage';
import { Link } from '@/i18n/navigation';
import {
    imagePlaceholderDataUrl,
    imageQuality,
} from '@/shared/lib/image/placeholder';
import { localizedTrim } from '@/widgets/heritage/lib/heritageDetailLocale';
import Image from 'next/image';

type Props = {
	object: HeritageObject;
	locale: Locale;
	backLabel: string;
	tourHref?: string;
	tourLabel?: string;
};

export const HeritageDetailHero = ({
	object,
	locale,
	backLabel,
	tourHref,
	tourLabel,
}: Props) => {
	const name = object.name[locale].trim();
	const formerName = localizedTrim(object.formerName, locale);
	const showFormerName =
		Boolean(formerName) && formerName.toLocaleLowerCase() !== name.toLocaleLowerCase();

	return (
	<>
		<Link
			href="/"
			className="inline-flex items-center gap-2 text-gold-400/60 hover:text-gold-400 transition-colors font-body text-xs tracking-widest uppercase mb-10 group"
		>
			<span className="group-hover:-translate-x-1 transition-transform duration-200">
				←
			</span>
			<span>{backLabel}</span>
		</Link>

		<div className="relative mb-12 overflow-hidden">
			<div className="h-px bg-gradient-to-r from-gold-400 via-gold-400/40 to-transparent mb-6" />
			<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
				<div>
					<h1 className="font-display text-parchment-50 text-3xl md:text-4xl leading-tight">
						{name}
					</h1>
					{showFormerName ? (
						<p className="text-theme-subtitle-italic font-body italic text-sm mt-2">
							{formerName}
						</p>
					) : null}
				</div>
				{tourHref && tourLabel ? (
					<Link
						href={tourHref}
						className="shrink-0 self-start inline-flex items-center justify-center px-4 py-2.5 text-xs font-body tracking-[0.2em] uppercase border border-gold-400/40 text-gold-400 hover:bg-gold-400/10 transition-colors rounded-lg"
					>
						{tourLabel}
					</Link>
				) : null}
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
				<div className="absolute inset-0 hidden md:block bg-gradient-to-t from-sepia-900/60 to-transparent pointer-events-none" />
				<div className="absolute bottom-4 left-4 right-4 z-10 hidden md:block">
					<p className="text-hero-media-caption font-body italic text-sm leading-relaxed">
						{object.shortDescription[locale]}
					</p>
				</div>
			</div>
			{object.shortDescription[locale]?.trim() ? (
				<p className="theme-content-panel-body font-body italic text-sm leading-relaxed mb-6 md:hidden">
					{object.shortDescription[locale]}
				</p>
			) : null}
			<div className="h-px bg-gradient-to-r from-gold-400 via-gold-400/40 to-transparent" />
		</div>
	</>
	);
};
