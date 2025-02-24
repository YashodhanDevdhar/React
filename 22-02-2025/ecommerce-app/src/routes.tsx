import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home" ;
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/add-product" element={<AdminAddProduct />} />
      <Route path="/admin/edit/:id" element={<AdminEditProduct />} />
      <Route path="*" element={<NotFound />} /> {}
    </Routes>
  )
}

export default AppRoutes