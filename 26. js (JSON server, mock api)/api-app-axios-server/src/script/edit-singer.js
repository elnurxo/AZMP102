import Swal from "sweetalert2";
import { getData, putData } from "./services/API/request.js";
import { endpoints } from "./services/API/constants.js";
import { HOME_PAGE_URL } from "./constants/index.js";

// Form Elements
const editForm = document.querySelector("#edit-singer-form");
const inputs = {
  stageName: document.querySelector("#stage-name"),
  realName: document.querySelector("#real-name"),
  age: document.querySelector("#age"),
  debutYear: document.querySelector("#debut-year"),
  img: document.querySelector("#image-url"),
  monthlyListeners: document.querySelector("#monthly-listeners"),
  awardsWon: document.querySelector("#awards-won"),
  label: document.querySelector("#label-company"),
  genres: document.querySelector("#genres"), // Multiple select
  nationality: document.querySelector("#nationality"),
  albums: document.querySelector("#albums"),
};
const updateBtn = document.querySelector(".update-btn");

// Get Singer ID from URL
const urlParams = new URLSearchParams(window.location.search);
const singerId = urlParams.get("id");

// Initial Setup
document.addEventListener("DOMContentLoaded", async () => {
  if (!singerId) {
    Swal.fire({
      icon: "error",
      title: "Invalid URL",
      text: "No singer ID found in the URL.",
    }).then(() => window.location.replace(HOME_PAGE_URL));
    return;
  }

  updateBtn.setAttribute("disabled", "true");
  setupInputListeners();
  await populateForm();
});

// Fetch and Populate Form with Singer Data
async function populateForm() {
  try {
    const singerData = await getData(`${endpoints.singers}/${singerId}`);
    if (!singerData) throw new Error("Singer not found");

    Object.entries(inputs).forEach(([key, input]) => {
      if (key === "genres") {
        Array.from(input.options).forEach((option) => {
          option.selected = singerData?.data?.genre?.includes(option.value);
        });
      } else if (key === "debutYear") {
        const debutYear = singerData.data.debutYear;
        input.value = `${debutYear}-01`;
      } else {
        input.value = singerData.data[key];
      }
    });

    toggleUpdateButton();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    }).then(() => window.location.replace(HOME_PAGE_URL));
  }
}

// Form Submission Handler
editForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formValid = validateForm();
  if (formValid) {
    const updatedGenres = Array.from(inputs.genres.selectedOptions).map(
      (option) => option.value
    );

    const updatedSinger = {
      stageName: inputs.stageName.value,
      realName: inputs.realName.value,
      age: Number(inputs.age.value),
      debutYear: Number(new Date(inputs.debutYear.value).getFullYear()),
      img: inputs.img.value,
      awardsWon: inputs.awardsWon.value,
      label: inputs.label.value,
      genre: updatedGenres.join(","),
      nationality: inputs.nationality.value,
      albums: inputs.albums.value,
      monthlyListeners: Number(inputs.monthlyListeners.value),
    };

    // Update singer in API
    try {
      await putData(`${endpoints.singers}/${singerId}`, updatedSinger);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Singer updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.replace(HOME_PAGE_URL);
      });
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Update failed!",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
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
      toggleUpdateButton();
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

// Enable or Disable Update Button Dynamically
function toggleUpdateButton() {
  const allValid = validateForm();
  if (allValid) {
    updateBtn.removeAttribute("disabled");
    updateBtn.classList.replace("is-danger", "is-success");
  } else {
    updateBtn.setAttribute("disabled", "true");
    updateBtn.classList.replace("is-success", "is-danger");
  }
}
