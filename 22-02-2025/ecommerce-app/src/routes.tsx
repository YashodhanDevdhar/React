import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home" ;
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddProduct from "./pages/AdminAddProduct";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminProducts from "./pages/AdminProducts";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/admin/edit/:id" element={<AdminEditProduct />} />
        <Route path="/admin/edit" element= {<AdminProducts />}/>
      </Route>
      <Route path="*" element={<NotFound />} /> {}
    </Routes>
  )
}

export default AppRoutes