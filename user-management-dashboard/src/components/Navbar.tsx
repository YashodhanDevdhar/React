import { Flex, Box, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const logout = useAuthStore((state) => state.logout);
  return (
    <Flex
      as="nav"
      bg="black"
      color="white"
      p="4"
      justify="space-between"
      align="center"
    >
      <Box>
        <NavLink
          to="/dashboard"
          style={{
            marginRight: "16px",
            textDecoration: "none",
            color: "white",
          }}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/users"
          style={{
            marginRight: "16px",
            textDecoration: "none",
            color: "white",
          }}
        >
          Users
        </NavLink>
      </Box>

      <Button colorScheme="red" onClick={logout}>
        Logout
      </Button>
    </Flex>
  );
};

export default Navbar;
