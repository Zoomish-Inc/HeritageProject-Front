'use client';

import type { Locale } from '@/entities/heritage';
import { heritagePathForLocale } from '@/shared/lib/seo/paths';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function NextHeritagePrefetch({
	locale,
	slug,
}: {
	locale: Locale;
	slug?: string;
}) {
	const router = useRouter();

	useEffect(() => {
		if (!slug) return;
		router.prefetch(heritagePathForLocale(locale, slug));
	}, [locale, router, slug]);

	return null;
}
