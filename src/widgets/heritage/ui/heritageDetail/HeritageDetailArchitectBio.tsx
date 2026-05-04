import Image from 'next/image';
import { OrnamentalDivider } from '@/shared/ui';
import { HeritageDetailMediaAttribution } from './HeritageDetailMediaAttribution';
import { HeritageDetailSection } from './HeritageDetailSection';
import type { HeritageObject, Locale } from '@/entities/heritage';
import {
	imagePlaceholderDataUrl,
	imageQuality,
} from '@/shared/lib/image/placeholder';
import {
	localizedTrim,
	localizedTrimEither,
} from '@/widgets/heritage/lib/heritageDetailLocale';

function hasArchitectBioBlock(object: HeritageObject): boolean {
	const b = object.architectBio;
	if (!b) return false;
	if (localizedTrimEither(b.name)) return true;
	if (localizedTrimEither(b.role)) return true;
	if (localizedTrimEither(b.bio)) return true;
	if (b.photoUrl?.trim()) return true;
	if (b.gallery?.some((p) => p.url.trim())) return true;
	if (b.milestones?.some((m) => localizedTrimEither(m.event))) return true;
	return false;
}

type Props = {
	object: HeritageObject;
	locale: Locale;
	title: string;
	sourceLabel: string;
};

export const HeritageDetailArchitectBio = ({
	object,
	locale,
	title,
	sourceLabel,
}: Props) => {
	if (!hasArchitectBioBlock(object)) return null;
	const b = object.architectBio!;

	return (
		<>
			<OrnamentalDivider label={title} />
			<HeritageDetailSection title={title}>
				<div className="theme-content-panel p-6 space-y-4">
					<div className="flex flex-col md:flex-row gap-6">
						{b.photoUrl ? (
							<div className="relative w-full md:w-48 h-56 md:h-64 flex-shrink-0 rounded-lg overflow-hidden border border-gold-400/20">
								<Image
									src={b.photoUrl}
									alt={b.name[locale]}
									fill
									sizes="192px"
									quality={imageQuality}
									placeholder="blur"
									blurDataURL={imagePlaceholderDataUrl}
									className="object-cover"
								/>
							</div>
						) : null}
						<div className="min-w-0 flex-1">
							<h3 className="font-display theme-content-panel-heading text-xl mb-1">
								{b.name[locale]}
							</h3>
							<p className="theme-content-panel-heading font-body text-xs tracking-wider uppercase mb-3">
								{b.role[locale]}
							</p>
							<p className="theme-content-panel-body font-body text-sm leading-relaxed">
								{b.bio[locale]}
							</p>
						</div>
					</div>
					{b.milestones && b.milestones.length > 0 ? (
						<div className="border-t theme-content-panel-divider pt-4 space-y-2">
							{b.milestones.map((m) => (
								<div key={`arch-bio-${b.name.ru}-${m.year}`} className="flex gap-4">
									<span className="theme-content-panel-heading font-body text-xs w-12 flex-shrink-0">
										{m.year}
									</span>
									<span className="theme-content-panel-body font-body text-xs">
										{m.event[locale]}
									</span>
								</div>
							))}
						</div>
					) : null}
					{b.gallery && b.gallery.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t theme-content-panel-divider">
							{b.gallery.map((photo, index) => (
								<div
									key={`arch-bio-g-${photo.url}-${index}`}
									className="rounded-lg overflow-hidden border border-gold-400/10"
								>
									<div className="relative aspect-[4/3] w-full">
										<Image
											src={photo.url}
											alt={localizedTrim(photo.caption, locale) || b.name[locale]}
											fill
											sizes="(max-width: 640px) 100vw, 40vw"
											quality={imageQuality}
											placeholder="blur"
											blurDataURL={imagePlaceholderDataUrl}
											className="object-cover"
										/>
									</div>
									<div className="p-3">
										{photo.caption ? (
											<p className="theme-content-panel-body font-body text-xs mb-1">
												{photo.caption[locale]}
											</p>
										) : null}
										<HeritageDetailMediaAttribution
											locale={locale}
											sourceUrl={photo.sourceUrl}
											credit={photo.credit}
											sourceLabel={sourceLabel}
										/>
									</div>
								</div>
							))}
						</div>
					) : null}
				</div>
			</HeritageDetailSection>
		</>
	);
};
