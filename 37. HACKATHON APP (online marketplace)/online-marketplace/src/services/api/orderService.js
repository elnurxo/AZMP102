import makeRequest from "./index.js";
import { ENDPOINTS } from "../../constants/api.js";

// Get all orders
const getAllOrders = async () => {
  try {
    const orders = await makeRequest("GET", ENDPOINTS.orders);
    return orders; // Return the list of orders
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders. Please try again later.");
  }
};

// Get order by ID
const getOrderByID = async (orderId) => {
  try {
    const order = await makeRequest("GET", `${ENDPOINTS.orders}/${orderId}`);
    return order; // Return the order data by ID
  } catch (error) {
    console.error(`Error fetching order with ID ${orderId}:`, error);
    throw new Error(
      `Failed to fetch order with ID ${orderId}. Please try again later.`
    );
  }
};

// Register a new order (POST request)
const postOrder = async (orderData) => {
  try {
    const newOrder = await makeRequest("POST", ENDPOINTS.orders, orderData);
    return newOrder; // Return the newly created order data
  } catch (error) {
    console.error("Error registering order:", error);
    throw new Error("Failed to register order. Please try again later.");
  }
};

// Update order by ID
const updateOrderByID = async (orderId, orderData) => {
  try {
    const updatedOrder = await makeRequest(
      "PUT",
      `${ENDPOINTS.orders}/${orderId}`,
      orderData
    );
    return updatedOrder; // Return the updated order data
  } catch (error) {
    console.error(`Error updating order with ID ${orderId}:`, error);
    throw new Error(
      `Failed to update order with ID ${orderId}. Please try again later.`
    );
  }
};

// Delete order by ID
const deleteOrder = async (orderId) => {
  try {
    await makeRequest("DELETE", `${ENDPOINTS.orders}/${orderId}`);
    return {
      message: `Order with ID ${orderId} has been deleted successfully.`,
    }; // Return success message
  } catch (error) {
    console.error(`Error deleting order with ID ${orderId}:`, error);
    throw new Error(
      `Failed to delete order with ID ${orderId}. Please try again later.`
    );
  }
};

const orderController = {
  getAllOrders,
  getOrderByID,
  postOrder,
  updateOrderByID,
  deleteOrder,
};

export default orderController;
