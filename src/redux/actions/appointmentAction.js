import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/apiAxios";

// Get Appointment Details By UserId
export const getUserAppointments = createAsyncThunk(
  "/user/getUserAppointmentsByUserId",
  async (id, thunkApi) => {
    try {
      const res = await API.get(`/user/${id}/appointment`);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message);
    }
  },
);

// Update Appointment Status
export const updateAppointmentStatus = createAsyncThunk(
  "appointment/updateStatus",

  async ({ appointmentId, status }, thunkApi) => {
    try {
      const res = await API.patch(`/appointment/${appointmentId}/status`, {
        status,
      });

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to update status",
      );
    }
  },
);
