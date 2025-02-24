import { Card } from "react-bootstrap";
import { Product } from "../types/productTypes";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="h-100 shadow">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        style={{ height: "200px", objectFit: "contain" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6">{product.title}</Card.Title>
        <Card.Text className="fw-bold">₹{product.price}</Card.Text>
        <div className="mt-auto">
          <Link to={`/product/${product.id}`} className="btn btn-primary w-100">
            View Details
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
