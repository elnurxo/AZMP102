import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../services/redux/slices/todoSlice";

const SearchTodo = () => {
  const { searchQuery } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
    />
  );
};

export default SearchTodo;
