import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/apiAxios";

// Get All Users
export const getAllUser = createAsyncThunk(
  "user/getAllUser",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/user");
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message);
    }
  },
);

// Get User By Id
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id, thunkApi) => {
    try {
      const res = await API.get(`/user/${id}`);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message);
    }
  },
);

