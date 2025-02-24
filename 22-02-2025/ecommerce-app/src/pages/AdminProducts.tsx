import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/productTypes";

const AdminProducts = () => {
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <div>
      <h2>Admin - Manage Products</h2>
      <table cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((product: Product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title} width="50" height="50" />
              </td>
              <td>{product.title}</td>
              <td>₹{product.price}</td>
              <td>{product.category}</td>
              <td>
              <button onClick={() => navigate(`/admin/edit/${product.id}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
