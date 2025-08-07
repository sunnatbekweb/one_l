import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteBookmark } from "../api/deleteBookmarkApi";
import { fetchBookmarks } from "./getBookmarkSlice";

interface DeleteBookmarkState {
  isLoading: boolean;
  error: string | null;
}

const initialState: DeleteBookmarkState = {
  isLoading: false,
  error: null,
};

export const removeBookmarkCargo = createAsyncThunk(
  "favourite/removeBookmarkCargo",
  async (id: number, { dispatch }) => {
    await deleteBookmark(id);
    dispatch(fetchBookmarks());
  }
);

const deleteBookmarkSlice = createSlice({
  name: "deleteBookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(removeBookmarkCargo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeBookmarkCargo.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(removeBookmarkCargo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to remove bookmark";
      });
  },
});

export const deleteBookmarkReducer = deleteBookmarkSlice.reducer;
