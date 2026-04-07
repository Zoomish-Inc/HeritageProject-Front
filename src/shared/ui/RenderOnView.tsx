'use client';

import { useEffect, useRef, useState } from 'react';

export function RenderOnView({
	children,
	fallback,
	rootMargin = '300px 0px',
}: {
	children: React.ReactNode;
	fallback: React.ReactNode;
	rootMargin?: string;
}) {
	const [isVisible, setIsVisible] = useState(false);
	const hostRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const host = hostRef.current;
		if (!host || isVisible) return undefined;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ rootMargin, threshold: 0.01 }
		);

		observer.observe(host);
		return () => observer.disconnect();
	}, [isVisible, rootMargin]);

	return <div ref={hostRef}>{isVisible ? children : fallback}</div>;
}
