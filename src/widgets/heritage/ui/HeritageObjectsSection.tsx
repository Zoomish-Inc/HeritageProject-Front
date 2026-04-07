'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useHeritageListQuery } from '@/hooks/useHeritageListQuery';
import { isHeritageListItemPublic } from '@/lib/heritage/listVisibility';
import type { Locale } from '@/entities/heritage';
import { HeritageCard } from './HeritageCard';

export const HeritageObjectsSection = () => {
	const locale = useLocale() as Locale;
	const t = useTranslations('home');
	const tHeritage = useTranslations('heritage');
	const { data: items, isError, isPending } = useHeritageListQuery();

	if (isError) {
		return (
			<div className="text-center py-20 text-gold-400/60 font-body italic">
				{tHeritage('error')}
			</div>
		);
	}

	if (isPending && !items) {
		return (
			<div className="text-center py-20 text-gold-400/60 font-body italic">
				{tHeritage('loading')}
			</div>
		);
	}

	const visible = items?.filter(isHeritageListItemPublic) ?? [];

	if (!visible.length) {
		return null;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{visible.map((item, idx) => (
				<HeritageCard
					key={item.id}
					item={item}
					index={idx}
					locale={locale}
					readMoreLabel={t('readMore')}
				/>
			))}
		</div>
	);
};
