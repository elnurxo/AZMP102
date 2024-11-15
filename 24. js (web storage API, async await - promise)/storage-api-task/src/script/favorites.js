import { renderBooksList } from "./helpers.js";

document.addEventListener("DOMContentLoaded", function () {
  //create local storage if not exist
  if (!localStorage.getItem("favorites")) {
    localStorage.setItem("favorites", JSON.stringify([]));
  } else {
    const localBooks = JSON.parse(window.localStorage.getItem("favorites"));
    renderBooksList(localBooks);
  }
});
