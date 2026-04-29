import { UiBadge } from './UiBadge';

export const OrnamentalDivider = ({ label }: { label?: string }) => (
	<div className="flex items-center gap-4 my-8">
		<div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-400/40" />
		{label ? (
			<UiBadge>{label}</UiBadge>
		) : (
			<span className="text-gold-400 text-lg">✦</span>
		)}
		<div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-400/40" />
	</div>
);
