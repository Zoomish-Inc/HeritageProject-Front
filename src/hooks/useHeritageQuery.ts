import { useQuery } from '@tanstack/react-query';
import { $axios } from '@/lib/axios';
import type { HeritageObject, ApiResponse } from '@/types/heritage';
import { getMockHeritageById } from '@/mocks/heritage';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || true;

export const useHeritageQuery = (id: string) => {
	return useQuery({
		queryKey: ['heritage', id],
		queryFn: async (): Promise<HeritageObject> => {
			if (USE_MOCK) {
				await new Promise((r) => setTimeout(r, 500));
				const obj = getMockHeritageById(id);
				if (!obj) throw new Error('Heritage object not found');
				return obj;
			}
			const resp = await $axios.get<ApiResponse<HeritageObject>>(
				`/api/v1/heritage/${id}/`
			);
			return resp.data.data;
		},
		enabled: !!id,
		staleTime: 1000 * 60 * 10,
	});
};
