import { HeritageDetailSection } from '@/components/Heritage/heritageDetail/HeritageDetailSection';
import type { HeritageObject, Locale } from '@/types/heritage';

type Props = {
	object: HeritageObject;
	locale: Locale;
	title: string;
};

export const HeritageDetailHistory = ({ object, locale, title }: Props) => (
	<HeritageDetailSection title={title}>
		<div className="theme-content-panel p-6">
			<blockquote className="theme-content-panel-body m-0 font-body text-base leading-loose">
				{object.history[locale]}
			</blockquote>
		</div>
	</HeritageDetailSection>
);
