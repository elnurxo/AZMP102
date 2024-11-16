import request_controller from "./requests.js";
import { API_BASE_URL, endpoints } from "./constants.js";

document.addEventListener("DOMContentLoaded", async () => {
  const result = await request_controller.getAll(
    API_BASE_URL + endpoints.products
  );
  const oneData = await request_controller.getOne(
    API_BASE_URL + endpoints.products,
    2
  );
});
    