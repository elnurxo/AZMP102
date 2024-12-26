import { useProducts, useDeleteProduct } from "../hooks/useProducts";

const Prod = () => {
  // Fetch all products
  const { data: products, isLoading, error } = useProducts();

  // Mutation for deleting a product
  const { mutate: deleteProduct } = useDeleteProduct();

  // Handle delete button click
  const handleDelete = (id) => {
    deleteProduct(id, {
      onSuccess: () => {
        alert(`Product with ID ${id} deleted successfully!`);
      },
      onError: (err) => {
        alert(`Failed to delete product: ${err.message}`);
      },
    });
  };

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>
              {product.name} - ${product.price}
            </span>
            <button
              onClick={() => handleDelete(product.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prod;
