'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { trackLanguageSwitch } from '@/shared/lib/analytics';
import type { Locale } from '@/entities/heritage';

export function LanguageSwitch({
	className,
	onAfterLocaleChange,
}: {
	className?: string;
	onAfterLocaleChange?: () => void;
}) {
	const locale = useLocale() as Locale;
	const router = useRouter();
	const pathname = usePathname();

	const toggle = (nextLocale: Locale) => {
		if (nextLocale !== locale) {
			trackLanguageSwitch(locale, nextLocale, pathname);
			router.replace(pathname, { locale: nextLocale });
			onAfterLocaleChange?.();
		}
	};

	return (
		<div
			className={`flex items-center gap-1 text-xs font-ui tracking-widest${className ? ` ${className}` : ''}`}
		>
			{(['ru', 'uz'] as Locale[]).map((itemLocale) => (
				<button
					key={itemLocale}
					type="button"
					onClick={() => toggle(itemLocale)}
					className={`px-2 py-1 border transition-all duration-200 uppercase ${
						locale === itemLocale
							? 'bg-theme-accent border-theme-strong text-sepia-900 font-bold'
							: 'border-theme-soft text-theme-accent hover:border-theme-strong hover:text-theme-accent-strong'
					}`}
				>
					{itemLocale === 'ru' ? 'RU' : 'UZ'}
				</button>
			))}
		</div>
	);
}
