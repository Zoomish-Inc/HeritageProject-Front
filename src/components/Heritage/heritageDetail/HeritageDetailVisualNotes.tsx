import { OrnamentalDivider } from '@/components/UI/OrnamentalDivider';
import { HeritageDetailSection } from '@/components/Heritage/heritageDetail/HeritageDetailSection';
import type { HeritageObject, Locale } from '@/types/heritage';

type Props = {
	object: HeritageObject;
	locale: Locale;
	title: string;
};

export const HeritageDetailVisualNotes = ({ object, locale, title }: Props) => {
	if (!object.visualStyleNotes) return null;
	return (
		<>
			<OrnamentalDivider />
			<HeritageDetailSection title={title}>
				<div className="theme-content-panel p-5">
					<p className="theme-content-panel-body font-body italic text-sm">
						{object.visualStyleNotes[locale]}
					</p>
				</div>
			</HeritageDetailSection>
		</>
	);
};
