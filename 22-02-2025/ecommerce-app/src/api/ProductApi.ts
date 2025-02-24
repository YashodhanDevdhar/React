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