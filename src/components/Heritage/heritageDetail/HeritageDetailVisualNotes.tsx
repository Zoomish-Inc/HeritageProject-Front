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
				<p className="text-parchment-200/60 font-body italic text-sm">
					{object.visualStyleNotes[locale]}
				</p>
			</HeritageDetailSection>
		</>
	);
};
