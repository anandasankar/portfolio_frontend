import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/apiAxios";

// Send Request Message (Contact Form)
export const sendRequestMessage = createAsyncThunk(
  "requestMessage/sendRequestMessage",
  async (formData, thunkApi) => {
    try {
      const res = await API.post("/request-messages", formData);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  },
);
