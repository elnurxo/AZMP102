const btn = document.querySelector(".my-btn");

btn.addEventListener("click", function () {
  if (btn.classList.contains("my-dark-btn")) {
    btn.classList.remove("my-dark-btn");
    document.querySelector("#mode").classList.add("dark");
    btn.textContent = "change to light mode";
  } else {
    btn.classList.add("my-dark-btn");
    document.querySelector("#mode").classList.remove("dark");
    btn.textContent = "change to dark mode";
  }
});

//task 2
const generateBtn = document.querySelector(".generate-num");

generateBtn.addEventListener("click", function () {
  const num = document.querySelector(".num");
  num.textContent = Math.floor(Math.random() * 1000) + 1;
});

//task 3
const getTimeBtn = document.querySelector(".get-date");

getTimeBtn.addEventListener("click", function () {
  const time = document.querySelector(".time");
  const currentDate = new Date();

  time.innerHTML = `<i class="text-danger">${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}</i> | <span>${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}</span>`;
});

//task 4
const passInp = document.querySelector("#pass");

passInp.addEventListener("keyup", function (e) {
  const errorMsg = document.querySelector(".error-message");
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;

  if (e.target.value.match(regex)) {
    this.style.borderColor = "green";
    errorMsg.classList.replace("text-danger", "text-success");
    errorMsg.textContent = "strong password";
  } else {
    this.style.borderColor = "red";
    errorMsg.classList.replace("text-success", "text-danger");
    errorMsg.textContent = "weak password";
  }
});

//task 5
const accordionBtn = document.querySelector(".show-hide");

accordionBtn.addEventListener("click", function() {
  const text = document.querySelector(".text");
  text.classList.toggle("hide");
  if (text.classList.contains("hide")) {
    this.textContent = "show text";
  } else {
    this.textContent = "hide text";
  }
});
