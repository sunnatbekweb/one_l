import { oneLogApi } from "@/app/api";
import type { Cargo } from "@/shared/types/cargo";

export const notificationApi = oneLogApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Cargo[], void>({
      query: () => `/user/notifications/${localStorage.getItem("user_id")}/`,
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
