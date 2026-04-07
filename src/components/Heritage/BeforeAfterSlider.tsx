'use client';
import Image from 'next/image';
import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type PointerEvent as ReactPointerEvent,
} from 'react';
import { trackEvent } from '@/lib/analytics';

type Props = {
	beforeSrc: string;
	afterSrc: string;
	beforeAlt: string;
	afterAlt: string;
	beforeLabel: string;
	afterLabel: string;
	pairLabel: string;
	ariaLabel: string;
	hint: string;
};

export const BeforeAfterSlider = ({
	beforeSrc,
	afterSrc,
	beforeAlt,
	afterAlt,
	beforeLabel,
	afterLabel,
	pairLabel,
	ariaLabel,
	hint,
}: Props) => {
	const [pct, setPct] = useState(50);
	const dragging = useRef(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const trackedInteraction = useRef(false);

	const trackInteraction = useCallback(
		(source: 'drag' | 'range') => {
			if (trackedInteraction.current) return;
			trackedInteraction.current = true;
			trackEvent('before_after_interact', {
				label: pairLabel,
				source,
			});
		},
		[pairLabel]
	);

	const setFromClientX = useCallback((clientX: number) => {
		const el = containerRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const x = clientX - rect.left;
		const next = Math.min(100, Math.max(0, (x / rect.width) * 100));
		setPct(next);
	}, []);

	const endDrag = useCallback(() => {
		dragging.current = false;
	}, []);

	useEffect(() => {
		window.addEventListener('pointerup', endDrag);
		window.addEventListener('pointercancel', endDrag);
		return () => {
			window.removeEventListener('pointerup', endDrag);
			window.removeEventListener('pointercancel', endDrag);
		};
	}, [endDrag]);

	const onPointerDown = (e: ReactPointerEvent) => {
		e.preventDefault();
		dragging.current = true;
		containerRef.current?.setPointerCapture(e.pointerId);
		setFromClientX(e.clientX);
		trackInteraction('drag');
	};

	const onPointerMove = (e: ReactPointerEvent) => {
		if (!dragging.current) return;
		setFromClientX(e.clientX);
	};

	const onPointerUp = (e: ReactPointerEvent) => {
		dragging.current = false;
		try {
			containerRef.current?.releasePointerCapture(e.pointerId);
		} catch {}
	};

	const clipRight = 100 - pct;

	return (
		<figure className="theme-content-panel p-4 md:p-5">
			<figcaption className="font-display theme-content-panel-heading text-lg mb-3 text-center">
				{pairLabel}
			</figcaption>
			<p className="theme-content-panel-body font-body text-xs text-center mb-4 max-w-xl mx-auto leading-relaxed">
				{hint}
			</p>

			<div
				ref={containerRef}
				className="relative w-full aspect-[16/10] max-h-[min(70vh,520px)] overflow-hidden rounded-lg border border-gold-400/25 select-none touch-none cursor-ew-resize"
				style={{ touchAction: 'none' }}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
			>
				<Image
					src={afterSrc}
					alt={afterAlt}
					fill
					sizes="(max-width: 896px) 100vw, 800px"
					className="object-cover"
					draggable={false}
				/>
				<div
					className="absolute inset-0 pointer-events-none"
					style={{ clipPath: `inset(0 ${clipRight}% 0 0)` }}
				>
					<Image
						src={beforeSrc}
						alt={beforeAlt}
						fill
						sizes="(max-width: 896px) 100vw, 800px"
						className="object-cover [filter:sepia(0.28)]"
						draggable={false}
					/>
				</div>

				<div
					className="absolute inset-y-0 w-px bg-gold-400 z-10 shadow-[0_0_12px_rgba(201,168,76,0.6)] pointer-events-none"
					style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
					aria-hidden
				/>
				<div
					className="absolute top-1/2 z-20 w-11 h-11 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold-400 bg-sepia-900/90 shadow-lg flex items-center justify-center pointer-events-none"
					style={{ left: `${pct}%` }}
					aria-hidden
				>
					<span className="text-gold-400 text-lg leading-none font-ui select-none">
						⇄
					</span>
				</div>

				<div className="absolute top-2 left-2 right-2 flex justify-between pointer-events-none z-[5]">
					<span className="text-[10px] font-ui tracking-[0.2em] uppercase text-parchment-100/90 bg-sepia-900/75 border border-gold-400/30 px-2 py-1">
						{beforeLabel}
					</span>
					<span className="text-[10px] font-ui tracking-[0.2em] uppercase text-parchment-100/90 bg-sepia-900/75 border border-gold-400/30 px-2 py-1">
						{afterLabel}
					</span>
				</div>
			</div>

			<div className="mt-4 px-1">
				<input
					type="range"
					min={0}
					max={100}
					value={pct}
					aria-label={ariaLabel}
					className="w-full h-2 rounded-full appearance-none cursor-pointer bg-sepia-800 border border-gold-400/25 accent-gold-400
						[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold-400 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-sepia-900
						[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gold-400 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-sepia-900"
					onChange={(e) => {
						setPct(Number(e.target.value));
						trackInteraction('range');
					}}
				/>
			</div>
		</figure>
	);
};
