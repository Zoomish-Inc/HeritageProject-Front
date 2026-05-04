import type { Locale, LocalizedString } from '@/entities/heritage';
import { localizedTrim } from '@/widgets/heritage/lib/heritageDetailLocale';

type Props = {
	locale: Locale;
	sourceUrl?: string;
	credit?: LocalizedString;
	sourceLabel: string;
};

export function HeritageDetailMediaAttribution({
	locale,
	sourceUrl,
	credit,
	sourceLabel,
}: Props) {
	const creditText = localizedTrim(credit, locale);
	const hasSource = Boolean(sourceUrl && sourceUrl.trim());
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
