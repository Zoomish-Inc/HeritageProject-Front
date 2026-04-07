'use client';

import { useCallback, useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import { useHeritageListQuery } from '@/hooks/useHeritageListQuery';
import { trackEvent } from '@/lib/analytics';
import type { Locale } from '@/types/heritage';
import { LandmarksNavList } from './LandmarksNavList';
import { LanguageSwitcher } from './LanguageSwitcher';

type Props = {
	open: boolean;
	onClose: () => void;
};

export const MobileNavDrawer = ({ open, onClose }: Props) => {
	const tNav = useTranslations('nav');
	const tCommon = useTranslations('common');
	const locale = useLocale() as Locale;
	const { data: items, isLoading } = useHeritageListQuery();
	const titleId = useId();
	const [mounted, setMounted] = useState(false);

	const closeDrawer = useCallback(
		(reason: string) => {
			trackEvent('mobile_menu_close', { reason });
			onClose();
		},
		[onClose]
	);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!open) return undefined;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeDrawer('escape');
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [open, closeDrawer]);

	useEffect(() => {
		if (open) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	if (!mounted) return null;

	return createPortal(
		<div
			className={`fixed inset-0 z-[100] md:hidden ${
				open ? 'pointer-events-auto' : 'pointer-events-none'
			}`}
			role="dialog"
			aria-modal="true"
			aria-hidden={!open}
			aria-labelledby={titleId}
		>
			<button
				type="button"
				className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ease-out ${
					open ? 'opacity-100' : 'opacity-0'
				}`}
				aria-label={tCommon('close_menu')}
				onClick={() => closeDrawer('backdrop')}
				tabIndex={open ? 0 : -1}
			/>
			<aside
				id="mobile-nav-panel"
				className={`absolute top-0 right-0 flex h-full min-h-0 w-full max-w-sm flex-col border-l border-theme-soft bg-theme-surface shadow-2xl will-change-transform transition-transform duration-300 ease-out motion-reduce:transition-none ${
					open ? 'translate-x-0' : 'translate-x-full'
				}`}
				style={{ height: '100dvh', maxHeight: '100dvh' }}
			>
				<div className="flex h-16 shrink-0 items-center justify-between border-b border-theme-soft px-4">
					<span
						id={titleId}
						className="font-ui text-xs uppercase tracking-[0.2em] text-theme-accent"
					>
						{tCommon('mobile_nav_title')}
					</span>
					<button
						type="button"
						onClick={() => closeDrawer('close_button')}
						aria-label={tCommon('close_menu')}
						className="flex h-10 w-10 items-center justify-center text-theme-accent transition-colors hover:text-theme-accent-strong"
					>
						<span className="text-xl leading-none" aria-hidden>
							×
						</span>
					</button>
				</div>
				<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-8 pt-4">
					<p className="mb-2 px-2 font-ui text-[10px] uppercase tracking-[0.25em] text-theme-accent-soft">
						{tNav('landmarks')}
					</p>
					<div className="overflow-hidden rounded-xl border border-theme-soft bg-theme-surface-soft">
						<LandmarksNavList
							items={items}
							isLoading={isLoading}
							locale={locale}
							onItemNavigate={() => closeDrawer('item_navigate')}
							presentation="list"
						/>
					</div>
					<div className="my-6 h-px bg-gradient-theme-accent-soft" />
					<p className="mb-3 px-2 font-ui text-[10px] uppercase tracking-[0.25em] text-theme-accent-soft">
						{tCommon('language_label')}
					</p>
					<div className="px-2 [&_button]:min-h-[44px] [&_button]:min-w-[44px]">
						<LanguageSwitcher
							className="gap-2"
							onAfterLocaleChange={() => closeDrawer('language_change')}
						/>
					</div>
				</div>
			</aside>
		</div>,
		document.body
	);
};
