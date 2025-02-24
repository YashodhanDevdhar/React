import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Navbar = () => {
  const { state,dispatch } = useContext(GlobalContext);
  const cartItemCount = state.cart.length; 
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "ADMIN_LOGOUT" });
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">My Store</Link>
        
        <div className="d-flex">
          <Link className="nav-link text-light me-3" to="/">Home</Link>
          <Link className="nav-link text-light me-3" to="/cart">
            Cart {cartItemCount > 0 && `(${cartItemCount})`}
          </Link>

          {state.isAdmin ? (
            <>
              <Link className="nav-link text-light me-3" to="/admin">Admin Panel</Link>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="nav-link text-light" to="/admin-login">Admin Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
