import { useQuery } from "@tanstack/react-query"
import { fetchCategories, orderProducts } from "../api/Api"
import { Product } from "../types/ProductTypes"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button"
import { useCartStore } from "../store/cartStore";


const Products:React.FC = () => {
    const addToCart = useCartStore((state) => state.addToCart);

    const [selectedCategory, setSelectedCategory] = useState<string>('');
    
    const [selectedOrder, setSelectedOrder] = useState<string>('');
    
    const orderArr = ["desc","asc"];

    const { data: categories } = useQuery({
        queryKey : ["caregories"],
        queryFn : fetchCategories
    });

    const{data: products, isLoading, error } = useQuery({
        queryKey : ["products",selectedCategory,selectedOrder],
        queryFn : ()=> orderProducts(selectedCategory,selectedOrder)
    });

    if(isLoading) return <div><h1>Loading...</h1></div>
    if(error instanceof Error) return <div><h1>Error: {error.message}</h1></div>

    const handleAdd = (product: Product) => {
        try {
          addToCart(product); 
        alert(`Product added to cart successfully!`); 
        } catch (error) {
        alert("Failed to remove product. Please try again.");
        }
    
};

  return (
    <div className="px-4">
        <div className="mt-4 flex items-center space-x-4">
            <div>
                <label htmlFor="category" className="text-lg font-semibold">
                    Category:
                </label>
                <Select value={selectedCategory || "all"} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                            All Categories
                        </SelectItem>
                        {categories?.map((category: string) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label htmlFor="order" className="text-lg font-semibold">
                    Order:
                </label>
                <Select value={selectedOrder || "default"} onValueChange={setSelectedOrder}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Default" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="default">
                            Default
                        </SelectItem>
                        {orderArr.map((order: string) => (
                            <SelectItem key={order} value={order}>
                                {order}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product: Product) => (
            <Card key={product.id} className="hover:shadow-lg transition">
                <CardHeader className="flex flex-col items-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-40 object-contain rounded-md"
                    />
                    <CardTitle className="text-lg mt-2">
                    <Link to={`/products/${product.id}`} className="text-blue-600 hover:underline">
                        {product.title}
                    </Link>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                <p className="text-lg font-semibold text-green-600">
                    ₹{product.price}
                </p>
                </CardContent>
                <CardFooter>
                <Button 
                className="w-full"
                onClick={() => handleAdd(product)}
                >
                    Add to Cart
                </Button>
                </CardFooter>  
            </Card>
        ))}
        </div>
  </div>
  )
}

export default Products