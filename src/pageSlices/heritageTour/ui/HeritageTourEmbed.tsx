'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
	src: string;
	title: string;
	fullscreenLabel: string;
	exitFullscreenLabel: string;
};

export function HeritageTourEmbed({
	src,
	title,
	fullscreenLabel,
	exitFullscreenLabel,
}: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isFullscreen, setIsFullscreen] = useState(false);

	useEffect(() => {
		const syncFullscreen = () => {
			setIsFullscreen(document.fullscreenElement === containerRef.current);
		};
		document.addEventListener('fullscreenchange', syncFullscreen);
		return () => document.removeEventListener('fullscreenchange', syncFullscreen);
	}, []);

	const toggleFullscreen = useCallback(async () => {
		const container = containerRef.current;
		if (!container) return;

		try {
			if (document.fullscreenElement === container) {
				await document.exitFullscreen();
			} else {
				await container.requestFullscreen();
			}
		} catch {
			return;
		}
	}, []);

	return (
		<div className="relative">
			<button
				type="button"
				onClick={toggleFullscreen}
				className="absolute top-3 right-3 z-10 inline-flex items-center justify-center px-3 py-2 text-[10px] font-body tracking-[0.2em] uppercase border border-gold-400/40 text-gold-400 bg-parchment-950/80 backdrop-blur-sm hover:bg-gold-400/10 transition-colors rounded-lg"
				aria-label={isFullscreen ? exitFullscreenLabel : fullscreenLabel}
			>
				{isFullscreen ? exitFullscreenLabel : fullscreenLabel}
			</button>

			<div
				ref={containerRef}
				className="rounded-xl overflow-hidden border border-gold-400/20 bg-black/20 fullscreen:border-0 fullscreen:rounded-none fullscreen:bg-black"
			>
				<iframe
					src={src}
					title={title}
					className="w-full h-[min(78dvh,900px)] min-h-[480px] border-0 fullscreen:h-full fullscreen:min-h-0"
					allow="fullscreen; xr-spatial-tracking"
					allowFullScreen
					loading="eager"
					referrerPolicy="no-referrer-when-downgrade"
				/>
			</div>
		</div>
	);
}
