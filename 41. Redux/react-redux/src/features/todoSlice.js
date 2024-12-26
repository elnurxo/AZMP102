import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const getTodosFromLocal = () => {
  const localTodos = localStorage.getItem("todos");
  console.log("local todos: ", localTodos);
  if (localTodos) {
    return JSON.parse(localTodos);
  } else {
    localStorage.setItem("todos", JSON.stringify([]));
    return [];
  }
};

const initialState = {
  todos: getTodosFromLocal(),
  searchQuery: "",
  filter: "all", // 'all', 'done', 'incomplete'
};

const todoSlice = createSlice({
  initialState: initialState,
  name: "todos",
  reducers: {
    addTodo: (state, action) => {
      const { title } = action.payload;
      const newTodo = {
        id: nanoid(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.todos = [...state.todos, newTodo];
      const localTodos = JSON.parse(localStorage.getItem("todos"));
      localStorage.setItem("todos", JSON.stringify([...localTodos, newTodo]));
    },
    deleteTodo: (state, action) => {
      state.todos = [
        ...state.todos.filter((todo) => todo.id !== action.payload),
      ];
    },
    toggleCompleted: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
      state.todos = [...state.todos];
    },
    editTodo: (state, action) => {
      const { id, title } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) todo.title = title;
    },
    setSearchQuery: (state, action) => {
      console.log("TEST");
      state.searchQuery = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    sortByDate: (state) => {
      state.todos = [
        ...state.todos.sort((a, b) => new Date(a.date) - new Date(b.date)),
      ];
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleCompleted,
  editTodo,
  setSearchQuery,
  setFilter,
  sortByDate,
} = todoSlice.actions;
export default todoSlice.reducer;
