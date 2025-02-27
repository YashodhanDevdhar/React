import { fetchProductById } from "@/api/Api";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
  });
  
  return (
    <div >
      <div className="mt-6 flex justify-center">
        <Card key={product?.id} className="hover:shadow-lg transition w-full sm:w-auto max-w-md">
          <div className="flex">
            <div className="w-1/2 p-4">
              <img
                src={product?.image}
                alt={product?.title}
                className="w-full h-40 object-contain rounded-md"
              />
            </div>

            <div className="w-1/2 p-4 flex flex-col justify-between">
              <CardHeader className="p-0">
                <CardTitle className="text-lg">
                  <Link to={`/products/${product?.id}`} className="text-blue-600 hover:underline">
                    {product?.title}
                  </Link>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                <p className="text-gray-600">{product?.description}</p>
                <p className="text-lg font-semibold text-green-600 mt-2">
                  ₹{product?.price}
                </p>
              </CardContent>

              <CardFooter className="p-0 mt-4">
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ProductDetail