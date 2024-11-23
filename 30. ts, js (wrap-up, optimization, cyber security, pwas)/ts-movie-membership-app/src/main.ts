import Swal from "sweetalert2";
import { MovieLibrary, PremiumMember } from "./classes/index.ts";
import { MovieGenre, MovieSort } from "./enums/index.ts";
import { IMovie } from "./interfaces/index.ts";
import { Inputs } from "./types/index.ts";
import {
  checkValidation,
  formatDuration,
  resetAddForm,
} from "./utilities/index.ts";
import { getUser } from "./api/request.ts";
import { API_URL } from "./constants/index.ts";

const inputs: Inputs = {
  movieTitle: document.querySelector<HTMLInputElement>("#title"),
  director: document.querySelector<HTMLInputElement>("#director"),
  releaseYear: document.querySelector<HTMLInputElement>("#year"),
  genre: document.querySelector<HTMLSelectElement>("#genre-select"),
};
const addForm = document.querySelector<HTMLFormElement>("#add-movie-form");
const addBtn = document.querySelector(".add-btn") as HTMLButtonElement;
const moviesList = document.querySelector(".movies-list") as HTMLUListElement;
const searchInp = document.querySelector<HTMLInputElement>("#search");
const sortByYearSelect =
  document.querySelector<HTMLSelectElement>("#sort-by-year");

//create movie library
const movieLibrary = new MovieLibrary([]);

//add
addForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  //add new movie
  if (
    inputs.movieTitle &&
    inputs.director &&
    inputs.releaseYear &&
    inputs.genre
  ) {
    const genre = inputs.genre.value as MovieGenre;
    const newMovie: IMovie = {
      id: Date.now(),
      title: inputs.movieTitle?.value,
      director: inputs.director?.value,
      releaseYear: Number(inputs.releaseYear?.value),
      genre: genre,
    };
    movieLibrary.addMovie(newMovie, moviesList);
  }

  //reset form
  resetAddForm(inputs, addBtn);
});

//search
searchInp?.addEventListener("keyup", (e) => {
  const target = e.target as HTMLInputElement;
  const searchedMovies = movieLibrary.searchMoviesByTitle(target.value);
  movieLibrary.displayMovies(searchedMovies, moviesList);
});

//sort (year)
sortByYearSelect?.addEventListener("change", (e) => {
  const target = e.target as HTMLSelectElement;
  const sortable = target.value as MovieSort;
  const sortedMovies = movieLibrary.sortMoviesByYear(sortable);
  movieLibrary.displayMovies(sortedMovies, moviesList);
});

//Premium Members
const premiumMember1: PremiumMember = new PremiumMember(
  "john doe",
  new Date("2022-11-11"),
  true,
  false
);
//frozen member
const premiumMember2: PremiumMember = new PremiumMember(
  "jane smith",
  new Date("2023-05-10"),
  true,
  true
);
const premiumMember3: PremiumMember = new PremiumMember(
  "jack adams",
  new Date("2019-09-01"),
  true,
  false
);

const premiumMembers: PremiumMember[] = [
  premiumMember1,
  premiumMember2,
  premiumMember3,
];

const premiumMemberList =
  document.querySelector<HTMLUListElement>(".premium-user-list");

function renderPremiumUsers() {
  premiumMembers.forEach((premiumMember: PremiumMember) => {
    if (premiumMemberList) {
      premiumMemberList.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center ${
          premiumMember.frozen && "text-info"
        }">
          <span>${premiumMember.name} | ${
        premiumMember.isActive ? "active" : "inactive"
      }</span>
      <span>${formatDuration(premiumMember.getMembershipDuration())}</span>
      <div>
      <button class="freeze btn btn-dark">${
        premiumMember.frozen ? "unfreeze" : "freeze"
      }</button>
      <button class="btn btn-outline-secondary">log in</button>
      </div>
        </li>
    `;
      const freezeButtons =
        document.querySelectorAll<HTMLButtonElement>(".freeze");
      Array.from(freezeButtons).forEach((btn: HTMLButtonElement) => {
        btn.addEventListener("click", function (e: Event) {
          const target = e.target as HTMLButtonElement;
          const isFrozen = target.textContent === "freeze" ? false : true;
          if (isFrozen) {
            premiumMember.unfreezeMembership();
            target.textContent = "freeze";
            target.closest("li")?.classList.remove("text-info");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "membership unfreezed",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            premiumMember.freezeMembership();
            target.closest("li")?.classList.add("text-info");
            target.textContent = "unfreeze";
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "membership freezed",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      });
    }
  });
}

//load
document.addEventListener("DOMContentLoaded", () => {
  //enum loop
  for (const genre in MovieGenre) {
    const genreOption = document.createElement("option");
    genreOption.style.textTransform = "capitalize";
    genreOption.textContent = genre;
    genreOption.setAttribute("value", genre);
    inputs.genre?.appendChild(genreOption);
  }

  //check validation
  checkValidation(inputs, addBtn);

  //load users
  renderPremiumUsers();
});

// API related button click
const getDataBtn = document.querySelector<HTMLButtonElement>("#get-data");

getDataBtn?.addEventListener("click", async function () {
  const data = await getUser<object>(API_URL);
  console.log("data: ", data);
});
