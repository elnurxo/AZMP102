import { nanoid } from "nanoid";

class Product {
  constructor(
    title,
    description,
    price,
    category,
    sellerId,
    image,
    rating = 0,
    stock = 0
  ) {
    this.id = nanoid();
    this.title = title;
    this.description = description;
    this.price = price;
    this.category = category;
    this.sellerId = sellerId;
    this.createdAt = new Date();
    this.image = image;
    this.rating = rating;
    this.reviews = [];
    this.stock = stock;
  }
}

export default Product;
