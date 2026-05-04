import { BeforeAfterSlider } from '../BeforeAfterSlider';
import { OrnamentalDivider } from '@/shared/ui';
import { HeritageDetailMediaAttribution } from './HeritageDetailMediaAttribution';
import { HeritageDetailSection } from './HeritageDetailSection';
import type { BeforeAfterPair, Locale } from '@/entities/heritage';

type Props = {
	slug: string;
	pairs: BeforeAfterPair[];
	locale: Locale;
	title: string;
	historicalPhotos: string;
	modernPhotos: string;
	sliderAria: string;
	compareHint: string;
	sourceLabel: string;
};

export const HeritageDetailBeforeAfter = ({
	slug,
	pairs,
	locale,
	title,
	historicalPhotos,
	modernPhotos,
	sliderAria,
	compareHint,
	sourceLabel,
}: Props) => {
	if (pairs.length === 0) return null;
	return (
		<>
			<OrnamentalDivider label={title} />
			<HeritageDetailSection title={title}>
				<div className="space-y-14">
					{pairs.map((pair) => (
						<div key={`${slug}-ba-${pair.label.ru}`} className="space-y-3">
							<BeforeAfterSlider
								beforeSrc={pair.before.url}
								afterSrc={pair.after.url}
								beforeAlt={pair.before.caption?.[locale] ?? historicalPhotos}
								afterAlt={pair.after.caption?.[locale] ?? modernPhotos}
								beforeLabel={historicalPhotos}
								afterLabel={modernPhotos}
								pairLabel={pair.label[locale]}
								ariaLabel={sliderAria}
								hint={compareHint}
							/>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left px-1">
								<div>
									<p className="theme-content-panel-heading font-body text-[10px] tracking-widest uppercase text-gold-400/40 mb-1">
										{historicalPhotos}
									</p>
									<HeritageDetailMediaAttribution
										locale={locale}
										sourceUrl={pair.before.sourceUrl}
										credit={pair.before.credit}
										sourceLabel={sourceLabel}
									/>
								</div>
								<div>
									<p className="theme-content-panel-heading font-body text-[10px] tracking-widest uppercase text-gold-400/40 mb-1">
										{modernPhotos}
									</p>
									<HeritageDetailMediaAttribution
										locale={locale}
										sourceUrl={pair.after.sourceUrl}
										credit={pair.after.credit}
										sourceLabel={sourceLabel}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</HeritageDetailSection>
			<OrnamentalDivider />
		</>
	);
};
