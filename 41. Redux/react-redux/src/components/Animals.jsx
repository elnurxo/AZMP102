import {
  useGetAnimalsQuery,
  useDeleteAnimalMutation,
} from "../features/animalApiSlice";

const Animals = () => {
  const { data: animals, isLoading, isError } = useGetAnimalsQuery();
  const [deleteAnimal, { isLoading: isDeleting }] = useDeleteAnimalMutation();

  const handleDelete = async (id) => {
    try {
      const response = await deleteAnimal(id).unwrap(); // Unwrap to handle success or errors explicitly
      console.log("response: ", response);
    } catch (error) {
      console.error("Failed to delete animal:", error);
    }
  };

  if (isLoading) return <h1>Animals loading...</h1>;
  if (isError) return <h1 style={{ color: "red" }}>Failed to fetch animals</h1>;
  return (
    <>
      <h1>Redux Animals State</h1>
      <hr />
      {animals &&
        animals.map((animal) => {
          return (
            <li key={animal.id}>
              {animal.name}, <i>{animal.age}</i>
              <button
                onClick={() => {
                  if (window.confirm("delete?")) {
                    handleDelete(animal.id);
                  }
                }}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </li>
          );
        })}
    </>
  );
};

export default Animals;
