import { Link } from '@/i18n/navigation';
import type { HeritageObject, Locale } from '@/entities/heritage';
import { resolveTourEmbedUrl } from '@/shared/lib/heritage/resolveTourEmbedUrl';
import { getTranslations } from 'next-intl/server';
import { HeritageTourEmbed } from './HeritageTourEmbed';

type Props = {
	object: HeritageObject;
	locale: Locale;
};

export async function HeritageTourPageView({ object, locale }: Props) {
	const t = await getTranslations({ locale, namespace: 'heritage' });
	const tourSrc = resolveTourEmbedUrl(object.tourEntryUrl ?? '');

	return (
		<article className="max-w-6xl mx-auto px-6 py-6">
			<Link
				href={`/heritage/${object.slug}`}
				className="inline-flex items-center gap-2 text-gold-400/60 hover:text-gold-400 transition-colors font-body text-xs tracking-widest uppercase mb-4 group"
			>
				<span className="group-hover:-translate-x-1 transition-transform duration-200">
					←
				</span>
				<span>{object.name[locale]}</span>
			</Link>

			<p className="font-display text-parchment-50 text-2xl md:text-3xl mb-4">
				{t('tour_link')}
			</p>

			<HeritageTourEmbed
				src={tourSrc}
				title={`${object.name[locale]} — ${t('tour_link')}`}
				fullscreenLabel={t('tour_fullscreen')}
				exitFullscreenLabel={t('tour_exit_fullscreen')}
			/>
		</article>
	);
}
