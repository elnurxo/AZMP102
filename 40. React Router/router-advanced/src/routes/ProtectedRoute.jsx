/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

// Replace this with actual authentication logic
const isAuthenticated = () => {
  return localStorage.getItem("adminAuth") === "true";
};

const ProtectedRoute = ({ children }) => {

  return isAuthenticated() ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
