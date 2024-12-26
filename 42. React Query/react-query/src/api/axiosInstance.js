import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//interceptors - request
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token or other custom logic here
    return config;
  },
  (error) => Promise.reject(error)
);

//interceptors - response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default axiosInstance;
