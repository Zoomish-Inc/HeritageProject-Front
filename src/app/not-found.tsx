import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ErrorOrNotFoundShell } from '@/components/UI/ErrorOrNotFoundShell';
import { NavigatorBackButton } from '@/components/UI/NavigatorBackButton';
import { OrnamentalDivider } from '@/components/UI/OrnamentalDivider';

export default async function RootNotFound() {
	const t = await getTranslations('errors');

	return (
		<ErrorOrNotFoundShell>
			<h1 className="font-display text-parchment-100 text-2xl md:text-3xl mb-4">
				{t('not_found_title')}
			</h1>
			<p className="text-parchment-200/70 font-body text-sm mb-10 max-w-md mx-auto">
				{t('not_found_description')}
			</p>

			<OrnamentalDivider />

			<div className="flex flex-wrap gap-4 justify-center mt-10">
				<NavigatorBackButton label={t('go_back')} />
				<Link
					href="/"
					className="inline-flex border border-gold-400/50 hover:border-gold-400 text-gold-400 hover:bg-gold-400/10 transition-all duration-300 px-8 py-3 font-ui text-xs tracking-widest uppercase"
				>
					{t('back_home')}
				</Link>
			</div>
		</ErrorOrNotFoundShell>
	);
}
