'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { trackThemeToggle } from '@/shared/lib/analytics';

type Theme = 'light' | 'dark';

const storageKey = 'theme-preference';

export function ThemeToggle() {
	const t = useTranslations('common');
	const [theme, setTheme] = useState<Theme>('dark');

	useEffect(() => {
		const root = document.documentElement;
		const current = root.classList.contains('light') ? 'light' : 'dark';
		setTheme(current);
	}, []);

	const toggleTheme = () => {
		const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
		const root = document.documentElement;
		root.classList.remove('light', 'dark');
		root.classList.add(nextTheme);
		localStorage.setItem(storageKey, nextTheme);
		setTheme(nextTheme);
		trackThemeToggle(nextTheme);
	};

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label={t('theme_toggle')}
			title={t('theme_toggle')}
			className="w-9 h-9 theme-button-outline flex items-center justify-center"
		>
			<span className="text-sm" aria-hidden>
				{theme === 'dark' ? '☀' : '☾'}
			</span>
		</button>
	);
}
