import Swal from "sweetalert2";
import { Singer } from "./classes/singer.js";
import { postData } from "./services/API/request.js";
import { endpoints } from "./services/API/constants.js";
import { HOME_PAGE_URL } from "./constants/index.js";

// Form Elements
const addForm = document.querySelector("#add-singer-form");
const inputs = {
  stageName: document.querySelector("#stage-name"),
  realName: document.querySelector("#real-name"),
  age: document.querySelector("#age"),
  debutYear: document.querySelector("#debut-year"),
  imgUrl: document.querySelector("#image-url"),
  monthlyListeners: document.querySelector("#monthly-listeners"),
  awardsWon: document.querySelector("#awards-won"),
  labelCompany: document.querySelector("#label-company"),
  genres: document.querySelector("#genres"), // Multiple select
  nationality: document.querySelector("#nationality"),
  albums: document.querySelector("#albums"),
};
const addBtn = document.querySelector(".add-btn");

// Initial Setup
document.addEventListener("DOMContentLoaded", () => {
  addBtn.setAttribute("disabled", "true");
  setupInputListeners();
});

// Form Submission Handler
addForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formValid = validateForm();
  if (formValid) {
    const selectedGenres = Array.from(inputs.genres.selectedOptions).map(
      (option) => option.value
    );

    const newSinger = new Singer(
      inputs.stageName.value,
      inputs.realName.value,
      inputs.age.value,
      inputs.debutYear.value,
      inputs.imgUrl.value,
      inputs.awardsWon.value,
      inputs.labelCompany.value,
      selectedGenres,
      inputs.nationality.value,
      inputs.albums.value,
      inputs.monthlyListeners.value
    );

    //add singer to API
    const dataFromAPI = await postData(endpoints.singers, newSinger);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Singer added successfully!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.replace(HOME_PAGE_URL);
    });
    // setTimeout(() => {
    // }, 1500);

    resetForm();
  } else {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Form validation failed!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});

// Add Real-Time Validation Listeners
function setupInputListeners() {
  Object.entries(inputs).forEach(([key, input]) => {
    const isMultiple = key === "genres";
    input.addEventListener("input", () => {
      validateInput(input, isMultiple);
      toggleSubmitButton();
    });
  });
}

// Form Validation
function validateForm() {
  let formValid = true;

  Object.entries(inputs).forEach(([key, input]) => {
    const isValid = validateInput(input, key === "genres");
    if (!isValid) formValid = false;
  });

  return formValid;
}

// Input Validation
function validateInput(input, isMultiple = false) {
  const value = isMultiple
    ? Array.from(input.selectedOptions).map((option) => option.value)
    : input.value.trim();

  if (!value || (Array.isArray(value) && value.length === 0)) {
    displayError(input, true);
    return false;
  } else {
    displayError(input, false);
    return true;
  }
}

// Display Error Styling
function displayError(input, hasError) {
  if (hasError) {
    input.classList.add("is-danger");
  } else {
    input.classList.remove("is-danger");
  }
}

// Enable or Disable Submit Button Dynamically
function toggleSubmitButton() {
  const allValid = validateForm();
  if (allValid) {
    addBtn.removeAttribute("disabled");
    addBtn.classList.replace("is-danger", "is-success");
  } else {
    addBtn.setAttribute("disabled", "true");
    addBtn.classList.replace("is-success", "is-danger");
  }
}

// Reset Form
function resetForm() {
  Object.values(inputs).forEach((input) => {
    if (input.type === "select-multiple") {
      Array.from(input.options).forEach((option) => {
        option.selected = false;
      });
    } else {
      input.value = "";
    }
    input.classList.remove("is-danger");
  });
  addBtn.setAttribute("disabled", "true");
  addBtn.classList.replace("is-success", "is-danger");
}
