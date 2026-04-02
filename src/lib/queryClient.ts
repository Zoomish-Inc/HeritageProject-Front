import { heritageListStaleTime } from '@/lib/heritage/listQuery';
import { QueryClient } from '@tanstack/react-query';

export function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: heritageListStaleTime,
				retry: 1,
				refetchOnWindowFocus: false,
			},
		},
	});
}
