import { Box, Text, Image } from "@chakra-ui/react";
import { User } from "../store/userStore";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      boxShadow="md"
      textAlign="center"
      maxW="sm"
      mx="auto"
    >
      <Image
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        borderRadius="full"
        boxSize="80px"
        mx="auto"
        mb={4}
      />
      <Text
        fontSize="lg"
        fontWeight="bold"
      >{`${user.first_name} ${user.last_name}`}</Text>
      <Text color="gray.500">{user.email}</Text>
    </Box>
  );
};

export default UserCard;
