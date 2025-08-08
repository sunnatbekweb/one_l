import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { patchCargoActions, type UpdateData } from "../api/cargoPatchApi";

interface UpdateCargoState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

const initialState: UpdateCargoState = {
  isLoading: false,
  isSuccess: false,
  error: null,
};

export const updateCargoActions = createAsyncThunk<
  any, // или тип возвращаемого объекта
  { cargoId: number; data: UpdateData }, // тип передаваемого payload
  { rejectValue: string }
>("cargo/updateParams", async ({ cargoId, data }, { rejectWithValue }) => {
  try {
    return await patchCargoActions(cargoId, data);
  } catch (error: any) {
    return rejectWithValue("Ошибка обновления параметра");
  }
});

const updateCargoSlice = createSlice({
  name: "updateCargo",
  initialState,
  reducers: {
    resetUpdateState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCargoActions.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(updateCargoActions.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.error = null;
      })
      .addCase(updateCargoActions.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload || "Неизвестная ошибка";
      });
  },
});

export const { resetUpdateState } = updateCargoSlice.actions;
export default updateCargoSlice.reducer;
