import { HeritageDetailSection } from '@/components/Heritage/heritageDetail/HeritageDetailSection';
import type { HeritageObject, Locale } from '@/types/heritage';

type Props = {
	object: HeritageObject;
	locale: Locale;
	title: string;
};

export const HeritageDetailHistory = ({ object, locale, title }: Props) => (
	<HeritageDetailSection title={title}>
		<div className="relative">
			<blockquote className="text-parchment-100 font-body text-base leading-loose pl-6 border-l-2 border-gold-400/40">
				{object.history[locale]}
			</blockquote>
		</div>
	</HeritageDetailSection>
);
