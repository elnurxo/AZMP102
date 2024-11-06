// let x = document.querySelector("#btn");

// function handleClick() {
//   alert("It was clicked!");
// }

// x.addEventListener("click", function (event) {
//   console.log("this: ", this);
//   console.log("event: ", event.target);
// });

// const outerBox = document.querySelector(".outer-box");
// const mediumBox = document.querySelector(".medium-box");
// const innerBox = document.querySelector(".inner-box");

// outerBox.addEventListener("click", function (e) {
//   e.stopPropagation();
//   console.log("outer box clicked");
// }, {capture: true});

// mediumBox.addEventListener("click", function (e) {
//   e.stopPropagation();
//   console.log("medium box clicked");
// }, {capture: true});

// innerBox.addEventListener("click", function (e) {
//   e.stopPropagation();
//   console.log("inner box clicked");
// }, {once: true});

// document.addEventListener("DOMContentLoaded", function (e) {
//   document.body.style.backgroundColor = "red";
// });

// const box = document.querySelector(".box");

// box.addEventListener("click", function (e) {
//   let keys = [];

//   if (e.shiftKey) keys.push("shift");
//   if (e.ctrlKey) keys.push("ctrl");
//   if (e.altKey) keys.push("alt");
//   if (e.metaKey) keys.push("meta");

//   console.log(keys);
// //   console.log('clint X: ',e.screenX);
// //   console.log('clint Y: ',e.clientY);
// });

//keyboard events
// const inp = document.querySelector("input");

// inp.addEventListener("change", function (e) {
//   console.log(this.value);
//   console.log('------------');
//   console.log(e.keyCode);
//   if(e.code === "Enter"){
//     document.body.style.backgroundColor = "skyblue";
//   }
// });

// const select = document.querySelector("select");

// select.addEventListener("change", function (e) {
//   console.log(e.target.value);
// });

const header = document.querySelector("header");

window.addEventListener("scroll", (event) => {
  if (document.body.scrollTop >= 200) {
    header.style.backgroundColor = "orange";
  } else {
    header.style.backgroundColor = "red";
  }
});
