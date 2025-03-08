import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Spinner,
  Text,
  CloseButton,
  Dialog,
  Portal,
  Input,
} from "@chakra-ui/react";
import UserCard from "../components/UserCard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserById, updateUser } from "@/api/userApi";
import { useForm } from "react-hook-form";
import { useState } from "react";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    data: selectedUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", Number(id)],
    queryFn: () => fetchUserById(Number(id)),
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: selectedUser?.first_name || "",
      lastName: selectedUser?.last_name || "",
      email: selectedUser?.email || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (updatedData: { name: string; email: string }) =>
      updateUser(Number(id), updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", Number(id)] });
      alert("User updated successfully!");
      setIsDialogOpen(false);
    },
    onError: () => {
      alert("Failed to update user.");
    },
  });

  const handleEditClick = () => {
    if (selectedUser) {
      reset({
        firstName: selectedUser.first_name,
        lastName: selectedUser.last_name,
        email: selectedUser.email,
      });
      setIsDialogOpen(true);
    }
  };

  const onSubmit = (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    const updatedUser = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      job: "Updated Job",
    };
    mutation.mutate(updatedUser);
  };

  return (
    <div>
      <Box textAlign="center" mt={6}>
        {isLoading ? (
          <Spinner size="xl" />
        ) : error ? (
          <Text color="red.500">Failed to fetch user details</Text>
        ) : selectedUser ? (
          <>
            <UserCard user={selectedUser} />
            <Button variant="outline" mt={4} onClick={handleEditClick}>
              Edit
            </Button>
          </>
        ) : (
          <Text>User not found</Text>
        )}
        <Dialog.Root
          open={isDialogOpen}
          onOpenChange={(e) => setIsDialogOpen(e.open)}
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.CloseTrigger asChild>
                  <CloseButton position="absolute" right="8px" top="8px" />
                </Dialog.CloseTrigger>
                <Dialog.Header>
                  <Dialog.Title>Edit user</Dialog.Title>
                </Dialog.Header>

                <Box
                  as="form"
                  onSubmit={handleSubmit(onSubmit)}
                  w="300px"
                  mx="auto"
                >
                  <Box mb={3}>
                    <Text>First Name</Text>
                    <Input
                      {...register("firstName", {
                        required: "First Name is required",
                      })}
                    />
                    {errors.firstName && (
                      <Text color="red.500">
                        {String(errors.firstName.message)}
                      </Text>
                    )}
                  </Box>

                  <Box mb={3}>
                    <Text>Last Name</Text>
                    <Input
                      {...register("lastName", {
                        required: "Last Name is required",
                      })}
                    />
                    {errors.lastName && (
                      <Text color="red.500">
                        {String(errors.lastName.message)}
                      </Text>
                    )}
                  </Box>

                  <Box mb={3}>
                    <Text>Email</Text>
                    <Input
                      {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && (
                      <Text color="red.500">
                        {String(errors.email.message)}
                      </Text>
                    )}
                  </Box>

                  <Dialog.Footer>
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" loading={mutation.isPending}>
                      Save
                    </Button>
                  </Dialog.Footer>
                </Box>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
        <Button mt={4} onClick={() => navigate("/users")} colorScheme="blue">
          Back to Users
        </Button>
      </Box>
    </div>
  );
};

export default UserDetails;
