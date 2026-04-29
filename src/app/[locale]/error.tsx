'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { runtimeConfig } from '@/shared/config';
import {
	ErrorOrNotFoundShell,
	NavigatorBackButton,
	OrnamentalDivider,
	UiCtaButton,
	getUiCtaButtonClassName,
} from '@/shared/ui';

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
			<h1 className="font-display text-theme-primary text-2xl md:text-3xl mb-4">
				{t('title')}
			</h1>
			<p className="text-theme-muted font-body text-sm mb-8 max-w-md mx-auto">
				{t('description')}
			</p>

			{error.digest ? (
				<div className="text-left max-w-xl mx-auto mb-8 rounded border border-gold-400/20 bg-parchment-950/25 px-4 py-4 space-y-3">
					<p className="text-theme-muted font-body text-xs leading-relaxed">
						{t('error_rsc_explanation')}
					</p>
					<p className="text-theme-muted font-body text-xs leading-relaxed">
						{t('error_digest_hint')}
					</p>
					{runtimeConfig.isDev ? (
						<p className="text-theme-accent-soft font-body text-xs leading-relaxed">
							{t('error_dev_hint')}
						</p>
					) : null}
				</div>
			) : null}

			<div className="text-left max-w-xl mx-auto mb-8">
				<p className="font-body text-ui-micro tracking-[0.25em] text-theme-accent-soft mb-3">
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
					className={getUiCtaButtonClassName({
						size: 'sm',
						variant: 'accent',
						className: 'mt-4 w-full border-gold-400/40',
					})}
				>
					{copied ? t('copied') : t('copy_error')}
				</button>
			</div>

			<OrnamentalDivider />

			<div className="flex flex-wrap gap-4 justify-center mt-10">
				<UiCtaButton type="button" onClick={() => reset()} size="md">
					{t('retry')}
				</UiCtaButton>
				<NavigatorBackButton label={t('go_back')} />
				<Link
					href="/"
					className={getUiCtaButtonClassName({
						size: 'md',
						variant: 'accentSoft',
					})}
				>
					{t('back_home')}
				</Link>
			</div>
		</ErrorOrNotFoundShell>
	);
}
