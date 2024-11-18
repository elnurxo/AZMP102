import "../../node_modules/bulma/css/bulma.css";
import { renderSingerCards } from "./helpers/index.js";
import { endpoints } from "./services/API/constants.js";
import { getData } from "./services/API/request.js";
const singersWrapper = document.querySelector(".singers-wrapper");

document.addEventListener("DOMContentLoaded", async function () {
  singersWrapper.innerHTML = `<span class="loader"></span>`;
  const { data, error, loading } = await getData(endpoints.singers);
  if (error) console.log(error);
  if (!loading) {
    singersWrapper.innerHTML = ``;
  }
  if (data) {
    renderSingerCards(data);
  }
});
