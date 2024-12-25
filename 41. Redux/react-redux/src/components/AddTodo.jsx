import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../services/redux/slices/todoSlice";

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo({ title: newTodo }));
      setNewTodo("");
    } else {
      window.alert("input cannot be empty!");
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="Add a new todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
    </>
  );
};

export default AddTodo;
