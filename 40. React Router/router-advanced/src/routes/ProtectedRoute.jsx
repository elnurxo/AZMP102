/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import isAuthenticated from "../utils/isAuthenticated.js";

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
