'use client';
import { useState, useRef, useEffect } from 'react';
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

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, []);

	return (
		<div className="relative" ref={ref}>
			<button
				type="button"
				onClick={() => setOpen((p) => !p)}
				className="flex items-center gap-2 font-ui text-xs tracking-[0.2em] uppercase text-gold-300 hover:text-gold-400 transition-colors duration-200 py-2"
			>
				<span>{tNav('landmarks')}</span>
				<span
					className={`inline-block transition-transform duration-300 text-gold-400 ${open ? 'rotate-180' : ''}`}
				>
					▾
				</span>
			</button>

			{open && (
				<div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 z-50">
					<div className="h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
					<div className="bg-sepia-800 border border-gold-400/30 shadow-2xl">
						<div className="h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
						{isLoading ? (
							<div className="p-4 text-center text-gold-300/60 text-xs font-body italic">
								{tHeritage('loading')}
							</div>
						) : (
							<ul>
								{items?.map((item, idx) => (
									<li
										key={item.id}
										className="border-b border-gold-400/10 last:border-0"
									>
										<Link
											href={`/heritage/${item.slug}`}
											onClick={() => setOpen(false)}
											className="flex items-start gap-3 px-4 py-3 hover:bg-gold-400/10 transition-colors duration-150 group"
										>
											<span className="text-gold-400/50 font-ui text-xs mt-0.5 flex-shrink-0 group-hover:text-gold-400 transition-colors">
												{String(idx + 1).padStart(2, '0')}
											</span>
											<div className="min-w-0">
												<p className="text-parchment-100 text-xs font-body leading-snug group-hover:text-gold-300 transition-colors">
													{item.name[locale]}
												</p>
												<p className="text-gold-400/50 text-xs font-ui mt-0.5">
													{item.yearRange ?? item.yearBuilt}
												</p>
											</div>
										</Link>
									</li>
								))}
							</ul>
						)}
						<div className="h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
					</div>
					<div className="h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
				</div>
			)}
		</div>
	);
};
