'use client';
import Link from 'next/link';
import { useLocale } from '@/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { NavDropdown } from './NavDropdown';

export const Header = () => {
  const { locale, t } = useLocale();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sepia-800/95 backdrop-blur-sm border-b border-gold-400/20">
      {/* Ornamental top line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          {/* Emblem */}
          <div className="w-10 h-10 border border-gold-400/60 flex items-center justify-center group-hover:border-gold-400 transition-colors duration-300 relative">
            <div className="absolute inset-1 border border-gold-400/20" />
            <span className="text-gold-400 text-lg font-ui">Ф</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-parchment-100 font-display text-sm leading-none tracking-wide">
              {t.common.project_name}
            </p>
            <p className="text-gold-400/60 font-ui text-[9px] tracking-[0.25em] uppercase mt-0.5">
              {t.common.tagline}
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <NavDropdown />
          <div className="w-px h-4 bg-gold-400/20" />
          <LanguageSwitcher />
        </nav>
      </div>

      {/* Ornamental bottom line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
    </header>
  );
};
