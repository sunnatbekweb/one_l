import type { Cargo } from "@/shared/types/cargo";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "../api/getNotificationsApi";

interface notificationState {
  notifications: Cargo[] | [];
  isloading: boolean;
  error: string | null;
}

const initialState: notificationState = {
  notifications: [],
  isloading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => await getNotifications()
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isloading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message || "Failed to fetch notifications";
      });
  },
});

export const notificationReducer = notificationSlice.reducer;
