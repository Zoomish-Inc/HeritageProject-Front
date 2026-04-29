import type { ButtonHTMLAttributes } from 'react';

type UiCtaButtonVariant = 'accent' | 'accentSoft';
type UiCtaButtonSize = 'sm' | 'md';

type UiCtaButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: UiCtaButtonVariant;
	size?: UiCtaButtonSize;
};

const baseClassName =
	'inline-flex items-center justify-center border transition-all duration-300 font-body text-xs tracking-widest uppercase leading-none';

const variantClassName: Record<UiCtaButtonVariant, string> = {
	accent:
		'border-theme-chip text-theme-chip bg-theme-chip hover:border-gold-400 hover:bg-gold-400/10',
	accentSoft:
		'border-gold-400/30 text-gold-400/80 hover:text-gold-400 hover:border-gold-400/50',
};

const sizeClassName: Record<UiCtaButtonSize, string> = {
	sm: 'px-4 py-2',
	md: 'px-6 py-2',
};

export function getUiCtaButtonClassName({
	variant = 'accent',
	size = 'md',
	className,
}: {
	variant?: UiCtaButtonVariant;
	size?: UiCtaButtonSize;
	className?: string;
}) {
	return [
		baseClassName,
		variantClassName[variant],
		sizeClassName[size],
		className,
	]
		.filter(Boolean)
		.join(' ');
}

export function UiCtaButton({
	variant = 'accent',
	size = 'md',
	className,
	type = 'button',
	...props
}: UiCtaButtonProps) {
	return (
		<button
			type={type === 'submit' ? 'submit' : type === 'reset' ? 'reset' : 'button'}
			className={getUiCtaButtonClassName({ variant, size, className })}
			{...props}
		/>
	);
}
