import { OrnamentalDivider } from '@/shared/ui';
import { HeritageDetailSection } from './HeritageDetailSection';
import type { HeritageObject, Locale } from '@/entities/heritage';

type Props = {
	object: HeritageObject;
	locale: Locale;
	labels: {
		title: string;
		listen: string;
		atmosphere: string;
		musicSuggestion: string;
	};
};

export const HeritageDetailAudio = ({ object, locale, labels }: Props) => (
	<>
		<OrnamentalDivider label={labels.title} />
		<HeritageDetailSection title={labels.title}>
			<div className="theme-content-panel p-6 space-y-4">
				<div className="flex items-center gap-3 mb-4">
					<div className="w-8 h-8 theme-content-panel-outline flex items-center justify-center">
						<span className="theme-content-panel-heading text-sm">♪</span>
					</div>
					<p className="theme-content-panel-heading font-body text-xs tracking-wider uppercase">
						{object.audioGuide.narratorLabel[locale]}
					</p>
				</div>

				<div className="space-y-1">
					<p className="theme-content-panel-heading font-body text-xs tracking-widest uppercase">
						{labels.listen}
					</p>
					<p className="theme-content-panel-body font-body italic text-sm leading-relaxed border-l-2 theme-content-panel-divider pl-4">
						«{object.audioGuide.transcript[locale]}»
					</p>
				</div>

				<div className="pt-4 border-t theme-content-panel-divider grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<p className="theme-content-panel-heading font-body text-xs tracking-widest uppercase mb-1">
							{labels.atmosphere}
						</p>
						<p className="theme-content-panel-body font-body text-xs italic">
							{object.audioGuide.atmosphereDescription[locale]}
						</p>
					</div>
					<div>
						<p className="theme-content-panel-heading font-body text-xs tracking-widest uppercase mb-1">
							{labels.musicSuggestion}
						</p>
						<p className="theme-content-panel-body font-body text-xs italic">
							{object.audioGuide.musicSuggestion[locale]}
						</p>
					</div>
				</div>
			</div>
		</HeritageDetailSection>
	</>
);
