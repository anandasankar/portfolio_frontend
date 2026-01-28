import { createSlice } from "@reduxjs/toolkit";
import { login, getUser, logoutUser } from "../actions/authActions";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null,
    hasCheckedAuth: false,
  },

  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.hasCheckedAuth = true;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // GET USER (/me)
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        state.hasCheckedAuth = true;
      })

      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
        state.hasCheckedAuth = true;
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset, logout } = authSlice.actions;

export default authSlice.reducer;
