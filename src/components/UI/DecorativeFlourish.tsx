type Props = {
	variant?: 'section' | 'footer';
	className?: string;
};

export const DecorativeFlourish = ({
	variant = 'section',
	className = '',
}: Props) => {
	const lineMax = variant === 'footer' ? 'max-w-24' : '';
	return (
		<div className={`flex items-center gap-4 ${className}`}>
			<div
				className={`flex-1 h-px bg-gradient-to-r from-transparent to-gold-400/30 ${lineMax}`}
			/>
			<span
				className={
					variant === 'footer' ? 'text-gold-400/50 text-xs' : 'text-gold-400 text-sm'
				}
			>
				✦
			</span>
			<div
				className={`flex-1 h-px bg-gradient-to-l from-transparent to-gold-400/30 ${lineMax}`}
			/>
		</div>
	);
};
