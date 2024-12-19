import { nanoid } from "nanoid";
import moment from "moment";

class Product {
  constructor(
    name,
    categoryId,
    price,
    costPrice,
    salePrice,
    discountPercentage,
    stock,
    imageUrl
  ) {
    this.id = nanoid();
    this.name = name;
    this.categoryId = categoryId;
    this.price = price;
    this.costPrice = costPrice;
    this.salePrice = salePrice;
    this.discountPercentage = discountPercentage;
    this.stock = stock;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.imageUrl = imageUrl;
    this.reviews = [];
  }

  // Method to calculate discount price
  getDiscountedPrice() {
    return this.salePrice - (this.salePrice * this.discountPercentage) / 100;
  }

  // Method to get the formatted created date
  getFormattedCreatedAt() {
    return moment(this.createdAt).format("YYYY-MM-DD HH:mm");
  }
}

export default Product;
