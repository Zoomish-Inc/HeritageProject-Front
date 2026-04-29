'use client';

import { useTranslations } from 'next-intl';
import type { HeritageListItem, Locale } from '@/entities/heritage';
import { Link } from '@/i18n/navigation';
import { trackLandmarkNavClick } from '@/shared/lib/analytics';

type Props = {
	items?: HeritageListItem[];
	isLoading: boolean;
	locale: Locale;
	onItemNavigate?: () => void;
	presentation?: 'menu' | 'list';
};

export function LandmarksNavList({
	items,
	isLoading,
	locale,
	onItemNavigate,
	presentation = 'menu',
}: Props) {
	const tHeritage = useTranslations('heritage');

	if (isLoading) {
		return (
			<div className="p-4 text-center text-theme-accent-soft text-xs font-body italic">
				{tHeritage('loading')}
			</div>
		);
	}

	const listRole = presentation === 'menu' ? 'none' : 'list';
	const itemRole = presentation === 'menu' ? 'none' : 'listitem';
	const linkRole = presentation === 'menu' ? 'menuitem' : undefined;

	return (
		<ul role={listRole} className="min-w-0">
			{items?.map((item, idx) => (
				<li
					key={item.id}
					role={itemRole}
					className="border-b border-theme-soft last:border-0"
				>
					<Link
						href={`/heritage/${item.slug}`}
						{...(linkRole ? { role: linkRole } : {})}
						onClick={() => {
							trackLandmarkNavClick(item.slug, locale, presentation, idx + 1);
							onItemNavigate?.();
						}}
						className="flex items-start gap-3 px-4 py-3 hover:bg-theme-accent-faint transition-colors duration-150 group"
					>
						<span className="text-theme-accent-soft font-body text-xs mt-0.5 flex-shrink-0 group-hover:text-theme-accent-strong transition-colors">
							{String(idx + 1).padStart(2, '0')}
						</span>
						<div className="min-w-0">
							<p className="text-theme-primary text-xs font-body leading-snug group-hover:text-theme-accent transition-colors">
								{item.name[locale]}
							</p>
							<p className="text-theme-accent-soft text-xs font-body mt-0.5">
								{item.yearRange ?? item.yearBuilt}
							</p>
						</div>
					</Link>
				</li>
			))}
		</ul>
	);
}
