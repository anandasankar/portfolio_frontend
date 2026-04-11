import { createSlice } from "@reduxjs/toolkit";
import { sendRequestMessage } from "../actions/requestMessageAction";

const requestMessageSlice = createSlice({
  name: "requestMessage",

  initialState: {
    loading: false,
    success: false,
    error: null,
  },

  reducers: {
    resetRequestMessage: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    /* ================= SEND REQUEST MESSAGE ================= */
    builder
      .addCase(sendRequestMessage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(sendRequestMessage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })

      .addCase(sendRequestMessage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetRequestMessage } = requestMessageSlice.actions;

export default requestMessageSlice.reducer;
