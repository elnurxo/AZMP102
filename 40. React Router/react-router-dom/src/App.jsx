import { Routes, Route } from "react-router";
import Home from "./pages/Client/Home";
import About from "./pages/Client/About";
import Contact from "./pages/Client/Contact";
import NotFound from "./pages/Client/404";
import Products from "./pages/Client/Products";
import ProductDetail from "./pages/Client/ProductDetail";
import AdminLayout from "./layout/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import AddProduct from "./pages/Admin/AddProduct";
import ClientLayout from "./layout/Client/ClientLayout";

function App() {
  return (
    <>
      <Routes>
        {/* admin layout - shared layout */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* admin pages */}
          <Route index element={<Dashboard />} />
          <Route path="add-product" element={<AddProduct />} />
        </Route>

        {/* client layout */}
        <Route path="/" element={<ClientLayout />}>
          {/* client pages */}
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
