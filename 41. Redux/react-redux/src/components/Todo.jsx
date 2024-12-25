import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodo,
  toggleCompleted,
  editTodo,
  setFilter,
  sortByDate,
} from "../services/redux/slices/todoSlice.js";
import { useMemo, useState } from "react";
import AddTodo from "./AddTodo.jsx";
import SearchTodo from "./SearchTodo.jsx";

const Todo = () => {
  const { searchQuery, todos, filter } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo) =>
        todo.title
          .toLowerCase()
          .trim()
          .includes(searchQuery.trim().toLowerCase())
      )
      .filter((todo) => {
        if (filter === "done") return todo.completed;
        if (filter === "incomplete") return !todo.completed;
        return true;
      });
  }, [todos, filter, searchQuery]);

  const handleEditTodo = () => {
    if (editTitle.trim()) {
      dispatch(editTodo({ id: editId, title: editTitle }));
      setEditId(null);
      setEditTitle("");
    } else {
      window.alert("input cannot be empty!");
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <SearchTodo />
      <select
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
      >
        <option value="all">All</option>
        <option value="done">Done</option>
        <option value="incomplete">Incomplete</option>
      </select>
      <button onClick={() => dispatch(sortByDate())}>Sort by Date</button>
      <AddTodo />
      <hr />
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={handleEditTodo}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => dispatch(toggleCompleted(todo.id))}
                >
                  {todo.title} | {todo.createdAt}
                </span>
                <button
                  onClick={() => {
                    if (window.confirm("are you sure to delete?")) {
                      dispatch(deleteTodo(todo.id));
                    }
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setEditId(todo.id);
                    setEditTitle(todo.title);
                  }}
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
