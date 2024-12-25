import { useMemo } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { todos } = useSelector((state) => state.todos);
  const doneTodoCount = useMemo(() => {
    return todos.filter((x) => x.completed).length;
  }, [todos]);
  return (
    <>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
        <li>Completed Todos: {doneTodoCount}</li>
      </ul>
      <hr />
    </>
  );
};

export default Navbar;
