import Swal from "sweetalert2";
import { deleteData } from "../services/API/request.js";
import { endpoints } from "../services/API/constants";

const singersWrapper = document.querySelector(".singers-wrapper");

export function renderSingerCards(arr) {
  singersWrapper.innerHTML = "";
  if (arr.length === 0) {
    singersWrapper.innerHTML = `<div class="has-text-centered">
    <h2 class="title has-text-centered has-text-danger">Not Found Any Singer Data!</h2>
    </div>`;
  } else {
    arr.forEach((singer) => {
      singersWrapper.innerHTML += `
           <div class="column is-3-desktop is-6-tablet is-12-mobile">
              <div class="card">
                <div class="card-image is-relative">
                  <figure class="image is-4by3">
                    <img class="cover-image" src="${singer.img}" alt=${singer.stageName} title="${singer.stageName}" />
                  </figure>
                  <span class="is-absolute icon-wrapper">
                    <i class="fa-regular fa-heart"></i>
                  </span>
                </div>
                <div class="card-content">
                  <div class="media mb-0">
                    <div class="media-content">
                      <h2 class="title is-4">${singer.stageName}</h2>
                      <p class="subtitle is-6">${singer.realName} (${singer.age})</p>
                    </div>
                  </div>
                  <hr class="mb-2"/>
                  <div class="content mt-0">
                    <span>genre: ${singer.genre}</span> <br>
                    <span>nationality: ${singer.nationality}</span>
                    <br>
                    <a role="button" href="./detail.html?id=${singer.id}" class="button d-block mt-3 is-dark has-text-white"><i class="fa-solid fa-circle-info"></i></a>
                    <button class="button is-primary has-text-white mt-3"><i class="fa-solid fa-edit"></i></button>
                    <button data-id="${singer.id}" class="delete-btn button is-danger has-text-white mt-3"><i class="fa-solid fa-trash"></i></button>
                  </div>
                </div>
              </div>
            </div>
          `;
    });
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteCard(deleteBtns);
  }
}

export function deleteCard(btns) {
  Array.from(btns).forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const id = e.target.getAttribute("data-id");
      Swal.fire({
        title: "Are you sure to delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          e.target.closest(".column").remove();
          const response = await deleteData(`${endpoints.singers}/${id}`);
          console.log(response);
          Swal.fire({
            title: "Deleted!",
            text: "Your singer has been deleted.",
            icon: "success",
          });
        }
      });
    });
  });
}

export function formatMonthlyListeners(listenerCount) {
  const formattedListeners = null;
  if (listenerCount >= 1_000_000) {
    formatMonthlyListeners = (listenerCount / 1_000_000).toFixed(1).concat("M");
  } else if (listenerCount >= 1000) {
    formatMonthlyListeners = (listenerCount / 1000).toFixed(1).concat("K");
  } else {
    formatMonthlyListeners = listenerCount.toString();
  }

  return formatMonthlyListeners;
}
