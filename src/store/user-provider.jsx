import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";

const UserContext = createContext({
  user: null,
  getUser: async () => {},
  updateUser: async () => {},
  deleteUser: async () => {},
  validateUser: async () => {},
  updateUsernamePassword: async () => {},
});

const UserProvider = ({ children }) => {
  const { getToken, userAuthenticated } = useAuth();
  const [user, setUser] = useState(null);

  const getUser = async () => {
    if (!userAuthenticated || !getToken()) return null;
    try {
      const token = getToken();
      const response = await axiosInstance.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setUser(response.data);
        return response;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!user && getToken()) {
      getUser();
    }
  }, [userAuthenticated]);

  const updateUser = async (firstname, lastname) => {
    const token = getToken();
    try {
      const response = await axiosInstance.put(
        "/user",
        { firstname, lastname },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setUser(response.data);
        return response;
      }
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      return { status: error.response?.status || 500, error: true };
    }
  };

  const updateUsernamePassword = async (username, password) => {
    const token = getToken();
    try {
      const response = await axiosInstance.put(
        "/user",
        { username, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setUser(response.data);
        return response;
      }
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
      if (response.status === 200) {
        setUser(null);
      }
      return response;
    } catch (error) {
      console.error("Deletion failed:", error.response?.data || error.message);
      return { status: error.response?.status || 500, error: true };
    }
  };

  const validateUser = async (username) => {
    try {
      const response = await axiosInstance.get("/auth/check-username", {
        params: { username },
      });
      return response;
    } catch (error) {
      console.error(
        "Validation failed:",
        error.response?.data || error.message
      );
      return {
        status: error.response?.status || 500,
        data: { exists: false },
      };
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        updateUser,
        deleteUser,
        validateUser,
        updateUsernamePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);
