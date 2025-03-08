import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../api/authApi";
import { Box, Button, Input, Field, Text } from "@chakra-ui/react";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerAdmin(data.email, data.password);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <Box w="300px" mx="auto" p="4" border="1px solid gray" borderRadius="md">
      <Text fontSize="xl" mb="4">
        Admin Register
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field.Root mb="3" invalid={!!errors.firstName}>
          <Field.Label>First Name</Field.Label>
          <Input
            type="text"
            placeholder="First Name"
            {...register("firstName", { required: "First Name is required" })}
          />
          {errors.firstName && (
            <Field.ErrorText>{errors.firstName.message}</Field.ErrorText>
          )}
        </Field.Root>

        <Field.Root mb="3" invalid={!!errors.lastName}>
          <Field.Label>Last Name</Field.Label>
          <Input
            type="text"
            placeholder="Last Name"
            {...register("lastName", { required: "Last Name is required" })}
          />
          {errors.lastName && (
            <Field.ErrorText>{errors.lastName.message}</Field.ErrorText>
          )}
        </Field.Root>

        <Field.Root mb="3" invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <Field.ErrorText>{errors.email.message}</Field.ErrorText>
          )}
        </Field.Root>

        <Field.Root mb="3" invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <Field.ErrorText>{errors.password.message}</Field.ErrorText>
          )}
        </Field.Root>

        <Button type="submit" colorScheme="blue" w="full">
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
