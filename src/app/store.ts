import { configureStore } from "@reduxjs/toolkit";
import { cargoReducer } from "@/widgets/Cargo/model/cargoSlice";

export const store = configureStore({
  reducer: {
    cargos: cargoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
