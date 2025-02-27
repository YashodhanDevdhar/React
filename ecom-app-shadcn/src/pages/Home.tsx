import { useQuery } from "@tanstack/react-query"
import { fetchLimitedProducts } from "../api/Api"
import { Link } from "react-router-dom"
import { Product } from "../types/ProductTypes"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "../store/cartStore";


const Home:React.FC = () => {
  const addToCart = useCartStore((state) => state.addToCart);

    const{data, error, isLoading} = useQuery({
        queryKey : ["limitedProducts"],
        queryFn : fetchLimitedProducts
    })

    if(isLoading) return <div><h1>Loading...</h1></div>

    if(error instanceof Error) return <div><h2>Error: {error.message}</h2></div>

    const handleAdd = (product: Product) => {
          try {
            addToCart(product); 
          alert(`Product added to cart successfully!`); 
          } catch (error) {
          alert("Failed to remove product. Please try again.");
          }
      
  };

  return (
    
    <div className="pl-10 pr-10 px-4">
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((product: Product) => (
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
      <Button className="w-full mt-10">
        <Link to={"/products"} className="text-white">
          See All Products...
        </Link>
      </Button>
    </div>
  )
}

export default Home