import { oneLogApi } from "@/app/api";

const statisticsApi = oneLogApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query<{ users: number; cargos: number }, void>({
      query: () => `/user/statistics/`,
    }),
  }),
});

export const { useGetStatisticsQuery } = statisticsApi;
