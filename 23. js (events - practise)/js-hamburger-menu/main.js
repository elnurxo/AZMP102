const sideBarIcon = document.querySelector(".menu-bar");
const sideBar = document.querySelector(".side-bar");

sideBarIcon.addEventListener("click", function () {
  sideBar.classList.toggle("active-side-bar");
  if (document.body.classList.contains("active")) {
    setTimeout(() => {
      document.body.classList.remove("active");
    }, 400);
  } else {
    document.body.classList.add("active");
  }
});
