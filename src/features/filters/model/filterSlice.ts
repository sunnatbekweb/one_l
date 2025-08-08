import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  origin: string;
  destination: string;
  type: string;
}

const initialState: FilterState = {
  origin: "",
  destination: "",
  type: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<FilterState>) {
      return { ...state, ...action.payload };
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
