import { oneLogApi } from "@/app/api";
import Cookies from "js-cookie";

type Route = {
  user: string;
  origin: string;
  destination: string;
};

export const routesApi = oneLogApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoutes: builder.query<Route[], void>({
      query: () => `/user/routes/${Number(Cookies.get("user_id"))}/`,
      providesTags: ["Routes"],
    }),
    addRoute: builder.mutation<
      unknown,
      { user: number; origin: string; destination: string }
    >({
      query: (data) => ({
        body: data,
        url: `/user/save-route/`,
        method: "POST",
      }),
      invalidatesTags: ["Routes"],
    }),
    deleteRoute: builder.mutation<
      unknown,
      { user: number; origin: string; destination: string }
    >({
      query: (data) => ({
        body: data,
        url: `/user/delete-route/`,
        method: "POST",
      }),
      invalidatesTags: ["Routes"],
    }),
  }),
});

export const {
  useGetRoutesQuery,
  useAddRouteMutation,
  useDeleteRouteMutation,
} = routesApi;
