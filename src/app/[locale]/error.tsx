'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ErrorOrNotFoundShell } from '@/components/UI/ErrorOrNotFoundShell';
import { NavigatorBackButton } from '@/components/UI/NavigatorBackButton';
import { OrnamentalDivider } from '@/components/UI/OrnamentalDivider';

type Props = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function LocaleError({ error, reset }: Props) {
	const t = useTranslations('errors');
	const [copied, setCopied] = useState(false);

	const copyPayload = useMemo(() => {
		const parts = [
			error.message,
			error.digest ? `Digest: ${error.digest}` : null,
			error.stack ?? null,
		].filter(Boolean);
		return parts.join('\n\n');
	}, [error]);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(copyPayload);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2000);
		} catch {
			setCopied(false);
		}
	};

	return (
		<ErrorOrNotFoundShell>
			<h1 className="font-display text-parchment-100 text-2xl md:text-3xl mb-4">
				{t('title')}
			</h1>
			<p className="text-parchment-200/70 font-body text-sm mb-8 max-w-md mx-auto">
				{t('description')}
			</p>

			<div className="text-left max-w-xl mx-auto mb-8">
				<p className="font-ui text-[10px] tracking-[0.25em] uppercase text-gold-400/60 mb-3">
					{t('error_details')}
				</p>
				<div className="rounded border border-gold-400/20 bg-parchment-950/30 backdrop-blur-sm">
					<pre className="text-xs text-parchment-200/90 font-mono p-4 max-h-40 overflow-auto whitespace-pre-wrap break-words">
						{copyPayload || t('error_unknown')}
					</pre>
				</div>
				<button
					type="button"
					onClick={handleCopy}
					className="mt-4 w-full border border-gold-400/40 hover:border-gold-400 text-gold-400 hover:bg-gold-400/10 transition-all duration-300 px-4 py-2 font-ui text-xs tracking-widest uppercase"
				>
					{copied ? t('copied') : t('copy_error')}
				</button>
			</div>

			<OrnamentalDivider />

			<div className="flex flex-wrap gap-4 justify-center mt-10">
				<button
					type="button"
					onClick={() => reset()}
					className="border border-gold-400/50 hover:border-gold-400 text-gold-400 hover:bg-gold-400/10 transition-all duration-300 px-6 py-2 font-ui text-xs tracking-widest uppercase"
				>
					{t('retry')}
				</button>
				<NavigatorBackButton label={t('go_back')} />
				<Link
					href="/"
					className="border border-gold-400/30 text-gold-400/80 hover:text-gold-400 hover:border-gold-400/50 transition-all duration-300 px-6 py-2 font-ui text-xs tracking-widest uppercase"
				>
					{t('back_home')}
				</Link>
			</div>
		</ErrorOrNotFoundShell>
	);
}
