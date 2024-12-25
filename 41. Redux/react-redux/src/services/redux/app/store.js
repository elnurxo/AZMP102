import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice.js";
import todoReducer from "../slices/todoSlice.js";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
  },
});
