import { HeritageDetailSection } from '@/components/Heritage/heritageDetail/HeritageDetailSection';
import type { HeritageObject, Locale } from '@/types/heritage';

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
		<div className="relative pl-6 border-l border-gold-400/20">
			<p className="text-parchment-100 font-body text-base leading-loose">
				{object.architecturalDescription[locale]}
			</p>
		</div>

		{object.architectureDetails.length > 0 && (
			<div className="mt-8 space-y-6">
				<p className="text-gold-400/60 font-ui text-xs tracking-[0.3em] uppercase mb-4">
					{labels.architectureDetails}
				</p>
				{object.architectureDetails.map((detail) => (
					<div
						key={`${object.slug}-arch-${detail.title.ru}`}
						className="border border-gold-400/15 bg-sepia-800/30 p-5"
					>
						<h4 className="font-display text-gold-300 text-lg mb-2">
							{detail.title[locale]}
						</h4>
						<p className="text-parchment-200/80 font-body text-sm leading-relaxed">
							{detail.description[locale]}
						</p>
					</div>
				))}
			</div>
		)}
	</HeritageDetailSection>
);
