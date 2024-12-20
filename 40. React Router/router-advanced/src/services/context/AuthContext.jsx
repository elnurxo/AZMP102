/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import {
  getUserFromStorage,
  saveUserToStorage,
  removeUserFromStorage,
} from "../../utils/localStorage.js";
import controller from "../api/api.js";
import { ENDPOINTS } from "../../constants/index.js";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from local storage on app load
    const getUser = async () => {
      const storedUserId = getUserFromStorage();
      if (storedUserId) {
        const user = await controller.getOne(ENDPOINTS.users, storedUserId);
        setUser(user);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const login = async (userId) => {
    const user = await controller.getOne(ENDPOINTS.users, userId);
    if (user) {
      setUser(user);
      setIsAuthenticated(true);
      saveUserToStorage(userId); // Save to local storage
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    removeUserFromStorage(); // Remove from local storage
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
