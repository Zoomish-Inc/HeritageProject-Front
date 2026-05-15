import Image from 'next/image';
import { HeritageDetailExpandableText } from './HeritageDetailExpandableText';
import { HeritageDetailMediaAttribution } from './HeritageDetailMediaAttribution';
import { HeritageDetailSection } from './HeritageDetailSection';
import type { HeritageObject, Locale } from '@/entities/heritage';
import {
	imagePlaceholderDataUrl,
	imageQuality,
} from '@/shared/lib/image/placeholder';

type Props = {
	object: HeritageObject;
	locale: Locale;
	labels: {
		title: string;
		architectureDetails: string;
		sourceLabel: string;
	};
};

const bodyTextClass =
	'theme-content-panel-body font-body text-base leading-relaxed whitespace-pre-line';

const detailTextClass =
	'theme-content-panel-body font-body text-sm leading-relaxed whitespace-pre-line';

export const HeritageDetailArchitecture = ({
	object,
	locale,
	labels,
}: Props) => {
	const mainText = object.architecturalDescription[locale].trim();
	const hasDetails = object.architectureDetails.length > 0;
	const hasMainText = Boolean(mainText);

	if (!hasMainText && !hasDetails) return null;

	return (
		<HeritageDetailSection title={labels.title}>
			{hasMainText ? (
				<div className="relative pl-6 border-l-2 theme-content-panel-divider">
					<HeritageDetailExpandableText text={mainText} className={bodyTextClass} />
				</div>
			) : null}

			{hasDetails ? (
				<div className={hasMainText ? 'mt-8 space-y-6' : 'space-y-6'}>
					<p className="theme-content-panel-heading font-body text-xs tracking-[0.3em] uppercase mb-4">
						{labels.architectureDetails}
					</p>
					{object.architectureDetails.map((detail) => (
						<div
							key={`${object.slug}-arch-${detail.title.ru}`}
							className="theme-content-panel p-5"
						>
							{detail.imageUrl ? (
								<div className="relative w-full aspect-[16/10] max-h-80 mb-4 rounded-lg overflow-hidden border border-gold-400/15">
									<Image
										src={detail.imageUrl}
										alt={detail.title[locale]}
										fill
										sizes="(max-width: 896px) 100vw, 800px"
										quality={imageQuality}
										placeholder="blur"
										blurDataURL={imagePlaceholderDataUrl}
										className="object-cover"
									/>
								</div>
							) : null}
							<HeritageDetailMediaAttribution
								locale={locale}
								sourceUrl={detail.imageSourceUrl}
								credit={detail.imageCredit}
								sourceLabel={labels.sourceLabel}
							/>
							<h4 className="font-display theme-content-panel-heading text-lg mb-2 mt-2">
								{detail.title[locale]}
							</h4>
							<HeritageDetailExpandableText
								text={detail.description[locale]}
								className={detailTextClass}
								collapsedMaxHeight={160}
							/>
						</div>
					))}
				</div>
			) : null}
		</HeritageDetailSection>
	);
};
