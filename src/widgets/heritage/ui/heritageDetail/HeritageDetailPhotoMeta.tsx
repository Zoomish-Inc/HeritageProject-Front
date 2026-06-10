import type { Locale, PhotoItem } from '@/entities/heritage';
import { localizedTrim } from '@/widgets/heritage/lib/heritageDetailLocale';
import { resolvePhotoAttributionSourceUrl } from '@/widgets/heritage/lib/mediaSourceResourceLabel';
import {
	hasHeritageMediaAttribution,
	HeritageDetailMediaAttribution,
} from './HeritageDetailMediaAttribution';

type Props = {
	photo: PhotoItem;
	locale: Locale;
	sourceLabel: string;
	className?: string;
	captionClassName?: string;
};

export function HeritageDetailPhotoMeta({
	photo,
	locale,
	sourceLabel,
	className = 'p-4',
	captionClassName = 'theme-content-panel-body font-body text-sm leading-relaxed mb-1',
}: Props) {
	const captionText = localizedTrim(photo.caption, locale);
	const sourceUrl = resolvePhotoAttributionSourceUrl(
		photo.sourceUrl,
		photo.url,
		locale
	);
	const hasAttribution = hasHeritageMediaAttribution({
		locale,
		sourceUrl,
		credit: photo.credit,
	});

	if (!captionText && !hasAttribution) return null;

	return (
		<div className={className}>
			{captionText ? <p className={captionClassName}>{captionText}</p> : null}
			<HeritageDetailMediaAttribution
				locale={locale}
				sourceUrl={sourceUrl}
				credit={photo.credit}
				sourceLabel={sourceLabel}
			/>
		</div>
	);
}
