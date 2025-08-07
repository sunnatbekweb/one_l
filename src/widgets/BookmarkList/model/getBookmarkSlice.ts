import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { bookmarkState } from "@/shared/types/sliceState";
import { getBookmarks } from "../api/getBookmarkApi";

const initialState: bookmarkState = {
  bookmarks: [],
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
        state.bookmarks = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message || "Failed to fetch bookmarks";
      });
  },
});

export const bookmarkReducer = bookmarkSlice.reducer;
