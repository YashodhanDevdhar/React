import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../types/productTypes";
import { GlobalContext } from "../context/GlobalContext";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useContext(GlobalContext);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
  };

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={product.image} alt={product.title} />
          </Card>
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <h4 className="text-primary">₹{product.price}</h4>
          <p><strong>Category:</strong> {product.category}</p>
          <p>{product.description}</p>
          <Button variant="success" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
