import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function LocaleNotFound() {
	const t = await getTranslations('errors');

	return (
		<div className="max-w-lg mx-auto px-6 py-24 text-center">
			<h1 className="font-display text-parchment-100 text-2xl mb-4">
				{t('not_found_title')}
			</h1>
			<p className="text-parchment-200/70 font-body text-sm mb-10">
				{t('not_found_description')}
			</p>
			<Link
				href="/"
				className="inline-flex border border-gold-400/50 hover:border-gold-400 text-gold-400 hover:bg-gold-400/10 transition-all duration-300 px-8 py-3 font-ui text-xs tracking-widest uppercase"
			>
				{t('back_home')}
			</Link>
		</div>
	);
}
