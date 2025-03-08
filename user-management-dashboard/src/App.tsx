import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useAuthStore } from "./store/authStore";
import Navbar from "./components/Navbar";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import CreateUser from "./pages/CreateUser";
import Register from "./pages/Register";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      {isAuthenticated && <Navbar />}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/users"
            element={isAuthenticated ? <Users /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
