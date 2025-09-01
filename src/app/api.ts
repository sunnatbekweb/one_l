import i18n from "@/shared/config/i18n";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const oneLogApi = createApi({
  reducerPath: "oneLogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/${
      i18n.language === "ru" ? i18n.language : i18n.language.slice(0, 2)
    }/api/v1`,
  }),
  tagTypes: ["Cargos", "Bookmarks", "Routes"],
  endpoints: () => ({}),
});
