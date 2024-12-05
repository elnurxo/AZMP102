import { nanoid } from "nanoid";
import orderStatus from "../constants/orderStatus.js";

class Order {
  constructor(userId, products, totalPrice) {
    this.id = nanoid(); // Unique identifier for the order
    this.userId = userId; // ID of the user who placed the order
    this.products = products; // Array of products (each product includes productId and quantity)
    this.totalPrice = totalPrice; // Total price of the order
    this.status = orderStatus.pending; // Order status (e.g., "Pending", "Delivered", "Cancelled")
    this.orderedAt = new Date(); // Timestamp of when the order was placed
  }
}

export default Order;
