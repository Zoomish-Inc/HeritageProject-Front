'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useHeritageListQuery } from '@/hooks/useHeritageListQuery';
import type { Locale } from '@/types/heritage';

export const NavDropdown = () => {
	const [open, setOpen] = useState(false);
	const tNav = useTranslations('nav');
	const tHeritage = useTranslations('heritage');
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
						{isLoading ? (
							<div className="p-4 text-center text-theme-accent-soft text-xs font-body italic">
								{tHeritage('loading')}
							</div>
						) : (
							<ul role="none">
								{items?.map((item, idx) => (
									<li
										key={item.id}
										role="none"
										className="border-b border-theme-soft last:border-0"
									>
										<Link
											href={`/heritage/${item.slug}`}
											role="menuitem"
											onClick={() => setOpen(false)}
											className="flex items-start gap-3 px-4 py-3 hover:bg-theme-accent-faint transition-colors duration-150 group"
										>
											<span className="text-theme-accent-soft font-ui text-xs mt-0.5 flex-shrink-0 group-hover:text-theme-accent-strong transition-colors">
												{String(idx + 1).padStart(2, '0')}
											</span>
											<div className="min-w-0">
												<p className="text-theme-primary text-xs font-body leading-snug group-hover:text-theme-accent transition-colors">
													{item.name[locale]}
												</p>
												<p className="text-theme-accent-soft text-xs font-ui mt-0.5">
													{item.yearRange ?? item.yearBuilt}
												</p>
											</div>
										</Link>
									</li>
								))}
							</ul>
						)}
						<div className="h-px bg-gradient-theme-accent-soft" />
					</div>
					<div className="h-px bg-gradient-theme-accent" />
				</div>
			)}
		</div>
	);
};
