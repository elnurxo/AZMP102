import { users } from "./data.js";
import { renderNavbar } from "./helpers.js";
import Toastify from "toastify-js";

const emailInp = document.querySelector("#email");
const passInp = document.querySelector("#password");
const signInForm = document.querySelector("#sign-in-form");

signInForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const validUser = users.find(
    (x) => x.email === emailInp.value && x.password === passInp.value
  );

  if (validUser) {
    window.localStorage.setItem("userId", validUser.id);
    Toastify({
      text: `welcome back ${validUser.username}`,
      duration: 1500,
      newWindow: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
    }).showToast();
    setTimeout(() => {
      //deploy home page
      renderNavbar();
      window.location.replace("http://localhost:5173/index.html");
    }, 1500);
  } else {
    Toastify({
      text: "email or password is incorrect!",
      duration: 1500,
      newWindow: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "red",
      },
    }).showToast();
  }
});
