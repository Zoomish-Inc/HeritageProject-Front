export const OrnamentalDivider = ({ label }: { label?: string }) => (
	<div className="flex items-center gap-4 my-8">
		<div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-400/40" />
		{label ? (
			<span className="inline-flex items-center leading-none text-gold-400 font-body text-xs tracking-[0.3em] uppercase px-4 py-1 border border-gold-400/30">
				{label}
			</span>
		) : (
			<span className="text-gold-400 text-lg">✦</span>
		)}
		<div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-400/40" />
	</div>
);
