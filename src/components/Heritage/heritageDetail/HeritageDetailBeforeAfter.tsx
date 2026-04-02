import { BeforeAfterSlider } from '@/components/Heritage/BeforeAfterSlider';
import { OrnamentalDivider } from '@/components/UI/OrnamentalDivider';
import { HeritageDetailSection } from '@/components/Heritage/heritageDetail/HeritageDetailSection';
import type { BeforeAfterPair, Locale } from '@/types/heritage';

type Props = {
	slug: string;
	pairs: BeforeAfterPair[];
	locale: Locale;
	title: string;
	historicalPhotos: string;
	modernPhotos: string;
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
	sliderAria,
	compareHint,
}: Props) => {
	if (pairs.length === 0) return null;
	return (
		<>
			<OrnamentalDivider label={title} />
			<HeritageDetailSection title={title}>
				<div className="space-y-14">
					{pairs.map((pair) => (
						<BeforeAfterSlider
							key={`${slug}-ba-${pair.label.ru}`}
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
					))}
				</div>
			</HeritageDetailSection>
			<OrnamentalDivider />
		</>
	);
};
