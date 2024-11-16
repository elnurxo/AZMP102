import { API_BASE_URL, endpoints } from "./constants.js";
const id = new URLSearchParams(window.location.search).get("id");

fetch(API_BASE_URL + endpoints.categories + `/${id}`, {
  method: "GET",
})
  .then((resp) => resp.json())
  .then((category) => {
    console.log(category);
  });
