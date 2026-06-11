import { UiBadge } from './UiBadge';

export const OrnamentalDivider = ({ label }: { label?: string }) => (
	<div className="grid grid-cols-[minmax(2rem,1fr)_auto_minmax(2rem,1fr)] items-center gap-x-4 my-8">
		<div className="h-px bg-gradient-to-r from-transparent to-gold-400/40" />
		{label ? (
			<UiBadge className="max-w-[min(100%,20rem)] leading-snug text-balance">
				{label}
			</UiBadge>
		) : (
			<span className="text-gold-400 text-lg">✦</span>
		)}
		<div className="h-px bg-gradient-to-l from-transparent to-gold-400/40" />
	</div>
);
