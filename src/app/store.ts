import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "@/features/filters/model/filterSlice";
import { oneLogApi } from "./api";
import { countriesApi } from "./countriesApi";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    [oneLogApi.reducerPath]: oneLogApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      oneLogApi.middleware,
      countriesApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
