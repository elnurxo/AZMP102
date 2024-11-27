const ClearAllTodos = ({ setTodos }) => {
  return (
    <button
      onClick={() => {
        setTodos([]);
      }}
    >
      clear all
    </button>
  );
};

export default ClearAllTodos;
