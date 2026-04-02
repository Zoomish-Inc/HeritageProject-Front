'use client';
import { createQueryClient } from '@/lib/queryClient';
import {
	HydrationBoundary,
	QueryClientProvider,
	type DehydratedState,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

type Props = {
	children: React.ReactNode;
	dehydratedState?: DehydratedState;
};

export const Providers = ({ children, dehydratedState }: Props) => {
	const [queryClient] = useState(createQueryClient);

	return (
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
			{process.env.NODE_ENV === 'development' && (
				<ReactQueryDevtools initialIsOpen={false} />
			)}
		</QueryClientProvider>
	);
};
