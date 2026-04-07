import { HeritageDetailSection } from './HeritageDetailSection';
import type { HeritageObject, Locale } from '@/entities/heritage';

type Props = {
	object: HeritageObject;
	locale: Locale;
	labels: { title: string; architectureDetails: string };
};

export const HeritageDetailArchitecture = ({
	object,
	locale,
	labels,
}: Props) => (
	<HeritageDetailSection title={labels.title}>
		<div className="relative pl-6 border-l-2 theme-content-panel-divider">
			<p className="theme-content-panel-body font-body text-base leading-loose">
				{object.architecturalDescription[locale]}
			</p>
		</div>

		{object.architectureDetails.length > 0 && (
			<div className="mt-8 space-y-6">
				<p className="theme-content-panel-heading font-ui text-xs tracking-[0.3em] uppercase mb-4">
					{labels.architectureDetails}
				</p>
				{object.architectureDetails.map((detail) => (
					<div
						key={`${object.slug}-arch-${detail.title.ru}`}
						className="theme-content-panel p-5"
					>
						<h4 className="font-display theme-content-panel-heading text-lg mb-2">
							{detail.title[locale]}
						</h4>
						<p className="theme-content-panel-body font-body text-sm leading-relaxed">
							{detail.description[locale]}
						</p>
					</div>
				))}
			</div>
		)}
	</HeritageDetailSection>
);
