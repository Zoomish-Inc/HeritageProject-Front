'use client';

import { useTranslations } from 'next-intl';
import { HeritageNavDropdown } from '@/features/heritageNavigation';
import { LanguageSwitch } from '@/features/languageSwitch';
import { useMobileMenu } from '@/features/mobileMenu';
import { ThemeToggle } from '@/features/themeToggle';
import { Link } from '@/i18n/navigation';
import { MobileNavDrawer } from './MobileNavDrawer';

export const Header = () => {
	const t = useTranslations('common');
	const { isOpen, openMenu, closeMenu } = useMobileMenu();

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-theme-surface-soft backdrop-blur-sm border-b border-theme-soft">
			<div className="h-px bg-gradient-theme-accent" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
				<Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
					<div className="w-10 h-10 shrink-0 border border-theme-strong flex items-center justify-center transition-colors duration-300 relative group-hover:border-gold-400">
						<div className="absolute inset-1 border border-theme-soft" />
						<span className="text-theme-accent text-lg font-ui">Ф</span>
					</div>
					<div className="hidden sm:block min-w-0">
						<p className="text-theme-primary font-display text-sm leading-none tracking-wide truncate">
							{t('project_name')}
						</p>
						<p className="text-theme-accent-soft font-ui text-[9px] tracking-[0.25em] uppercase mt-0.5">
							{t('tagline')}
						</p>
					</div>
				</Link>

				<nav
					className="hidden md:flex items-center gap-6"
					aria-label={t('desktop_nav_label')}
				>
					<HeritageNavDropdown />
					<div className="w-px h-4 bg-theme-accent-faint" aria-hidden />
					<ThemeToggle />
					<div className="w-px h-4 bg-theme-accent-faint" aria-hidden />
					<LanguageSwitch />
				</nav>

				<div className="flex md:hidden items-center gap-2 shrink-0">
					<ThemeToggle />
					<button
						type="button"
						aria-expanded={isOpen}
						aria-controls="mobile-nav-panel"
						aria-label={t('open_menu')}
						onClick={openMenu}
						className="flex h-10 w-10 items-center justify-center rounded border border-theme-soft text-theme-accent transition-colors hover:border-theme-strong hover:text-theme-accent-strong"
					>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			</div>

			<MobileNavDrawer open={isOpen} onClose={closeMenu} />

			<div className="h-px bg-gradient-theme-accent-soft" />
		</header>
	);
};
