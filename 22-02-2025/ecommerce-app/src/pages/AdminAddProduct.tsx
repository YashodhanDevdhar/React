import { useState } from "react";
import { AddProduct } from "../api/ProductApi";
import { useMutation } from "@tanstack/react-query";



const AdminAddProduct = () => {

  const [product, setProduct] = useState({
    title:"",
    price:"",
    category:"",
    image:"",
  })

  const mutation = useMutation({
    mutationFn: AddProduct.addProduct, 
    onSuccess: (data) => {
      alert(`Product added successfully! ID: ${data.data.id}`);
      setProduct({ title: "", price: "", category: "", image: "" }); 
    },
    onError: () => {
      alert("Error adding product. Please try again.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({...product, [e.target.name]: e.target.value});
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product.title || !product.price || !product.category || !product.image) {
      alert("All fields are required!");
      return;
    }

    mutation.mutate({
      title: product.title,
      price: parseFloat(product.price),
      category: product.category,
      image: product.image,
    });

  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Title</label>
          <input 
            type="text" 
            name="title" 
            value={product.title} 
            onChange={handleChange} 
            className="form-control"
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input 
            type="number" 
            name="price" 
            value={product.price} 
            onChange={handleChange} 
            className="form-control"
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input 
            type="text" 
            name="category" 
            value={product.category} 
            onChange={handleChange} 
            className="form-control"
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input 
            type="text" 
            name="image" 
            value={product.image} 
            onChange={handleChange} 
            className="form-control"
            required 
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AdminAddProduct