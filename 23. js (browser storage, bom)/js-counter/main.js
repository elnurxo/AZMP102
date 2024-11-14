const increaseBtn = document.querySelector(".increase");
const decreaseBtn = document.querySelector(".decrease");
const resetBtn = document.querySelector(".reset");
const counter = document.querySelector(".counter");
// const LOCAL_STORAGE_COUNTER = 'counter';

//initial check of localStorage
document.addEventListener("DOMContentLoaded", function () {
  if (!JSON.parse(window.localStorage.getItem("counter"))) {
    window.localStorage.setItem("counter", JSON.stringify(0));
  } else {
    counter.textContent = JSON.parse(window.localStorage.getItem("counter"));
  }
});

increaseBtn.addEventListener("click", function () {
  //local storage for counter
  //bug - null
  let localCounter = JSON.parse(window.localStorage.getItem("counter"));
  localCounter++;
  //update localStorage
  window.localStorage.setItem("counter", JSON.stringify(localCounter));

  counter.textContent = localCounter;
});

decreaseBtn.addEventListener("click", function () {
  //local storage for counter
  let localCounter = JSON.parse(window.localStorage.getItem("counter"));
  if (localCounter > 0) {
    localCounter--;
    //update localStorage
    window.localStorage.setItem("counter", JSON.stringify(localCounter));

    counter.textContent = localCounter;
  } else {
    window.alert("number cannot be less than zero!");
    decreaseBtn.classList.replace("btn-outline-warning", "btn-danger");
    decreaseBtn.setAttribute("disabled", "true");
  }
});

resetBtn.addEventListener("click", function () {
  window.localStorage.setItem("counter", 0);
  counter.textContent = 0;
});
