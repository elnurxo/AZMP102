import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter", // The name of the slice.
  initialState: { value: 0 }, // The initial state for the counter.
  reducers: {
    increment: (state) => {
      state.value += 1; // Increment the counter value.
    },
    decrement: (state) => {
      state.value -= 1; // Decrement the counter value.
    },
    reset: (state) => {
      state.value = 0; // Reset the counter value to 0.
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload; // Increment by a specified amount.
    },
  },
});

export const { increment, decrement, reset, incrementByAmount } =
  counterSlice.actions;

export default counterSlice.reducer;
