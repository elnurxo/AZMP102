import productController from "../services/api/productService.js";
import moment from "moment";

const id = new URLSearchParams(window.location.search).get("id");

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const product = await productController.getProductByID(id);
    if (product) {
      console.log("prod: ", product);
      renderDetailProduct(product);
    }
  } catch (error) {
    // window.location.href = "http://localhost:5173/products.html";
  }
});

function renderDetailProduct(product) {
  const prodImg = document.querySelector("#product-img");
  const prodTitle = document.querySelector("#prod-title");
  const prodId = document.querySelector("#prod-id");
  const prodPrice = document.querySelector("#prod-price");
  const reviewCount = document.querySelector("#comment-count");
  const avgRate = document.querySelector("#rate");
  const prodDescription = document.querySelector("#prod-desc");
  const prodCreatedAt = document.querySelector("#prod-date");
  const prodStockCount = document.querySelector("#stock");

  prodImg.src = product.image;
  prodTitle.textContent = product.title;
  prodId.textContent = product.id;
  prodPrice.textContent = product.price;
  reviewCount.textContent = product.reviews.length;
  avgRate.textContent = product.rating;
  prodDescription.textContent = product.description;
  prodStockCount.textContent = product.stock;
  prodCreatedAt.textContent = moment(product.createdAt).format(
    "MMM Do YYYY, h:mm a"
  );
}
