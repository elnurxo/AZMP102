import { useGetAnimalsQuery } from "../features/animalApiSlice";

const Navbar = () => {
  const { data: animals } = useGetAnimalsQuery();
  // const { todos } = useSelector((state) => state.todos);
  // const doneTodoCount = useMemo(() => {
  //   return todos.filter((x) => x.completed).length;
  // }, [todos]);
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
        <li>Users Count: {animals && animals?.length}</li>
      </ul>
      <hr />
    </>
  );
};

export default Navbar;
