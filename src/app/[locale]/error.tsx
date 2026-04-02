'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type Props = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function LocaleError({ error, reset }: Props) {
	const t = useTranslations('errors');

	return (
		<div className="max-w-lg mx-auto px-6 py-24 text-center">
			<h1 className="font-display text-parchment-100 text-2xl mb-4">
				{t('title')}
			</h1>
			<p className="text-parchment-200/70 font-body text-sm mb-8">
				{t('description')}
			</p>
			{process.env.NODE_ENV === 'development' && error.message && (
				<pre className="text-left text-xs text-gold-400/60 mb-8 overflow-auto max-h-32 font-mono">
					{error.message}
				</pre>
			)}
			<div className="flex flex-wrap gap-4 justify-center">
				<button
					type="button"
					onClick={() => reset()}
					className="border border-gold-400/50 hover:border-gold-400 text-gold-400 hover:bg-gold-400/10 transition-all duration-300 px-6 py-2 font-ui text-xs tracking-widest uppercase"
				>
					{t('retry')}
				</button>
				<Link
					href="/"
					className="border border-gold-400/30 text-gold-400/80 hover:text-gold-400 hover:border-gold-400/50 transition-all duration-300 px-6 py-2 font-ui text-xs tracking-widest uppercase"
				>
					{t('back_home')}
				</Link>
			</div>
		</div>
	);
}
