'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const DEFAULT_COLLAPSED_HEIGHT = 200;

type Props = {
	text: string;
	className?: string;
	collapsedMaxHeight?: number;
};

export const HeritageDetailExpandableText = ({
	text,
	className = '',
	collapsedMaxHeight = DEFAULT_COLLAPSED_HEIGHT,
}: Props) => {
	const t = useTranslations('heritage');
	const [expanded, setExpanded] = useState(false);
	const [canExpand, setCanExpand] = useState(false);
	const contentRef = useRef<HTMLParagraphElement>(null);

	useLayoutEffect(() => {
		const el = contentRef.current;
		if (!el) return;
		const overflows = el.scrollHeight > collapsedMaxHeight + 4;
		setCanExpand(overflows);
		if (!overflows) setExpanded(false);
	}, [text, collapsedMaxHeight]);

	return (
		<div>
			<div
				className={!expanded && canExpand ? 'relative overflow-hidden' : undefined}
				style={
					!expanded && canExpand ? { maxHeight: collapsedMaxHeight } : undefined
				}
			>
				<p ref={contentRef} className={className}>
					{text}
				</p>
				{!expanded && canExpand ? (
					<div
						className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--content-panel-bg)] to-transparent"
						aria-hidden
					/>
				) : null}
			</div>
			{canExpand ? (
				<button
					type="button"
					onClick={() => setExpanded((value) => !value)}
					className="mt-3 font-body text-xs tracking-[0.2em] uppercase text-gold-400/80 hover:text-gold-400 transition-colors"
					aria-expanded={expanded}
				>
					{expanded ? t('read_less') : t('read_more')}
				</button>
			) : null}
		</div>
	);
};
