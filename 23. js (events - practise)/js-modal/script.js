const openModalBtn = document.querySelector("#modal-btn");
const overlay = document.querySelector("#overlay");
const modal = document.querySelector(".my-modal");
const closeModal = document.querySelector(".close");

openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden-modal");
  modal.classList.add("active-modal");
  overlay.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  closeModalFunc();
});

document.addEventListener("click", (e) => {
  if (e.target.id === "overlay") {
    closeModalFunc();
  }
});

function closeModalFunc() {
  modal.classList.add("hidden-modal");
  modal.classList.remove("active-modal");
  overlay.classList.add("hidden");
}
