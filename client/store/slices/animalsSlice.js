import { createSlice } from "@reduxjs/toolkit";

const animalsSlice = createSlice({
  name: "view_animal_card",
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

export const { setData, setLoading, setError } = animalsSlice.actions;

export const animalReducer = animalsSlice.reducer;
