import { useReducer, useRef } from "react";

const initialTodos = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return { todos: [...state.todos, action.payload] };
    case "delete":
      return {
        todos: state.todos.filter((x) => {
          return x.id != action.payload;
        }),
      };
    case "clear":
      return { todos: [] };
    case "search":
      break;
    default:
      console.log("invalid action!");
      break;
  }
};

const Todo = () => {
  const [state, dispatch] = useReducer(reducer, initialTodos);
  const inputRef = useRef("");
  return (
    <>
      <h1>Todo App with useReducer</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({
            type: "add",
            payload: {
              id: Date.now() + Math.random(),
              title: inputRef.current.value,
            },
          });
          inputRef.current.value = "";
        }}
      >
        <input ref={inputRef} type="text" placeholder="new todo" />
        <button type="submit">add</button>
      </form>
      <hr />
      <h3>todos</h3>
      {state.todos &&
        state.todos.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.title}
              <button
                onClick={() => {
                  dispatch({
                    type: "delete",
                    payload: todo.id,
                  });
                }}
              >
                delete
              </button>
            </li>
          );
        })}
    </>
  );
};

export default Todo;
