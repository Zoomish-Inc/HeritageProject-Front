import { OrnamentalDivider } from '@/shared/ui';
import { HeritageDetailSection } from './HeritageDetailSection';
import type { HeritageObject, Locale } from '@/entities/heritage';
import { localizedTrim } from '@/widgets/heritage/lib/heritageDetailLocale';

type Props = {
	object: HeritageObject;
	locale: Locale;
	labels: {
		title: string;
		listen: string;
		atmosphere: string;
		musicSuggestion: string;
		audioTracks: string;
		fullTitle: string;
	};
};

function hasAudioContent(object: HeritageObject, locale: Locale): boolean {
	const ag = object.audioGuide;
	if (ag.tracks.some((t) => t.url.trim())) return true;
	if (localizedTrim(ag.transcript, locale)) return true;
	if (localizedTrim(ag.atmosphereDescription, locale)) return true;
	if (localizedTrim(ag.musicSuggestion, locale)) return true;
	if (localizedTrim(ag.narratorLabel, locale)) return true;
	return false;
}

export const HeritageDetailAudio = ({ object, locale, labels }: Props) => {
	if (!hasAudioContent(object, locale)) return null;

	const ag = object.audioGuide;

	return (
		<>
			<OrnamentalDivider label={labels.title} />
			<HeritageDetailSection title={labels.title}>
				<div className="theme-content-panel p-6 space-y-4">
					{localizedTrim(ag.narratorLabel, locale) ? (
						<div className="flex items-center gap-3 mb-4">
							<div className="w-8 h-8 theme-content-panel-outline flex items-center justify-center">
								<span className="theme-content-panel-heading text-sm">♪</span>
							</div>
							<p className="theme-content-panel-heading font-body text-xs tracking-wider uppercase">
								{ag.narratorLabel[locale]}
							</p>
						</div>
					) : null}

					{ag.tracks.filter((t) => t.url.trim()).length > 0 ? (
						<div className="space-y-4">
							<p className="theme-content-panel-heading font-body text-xs tracking-widest uppercase">
								{labels.audioTracks}
							</p>
							{ag.tracks
								.filter((t) => t.url.trim())
								.map((track, index) => (
									<div
										key={`${object.slug}-track-${index}`}
										className="border border-gold-400/15 rounded-lg p-4 space-y-2"
									>
										<p className="theme-content-panel-heading font-body text-sm">
											{track.shortTitle[locale]}
										</p>
										{track.fullTitle &&
										(track.fullTitle.ru.trim() || track.fullTitle.uz.trim()) ? (
											<p className="theme-content-panel-body font-body text-xs text-gold-400/60">
												<span className="uppercase tracking-wider mr-1">
													{labels.fullTitle}:
												</span>
												{track.fullTitle[locale]}
											</p>
										) : null}
										<audio
											controls
											preload="metadata"
											className="w-full h-9 mt-1"
											src={track.url}
										/>
									</div>
								))}
						</div>
					) : null}

					{localizedTrim(ag.transcript, locale) ? (
						<div className="space-y-1">
							<p className="theme-content-panel-heading font-body text-xs tracking-widest uppercase">
								{labels.listen}
							</p>
							<p className="theme-content-panel-body font-body italic text-sm leading-relaxed border-l-2 theme-content-panel-divider pl-4">
								«{ag.transcript[locale]}»
							</p>
						</div>
					) : null}

					{(localizedTrim(ag.atmosphereDescription, locale) ||
						localizedTrim(ag.musicSuggestion, locale)) && (
						<div className="pt-4 border-t theme-content-panel-divider grid grid-cols-1 md:grid-cols-2 gap-4">
							{localizedTrim(ag.atmosphereDescription, locale) ? (
								<div>
									<p className="theme-content-panel-heading font-body text-xs tracking-widest uppercase mb-1">
										{labels.atmosphere}
									</p>
									<p className="theme-content-panel-body font-body text-xs italic">
										{ag.atmosphereDescription[locale]}
									</p>
								</div>
							) : null}
							{localizedTrim(ag.musicSuggestion, locale) ? (
								<div>
									<p className="theme-content-panel-heading font-body text-xs tracking-widest uppercase mb-1">
										{labels.musicSuggestion}
									</p>
									<p className="theme-content-panel-body font-body text-xs italic">
										{ag.musicSuggestion[locale]}
									</p>
								</div>
							) : null}
						</div>
					)}
				</div>
			</HeritageDetailSection>
		</>
	);
};
