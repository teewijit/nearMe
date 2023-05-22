import { createSlice } from "@reduxjs/toolkit";

const appoinmentsSlice = createSlice({
  name: "view_appointment",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setData, setLoading, setError } = appoinmentsSlice.actions;

export const appointmentReducer = appoinmentsSlice.reducer;
