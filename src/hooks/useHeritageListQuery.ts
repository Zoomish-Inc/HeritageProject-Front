import { useQuery } from '@tanstack/react-query';
import { heritageListQueryFn } from '@/lib/heritage/getHeritageList';
import {
	heritageListQueryKey,
	heritageListStaleTime,
} from '@/lib/heritage/listQuery';

export const useHeritageListQuery = () => {
	return useQuery({
		queryKey: heritageListQueryKey,
		queryFn: heritageListQueryFn,
		staleTime: heritageListStaleTime,
	});
};
