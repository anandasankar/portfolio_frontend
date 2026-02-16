import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/apiAxios";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkApi) => {
    try {
      const res = await API.post("/user/login", {
        email,
        password,
      });

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);

export const getUser = createAsyncThunk("auth/me", async (_, thunkApi) => {
  try {
    const res = await API.get("/me/user");

    return res.data.data;
  } catch (error) {
    // Get real error message from backend
    const message =
      error.response?.data?.message || error.message || "Authentication failed";

    return thunkApi.rejectWithValue(message);
  }
});

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      await API.post("/user/logout");
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Logout failed";

      return thunkApi.rejectWithValue(message);
    }
  },
);
