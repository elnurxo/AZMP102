/* eslint-disable react/prop-types */
const DeleteTodo = ({ id, setTodos }) => {
  return (
    <button
      onClick={() => {
        if (window.confirm("are you sure to delete?")) {
          setTodos((currentTodos) => {
            return [...currentTodos.filter((x) => x.id !== id)];
          });
        }
      }}
    >
      delete
    </button>
  );
};

export default DeleteTodo;
