import { Table, Button, Image, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useQuery , useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, UserApiResponse, deleteUser } from "../api/userApi";
import { useState } from "react";

const UserTable = () => {

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient(); 

  const [searchQuery, setSearchQuery] = useState("");  // Search input
const [filter, setFilter] = useState("all");         // Dropdown filter

  const { data, isLoading } = useQuery<UserApiResponse, Error>({
    queryKey: ["users", currentPage],
    queryFn: () => fetchUsers(currentPage),
    placeholderData: (previousData) => previousData,
    staleTime: 60000,
  });

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (_, userId) => {
      alert("User deleted successfully!");

      // Remove user from cache
      queryClient.setQueryData(["users", currentPage], (oldData: UserApiResponse | undefined) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((user) => user.id !== userId),
        };
      });
    },
    onError: () => {
      alert("Failed to delete user!");
    },
  });

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      mutation.mutate(id);
    }
  };

  const users = data?.data ?? [];
  const totalPages = data?.total_pages ?? 1;

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
  
    const matchesFilter =
        filter === "all"
        ? true
        : filter === "reqres"
        ? user.email.endsWith("@reqres.in")
        : filter === "E"
        ? user.first_name.startsWith("E")
        : filter === "F"
        ? user.last_name.startsWith("F")
        : true;
  
    return matchesSearch && matchesFilter;
  });

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
  {/* Search Input */}
  <input 
    type="text" 
    placeholder="Search by name or email..." 
    value={searchQuery} 
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{ padding: "8px", width: "200px", borderRadius: "5px", border: "1px solid #ccc" }}
  />

  {/* Filter Dropdown */}
  <select 
    value={filter} 
    onChange={(e) => setFilter(e.target.value)}
    style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
  >
    <option value="all">All</option>
    <option value="reqres">ReqRes Emails</option>
    <option value="E">First Name Starts with E</option>
    <option value="F">Last Name Starts with F</option>
  </select>
</div>
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Table.Root mt={4}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>Avatar</Table.ColumnHeader>
              <Table.ColumnHeader>First Name</Table.ColumnHeader>
              <Table.ColumnHeader>Last Name</Table.ColumnHeader>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filteredUsers.map((user) => (
              <Table.Row 
              key={user.id}
              onClick={() => navigate(`/users/${user.id}`)}
              style={{ cursor: "pointer" }}
              >
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>
                  <Image src={user.avatar} boxSize="40px" borderRadius="full" alt={user.first_name} />
                </Table.Cell>
                <Table.Cell>{user.first_name}</Table.Cell>
                <Table.Cell>{user.last_name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
        <Button 
          colorScheme="red" 
          size="sm" 
          onClick={(e) => {
            e.stopPropagation(); // Prevent row click navigation
            handleDelete(user.id);
          }}
        >
          Delete
        </Button>
      </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
      
      {window.location.pathname === "/users" && (
  <>
    <Button onClick={handlePrevPage} disabled={currentPage === 1} mt={4} mr={2}>
      Previous
    </Button>
    <Button onClick={handleNextPage} disabled={currentPage === totalPages} mt={4}>
      Next
    </Button>
  </>
)}
    </>
  );
};

export default UserTable;
