import AddTodo from "./AddTodo";
import SearchTodo from "./SearchTodo";
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import { useState } from "react";
import ClearAllTodos from "./ClearAllTodos";

const Todo = () => {
  const [todos, setTodos] = useState([]);

  return (
    <>
      <h1>Todo App with React</h1>
      <AddTodo setTodos={setTodos} />
      <hr />
      <SearchTodo />
      <hr />
      <h4>todo items</h4>
      <TodoList>
        {todos &&
          todos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />;
          })}
      </TodoList>

      <ClearAllTodos setTodos={setTodos}/>
    </>
  );
};

export default Todo;
