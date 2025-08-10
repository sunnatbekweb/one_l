import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCountries } from "../api/restCountries";

type countriesState = {
  countries: [];
  isloading: boolean;
  error: string | null;
};

const initialState: countriesState = {
  countries: [],
  isloading: false,
  error: null,
};

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => await getCountries()
);

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.isloading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message || "Failed to fetch countries";
      });
  },
});

export const countriesReducer = countriesSlice.reducer;
