'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/types/heritage';

export const LanguageSwitcher = () => {
	const locale = useLocale() as Locale;
	const router = useRouter();
	const pathname = usePathname();

	const toggle = (l: Locale) => {
		if (l !== locale) router.replace(pathname, { locale: l });
	};

	return (
		<div className="flex items-center gap-1 text-xs font-ui tracking-widest">
			{(['ru', 'uz'] as Locale[]).map((l) => (
				<button
					key={l}
					type="button"
					onClick={() => toggle(l)}
					className={`px-2 py-1 border transition-all duration-200 uppercase ${
						locale === l
							? 'bg-theme-accent border-theme-strong text-sepia-900 font-bold'
							: 'border-theme-soft text-theme-accent hover:border-theme-strong hover:text-theme-accent-strong'
					}`}
				>
					{l === 'ru' ? 'RU' : 'UZ'}
				</button>
			))}
		</div>
	);
};
