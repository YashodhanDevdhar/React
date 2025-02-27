import axios from "axios";
import { Product } from "@/types/ProductTypes";


export const fetchLimitedProducts = async() : Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>("https://fakestoreapi.com/products?limit=8");
        return response.data;
    }
    catch(error){
        console.error("Error fetching products : ", error);
    }
    return [];
};

export const fetchCategories = async () => {
    const { data } = await axios.get<string[]>('https://fakestoreapi.com/products/categories');
    return data;
}

export const fetchProductById = async (id: string) => {
    const { data } = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
    return data;
};

// export const fetchProductsByCategory = async (category: string) => {
//     const url = category ? `https://fakestoreapi.com/products/category/${category}` : 'https://fakestoreapi.com/products';
//     const { data } = await axios.get(url);
//     return data;
// }

export const orderProducts = async (category: string, order: string) => {
    const url = category ? `https://fakestoreapi.com/products/category/${category}?sort=${order}` : `https://fakestoreapi.com/products?sort=${order}`;
    const { data } = await axios.get(url);
    return data;
}

export const fetchAllProducts = async():Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>("https://fakestoreapi.com/products");
        return response.data;
    }
    catch(error){
        console.error("Error fetching products : ", error);
    }
    return [];
}

export const deleteProduct = async(id: number) => {
    try {
        const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
        return response;
    }
    catch(error){
        console.error("Error deleting product : ", error);
        throw error;
    }
    
};