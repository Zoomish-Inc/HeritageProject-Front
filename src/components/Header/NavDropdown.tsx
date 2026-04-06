'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useHeritageListQuery } from '@/hooks/useHeritageListQuery';
import type { Locale } from '@/types/heritage';
import { LandmarksNavList } from './LandmarksNavList';

export const NavDropdown = () => {
	const [open, setOpen] = useState(false);
	const tNav = useTranslations('nav');
	const locale = useLocale() as Locale;
	const { data: items, isLoading } = useHeritageListQuery();
	const ref = useRef<HTMLDivElement>(null);
	const menuId = useId();

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, []);

	useEffect(() => {
		if (!open) return undefined;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false);
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [open]);

	return (
		<div className="relative" ref={ref}>
			<button
				type="button"
				id={`${menuId}-trigger`}
				aria-haspopup="menu"
				aria-expanded={open}
				aria-controls={open ? `${menuId}-menu` : undefined}
				onClick={() => setOpen((p) => !p)}
				className="flex items-center gap-2 font-ui text-xs tracking-[0.2em] uppercase text-theme-accent hover:text-theme-accent-strong transition-colors duration-200 py-2"
			>
				<span>{tNav('landmarks')}</span>
				<span
					className={`inline-block transition-transform duration-300 text-theme-accent ${open ? 'rotate-180' : ''}`}
					aria-hidden
				>
					▾
				</span>
			</button>

			{open && (
				<div
					id={`${menuId}-menu`}
					role="menu"
					aria-labelledby={`${menuId}-trigger`}
					className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 z-50"
				>
					<div className="h-px bg-gradient-theme-accent" />
					<div className="bg-theme-surface border border-theme-soft shadow-2xl rounded-xl overflow-hidden">
						<div className="h-px bg-gradient-theme-accent-soft" />
						<LandmarksNavList
							items={items}
							isLoading={isLoading}
							locale={locale}
							onItemNavigate={() => setOpen(false)}
						/>
						<div className="h-px bg-gradient-theme-accent-soft" />
					</div>
					<div className="h-px bg-gradient-theme-accent" />
				</div>
			)}
		</div>
	);
};
