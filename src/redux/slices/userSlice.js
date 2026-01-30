import { createSlice } from "@reduxjs/toolkit";
import { getAllUser, getUserById } from "../actions/userAction";

const userSlice = createSlice({
  name: "user",

  initialState: {
    loading: false,
    users: [],
    user: null,
    error: null,
  },

  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    /* ================= GET ALL USERS ================= */
    builder
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data.users;
        state.error = null;
      })

      .addCase(getAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* ================= GET USER BY ID ================= */

    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.error = null;
      })

      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
