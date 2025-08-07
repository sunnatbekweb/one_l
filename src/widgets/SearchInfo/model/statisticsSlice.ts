import type { statisticsState } from "@/shared/types/sliceState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStatistics } from "../api/getStatisticsApi";

const initialState: statisticsState = {
  statistics: {
    users: 0,
    cargos: 0,
  },
  isloading: false,
  error: null,
};

export const fetchStatistics = createAsyncThunk(
  "statistics/fetchStatistics",
  getStatistics
);

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.isloading = false;
        state.statistics = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message || "Failed to fetch statistics";
      });
  },
});

export const statisticsReducer = statisticsSlice.reducer;
