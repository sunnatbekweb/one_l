import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  page: number;
  from_country: string;
  to_country: string;
  origin: string;
  destination: string;
  car_type: string;
}

const initialState: FilterState = {
  page: 1,
  from_country: "",
  to_country: "",
  origin: "",
  destination: "",
  car_type: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Omit<FilterState, "page">>) {
      return { ...state, ...action.payload, page: 1 };
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setFilters, resetFilters, setPage } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
