import { useState, useContext} from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { Product } from "../types/productTypes";
import { updateProduct } from "../api/ProductApi";

const AdminEditProduct = () => {
  const { id } = useParams();
  const { state } = useContext(GlobalContext);

  const product = state.products.find((p) => p.id === Number(id));

  const [updatedProduct, setUpdatedProduct] = useState<Product>(
    product || {
      id: 0,
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      quantity: 0,
    }
  );

  if (!product) {
    return <p>Product not found!</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await updateProduct(Number(id), updatedProduct);
      alert(`Changes saved! Status: ${response.status}`);
    } catch (error) {
      alert("Failed to update product. Check console.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Edit Product</h2>

      <div className="text-center mb-3">
        <img src={updatedProduct.image} alt="Product" className="img-fluid rounded" style={{ maxWidth: "150px" }} />
      </div>

      <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input type="text" className="form-control" name="image" value={updatedProduct.image} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input type="text" className="form-control" name="title" value={updatedProduct.title} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Price</label>
        <input type="number" className="form-control" name="price" value={updatedProduct.price} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <input type="text" className="form-control" name="category" value={updatedProduct.category} onChange={handleChange} required />
      </div>

      <button className="btn btn-primary" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default AdminEditProduct;