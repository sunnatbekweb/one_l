import { configureStore } from "@reduxjs/toolkit";
import { cargoReducer } from "@/widgets/Cargo/model/cargoSlice";
import { bookmarkReducer } from "@/widgets/BookmarkList/model/getBookmarkSlice";
import { statisticsReducer } from "@/widgets/SearchInfo/model/statisticsSlice";
import { createBookmarkReducer } from "@/widgets/BookmarkList/model/postBookmarkSlice";
import { typeReducer } from "@/entities/SearchForm/model/cargoTypeSlice";
import { filterReducer } from "@/features/filters/model/filterSlice";
import { oneCargoReducer } from "@/widgets/Cargo/model/oneCargoSlice";
import { countriesReducer } from "@/shared/model/restCountriesSlice.ts";
import { transportTypeReducer } from "@/entities/SearchForm/model/transportTypeSlice";

export const store = configureStore({
  reducer: {
    cargos: cargoReducer,
    cargo: oneCargoReducer,
    bookmarks: bookmarkReducer,
    statistics: statisticsReducer,
    bookmark: createBookmarkReducer,
    types: typeReducer,
    filters: filterReducer,
    counties: countriesReducer,
    transportType: transportTypeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
