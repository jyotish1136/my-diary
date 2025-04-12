import { createContext, useContext, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";

const UserContext = createContext({
  getUser: async () => {},
  updateUser: async () => {},
  deleteUser: async () => {},
});

const UserProvider = ({ children }) => {
  const { getToken, userAuthenticated } = useAuth();
  const [user, setUser] = useState(null);

  const getUser = async () => {
    if (!userAuthenticated) return;
    try {
      const token = getToken();
      const response = await axiosInstance.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  const updateUser = async (firstname, lastname) => {
    const token = getToken();
    try {
      const response = await axiosInstance.put(
        "/user",
        { firstname, lastname },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data);
      return response;
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      return { status: error.response?.status || 500, error: true };
    }
  };
  const deleteUser = async () => {
    const token = getToken();
    try {
      const response = await axiosInstance.delete("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (error) {
      console.error("Deletion failed:", error.response?.data || error.message);
      return { status: error.response?.status || 500, error: true };
    }
  };

  return (
    <UserContext.Provider value={{ getUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);
