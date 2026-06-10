import Image from 'next/image';
import { HeritageDetailPhotoMeta } from './HeritageDetailPhotoMeta';
import { HeritageDetailSection } from './HeritageDetailSection';
import type { Locale, PhotoItem } from '@/entities/heritage';
import {
	imagePlaceholderDataUrl,
	imageQuality,
} from '@/shared/lib/image/placeholder';
import { localizedTrim } from '@/widgets/heritage/lib/heritageDetailLocale';

type Props = {
	photos: PhotoItem[];
	locale: Locale;
	title: string;
	sourceLabel: string;
};

export const HeritageDetailGallery = ({
	photos,
	locale,
	title,
	sourceLabel,
}: Props) => {
	if (photos.length === 0) return null;
	return (
		<HeritageDetailSection title={title}>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{photos.map((photo) => {
					const alt =
						localizedTrim(photo.caption, locale) ||
						`${title} ${photo.caption?.ru ?? photo.url}`;
					return (
						<div
							key={`gallery-${photo.url}-${photo.caption?.ru ?? photo.sourceUrl ?? ''}`}
							className="theme-content-panel overflow-hidden rounded-lg border border-gold-400/15"
						>
							<div className="relative aspect-[4/3] w-full bg-sepia-900/40">
								<Image
									src={photo.url}
									alt={alt}
									fill
									sizes="(max-width: 640px) 100vw, 50vw"
									quality={imageQuality}
									placeholder="blur"
									blurDataURL={imagePlaceholderDataUrl}
									className="object-cover"
								/>
							</div>
							<HeritageDetailPhotoMeta
								photo={photo}
								locale={locale}
								sourceLabel={sourceLabel}
							/>
						</div>
					);
				})}
			</div>
		</HeritageDetailSection>
	);
};
