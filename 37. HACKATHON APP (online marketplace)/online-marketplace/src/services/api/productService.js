import makeRequest from "./index.js";
import { ENDPOINTS } from "../../constants/api.js";

// Get all products
const getAllProducts = async () => {
  try {
    const products = await makeRequest("GET", ENDPOINTS.products);
    return products; // Return the list of products
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products. Please try again later.");
  }
};

// Get product by ID
const getProductByID = async (productId) => {
  try {
    const product = await makeRequest(
      "GET",
      `${ENDPOINTS.products}/${productId}`
    );
    return product; // Return the product data by ID
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw new Error(
      `Failed to fetch product with ID ${productId}. Please try again later.`
    );
  }
};

// Register a new product (POST request)
const postProduct = async (productData) => {
  try {
    const newProduct = await makeRequest(
      "POST",
      ENDPOINTS.products,
      productData
    );
    return newProduct; // Return the newly created product data
  } catch (error) {
    console.error("Error registering product:", error);
    throw new Error("Failed to register product. Please try again later.");
  }
};

// Update product by ID
const updateProductByID = async (productId, productData) => {
  try {
    const updatedProduct = await makeRequest(
      "PUT",
      `${ENDPOINTS.products}/${productId}`,
      productData
    );
    return updatedProduct; // Return the updated product data
  } catch (error) {
    console.error(`Error updating product with ID ${productId}:`, error);
    throw new Error(
      `Failed to update product with ID ${productId}. Please try again later.`
    );
  }
};

// Delete product by ID
const deleteProduct = async (productId) => {
  try {
    await makeRequest("DELETE", `${ENDPOINTS.products}/${productId}`);
    return {
      message: `Product with ID ${productId} has been deleted successfully.`,
    }; // Return success message
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error);
    throw new Error(
      `Failed to delete product with ID ${productId}. Please try again later.`
    );
  }
};

const productController = {
  getAllProducts,
  getProductByID,
  postProduct,
  updateProductByID,
  deleteProduct,
};

export default productController;
