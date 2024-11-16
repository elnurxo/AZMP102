const booksRow = document.querySelector(".books-row");
const renderNavWrapper = document.querySelector(".render-user-navbar");
import { books, users } from "./data.js";
import Toastify from "toastify-js";

export function renderBooksList(books) {
  booksRow.innerHTML = "";
  const localFavorites = JSON.parse(window.localStorage.getItem("favorites"));

  books.forEach((book) => {
    const check = localFavorites.find((x) => x.id == book.id);
    booksRow.innerHTML += `     <div data-id="${
      book.id
    }" class="col-3 col-lg-3 col-md-6 col-sm-12 col-xs-12">
              <div class="card">
                <div style="height:250px;">
                  <img
                  style="height:100%;overflow:hidden; object-fit:cover;object-position:top center;"
                  src="${book.coverImage}"
                  title="${book.title}"
                  class="card-img-top" alt="${book.title}"></div>
                <div class="card-body">
                  <h5 class="card-title"><a href="detail.html?id=${book.id}">${
      book.title
    }</a> by <b>${book.author}</b></h5>
                  <p class="card-text">genre: ${book.genre}</p>
                  <p class="card-text">year: ${book.year}</p>
  
                  <div class="d-flex justify-end gap-2">
                    <button title="favorite" class="btn btn-outline-danger favorite-btn" data-id="${
                      book.id
                    }"><i class="${
      check ? "fa-solid" : "fa-regular"
    } fa-heart"></i></button>
                    <button title="basket" class="btn btn-outline-warning">
                      <i class="fa-solid fa-basket-shopping"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>`;
  });
  //favorite click
  const favoriteButtons = document.querySelectorAll(".favorite-btn");
  favoriteButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      toggleFavorites(id, btn.children[0]);
    });
  });
}

//toggle favorites
export function toggleFavorites(id, icon) {
  const localFavorites = JSON.parse(window.localStorage.getItem("favorites"));
  const check = localFavorites.find((x) => x.id == id);
  const localUser = users.find(
    (x) => x.id == JSON.parse(window.localStorage.getItem("userId"))
  );

  if (localUser) {
    if (check) {
      //remove from favorite
      window.localStorage.setItem(
        "favorites",
        JSON.stringify([...localFavorites.filter((x) => x.id != id)])
      );
      if (window.location.href.includes("favorites.html")) {
        icon.closest(".col-3").remove();
      }
      Toastify({
        text: "book removed from favorites successfully!",
        duration: 1500,
        newWindow: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
      icon.classList.replace("fa-solid", "fa-regular");
    } else {
      const newFavorite = books.find((x) => x.id == id);
      //add to favorite
      window.localStorage.setItem(
        "favorites",
        JSON.stringify([...localFavorites, newFavorite])
      );
      Toastify({
        text: "book added to favorites successfully!",
        duration: 1500,
        newWindow: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
      icon.classList.replace("fa-regular", "fa-solid");
    }
  } else {
    Toastify({
      text: "you have to log in to add favorites!",
      duration: 1500,
      newWindow: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
    }).showToast();
  }
}

export function renderNavbar() {
  const localUserId = JSON.parse(window.localStorage.getItem("userId"));
  const isLogged = localUserId ? users.find((x) => x.id == localUserId) : false;
  renderNavWrapper.innerHTML = "";
  if (isLogged) {
    renderNavWrapper.innerHTML = `
     <button
              class="flex items-center text-black dark:text-white justify-center">
              ${isLogged.username}
            </button>
            <button 
              class="flex items-center justify-center rounded-md px-6 py-2.5 font-semibold log-out-btn">log out</button>
    `;
    const logOutBtn = document.querySelector(".log-out-btn");

    logOutBtn.addEventListener("click", function () {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          logout();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    });
  } else {
    renderNavWrapper.innerHTML = ` <a role="button" href="register.html" title="link"
              class="flex items-center text-black dark:text-white justify-center">
              Sign Up
            </a>
            <a href="login.html" role="button"
              class="flex items-center justify-center rounded-md px-6 py-2.5 font-semibold">Login</a>`;
  }
}

export function logout() {
  window.localStorage.setItem("userId", JSON.stringify(null));
  renderNavbar();
}
