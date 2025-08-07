import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postBookmarkCargo } from "../api/postBookmarkApi";
import { fetchBookmarks } from "./getBookmarkSlice";

interface FavouriteState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: FavouriteState = {
  isLoading: false,
  error: null,
  success: false,
};

export const sendBookmarkCargo = createAsyncThunk(
  "favourite/sendBookmarkCargo",
  async (payload: { user: number; cargo: number }, { dispatch }) => {
    await postBookmarkCargo(payload);
    dispatch(fetchBookmarks());
  }
);

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendBookmarkCargo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendBookmarkCargo.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(sendBookmarkCargo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to send favourite cargo";
      });
  },
});

export const createBookmarkReducer = bookmarkSlice.reducer;
