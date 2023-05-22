import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
  name: "stores",
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

export const { setData, setLoading, setError } = storeSlice.actions;

export const storesReducer = storeSlice.reducer;
