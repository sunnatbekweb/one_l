import type { CargoType } from "@/shared/types/apiType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCargoTypes } from "../api/cargoType";

interface cargoTypeSlice {
  type: CargoType[];
  isloading: boolean;
  error: string | null;
}

const initialState: cargoTypeSlice = {
  type: [],
  isloading: false,
  error: null,
};

export const fetchCargoType = createAsyncThunk(
  "cargoType/fetchCargoType",
  getCargoTypes
);

const cargoTypeSlice = createSlice({
  name: "cargoType",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCargoType.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(fetchCargoType.fulfilled, (state, action) => {
        state.isloading = false;
        state.type = action.payload;
      })
      .addCase(fetchCargoType.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message || "Failed to fetch types";
      });
  },
});

export const typeReducer = cargoTypeSlice.reducer;
