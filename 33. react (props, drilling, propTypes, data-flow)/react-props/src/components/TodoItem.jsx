/* eslint-disable react/prop-types */
import DeleteTodo from "./DeleteTodo";

const TodoItem = ({ todo, setTodos }) => {
  return (
    <li>
      <span>{todo.title}</span>
      <DeleteTodo id={todo.id} setTodos={setTodos} />
    </li>
  );
};

export default TodoItem;
