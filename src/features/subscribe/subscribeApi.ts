import { oneLogApi } from "@/app/api";

export const subscribeApi = oneLogApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscribe: builder.query<{ success: boolean }, void>({
      query: () => `/user/finder/${localStorage.getItem("user_id")}/`,
    }),
  }),
});

export const { useGetSubscribeQuery } = subscribeApi;
