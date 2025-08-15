import type { CargoType } from "@/shared/types/apiType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransportType } from "../api/transportType";

interface transportTypeSlice {
  car_type: CargoType[];
  isloading: boolean;
  error: string | null;
}

const initialState: transportTypeSlice = {
  car_type: [],
  isloading: false,
  error: null,
};

export const fetchTransportType = createAsyncThunk(
  "transportType/fetchTransportType",
  getTransportType
);

const transportTypeSlice = createSlice({
  name: "transportType",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTransportType.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(fetchTransportType.fulfilled, (state, action) => {
        state.isloading = false;
        state.car_type = action.payload;
      })
      .addCase(fetchTransportType.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message || "Failed to fetch transport type";
      });
  },
});

export const transportTypeReducer = transportTypeSlice.reducer;
