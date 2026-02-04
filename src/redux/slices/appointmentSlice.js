import { createSlice } from "@reduxjs/toolkit";
import {
  getUserAppointments,
  updateAppointmentStatus,
} from "../actions/appointmentAction";

const appointmentSlice = createSlice({
  name: "appointment",

  initialState: {
    loading: false,
    updating: false,
    appointments: [],
    totalCount: 0,
    error: null,
  },

  reducers: {
    resetAppointment: (state) => {
      state.loading = false;
      state.updating = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    /* ========== GET USER APPOINTMENTS ========== */

    builder
      .addCase(getUserAppointments.pending, (state) => {
        state.loading = true;
      })

      .addCase(getUserAppointments.fulfilled, (state, action) => {
        state.loading = false;

        state.appointments = action.payload.data.userAppointment;

        state.totalCount = action.payload.data.totalCount;

        state.error = null;
      })

      .addCase(getUserAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* ========== UPDATE APPOINTMENT STATUS ========== */

    builder
      .addCase(updateAppointmentStatus.pending, (state) => {
        state.updating = true;
        state.successMessage = null;
      })

      .addCase(updateAppointmentStatus.fulfilled, (state) => {
        state.updating = false;
        state.error = null;
      })

      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export const { resetAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;
