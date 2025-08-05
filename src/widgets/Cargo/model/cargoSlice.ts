import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCargos, type Cargos } from "../api/cargoApi";

interface cargoState {
  cargos: Cargos;
  isloading: boolean;
  error: string | null;
}

const initialState: cargoState = {
  cargos: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  isloading: false,
  error: null,
};

export const fetchCargos = createAsyncThunk("cargos/fetchCargos", getCargos);

const cargosSlice = createSlice({
  name: "cargos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCargos.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(fetchCargos.fulfilled, (state, action) => {
        state.isloading = false;
        state.cargos = action.payload;
      })
      .addCase(fetchCargos.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message || "Failed to fetch cargos";
      });
  },
});

export const cargoReducer = cargosSlice.reducer;
