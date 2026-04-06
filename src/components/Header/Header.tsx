'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { NavDropdown } from './NavDropdown';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
	const t = useTranslations('common');

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-theme-surface-soft backdrop-blur-sm border-b border-theme-soft">
			<div className="h-px bg-gradient-theme-accent" />

			<div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
				<Link href="/" className="flex items-center gap-3 group">
					<div className="w-10 h-10 border border-theme-strong flex items-center justify-center transition-colors duration-300 relative group-hover:border-gold-400">
						<div className="absolute inset-1 border border-theme-soft" />
						<span className="text-theme-accent text-lg font-ui">Ф</span>
					</div>
					<div className="hidden sm:block">
						<p className="text-theme-primary font-display text-sm leading-none tracking-wide">
							{t('project_name')}
						</p>
						<p className="text-theme-accent-soft font-ui text-[9px] tracking-[0.25em] uppercase mt-0.5">
							{t('tagline')}
						</p>
					</div>
				</Link>

				<nav className="flex items-center gap-6">
					<NavDropdown />
					<div className="w-px h-4 bg-theme-accent-faint" />
					<ThemeToggle />
					<div className="w-px h-4 bg-theme-accent-faint" />
					<LanguageSwitcher />
				</nav>
			</div>

			<div className="h-px bg-gradient-theme-accent-soft" />
		</header>
	);
};
