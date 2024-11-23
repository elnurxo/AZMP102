import { Inputs } from "../types";

interface InputsInterface {
  [key: string]: HTMLInputElement | HTMLSelectElement | null;
}

export function checkValidation(
  inputs: InputsInterface,
  addBtn: HTMLButtonElement
) {
  const validateInputs = () => {
    const allValid = Object.values(inputs).every(
      (input) => input && input.value.trim().length > 0
    );
    addBtn.disabled = !allValid;
    if (allValid) {
      addBtn.classList.replace("btn-outline-danger", "btn-outline-primary");
    } else {
      addBtn.classList.replace("btn-outline-primary", "btn-outline-danger");
    }
  };

  Object.entries(inputs).forEach(([_, input]) => {
    if (!input) return;

    const eventType = input.tagName === "SELECT" ? "change" : "keyup";
    input.addEventListener(eventType, function (e: Event) {
      const target = e.target as HTMLInputElement | HTMLSelectElement;

      if (target.value.trim().length === 0) {
        target.classList.add("border", "border-danger");
      } else {
        target.classList.remove("border", "border-danger");
      }

      validateInputs();
    });
  });
}

export function resetAddForm(inputs: Inputs, addBtn: HTMLButtonElement) {
  if (
    inputs.movieTitle &&
    inputs.director &&
    inputs.releaseYear &&
    inputs.genre
  ) {
    inputs.movieTitle.value = "";
    inputs.director.value = "";
    inputs.releaseYear.value = "";
    inputs.genre.value = "action";
    addBtn.disabled = true;
    addBtn.classList.replace("btn-outline-primary", "btn-outline-danger");
  }
}

export function formatDuration(milliseconds: number) {
  const date = new Date(milliseconds);
  const now = new Date(0); // Start from 1970-01-01

  let years = date.getUTCFullYear() - now.getUTCFullYear();
  let months = date.getUTCMonth() - now.getUTCMonth();
  let days = date.getUTCDate() - now.getUTCDate();

  // Adjust for negative values
  if (days < 0) {
    months -= 1;
    days += new Date(now.getUTCFullYear(), now.getUTCMonth() + 1, 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${years} year${years !== 1 ? "s" : ""} ${months} month${
    months !== 1 ? "s" : ""
  } ${days} day${days !== 1 ? "s" : ""}`;
}

