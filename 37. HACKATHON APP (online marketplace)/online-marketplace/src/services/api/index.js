import axios from "axios";
import { BASE_URL } from "../../constants/api.js";

// Create an axios instance with baseURL and some default headers
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Utility function to make API requests
const makeRequest = async (method, endpoint, data = null) => {
  try {
    const response = await axiosInstance({
      method: method,
      url: endpoint,
      data: data, // Pass data for POST, PUT requests
    });
    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export default makeRequest;
