import type { cargoState } from "@/shared/types/sliceState";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBookmarks } from "../api/bookmarkApi";

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

export const fetchBookmarks = createAsyncThunk(
  "bookmarks/fetchBookmarks",
  getBookmarks
);

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.isloading = false;
        state.cargos = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message || "Failed to fetch bookmarks";
      });
  },
});

export const bookmarkReducer = bookmarkSlice.reducer;
