import type { ReactNode } from 'react';

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
			<h2 className="font-body text-gold-400 text-xs tracking-[0.3em] uppercase">
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
	value: ReactNode;
}) => (
	<div className="grid grid-cols-2 gap-4 py-3 border-b theme-content-panel-divider last:border-0">
		<span className="theme-content-panel-heading font-body text-xs tracking-wider uppercase min-w-36 flex-shrink-0">
			{label}
		</span>
		<div className="theme-content-panel-body font-body text-sm leading-relaxed">
			{value}
		</div>
	</div>
);
