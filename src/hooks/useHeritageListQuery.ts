import { useQuery } from "@tanstack/react-query";
import { $axios } from "@/lib/axios";
import type { HeritageListItem, ApiResponse } from "@/types/heritage";
import { MOCK_HERITAGE_LIST } from "@/mocks/heritage";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true" || true;

export const useHeritageListQuery = () => {
  return useQuery({
    queryKey: ["heritage", "list"],
    queryFn: async (): Promise<HeritageListItem[]> => {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 400));
        return MOCK_HERITAGE_LIST;
      }
      const resp = await $axios.get<ApiResponse<HeritageListItem[]>>("/api/v1/heritage/");
      return resp.data.data;
    },
    staleTime: 1000 * 60 * 10,
  });
};
