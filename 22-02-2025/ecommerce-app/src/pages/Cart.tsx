import { useContext, useMemo } from "react"
import { GlobalContext } from "../context/GlobalContext"
import { Container, Row, Col, Button, Card } from "react-bootstrap";


const Cart = () => {

  const {state, dispatch} = useContext(GlobalContext);
  console.log("Cart State in Cart.tsx:", state.cart);
  const {cart} = state;

  const totalPrice = useMemo( () => {
    return cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
  }, [cart]);

  const handleRemoveFromCart = (id: number) => {
    dispatch({type: "REMOVE_FROM_CART", payload: id});
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      <Row>
        {cart.length > 0 ? (
          cart.map((product) => (
            <Col key={product.id} xs={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={product.image} alt={product.title} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>₹{product.price}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button variant="outline-secondary" onClick={() => dispatch({ type: "DECREASE_QUANTITY", payload: product.id })}>-</Button>
                    <span className="mx-2">{product.quantity}</span>
                    <Button variant="outline-secondary" onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: product.id })}>+</Button>
                  </div>
                  <Button variant="danger" onClick={() => handleRemoveFromCart(product.id)}>
                    Remove from Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </Row>
      {cart.length > 0 && (
        <div className="text-center mt-4">
          <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </Container>
  )
}

export default Cart