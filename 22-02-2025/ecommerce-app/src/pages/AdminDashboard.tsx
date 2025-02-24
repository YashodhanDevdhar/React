import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();

  if (!state.isAdmin) {
    return <p>Access denied. You are not an admin.</p>;
  }
  const navigateToAddProduct = () => navigate("/admin/add-product");
const navigateToEditProduct = () => navigate("/admin/edit");
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin!</p>

      <nav>
        <ul>
        <button onClick={navigateToAddProduct}>Add Product</button>
  <button onClick={navigateToEditProduct}>Edit Product</button>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;
