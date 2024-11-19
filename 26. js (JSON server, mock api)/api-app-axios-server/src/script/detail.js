import Swal from "sweetalert2";
import { formatMonthlyListeners } from "./helpers/index.js";
import { endpoints } from "./services/API/constants";
import { deleteData, getData } from "./services/API/request.js";
import "@fortawesome/fontawesome-free/css/all.css";
import { HOME_PAGE_URL } from "./constants/index.js";

const id = new URLSearchParams(window.location.search).get("id");

//get html detail elements
const img = document.querySelector("#singer-img");
const stageNameTitle = document.querySelector("#stage_name_title");
const stageName = document.querySelector("#stage-name");
const realName = document.querySelector("#real-name");
const age = document.querySelector("#age");
const genre = document.querySelector("#genre");
const nationality = document.querySelector("#nationality");
const debutYear = document.querySelector("#debut-year");
const awardsWon = document.querySelector("#awards-won");
const labelCompany = document.querySelector("#label-company");
const albums = document.querySelector("#albums");
const monthlyListeners = document.querySelector("#monthly-listeners");

//delete button
const deleteBtn = document.querySelector(".delete-btn");

document.addEventListener("DOMContentLoaded", async function () {
  const container = document.querySelector(".details-wrapper");
  container.style.display = "none";
  console.log(container);
  const { data, loading } = await getData(`${endpoints.singers}/${id}`);

  if (!loading) {
    container.style.display = "block";
    const loader = this.documentElement.querySelector(".loader");
    loader.style.display = "none";
  }
  if (data) {
    deleteBtn.setAttribute("data-id", data.id);
    img.setAttribute("src", data.img);
    img.setAttribute("title", data.stageName);
    img.setAttribute("alt", data.stageName);
    stageNameTitle.textContent = data.stageName;
    stageName.textContent = data.stageName;
    realName.textContent = data.realName;
    age.textContent = data.age;
    genre.textContent = data.genre;
    nationality.textContent = data.nationality;
    debutYear.textContent = data.debutYear;
    awardsWon.textContent = data.awardsWon;
    labelCompany.textContent = data.label;
    albums.textContent = data.albums;
    monthlyListeners.textContent = formatMonthlyListeners(
      data.monthlyListeners
    );
  } else {
    window.location.replace(HOME_PAGE_URL);
  }
});

//go back button click handle
const goBackBtn = document.querySelector(".go-back-btn");

goBackBtn.addEventListener("click", function () {
  window.history.back();
});

//delete handle
deleteBtn.addEventListener("click", function () {
  const id = this.getAttribute("data-id");
  Swal.fire({
    title: "Are you sure to delete?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  })
    .then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteData(`${endpoints.singers}/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    })
    .then(() => {
      window.location.replace(HOME_PAGE_URL);
    });
});
