const productsWrapper = document.querySelector(".cards-wrapper");
import productController from "../services/api/productService.js";
import Swal from "sweetalert2";

document.addEventListener("DOMContentLoaded", async function () {
  const products = await productController.getAllProducts();
  if (products) {
    renderProductsCards(products);
  }
});

function renderProductsCards(arr) {
  productsWrapper.innerHTML = "";
  arr.forEach((product) => {
    productsWrapper.innerHTML += `
         <div class="relative group bg-gray-200 shadow-lg rounded-2xl overflow-hidden">
                    <div class="relative w-full h-[400px]"> <!-- Fixed height for image -->
                        <img class="w-full h-full object-cover rounded-2xl transition-all delay-150 duration-300 ease"
                            src=${product.image} alt="${product.title}" title="${product.title}" />
                    </div>
                    <div
                        class="bg-gray-100 dark:bg-gray-700 w-full h-40 absolute left-0 bottom-0 -mb-44 group-hover:mb-0 rounded-b-2xl transition-all delay-150 duration-300 ease">
                        <div class="p-6">
                            <div class="capitalize flex items-center justify-between gap-4">
                                <div>
                                    <h2 class="text-red-600 text-lg font-bold">${product.title}</h2>
                                    <p class="dark:text-gray-100">${product.category}</p>
                                </div>
                                <div>
                                    <p class="text-3xl font-bold dark:text-gray-100">$${product.price}</p>
                                </div>
                            </div>
                            <div class="block mt-4">
                                <div class="absolute bottom-2 left-5">
                                          <a role="button" href="productDetail.html?id=${product.id}"
                                        class="bg-blue-600 text-gray-100 font-medium py-2.5 px-4 rounded-xl opacity-90 hover:opacity-100">detail</a>
                                          <button 
                                        data-id="${product.id}"
                                        class="add-to-cart bg-red-600 text-gray-100 font-medium py-2.5 px-4 rounded-xl opacity-90 hover:opacity-100">Add
                                        to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
    const addToCartButtons = Array.from(
      document.querySelectorAll(".add-to-cart")
    );
    addToCartButtons.forEach((btn) => {
      btn.addEventListener("click", async function () {
        const id = this.getAttribute("data-id");
        const localUser = JSON.parse(localStorage.getItem("user"));
        console.log("test", localUser);
        // user -> {role: 'client', id: 4}
        if (localUser) {
          const checkUser = await getUserByID(localUser.id);
          if (!checkUser) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "User not Logged In!",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            //everything okay - cart add
          }
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "User not Logged In!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    });
  });
}

//search product
const searchInp = document.querySelector("#search-inp");
const searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchValue = searchInp.value.trim().toLowerCase();
  const products = await productController.getAllProducts();
  const filteredProducts = products.filter((x) => {
    return x.title.toLowerCase().trim().includes(searchValue);
  });
  renderProductsCards(filteredProducts);
});
