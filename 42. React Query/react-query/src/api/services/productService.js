import axiosInstance from "../../api/axiosInstance";
import API_ENDPOINTS from "../../api/endpoints";

// Get all products
export const fetchAllProducts = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS);
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

// Get a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PRODUCTS,
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating a new product:", error);
    throw error;
  }
};

// Update a product (PUT)
export const updateProduct = async (id, productData) => {
  try {
    const response = await axiosInstance.put(
      `${API_ENDPOINTS.PRODUCTS}/${id}`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

// Partially update a product (PATCH)
export const patchProduct = async (id, productData) => {
  try {
    const response = await axiosInstance.patch(
      `${API_ENDPOINTS.PRODUCTS}/${id}`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error(`Error patching product with ID ${id}:`, error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `${API_ENDPOINTS.PRODUCTS}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};
