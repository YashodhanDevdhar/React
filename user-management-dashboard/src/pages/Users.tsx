import UserTable from "@/components/UserTable";
import { Box, Heading } from "@chakra-ui/react";

const Users = () => {
  return (
    <Box p={6}>
      <Heading mb={4}>Users</Heading>
      <UserTable />
    </Box>
  );
};

export default Users;
