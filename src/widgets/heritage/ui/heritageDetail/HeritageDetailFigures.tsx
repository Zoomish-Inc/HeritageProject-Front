import { OrnamentalDivider } from '@/shared/ui';
import { HeritageDetailSection } from './HeritageDetailSection';
import type { HeritageObject, Locale } from '@/entities/heritage';

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
						className="theme-content-panel p-6 mb-4"
					>
						<h4 className="font-display theme-content-panel-heading text-xl mb-1">
							{figure.name[locale]}
						</h4>
						<p className="theme-content-panel-heading font-body text-xs tracking-wider uppercase mb-4">
							{figure.role[locale]}
						</p>
						<p className="theme-content-panel-body font-body text-sm leading-relaxed mb-4">
							{figure.bio[locale]}
						</p>
						{figure.milestones && figure.milestones.length > 0 && (
							<div className="border-t theme-content-panel-divider pt-4 space-y-2">
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
						)}
					</div>
				))}
			</HeritageDetailSection>
		</>
	);
};
