import { OrnamentalDivider } from '@/components/UI/OrnamentalDivider';
import { HeritageDetailSection } from '@/components/Heritage/heritageDetail/HeritageDetailSection';
import type { HeritageObject, Locale } from '@/types/heritage';

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
			<div className="bg-sepia-800/50 border border-gold-400/20 p-6 space-y-4">
				<div className="flex items-center gap-3 mb-4">
					<div className="w-8 h-8 border border-gold-400/40 flex items-center justify-center">
						<span className="text-gold-400 text-sm">♪</span>
					</div>
					<p className="text-gold-400/70 font-ui text-xs tracking-wider uppercase">
						{object.audioGuide.narratorLabel[locale]}
					</p>
				</div>

				<div className="space-y-1">
					<p className="text-gold-400/50 font-ui text-xs tracking-widest uppercase">
						{labels.listen}
					</p>
					<p className="text-parchment-100/80 font-body italic text-sm leading-relaxed border-l border-gold-400/30 pl-4">
						«{object.audioGuide.transcript[locale]}»
					</p>
				</div>

				<div className="pt-4 border-t border-gold-400/10 grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<p className="text-gold-400/50 font-ui text-xs tracking-widest uppercase mb-1">
							{labels.atmosphere}
						</p>
						<p className="text-parchment-200/60 font-body text-xs italic">
							{object.audioGuide.atmosphereDescription[locale]}
						</p>
					</div>
					<div>
						<p className="text-gold-400/50 font-ui text-xs tracking-widest uppercase mb-1">
							{labels.musicSuggestion}
						</p>
						<p className="text-parchment-200/60 font-body text-xs italic">
							{object.audioGuide.musicSuggestion[locale]}
						</p>
					</div>
				</div>
			</div>
		</HeritageDetailSection>
	</>
);
