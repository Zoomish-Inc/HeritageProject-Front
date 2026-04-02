import { useQuery } from '@tanstack/react-query';
import { loadHeritageList } from '@/lib/heritage/getHeritageList';
import {
	heritageListQueryKey,
	heritageListStaleTime,
} from '@/lib/heritage/listQuery';

export const useHeritageListQuery = () => {
	return useQuery({
		queryKey: heritageListQueryKey,
		queryFn: () => loadHeritageList(),
		staleTime: heritageListStaleTime,
	});
};
