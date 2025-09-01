import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "@/features/filters/model/filterSlice";
import { countriesReducer } from "@/shared/model/restCountriesSlice.ts";
import { oneLogApi } from "./api";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    counties: countriesReducer,
    [oneLogApi.reducerPath]: oneLogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(oneLogApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
