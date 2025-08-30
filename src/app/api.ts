import i18n from "@/shared/config/i18n";
import type { Cargos } from "@/shared/types/apiType";
import type { CargoParams, UpdateData } from "@/shared/types/cargo";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const oneLogApi = createApi({
  reducerPath: "oneLogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/${
      i18n.language === "ru" ? i18n.language : i18n.language.slice(0, 2)
    }/api/v1`,
  }),
  tagTypes: ["Cargos"],
  endpoints: (builder) => ({
    getCargos: builder.query<Cargos, CargoParams>({
      query: (params) => {
        const query = new URLSearchParams();

        if (params.page) query.append("page", params.page.toString());
        if (params.car_type && params.car_type !== "all")
          query.append("car_type", params.car_type);
        if (params.from_country)
          query.append("from_country", params.from_country);
        if (params.to_country) query.append("to_country", params.to_country);
        if (params.origin) query.append("origin", params.origin);
        if (params.destination) query.append("destination", params.destination);
        if (params.created_at) query.append("created_at", params.created_at);
        if (params.date) query.append("date", params.date);
        if (params.weight) query.append("weight", params.weight);
        if (params.volume) query.append("volume", params.volume);

        return `/cargos/?${query.toString()}`;
      },
    }),

    getCargoById: builder.query<any, number>({
      query: (id) => `/cargo/${id}/`,
    }),

    patchCargoActions: builder.mutation<
      any,
      { cargoId: number; data: UpdateData }
    >({
      query: ({ cargoId, data }) => {
        const fields = Object.entries(data).filter(
          ([_, value]) => value !== undefined
        );

        if (fields.length !== 1) {
          throw new Error("Должен быть только один параметр для обновления");
        }

        const [field, value] = fields[0];

        return {
          url: `/cargo/${cargoId}/`,
          method: "PATCH",
          body: { [field]: value },
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["Cargos"],
    }),
  }),
});

export const {
  useLazyGetCargosQuery,
  useGetCargoByIdQuery,
  usePatchCargoActionsMutation,
} = oneLogApi;
