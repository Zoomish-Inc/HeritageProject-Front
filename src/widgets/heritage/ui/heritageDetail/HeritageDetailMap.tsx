import { HeritageDetailSection } from './HeritageDetailSection';
import type { HeritageObject } from '@/entities/heritage';
import {
	buildOsmEmbedUrl,
	buildOsmViewUrl,
} from '@/widgets/heritage/lib/osmMapUrls';

type Props = {
	object: HeritageObject;
	title: string;
	embedTitle: string;
	openMapLabel: string;
};

export const HeritageDetailMap = ({
	object,
	title,
	embedTitle,
	openMapLabel,
}: Props) => {
	const coordinates = object.coordinates;
	if (!coordinates) return null;

	const embedUrl = buildOsmEmbedUrl(coordinates);
	const viewUrl = object.mapUrl?.trim() || buildOsmViewUrl(coordinates);

	return (
		<HeritageDetailSection title={title}>
			<div className="theme-content-panel overflow-hidden rounded-lg border border-gold-400/15">
				<div className="relative w-full aspect-[16/9] min-h-[180px] sm:min-h-[200px]">
					<iframe
						title={embedTitle}
						src={embedUrl}
						className="absolute inset-0 h-full w-full border-0"
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						allowFullScreen
					/>
				</div>
				<div className="border-t theme-content-panel-divider px-4 py-3 flex justify-end">
					<a
						href={viewUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="font-body text-xs tracking-[0.15em] uppercase text-gold-400/80 hover:text-gold-400 transition-colors"
					>
						{openMapLabel}
					</a>
				</div>
			</div>
		</HeritageDetailSection>
	);
};
