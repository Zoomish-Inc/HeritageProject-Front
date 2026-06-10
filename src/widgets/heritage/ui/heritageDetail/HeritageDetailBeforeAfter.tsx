import { BeforeAfterSlider } from '../BeforeAfterSlider';
import { HeritageDetailSection } from './HeritageDetailSection';
import type { BeforeAfterPair, Locale } from '@/entities/heritage';

type Props = {
	slug: string;
	pairs: BeforeAfterPair[];
	locale: Locale;
	title: string;
	historicalPhotos: string;
	modernPhotos: string;
	historicalPhotosShort: string;
	modernPhotosShort: string;
	sliderAria: string;
	compareHint: string;
};

export const HeritageDetailBeforeAfter = ({
	slug,
	pairs,
	locale,
	title,
	historicalPhotos,
	modernPhotos,
	historicalPhotosShort,
	modernPhotosShort,
	sliderAria,
	compareHint,
}: Props) => {
	if (pairs.length === 0) return null;
	return (
		<HeritageDetailSection title={title} trailingDivider>
			<div className="space-y-14">
				{pairs.map((pair) => (
					<div key={`${slug}-ba-${pair.label.ru}`}>
						<BeforeAfterSlider
							beforeSrc={pair.before.url}
							afterSrc={pair.after.url}
							beforeAlt={pair.before.caption?.[locale] ?? historicalPhotos}
							afterAlt={pair.after.caption?.[locale] ?? modernPhotos}
							beforeLabel={historicalPhotos}
							afterLabel={modernPhotos}
							beforeLabelShort={historicalPhotosShort}
							afterLabelShort={modernPhotosShort}
							pairLabel={pair.label[locale]}
							ariaLabel={sliderAria}
							hint={compareHint}
						/>
					</div>
				))}
			</div>
		</HeritageDetailSection>
	);
};
