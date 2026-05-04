import Image from 'next/image';
import { OrnamentalDivider } from '@/shared/ui';
import { HeritageDetailMediaAttribution } from './HeritageDetailMediaAttribution';
import { HeritageDetailSection } from './HeritageDetailSection';
import type { HeritageObject, Locale } from '@/entities/heritage';
import {
	imagePlaceholderDataUrl,
	imageQuality,
} from '@/shared/lib/image/placeholder';
import { localizedTrim } from '@/widgets/heritage/lib/heritageDetailLocale';

type Props = {
	object: HeritageObject;
	locale: Locale;
	title: string;
	sourceLabel: string;
};

export const HeritageDetailFigures = ({
	object,
	locale,
	title,
	sourceLabel,
}: Props) => {
	if (object.historicalFigures.length === 0) return null;
	return (
		<>
			<OrnamentalDivider label={title} />
			<HeritageDetailSection title={title}>
				{object.historicalFigures.map((figure) => (
					<div
						key={`${object.slug}-figure-${figure.name.ru}`}
						className="theme-content-panel p-6 mb-4"
					>
						<div className="flex flex-col md:flex-row gap-6 mb-4">
							{figure.photoUrl ? (
								<div className="relative w-full md:w-44 h-52 md:h-56 flex-shrink-0 rounded-lg overflow-hidden border border-gold-400/20">
									<Image
										src={figure.photoUrl}
										alt={figure.name[locale]}
										fill
										sizes="176px"
										quality={imageQuality}
										placeholder="blur"
										blurDataURL={imagePlaceholderDataUrl}
										className="object-cover"
									/>
								</div>
							) : null}
							<div className="min-w-0 flex-1">
								<h4 className="font-display theme-content-panel-heading text-xl mb-1">
									{figure.name[locale]}
								</h4>
								<p className="theme-content-panel-heading font-body text-xs tracking-wider uppercase mb-4">
									{figure.role[locale]}
								</p>
								<p className="theme-content-panel-body font-body text-sm leading-relaxed">
									{figure.bio[locale]}
								</p>
							</div>
						</div>
						{figure.milestones && figure.milestones.length > 0 ? (
							<div className="border-t theme-content-panel-divider pt-4 space-y-2 mb-4">
								{figure.milestones.map((m) => (
									<div
										key={`${object.slug}-fig-${figure.name.ru}-y${m.year}`}
										className="flex gap-4"
									>
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
						{figure.gallery && figure.gallery.length > 0 ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t theme-content-panel-divider">
								{figure.gallery.map((photo, gi) => (
									<div
										key={`${object.slug}-fig-g-${figure.name.ru}-${gi}`}
										className="rounded-lg overflow-hidden border border-gold-400/10"
									>
										<div className="relative aspect-[4/3] w-full">
											<Image
												src={photo.url}
												alt={localizedTrim(photo.caption, locale) || figure.name[locale]}
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
				))}
			</HeritageDetailSection>
		</>
	);
};
