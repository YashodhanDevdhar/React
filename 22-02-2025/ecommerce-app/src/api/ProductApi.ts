import axios from "axios";
import { Product } from "../types/productTypes";

const API_URL = "https://fakestoreapi.com/products";

export const fetchProducts = async() : Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>(API_URL);
        return response.data;
    }
    catch(error){
        console.error("Error fetching products : ", error);
    }
    return [];
};

export const AddProduct = {
    addProduct: async (product: {
      title: string;
      price: number;
      category: string;
      image: string;
    }) => {
      try {
        const response = await axios.post(API_URL, product);
        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);
        return response;
      } catch (error) {
        console.error("Error adding product:", error);
        throw error;
      }
    },
  };

  export const updateProduct = async (id: number, updatedProduct: Partial<Product>) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, updatedProduct);
      console.log("Product updated:", response.data);
      return response;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };