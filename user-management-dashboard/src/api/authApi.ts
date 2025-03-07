import axios from "axios";



export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`https://reqres.in/api/login`, { email, password });
    if (response.data.token) {
        return response.data;
      } else {
        throw new Error("Invalid email or password");
      }
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};
