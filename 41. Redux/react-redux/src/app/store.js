import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice.js";
import todoReducer from "../features/todoSlice.js";
import { animalsApiSlice } from "../features/animalApiSlice.js";

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todoReducer,
  [animalsApiSlice.reducerPath]: animalsApiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(animalsApiSlice.middleware), //caching, re-fetching
});
