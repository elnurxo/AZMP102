/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import {
  getUserFromStorage,
  saveUserToStorage,
  removeUserFromStorage,
} from "../../utils/localStorage.js";
import controller from "../api/api.js";
import { ENDPOINTS } from "../../constants/index.js";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const getUser = async () => {
      try {
        const storedUserId = getUserFromStorage();
        if (storedUserId) {
          const user = await controller.getOne(ENDPOINTS.users, storedUserId);
          setUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error loading user:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Ensure loading state is always updated
      }
    };
    getUser();
  }, []);

  const login = async (userId) => {
    try {
      const user = await controller.getOne(ENDPOINTS.users, userId);
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        saveUserToStorage(userId);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    removeUserFromStorage();
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
