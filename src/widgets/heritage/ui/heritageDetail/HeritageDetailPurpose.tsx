import type { ReactNode } from 'react';
import {
	HeritageDetailInfoRow,
	HeritageDetailSection,
} from './HeritageDetailSection';
import type { HeritageObject, Locale } from '@/entities/heritage';
import { localizedTrim } from '@/widgets/heritage/lib/heritageDetailLocale';

type Props = {
	object: HeritageObject;
	locale: Locale;
	labels: {
		sectionTitle: string;
		currentPurpose: string;
		historicalPurpose: string;
		address: string;
		yearBuilt: string;
		style: string;
		architect: string;
		coordinates: string;
		openMap: string;
	};
};

export const HeritageDetailPurpose = ({ object, locale, labels }: Props) => {
	const yearDisplay =
		localizedTrim(object.yearBuiltLabel, locale) ||
		object.yearRange ||
		String(object.yearBuilt);

	const coordStr =
		object.coordinates !== undefined
			? `${object.coordinates.lat.toFixed(5)}, ${object.coordinates.lng.toFixed(5)}`
			: '';

	const rows: Array<{ key: string; label: string; node: ReactNode }> = [];

	const add = (key: string, label: string, text: string) => {
		const t = text.trim();
		if (t) rows.push({ key, label, node: t });
	};

	add('currentPurpose', labels.currentPurpose, object.currentPurpose[locale]);
	add(
		'historicalPurpose',
		labels.historicalPurpose,
		object.historicalPurpose[locale]
	);
	add('address', labels.address, object.address[locale]);
	add('yearBuilt', labels.yearBuilt, yearDisplay);
	add('style', labels.style, object.architecturalStyle[locale]);
	if (object.architect) {
		add('architect', labels.architect, object.architect[locale]);
	}
	if (coordStr) {
		rows.push({ key: 'coordinates', label: labels.coordinates, node: coordStr });
	}
	if (object.mapUrl?.trim()) {
		rows.push({
			key: 'map',
			label: labels.openMap,
			node: (
				<a
					href={object.mapUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="text-gold-400/80 hover:text-gold-400 underline-offset-2 hover:underline"
				>
					{labels.openMap}
				</a>
			),
		});
	}

	if (rows.length === 0) return null;

	return (
		<HeritageDetailSection title={labels.sectionTitle}>
			<div className="theme-content-panel p-6">
				{rows.map((row) => (
					<HeritageDetailInfoRow key={row.key} label={row.label} value={row.node} />
				))}
			</div>
		</HeritageDetailSection>
	);
};
