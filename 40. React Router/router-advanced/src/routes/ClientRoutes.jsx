import { Routes, Route } from "react-router-dom";
import ClientLayout from "../components/client/ClientLayout";
import Home from "../pages/client/Home";
import About from "../pages/client/About";
import Products from "../pages/client/Products";
import ProductDetail from "../pages/client/ProductDetail";
import NotFound from "../pages/client/NotFound";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ClientRoutes;
