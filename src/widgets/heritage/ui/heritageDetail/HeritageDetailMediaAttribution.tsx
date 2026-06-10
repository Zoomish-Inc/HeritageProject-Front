import type { Locale, LocalizedString } from '@/entities/heritage';
import { localizedTrim } from '@/widgets/heritage/lib/heritageDetailLocale';
import { getMediaSourceResourceLabel } from '@/widgets/heritage/lib/mediaSourceResourceLabel';

type Props = {
	locale: Locale;
	sourceUrl?: string;
	credit?: LocalizedString;
	sourceLabel: string;
};

export function hasHeritageMediaAttribution({
	locale,
	sourceUrl,
	credit,
}: Pick<Props, 'locale' | 'sourceUrl' | 'credit'>): boolean {
	const creditText = localizedTrim(credit, locale);
	const hasSource = Boolean(sourceUrl?.trim());
	const resourceLabel = getMediaSourceResourceLabel(sourceUrl, locale);
	if (hasSource && resourceLabel) return true;
	return Boolean(creditText || hasSource);
}

export function HeritageDetailMediaAttribution({
	locale,
	sourceUrl,
	credit,
	sourceLabel,
}: Props) {
	const creditText = localizedTrim(credit, locale);
	const hasSource = Boolean(sourceUrl && sourceUrl.trim());
	const resourceLabel = getMediaSourceResourceLabel(sourceUrl, locale);

	if (hasSource && resourceLabel) {
		return (
			<p className="theme-content-panel-body font-body text-xs text-gold-400/50 mt-2 leading-relaxed">
				<a
					href={sourceUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="text-gold-400/70 hover:text-gold-400 underline-offset-2 hover:underline"
				>
					{resourceLabel}
				</a>
			</p>
		);
	}

	if (!creditText && !hasSource) return null;
	return (
		<p className="theme-content-panel-body font-body text-xs text-gold-400/50 mt-2 leading-relaxed">
			{creditText ? <span>{creditText}</span> : null}
			{creditText && hasSource ? <span> · </span> : null}
			{hasSource ? (
				<a
					href={sourceUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="text-gold-400/70 hover:text-gold-400 underline-offset-2 hover:underline"
				>
					{sourceLabel}
				</a>
			) : null}
		</p>
	);
}
