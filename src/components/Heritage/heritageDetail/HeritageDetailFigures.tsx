import { OrnamentalDivider } from '@/components/UI/OrnamentalDivider';
import { HeritageDetailSection } from '@/components/Heritage/heritageDetail/HeritageDetailSection';
import type { HeritageObject, Locale } from '@/types/heritage';

type Props = {
	object: HeritageObject;
	locale: Locale;
	title: string;
};

export const HeritageDetailFigures = ({ object, locale, title }: Props) => {
	if (object.historicalFigures.length === 0) return null;
	return (
		<>
			<OrnamentalDivider label={title} />
			<HeritageDetailSection title={title}>
				{object.historicalFigures.map((figure) => (
					<div
						key={`${object.slug}-figure-${figure.name.ru}`}
						className="border border-gold-400/20 bg-sepia-800/30 rounded-xl p-6 mb-4"
					>
						<h4 className="font-display text-parchment-100 text-xl mb-1">
							{figure.name[locale]}
						</h4>
						<p className="text-gold-400/70 font-ui text-xs tracking-wider uppercase mb-4">
							{figure.role[locale]}
						</p>
						<p className="text-parchment-200/80 font-body text-sm leading-relaxed mb-4">
							{figure.bio[locale]}
						</p>
						{figure.milestones && figure.milestones.length > 0 && (
							<div className="border-t border-gold-400/10 pt-4 space-y-2">
								{figure.milestones.map((m) => (
									<div
										key={`${object.slug}-fig-${figure.name.ru}-y${m.year}`}
										className="flex gap-4"
									>
										<span className="text-gold-400 font-ui text-xs w-12 flex-shrink-0">
											{m.year}
										</span>
										<span className="text-parchment-200/70 font-body text-xs">
											{m.event[locale]}
										</span>
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</HeritageDetailSection>
		</>
	);
};
