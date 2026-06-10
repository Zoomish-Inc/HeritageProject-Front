import type { ReactNode } from 'react';
import { OrnamentalDivider } from '@/shared/ui';

export const HeritageDetailSection = ({
	title,
	children,
	trailingDivider = false,
}: {
	title?: string;
	children: React.ReactNode;
	trailingDivider?: boolean;
}) => (
	<>
		{title ? <OrnamentalDivider label={title} /> : null}
		<section className="mb-16">{children}</section>
		{trailingDivider ? <OrnamentalDivider /> : null}
	</>
);

export const HeritageDetailInfoRow = ({
	label,
	value,
}: {
	label: string;
	value: ReactNode;
}) => (
	<div className="grid grid-cols-1 gap-1 py-3 border-b theme-content-panel-divider last:border-0 md:grid-cols-2 md:gap-4">
		<span className="theme-content-panel-heading font-body text-xs tracking-wider uppercase md:min-w-36 flex-shrink-0 block mb-1 md:mb-0">
			{label}
		</span>
		<div className="theme-content-panel-body font-body text-sm leading-relaxed whitespace-pre-line">
			{value}
		</div>
	</div>
);
