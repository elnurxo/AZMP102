import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import ProtectedRoute from "./ProtectedRoute";
import AdminLogin from "../pages/auth/AdminLogin";
import Sliders from "../pages/admin/Sliders";
import Messages from "../pages/admin/Messages";
import Categories from "../pages/admin/Categories";
import Users from "../pages/admin/Users";
import Coupons from "../pages/admin/Coupons";
import Orders from "../pages/admin/Orders";
import NotFound from "../pages/admin/NotFound";

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
        <Route path="sliders" element={<Sliders />} />
        <Route path="messages" element={<Messages />} />
        <Route path="categories" element={<Categories />} />
        <Route path="users" element={<Users />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="orders" element={<Orders />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<AdminLogin />} />
    </Routes>
  );
};

export default AdminRoutes;
