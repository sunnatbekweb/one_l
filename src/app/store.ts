import { configureStore } from "@reduxjs/toolkit";
import { cargoReducer } from "@/widgets/Cargo/model/cargoSlice";
import { bookmarkReducer } from "@/widgets/BookmarkList/model/bookmarkSlice";
import { statisticsReducer } from "@/widgets/SearchInfo/model/statisticsSlice";

export const store = configureStore({
  reducer: {
    cargos: cargoReducer,
    bookmarks: bookmarkReducer,
    statistics: statisticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
