'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { trackHeritageView, trackPageView } from '@/shared/lib/analytics';

export function AnalyticsPageTracker() {
	const pathname = usePathname();

	useEffect(() => {
		const pagePath = pathname;
		const pageLocation =
			typeof window !== 'undefined'
				? window.location.href
				: `https://heritage-project-front.vercel.app${pagePath}`;
		const pageTitle =
			typeof document !== 'undefined' ? document.title : undefined;

		trackPageView(pagePath, pageTitle, pageLocation);

		const match = pathname.match(/^\/(ru|uz)\/heritage\/([^/?#]+)/);
		if (match) {
			trackHeritageView(match[1], decodeURIComponent(match[2]), pagePath);
		}
	}, [pathname]);

	return null;
}
