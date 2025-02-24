import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Navbar = () => {
  const { state } = useContext(GlobalContext);
  const cartItemCount = state.cart.length; // Get number of items in cart

  return (
    <nav>
      <Link to="/">Home</Link> {" "}
      <Link to="/cart">
        Cart {cartItemCount > 0 && `(${cartItemCount})`}
      </Link>
    </nav>
  );
};

export default Navbar;
