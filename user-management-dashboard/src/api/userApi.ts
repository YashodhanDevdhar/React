import axios from "axios";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export const fetchUsers = async (page: number): Promise<UserApiResponse> => {
  const { data } = await axios.get<UserApiResponse>(`https://reqres.in/api/users?page=${page}`);
  return data;
};

export const fetchTotalUsersCount = async () => {
    try {
      const response = await axios.get("https://reqres.in/api/users?page=1");
      const totalUsers = response.data.total;
      return totalUsers;
    } catch (error) {
      console.error("Error fetching total users count:", error);
      throw error;
    }
  };

  export const fetchUserById = async (id: number) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      return response.data.data; 
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  };

  // export const updateUser = async ({
  //   id,
  //   user,
  // }: {
  //   id: number;
  //   user: { name: string; job: string };
  // }) => {
  //   const response = await fetch(`https://reqres.in/api/users/${id}`, {
  //     method: "PUT",
  //     body: JSON.stringify(user),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
    
  //   return response.json();
  // };
  const API_BASE_URL = "https://reqres.in/api";

  // Update user function (PUT request)
  export const updateUser = async (id: number, updatedData: { name: string; email: string }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${id}`, {
        name: updatedData.name,
        email: updatedData.email,
        job: "N/A", // Hardcoded job value
      });
  
      return response.data; // Returns updated user data
    } catch (error) {
      throw new Error("Failed to update user");
    }
  };

  export interface CreateUserForm {
    firstName: string;
    lastName: string;
    email: string;
    job: string;
  }
  export const createUser = async (data: CreateUserForm) => {
    try {
      const response = await axios.post("https://reqres.in/api/users", {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        job: data.job,
      });
      return response.data;  // Return the response data if needed
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  export const deleteUser = async (id: number) => {
    await axios.delete(`https://reqres.in/api/users/${id}`);
  };