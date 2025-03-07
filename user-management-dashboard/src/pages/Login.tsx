import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { Box, Button, Input, Field, Text } from "@chakra-ui/react";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const userData = await loginUser(data.email, data.password);
      login(userData.token);
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };


  return (
    <Box  w="300px" mx="auto" p="4" border="1px solid gray" borderRadius="md">
      <Text fontSize="xl" mb="4">Admin Login</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Field.Root mb="3" invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input 
          type="email" 
          placeholder="Email"
          {...register("email", { required: "Email is required" })}  />
          {errors.email && <Field.ErrorText display="block">{errors.email.message}</Field.ErrorText>}
        </Field.Root>

        <Field.Root mb="3" invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <Input 
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}  />
          {errors.password && <Field.ErrorText display="block">{errors.password.message}</Field.ErrorText>}
        </Field.Root>

        <Button type="submit" colorScheme="blue" w="full">Login</Button>
      </form>
    </Box>
  )
}

export default Login