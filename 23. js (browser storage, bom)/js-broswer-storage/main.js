const localBtn = document.querySelector("#localBtn");
const sessionBtn = document.querySelector("#sessionBtn");

//local storage methods - add, remove, remove all, get
//window.localStorage
//setItem, removeItem, clear, getItem

//session storage methods, add, remove, remove all, get
//window.sessionStorage
//setItem, removeItem, clear, getItem

//BOM - window, alert, prompt, confirm, localStorage, sessionStorage
//json - stringify, parse

localBtn.addEventListener("click", function () {
  //   window.localStorage.setItem(
  //     "product",
  //     JSON.stringify({ id: 1, name: "iphone x" })
  //   );
  //   const product = JSON.parse(window.localStorage.getItem("product"));
  console.log(product);
});

sessionBtn.addEventListener("click", function () {
  window.sessionStorage.setItem("fruit", "apple");
});
