import { getData } from "./request.js";

const getDog = document.querySelector(".get");
const imgDog = document.querySelector(".dog-img");

getDog.addEventListener("click", function () {
  this.setAttribute("disabled", true);
  this.classList.replace("btn-primary", "btn-danger");
  getData("products")
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  //   axios
  //     .get("https://dog.ceo/api/breeds/image/random")
  //     .then((resp) => {
  //       if (resp.data.status === "success") {
  //         imgDog.setAttribute("src", resp.data.message);
  //         this.removeAttribute("disabled", true);
  //         this.classList.replace("btn-danger", "btn-primary");
  //       }
  //     })
  //     .finally(() => {});
});

document.querySelector(".post").addEventListener("click", function () {
  //   axios({
  //     method: "post",
  //     url: "https://northwind.vercel.app/api/categories",
  //     data: {
  //       name: "code academy",
  //       description: "lorem ipsum.",
  //     },
  //   }).then((resp) => {
  //     console.log(resp);
  //   });
  axios.post("https://northwind.vercel.app/api/categories", {
    name: "elnur",
    description: "test",
  });
});
