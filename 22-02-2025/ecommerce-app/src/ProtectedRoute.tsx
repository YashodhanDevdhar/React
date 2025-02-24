import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GlobalContext } from "./context/GlobalContext";

const ProtectedRoute = () => {
  const { state } = useContext(GlobalContext);
  return state.isAdmin ? <Outlet /> : <Navigate to="/admin-login" />;
};

export default ProtectedRoute;
