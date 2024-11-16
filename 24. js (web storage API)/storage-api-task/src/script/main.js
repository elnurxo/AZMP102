import { books } from "./data.js";
import { renderBooksList, renderNavbar } from "./helpers.js";

document.addEventListener("DOMContentLoaded", function () {
  //create local storage if not exist
  if (!localStorage.getItem("favorites")) {
    localStorage.setItem("favorites", JSON.stringify([]));
  }
  renderBooksList(books);
  renderNavbar();
});
