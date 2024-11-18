import { BASE_URL } from "./constants.js";
import axios from "axios";

// Axios instance customization
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: { "X-Custom-Header": "code academy" },
});

export default instance;
