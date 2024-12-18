import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
});

export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const fetchProductDetails = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const loginAdmin = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};
