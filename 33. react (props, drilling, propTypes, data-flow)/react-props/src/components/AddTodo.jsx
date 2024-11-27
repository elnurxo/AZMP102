import { useState } from "react";
import { TodoItem } from "../classes/TodoItem.js";

const AddTodo = ({ setTodos }) => {
  const [title, setTitle] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (title.trim().length === 0) {
          window.alert("input is empty!");
        } else {
          const newTodo = new TodoItem(title);
          setTitle("");
          setTodos((currentState) => {
            return [...currentState, newTodo];
          });
        }
      }}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="todo title"
      />
      <button type="submit">add</button>
    </form>
  );
};

export default AddTodo;
