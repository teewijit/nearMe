import { createSlice } from "@reduxjs/toolkit";

const typeSlice = createSlice({
  name: "types",
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

export const { setData, setLoading, setError } = typeSlice.actions;

export const typesReducer = typeSlice.reducer;
