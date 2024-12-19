import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import ProtectedRoute from "./ProtectedRoute";
import AdminLogin from "../pages/auth/AdminLogin";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
      </Route>
      <Route path="/login" element={<AdminLogin />} />
    </Routes>
  );
};

export default AdminRoutes;
