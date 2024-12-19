import axios from "axios";
import { API_BASE_URL } from "../../constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

//interceptor - axios

export const makeRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    if (error.response) {
      alert(`Error: ${error.response.data.message || "Something went wrong."}`);
    } else if (error.request) {
      alert("No response from server. Please try again.");
    } else {
      alert("Request setup failed.");
    }
    throw error;
  }
};

export default api;
