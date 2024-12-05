import makeRequest from "./index.js";
import { ENDPOINTS } from "../../constants/api.js";

// Get all users
const getAllUsers = async () => {
  try {
    const users = await makeRequest("GET", ENDPOINTS.users);
    return users; // Return the list of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users. Please try again later.");
  }
};

// Get user by ID
const getUserByID = async (userId) => {
  try {
    const user = await makeRequest("GET", `${ENDPOINTS.users}/${userId}`);
    return user; // Return the user data by ID
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw new Error(
      `Failed to fetch user with ID ${userId}. Please try again later.`
    );
  }
};

// Register a new user (POST request)
const register = async (userData) => {
  try {
    const newUser = await makeRequest("POST", ENDPOINTS.users, userData);
    return newUser; // Return the newly created user data
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Failed to register user. Please try again later.");
  }
};

// Update user by ID
const updateUserByID = async (userId, userData) => {
  try {
    const updatedUser = await makeRequest(
      "PUT",
      `${ENDPOINTS.users}/${userId}`,
      userData
    );
    return updatedUser; // Return the updated user data
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw new Error(
      `Failed to update user with ID ${userId}. Please try again later.`
    );
  }
};

// Delete user by ID
const deleteUser = async (userId) => {
  try {
    await makeRequest("DELETE", `${ENDPOINTS.users}/${userId}`);
    return { message: `User with ID ${userId} has been deleted successfully.` }; // Return success message
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw new Error(
      `Failed to delete user with ID ${userId}. Please try again later.`
    );
  }
};

const userController = {
  getAllUsers: getAllUsers,
  getUserByID,
  register,
  updateUserByID,
  deleteUser,
};

export default userController;
