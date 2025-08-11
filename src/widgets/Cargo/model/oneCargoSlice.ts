import type { Cargo } from "@/shared/types/cargo";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCargoById } from "../api/cargoApi";

interface cargoState {
  cargo: Cargo | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: cargoState = {
  cargo: null,
  isLoading: false,
  error: null,
};

export const fetchCargo = createAsyncThunk(
  "cargo/fetchCargo",
  async (id: number) => await getCargoById(id)
);

const cargoSlice = createSlice({
  name: "cargo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCargo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCargo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cargo = action.payload;
      })
      .addCase(fetchCargo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch cargo";
      });
  },
});

export const oneCargoReducer = cargoSlice.reducer;
