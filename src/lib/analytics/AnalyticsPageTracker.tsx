'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { trackEvent, trackPageView } from '@/lib/analytics';

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
			trackEvent('view_heritage', {
				locale: match[1],
				slug: decodeURIComponent(match[2]),
				page_path: pagePath,
			});
		}
	}, [pathname]);

	return null;
}
