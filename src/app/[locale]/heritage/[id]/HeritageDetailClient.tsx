'use client';
import { useQuery } from '@tanstack/react-query';
import type { HeritageObject } from '@/types/heritage';
import { getMockHeritageById } from '@/mocks/heritage';
import { HeritageDetail } from '@/components/Heritage/HeritageDetail';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';
import { useLocale } from '@/i18n';

interface Props {
	initialData: HeritageObject;
}

// Client wrapper: uses SSR initial data, can revalidate from backend later
export const HeritageDetailClient = ({ initialData }: Props) => {
	const { t } = useLocale();

	const { data, isLoading } = useQuery({
		queryKey: ['heritage', initialData.id],
		queryFn: async () => {
			// Replace with real API call when backend is ready:
			// const resp = await $axios.get<ApiResponse<HeritageObject>>(`/api/v1/heritage/${initialData.id}/`);
			// return resp.data.data;
			await new Promise((r) => setTimeout(r, 0));
			return getMockHeritageById(initialData.id) ?? initialData;
		},
		initialData: initialData,
		staleTime: 1000 * 60 * 10,
	});

	if (isLoading && !data) return <LoadingSpinner label={t.heritage.loading} />;

	return <HeritageDetail object={data ?? initialData} />;
};
