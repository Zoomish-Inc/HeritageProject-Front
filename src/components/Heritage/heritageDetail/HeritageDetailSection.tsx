export const HeritageDetailSection = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<section className="mb-16">
		<div className="flex items-center gap-4 mb-6">
			<div className="w-1 h-6 bg-gold-400" />
			<h2 className="font-ui text-gold-400 text-xs tracking-[0.3em] uppercase">
				{title}
			</h2>
		</div>
		{children}
	</section>
);

export const HeritageDetailInfoRow = ({
	label,
	value,
}: {
	label: string;
	value: string;
}) => (
	<div className="grid grid-cols-2 gap-4 py-3 border-b border-gold-400/10 last:border-0">
		<span className="text-gold-400/60 font-ui text-xs tracking-wider uppercase min-w-36 flex-shrink-0">
			{label}
		</span>
		<span className="text-parchment-100 font-ui text-sm leading-relaxed">
			{value}
		</span>
	</div>
);
