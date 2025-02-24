import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import { Container, Row, Col } from "react-bootstrap";
import { Product } from "../types/productTypes";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";

const Home:React.FC = () => {

  const {state} = useContext(GlobalContext);

  const filteredProducts =
  state.selectedCategory === "all"
    ? state.products
    : state.products.filter((product) => product.category === state.selectedCategory);

  return (
    <Container className="mt-4">
      <CategoryFilter />
      <h2 className="text-center mb-4">Products</h2>
      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: Product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <p className="text-center">Loading products...</p>
        )}
      </Row>
    </Container>
  )
}

export default Home