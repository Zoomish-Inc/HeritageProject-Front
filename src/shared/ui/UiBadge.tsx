import type { HTMLAttributes } from 'react';

type UiBadgeVariant = 'goldOutline' | 'heroEra' | 'mediaLabel';

type UiBadgeProps = HTMLAttributes<HTMLSpanElement> & {
	variant?: UiBadgeVariant;
};

const baseClassName =
	'inline-flex items-center justify-center leading-none font-body uppercase';

const variantClassName: Record<UiBadgeVariant, string> = {
	goldOutline:
		'text-gold-400 border border-gold-400/30 px-4 py-1 text-xs tracking-[0.3em]',
	heroEra:
		'text-theme-chip bg-theme-chip border border-theme-chip px-2 py-1 text-[10px] tracking-[0.4em]',
	mediaLabel:
		'text-[10px] tracking-[0.2em] text-theme-chip bg-theme-chip border border-theme-chip px-2 py-1',
};

export function UiBadge({
	variant = 'goldOutline',
	className,
	...props
}: UiBadgeProps) {
	return (
		<span
			className={[baseClassName, variantClassName[variant], className]
				.filter(Boolean)
				.join(' ')}
			{...props}
		/>
	);
}
