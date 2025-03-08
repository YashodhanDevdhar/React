import {  Box, Button, Heading, Text, Spinner, HStack, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { fetchTotalUsersCount } from "../api/userApi";

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: totalUsersCount, isLoading} = useQuery({
    queryKey: ["totalUsers"],
    queryFn: fetchTotalUsersCount,
    staleTime: 60000,
  });

  return (
    <>
    
    <Flex direction="column" align="center" justify="center" minH="80vh">
      <Box 
        p={8} 
        boxShadow="lg" 
        borderRadius="lg" 
        bg="gray.800" 
        color="white"
        textAlign="center"
        maxW="500px"
      >
        <Heading mb={4} fontSize="2xl">Admin Dashboard</Heading>

        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <>
            <Text fontSize="lg" fontWeight="bold" mb={6}>
              Total Users: <Text as="span" fontSize="2xl" color="blue.400">{totalUsersCount}</Text>
            </Text>

            <HStack  justify="center">
              <Button colorScheme="blue" onClick={() => navigate("/users")}>
                See Users
              </Button>
              <Button colorScheme="teal" onClick={() => navigate("/createuser")}>
                Create User
              </Button>
            </HStack>
          </>
        )}
      </Box>
    </Flex>
    </>
  )
}

export default Dashboard