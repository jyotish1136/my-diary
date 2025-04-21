import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export const AuthContext = createContext({
  userAuthenticated: false,
  setUserAuthenticated: () => {},
  login: async () => {},
  logout: () => {},
  signup: async () => {},
  getToken: () => {},
  signupWithGoogle: async () => {},
});

const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken"));
  const [userAuthenticated, setUserAuthenticated] = useState(!!jwtToken);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("jwtToken");
    if (token && localStorage.getItem("jwtToken") !== token) {
      setJwtToken(token);
      localStorage.setItem("jwtToken", token);
    }
  }, []);
  useEffect(() => {
    setUserAuthenticated(!!jwtToken);
  }, [jwtToken]);

  const signupWithGoogle = () => {
    window.location.href = import.meta.env.VITE_REDIRECT_URI;
  };

  const signup = async (tempToken, firstname, lastname, username, password) => {
    try {
      const response = await axiosInstance.post("/auth/signup", {
        tempToken,
        firstname,
        lastname,
        username,
        password,
      });
      if (response.status == 200) {
        const token = response.data;
        localStorage.setItem("jwtToken", token);
        setJwtToken(token);
        return response;
      }
    } catch (error) {
      console.error("Error signup ", error);
    }
  };

  const login = async (username, password) => {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });
    if (response.status === 200) {
      const token = response.data;
      localStorage.setItem("jwtToken", token);
      setJwtToken(token);
      return response;
    }
  };

  const getToken = () => {
    return jwtToken;
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    setJwtToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userAuthenticated,
        setUserAuthenticated,
        login,
        logout,
        signup,
        getToken,
        signupWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
