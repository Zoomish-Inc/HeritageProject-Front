import {
	HeritageDetailInfoRow,
	HeritageDetailSection,
} from '@/components/Heritage/heritageDetail/HeritageDetailSection';
import type { HeritageObject, Locale } from '@/types/heritage';

type Props = {
	object: HeritageObject;
	locale: Locale;
	labels: {
		title: string;
		currentPurpose: string;
		historicalPurpose: string;
		address: string;
		yearBuilt: string;
		style: string;
		architect: string;
	};
};

export const HeritageDetailPurpose = ({ object, locale, labels }: Props) => (
	<HeritageDetailSection title={labels.title}>
		<div className="bg-sepia-800/50 border border-gold-400/15 rounded-xl p-6">
			<HeritageDetailInfoRow
				label={labels.currentPurpose}
				value={object.currentPurpose[locale]}
			/>
			<HeritageDetailInfoRow
				label={labels.historicalPurpose}
				value={object.historicalPurpose[locale]}
			/>
			<HeritageDetailInfoRow
				label={labels.address}
				value={object.address[locale]}
			/>
			<HeritageDetailInfoRow
				label={labels.yearBuilt}
				value={object.yearRange ?? String(object.yearBuilt)}
			/>
			<HeritageDetailInfoRow
				label={labels.style}
				value={object.architecturalStyle[locale]}
			/>
			{object.architect && (
				<HeritageDetailInfoRow
					label={labels.architect}
					value={object.architect[locale]}
				/>
			)}
		</div>
	</HeritageDetailSection>
);
