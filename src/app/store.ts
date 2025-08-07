import { configureStore } from "@reduxjs/toolkit";
import { cargoReducer } from "@/widgets/Cargo/model/cargoSlice";
import { bookmarkReducer } from "@/widgets/BookmarkList/model/bookmarkSlice";

export const store = configureStore({
  reducer: {
    cargos: cargoReducer,
    bookmarks: bookmarkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
