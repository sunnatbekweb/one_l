import { configureStore } from "@reduxjs/toolkit";
import { statisticsReducer } from "@/widgets/SearchInfo/model/statisticsSlice";
import { typeReducer } from "@/entities/SearchForm/model/cargoTypeSlice";
import { filterReducer } from "@/features/filters/model/filterSlice";
import { countriesReducer } from "@/shared/model/restCountriesSlice.ts";
import { transportTypeReducer } from "@/entities/SearchForm/model/transportTypeSlice";
import { notificationReducer } from "@/entities/NotificationList/model/notificationSlice";
import { oneLogApi } from "./api";

export const store = configureStore({
  reducer: {
    statistics: statisticsReducer,
    types: typeReducer,
    filters: filterReducer,
    counties: countriesReducer,
    transportType: transportTypeReducer,
    notifications: notificationReducer,
    [oneLogApi.reducerPath]: oneLogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(oneLogApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
