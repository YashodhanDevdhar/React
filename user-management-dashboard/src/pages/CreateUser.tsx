import { useForm } from "react-hook-form";
import { Box, Button, Input, Field, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/userApi";
import { useMutation } from "@tanstack/react-query";

interface CreateUserForm {
  firstName: string;
  lastName: string;
  email: string;
  job: string;
}

const CreateUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserForm>();
  const navigate = useNavigate();

  const mutation = useMutation<void, Error, CreateUserForm>({
    mutationFn: createUser,
    onSuccess: () => {
        
      navigate("/users");
    },
  });

  const onSubmit = async (data: CreateUserForm) => {
    try {
      await mutation.mutateAsync(data);
      alert("User created successfully!");
    } catch (error) {
      alert("Error creating user!");
    }
  };

  return (
    <Box w="300px" mx="auto" p="4" border="1px solid gray" borderRadius="md">
      <Text fontSize="xl" mb="4">Create New User</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field.Root mb="3" invalid={!!errors.firstName}>
          <Field.Label>First Name</Field.Label>
          <Input 
            type="text" 
            placeholder="First Name"
            {...register("firstName", { required: "First name is required" })}  
          />
          {errors.firstName && <Field.ErrorText display="block">{errors.firstName.message}</Field.ErrorText>}
        </Field.Root>

        <Field.Root mb="3" invalid={!!errors.lastName}>
          <Field.Label>Last Name</Field.Label>
          <Input 
            type="text" 
            placeholder="Last Name"
            {...register("lastName", { required: "Last name is required" })}  
          />
          {errors.lastName && <Field.ErrorText display="block">{errors.lastName.message}</Field.ErrorText>}
        </Field.Root>

        <Field.Root mb="3" invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input 
            type="email" 
            placeholder="Email"
            {...register("email", { required: "Email is required" })}  
          />
          {errors.email && <Field.ErrorText display="block">{errors.email.message}</Field.ErrorText>}
        </Field.Root>

        <Button type="submit" colorScheme="blue" w="full">
          Create User
        </Button>
      </form>
    </Box>
  );
};

export default CreateUser;
