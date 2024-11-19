import Swal from "sweetalert2";
const contactForm = document.querySelector("#contact-form");
const emailInp = document.querySelector("#email");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (emailInp.value.trim() !== "") {
    emailInp.value = "";
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Subscribed successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "email is required!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
