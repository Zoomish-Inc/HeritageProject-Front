import Image from 'next/image';
import { HeritageDetailExpandableText } from './HeritageDetailExpandableText';
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

export const HeritageDetailHistory = ({
	object,
	locale,
	title,
	sourceLabel,
}: Props) => {
	const body = object.history[locale].trim();
	const media = object.historyMedia ?? [];
	if (!body && media.length === 0) return null;

	return (
		<HeritageDetailSection title={title}>
			{body ? (
				<div className="theme-content-panel p-6 mb-6">
					<blockquote className="m-0">
						<HeritageDetailExpandableText
							text={body}
							className="theme-content-panel-body font-body text-base leading-loose whitespace-pre-line"
						/>
					</blockquote>
				</div>
			) : null}
			{media.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					{media.map((photo, index) => {
						const alt =
							localizedTrim(photo.caption, locale) || `${title} ${index + 1}`;
						return (
							<div
								key={`hist-media-${photo.url}-${index}`}
								className="theme-content-panel overflow-hidden rounded-lg border border-gold-400/15"
							>
								<div className="relative aspect-[4/3] w-full bg-sepia-900/40">
									<Image
										src={photo.url}
										alt={alt}
										fill
										sizes="(max-width: 640px) 100vw, 50vw"
										quality={imageQuality}
										placeholder="blur"
										blurDataURL={imagePlaceholderDataUrl}
										className="object-cover"
									/>
								</div>
								<div className="p-4">
									{photo.caption ? (
										<p className="theme-content-panel-body font-body text-sm leading-relaxed mb-1">
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
						);
					})}
				</div>
			) : null}
		</HeritageDetailSection>
	);
};
