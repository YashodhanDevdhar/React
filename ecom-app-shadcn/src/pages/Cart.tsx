import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCartStore();
  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);


  const handleRemove = (id: number) => {
          const confirmed = window.confirm("Are you sure you want to remove this product?");
    
          if (confirmed) {
              try {
              removeFromCart(id); 
              alert(`Product removed successfully!`); 
              } catch (error) {
              alert("Failed to remove product. Please try again.");
              }
          }
  };

  const handleClearCart = () => {
    const confirmed = window.confirm("Are you sure you want to clear the cart?");

    if (confirmed) {
        try {
        clearCart(); 
        alert(`Cart Cleared!`); 
        } catch (error) {
        alert("Failed to clear cart. Please try again.");
        }
    }
};

  return (
    <div className="max-w-3xl mx-auto mt-6 text-center">
  <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

  {cart.length === 0 ? (
    <p className="text-center text-gray-500">Your cart is empty.</p>
  ) : (
    <div className="flex flex-col items-center space-y-4">
      {cart.map((product) => (
        <Card key={product.id} className="w-full max-w-md hover:shadow-lg transition">
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
            <p className="text-lg font-semibold text-green-600">₹{product.price}</p>
          </CardContent>

          <CardFooter className="flex justify-between items-center px-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => decreaseQuantity(product.id)}>
                -
              </Button>
              <span className="text-lg font-semibold">{product.quantity}</span>
              <Button variant="outline" size="icon" onClick={() => increaseQuantity(product.id)}>
                +
              </Button>
            </div>
            <Button variant="destructive" onClick={() => handleRemove(product.id)}>
              Remove
            </Button>
          </CardFooter>
        </Card>
      ))}
      <div className="flex justify-between items-center mt-6 px-4">
            <h3 className="text-xl font-bold">Total: {" "}</h3>
            <Badge variant="outline" className="text-lg px-4 py-2 bg-green-100 text-green-700">
              ₹{total.toFixed(2)}
            </Badge>
      </div>
      <Separator className="my-4" />
      <Button variant="destructive" onClick={handleClearCart} className="w-full max-w-md mt-10">
        Clear Cart
      </Button>
    </div>
  )}
</div>
  );
};

export default Cart;